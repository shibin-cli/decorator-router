import {
  isArray
} from './util'

const routerMap = new Map()

export const get = path => router({
  method: 'get',
  path: path
})

export const post = path => router({
  method: 'post',
  path: path
})

export const put = path => router({
  method: 'put',
  path: path
})

export const del = path => router({
  method: 'del',
  path: path
})

export const all = path => router({
  method: 'all',
  path: path
})

const router = opts => (target, key) => {
  routerMap.set({
    target,
    ...opts
  }, target[key])
}

export const controller = path => target => {
  target.prototype['basePath'] = path
}

export const convert = (middleware) => (target, key, descriptor) => {
  if (!isArray(target[key])) {
    target[key] = [target[key]]
  }
  target[key].unshift(middleware)
  return descriptor
}

export const required = rules => convert(async (ctx, next) => {
  let missing = [query:[],body:[],]
  for (let k in rules) {
    let err = [],type=ctx.request[k]
    rules.forEach(i => {
      if(!type[i]){
        err.length?(missing[type]=[i]):missing[type].push(i)
      }
    })
  }
  await next()
})


export default class Route {
  init(router) {
    for (let [
        conf,
        controller
      ] of routerMap) {
      let basePath = ''
      if (conf.target['basePath']) {
        basePath = conf.target['basePath']
      }
      if (!isArray(controller)) {
        controller = [controller]
      }
      router[conf.method](basePath + conf.path, ...controller)
    }
  }
}
