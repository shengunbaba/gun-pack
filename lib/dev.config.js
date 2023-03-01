const webpack = require('webpack');
const {merge} = require('webpack-merge');
const path = require('path');
const commonConfig = require('./base.config.js');
const gun = require('../../../../wu.config.js');
const defaultConfig = require('./defaultConfig');
const config = {...defaultConfig, ...gun};

module.exports = merge(commonConfig, {
    mode: 'development',
    devServer: {
        devMiddleware: {
            writeToDisk: config.writeToDisk,
        },
        static: [
            {
                directory: path.join(__dirname, '../../../static'),
            }, {
                directory: path.join(__dirname, '../../../public'),
            }],
        historyApiFallback: true,  //the index.html page will likely have to be served in place of any 404 responses
        compress: false,
        port: config.port,
        client: {
            progress: true,
        },
        proxy: config.proxy ?? {},
        hot: config.hot,
        liveReload: config.liveReload,
    },

    devtool: config.devtool ?? 'inline-source-map',

    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.less$/,
                use: [
                    {
                        loader: 'style-loader',
                    },
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
            }],
    },

    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development'),
            ...config.definePluginOption,
        }),
    ],
});

