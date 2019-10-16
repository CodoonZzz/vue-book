<template>
  <van-list>
    <van-nav-bar title="列表" :fixed = true />
    <van-cell v-for="item in list" :key="item.bookId" :to="{name:'detail',params:{bookId:item.bookId}}">
      <div class="">
        <div class="bookImg">
          <img :src="item.bookCover" width="100%">
        </div>
        <div class="bookContent">
          <p class="bookName">{{item.bookName}}</p>
          <p class="bookDesc">{{item.bookDesc}}</p>
          <p class="bookPrice">{{"￥"+item.bookPrice}}</p>
          <van-button type="info" size="small" round>修改</van-button>
          <van-button type="danger" size="small" round @click.stop="del(item.bookId)">删除</van-button>

        </div>
      </div>
    </van-cell>
  </van-list>
</template>

<script>
    import {getAllBooks,delBook} from "../../../mock/index";
    import { Dialog } from 'vant';

    export default {
        name: "index",
        created() {
            this.getAllBooks()
        },
        methods: {
            async getAllBooks() {
                let res = await getAllBooks()
                this.list = res.data
            },
            del(id){
                Dialog.confirm({
                    title: '确认删除',
                    message: '确认删除吗 此操作不可恢复'
                }).then(async () => {
                    await delBook(id)
                    this.getAllBooks()
                }).catch(() => {
                    return
                });
            }
            // onLoad() {
            //     // 异步更新数据
            //     setTimeout(() => {
            //         for (let i = 0; i < 10; i++) {
            //             this.list.push(this.list.length + 1);
            //         }
            //         // 加载状态结束
            //         this.loading = false;
            //
            //         // 数据全部加载完成
            //         if (this.list.length >= 40) {
            //             this.finished = true;
            //         }
            //     }, 500);
            // }
        },
        data(){
            return{
                list: [],
                // loading: false,
                // finished: false
            }
        }
    }
</script>

<style scoped>
  .bookImg{
    float: left;
    width: 50%;
  }
  .bookContent{
    float: left;
    width: 50%;
  }
  .bookName{
    font-weight: 600;
    font-size: 18px;
  }
  .bookDesc{
    font-size: 14px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis
  }
  .bookPrice{
    color: orange;
    font-size: 16px;
  }
  .bookContent p{
    margin: 10px;
  }
</style>
