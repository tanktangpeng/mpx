import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

function normalizeOptions (type, option, extendOption) {
  if (type === 'app') {
    if (extendOption.routes) {
      option.router = new VueRouter({
        routes: extendOption.routes
      })
    }
    if (extendOption.globalComponents) {
      Object.keys(extendOption.globalComponents).forEach(i => {
        Vue.component(i, extendOption.globalComponents[i])
      })
    }
    option.render = extendOption.render
    return option
  } else if (type === 'component') {
    // return blabla
    option.components = extendOption.components
    return option
  }

  return Object.assign({}, option, extendOption)
}

export function createApp (option, extendOption) {
  let normalized = normalizeOptions('app', option, extendOption)
  new Vue(normalized) // eslint-disable-line

  return normalized
}

export function createComponent (option, extendOption) {
  let normalized = normalizeOptions('component', option, extendOption)

  return normalized
}
