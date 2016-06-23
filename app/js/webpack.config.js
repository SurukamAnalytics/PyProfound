var webpack = require('webpack');

module.exports = {
	entry : {
		app : ['webpack/hot/dev-server','./javascripts/entry.js'],
	},

	output : {
		path: './app/built',
		filename: 'bundle.js',
		publicPath: 'http://localhost:8080/built/'
	},

	devServer: {
		contentBase: './app',
		publicPath: 'http://localhost:8080/built/'
	},
	module: {
		loaders: [
		{test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/},
		{ test: /\.css$/, loader:'style-loader!css-loader'},
		{ test: /\.less$/, loader: 'style-loader!css-loader!less-loader'}]
	},
	plugins:[
		new webpack.HotModuleplacementPlugin()
	]
}}