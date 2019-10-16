<template>
  <div>
    <van-nav-bar title="添加" :fixed = true />
    <van-uploader :after-read="afterRead" v-model="fileList" multiple :max-count="1" preview-size="200px" image-fit/>
    <div class="switch">
      <span class="setHot">设置热门</span><van-switch v-model="bookContent.hotBook" />
    </div>
<!--    <div class="titleBox">-->
<!--      <h3 class="detailTitle">修改图书信息:</h3>-->
<!--      -->
<!--    </div>-->
    <van-cell-group>
      <van-field v-model="bookContent.bookName" placeholder="请输入书名"/>
      <van-field v-model="bookContent.bookDesc" placeholder="请输入描述说明"/>
      <van-field v-model="bookContent.bookPrice" placeholder="请输入价格" type="number"/>
    </van-cell-group>
    <van-button type="info" round size="large" @click="addBook">添加</van-button>
  </div>

</template>


<script>
  import {addBook} from "../../../mock";
  import { Toast } from 'vant'

  export default {
        data() {
            return {
                fileList:[],
                bookContent: {
                    bookCover:"",
                    bookName:"",
                    bookPrice:"",
                    bookDesc:"",
                    hotBook:false
                }
            }
        },
        updated(){
        },
        name: "add",
        methods:{
            afterRead(file) {
                this.bookContent.bookCover = file.content;
            },
            async addBook(){
                Toast.allowMultiple();
                for (var i in this.bookContent){
                    if (this.bookContent[i] === ""){
                        Toast.fail('有未填写项');
                        return
                    }
                }
                const toast1 = Toast.loading({
                    mask: true,
                    message: '加载中...'
                });
                await addBook(this.bookContent)
                toast1.clear();
                Toast.success({
                    duration: 1000,
                    message: '添加成功',
                    onClose:()=>{
                        this.$router.go(-1)
                    }
                });
            }
        }
    }
</script>

<style scoped>
  .switch{
    display: inline-block;
    margin: 6px 10px;
  }
  .setHot{
    display: inline-block;
    margin: 10px;
    vertical-align: top;
    height: 100%;
    line-height: 100%;
  }
</style>
