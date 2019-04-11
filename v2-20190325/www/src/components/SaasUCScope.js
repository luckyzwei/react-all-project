import React, { Component } from 'react'
import PropTypes from 'prop-types'
import UcMainScope from './ucSystemPortal/UcMainScope'
import MonitorStatus from "./MonitorStatus";
export default class SaasUCScope extends Component {
    static propTypes = {
        actions: PropTypes.object.isRequired
    }
    componentWillMount() {
        const {naviMetaData,actions} = this.props
        if(naviMetaData.flatNaviList!==null){
            const isUse = naviMetaData.flatNaviList.find(v => v.code=='UCScope')
            if(!isUse){
                actions.goTo('/v2/authority?scope=UCScope')
            }else if(isUse.target.includes('/v2/NeedOwnScope')){
                actions.goTo(isUse.target)
            }
        }
      }
    componentDidUpdate(prevProps,prevState){
        const {naviMetaData,actions} = this.props
        if(naviMetaData.flatNaviList!==null&&prevProps.naviMetaData.flatNaviList===null){
          const isUse = naviMetaData.flatNaviList.find(v => v.code=='UCScope')
          if(!isUse){
            actions.goTo('/v2/authority?scope=UCScope')
          }else if(isUse.target.includes('/v2/NeedOwnScope')){
            actions.goTo(isUse.target)
          }
        }
      }
    componentDidMount(){
        document.title = '用户角色 | 系统设置 | 栗子云'
    }
    componentWillUnmount() {
    }

    render() {
        const {userInfo,actions} = this.props
        return (
            <div style ={{height:'100%',position:'relative'}}>
                <div className='gc-headBox'>
                    <MonitorStatus turnOffws={actions.turnOffws} userInfo={userInfo} />
                </div>
                <UcMainScope
                    actions = {actions}
                    userInfo={userInfo}
                />
            </div>
        )
    }
}
