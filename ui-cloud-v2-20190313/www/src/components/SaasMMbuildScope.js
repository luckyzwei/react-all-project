import React, { Component } from 'react'
import PropTypes from 'prop-types'
import MmBuildMain from './mmBuildPortal/MmBuildMain'
import MonitorStatus from './MonitorStatus'
import { Prompt } from 'react-router'
export default class SaasMTbuildScope extends Component {
    state = {
        promptFlag: true
    }
    static propTypes = {
        actions: PropTypes.object.isRequired
    }
    componentWillMount() {
        const {naviMetaData,actions} = this.props
        if(naviMetaData.flatNaviList!==null){
            const isUse = naviMetaData.flatNaviList.find(v => v.code=='MTScope')
            if(!isUse){
            actions.goTo('/v2/authority?scope=MTScope')
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
            actions.goTo('/v2/authority?scope=MTScope')
          }else if(isUse.target.includes('/v2/NeedOwnScope')){
            actions.goTo(isUse.target)
          }
        }
      }
    componentDidMount() {
        document.title = '编辑朋友圈 | 栗子云'
    }
    componentWillUnmount() {
    }
    setPromptFlagHandle = async (promptFlag)=>{
        this.setState({promptFlag})
    }

    render() {
        const { userInfo, actions, match, history } = this.props
        return (
            <div style={{ height: '100%' }}>
                <div className='gc-headBox'>
                    <MonitorStatus turnOffws={actions.turnOffws} userInfo={userInfo} />
                </div>
                <MmBuildMain
                    actions={actions}
                    match={match}
                    history={history}
                    setPromptFlagHandle={this.setPromptFlagHandle}
                />
                <Prompt 
                    when={this.state.promptFlag}
                    message="现在退出会丢失已设置信息，是否确认退出？"
                />
            </div>
        )
    }
}
