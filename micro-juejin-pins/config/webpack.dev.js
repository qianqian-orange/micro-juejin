const { merge } = require('webpack-merge')
const path = require('path')
const baseConfig = require('./webpack.base')

const resolvePath = (...paths) => path.join(__dirname, ...paths)

module.exports = merge(baseConfig, {
  mode: 'development',
  devServer: {
    port: 8002,
    host: '0.0.0.0',
    hot: true,
    progress: true,
    compress: true,
    clientLogLevel: 'silent',
    contentBase: resolvePath('../server/public'),
    overlay: false,
    headers: {
      // 如果设置为*，那么不允许携带认证头和cookie
      // 'Access-Control-Allow-Origin': 'http://localhost:8000',
      // 'Access-Control-Allow-Credentials': true,
      'Access-Control-Allow-Origin': '*',
    },
    proxy: {
      '/juejin/micro-juejin-pins/api': {
        target: 'http://localhost:3002',
        // pathRewrite: {
        //   '^/micro-juejin-home/api': '/api',
        // },
      }
    },
    historyApiFallback: {
      rewrites: [
        { from: /./, to: '/juejin/micro-juejin-pins/index.html' },
      ],
    },
  },
  devtool: '#cheap-module-eval-source-map',
})
