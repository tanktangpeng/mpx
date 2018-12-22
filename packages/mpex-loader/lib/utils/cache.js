const cache = require('lru-cache')(100)

module.exports = {
  setCache (name, content) {
    cache.set(name, content)
  },
  getCache (name) {
    let content = cache.get(name)
    return content || ''
  },
  has (name) {
    let content = cache.get(name)
    return !!content
  }
}
