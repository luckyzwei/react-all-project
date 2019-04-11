import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {history} from '../index'
import { push, replace } from 'react-router-redux'
import $ from 'jquery'
import SaasNaviBar from './SaasNaviBar'
import TmMainScope from './tmSystemPortal/TmMainScope'
import MonitorStatus from "./MonitorStatus";
export default class SaasTMScope extends Component {
    static propTypes = {
        actions: PropTypes.object.isRequired
    }

    state = {
        screenWidth : document.documentElement.clientWidth
    }
    componentWillMount() {
        const {naviMetaData,actions} = this.props
        if(naviMetaData.flatNaviList!==null){
            const isUse = naviMetaData.flatNaviList.find(v => v.code=='SysScope')
            if(!isUse){
              actions.goTo('/v2/authority?scope=SysScope')
            }else if(isUse.target.includes('/v2/NeedOwnScope')){
                actions.goTo(isUse.target)
              }
        }
      }
      componentDidUpdate(prevProps,prevState){
        const {naviMetaData,actions} = this.props
        if(naviMetaData.flatNaviList!==null&&prevProps.naviMetaData.flatNaviList===null){
          const isUse = naviMetaData.flatNaviList.find(v => v.code=='SysScope')
          if(!isUse){
            actions.goTo('/v2/authority?scope=SysScope')
          }else if(isUse.target.includes('/v2/NeedOwnScope')){
            actions.goTo(isUse.target)
          }
        }
      }
    componentDidMount(){
        document.title = '用户管理 | 系统设置 | 栗子云'
        window.onresize = () => {
            this.setState({
                screenWidth : document.documentElement.clientWidth
            })
        }
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
                <TmMainScope
                    actions = {actions}
                    userInfo={userInfo}
                />
            </div>
        )
    }
}
