import React, { Component } from 'react'
import PropTypes from 'prop-types'
import KeyListPortal from './cwSystemPortal/keyListPortal'
import MonitorStatus from './MonitorStatus'
export default class SaasKWScope extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired
  }
  constructor(props){
    super(props)
  }
  componentWillMount() {
    const {naviMetaData,actions} = this.props
    if(naviMetaData.flatNaviList!==null){
      const isUse = naviMetaData.flatNaviList.find(v => v.code=='ARScope')
      if(!isUse){
        actions.goTo('/v2/authority?scope=ARScope')
      }else if(isUse.target.includes('/v2/NeedOwnScope')){
        actions.goTo(isUse.target)
      }
    }
  }
  componentDidUpdate(prevProps,prevState){
    const {naviMetaData,actions} = this.props
    if(naviMetaData.flatNaviList!==null&&prevProps.naviMetaData.flatNaviList===null){
      const isUse = naviMetaData.flatNaviList.find(v => v.code=='ARScope')
      if(!isUse){
        actions.goTo('/v2/authority?scope=ARScope')
      }else if(isUse.target.includes('/v2/NeedOwnScope')){
        actions.goTo(isUse.target)
      }
    }
  }
  componentDidMount(){
    document.title = '关键词 | 内容库 | 栗子云'
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
            <KeyListPortal actions={actions}/>
      </div>
    )
  }
}
