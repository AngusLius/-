var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');

module.exports = {
	entry: ['babel-polyfill', 'whatwg-fetch', path.resolve(__dirname, 'app/index.jsx')],
	output: {
		path: __dirname + "/build/",
		filename: "bundle.js",
		publicPath: "/"
	},
	resolve: {
		extensions: ['.js', '.jsx', '.json']
	},
	devtool: "source-map",
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /(node_modules)/,
				loader: 'babel-loader'
			},
			{
				test: /\.(htm|html)$/,
				loader: 'html-withimg-loader'
			},
			{
				test: /\.css$/,
				exclude: /(node_modules)/,
				use: ['style-loader', 'css-loader', 'postcss-loader']
			},
			{
				test: /\.scss$/,
				exclude: /(node_modules)/,
				use: ['style-loader', 'css-loader', 'sass-loader']
			},
			{
				test: /\.less$/,
				exclude: /(node_modules)/,
				use: ['style-loader', 'css-loader', 'less-loader']
			},
			{
				test: /\.(png|gif|jpg|jpeg|bmp)$/i,
				use: [{
					loader: 'url-loader',
					options: {
						limit: 8192
					}
				}]
			},
			{
				test: /\.(woff|woff2|svg|ttf|eot|otf)$/i,
				use: [{
					loader: 'file-loader'
				}]
			}
		]
	},
	
	plugins: [
		// html 模板插件
		new HtmlWebpackPlugin({
			template: __dirname + '/app/index.html'
		}),
		
		// 热加载插件
		new webpack.HotModuleReplacementPlugin(),
		
		// 打开浏览器
		new OpenBrowserPlugin({
			url: 'http://localhost:8080'
		}),
		
		// 可在业务 js 代码中使用 __DEV__ 判断是否是dev模式（dev模式下可以提示错误、测试报告等, production模式不提示）
		new webpack.DefinePlugin({
			__DEV__: JSON.stringify(JSON.parse((process.env.NODE_ENV == 'dev') || 'false'))
		})
	],
	
	devServer: {
		proxy: {
			/*//代理到后台服务地址
			 "*": {
			 target: "http://10.240.251.38:82",
			 changeOrigin: true,
			 secure: false
			 },*/
			//前后端开发分离，以`/api` 开头的 http 请求，可被代理到 localhost:3000 上，由 koa 提供 mock 数据。
			// koa 代码在 ./mock 目录中，启动命令为 npm run mock
			"/api": {
				target: "http://localhost:3000",
				secure: false
			}
		},
		historyApiFallback: true, //不跳转，在开发单页应用时非常有用，它依赖于HTML5 history API，如果设置为true，所有的跳转将指向index.html
		inline: true, //实时刷新
		hot: true  // 使用热加载插件 HotModuleReplacementPlugin
	}
}
