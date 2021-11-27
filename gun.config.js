const config = {
    port: 9000,
    default_entry: true,
    default_htmlPlugin: true,
    open_browser: false,
    publicPath: '/',
    writeToDisk: false,
    entry: null,
    htmlPlugin: null,
    proxy: {
        // '/api': {
        //     target: 'http://localhost:3000',
        //     pathRewrite: {'^/api': ''},
        // },
    },
}

module.exports = config
