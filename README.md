# koa-decorator-router
[![npm](https://img.shields.io/npm/v/koa-decorator-router.svg?style=flat-square)](https://www.npmjs.com/package/koa-decorator-router)

[中文文档](https://github.com/shibin-you/decorator-router/blob/master/docs/README_zh-CN.MD)

Decorator Routing

## Install

    npm i koa-decorator-router -S

```javascript
import Route, {
  post,
  put,
  del,
  get,
  controller,
  convert
} from 'koa-decorator-router'
import Koa from 'koa'
import Router from 'koa-router'

const app = new Koa()
const router = new Router()
const route = new Route()

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

## Api

-   controller

methods

-   get
-   put
-   post
-   all
-   convert
-   required   

### Route
  * `setRouterPath`  Set the location of the import routing folder and import files
  * `init`  Functions for mounting routing
  * `setRouterPathAndInit` Import routing file and automatically initialize after completion

```javascript
route.setRouterPathAndInit(path.resolve(__dirname, './routes'), router)
app
  .use(router.routes())
  .use(router.allowedMethods())
app.listen(3000)
```
or
```javascript
async function start(){
  await route.setRouterPath(path.resolve(__dirname, './routes'))
  route.init(router)
  app
    .use(router.routes())
    .use(router.allowedMethods())
  app.listen(3000)
}
start()
```
