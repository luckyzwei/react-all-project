import React, { Component } from 'react'
import PropTypes from 'prop-types'
import GIeditMain from './giEditPortal/GIeditMain'
import MonitorStatus from './MonitorStatus'
import { Prompt } from 'react-router'
export default class SassGIeditScope extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
  }
  state = {
    when: false
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

  changeWhen = (status) => {
    this.setState({when: status})
    return true
  }

  render() {
    const {userInfo,actions,match} = this.props
    const {when} = this.state
    return (
      <div style ={{height:'100%'}}>
          <div className='gc-headBox'>
              <MonitorStatus logout = {() => {actions.goTo('/v2/login')}} turnOffws = {actions.turnOffws} userInfo={userInfo}/>
          </div>
          <GIeditMain changeWhen={this.changeWhen} actions={actions} match={match}/>
          <Prompt 
            when={when}
            message="现在退出会丢失已修改信息，是否确认退出？"
          />
      </div>
    )
  }
}