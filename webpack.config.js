const path = require('path');
const webpack = require('webpack');

module.exports = {

    entry: './src/index',
    output: {
        filename: 'fancy-bloks.bundle.js',
    },
    module: {
        rules: [
            { test: /\.txt$/, use: 'raw-loader' },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            },
            // { test: /\.js$/, use: ['script-loader'] },
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                use: [
                    {
                        loader: 'file-loader',
                    },
                ],
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                    {
                        loader: 'file-loader',
                    },
                ],
            },
            {
                test: /\.svg$/,
                loader: 'svg-inline-loader'
            }
        ],
    }
};