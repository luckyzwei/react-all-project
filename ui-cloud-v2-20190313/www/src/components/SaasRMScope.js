import React, { Component } from 'react'
import PropTypes from 'prop-types'
import RmMainScope from './rmSystemPortal/RmMainScope'
import MonitorStatus from './MonitorStatus'
export default class SaasRMScope extends Component {
    static propTypes = {
        actions: PropTypes.object.isRequired
    }
    componentWillMount() {
        const {naviMetaData,actions} = this.props
        if(naviMetaData.flatNaviList!==null){
            const isUse = naviMetaData.flatNaviList.find(v => v.code=='RMScope')
            if(!isUse){
            actions.goTo('/v2/authority?scope=RMScope')
            }else if(isUse.target.includes('/v2/NeedOwnScope')){
                actions.goTo(isUse.target)
              }
        }   
      }
      componentDidUpdate(prevProps,prevState){
        const {naviMetaData,actions} = this.props
        if(naviMetaData.flatNaviList!==null&&prevProps.naviMetaData.flatNaviList===null){
          const isUse = naviMetaData.flatNaviList.find(v => v.code=='RMScope')
          if(!isUse){
            actions.goTo('/v2/authority?scope=RMScope')
          }else if(isUse.target.includes('/v2/NeedOwnScope')){
            actions.goTo(isUse.target)
          }
        }
      }
    componentDidMount() {
        document.title = '机器人 | 群管理 | 栗子云'
    }
    componentWillUnmount() {
    }

    render() {
        const { userInfo, actions } = this.props
        return (
            <div style={{ height: '100%' }}>
                <div className='gc-headBox'>
                    <MonitorStatus turnOffws={actions.turnOffws} userInfo={userInfo} />
                </div>
                <RmMainScope
                    actions={actions}
                    userInfo={userInfo}
                />
            </div>
        )
    }
}
