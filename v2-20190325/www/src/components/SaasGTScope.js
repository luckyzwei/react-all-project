import React, { Component } from 'react'
import PropTypes from 'prop-types'
import GtMainScope from './gtSystemPortal/GtMainScope'
import MonitorStatus from './MonitorStatus'
export default class SaasGTScope extends Component {
    static propTypes = {
        actions: PropTypes.object.isRequired
    }
    componentWillMount() {
        // const {naviMetaData,actions} = this.props
        // if(naviMetaData.flatNaviList!==null){
        //     const isUse = naviMetaData.flatNaviList.find(v => v.code=='GTScope')
        //     if(!isUse){
        //     actions.goTo('/v2/authority?scope=GTScope')
        //     }else if(isUse.target.includes('/v2/NeedOwnScope')){
        //         actions.goTo(isUse.target)
        //     }
        // }
    }
    componentDidUpdate(prevProps,prevState){
        const {naviMetaData,actions} = this.props
        // if(naviMetaData.flatNaviList!==null&&prevProps.naviMetaData.flatNaviList===null){
        //   const isUse = naviMetaData.flatNaviList.find(v => v.code=='GTScope')
        //   if(!isUse){
        //     actions.goTo('/v2/authority?scope=GTScope')
        //   }else if(isUse.target.includes('/v2/NeedOwnScope')){
        //     actions.goTo(isUse.target)
        //   }
        // }
      }
    componentDidMount() {
        document.title = '入群页 | 新建群 | 栗子云'
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
                <GtMainScope
                    actions={actions}
                    userInfo={userInfo}
                />
            </div>
        )
    }
}
