import {
  post,
  put,
  del,
  get,
  controller,
  convert,
  required
} from '../../src/index'
@controller('/express')
class Express{
  @put('/add')
  addArticle(ctx) {
    ctx.body = 'add'
  }

  @post('/post')
  @required({
    body:['name','id']
  })
  updateArticle(ctx) {
    ctx.body = 'express post'
  }

  @del('/del')
  delArticle(ctx) {
    ctx.body = 'del'
  }
}
