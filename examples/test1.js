import Route from '../src/index'
import Koa from 'koa'
import Router from 'koa-router'
import bodyParser from 'koa-bodyparser'
import path from 'path'
const app = new Koa()
const router = new Router()
const route = new Route()

app.use(bodyParser())
// route.setRouterPathAndInit(resolve(__dirname, './routes'), router, true)
async function start(){
  await route.setRouterPath(path.resolve(__dirname, './routes'))
  route.init(router)
  app
    .use(router.routes())
    .use(router.allowedMethods())
  app.listen(3000)
  console.log('server listen： http://localhost:3000')
}
start()
