import Vue from 'vue'
import Vuex from 'vuex'
import {
  setStore,
  getStore,
  removeStore,
  modifyJson
} from '@/config/utils'
Vue.use(Vuex)
//全局变量
const state = {
  //页面加载时
  pageLoading: false,
  //数据加载时
  dataLoading: false,
  //跳转页面动画模式
  direction: 'forward',
  //需求缓存的页面
  keepAliveList: [],
  //用户信息
  userInfo: {},
}
//缓存浏览器的数据名称
const cacheNameList = ["userInfo"];
//数据处理
const mutations = { //触发状态
  //取出缓存数据
  setCacheData(state) {
    for (var item of cacheNameList) {
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
  //页面加载时
  setPageLoading(state, payload) {
    state.pageLoading = payload;
  },
  //数据加载时
  setDataLoading(state, payload) {
    state.dataLoading = payload;
  },
  //跳转页面动画模式
  setDirection(state, payload) {
    state.direction = payload;
  },
  //需求缓存的页面
  setKeepAliveList(state, payload) {
    if (payload.state) {
      state.keepAliveList.push(payload.name);
    } else {
      state.keepAliveList.forEach((item, index) => {
        item == payload.name && state.keepAliveList.splice(index, 1);
      });
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
