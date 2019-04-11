import React, { Component } from 'react'
import PropTypes from 'prop-types'
import MonitorStatus from './MonitorStatus'
/* global location */
/* eslint no-restricted-globals: ["off", "location"] */
export default class SaasNeedOwn extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired
  }

  componentDidMount(){
    document.title = '权限开通 | 栗子云'

  }
  componentWillUnmount() {

  }


  render() {
    const {actions,userInfo,naviMetaData} = this.props

    const result = [
      {
        "code": "Home",
        "name": "群状态"
      },
      {
        "code": "GIScope",
        "name": "群管理",
        "target": "/v2/GIScope"
      },
      {
        "code": "RMScope",
        "name": "导入群",
        "target": "/v2/RMScope"
      },
      {
        "code": "HostScope",
        "name": "账号托管",
        "target": "/v2/GIScope"
      },
      {
        "code": "GMScope",
        "name": "群消息"
      },
      {
        "code": "MTScope",
        "name": "群投放"
      },
      {
        "code": "MMScope",
        "name": "朋友圈"
      },
      {
        "code": "CWScope",
        "name": "内容库",
        "target": "/v2/CWScope"
      },
      {
        "code": "HWScope",
        "name": "高频词汇",
        "target": "/v2/CWScope"
      },
      {
        "code": "ARScope",
        "name": "关键词",
        "target": "/v2/ARScope"
      },
      {
        "code": "SysScope",
        "name": "用户管理",
        "target": "/v2/SysScope"
      },
      {
        "code": "PCScope",
        "name": "用户设置",
        "target": "/v2/SysScope"
      },
      {
        "code": "UCScope",
        "name": "用户权限",
        "target": "/v2/SysScope"
      }
    ]

    const findedCode = result.find(v => location.search.includes(v.code))
    const desc = findedCode==undefined ? '栗子云相关' : findedCode.name

    return (
      <div style ={{height:'100%'}}>
        <div className='gc-headBox'>
            <MonitorStatus logout = {() => {actions.goTo('/v2/login')}} turnOffws = {actions.turnOffws} userInfo={userInfo}/>
        </div>

        <div className = 'needownWrapper'>
          <div className = 'showBj'>

          </div>
          <div className = 'desc'>
            {`您没有「 ${desc} 」使用权限，请联系管理员为你开通!`}
          </div>
        </div>

      </div>
    )
  }
}
