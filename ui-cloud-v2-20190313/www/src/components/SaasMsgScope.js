import React, { Component } from 'react'
import PropTypes from 'prop-types'
import MsgRemind from './msgPortal'
import MonitorStatus from './MonitorStatus'
export default class SaasMsgScope extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired
  }

  componentDidMount(){
    document.title = '系统消息 | 栗子云'
  }
  componentWillUnmount() {
  }

  render() {
    const {userInfo,actions} = this.props
    const userId = userInfo && userInfo.info && userInfo.info.userinfo ? userInfo.info.userinfo.userId : ''
    return (
      <div style ={{height:'100%'}}>
            <div className='gc-headBox'>
                <MonitorStatus logout = {() => {actions.goTo('/v2/login')}} turnOffws = {actions.turnOffws} userInfo={userInfo}/>
            </div>
            <MsgRemind userId={userId}/>
      </div>
    )
  }
}
