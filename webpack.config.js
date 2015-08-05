
var path = require("path");

module.exports = {
    context: __dirname + "/app",

    entry: {
        js: "./init.js",
        html: "./index.html",
    },

    module: {
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
        path: __dirname + "/dist",
    },
}
