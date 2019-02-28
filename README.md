# website

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install  //安装node运行环境

# serve with hot reload at localhost:8080
npm run dev  //启动开发环境服务器

# build for production with minification
npm run build  //打包生成命令

# build for production and view the bundle analyzer report
npm run build --report
```


# 项目布局

``` bash
├── build                                       // webpack配置文件
├── config                                      // 项目打包路径
├── src                                         // 源码目录
│   ├── components                              // 组件
│   │   ├── common                              // 公共组件
│   │   ├── footer                              // 底部公共组件
│   │   └── header                              // 头部公共组件
│   ├── config                                  // 基本配置
│   │   ├── env.js                              // 环境切换配置
│   │   ├── ajax.js                             // 获取数据
│   │   ├── filter.js                           // 常用vue过滤器
│   │   └── store.js                            // vuex配置
│   ├── images                                  // 公共图片
│   ├── page                                    // 项目页面
│   ├── router
│   │   └── index.js                            // 路由配置
│   ├── style
│   │   ├── common.scss                         // 公共样式文件
│   │   ├── mixin.scss                          // 样式配置文件
│   │   └── icon.scss                           // 字体图标文件
│   ├── App.vue                                 // 页面入口文件
│   ├── utils                                   // 常用工具
│   │   ├── base64.js                           // base64转码工具
│   │   ├── rem.js                              // rem布局文件
│   │   ├── request.js                          // 数据请求方法
│   │   └── utils.js                            // 常用小工具
│   ├── main.js                                 // 程序入口文件，加载各种公共组件
├── favicon.ico                                 // 图标
├── index.html                                  // 入口html文件
├── package.json                                // npm入口文件
├── dev.bat                                     // 项目启动文件
```
