import React, { Component } from 'react'
import PropTypes from 'prop-types'
import MmMainScope from './mmSystemPortal/MmMainScope'
import MonitorStatus from './MonitorStatus'
export default class SaasMTScope extends Component {
    static propTypes = {
        actions: PropTypes.object.isRequired
    }
    componentWillMount() {
        const {naviMetaData,actions} = this.props
        if(naviMetaData.flatNaviList!==null){
            const isUse = naviMetaData.flatNaviList.find(v => v.code=='MMScope')
            if(!isUse){
            actions.goTo('/v2/authority?scope=MMScope')
            }else if(isUse.target.includes('/v2/NeedOwnScope')){
                actions.goTo(isUse.target)
              }
        }
    }
    componentDidUpdate(prevProps,prevState){
        const {naviMetaData,actions} = this.props
        if(naviMetaData.flatNaviList!==null&&prevProps.naviMetaData.flatNaviList===null){
            const isUse = naviMetaData.flatNaviList.find(v => v.code=='MMScope')
            if(!isUse){
            actions.goTo('/v2/authority?scope=MMScope')
            }else if(isUse.target.includes('/v2/NeedOwnScope')){
            actions.goTo(isUse.target)
            }
        }
    }
    componentDidMount() {
        document.title = '朋友圈 | 栗子云'
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
                <MmMainScope
                    userInfo={userInfo}
                    actions={actions}
                />
            </div>
        )
    }
}
