
var path = require("path");
var webpack = require("webpack");

var node_modules = path.resolve(__dirname, "node_modules");
var react_lib_path = path.resolve(node_modules, "react/lib");
var react_path   = path.resolve(node_modules, "react/dist/react.min.js");

console.log("React", react_path);

module.exports = {

    context: __dirname + "/app",

    entry: {
        js: "./init.js",
        html: "./index.html",
    },

    resolve: {
        alias: {
            "react/lib": react_lib_path,
            "react":     react_path
        }
    },

    devtool: "eval",

    module: {
        noParse: [react_path],
        loaders: [
            {
                test: /\.html$/,
                exclude: /node_modules/,
                loader: "file?name=[name].[ext]",
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loaders: ["react-hot", "babel-loader"],
            },
            {
                test: /\.less$/,
                exclude: /node_modules/,
                loader: "style!css!less"
            }
        ],
    },

    output: {
        filename: "bundle.js",
        path: "./dist",
    },
};
