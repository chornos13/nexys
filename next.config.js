/* eslint-disable */
const withLess = require('@zeit/next-less')
const withCSS = require('@zeit/next-css')
const getLocalIdent = require('get-local-ident')
const withSass = require('@zeit/next-sass')
const withSVG = require('./webpack-extends/svgr')
// const withAntdDayJs = require('./webpack-extends/antd-dayjs')
const withFonts = require('next-fonts')
const withImages = require('./webpack-extends/images')
// const _ = require('lodash')
const lessToJS = require('less-vars-to-js')
const fs = require('fs')
const path = require('path')
const withFilterConflictOrder = require('./webpack-extends/filter-confilct-order')
// Where your antd-custom.less file lives
const themeVariables = lessToJS(
  fs.readFileSync(
    path.resolve(__dirname, './public/assets/antd-custom.less'),
    'utf8',
  ),
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

const cssConfig = withCSS({
  cssModules: true,
  cssLoaderOptions: {
    url: false,
    importLoaders: 1,
    localIdentName: '[local]___[hash:base64:5]',
    getLocalIdent: (loaderContext, localIdentName, localName, options) => {
      const fileName = path.basename(loaderContext.resourcePath)
      if (fileName.indexOf('module.scss') !== -1) {
        return getLocalIdent(loaderContext, localIdentName, localName, options)
      } else {
        return localName
      }
    },
    // modules: {
    //   localIdentName: "[local]___[hash:base64:5]",
    //   localIdentName: true,
    // }
  },
  postcssLoaderOptions: {
    parser: true,
    config: {
      ctx: {
        theme: JSON.stringify(process.env.REACT_APP_THEME),
      },
    },
  },
  // ...sassConfig,
  ...lessConfig,
})

// console.log(cssConfig)

const sassConfig = withSass({
  cssModules: true,
  cssLoaderOptions: {
    localIdentName: '[local]___[hash:base64:5]',
    // modules: {
    //   localIdentName: "[local]___[hash:base64:5]",
    //   // localIdentName: true,
    // }
  },
  ...cssConfig,
})

const fontConfig = withFonts(withSVG(withFilterConflictOrder(sassConfig)))

const imageConfig = withImages(fontConfig)

module.exports = {
  ...imageConfig,
}
