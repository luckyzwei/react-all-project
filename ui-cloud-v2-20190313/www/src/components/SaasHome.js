import React, {Component} from "react";
import PropTypes from 'prop-types'
// import HomeMainScope from "./homeSystemPortal/HomeMainScope/Index";
import HomeMainScope from './homeSystemPortal/HomeMainScope'
import MonitorStatus from "./MonitorStatus";

export default class SaasHome extends Component {
    static propTypes = {
        actions: PropTypes.object.isRequired
    }

    constructor(props) {
        super(props)
        this.state = {
            previewFlag: false,
            artBody: [],
            boardType: 0,//0 －－ 不展示，1 －－ 新增 ； 2 －－ 编辑 ; 3 -- 预览 ; 4 -- 复制,
            taskId: ''
        }
        this.previewTaskHandle = this.previewTaskHandle.bind(this)
    }

    componentWillMount() {
        const {naviMetaData,actions} = this.props
        if(naviMetaData.flatNaviList!==null){
            const isUse = naviMetaData.flatNaviList.find(v => v.code=='Home')
            if(!isUse){
            actions.goTo('/v2/authority?scope=Home')
            }else if(isUse.target.includes('/v2/NeedOwnScope')){
                actions.goTo(isUse.target)
              }
        }
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

    componentDidMount() {
        document.title = '首页 | 栗子云'
    }

    componentWillUnmount() {
    }

    closeTaskHandle() {
        this.setState({
            previewFlag: false,
            boardType: 0
        })
    }

    editTaskHandle(id) {
        this.setState({
            boardType: 2,
            taskId: id
        })
    }

    previewTaskHandle(id) {
        this.setState({
            boardType: 3,
            taskId: id
        })
    }

    render() {
        const {actions, userInfo} = this.props
        const {previewFlag, artBody, boardType, taskId} = this.state
        return (
            <div style={{height: '100%'}}>
                <div className='gc-headBox'>
                    <MonitorStatus logout={() => {
                        actions.goTo('/v2/login')
                    }} turnOffws={actions.turnOffws} userInfo={userInfo}/>
                </div>
                <HomeMainScope
                    fatherProps={this}
                    actions={actions}
                    userInfo={userInfo}
                />
                {
                    previewFlag ?
                       '' :
                        ''
                }
            </div>
        )
    }
}
