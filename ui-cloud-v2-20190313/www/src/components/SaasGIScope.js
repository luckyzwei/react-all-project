import React, { Component } from 'react'
import PropTypes from 'prop-types'
import GiMainScope from './giSystemPortal/GiMainScope'
import MonitorStatus from './MonitorStatus'
export default class SaasGIScope extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired
  }

  componentDidMount(){
    document.title = '群管理 | 栗子云'
  }
  componentWillMount() {
    const {naviMetaData,actions} = this.props
    if(naviMetaData.flatNaviList!==null){
      const isUse = naviMetaData.flatNaviList.find(v => v.code=='GIScope')
      if(!isUse){
        actions.goTo('/v2/authority?scope=GIScope')
      }else if(isUse.target.includes('/v2/NeedOwnScope')){
        actions.goTo(isUse.target)
      }
    }
  }
  componentDidUpdate(prevProps,prevState){
    const {naviMetaData,actions} = this.props
    if(naviMetaData.flatNaviList!==null&&prevProps.naviMetaData.flatNaviList===null){
      const isUse = naviMetaData.flatNaviList.find(v => v.code=='GIScope')
      if(!isUse){
        actions.goTo('/v2/authority?scope=GIScope')
      }else if(isUse.target.includes('/v2/NeedOwnScope')){
        actions.goTo(isUse.target)
      }
    }
  }
  render() {
    const {userInfo,actions,naviMetaData} = this.props
    return (
      <div style ={{height:'100%'}}>
          <div className='gc-headBox'>
              <MonitorStatus logout = {() => {actions.goTo('/v2/login')}} turnOffws = {actions.turnOffws} userInfo={userInfo}/>
          </div>
          <GiMainScope
            actions = {actions}
          />
      </div>
    )
  }
}
