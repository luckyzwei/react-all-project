import React, { Component } from 'react'
import PropTypes from 'prop-types'
import KwMain from './cwSystemPortal/knowledgeWare/KwMain'
import MonitorStatus from './MonitorStatus'
export default class SaasCWScope extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired
  }

  componentDidMount(){
    document.title = '内容库 | 栗子云'
  }
  componentWillMount(){
    const {naviMetaData,actions} = this.props
    if(naviMetaData.flatNaviList!==null){
      const isUse = naviMetaData.flatNaviList.find(v => v.code=='CWScope')
      if(!isUse){
        actions.goTo('/v2/authority?scope=CWScope')
      }else if(isUse.target.includes('/v2/NeedOwnScope')){
        actions.goTo(isUse.target)
      }
    }
  }
  componentDidUpdate(prevProps,prevState){
    const {naviMetaData,actions} = this.props
    if(naviMetaData.flatNaviList!==null&&prevProps.naviMetaData.flatNaviList===null){
      const isUse = naviMetaData.flatNaviList.find(v => v.code=='CWScope')
      if(!isUse){
        actions.goTo('/v2/authority?scope=CWScope')
      }else if(isUse.target.includes('/v2/NeedOwnScope')){
        actions.goTo(isUse.target)
      }
    }
  }

  render() {
    const {userInfo,actions} = this.props
    const userId = userInfo && userInfo.info && userInfo.info.userinfo ? userInfo.info.userinfo.userId : ''
    return (
      <div style ={{height:'100%'}}>
            <div className='gc-headBox'>
                <MonitorStatus logout = {() => {actions.goTo('/v2/login')}} turnOffws = {actions.turnOffws} userInfo={userInfo}/>
            </div>
            <KwMain userId={userId}/>
      </div>
    )
  }
}
