const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const antdTheme = require('./src/theme')

const extractLess = new MiniCssExtractPlugin({
  filename: 'static/css/[name].[contenthash].css',
  disable: process.env.NODE_ENV === 'development', // disable this during development
})

module.exports = {
  modify: (config, { target, dev }, webpack) => {
    if (target === 'node') {
      config.plugins.push(
        new webpack.DefinePlugin({
          'process.env.BROWSER': JSON.stringify(false)
        })
      )

      config.plugins.push(new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 1,
      }))
    }

    if (target === 'web') {
      config.module.rules.push({
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          plugins: [['import', { libraryName: 'antd', style: true }]],
        }
      })

      // config.module.rules.push({
      //   test: /\.less$/,
      //   use: extractLess.extract({
      //     use: [
      //       {
      //         loader: 'css-loader',
      //       },
      //       {
      //         loader: 'less-loader',
      //         options: {
      //           modifyVars: antdTheme,
      //         },
      //       },
      //     ],
      //     // use style-loader in development
      //     fallback: 'style-loader',
      //   }),
      // })

      config.module.rules.push({
        test: /\.less$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'less-loader',
            options: {
              modifyVars: antdTheme,
            },
          },
        ]
      })

      config.plugins.push(extractLess)

      config.plugins.push(
        new webpack.DefinePlugin({
          'process.env.BROWSER': JSON.stringify(true)
        })
      )
    }

    if (dev) {
      config.devtool = 'eval-source-map'
    }

    return config
  },
}
