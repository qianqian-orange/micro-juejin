const { merge } = require('webpack-merge')
const path = require('path')
const baseConfig = require('./webpack.base')

const resolvePath = (...paths) => path.join(__dirname, ...paths)

module.exports = merge(baseConfig, {
  mode: 'development',
  devServer: {
    port: 8000,
    host: '0.0.0.0',
    hot: true,
    progress: true,
    compress: true,
    clientLogLevel: 'silent',
    contentBase: resolvePath('../dist'),
    overlay: false,
    proxy: {
      '/juejin/micro-juejin-home/api': {
        target: "http://localhost:8001",
        // ws: false,
        // changeOrigin: true,
      },
      '/juejin/micro-juejin-pins/api': {
        target: "http://localhost:8002",
      },
    },
    historyApiFallback: {
      rewrites: [
        { from: /./, to: '/juejin/index.html' },
      ],
    },
  },
  devtool: '#cheap-module-eval-source-map',
})
