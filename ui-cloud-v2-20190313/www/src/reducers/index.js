import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import groupList from './groupList'
import memberList from './memberList'
import searchKey from './searchKey'
import messageData from './messageData'
import singleMesgData from './singleMesgData'
import keywordsData from './keywordsData'
// import monitorInfo from './monitorInfo'
import userInfo from './userInfo'
import naviMetaData from './naviMetaData'
import microTaskList from './microTaskList'
import cwList from './cwList'
// import adminTaskList from './adminTaskList'
import socketState from './socketState'
// import userGuideFlow from './userGuideFlow'
// import gcGroupList from './gcGroupList'
import msgPicker from './msgPicker'
import systemInfo from './systemInfo'
const initState = false

const extendState = (state = initState, action) => {
  switch (action.type) {
    case 'CHANGE':
      return !state

    default:
     return state

  }

}

const rootReducer = combineReducers({
  extendState, groupList, memberList, messageData,singleMesgData,
  searchKey,userInfo,naviMetaData,microTaskList,cwList,msgPicker,
  socketState,keywordsData,systemInfo,
  routing: routerReducer})
export default rootReducer