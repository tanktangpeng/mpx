const path = require('path')
const DEFAULT_DIR = {
  wx: 'wx',
  ali: 'ali',
  vue: 'vue'
}

module.exports = class MpexResolvePlugin {
  constructor (source, options, target) {
    this.source = source
    this.options = options
    this.target = target
  }

  apply (resolver) {
    const target = resolver.ensureHook(this.target)
    resolver.getHook(this.source).tapAsync('MpexResolvePlugin', (request, resolveContext, callback) => {
      if (request.descriptionFileData.mpex) {
        // 不转换相对路径的引用
        if (request.request) return callback()

        // 计算拼接路径
        // 例如：import xxx from '@mpxjs/mpex-runtime/a/b/c' -> a/b/c
        const fakeResourcePath = path.resolve(request.descriptionFileRoot, request.relativePath)
        const dir = path.relative(request.descriptionFileRoot, fakeResourcePath)

        // 不转换携带ignore参数的
        let query = request.query.match(/(\?.+)/)
        if (query) {
          let queryStr = query[1].substr(1)
          let parsed = queryStr.split('&')
          let shouldIgnore = parsed.some(i => i.match(/ignore/))
          if (shouldIgnore) return callback()
        }

        if (request.hasMpexResolved) return callback()

        // start
        const mpexRuntime = request.descriptionFileData.mpex
        const dirMaps = typeof mpexRuntime === 'object' ? mpexRuntime : DEFAULT_DIR
        const rootDir = dirMaps[this.options.mode]
        const subPath = dir ? ('/' + dir) : ''
        const obj = Object.assign({}, request, {
          path: request.descriptionFileRoot, // always be the package root
          request: './' + rootDir + subPath,
          relativePath: '.', // always keep relativePath empty
          hasMpexResolved: true
        })

        resolver.doResolve(target, obj, 'mpex runtime ' + this.options.mode, resolveContext, callback)
      } else {
        return callback()
      }
    })
  }
}
