<template>
  <div>
    <van-nav-bar title="主页" :fixed = true />
    <van-swipe :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="(item,index) in slider" :key="index">
        <img :src="item" width="100%">
      </van-swipe-item>
    </van-swipe>

    <p class="hotbooks"><van-icon name="award-o" size="30px"/> 新书热卖</p>
    <van-grid  :column-num="2" icon-size="150px">
      <van-grid-item v-for="item in list" :key="item.bookId" :to="{name:'detail',params:{bookId:item.bookId}}">
        <van-image :src="item.bookCover"/>
        <p>{{item.bookName}}</p>
      </van-grid-item>
    </van-grid>
  </div>

</template>

<script>
    import {getSliders,getHotBooks} from "../../../mock/index";

    export default {
        name: "index",
        created() {
            this.getSliders()
            this.getHotBooks()
        },
        data() {
            return {
                slider: [],
                list: []
            }
        },
        methods:{
            async getSliders(){
                let res = await getSliders()
                this.slider = res.data
            },
            async getHotBooks(){
                let res = await getHotBooks()
                this.list = res.data
            },

        }
    }
</script>

<style scoped>
  .hotbooks{
    color: red;
    font-weight: 800;
    margin-left: 10px;
  }
</style>
