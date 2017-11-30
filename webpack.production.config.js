var pkg = require('./package.json')
var path = require('path')
var webpack = require('webpack');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var UglifyJSPlugin = require('uglifyjs-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: {
    app: path.resolve(__dirname, 'app/index.jsx'),
    // 将 第三方依赖（node_modules中的） 单独打包
    vendor: Object.keys(pkg.dependencies)
  },
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "js/[name].[chunkhash:8].js"
  },

  resolve:{
      extensions:['.js', '.jsx', '.json', 'scss']
  },

  module: {
      rules: [
          {
              test: /\.(js|jsx)$/,
              exclude: /(node_modules)/,
              use: {
                  loader: 'babel-loader'
              }
          },
          {
              test: /\.scss$/,
              exclude: /(node_modules)/,
              use: ExtractTextPlugin.extract({
                  fallback: 'style-loader',
                  use:['css-loader', 'sass-loader']
              })
          },
          {
              test: /\.less$/,
              exclude: /node_modules/,
              use: ExtractTextPlugin.extract({
                  fallback: 'style-loader',
                  use:['css-loader','less-loader']
              })
          },
          {
              test: /\.css$/,
              exclude: /node_modules/,
              use: ExtractTextPlugin.extract({
                  fallback: 'style-loader',
                  use: ['css-loader', 'postcss-loader']
              })
          },
          {
              test:/\.(png|gif|jpg|jpeg|bmp)$/i,
              use: {
                  loader: 'url-loader',
                  options: {
                      limit: 8192
                  }
              }
          },
          {
              test:/\.(woff|woff2|svg|ttf|eot)($|\?)/i,
              use: {
                  loader: 'url-loader'
              }
          }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['build']),

    // html 模板插件
    new HtmlWebpackPlugin({
        template: __dirname + '/app/index.html'
    }),

    // 定义为生产环境
    new webpack.DefinePlugin({
      'process.env':{
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      }
    }),

    new UglifyJSPlugin({
        sourceMap: true
    }),

    // 分离CSS和JS文件
    new ExtractTextPlugin({
        filename: '/css/[name].[chunkhash:8].css'
    }),
    
    // 提公共代码
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: '/js/[name].[chunkhash:8].js'
    }),

    // 可在业务 js 代码中使用 __DEV__ 判断是否是dev模式（dev模式下可以提示错误、测试报告等, production模式不提示）
    new webpack.DefinePlugin({
      __DEV__: JSON.stringify(JSON.parse((process.env.NODE_ENV == 'dev') || 'false'))
    })
  ]
}