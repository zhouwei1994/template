# website

> 一个Vue.js项目

## Build Setup

``` bash
# 用Git从Github上拉取项目
git clone https://github.com/zhouwei1994/template

# 进入template
cd template

# 安装项目依赖项
npm install

# 启动服务器，在localhost：8080进行加载
npm run dev

# 打包生产环境
npm run build

# 构建用于生产并查看捆绑分析器报告
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
│   ├── App.vue                                 // 项目主界面
│   ├── main.js                                 // 程序入口文件，加载各种公共组件
├── favicon.ico                                 // 图标
├── index.html                                  // 入口html文件
├── package.json                                // npm入口文件
└── dev.bat                                     // 项目启动文件
```
