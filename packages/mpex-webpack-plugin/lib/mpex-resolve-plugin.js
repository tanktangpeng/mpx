// const DEFAULT_DIR = {
//   wx: 'wx',
//   ali: 'ali',
//   vue: 'vue'
// }

// module.exports = class MpexResolvePlugin {
//   constructor (source, options, target) {
//     this.source = source
//     this.options = options
//     this.target = target
//   }

//   apply (resolver) {
//     const target = resolver.ensureHook(this.target)
//     resolver.getHook(this.source).tapAsync('MpexResolvePlugin', (request, resolveContext, callback) => {
//       if (request.descriptionFileData.mpexRuntime) {
//         const mpexRuntime = request.descriptionFileData.mpexRuntime
//         const dirMaps = typeof mpexRuntime === 'object' ? mpexRuntime : DEFAULT_DIR
//         const obj = Object.assign({}, request, {
//           // request: './' + dirMaps[this.options.mode] + '/index.js'
//           request: './wx/index.js',
//           path: request.path + '/wx/index.js'
//         })
//         resolver.doResolve(target, obj, 'mpex runtime ' + this.options.mode, resolveContext, callback)
//         // return callback()
//       } else {
//         return callback()
//       }
//     })
//   }
// }
