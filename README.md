# gun-pack
`react cli` &nbsp; `react compiler`

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
    open_browser: false,
    default_entry: true,  
    default_htmlPlugin: true  
    writeToDisk: false
    publicPath: '/',
    entry:Object<webpackEntry> | null
    htmlPlugin:Array<webpackHtmlPlugin> | null
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
| entry  | Object\<webpackEntry\> / null when default_entry is false, customize yourself |
| htmlPlugin  | Array\<webpackHtmlPlugin\> / null when default_htmlPlugin is false, customize yourself |


