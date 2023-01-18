const path = require('path');
const webpack = require('webpack');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const gun = require('../../../wu.config.js');
const defaultConfig = require('./defaultConfig');
const fs = require('fs');
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
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            cacheDirectory: true,
                            presets: [
                                '@babel/preset-typescript',
                                [
                                    '@babel/preset-env', {
                                    'loose': true,
                                    'useBuiltIns': 'entry',
                                    'corejs': '3',
                                    'targets': {
                                        'chrome': '58',
                                        'ie': '11',
                                    },
                                }],
                                '@babel/preset-react',
                            ],
                            plugins: [
                                ['@babel/plugin-proposal-decorators', {'legacy': true}],
                                ['@babel/plugin-proposal-private-methods', {'loose': true}],
                                ['@babel/plugin-proposal-class-properties', {'loose': true}],
                                ['@babel/plugin-proposal-private-property-in-object', {'loose': true}],
                                // ['@babel/transform-runtime'],
                                ['import', {'libraryName': 'antd', 'style': true}],
                            ],
                        },
                    },
                ],
            },
            {
                test: /\.(jpg|png|gif|jpeg)$/i,
                use:
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            name: 'images/[hash:8].[name].[ext]',
                        },
                    },
            },
            {
                test: /\.(wav|mp3|mp4|ttf|otf|eot|woff2|woff)$/,
                use:
                    {
                        loader: 'file-loader',
                    },
            },
        ],

    },
    // optimization: {
    //     runtimeChunk: {
    //         name: entrypoint => `rt~${entrypoint.name}`,
    //     },
    // },
    resolve: {

        modules: [
            'node_modules',
            'src',
        ],

        extensions: ['.js', '.jsx', '.ts', '.tsx'],

        alias: {},
    },

    context: path.join(__dirname, '../../../'),

    target: ['es5', 'web'],

    externals: {},

    stats: 'errors-only',

    plugins: [
        new CleanWebpackPlugin(),
        new webpack.ProgressPlugin(),
    ],
};

if (config.defaultEntry) {
    const indexFile = fs.existsSync(path.join(__dirname, '../../../src/index.jsx')) ?
        path.join(__dirname, '../../../src/index.jsx') :
        path.join(__dirname, '../../../src/index.tsx');
    base.entry = {
        main: [indexFile],
    };
} else if (config.entry && !config.defaultEntry) {
    base.entry = config.entry;
}

if (config.defaultHtmlPlugin) {
    base.plugins.push(
        new HtmlWebpackPlugin({
            template: path.join(__dirname, '../../../src/index.html'),
        }),
    );
} else if (config.htmlPluginOption && !config.defaultHtmlPlugin) {
    for (const option of config.htmlPluginOption) {
        base.plugins.push(new HtmlWebpackPlugin(option));
    }
}

if (config.alias) {
    base.resolve.alias = config.alias;
}
module.exports = base;
