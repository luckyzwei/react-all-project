import React, { Component } from 'react'
import PropTypes from 'prop-types'
import $ from 'jquery'
import GmMainScope from './gmSystemPortal/GmMainScope'
import MonitorStatus from './MonitorStatus'
import _ from 'lodash'
import WebSocketConnect from '../funStore/WebSocketConnect'
export default class SaasGMScope extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired
  }
  constructor(props){
    super(props)
    this.resizeEvent = _.debounce(this.resizeEvent.bind(this),150)
  }

  state = {
    screenWidth : document.documentElement.clientWidth,
  }

  componentWillMount() {
    const {naviMetaData,actions} = this.props
    if(naviMetaData.flatNaviList!==null){
      const isUse = naviMetaData.flatNaviList.find(v => v.code=='GMScope')
      if(!isUse){
        actions.goTo('/v2/authority?scope=GMScope')
      }else if(isUse.target.includes('/v2/NeedOwnScope')){
        actions.goTo(isUse.target)
      }
    }
  }
  componentDidUpdate(prevProps,prevState){
    const {naviMetaData,actions} = this.props
    if(naviMetaData.flatNaviList!==null&&prevProps.naviMetaData.flatNaviList===null){
      const isUse = naviMetaData.flatNaviList.find(v => v.code=='GMScope')
      if(!isUse){
        actions.goTo('/v2/authority?scope=GMScope')
      }else if(isUse.target.includes('/v2/NeedOwnScope')){
        actions.goTo(isUse.target)
      }
    }
  }

  componentDidMount(){
    document.title = '群消息 | 栗子云'
    $(window).get(0).addEventListener('resize',this.resizeEvent)
    // // 群消息页面链接socket
    // const {socketState,actions} = this.props
    // if (socketState.webSocket == '') {
    //   actions.connectSocket(new WebSocketConnect())
    // }
  }
  componentWillUnmount() {
    $(window).get(0).removeEventListener('resize',this.resizeEvent)
    this.props.actions.initMemberList()
    this.props.actions.unSelectGroup()
  }

  resizeEvent(){
    this.setState({
      screenWidth : document.documentElement.clientWidth
    })
  }

  render() {
    const {socketState,userInfo,extendState,groupList,memberList,singleMesgData,messageData,keywordsData,searchKey,actions,microTaskList,cwList,msgPicker} = this.props
    const isExtend = this.state.extendType
    return (
      <div style = {{height:'100%'}}>
        <div className='gc-headBox'>
          <MonitorStatus logout = {() => {actions.goTo('/v2/login')}} turnOffws = {actions.turnOffws} userInfo={userInfo}/>
        </div>
        <GmMainScope
        width = {!extendState? (document.documentElement.clientWidth - 134) : document.documentElement.clientWidth - 84}
        socketState = {socketState}
        isExtend = {!extendState}
        userInfo = {userInfo}
        groupList = {groupList}
        memberList = {memberList}
        singleMesgData = {singleMesgData}
        messageData = {messageData}
        keywordsData = {keywordsData}
        searchKey = {searchKey}
        actions =  {actions}
        microTaskList = {microTaskList}
        cwList = {cwList}
        msgPicker = {msgPicker}
        />
      </div>
    )
  }
}
