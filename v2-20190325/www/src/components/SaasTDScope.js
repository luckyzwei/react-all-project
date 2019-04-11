import React, {Component} from "react";
import PropTypes from 'prop-types'
import TdMainScope from './tdSystemPortal/TdMainScope'
import MonitorStatus from "./MonitorStatus";

export default class SaasTDScope extends Component {
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
        document.title = '投放统计 | 群数据 | 栗子云'
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
                <TdMainScope
                    actions={actions}
                    userInfo={userInfo}
                />
            </div>
        )
    }
}
