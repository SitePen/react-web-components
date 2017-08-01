const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
	template: './index.html',
	filename: 'index.html',
	inject: 'body'
});

module.exports = {
	entry:[
		'./src/index.js'
	],
	output: {
		path: path.resolve(__dirname, 'dist'),
		publicPath: '/',
		filename: 'index_bundle.js'
	},
	module: {
		loaders: [{
			test: /\.jsx?$/,
			exclude: /node_modules/,
			loader: 'babel-loader'
		}]
	},
	resolve: {
		extensions: ['*', '.js', '.jsx']
	},
	plugins: [HtmlWebpackPluginConfig],
	devtool: 'source-map',
	devServer: {
		contentBase: './dist'
	}
};
