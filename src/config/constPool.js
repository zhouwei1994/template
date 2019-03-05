/**
 * 配置编译环境和线上环境之间的切换
 * 
 * baseUrl: 域名地址
 * routerMode: 路由模式
 * imgBaseUrl: 图片所在域名地址
 * 
 */

let baseUrl = '';
let routerMode = 'history';
let imgBaseUrl = '';
if (process.env.NODE_ENV == 'development') {
  baseUrl = 'https://www.zhenwang.so/needle/api/';
} else if (process.env.NODE_ENV == 'production') {
  routerMode = 'hash';
}

export {
  baseUrl,
  routerMode,
  imgBaseUrl,
}