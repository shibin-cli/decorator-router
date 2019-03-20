import {
  post,
  put,
  del,
  get,
  controller,
  convert,
  required
} from '../../src/index'
const auth = convert(async (ctx, next) => {
  console.log("auth")
  await next()
})
@controller('/article')
class Article {
  @get('/detail/:id')
  @auth
  @required({
    query:['id', 'name'],
    params:['id']
  })
  getDetail(ctx, next) {
    ctx.body = `detail ${ctx.params.id}`
  }

  @put('/add')
  addArticle(ctx) {
    ctx.body = 'add'
  }

  @post('/post')
  @required({
    body:['name','id']
  })
  updateArticle(ctx) {
    ctx.body = 'article post'
  }

  @del('/del')
  delArticle(ctx) {
    ctx.body = 'del'
  }
}
