import {
  isArray
} from './util'

const routerMap = new Map()

export const get = path => router({
  method: 'get',
  path: path
})

export const post = path => router({
  method: 'get',
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

export const convert = (middleware) => () => (target, key, descriptor) => {
  if (!isArray(target[key])) {
    target[key] = [target[key]]
  }
  target[key].unshift(middleware)
  return descriptor
}


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
