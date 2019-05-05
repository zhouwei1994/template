import Vue from 'vue';
//主组件
import App from './App';
//vue路由
import router from './router';
//vuex配置文件
import store from '@/config/store';
//常用过滤器
import filter from '@/config/filter';
Vue.use(filter);
Vue.config.productionTip = false;
import zHeader from '@/components/header';
Vue.component("zHeader", zHeader);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {
    App
  }
})