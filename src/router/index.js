import Vue from 'vue'
import Router from 'vue-router'
import {
  routerMode
} from '@/config/env'
import store from '@/config/store'
Vue.use(Router)
//路由配置
const routes = [{
  path: '/',
  name: 'index',
  component: resolve => require(['@/page/home/index.vue'], resolve)
}];
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
const history = window.sessionStorage
history.clear()
let historyCount = history.getItem('count') * 1 || 0
history.setItem('/', 0)
//页面加载时
router.beforeEach(function (to, from, next) {
  store.commit('setPageLoading', true);
  store.commit('setPath', to.path)
  const toIndex = history.getItem(to.path)
  const fromIndex = history.getItem(from.path)

  if (toIndex) {
    if (toIndex > fromIndex || !fromIndex || (toIndex === '0' && fromIndex === '0')) {
      store.commit('setDirection', 'forward')
    } else {
      store.commit('setDirection', 'reverse')
    }
  } else {
    ++historyCount
    history.setItem('count', historyCount)
    to.path !== '/' && history.setItem(to.path, historyCount)
    store.commit('setDirection', 'forward')
  }

  if (/\/http/.test(to.path)) {
    let url = to.path.split('http')[1]
    window.location.href = `http${url}`
  } else {
    next();
  }
});
//页面销毁时
router.afterEach(function (to) {
  store.commit('setPageLoading', false);
});
export default router;
