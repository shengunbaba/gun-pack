module.exports = {
    port: 9000,
    defaultEntry: true,
    defaultHtmlPlugin: true,
    openBrowser: false,
    publicPath: '/',
    writeToDisk: false,
    entry: null,        //  null | object | Array
    proxy: null,         //  null | object | Array
    htmlPluginOption: null,   //  null | Array<object>
    definePluginOption: null,   //  null | object
    hot: true,
    liveReload: false,
    devtool: undefined, //  dev 默认 inline-source-map， 如果配置devtool，build 也会使用；
    drop_console: true,
};
