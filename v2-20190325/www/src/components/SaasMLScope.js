import React, { Component } from 'react'
import PropTypes from 'prop-types'
import MlMainScope from './mlSystemPortal/MlMainScope'
import MonitorStatus from './MonitorStatus'
export default class SaasMLScope extends Component {
    static propTypes = {
        actions: PropTypes.object.isRequired
    }
    componentWillMount() {
        const {naviMetaData,actions} = this.props
        if(naviMetaData.flatNaviList!==null){
            const isUse = naviMetaData.flatNaviList.find(v => v.code=='MTScope')
            if(!isUse){
            actions.goTo('/v2/authority?scope=MLScope')
            }else if(isUse.target.includes('/v2/NeedOwnScope')){
                actions.goTo(isUse.target)
              }
        }
    }
    componentDidUpdate(prevProps,prevState){
        const {naviMetaData,actions} = this.props
        if(naviMetaData.flatNaviList!==null&&prevProps.naviMetaData.flatNaviList===null){
            const isUse = naviMetaData.flatNaviList.find(v => v.code=='MTScope')
            if(!isUse){
                actions.goTo('/v2/authority?scope=MLScope')
            }else if(isUse.target.includes('/v2/NeedOwnScope')){
                actions.goTo(isUse.target)
            }
        }
    }
    componentDidMount() {
        document.title = '素材库 | 群投放 | 栗子云'
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
                <MlMainScope
                    userInfo={userInfo}
                    actions={actions}
                />
            </div>
        )
    }
}
