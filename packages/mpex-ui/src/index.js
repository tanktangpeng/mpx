import {
  View
} from './module'

import setVue from './set-vue'

const components = [
  View
]

function install (Vue) {
  if (install.installed) {
    return
  }
  setVue(Vue)
  install.installed = true
  components.forEach((Component) => {
    Component.install(Vue)
  })
}

const MpexUI = {
  install
}

export default MpexUI
