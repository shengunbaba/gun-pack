const config = {
    port: 9000,
    defaultEntry: true,
    defaultHtmlPlugin: true,
    openBrowser: false,
    publicPath: '/',
    writeToDisk: false,
    entry: null,            //  null | object | Array
    proxy: null,             //  null | object
    htmlPluginOption: null,       //  null | Array<object>
    definePluginOption: null,     //  null | object
    hot: true,
    liveReload: false
}

module.exports = config
