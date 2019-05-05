import Vue from 'vue';
import Vuex from 'vuex';
import { setStore, modifyJson } from '@/utils/utils';
Vue.use(Vuex);
//全局变量
const state = {
  //加载时动画
  loading: 0,
  //跳转页面动画模式
  direction: 'fade',
  //需求缓存的页面
  keepAliveList: [],
  //用户信息
  userInfo: {},
};
//缓存浏览器的数据名称
const cacheNameList = ["userInfo"];
//数据处理
const mutations = { //触发状态
  //取出缓存数据
  setCacheData(state) {
    for (var name of cacheNameList) {
      var data = sessionStorage.getItem(name) || localStorage.getItem(name);
      if (data) {
        var dataObj = JSON.parse(data);
        if (/userInfo/.test(name)) {
          if (new Date().getTime() - dataObj.time < 86400000) {
            state[name] = dataObj.data;
          }
        } else {
          state[name] = dataObj;
        }
      }
    }
  },
  //加载时动画
  setLoading(state, payload) {
    if (payload) {
      state.loading = state.loading + 1;
    } else {
      state.loading = state.loading - 1;
    }
  },
  //跳转页面动画模式
  setDirection(state, payload) {
    state.direction = payload;
  },
  //需求缓存的页面
  setKeepAliveList(state, payload) {
    if (payload.type == "init") {
      state.keepAliveList = [].concat(payload.list);
    } else if (payload.type == "add") {
      state.keepAliveList.push(payload.name);
    } else if (payload.type == "delete") {
      state.keepAliveList.splice(state.keepAliveList.indexOf(payload.name), 1);
    }
  },
  //储存用户信息
  setUserInfo(state, payload) {
    if (payload) {
      state.userInfo = modifyJson(payload, state.userInfo);
      setStore('userInfo', state.userInfo);
    }
  },
}
//异步处理
const actions = {

}
export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state,
  mutations,
  actions
})