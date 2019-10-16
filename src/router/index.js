import Vue from 'vue'
import Router from 'vue-router'
import Home from '../view/Home/index'
import List from '../view/List/index'
import detail from "../view/detail/index";
import add from "../view/add/add";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/list',
      name: 'list',
      component: List
    },
    {
      path: '/detail/:bookId',
      name: 'detail',
      component: detail
    },
    {
      path: '/add',
      name: 'add',
      component: add
    },
    {
      path: '/collect',
      name: 'collect',
    }
  ]
})
