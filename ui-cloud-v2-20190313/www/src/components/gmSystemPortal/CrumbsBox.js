import React, { Component } from 'react'
export default class CrumbsBox extends Component {

  constructor(props){
    super(props)
    this.groupCrumbClick = this.groupCrumbClick.bind(this)
    this.memberCrumbClick = this.memberCrumbClick.bind(this)
    this.keywordsCrumbClick = this.keywordsCrumbClick.bind(this)
  }

  groupCrumbClick(){
    this.props.selectRoom('GROUP')
  }

  memberCrumbClick(){
    this.props.selectRoom('MEMBER')
  }

  keywordsCrumbClick(){
    this.props.selectRoom('KEYWORDS')
  }


  render(){
    const {width,groupList,memberList,selectRoomType,pullMesgById,logout,turnOffws,userInfo,keywordsData} = this.props
    const chatGroupId = groupList.chatGroupId
    const chatMemberId = memberList.chatMemberId
    const number = memberList.listData.length
    const groupName = chatGroupId != '' ?
    groupList.listData.find(item => item.id == chatGroupId) : ''
    const memberName = chatMemberId != '' ?
    memberList.listData.find(item => item.id == chatMemberId) : ''
    return(
      <div className = 'gm-crumbsBox' style = {{width:width}}>
        <div className = 'groupCrumb' style = {{display : groupName == '' || selectRoomType != 'GROUP'? 'none' : 'block',
        backgroundColor: 'white'}}
        ref = 'groupCrumb'
        onClick = {()=>{
          this.groupCrumbClick()
        }}>
          <span
            title = {groupName.nickName}
            style = {{paddingLeft:'23px', fontSize: '16px'}} >{groupName==undefined ? '' :  groupName.nickName}</span>
          <span>({number})</span>
        </div>
        <div className ='memberCrumb' style = {{display : memberName == ''|| selectRoomType != 'MEMBER' ? 'none' : 'block',
          backgroundColor: 'white'}}
        ref = 'memberCrumb'
        onClick = {() => {
          this.memberCrumbClick()
        }}>
          <span
            title = {memberName.nickName}
            style = {{paddingLeft:'23px'}}>{memberList==undefined ? '' :  memberName.nickName+'的聊天记录'}</span>
        </div>
        <div className ='memberCrumb' style = {{display : selectRoomType != 'KEYWORDS'? 'none' : 'block',
          backgroundColor: 'white'}}
        ref = 'memberCrumb'
        onClick = {() => {
          this.keywordsCrumbClick()
        }}>
          <span style = {{paddingLeft:'23px'}}>关键词</span>
          <span title = {groupName.nickName} style = {{paddingLeft:'23px',color:'#B5BDC6'}} >{groupName==undefined ? '' :  groupName.nickName}</span>
          <span style = {{color:'#B5BDC6'}}>({number})</span>
        </div>
        <div className="groupMsgCrumb" style = {{display : selectRoomType != 'GROUPMSG'? 'none' : 'block'}}>
          群发消息
        </div>
      </div>
    )
  }
}
