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
    contentBase: resolvePath('../server/public'),
    overlay: false,
    proxy: {
      '/juejin/micro-juejin-home': {
        target: 'http://localhost:8001',
        // ws: false,
        // changeOrigin: true,
        // pathRewrite: {}
      },
      '/juejin/micro-juejin-pins': {
        target: 'http://localhost:8002',
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
