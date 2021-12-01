# gun-pack
`react cli` &nbsp; `react compiler`

[github](https://github.com/shengunbaba/gun-pack)

## usage
#### react build tool, Support Typescript
```jsx
    yarn add gun-pack 
```

- package.json scripts
```jsx
   gun-pack  dev
   gun-pack  build

   // after you build, also you can startup service
   gun-pack  server
```


#### You can customize your compiler configuration in your root directory
- gun.config.js
example:

```jsx
const config = {
    port: 9000,                         
    defaultEntry: true,
    defaultHtmlPlugin: true,
    openBrowser: false,
    writeToDisk: false
    publicPath: '/',
    entry:null,                      // Object<webpackEntry> | null | array<webpackEntry>
    proxy: {
       '/api': {
           target: 'http://localhost:3000',
           pathRewrite: {'^/api': ''},
       },
    },
    htmlPluginOption: [                    //  null | Array<object>
        {                   
            template: path.join(__dirname, './src/index.html'),
            chunks: ['main', 'react'],
            options
        }
    ], 
    definePluginOption:{
        'process.env.NODE_ENV': JSON.stringify('production'),
        'definePlugin':JSON.stringify('definePlugin'),
    }
}

module.exports = config
```
Parameter description

|   parameter  | description  |
|  ----  | ----  |
| port  |<boolean> listener port ; default 9000 |
| open_browser  |<boolean>  auto browser open page |
| default_entry  |<boolean>  Use default entry /src/index.js ; default true |
| default_htmlPlugin  |<boolean>  Use default htmlPlugin /src/index.html ; default true |
| writeToDisk  | <boolean> default false |
| publicPath  | <string> default '/' |
| entry  | Object\<webpackEntry\> / null when defaultEntry is false, customize yourself |
| proxy  | Object\<webpackDevServerProxy\>|
| htmlPluginOption  |  Array<object> / null when defaultHtmlPlugin is false, customize yourself |
| definePluginOption  | Object\<webpack.definePlugin.option\>, when gun-pack dev , process.env.NODE_ENV default development, when gun-pack build , process.env.NODE_ENV default production|

