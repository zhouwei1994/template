import store from '@/config/store'
import {
  baseUrl
} from '@/config/env'
import {
  prompt,
  $alert,
} from '@/config/utils'
//请求方法
let ajaxNum = 0;
export default function $ajax(url = '', data = {}, options = {}) {
  //把请求结果转换为大写的
  let ajaxType = (options.type || "GET").toUpperCase();
  //请求地址
  let httpUrl = options.ownUrl ? url : baseUrl + url;
  //是否提示--默认提示
  let promptState = options.prompt === false ? false : true;
  //数据拼接字符串
  let dataStr = '';
  if (ajaxType == 'FORM') {
    ajaxType = 'POST';
    dataStr = data;
  } else if (ajaxType == 'POST') {
    dataStr = JSON.stringify(data);
  } else {
    Object.keys(data).forEach(key => {
      dataStr += key + '=' + data[key] + '&';
    })
    //匹配最后一个&并去除
    if (dataStr !== '') {
      dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));
    }
    if (ajaxType == 'GET') {
      httpUrl = httpUrl + '?' + dataStr;
      dataStr = "";
    } else if (ajaxType == 'JSONP') {
      httpUrl = httpUrl + '?' + dataStr + '&callback=process';
      dataStr = "";
    }
  }
  return new Promise((resolve, reject) => {
    if (!options.load) {
      store.commit('setDataLoading', true);
      ajaxNum++;
    }
    if (ajaxType == 'JSONP') {
      window.process = function (data) {
        resolve(data);
      }
      var script = document.createElement("script");
      script.src = httpUrl;
      document.head.appendChild(script);
      // 及时删除，防止加载过多的JS
      document.head.removeChild(script);
      ajaxNum = ajaxNum - 1;
      if (ajaxNum <= 0) {
        store.commit('setDataLoading', false);
      }
    } else {
      let requestObj;
      if (window.XMLHttpRequest) {
        requestObj = new XMLHttpRequest();
      } else {
        requestObj = new ActiveXObject;
      }
      requestObj.open(ajaxType, httpUrl, true);
      // requestObj.withCredentials = true;//通过将withCredentials属性设置为true，可以指定某个请求应该发送凭据
      if (options.contentType) {
        requestObj.setRequestHeader("Content-Type", options.contentType);
      } else if (options.contentType == undefined) {
        requestObj.setRequestHeader("Content-Type", "application/json");
      }
      //修改接口语言
      // if (options.language) {
      //   requestObj.setRequestHeader("Accept-Language", "zh-CN,zh;q=0.8");
      // }
      //非本项目接口加入一个token
      if (!options.ownUrl) {
        requestObj.setRequestHeader("token", store.state.userInfo.token || '');
      }
      requestObj.send(dataStr);
      requestObj.onreadystatechange = () => {
        if (requestObj.readyState == 4) {
          //关闭加载动画
          ajaxNum = ajaxNum - 1;
          if (ajaxNum <= 0) {
            store.commit('setDataLoading', false);
          }
          //请求成功
          if (requestObj.status == 200) {
            let result = requestObj.response
            if (typeof result !== 'object') {
              result = JSON.parse(result);
            }
            console.log(url, '\n', result);
            //判断数据是否请求成功
            if (result.success) {
              resolve(result.data);
            } else if (parseInt(result.code) == 1000) {
              $alert("您还未登录，请登录", {}, () => {
                $vm.$router.push('/');
              });
            } else {
              if (promptState) {
                prompt(result.info);
              }
              reject(result);
            }
          } else {
            prompt("网络错误");
          }
        }
      }
    }
  })
}
