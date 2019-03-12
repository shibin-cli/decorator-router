import {
  isArray,
  hasOwnProperty
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
  method: 'delete',
  path: path
})

export const use = path => router({
  method: 'use',
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
  let missing = {}
  let hasError = false
  let request = ctx.request
  if (hasOwnProperty(rules, 'params')) {
    request.params = ctx.params
  }
  for (let k in rules) {
    let errs = []
    rules[k].forEach(item => {
      if (!request[k] || !request[k][item]) {
        errs.push(item)
      }
    })
    if (errs.length) {
      missing[k] = `${errs.join(',')} is required`
      hasError = true
    }
  }
  if (hasError) {
    ctx.body = {
      statusCode: 400,
      error: "Bad Request",
      message: missing
    }
    return missing
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
