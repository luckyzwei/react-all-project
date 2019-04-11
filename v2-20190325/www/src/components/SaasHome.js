import React, {Component} from "react";
import PropTypes from 'prop-types'
import HomeMainScope from './homeSystemPortal/HomeMainScope'
import MonitorStatus from "./MonitorStatus";

export default class SaasNewHome extends Component {
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
        if (naviMetaData.flatNaviList !== null) {
            const isUse = naviMetaData.flatNaviList.find(v => v.code == 'Home')
            if (!isUse) {
                actions.goTo('/v2/authority?scope=Home')
            } else if (isUse.target.includes('/v2/NeedOwnScope')) {
                actions.goTo(isUse.target)
            }
        }
    }
    componentDidMount() {
        document.title = '首页 | 栗子云'
    }
    componentDidUpdate(prevProps,prevState){
        const {naviMetaData,actions} = this.props
        if(naviMetaData.flatNaviList!==null&&prevProps.naviMetaData.flatNaviList===null){
          const isUse = naviMetaData.flatNaviList.find(v => v.code=='Home')
          if(!isUse){
            actions.goTo('/v2/authority?scope=Home')
          }else if(isUse.target.includes('/v2/NeedOwnScope')){
            actions.goTo(isUse.target)
          }
        }
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
                <HomeMainScope
                    actions={actions}
                    userInfo={userInfo}
                />
            </div>
        )
    }
}
