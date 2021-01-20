const path = require('path')

module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-links',
    '@storybook/addon-controls',
    'storybook-addon-react-docgen',
    'storybook-formik/register',
  ],
  webpackFinal: async (baseConfig) => {
    const { module = {} } = baseConfig

    // Remove original less loader
    baseConfig.module.rules = baseConfig.module.rules.filter(
      (f) => f.test.toString() !== '/\\.less$/',
    )

    const newConfig = {
      ...baseConfig,
      module: {
        ...module,
        rules: [...(module.rules || [])],
      },
    }

    // Less
    newConfig.module.rules.push({
      test: /\.less$/,
      include: [
        // Include antd to rebuild
        /[\\/]node_modules[\\/].*antd/,
        path.resolve(__dirname, '../assets/styles'),
      ],
      use: [
        'style-loader',
        'css-loader',
        {
          loader: 'less-loader',
          options: {
            javascriptEnabled: true,
          },
        },
      ],
    })

    //Resolve Alias Module (import absolute path)
    newConfig.resolve.modules = [
      ...(newConfig.resolve.modules || []),
      path.resolve(__dirname, '../'),
      path.resolve(__dirname, '../src'),
    ]

    return newConfig
  },
  typescript: {
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) => {
        return !prop.parent
      },
    },
  },
}
