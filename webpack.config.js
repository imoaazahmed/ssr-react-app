const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
	// Entry files
	entry: { app: "./src/index.js" },

	// Loaders configuration
	module: {
		rules: [
			{
				test: /\.m?js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						presets: ["@babel/preset-env"],
					},
				},
			},
			{
				test: /\.css$/i,
				use: ["style-loader", "css-loader"],
			},
		],
	},

	// Webpack plugins
	plugins: [
		new HtmlWebpackPlugin({
			template: "index.html",
		}),
	],

	// Files configuration
	resolve: {
		extensions: [".js", ".jsx", ".css"],
	},

	// Dev server configuration
	devServer: {
		open: true,
		port: 3000,
		compress: true,
	},

	// Output files and chunks
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "[name].bundle.js",
	},

	// Create source map
	devtool: "cheap-module-source-map",
};
