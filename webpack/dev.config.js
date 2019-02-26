const merge = require('webpack-merge');
const common = require('./common.config.js');
const webpack = require('webpack');

module.exports = merge(common('dev'), {
    devtool: "cheap-module-source-map",
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'eslint-loader',
                    options: {
                        enforce: "pre"
                    }
                }
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({ "process.env.NODE_ENV": JSON.stringify("development") }),
    ],
    mode: 'development',
});