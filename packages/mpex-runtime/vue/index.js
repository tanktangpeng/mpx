/*
 * export: createApp
 * export: createComponent
 */

import Vue from 'vue'
import VueRouter from 'vue-router'
import MpexUI from '@mpxjs/mpex-ui'

Vue.use(VueRouter)
Vue.use(MpexUI)

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
    option.components = extendOption.components

    return option
  }
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
