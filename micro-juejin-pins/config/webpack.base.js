const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const StyleLintPlugin = require('stylelint-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { name } = require('../package.json')

const resolvePath = (...paths) => path.join(__dirname, ...paths)
const isDev = process.env.NODE_ENV === 'development'

// 解决基座访问app资源404问题
const publicPath = '//localhost:8002/juejin/pins/'

module.exports = {
  entry: resolvePath('../src/index.js'),
  output: {
    filename: '[name].[hash:6].js',
    path: resolvePath('../dist'),
    publicPath,
    library: `${name}-[name]`,
    libraryTarget: 'umd',
    jsonpFunction: `webpackJsonp_${name}`,
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(js|vue)$/,
        use: 'eslint-loader',
        include: resolvePath('../src'),
      },
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
          },
        },
        include: resolvePath('../src'),
      },
      {
        test: /\.vue$/,
        use: 'vue-loader',
        include: resolvePath('../src'),
      },
      {
        test: /\.(c|le)ss$/,
        use: [
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: {
                compileType: 'icss',
              },
            },
          },
          'postcss-loader',
          {
            loader: 'less-loader',
            options: {
              prependData: `
                @import "~@/less/index.less";
                @import "~material/ui/common/index.less";
              `,
            },
          },
        ],
        include: [resolvePath('../src'), file => /normalize\.css/.test(file)],
      },
      {
        test: /\.(png|jpg|jpeg|webp|gif|svg)$/,
        use: {
          loader: 'url-loader',
          options: {
            esModule: false,
            limit: 1024 * 10, // 10kb
            outputPath: 'static/image',
            name: '[name].[hash:6].[ext]',
          },
        },
        include: resolvePath('../src'),
      },
      {
        test: /\.(eot|woff|woff2|ttf)$/,
        use: {
          loader: 'url-loader',
          options: {
            esMoudle: false,
            outputPath: 'static/font',
            name: '[name].[hash:6].[ext]',
          },
        },
        include: resolvePath('../src'),
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: resolvePath('../public/index.html'),
      // minify: {
      //   collapseWhitespace: false,
      // },
      config: {
        publicPath,
        isDev,
      },
    }),
    new MiniCssExtractPlugin({
      filename: isDev ? '[name].css' : '[name].[contenthash:6].css',
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: resolvePath('../public/js/*'),
          to: resolvePath('../dist/static/js'),
          flatten: true,
        },
      ],
    }),
    new VueLoaderPlugin(),
    new StyleLintPlugin({
      context: resolvePath('../src'),
      files: ['**/*.{vue,htm,html,css,sss,less,scss,sass}'],
    }),
  ],
  resolve: {
    modules: [resolvePath('../src'), resolvePath('../node_modules')],
    alias: {
      '@': resolvePath('../src'),
      'material': resolvePath('../src/material'),
    },
    extensions: ['.js', '.vue'],
  },
}
