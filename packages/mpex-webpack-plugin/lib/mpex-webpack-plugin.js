class MpexWebpackPlugin {
  constructor (options) {
    this.options = options
    this.mode = options.mode || 'wx'
  }

  apply (compiler) {
    compiler.hooks.normalModuleFactory.tap('MpexWebpackPlugin', (normalModuleFactory) => {
      normalModuleFactory.resolverFactory.hooks.resolveOptions
        .for('normal')
        .tap('MpexWebpackPlugin', (resolveOptions) => {
          if (resolveOptions) {
            let mainFields = resolveOptions.mainFields || (resolveOptions.mainFields = [])
            let newMainField = this.mode + 'Main'
            if (!mainFields.includes(newMainField)) {
              resolveOptions.mainFields.unshift(this.options.mode + 'Main')
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
