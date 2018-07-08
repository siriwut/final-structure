module.exports = {
  modify: (config, { target, dev }, webpack) => {
    if (target === 'node') {
      config.plugins.push(
        new webpack.DefinePlugin({
          'process.env.BROWSER': JSON.stringify(false)
        })
      )
    }

    if (target === 'web') {
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
