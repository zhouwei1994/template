import Vue from 'vue'
import Router from 'vue-router'
import {
  routerMode
} from '@/config/env'
import store from '@/config/store'
Vue.use(Router)
//路由配置
const routes = [
  {
    path: '/',
    name: 'index',
    component: resolve => require(['@/page/home/index.vue'], resolve)
  },
  {
    path: '/mall',
    name: 'mall',
    component: resolve => require(['@/page/mall/mall.vue'], resolve)
  },
  {
    path: '/order',
    name: 'order',
    component: resolve => require(['@/page/order/order.vue'], resolve)
  },
  {
    path: '/my',
    name: 'my',
    component: resolve => require(['@/page/my/my.vue'], resolve)
  },
];
let router = new Router({
  //模式
  mode: routerMode,
  //代码检查
  // strict: process.env.NODE_ENV !== 'production',
  //页面滚动
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      if (from.meta.keepAlive) {
        from.meta.savedPosition = document.body.scrollTop;
      }
      return {
        x: 0,
        y: to.meta.savedPosition || 0
      }
    }
  },
  routes,
  "router-link-active": "active",
  "linkExactActiveClass": "active",
});
//页面加载时
//页面加载时
var historyList = new Array("/");
router.beforeEach(function (to, from, next) {
  var pageState = true;
  var fromIndex = 0;
 
  historyList.forEach((item, index) => {
    if (item === to.path) {
      pageState = false;
    }
    if (item === from.path) {
      fromIndex = index;
    }
  });
  if (pageState) {
    store.commit('setDirection', true);
    store.commit('setKeepAliveList', {name:to.name,state:true});
    historyList.push(to.path);
  } else {
    historyList.splice(fromIndex, 1);
    store.commit('setDirection', false);
    store.commit('setKeepAliveList', {name:from.name,state:false});
  }
  //页面加载前
  store.commit('setPageLoading', true);
  next();
});
//页面销毁时
router.afterEach(function (to) {
  store.commit('setPageLoading', false);
});
export default router;
