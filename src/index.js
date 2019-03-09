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
      router[conf.method](basePath + conf.path, controller)
    }
  }
}
