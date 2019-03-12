import React from 'react'
import { render } from 'react-dom'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import createHistory from 'history/createBrowserHistory'
import {Switch, Route } from 'react-router'
import { Provider } from 'react-redux'
import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux'
import App from './containers/App'
// import About from './containers/About'
import NewAboutUs from './containers/NewAboutUs'
import Contentfenfa from './containers/Contentfenfa'
// import Customers from './containers/Customers'
import LiziCloud from './containers/LiziCloud'
// import YouLi from './containers/YouLi'
// import Recruit from './containers/Recruit'
import Contact from './containers/Contact'
// import Join from './containers/Join'
import Error from './containers/Error'
import reducers from './reducers'

import {basePath} from './constants/DataModel'
// 控制台：window.debugger = function(...ar){window.debugger(...ar)}
window.debugger = (...ar) => {
  // 如果想看log的话重写恢复下面代码
  // window.debugger(...ar)
}
const history = createHistory({basename: ''})
// Build the middleware for intercepting and dispatching navigation actions
const middleware = routerMiddleware(history)

// Add the reducer to your store on the `router` key
// Also apply our middleware for navigating
const store = createStore(
  combineReducers({
    ...reducers,
    router: routerReducer
  }),
  applyMiddleware(middleware)
)

render(
  <Provider store={store}>
     { /* ConnectedRouter will use the store from Provider automatically */ }
     <ConnectedRouter history={history}>
       <div>
         <Switch>
           <Route exact path="/" component={App} />
           <Route path="/lizicloud" component={LiziCloud} />
           {/* <Route path="/customers" component={Customers} /> */}
             {/* <Route path="/youli" component={YouLi}/> */}
             {/* <Route path="/recruit" component={Recruit}/> */}
           <Route path="/about" component={NewAboutUs} />
           <Route path="/content" component={Contentfenfa} />
           <Route path="/contact" component={Contact} />
           {/* <Route path="/join" component={Join} /> */}
           <Route path="*" component={Error} />
         </Switch>
       </div>
     </ConnectedRouter>
   </Provider>,
  document.getElementById('root')
)
