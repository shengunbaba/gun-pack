const webpack = require('webpack');
const {merge} = require('webpack-merge');
const TerserJSPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const commonConfig = require('./base.config.js');
const gun = require('../../../../wu.config.js');
const defaultConfig = require('./defaultConfig');
const config = {...defaultConfig, ...gun};

module.exports = merge(commonConfig, {

    mode: 'production',

    devtool: config.devtool,

    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                ],
            },
            {
                test: /\.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                    },
                    {
                        loader: 'less-loader',
                        options: {
                            lessOptions: {
                                // modifyVars: {
                                //     'primary-color': '#1DA57A',
                                //     'link-color': '#1DA57A',
                                //     'border-radius-base': '2px',
                                // },
                                javascriptEnabled: true,
                            },
                        },
                    },
                ],
            },
        ],
    },
    optimization: {
        emitOnErrors: false,
        minimize: true,
        minimizer: [
            new TerserJSPlugin({
                terserOptions: {
                    compress: {
                        drop_console: config.drop_console ?? true,
                    },
                },
            }),
        ],
        splitChunks: {
            cacheGroups: {
                vendors: {
                    name: 'vendors',
                    test: /[\\/]node_modules[\\/]/,
                    chunks: 'all',
                    reuseExistingChunk: true,
                    enforce: true,
                },
            },
        },
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production'),
            ...config.definePluginOption,
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[hash:5].css',
            chunkFilename: '[id].[hash:5].css',
        }),
    ],
});
