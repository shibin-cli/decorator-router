import Route, {
  post,
  put,
  del,
  controller
} from '../dist/index'
import Koa from 'koa'
import Router from 'koa-router'

const app = new Koa()
const router = new Router()
const route = new Route()

@controller('/article')
class Article {
  @get('/detail/:id')
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
  @del('/del') {
    ctx.body = 'del'
  }
}

route.init(router)
app
  .use(router.routes())
  .use(router.allowedMethods())
app.listen(3000)
console.log('server listen： http://localhost:3000')
