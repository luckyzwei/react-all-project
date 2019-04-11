import React, {Component} from "react";
import PropTypes from 'prop-types'
import GdMainScope from './gdSystemPortal/GdMainScope'
import MonitorStatus from "./MonitorStatus";

export default class SaasGDScope extends Component {
    static propTypes = {
        actions: PropTypes.object.isRequired
    }

    constructor(props) {
        super(props)
        this.state = {}
    }
    componentWillMount() {
        const {
            naviMetaData,
            actions
        } = this.props
        // if (naviMetaData.flatNaviList !== null) {
        //     const isUse = naviMetaData.flatNaviList.find(v => v.code == 'GDScope')
        //     if (!isUse) {
        //         actions.goTo('/v2/authority?scope=GDScope')
        //     } else if (isUse.target.includes('/v2/NeedOwnScope')) {
        //         actions.goTo(isUse.target)
        //     }
        // }
    }
    componentDidMount() {
        document.title = '入群统计 | 群数据 | 栗子云'
    }
    componentDidUpdate(prevProps,prevState){
        const {naviMetaData,actions} = this.props
        // if(naviMetaData.flatNaviList!==null&&prevProps.naviMetaData.flatNaviList===null){
        //   const isUse = naviMetaData.flatNaviList.find(v => v.code=='GDScope')
        //   if(!isUse){
        //     actions.goTo('/v2/authority?scope=GDScope')
        //   }else if(isUse.target.includes('/v2/NeedOwnScope')){
        //     actions.goTo(isUse.target)
        //   }
        // }
      }

    render() {
        const {actions, userInfo} = this.props
        return (
            <div style={{height: '100%'}}>
                <div className='gc-headBox'>
                    <MonitorStatus logout={() => {
                        actions.goTo('/v2/login')
                    }} turnOffws={actions.turnOffws} userInfo={userInfo}/>
                </div>
                <GdMainScope
                    actions={actions}
                    userInfo={userInfo}
                />
            </div>
        )
    }
}
