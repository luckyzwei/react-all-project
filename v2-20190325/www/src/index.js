/* eslint-disable */
// eslint-disable-next-line
import React, {Component, PropTypes} from 'react'
import {render} from 'react-dom'
import Loadable from 'react-loadable'

import {createStore, combineReducers, applyMiddleware, compose} from 'redux'
import createHistory from 'history/createBrowserHistory'
import {Switch, Route, Redirect} from 'react-router'
import {Provider} from 'react-redux'
import {ConnectedRouter, routerReducer, routerMiddleware, push} from 'react-router-redux'
import reducers from './reducers'
import promiseXHR from './funStore/ServerFun'
import AuthProvider from './funStore/AuthProvider'
import SaasNaviBar from './components/SaasNaviBar'
import {API_PATH} from './constants/OriginName'
// import Login from './containers/Login'
// import Register from './containers/Register'
import InitScope from './containers/InitScope'
// import LoginAgain from './containers/LoginAgain'
// import Home from './containers/Home'
import Error from './containers/Error'
import NeedOwnScope from './containers/NeedOwnScope'
import NeedAuthority from './containers/NeedAuthority'
import WebSocketConnect from './funStore/WebSocketConnect'
// import GIScope from './containers/GIScope' //群管理
// import GImemberScope from './containers/GImemberScope' //群管理，查看群成员
// import GIhistoryScope from './containers/GIhistoryScope' //群管理，查看历史记录
// import GIbuildScope from './containers/GIbuildScope' //群管理,新建群
// import GIimportScope from './containers/GIimportScope' //群管理 微信导群
// import GIeditScope from './containers/GIeditScope' //群管理 查看历史编辑
// import GIhostScope from './containers/GIhostScope' // 群管理 微信托管
// import MTScope from './containers/MTScope'//群投放
// import MTbuildScope from './containers/MTbuildScope'//编辑群投放
// import RMScope from './containers/RMScope'//机器人管理
// import GMScope from './containers/GMScope'//群消息
// import CWScope from './containers/CWScope' //内容库
// import HWScope from './containers/HWScope' //热词
// import GIScope/reply from './containers/GIScope/reply' //敏感词
// import UCScope from './containers/UCScope'//用户组
// import TMScope from './containers/TMScope'//系统设置
// import PCScope from './containers/PCScope'//个人设置
import HPScope from './containers/HPScope'//帮助中心
import MSScope from './containers/MSScope'//系统通知
import Error404 from './containers/Error404'
import Error503 from './containers/Error503'

import PageLoading from './components/shareComponent/PageLoading'

const Loading = () => <PageLoading/>

const Login = Loadable({
    loader: () => import('./containers/Login'),
    loading: ()=>'',
});

const Register = Loadable({
    loader: () => import('./containers/Register'),
    loading: ()=>'',
});

const LoginAgain = Loadable({
    loader: () => import('./containers/LoginAgain'),
    loading: ()=>'',
});

const Home = Loadable({
  loader: () => import('./containers/Home'),
  loading: Loading,
});

const GDScope = Loadable({
    loader: () => import('./containers/GDScope'),
    loading: Loading,
  });

const TDScope = Loadable({
    loader: () => import('./containers/TDScope'),
    loading: Loading,
  });

const GIScope = Loadable({
    loader: () => import('./containers/GIScope'),
    loading: Loading,
  });

const GImemberScope = Loadable({
    loader: () => import('./containers/GImemberScope'),
    loading: Loading,
});


const GIhistoryScope = Loadable({
    loader: () => import('./containers/GIhistoryScope'),
    loading: Loading,
});

const GIbuildScope = Loadable({
    loader: () => import('./containers/GIbuildScope'),
    loading: Loading,
});

// const GIimportScope = Loadable({
//     loader: () => import('./containers/GIimportScope'),
//     loading: Loading,
// });

const GIeditScope = Loadable({
    loader: () => import('./containers/GIeditScope'),
    loading: Loading,
});

// const GIhostScope = Loadable({
//     loader: () => import('./containers/GIhostScope'),
//     loading: Loading,
// });

const MTScope = Loadable({
    loader: () => import('./containers/MTScope'),
    loading: Loading,
})
const MTbuildScope = Loadable({
    loader: () => import('./containers/MTbuildScope'),
    loading: Loading,
})
const MMScope = Loadable({
    loader: () => import('./containers/MMScope'),
    loading: Loading,
})
const MMbuildScope = Loadable({
    loader: () => import('./containers/MMbuildScope'),
    loading: Loading,
})
const RMScope = Loadable({
    loader: () => import('./containers/RMScope'),
    loading: Loading,
})
const GMScope = Loadable({
    loader: () => import('./containers/GMScope'),
    loading: Loading,
})
const GTScope = Loadable({
    loader: () => import('./containers/GTScope'),
    loading: Loading,
})
const CWScope = Loadable({
    loader: () => import('./containers/CWScope'),
    loading: Loading,
})
const HWScope = Loadable({
    loader: () => import('./containers/HWScope'),
    loading: Loading,
})
const KWScope = Loadable({
    loader: () => import('./containers/KWScope'),
    loading: Loading,
})
const UCScope = Loadable({
    loader: () => import('./containers/UCScope'),
    loading: Loading,
})
const TMScope = Loadable({
    loader: () => import('./containers/TMScope'),
    loading: Loading,
})
const PCScope = Loadable({
    loader: () => import('./containers/PCScope'),
    loading: Loading,
})
const MLScope = Loadable({
    loader: () => import('./containers/MLScope'),
    loading: Loading,
})

