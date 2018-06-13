# react-router4-redux-webpack
* use react,react-router4,redux and packaged by webpack
* this is react starter kit,client is build by on react ,react-ruoter4,redux,and server i used koa,and by the way,
if you like you can use express and so on
* async request used axios and send request to koa server,and for cros,i used webpack-dev-server proxy plugin,u can set it up easyly
# for run
```
npm i react-pw-cli
react-pw-cli init [your project namme]
cd [your project name]
npm i
start client: npm start
build client:npm run build
start mock server: npm run server
```

## 说明
* 这是一个基于react构建的开发脚手架，项目结构满足大部分开发需求，项目采用了react，react-router4，redux进行单页构建，并采用webpack3的版本来打包
所有组件全部异步加载
* 数据异步请求采用的axios，并使用webpack-dev-server做一次代理到koa启动的mock服务上，当然也可以使用express等node服务端框架

**react-router4.0**后改动比较大，3.0以前支持导出一个routes对象来配置路由，现在需要依赖他的react-router-dom来配置，
但官方文档也给出了一个例子可以参考
```
const RouteWithSubRoutes = (route) => (
  <Route path={route.path} render={props => (
    // pass the sub-routes down to keep nesting
    <route.component {...props} routes={route.routes}/>
  )}/>
)
const routerMaker = routes.map((route, i) => (
    <RouteWithSubRoutes key={i} {...route}/>
))

```
### webpack打包异步加载组件方式
react-router4.0之前在导出routes的时候，组件如果是配置成异步的webpack会自动codesplit，但之后不支持导出routes对象形式后，可以利用一个官方提供的lazy的方式来实现，代码见lazyLoad.js

请在路由文件中使用下面的方式来配置路由

```
const Loading = () => {
  return <div>loading component....</div>
}
const createComponent = (component) =>() => {
    let AsyncComponent = (
        <Lazyload load={component}>
            {
                (Async) => Async?<Async />:<Loading/>
            }
        </Lazyload>
    )
    return AsyncComponent
}
const routes = [
  {
    path:'/welcome',
    component:Welcome
  },
  {
    path:'/table',
    component:createComponent(TablePage)
  },
  {
    path:'/list',
    component:createComponent(ListPage)
  }
];
```
## 项目结构
* actions 更改store同步/异步的方法集合
* components 公共组件库
* containers 容器类组件
* layout模板布局 可不用，自己做相应删减
* routes 路由配置
* store 导出页面的store
* utils 一些公共方法
