import React, { Component } from 'react'
import PropTypes from 'prop-types'
import GIbuildMain from './giBuildPortal/GIbuildMain'
import MonitorStatus from './MonitorStatus'
import { Prompt } from 'react-router'
export default class SassGIhistoryScope extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired
  }
  constructor(props){
    super(props)
    this.state={
      promptFlag: false
    }
  }

  componentDidMount(){
    document.title = '新建群 | 群管理 | 栗子云'
  }
  componentWillMount() {
    const {naviMetaData,actions} = this.props
    if(naviMetaData.flatNaviList!==null){
      const isUse = naviMetaData.flatNaviList.find(v => v.code=='GIScope')
      if(!isUse){
        actions.goTo('/v2/authority?scope=GIScope')
      }else if(isUse.target.includes('/v2/NeedOwnScope')){
        actions.goTo(isUse.target)
      }
    }
  }
  componentDidUpdate(prevProps,prevState){
    const {naviMetaData,actions} = this.props
    if(naviMetaData.flatNaviList!==null&&prevProps.naviMetaData.flatNaviList===null){
      const isUse = naviMetaData.flatNaviList.find(v => v.code=='GIScope')
      if(!isUse){
        actions.goTo('/v2/authority?scope=GIScope')
      }else if(isUse.target.includes('/v2/NeedOwnScope')){
        actions.goTo(isUse.target)
      }
    }
  }
  setPromptFlagHandle=(promptFlag)=>{
    this.setState({promptFlag})
  }
  render() {
    const {promptFlag} = this.state
    const {userInfo,actions,match} = this.props
    return (
      <div style ={{height:'100%'}}>
          <div className='gc-headBox'>
              <MonitorStatus turnOffws = {actions.turnOffws} userInfo={userInfo}/>
          </div>
          <GIbuildMain actions={actions} setPromptFlagHandle={this.setPromptFlagHandle}/>
          <Prompt 
            when={promptFlag}
            message="现在退出会丢失已设置信息，是否确认退出？"
          />
      </div>
    )
  }
}
