import Route, {
  post,
  put,
  del,
  get,
  controller,
  convert
} from '../dist/index'
import Koa from 'koa'
import Router from 'koa-router'

const app = new Koa()
const router = new Router()
const route = new Route()

const isArray = function(obj) {
  return Array.isArray(obj)
}

const auth = convert(async (ctx, next) => {
  console.log("auth")
  await next()
})
@controller('/article')
class Article {
  @get('/detail/:id')
  @auth()
  getDetail(ctx, next) {
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
console.log('server listen： http://localhost:3000')
