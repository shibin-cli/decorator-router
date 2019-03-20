# koa-decorator-router
[![npm](https://img.shields.io/npm/v/koa-decorator-router.svg?style=flat-square)](https://www.npmjs.com/package/koa-decorator-router)

Decorator Routing

## Install

    npm i koa-decorator-router -S

 下面来看下在nodejs里使用[koa-decorator-router](https://github.com/shibin-you/decorator-router)实现装饰器路由
* 由于nodejs目前 还不支持装饰器的写法，所以需要配置babel，.babelrc配置如下，所以还需安装```npm i babel-cli babel-core babel-plugin-transform-decorators-legacy babel-polyfill babel-preset-env babel-preset-stage-0 -D```
```
{
  "presets": ["env","stage-0"],
  "plugins": ["transform-decorators-legacy"]
}
```
* 新建一个入口文件，引入项目的入口文件app.js
```javascript
require('babel-core/register')()
require('babel-polyfill')
require('./server/app.js')
```
* app.js示例代码如下
```javascript
import Route, {
  post,
  put,
  del,
  get,
  controller,
  convert,
  required
} from 'koa-decorator-router'
import Koa from 'koa'
import Router from 'koa-router'
import bodyParser from 'koa-bodyparser'

const app = new Koa()
const router = new Router()
const route = new Route()

app.use(bodyParser())

const middleware1 = convert(async (ctx, next) => {
  console.log("middleware1")
  await next()
})

@controller('/article')
class Article {

  @get('/detail/:id')
  @middleware1
  getDetail(ctx) {
    ctx.body = `detail ${ctx.params.id}`
  }

  @put('/add')
  addArticle(ctx) {
    ctx.body = 'add'
  }

  @post('/post')
  @required({
    body: ['id', 'name']
  })
  updateArticle(ctx) {
    ctx.body = 'post'
  }

  @del('/del')
  delArticle(ctx) {
    ctx.body = 'del'
  }
}

route.init(router)
app
  .use(router.routes())
  .use(router.allowedMethods())
app.listen(3000)
```
* ```koa-decorator-router```里面包含了```get、post、del、put、controller、 convert```方法和一个```Route```类。
  -  其中```controller```是为了修饰类，接收一个参数url。所修饰的类下面的所有请求地址都应加上这个url。如上面代码所示，请求地址就为```/article/**```
  -  ```get、post、del、put```就是请求方式，为了修饰类下面的方法
  -  ```convert```方法接收一个函数，将接收的函数转化成中间键。当使用中间键是需要使用```convert```方法转化下，因为直接写成装饰器，因为它不知道装饰器上方法是个中间键，如上面代码所示```middleware1 ```方法
  -  ```required```这个方法支持一些简单的参数校验。它接收一个对象参数，里面的键可以为```body```、```params```和```query```，键值是必传参数组成的数组。如上面代码所示，```/post```接口的必传参数是```id```和```name```。参数校验只支持一级，需更复杂的校验时，需要自己写中间键进行校验。
  -  ```Route```类下面有个```init```方法，接收一个参数，就是实例化的路由。这里需要注意是，在调用```init```方法要放在所有声明装饰器类的后面执行，因为这步是将装饰器路由上的所有方法挂载到路由上去
