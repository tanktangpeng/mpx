# `mpex-webpack-plugin`

## `mpex-webpack-plugin`

`mpex`跨端编译插件

### 配置
**webpack.config.js**

```js
var MpexWebpackPlugin = require('@mpxjs/mpex-webpack-plugin')
webpackconfig = {
  plugins: [
    new MpexWebpackPlugin({
      mode: 'wx'
    })
  ]
}
```

### options

- **mode**

  `string `

    - `wx`转`.mpx`

    - `vue`转`.vue`

---


## `mpex-resolve-plugin`

`mpex-runtime`跨端源码resolve插件

### 配置
**webpack.config.js**

```js
var MpexResolvePlugin = require('@mpxjs/mpex-webpack-plugin/lib/mpex-resolve-plugin')

webpackconfig = {
  resolve: {
    plugins: [
      new MpexResolvePlugin({mode: 'vue'})
    ]
  }
}
```

### options

- **mode**

  `string`

    读取`package.json`中的`mpex`字段，根据`mode`的值进行模块解析
    - `wx`
    - `ali`
    - `vue`

---
## 例子1：使用默认规则的跨端源码包

**文件目录**
  ```
  node_modules/my-component
  │-- package.json 
  │-- vue    
  │---- index.js    
  |---- util
  |------ router.js
  │-- wx    
  │---- index.js    
  |---- util
  |------ router.js
  ```

**配置：webpack.config.js**

```js
var MpexResolvePlugin = require('@mpxjs/mpex-webpack-plugin/lib/mpex-resolve-plugin')

webpackconfig = {
  resolve: {
    plugins: [
      new MpexResolvePlugin({mode: 'vue'})
    ]
  }
}
```

**node_modules/my-component/package.json**
```json
  "mpex": true
```

**使用者: index.js**
```js
import tool from 'my-component'

tool()
```

**等效于**
```js
import tool from 'my-component/vue'

tool()
```
---
### 例子2：使用自定义规则的跨端源码包

**文件目录**
  ```
  node_modules/my-component
  │-- package.json 
  │-- vuelib
  │---- index.js    
  |---- util
  |------ router.js
  │-- wxlib 
  │---- index.js    
  |---- util
  |------ router.js
  ```

**配置：webpack.config.js**

```js
var MpexResolvePlugin = require('@mpxjs/mpex-webpack-plugin/lib/mpex-resolve-plugin')

webpackconfig = {
  resolve: {
    plugins: [
      new MpexResolvePlugin({mode: 'wx'})
    ]
  }
}
```

**node_modules/my-component/package.json**
```json
  "mpex": {
    "vue": "vuelib",
    "wx": "wxlib"
  }
```

**使用者: index.js**
```js
import router from 'my-component/util/router'

router()
```

**等效于**
```js
import router from 'my-component/wxlib/util/router'

router()
```
---
### 例子3：屏蔽resolve插件，使用绝对路径引用

**使用者: index.js**
```js
import router from 'my-component/vue/util/router.js?ignore'

router()
```

**等效于**
```js
import router from 'my-component/vue/util/router.js'

router()
```
