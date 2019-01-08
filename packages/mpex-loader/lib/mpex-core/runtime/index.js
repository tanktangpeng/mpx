const async = require('async')
const loaderUtils = require('loader-utils')

function makeRoutes ({ pages }) {
  let result = ''
  result += '['
  let component = Object.keys(pages).map(i => {
    let routePrifix = pages[i][0] === '/' ? '' : '/'
    return `{path: "${routePrifix}${pages[i]}", component: ${i}}`
  }).join(',')
  result += (component + ']')

  return result
}

function makeComponents ({ components }) {
  let result = ''
  result += '{'
  let component = Object.keys(components).map(i => {
    return i
  }).join(',')
  result += (component + '}')

  return result
}

function makeRender () {
  return `
    function (createElement) {
      return createElement(
        'div',
        {},
        [
          createElement('router-view')
        ]
      )
    }
  `
}

function makeVueRuntime (options) {
  let rawScriptSrc = options.rawScriptSrc
  let context = options.context
  let src = '\n'
  return new Promise((resolve, reject) => {
    let requireComponents = {}
    async.waterfall([
      (callback) => {
        let allComponents = Object.assign({}, options.components, options.pages)
        // 收集json中的usingComponents和pages用到的组件列表
        async.eachOf(allComponents, (path, component, callback) => {
          options.resolve(context, path, (err, result, info) => {
            if (err) {
              callback(err)
            } else {
              // 相对路径变绝对路径
              requireComponents[component] = result
              callback(null)
            }
          })
        }, callback)
      },
      (callback) => {
        // import components
        for (let i in requireComponents) {
          src += `import ${i} from ${loaderUtils.stringifyRequest(options.loaderContext, requireComponents[i])}\n`
        }

        // runtime
        let runtime = options.type === 'app' ? 'createApp' : 'createComponent'
        src += `import {${runtime}} from '@mpxjs/mpex-loader/lib/mpex-core/runtime/templates/vue-runtime'\n`

        // original options
        src += rawScriptSrc + '\n'

        // injectOptions
        src += `let injectOptions = {}\n`
        if (options.type === 'app') {
          src += `injectOptions.render = ${makeRender()}\n`
          src += `injectOptions.routes = ${makeRoutes(options)}\n`
          src += `injectOptions.globalComponents = ${makeComponents(options)}\n`
        } else {
          src += `injectOptions.components = ${makeComponents(options)}\n`
        }

        // components
        src += `export default ${runtime}(options, injectOptions)\n`

        callback(null, src)
      }
    ], (err, result) => {
      if (err) {
        reject(err)
      } else {
        resolve(result)
      }
    })
  })
}

function makeMiniRuntime (options) {
  let src = '\n'
  let runtime = options.type === 'app' ? 'createApp' : 'createComponent'
  let mode = options.mode || 'wx'
  let runtimePackageName
  if (mode === 'wx') {
    runtimePackageName = 'core'
  } else if (mode === 'ali') {
    runtimePackageName = 'core-ant'
  }
  src += `import {${runtime}} from '@mpxjs/${runtimePackageName}'\n`
  src += options.rawScriptSrc + '\n'
  src += `${runtime}(options)\n`
  return src
}

function createRuntime (options) {
  if (options.mode === 'vue') {
    return makeVueRuntime(options)
  } else {
    return makeMiniRuntime(options)
  }
}
module.exports = createRuntime
