const config = {
    port: 9001,
    defaultEntry: true,
    defaultHtmlPlugin: true,
    openBrowser: false,
    publicPath: '/',
    writeToDisk: true,
    entry: null,            //  null | object | Array
    proxy: null,             //  null | object
    htmlPluginOption: null,       //  null | Array<object>
    definePluginOption: null,     //  null | object
    hot: false,
    liveReload: false
}

module.exports = config
