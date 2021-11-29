const path = require('path')
const webpack = require('webpack')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const gun = require('../../../gun.config.js');
const defaultConfig = require('./defaultConfig')
const config = {...defaultConfig, ...gun};

const base = {
    entry: {},

    output: {
        path: path.join(__dirname, '../../../static'),

        filename: '[name].[chunkhash:5].js',

        publicPath: config.publicPath,
    },

    module: {
        rules: [
            {
                test: /\.(ts|js)x?$/,
                exclude: /(node_modules|bower_components)/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            cacheDirectory: true,
                            presets: [
                                '@babel/preset-typescript',
                                ['@babel/preset-env', {"loose": true}],
                                '@babel/preset-react',
                            ],
                            plugins: [
                                ['@babel/plugin-proposal-decorators', {'legacy': true}],
                                ["@babel/plugin-proposal-private-methods", {"loose": true}],
                                ['@babel/plugin-proposal-class-properties', {'loose': true}],
                                ['@babel/plugin-proposal-private-property-in-object', {"loose": true}],
                                ['@babel/transform-runtime']
                            ]
                        }
                    },
                ]
            },
            {
                test: /\.(jpg|png|gif|jpeg)$/,
                use:
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10000,
                            name: 'images/[hash:8].[name].[ext]'
                        }
                    }
            },
            {
                test: /\.(wav|mp3|mp4|ttf|otf|eot|woff2|woff)$/,
                use:
                    {
                        loader: 'file-loader'
                    }
            }
        ],

    },
    optimization: {
        runtimeChunk: {
            name: entrypoint => `rt~${entrypoint.name}`
        },
    },
    resolve: {

        modules: [
            'node_modules',
            'src'
        ],

        extensions: ['.js', '.jsx', '.ts', '.tsx'],

        alias: {},
    },

    context: path.join(__dirname, '../../../'),

    target: 'web',

    externals: {},

    stats: 'errors-only',

    plugins: [
        new CleanWebpackPlugin(),
        new webpack.ProgressPlugin(),
    ],
}

if (config.default_entry) {
    base.entry = {
        main: [path.join(__dirname, '../../../src/index.jsx')]
    }
} else if (config.entry && !config.default_entry) {
    base.entry = config.entry;
}

if (config.default_htmlPlugin) {
    base.plugins.push(
        new HtmlWebpackPlugin({
            template: path.join(__dirname, '../../../src/index.html'),
        }),
    )
} else if (config.htmlPlugin && !config.default_htmlPlugin) {
    base.plugins.push(...config.htmlPlugin)
}

module.exports = base;
