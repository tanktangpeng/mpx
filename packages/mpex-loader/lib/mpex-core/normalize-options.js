const path = require('path')
const hash = require('hash-sum')

class NormalizeOptions {
  constructor (options) {
    this._options = options
    this.type = options.type
    this.mode = options._options.mode || 'wx'
    this.context = options.loaderContext.context
    this.resource = options.loaderContext.resource
    this.resolve = options.resolve
    this.loaderContext = options.loaderContext
    this.components = this.createComponents()
    this.pages = this.createPages()
  }

  createPages () {
    let jsonOptions = this._options.jsonOptions
    let components = {}
    if (jsonOptions) {
      if (jsonOptions.pages) {
        jsonOptions.pages.forEach(i => {
          let key = path.basename(i) + hash(i)
          components[key] = i
        })
      }
    }
    return components
  }

  createComponents () {
    let jsonOptions = this._options.jsonOptions
    let components = {}
    if (jsonOptions) {
      if (jsonOptions.usingComponents) {
        components = jsonOptions.usingComponents
      }
    }
    return components
  }
}

module.exports = NormalizeOptions
