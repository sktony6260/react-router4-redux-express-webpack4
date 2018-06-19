# react-router4-redux-webpack
* use react,react-router4.0,redux and server based by node express, packaged by webpack4.0
* this is react starter kit,client is build by on react ,react-ruoter4,redux,and server i used express,and by the way,
if you like you can use koa,thinkjs and so on,in this project i used antd ui framework
* async request used axios and send request to express server,and for cros,i used webpack-dev-server proxy plugin,u can set it up easyly
* for codesplitting,all components will be asynchronous loading
# for run
```
npm i react-pw-cli
react-pw-cli init [your project namme]
cd [your project name]
npm i
start client: npm start
build client:npm run build
start mock server: npm run mock
```

## Note
* this is scaffold of react,the project structure meets most of the development needs,included react,react-router4.0,redux,express,antd,and build with spa,packaged by webpack4.0,most important is all of components will asynchronous loading
* data communication required axios,and for local development,i passed all async request to express which use proxys of webpack-dev-server
* react-router4.0 changed a lot,it is almost rewrited,and for now,the core is react-router,and rest of functions split to other packages,like react-router-dom,react-router-config,before it change,we use **getComponent** and **require.ensure** of webpack to codespliting and load routes,but for now,getComponent has been removed,so we must change our way,just like the below

### How to loads route with asynchronous
**import('xxx'),async, await** was new features in es6,we can us it to help us,first of all,we must create a HOC to load our components and export it to routes seting of react-router,the code on the below

###  Packaging setting intro
* webpack.base.config.js - base config
* webpack.dev.config.js - for development
* webpack.prod.config.js - for production
* webpack.dll.config.js - for vendor

### Structure
* actions  - you request here
* components - public components
* containers - your page here
* layout模板布局  - site layout
* routes - export routes
* store - export single store for site
* utils - common js
* server  - api server with express

## 说明
* 这是一个基于react构建的开发脚手架，项目结构满足大部分开发需求，项目采用了react，react-router4.0，redux进行单页构建，并采用webpack4的版本来打包,所有组件全部异步加载
* 数据异步请求采用的axios，并使用webpack-dev-server做一次代理到express启动的服务上，当然也可以使用koa,thinkjs等node服务端框架

**react-router4.0**后改动比较大，几乎说是重写了router，现在的react-router只是一个基本核心库，多数的功能都放入了react-router-dom,react-router-config中，在router4以前，我们是使用getComponent的的方式来实现按需加载的，router4中，getComponent方法已经被移除。

### react-router4打包异步加载组件方式
react-router4.0之前利用getComponent的方法结合webpack的异步加载方式可以很容易的做到codesplit，但之后移除了getComponent就没办法沿用之前的方式了，但是可以借助ES6中引入的异步载入方法**import**在结合async,await语法来实现我们的需求，首先我们写一个异步加载react组件的方法，
```
**[HOC]**

export default function asyncComponent(importComponent) {
    class AsyncComponent extends Component {
        constructor(props) {
            super(props)

            this.state = {
                component: null
            }
        }

        async componentDidMount() {
            const { default: component } = await importComponent()

            this.setState({
                component: component
            })
        }

        render() {
            const C = this.state.component

            return C ? <C {...this.props} /> : 'loading....'
        }
    }

    return AsyncComponent
}
```
可以看到以上方法充分利用了es7的异步语法来实现了组件的异步载入，接下来我们在路由这样配置即可,并且支持嵌套


```
const routes = [
  {
    path:'/',
    // exact:false
    component:Layout,
    routes:[
      {
        path:'/dashbord',
        component:asyncComponentLoader(() => import('../containers/DashBord')),
        iconType:'dashboard',
        name:'dashboard',
        ....
      }
    ]
  }
];
```
### 打包说明
打包使用了现在最新的webpack4.0+的版本，算是目前跟得上潮流了，在3.0后4.0有了很多性能提升，打包速度更快并且利用好tree shaking让package的体积更小，首先利用webpack的DllPluginPlugin将平时不怎么变动的js打成一个dll包后引入，其他业务代码经过codespliting后在异步加载更加高效
* webpack.base.config.js 基础配置
* webpack.dev.config.js 开发环境配置
* webpack.prod.config.js 发布到生产环境
* webpack.dll.config.js 公共js库配置

### 项目结构
* actions 更改store同步/异步的方法集合
* components 公共组件库
* containers 容器类组件
* layout模板布局 defult是默认模板
* routes 导出路由配置
* store 导出页面的store
* utils 一些公共方法
* server 启动express服务用于提供api




