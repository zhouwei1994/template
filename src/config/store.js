import Vue from 'vue'
import Vuex from 'vuex'
import {
  setStore,
  getStore,
  removeStore
} from '@/config/mUtils'
Vue.use(Vuex)
//全局变量
const state = {
  //页面加载时
  pageLoading: false,
  //数据加载时
  dataLoading: false,
  //当前页面路径
  path: '',
  //跳转页面动画模式
  direction: 'forward',
}
//缓存浏览器的数据名称
const cacheNameList =[];
//数据处理
const mutations = { //触发状态
  //取出缓存数据
  setCacheData(state){
    for(var item of cacheNameList){
      let getData = sessionStorage.getItem(item);
      if(getData){
        state[item] = JSON.parse(getData);
      }
    }
  },
  //页面加载时
  setPageLoading(state,payload){
    state.pageLoading = payload;
  },
  //数据加载时
  setDataLoading(state,payload){
    state.dataLoading = payload;
  },
  //当前页面路径
  setPath(state,payload){
    state.path = payload;
  },
  //跳转页面动画模式
  setDirection (state, payload) {
    state.direction = payload;
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
