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
  @middleware1()
  getDetail(ctx) {
    ctx.body = `detail ${ctx.params.id}`
  }

  @put('/add')
  addArticle() {
    ctx.body = 'add'
  }

  @post('/post')
  updateArticle() {
    ctx.body = 'post'
  }

  @del('/del')
  delArticle() {
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

### Route

  `init`  Functions for mounting routing
