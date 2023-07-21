#!/usr/bin/env node

const argv = process.argv[2];
argv === 'dev' ? process.env.NODE_ENV = 'development' : process.env.NODE_ENV = 'production';

const {copy, clearStatic} = require('./utils')
// if (argv !== 'server') {
//     clearStatic()
// }

const express = require('express')
const fs = require('fs')
const path = require('path')
const Webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const wu = require('../../../wu.config.js');
const defaultConfig = require('./defaultConfig')
const config = {...defaultConfig, ...wu};
const buildConfig = require('./build.config')
const devConfig = require('./dev.config');
const http = require('http')
const https = require('https')

if (argv === 'dev') {
    const compiler = Webpack(devConfig);
    const devServerOptions = {...devConfig.devServer, open: config.openBrowser ?? false};
    const server = new WebpackDevServer(devServerOptions, compiler);

    server.startCallback(() => {
        console.log('\x1B[35m%s\x1B[0m', '\nSuccessfully started server')
    });

    compiler.hooks.done.tap('done', function (data) {
        console.log('\x1B[35m%s\x1B[0m', '\ncompiler complete')
    });
}

if (argv === 'build') {
    const compiler = Webpack(buildConfig)
    compiler.run((err, stats) => {
        if (!err) {
            const origin = path.join(__dirname, '../../../public')
            const target = path.join(__dirname, '../../../static')
            const isHasPublic = fs.existsSync(origin)
            if (isHasPublic) {
                copy(origin, target)
            }
            console.log('\x1B[35m%s\x1B[0m', '\ncompiler complete')
        }
    })
}


if (argv === 'server') {
    const app = express();
    const file = path.join(buildConfig.output.path, './index.html')
    app.use('/', express.static(path.join(__dirname, '../../../static')))

    app.get('/', function (req, res) {
        res.sendFile(file)
    })

    app.get('*', function (req, res) {
        res.sendFile(file)
    })

    const options = {
        key: fs.readFileSync(path.join(__dirname, './secret/server.key')),
        cert: fs.readFileSync(path.join(__dirname, './secret/server.crt'))
    }

    const port = config.port;
    https.createServer(options, app).listen(port + 1)
    http.createServer(app).listen(port, () => {
        console.log('\x1B[35m%s\x1B[0m', '\nSuccessfully started http server: http://localhost:' + port)
        console.log('\x1B[35m%s\x1B[0m', 'Successfully started https server: https://localhost:' + (port + 1))
    })
}
