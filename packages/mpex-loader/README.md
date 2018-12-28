# `mpex-loader`

根据配置，将`.mpex`文件转成`.vue`或者`.mpx`标准语法

## Installation

```bash
npm i @mpxjs/mpex-loader
```

## Usage

**webpack.config.vue.js**

```js
webpackconfig = {
  module: {
    rules: [
      {
        test: /\.mpex$/,
        use: [
          'vue-loader',
          {
            loader: '@mpxjs/mpex-loader',
            options: {
              mode: 'vue'
            }
          }
        ]
      }
    ]
  }
}
```

**webpack.config.wx.js**

```js
webpackconfig = {
  module: {
    rules: [
      {
        test: /\.mpex$/,
        use: [
          MpxWebpackPlugin.loader({
            transRpx: false,
            comment: 'use rpx',
            designWidth: 750
          }),
          {
            loader: '@mpxjs/mpex-loader',
            options: {
              mode: 'wx'
            }
          }
        ]
      }
    ]
  }
}


```

#### options

- **mode**

  `string `

    - `wx`转`.mpx`

    - `vue`转`.vue`





