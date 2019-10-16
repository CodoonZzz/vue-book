// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// 标签栏
import { Tabbar, TabbarItem } from 'vant';
Vue.use(Tabbar).use(TabbarItem);
// 导航栏
import { NavBar } from 'vant';
Vue.use(NavBar);
// 轮播
import { Swipe, SwipeItem } from 'vant';
Vue.use(Swipe).use(SwipeItem);
// 主页宫格
import { Grid, GridItem } from 'vant';
Vue.use(Grid).use(GridItem)
// 图片
import { Image } from 'vant';
Vue.use(Image);
// 图标
import { Icon } from 'vant';
Vue.use(Icon);
// 列表
import { List } from 'vant';
Vue.use(List);
// 单元格
import { Cell, CellGroup } from 'vant';
Vue.use(Cell).use(CellGroup);
// 按钮
import { Button } from 'vant';
Vue.use(Button);
// 输入框
import { Field } from 'vant';
Vue.use(Field);
// 上传
import { Uploader } from 'vant';
Vue.use(Uploader);
// 开关
import { Switch } from 'vant';
Vue.use(Switch);

Vue.config.productionTip = false


new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
