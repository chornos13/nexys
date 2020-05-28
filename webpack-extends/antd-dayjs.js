module.exports = (nextConfig = {}) => {
  return {
    ...nextConfig,
    webpack(config, options) {
      const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin')
      config.plugins.push(
        new AntdDayjsWebpackPlugin({
          preset: 'antdv3',
        }),
      )
      if (typeof nextConfig.webpack === 'function') {
        return nextConfig.webpack(config, options)
      }
      return config
    },
  }
}
