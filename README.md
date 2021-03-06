# website

> 一个Vue.js项目

## 项目安装

``` bash
# 用Git从Github上拉取项目
git clone https://github.com/zhouwei1994/template

# 进入template
cd template

# 安装项目依赖项
npm install

# 开发模式，启动服务器，在localhost:8000进行加载
npm run serve

# 打包生产环境
npm run build

# 运行测试
npm run test

# 提示和修复文件
npm run lint
```


# 项目布局

``` bash
├── public                                      // 项目打包路径
│   ├── favicon.ico                             // 浏览器显示图标
│   └── index.html                              // 入口html文件
├── src                                         // 源码目录
│   ├── components                              // 组件
│   │   ├── common                              // 公共组件
│   │   ├── navigation                          // 底部导航组件
│   │   └── header                              // 头部公共组件
│   ├── config                                  // 基本配置
│   │   ├── constPool.js                        // 环境切换配置
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
│   │   ├── init.scss                           // 样式初始化文件
│   │   └── icon.scss                           // 字体图标文件
│   ├── App.vue                                 // 页面入口文件
│   ├── utils                                   // 常用工具
│   │   ├── base64.js                           // base64转码工具
│   │   ├── rem.js                              // rem布局文件
│   │   ├── request.js                          // 数据请求方法
│   │   └── utils.js                            // 常用小工具
│   ├── App.vue                                 // 项目主界面
│   └── main.js                                 // 程序入口文件，加载各种公共组件
├── .jsbeautifyrc                               // Beautify插件配置
├── .jshintrc                                   // jshint插件配置，js严格模式开发
├── babel.config.js                             // vue-cli插件配置
├── package.json                                // npm入口文件
├── README.md                                   // 项目介绍文件
├── serve.bat                                   // 项目快捷启动文件
└── vue.config.js                               // vue-cli项目配置文件
```
