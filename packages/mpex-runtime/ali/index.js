/*
 * export: createApp
 * export: createComponent
 */

import {
  createApp as rawCreateApp,
  createComponent as rawCreateComponent
} from '@mpxjs/core-ant'

function normalizeOptions (type, option, extendOption) {
  return Object.assign({}, option, extendOption)
}

export function createApp (option, extendOption) {
  let normalized = normalizeOptions('app', option, extendOption)

  rawCreateApp(normalized)
}

export function createComponent (option, extendOption) {
  let normalized = normalizeOptions('component', option, extendOption)

  rawCreateComponent(normalized)
}
