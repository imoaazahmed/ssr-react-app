const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
	// Mode
	mode: process.env.NODE_ENV === "development" ? "development" : "production",

	// Entry files
	entry: path.resolve(__dirname, "src/index.js"),

	// Output files and chunks
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "build/[name].bundle.js",
	},

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
				test: /\.m?jsx$/,
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
			{
				test: /\.scss$/,
				use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
			},
		],
	},

	// Webpack plugins
	plugins: [
		// extract css to external stylesheet file
		new MiniCssExtractPlugin({
			filename: "build/styles.css",
		}),

		// prepare HTML file with assets
		new HTMLWebpackPlugin({
			filename: "index.html",
			template: path.resolve(__dirname, "src/index.html"),
			minify: false,
		}),

		// copy static files from `src` to `dist`
		new CopyWebpackPlugin({
			patterns: [
				{
					from: path.resolve(__dirname, "src/assets"),
					to: path.resolve(__dirname, "dist/assets"),
				},
			],
		}),
	],

	// Files configuration
	resolve: {
		extensions: [".js", ".json", ".jsx", ".css", ".scss"],
	},

	// Webpack optimizations
	optimization: {
		splitChunks: {
			cacheGroups: {
				default: false,
				vendors: false,

				vendor: {
					chunks: "all", // both : consider sync + async chunks for evaluation
					name: "vendor", // name of chunk file
					test: /node_modules/, // test regular expression
				},
			},
		},
	},

	// Dev server configuration
	devServer: {
		hot: true,
		open: true,
		port: 3000,
		compress: false,
		historyApiFallback: true,
	},

	// Create source map
	devtool: "source-map",
};
