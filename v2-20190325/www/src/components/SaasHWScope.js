import React, { Component } from 'react'
import PropTypes from 'prop-types'
import HotWord from './cwSystemPortal/hotWord'
import MonitorStatus from './MonitorStatus'
export default class SaasHWScope extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired
  }
  constructor(props){
    super(props)
  }

  componentDidMount(){
    document.title = '高频词汇 | 内容库 | 栗子云'
  }
  componentWillMount() {
    const {naviMetaData,actions} = this.props
    if(naviMetaData.flatNaviList!==null){
      const isUse = naviMetaData.flatNaviList.find(v => v.code=='HWScope')
      if(!isUse){
        actions.goTo('/v2/authority?scope=HWScope')
      }else if(isUse.target.includes('/v2/NeedOwnScope')){
        actions.goTo(isUse.target)
      }
    }
  }
  componentDidUpdate(prevProps,prevState){
    const {naviMetaData,actions} = this.props
    if(naviMetaData.flatNaviList!==null&&prevProps.naviMetaData.flatNaviList===null){
      const isUse = naviMetaData.flatNaviList.find(v => v.code=='HWScope')
      if(!isUse){
        actions.goTo('/v2/authority?scope=HWScope')
      }else if(isUse.target.includes('/v2/NeedOwnScope')){
        actions.goTo(isUse.target)
      }
    }
  }
  componentWillUnmount() {
  }

  render() {
    const {userInfo,actions} = this.props
    return (
      <div style ={{height:'100%'}}>
            <div className='gc-headBox'>
                <MonitorStatus logout = {() => {actions.goTo('/v2/login')}} turnOffws = {actions.turnOffws} userInfo={userInfo}/>
            </div>
            <HotWord/>
      </div>
    )
  }
}
