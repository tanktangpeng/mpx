class MpexWebpackPlugin {
  constructor (options) {
    this.options = options
    this.mode = options.mode || 'wx'
  }

  apply (compiler) {
    const MpexResolvePlugin = require('./mpex-resolve-plugin')
    compiler.hooks.normalModuleFactory.tap('MpexWebpackPlugin', (normalModuleFactory) => {
      normalModuleFactory.resolverFactory.hooks.resolveOptions
        .for('normal')
        .tap('MpexWebpackPlugin', (resolveOptions) => {
          if (resolveOptions) {
            let plugins = resolveOptions.plugins || (resolveOptions.plugins = [])
            let has = plugins.some(i => i instanceof MpexResolvePlugin)
            if (!has) {
              plugins.push(new MpexResolvePlugin({ mode: this.options.mode }))
            }
          } else {
            resolveOptions = {}
          }
          return resolveOptions
        })
    })
  }
}

module.exports = MpexWebpackPlugin
