import { getBrowser } from '@/utils/utils';
let current = "都市云";
if (process.env.NODE_ENV == 'development') {
  //开发环境
  current = "开发";
}
const currentConfig = {
  /****************开发环境****************/
  "开发": {
    //请求接口
    baseUrl: "https://www.kemean.com/cityUser/",
    //图片路径
    imgBaseUrl: "https://www.kemean.com/cityUser/",
    //微信人脸识别appid
    weiXinAppId: "A46j42n3PpfyMWux",
  },
  "都市云": {
    //请求接口
    baseUrl: "https://www.kemean.com/cityUser/",
    //图片路径
    imgBaseUrl: "https://www.kemean.com/cityUser/",
    //微信人脸识别appid
    weiXinAppId: "A46j42n3PpfyMWux",
  }
};
//手机号验证正则表达式
const phoneRegular = /^1\d{10}$/;
//邮箱验证正则表达式
const mailRegular = /^\w+@\w+(\.[a-zA-Z]{2,3}){1,2}$/;
//密码验证正则表达式
const passwordRegular = /^[a-zA-Z0-9]{4,10}$/;
//路由访问模式
const routerMode = "hash";
//浏览器环境
const browser = getBrowser();

export default Object.assign({
  phoneRegular,
  mailRegular,
  passwordRegular,
  routerMode,
  browser
}, currentConfig[current]);
