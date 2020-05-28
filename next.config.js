/* eslint-disable */
const withLess = require('@zeit/next-less')
const withCSS = require('@zeit/next-css')
const withSass = require('@zeit/next-sass')
const withAntdDayJs = require('./webpack-extends/antd-dayjs')
const _ = require('lodash')
const lessToJS = require('less-vars-to-js')
const fs = require('fs')
const path = require('path')
const { PHASE_DEVELOPMENT_SERVER } = require('next/constants')
const withFilterConflictOrder = require('./webpack-extends/filter-confilct-order')
// Where your antd-custom.less file lives
const themeVariables = lessToJS(
  fs.readFileSync(path.resolve(__dirname, './assets/antd-custom.less'), 'utf8')
)

const lessConfig = withLess({
  lessLoaderOptions: {
    javascriptEnabled: true,
    modifyVars: themeVariables, // make your antd custom effective
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      const antStyles = /antd\/.*?\/style.*?/
      const origExternals = [...config.externals]
      config.externals = [
        (context, request, callback) => {
          if (request.match(antStyles)) return callback()
          if (typeof origExternals[0] === 'function') {
            origExternals[0](context, request, callback)
          } else {
            callback()
          }
        },
        ...(typeof origExternals[0] === 'function' ? [] : origExternals),
      ]

      config.module.rules.unshift({
        test: antStyles,
        use: 'null-loader',
      })
    }
    return config
  },
})

const cssConfig = withAntdDayJs(withCSS({
  cssModules: true,
  cssLoaderOptions: {
    importLoaders: 1,
    localIdentName: "[local]___[hash:base64:5]",
    // modules: {
    //   localIdentName: "[local]___[hash:base64:5]",
    //   localIdentName: true,
    // }
  },
  // ...sassConfig,
  ...lessConfig,
}))

// console.log(cssConfig)

const sassConfig = withSass({
  cssModules: true,
  cssLoaderOptions: {
    localIdentName: "[local]___[hash:base64:5]",
    // modules: {
    //   localIdentName: "[local]___[hash:base64:5]",
    //   // localIdentName: true,
    // }
  },
  ...cssConfig
})


module.exports = withFilterConflictOrder(sassConfig)


