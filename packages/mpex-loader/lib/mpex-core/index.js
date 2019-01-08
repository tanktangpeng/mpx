const path = require('path')
const parse = require('./parser')
const compiler = require('./compiler')
const createRuntime = require('./runtime')
const NormalizeOptions = require('./normalize-options')
const loaderUtils = require('loader-utils')

function compile (content, options) {
  let filePath = options.loaderContext.resource
  let loaderContext = options.loaderContext
  let vueSfc
  let transpilerOptions

  return Promise.resolve().then(() => {
    let runtimeFile = path.resolve(__dirname, './js-runtime.js')
    loaderContext.addDependency(runtimeFile)
    let sfc = parse(content, filePath, {})

    // 新建一个SFC，避免转vue操作中修改原始SFC
    vueSfc = Object.assign({}, sfc)

    try {
      let ret = JSON.parse(vueSfc.json.content)
      options.jsonOptions = ret
    } catch (e) {}

    transpilerOptions = new NormalizeOptions(options)

    if (transpilerOptions.mode === 'vue') {
      delete vueSfc.json
    }

    // inject js-runtime
    const selectorLoader = path.resolve(__dirname, 'selector')
    const request = `!!${selectorLoader}?type=script!${filePath}`
    let rawScriptSrc = 'import options from ' + loaderUtils.stringifyRequest(loaderContext, request)
    transpilerOptions.rawScriptSrc = rawScriptSrc

    return createRuntime(transpilerOptions)
  }).then(jsRuntime => {
    vueSfc.script.transformedContent = jsRuntime

    vueSfc = compiler.transpileComponent(vueSfc, transpilerOptions)
    let result = compiler.serializeComponent(vueSfc)
    return result
  })
}

module.exports = {
  compile
}
