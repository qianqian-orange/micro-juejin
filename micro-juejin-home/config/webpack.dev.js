const { merge } = require('webpack-merge')
const path = require('path')
const baseConfig = require('./webpack.base')

const resolvePath = (...paths) => path.join(__dirname, ...paths)

module.exports = merge(baseConfig, {
  mode: 'development',
  devServer: {
    port: 8001,
    host: '0.0.0.0',
    hot: true,
    progress: true,
    compress: true,
    clientLogLevel: 'silent',
    contentBase: resolvePath('../dist'),
    overlay: false,
    headers: {
      // 如果设置为*，那么不允许携带认证头和cookie
      // 'Access-Control-Allow-Origin': 'http://localhost:8000',
      // 'Access-Control-Allow-Credentials': true,
      'Access-Control-Allow-Origin': '*',
    },
    proxy: {
      '/juejin/micro-juejin-home/api': {
        target: 'http://localhost:3001',
        // pathRewrite: {
        //   '^/micro-juejin-home/api': '/api',
        // },
      }
    },
    historyApiFallback: {
      rewrites: [
        { from: /./, to: '/juejin/home/index.html' },
      ],
    },
  },
  devtool: '#cheap-module-eval-source-map',
})