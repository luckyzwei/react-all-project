import React, { Component } from 'react'
import PropTypes from 'prop-types'
import PcMainScope from './pcSystemPortal/PcMainScope'
import MonitorStatus from "./MonitorStatus";
export default class SaasUMScope extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired
  }
  componentWillMount() {
    const {naviMetaData,actions} = this.props
    if(naviMetaData.flatNaviList!==null){
      const isUse = naviMetaData.flatNaviList.find(v => v.code=='PCScope')
      if(!isUse){
        actions.goTo('/v2/authority?scope=PCScope')
      }else if(isUse.target.includes('/v2/NeedOwnScope')){
        actions.goTo(isUse.target)
      }
    }
  }
  componentDidUpdate(prevProps,prevState){
    const {naviMetaData,actions} = this.props
    if(naviMetaData.flatNaviList!==null&&prevProps.naviMetaData.flatNaviList===null){
      const isUse = naviMetaData.flatNaviList.find(v => v.code=='PCScope')
      if(!isUse){
        actions.goTo('/v2/authority?scope=PCScope')
      }else if(isUse.target.includes('/v2/NeedOwnScope')){
        actions.goTo(isUse.target)
      }
    }
  }
  componentDidMount(){
    document.title = '个人设置 | 系统设置 | 栗子云'
  }
  componentWillUnmount() {
  }

  render() {
    const {actions,userInfo} = this.props
    return (
      <div style ={{height:'100%'}}>
          <div className='gc-headBox'>
              <MonitorStatus turnOffws={actions.turnOffws} userInfo={userInfo} />
          </div>
          <PcMainScope actions={actions} userInfo={userInfo}/>
      </div>
    )
  }
}
