import axios from "axios";
// 增加默认请求路径
axios.defaults.baseURL = "http://localhost:4000";

// 获取轮播图数据
export let getSliders = () => {
  return axios.get("/sliders");
}

// 获取热门图书信息
export let getHotBooks = () => {
  return axios.get("/hotbooks");
}

//获取图书列表
export let getAllBooks = () => {
  return axios.get("/allbooks");
}

// 删除图书
export let delBook = (id) => {
  return axios.delete(`/book?id=${id}`)
}

// 图书详情
export let detail = (id) => {
  return axios.get(`/detail?id=${id}`)
}

// 修改图书
export let changeContent = (data) => {
  return axios.post(`/changecontent`,data)
}

// 添加图书
export let addBook = (data) => {
  return axios.post(`/addbook`,data)
}

