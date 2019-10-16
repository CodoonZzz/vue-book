<template>
  <div id="app">
<!--    内容-->
    <router-view></router-view>
<!--    底部-->
    <van-tabbar v-model="active">
      <van-tabbar-item icon="wap-home-o" name="home" to="/home">首页</van-tabbar-item>
      <van-tabbar-item icon="wap-nav" name="list" to="/list">列表</van-tabbar-item>
      <van-tabbar-item icon="add-o" name="add" to="/add">添加</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>

    export default {
        name: 'App',
        data() {
            return {

            }
        },
        computed:{
            active:{
                get(){
                    switch (this.$route.name) {
                        case 'home':
                            return 'home';
                            break;
                        case 'list':
                            return 'list';
                            break;
                        case 'add':
                            return 'add';
                            break;
                    }
                },
                set(){

                }
            }
        },

    }
</script>

<style>
  #app {
    padding: 46px 0 50px;
  }
</style>
