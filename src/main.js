// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
//主组件
import App from './App'
//vue路由
import router from './router'
//vuex配置文件
import store from '@/config/store'
//常用过滤器
import filter from '@/config/filter'
Vue.use(filter);
//头部
import headTop from '@/components/header/head';
//引用rem配置
import '@/config/rem'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
//注册全局组件（头部）
Vue.component('headTop',headTop);
