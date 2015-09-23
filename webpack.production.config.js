
var path    = require("path");
var webpack = require("webpack");

var HtmlWebpackPlugin = require("html-webpack-plugin");

var node_modules_dir = path.resolve(__dirname, "node_modules");

console.log("Build for production");

var config = {
    context: __dirname + "/app",

    entry: {
        js: "./init.js",
        vendors: ["react", "moment"]
    },

    output: {
        path: "./dist",
        filename: "bundle.js"
    },

    module: {
        loaders: [{
            test: /\.html$/,
            exclude: /node_modules/,
            loader: "file?name=[name].[ext]",
        }, {
            test: /\.js$/,
            exclude: /node_modules/,
            loaders: ["babel-loader"],
        }, {
            test: /\.less$/,
            exclude: /node_modules/,
            loader: "style!css!less"
        }],
    },

    plugins: [
        new webpack.optimize.CommonsChunkPlugin("vendors", "vendors.js"),
        new HtmlWebpackPlugin({
            template: "template/main.production.html",
            inject:   false
        })
    ]
};

module.exports = config;
