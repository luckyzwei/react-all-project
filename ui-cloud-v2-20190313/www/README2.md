### 栗子云
- 地址：https://cloud.gemii.cc/v2/Home
- 账号密码：tenantI02/abcd1234

### 修改环境配置dev/prd
tools-->deplog.js  命令修改一些配置
- 替换webpack打包path:react-script-->config-->paths.js-->const envPublicUrl =''
- 替换image path
- 替换pathNam
configPath.json
- 命令：npm run delpoy --prod

### 埋点检测
- 修改node_modal包：react-script-->config-->webpack.config.dev.js-->externals:{G_SDK:'G_SDK'}
- html引入
```
    <script src='https://tj.gemii.cc/tj.js'></script>
    <title>LizCloud</title>
    <script>
      var G_SDK = new SDK('${param}','lizicloud')
      G_SDK.loading()
      window.onload = function(){
          G_SDK.loaded()
      }
    </script>

    G_SDK.push(eventname,userId,...others)
```

### ws检测 
- funStore->WebSocketConnect.js
- index.js->
```
if (store.getState().socketState.webSocket == '') {
    store.dispatch(
        {type: 'SET_SOCKET', socket: new WebSocketConnect()}
    )
}
```
- socketState.js
- actions->index.js
> export const connectSocket = (socket) => ({type: 'SET_SOCKET', socket})

### Antd UI框架



