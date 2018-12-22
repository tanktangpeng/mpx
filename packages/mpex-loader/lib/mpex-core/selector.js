const parse = require('./parser')
const loaderUtils = require('loader-utils')

module.exports = function (content) {
  const query = loaderUtils.getOptions(this) || {}
  const parts = parse(content, this.resourcePath, this.sourceMap)
  let part = parts[query.type]
  if (Array.isArray(part)) {
    part = part[query.index]
  }
  this.callback(null, part.content, part.map)
}
