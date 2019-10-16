<template>
  <div>
    <van-nav-bar title="详情" :fixed = true left-text="返回" left-arrow @click-left="onClickLeft"/>
    <van-image :src="book.bookCover" width="200px" height="200px"/>

    <div class="titleBox">
      <h3 class="detailTitle">修改图书信息:</h3>
      <div class="switch">
        <span class="setHot">设置热门</span><van-switch v-model="book.hotBook" />
      </div>
    </div>
    <van-cell-group>
      <van-field v-model="book.bookName"/>
      <van-field v-model="book.bookDesc"/>
      <van-field v-model="book.bookPrice" type="number"/>


    </van-cell-group>
    <van-button type="info" round size="large" @click="changeContent(book)">保存</van-button>
  </div>

</template>

<script>
    import {detail,changeContent} from "../../../mock/index";
    import { Toast } from 'vant';


    export default {
        name: "detail",
        created() {
            var id = this.$route.params.bookId
            this.detail(id)
        },
        methods:{
            async detail(id){
                let res = await detail(id)
                this.book = res.data[0]
            },
            async changeContent(data){
                Toast.allowMultiple();
                const toast1 = Toast.loading({
                    mask: true,
                    message: '加载中...'
                });
                let res = await changeContent(data)
                toast1.clear();
                Toast.success({
                    duration: 1000,
                    message: '保存成功',
                    onClose:()=>{
                        this.$router.go(-1)
                    }
                });

            },
            onClickLeft(){
                this.$router.go(-1)
            }
        },
        updated(){
          console.log(this.checked)
        },
        data(){
            return{
                book:{},
                checked: false
            }
        }
    }
</script>

<style scoped>
  .van-image{
    display: block;
    margin: 0 auto;
  }
  .detailTitle{
    margin: 10px;
    float: left;
  }
  .switch{
    display: inline-block;
    float: right;
    margin: 6px 10px;
  }
  .titleBox{
    overflow: hidden;
  }
  .setHot{
    display: inline-block;
    margin: 10px;
    vertical-align: top;
    height: 100%;
    line-height: 100%;
  }
</style>
