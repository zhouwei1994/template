import store from '@/config/store'
import {
  baseUrl
} from '@/config/env'

//请求方法
//noTip不显示提示         success请求成功执行的回调函数
//option{noTip:true,success:function(){}}
function async(url = '', data = {}, type = 'GET', options = {}, httpUrl = baseUrl) {
  let ajaxType = type.toUpperCase();
  url = httpUrl + url;
  let dataStr = ''; //数据拼接字符串
  if (type == 'FORM') {
    ajaxType = 'POST';
    dataStr = data;
  } else {
    Object.keys(data).forEach(key => {
      dataStr += key + '=' + data[key] + '&';
    })
    //匹配最后一个&并去除
    if (dataStr !== '') {
      dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));
    }
    if (type == 'GET') {
      url = url + '?' + dataStr;
      dataStr = "";
    }else if(type == 'JSONP'){
      url = url + '?' + dataStr+'&callback=process';
      dataStr = "";
    }
  }
  return new Promise((resolve, reject) => {
    if(!options.load){
      store.commit('getDataLoading', true)
    }
    if(type == 'JSONP'){
      window.process = function(data){
          resolve(data);
      }
      var script = document.createElement("script");
      script.src = url;
      document.head.appendChild(script);
      // 及时删除，防止加载过多的JS
      document.head.removeChild(script);
      store.commit('getDataLoading', false);
    }else{
      let requestObj;
      if (window.XMLHttpRequest) {
        requestObj = new XMLHttpRequest();
      } else {
        requestObj = new ActiveXObject;
      }
      requestObj.open(ajaxType, url, true);
      // requestObj.withCredentials = true;//通过将withCredentials属性设置为true，可以指定某个请求应该发送凭据
      if (type != 'FORM') {
        requestObj.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
      }
      if(options.language){
        requestObj.setRequestHeader("Accept-Language", "zh-CN,zh;q=0.8");
      }
      if(httpUrl == baseUrl){
        let user_token = store.state.userinfo.token ? store.state.userinfo.token : '';
        requestObj.setRequestHeader("token", user_token);
      }
      requestObj.send(dataStr);
      requestObj.onreadystatechange = () => {
        if (requestObj.readyState == 4) {
          store.commit('setLoading', false)
          if (requestObj.status == 200) {
            let obj = requestObj.response
            if (typeof obj !== 'object') {
              obj = JSON.parse(obj);
            }
            console.log(url, '\n', obj);
            resolve(handle(obj))
          } else {
            reject(requestObj)
          }
        }
      }
    }
  })
  //	}
  //数据处理
  function handle(obj) {
    if (parseInt(obj.code) == 0) {
      if (jugleType(options.success) == "Function") {
        //执行默认的成功方法
        options.success(obj);
        return obj;
      } else {
        return obj;
      }
    } else {
      return obj;
    }
  }
}
//校验数据是否为空，不为空返回true
function verifyNull(data) {
  let result = data && data != "null" && data != "undefined" && data != {} && data != [] ? true : false;
  return result;
}
export {
  async, verifyNull
}
