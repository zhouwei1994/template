import store from '@/config/store';
import $ajax from '@/config/fetch';
import {
  prompt,
  $alert,
  clickDateDiff,
  formatTime,
  loadMore
} from '@/config/utils';
export default {
  install(Vue) {
    /**
     * 加载更多
     */
    Vue.mixin(loadMore);
    /**
     * 时间戳转换为想要的时间格式
     */
    Vue.filter("format", function (value, format) {
      return formatTime(value, format);
    });
    /**
     * 时间转换为XX前
     */
    Vue.filter("getDateDiff", function (value) {
      return Vue.prototype.clickDateDiff(value);
    });
    /**
     * 金额保留两位
     */
    Vue.filter("decimal", function (value) {
      return parseFloat(value).toFixed(2);
    });
    /**
     * 消息提示
     */
    Vue.prototype.prompt = prompt;
    /**
     * 确认框 type = 1
     * 提示框 type = 2
     * 输入框 type = 3
     * 用法：
     * this.$alert("您还未登录，请登录", {}, res => {
     *    console.log(res); 
     *    //res.confirm 是否点击确认
     * });
     */
    Vue.prototype.$alert = $alert;
    /**
     * 数据请求
     * 用法：
     * this.$ajax("/a/b/c",{
     *   a:1,
     *   b:2
     * },{
     *   type:"GET", //默认GET 支持 GET，POST，FORM 表单提交，JSONP 跨域
     *   ownUrl:false, //默认false  等于true自定义请求路径，全局url无效
     *   prompt:true, //默认true  等于false不显示错误提示
     *   contentType:"application/json", //默认application/json  自定义请求头
     *   load:true,  //默认true 等于false不显示加载的转菊花
     * }).then(res => {
     *    console.log(res);
     * });
     */
    Vue.prototype.$ajax = $ajax;
  }
}
