let http = require("http");
let fs = require("fs");
let url = require("url");
let sliders = require('./swipe')

http.createServer((req, res) => {
  // 设置头部
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
  res.setHeader('Access-Control-Allow-Methods', '*');

  let {pathname,query} = url.parse(req.url,true);
  // 这里需要一个返回 处理axios的预请求
  if (req.method == "OPTIONS") return res.end("");

  // 轮播图：
  if (pathname === '/sliders') {
    res.end(JSON.stringify(sliders));
  }
  // 热门图书：
  if (pathname === '/hotbooks') {
    read(function (books) {
      var hotBook = []
      books.forEach((item)=>{
        if (item.hotBook === true){
          hotBook.unshift(item)
        }
      })
      res.end(JSON.stringify(hotBook));
    })
  }
  // 图书列表
  if (pathname === '/allbooks') {
    read(function (book) {
      book = book.reverse()
      res.end(JSON.stringify(book));
    })
  }
  // 删除图书
  if(req.method==="DELETE"){
    read(function (books) {
      var id = query.id
      books = books.filter(function (item) {
        return item.bookId != id
      })
      write(books,function () {
        // 需要给一个返回 不然await得不到返回不会执行下面的函数
        res.end("")
      })
    })
  }

  //图书详情
  if (pathname === '/detail') {
    read(function (books) {
      books = books.filter(function (item) {
        return item.bookId == query.id
      })
      res.end(JSON.stringify(books))
    })
  }

  //修改图书
  if (pathname === '/changecontent') {
    let obj = '';
    req.on('data', function (chunk) {
      obj += chunk;
    });
    req.on('end',()=>{
      obj = JSON.parse(obj)
      read(function (books) {
        books.forEach(item=>{
          if (item.bookId === obj.bookId) {
              for (i in item){
                item[i] = obj[i]
              }
          }
        })
        write(books, function () {
          res.end("");
        })
      })
    });
  }

  // 添加图书
  if(pathname === '/addbook'){
    let obj = '';
    req.on('data', function (chunk) {
      obj += chunk;
    });
    req.on('end',()=>{
      var book = JSON.parse(obj)
      read(function (books) {
        book.bookId = books.length+1
        books.push(book)
        write(books,function () {
          res.end("")
        })
      })
    })
  }




}).listen(4000)

// 封装 读取文件数据
function read(cb) {
  fs.readFile("./books.json", "utf8", (err, data) => {
    if (err || data.length === 0) {
      cb([]);
    } else {
      cb(JSON.parse(data));
    }
  });
}

// 封装 写入文件
function write(data, cb) {
  fs.writeFile("./books.json", JSON.stringify(data), cb)
}


//
// let sliders = require("swipe.js");
// console.log(sliders);
//

// const pageSize = 5;
// // 获取轮播图  /sliders
// http.createServer((req,res)=>{
//     res.setHeader("Access-Control-Allow-Origin", "*");
//     res.setHeader("Access-Control-Allow-Headers", "X-Requested-With");
//     res.setHeader("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
//     res.setHeader("Access-Control-Allow-Headers", "Content-Type,Access-Token");
//     res.setHeader("X-Powered-By",' 3.2.1')
//     res.setHeader("Content-Type", "application/json;charset=utf-8");
//     //console.log(url.parse(req.url));

//     let {pathname,query} = url.parse(req.url,true);
//     let id = parseInt(query.id);
//     console.log(id);
//     // delete请求
//     console.log(req.method);
//     switch(req.method) {
//         case "GET":
//         if (pathname === "/sliders") {
//             res.setHeader("Content-Type","application/json;charset=utf8");
//             res.end (JSON.stringify(sliders));
//         }
//         if (pathname === "/hot") {
//                 read(function(books) {
//                     // []或有数据
//                     books = books.reverse().slice(0,6);
//                     res.end(JSON.stringify(books));
//                 });
//         }
//         if (pathname === "/getAllBooks") {
//             read(function(books) {
//                 res.end(JSON.stringify(books));
//             });
//         }
//         if (pathname === "/page") {
//             // 拿到前台传递的值
//             let index =  parseInt(query.index) || 0;
//             console.log(index);
//             let hasMore = true;
//             read(function(books) {
//                 let result = books.reverse().slice(index,index+pageSize);
//                 console.log(result);
//                 if (books.length<=index+pageSize) {
//                     hasMore = false;
//                 }
//                 res.end(JSON.stringify({hasMore,books:result}));
//             });
//         }
//         if (pathname === "/book") {
//             read(function(books) {
//                 let book =  books.find(item=>item.bookId===id);
//                 if (!book) book = {};
//                 res.end(JSON.stringify(book));
//             });
//         }
//
//               break;
//         case "POST":
//               let str2 = "";
//               req.on("data",chunck=> {
//                  str2 += chunck;
//               });
//               req.on("end",()=>{
//                   let book = JSON.parse(str2);
//                   read(function(books) {
//                      book.bookId = books.length?books[books.length-1].bookId+1:1;
//                      books.push(book);
//                      console.log(books);
//                      write(books,function() {
//                           //
//                           res.end(JSON.stringify(book));
//                      });
//                   })
//               });
//               break;
//         case "DELETE":
//               read(function(books) {
//                   //console.log(typeof query.id);
//                   books = books.filter(item=>item.bookId !==id);
//                   write(books,function() {
//                       res.end(JSON.stringify({}));// 删除成功后返回空对象
//                   });
//               })
//               break;
//         case "PUT":
//               let str = "";
//               req.on("data",chunck=>{
//                   str += chunck;
//               })
//               req.on("end",()=>{
//                   let book = JSON.parse(str);
//                   read(function(books) {
//                     books = books.map(item=>{
//                           if (item.bookId === id) {
//                               return book;
//                           }
//                           return item;
//                       })
//                       write(books,function() {
//                         res.end(JSON.stringify(book));
//                     })
//                   });
//               })
//               break;
//
//     }
//
// }).listen(4000);