import Message from './components/shareComponent/Messages'//全局消息提示
// 控制台：window.debugger = function(...ar){ console.log(...ar)}
// window.debugger = (...ar) => {
    // 如果想看log的话重写恢复下面代码
    // console.log(...ar)
// }
/* global location */
/* eslint no-restricted-globals: ["off", "location"] */
const history = createHistory({basename: ''})
// Build the middleware for intercepting and dispatching navigation actions
const middleware = routerMiddleware(history)
// Add the reducer to your store on the `router` key
// Also apply our middleware for navigating
export const store = createStore(
    reducers,
    applyMiddleware(middleware),
    // compose(applyMiddleware(middleware),window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()) //插件调试，未安装会报错
)
const pullUserinfo = (url, resolve) => (
    promiseXHR(url, {type: 'Bearer', value: resolve}, null, 'GET')
        .then((res) => {
            const data = eval('(' + res + ')')
            return data.resultContent
        })
)

const MarketScope = ({location}) => {
    if (location.pathname == '/v2/') {
        window.location.href = window.location.origin + '/marketPortal/home?redirect=v2'
    }
    return (
        <div>
            {location.pathname == '/v2/' ?
                '' : <Route component={Login}/>
            }
        </div>
    )
}

const MainScope = ({location}) => {
    const init = location.pathname == "/v2/InitScope"
    const judge = location.pathname == "/v2/Home"
        || location.pathname == "/v2/home"//开发用，需删
        || location.pathname == "/v2/GDScope"
        || location.pathname == "/v2/TDScope"
        || location.pathname == "/v2/GIScope"
        || location.pathname.includes("/v2/GIScope/member")
        || location.pathname == "/v2/GHScope"
        || location.pathname == "/v2/GBScope"
        || location.pathname.includes("/v2/GIScope/edit")
        || location.pathname.includes("/v2/GIScope/import")
        || location.pathname == "/v2/GIScope/HostScope"
        || location.pathname == "/v2/MTScope"
        || location.pathname == "/v2/MLScope"
        || location.pathname.includes("/v2/MTScope/build")
        || location.pathname.includes("/v2/MMScope/build")
        || location.pathname == "/v2/MMScope"
        || location.pathname == "/v2/RMScope"
        || location.pathname == "/v2/GMScope"
        || location.pathname == "/v2/GTScope"
        || location.pathname == "/v2/CWScope"
        || location.pathname == "/v2/HWScope"
        || location.pathname == "/v2/ARScope"
        || location.pathname == "/v2/TMScope/UCScope"
        || location.pathname == "/v2/SysScope"
        || location.pathname == "/v2/PCScope"
        || location.pathname == "/v2/MSScope"
        || location.pathname == "/v2/NeedOwnScope"
        || location.pathname == "/v2/authority"
    if (judge || init) {
        const userInfo = store.getState().userInfo
        AuthProvider.encodeClientId()
        AuthProvider.getAccessToken()
            .then((resolve, reject) => {
                if (store.getState().userInfo.info.userinfo != undefined) {
                    return {
                        data: new Promise((resolve, reject) => {
                            resolve(store.getState().userInfo.info)
                        }),
                        token: resolve
                    }
                } else {
                    return {
                        data: pullUserinfo(API_PATH + '/tenantadmin/authsec/tenantbase/currentuser', resolve),
                        token: resolve
                    }
                }
            })
            .then((resolve, reject) => {
                resolve.data.then((res) => {
                    if (store.getState().userInfo.info.userinfo == undefined) {
                        store.dispatch(
                            {type: 'USERINFO_INIT', data: res}
                        )
                        return 'DONE'
                    } else {
                        return 'EXIST'
                    }
                })
                    .then(res => {
                        // if (!location.pathname.includes('/v2/GIScope/member')
                        //     && !location.pathname.includes('/v2/GIScope/history')
                        //     && !location.pathname.includes('/v2/GBScope')
                        //     && !location.pathname.includes('/v2/GIScope/edit')
                        //     && !location.pathname.includes('/v2/GIScope/import')
                        //     && !location.pathname.includes('/v2/GIScope/HostScope')
                        // ) {
                            // 新跳转页面不去做什么处理，影响不明
                            if (location.pathname != '/v2/login' && location.pathname != '/v2/' && location.pathname != '/v2/offline') {
                                if (store.getState().socketState.webSocket == '') {
                                    store.dispatch(
                                        {type: 'SET_SOCKET', socket: new WebSocketConnect()}
                                    )
                                }
                            } else {
                                if (store.getState().socketState.webSocket != '') {
                                    store.getState().socketState.webSocket.state.socket.close()
                                }
                            }
                        // }
                        // if(location.pathname == '/v2/login' || location.pathname == '/v2/' || location.pathname == '/v2/offline'){
                        //     if (store.getState().socketState.webSocket != '') {
                        //         store.getState().socketState.webSocket.state.socket.close()
                        //     }
                        // }
                    })
                return {token: resolve.token, promiseData: resolve.data}
            })
            .then((resolve) => {
                if (store.getState().naviMetaData.naviList.length == 0 || store.getState().socketState.webSocket == '') {
                    resolve.promiseData
                        .then((res) => {
                            const array = res.userinfo.roles
                            const formData = array.map(item => ({id: item.id}))
                            const url = API_PATH + '/basis-api/authsec/v2/menu/tree/roles'
                            promiseXHR(url, {type: 'Bearer', value: resolve.token}, formData, 'POST')
                            .then((res) => {
                                res = JSON.parse(res);
                                if (res.resultCode === '100') {
                                    store.dispatch({type: 'NAVILIST_INIT', data: res.resultContent})
                                }
                            }).catch((req) => {
                            console.log(req)
                            })
                            const infoListUrl = `${API_PATH}/basis-api/authsec/api/sysmsg/msgs/notify?page=0&size=10&userId=${res.userinfo.userId}`
                            promiseXHR(infoListUrl, {type: 'Bearer', value: resolve.token}, null, 'POST')
                            .then((res) => {
                                res = JSON.parse(res);
                                if (res.resultCode === '100') {
                                    store.dispatch({type: 'SYSINFO_SET_LIST', data: res.resultContent})
                                }
                            }).catch((req) => {
                                console.log(req)
                                store.dispatch({type: 'SYSINFO_SET_LIST', data: [{
                                    "content": "这是一条系统消息",
                                    "date": "2018-12-05",
                                    "id": "teat001",
                                    "msgType": "1",
                                    "title": "消息1"
                                }]})         
                            })
                        })
                } else {
                    return
                }
            })
    }
// console.log(judge);

    return (
        <div className="saas-container">
            <Message/>
            {judge && !init ? <SaasNaviBar location={location.pathname}/> : ''}
            <Switch>
                <Route path="/v2/InitScope" component={InitScope}/>
                <Route path="/v2/Home" component={Home}/>
                <Route path="/v2/GDScope" component={GDScope} />
                <Route path="/v2/TDScope" component={TDScope} />
                <Route path="/v2/offline" component={LoginAgain}/>
                <Route path="/v2/NeedOwnScope" component={NeedOwnScope}/>
                <Route path="/v2/authority" component={NeedAuthority}/>
                <Route path="/v2/GIScope/member/:groupId/:groupName/:matchStatus/:groupCode" component={GImemberScope}/>
                <Route path="/v2/GHScope" component={GIhistoryScope}/>
                <Route path="/v2/GBScope" component={GIbuildScope}/>
                <Route path="/v2/GIScope/edit/:taskId/:type" component={GIeditScope}/>
                {/* <Route path='/v2/GIScope/import/:hostId' component={GIimportScope}/> */}
                {/* <Route path='/v2/GIScope/HostScope' component={GIhostScope}/> */}
                <Route path="/v2/GIScope" component={GIScope}/>
                <Route path="/v2/CWScope" component={CWScope}/>
                <Route path="/v2/HWScope" component={HWScope}/>
                <Route path="/v2/ARScope" component={KWScope}/>
                <Route path="/v2/TMScope/UCScope" component={UCScope}/>
                <Route path="/v2/SysScope" component={TMScope}/>
                <Route path="/v2/MTScope/build/:id?/:type?" component={MTbuildScope}/>
                <Route path="/v2/MTScope" component={MTScope}/>
                <Route path="/v2/MLScope" component={MLScope}/>
                <Route path="/v2/MMScope/build/:id?/:type?" component={MMbuildScope}/>
                <Route path="/v2/MMScope" component={MMScope}/>
                <Route path="/v2/RMScope" component={RMScope}/>
                <Route path="/v2/GMScope" component={GMScope}/>
                <Route path="/v2/GTScope" component={GTScope}/>
                <Route path="/v2/PCScope" component={PCScope}/>
                <Route path="/v2/MSScope" component={MSScope}/>
                {/* <Route path="/v2" component={MarketScope}/> */}
                <Route component={Login}/>
            </Switch>
        </div>
    )
}
render(
    <Provider store={store}>
        {/* ConnectedRouter will use the store from Provider automatically */}
        <ConnectedRouter history={history}>
            <Switch>
                <Route exact path="/v2/login" component={Login}/>
                <Route path="/v2/register" component={Register}/>
                <Route path="/v2/HPScope" component={HPScope}/>
                <Route path="/v2/404" component={Error404}/>
                <Route path="/v2/503" component={Error503}/>
                <Route path="/v2" component={MainScope}/>
                <Route component={Error404}/>
            </Switch>
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
)