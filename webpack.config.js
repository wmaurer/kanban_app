var path = require("path");
var HtmlwebpackPlugin = require("html-webpack-plugin");
var webpack = require('webpack');

var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, "app");
var BUILD_PATH = path.resolve(ROOT_PATH, "build");

module.exports = {
	entry: APP_PATH,
	output: {
		path: BUILD_PATH,
		filename: "bundle.js"
	},
	devServer: {
		historyApiFallback: true,
		hot: true,
		inline: true,
		progress: true
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new HtmlwebpackPlugin({
			title: "Kanban app"
		})
	]
};
