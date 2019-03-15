import React, { Component } from 'react'
import promiseFile from '../../funStore/promiseFile'
import AuthProvider from '../../funStore/AuthProvider'
import promiseXHR from '../../funStore/ServerFun'
import FaceForQQ from './FaceForQQ'
import $ from 'jquery'
import GroupSendBox from './GroupSendBox'
import AltMemberBox from './AltMemberBox'
import MsgPickerForm from './MsgPickerForm'
import {API_PATH} from '../../constants/OriginName'
// import RobotListBox from './RobotListBox';
import {tongji} from '../../funStore/tongji'

const cursorMoveEnd = (obj) => {
            obj.focus();
            var len = obj.innerHTML.length;
            if (document.selection) {
                var sel = document.selection.createRange();
                sel.moveStart('character',len);
                sel.collapse();
                sel.select();
            }
            else{                                                 /* IE11 特殊处理 */
                var sel = window.getSelection();
                var range = document.createRange();
                range.selectNodeContents(obj);
                range.collapse(false);
                sel.removeAllRanges();
                sel.addRange(range);
            }
        }
export default class SendMsBox extends Component{
  constructor(props) {
    super(props)
    this.sendBefore = this.sendBefore.bind(this)
    this.getKeywordsMsg = this.getKeywordsMsg.bind(this)
    this.clickEvent = this.clickEvent.bind(this)
  }

  state = {
    content:''
  }

  showPickMsgBox(){
    if(this.props.selectRoomType=='GROUP'){
      this.props.actions.lauchPicker()
    }
  }

  showSendMsgBox(){

  }

  componentDidMount(){
    const self = this
    $("#msg_context").on('keyup',function (e) {
        $("#msg_context img").removeAttr("style")
        var temporary = $("#msg_context pre").html()
        $("#msg_context pre").remove()
        $("#msg_context").html(temporary)

       })

    $("#msg_context").focus(function (e) {
           e.preventDefault();
       }).keydown(function (e) {
         e = e||window.event
         const obj =  document.getElementById('msg_context');
         if ((e.metaKey||e.ctrlKey) && e.keyCode == 13) {
           if(obj.childNodes.length!=0&&obj.childNodes[obj.childNodes.length-1].nodeValue==null){
                   $("#msg_context").append('<br>');
               }else {
                   $("#msg_context").append('<br><br>');
               }
               //保持滚动条随内容变化
               const scrollTop = $("#msg_context")[0].scrollHeight;
               $("#msg_context").scrollTop(scrollTop);
               cursorMoveEnd(obj)
         }else if (e.keyCode == 13) {
           e.preventDefault()
           self.clickEvent()
         }
      })
  }

  sendBefore(){
    const immemId = this.props.userInfo.info.immemId
    const groupList = this.props.groupList
    const chatGroupId = this.props.groupList.chatGroupId
    const groupCode = this.props.groupList.targetGroup.code
    const memberList = this.props.memberList
    const chatMemberId = this.props.memberList.chatMemberId
    const selectRoomType = this.props.selectRoomType
    const atAll = memberList.altAll
    let groups = ''
    if(chatGroupId==''){
      // 群发的消息
      groups = groupList.listData.map(item =>
        item.altSelected === true ?
        {groupCode:item.code,atAll:atAll,users:[],sendId:item.robotGroupMemList[0]?item.robotGroupMemList[0].robotCode:''}:''
      )
      groups = groups.filter(item => item!= '')
    }else {
      let users = memberList.listData.map(item =>
        item.altSelected === true ?
        item.memCode:'')
      users = users.filter(item => item!= '')
      if(selectRoomType=='MEMBER'&&chatMemberId!=''){
        // @某个人的
        groups = [{groupCode:groupCode,atAll:false,users:[chatMemberId],sendId:groupList.targetGroup.robotGroupMemList[0]?groupList.targetGroup.robotGroupMemList[0].robotCode:''}]
      }else {
        // @多人 正常群聊
        groups = [{groupCode:groupCode,atAll:atAll,users:users,sendId:groupList.targetGroup.robotGroupMemList[0]?groupList.targetGroup.robotGroupMemList[0].robotCode:''}]
      }
    }
    return groups!= '' ? {imMemId:immemId,groups:groups} : ''
  }

  clickEvent(){
    const socket = this.props.socket.state.socket
    const groupList = this.props.groupList
    const beforeData = this.sendBefore()
    tongji('Lzc_QunXiaoXi_FaSongXiaoXi')
    if(beforeData!=''){
      const repl = $("#msg_context").html().replace(/<br>/g,"\r");
      $("#msg_context").html(repl);
      $("#msg_context").find('style').remove();
      $("#msg_context img").each(function (i) {
      $("#msg_context img").eq(i).html($("#msg_context img").eq(i).attr("text"));
      })
      const value = $("#msg_context").text().replace(/\n\n\n\n\n\n\n\n/gi, '').replace(/\n\n\n\n\n\n\n/gi, '').trim()
      if(value.length!=0){
        // const sendId = groupList.targetGroup.robotGroupMemList[0]?groupList.targetGroup.robotGroupMemList[0].robotCode:''
        const data = Object.assign({},beforeData,{msgType:'text',content:value})
        // console.log(JSON.stringify({command:252,frame:1,data:data}));
        socket.send(JSON.stringify({command:252,frame:1,data:data}))
        $("#msg_context").html('')
        this.props.actions.altInit()
      }
    }
  }

  fileUpload(){
    tongji('Lzc_QunXiaoXi_WenJian')
    const socket = this.props.socket.state.socket
    const groupList = this.props.groupList
    const beforeData = this.sendBefore()
    const file = $('#imgFile')[0].files[0]
    const index = $('#imgFile').val().lastIndexOf('.')
    const finalName = $("#imgFile").val().substr(index+1)
    const format = ["jpg","png","jpeg","xls","xlsx"]
    const formData = new FormData()
    formData.append('file',file)
    if(beforeData!=''){
      if(format.includes(finalName.toLowerCase())){
        if(file.size<15242880){
          const url = API_PATH+'/gridfs-api/authsec/media'
          AuthProvider.getAccessToken()
          .then((resolve,reject)=> {
            promiseFile(url,resolve,formData)
            .then(res => {
              const data = res
              const imgUrl = data.resultContent.url
              $("#imgFile").val('')
              // const sendId = groupList.targetGroup.robotGroupMemList[0]?groupList.targetGroup.robotGroupMemList[0].robotCode:''
              const result = Object.assign({},beforeData,{msgType:'photo',content:imgUrl})
              // console.log(JSON.stringify({command:252,frame:1,data:result}));
              socket.send(JSON.stringify({command:252,frame:1,data:result}))
            })
          })
        }else {

        }
      }
    }
  }

  keywordsCrumbClick(){
    const {groupList,selectRoom,actions} = this.props
    tongji('Lzc_QunXiaoXi_GuanJianCi')
    selectRoom('KEYWORDS')
    actions.reduceAllKeyword(groupList.chatGroupId)
    this.getKeywordsMsg()
  }

  getKeywordsMsg(){
  const {groupList,actions} = this.props
  const url = API_PATH+'/groupmsg-api/authsec/group/'+groupList.chatGroupId+'/keywordmessages?_page=0&_size=20'
  AuthProvider.getAccessToken()
  .then((resolve,reject)=>{
      promiseXHR(url,{type:'Bearer',value:resolve},null,'GET')
      .then(res => {
        const data = eval('('+res+')')
        actions.pullKeywordsMsg(data.resultContent,data.pageInfo)
        $('#memberRoom').scrollTop($('#memberRoom')[0].scrollHeight-1)
        $('#keywordsRoom').scrollTop($('#keywordsRoom')[0].scrollHeight-1)
      })
  })
}

  componentWillUnmount(){
    this.props.actions.turnOffPicker()
  }
  render(){
    const {userInfo,groupList,memberList,actions,
      selectRoom,msgPicker,startPoint,dragObject,distance,oldDistance,selectRoomType} = this.props
    const msgPicker_on = msgPicker!=undefined? msgPicker.pickState : false
    const keywordsCrumbClick = this.keywordsCrumbClick.bind(this)
    let cssHeight = dragObject!=null ? distance+oldDistance : oldDistance
    return(
      <div className = 'sendMsBox' style = {{height:(240+cssHeight)+'px'}}>
        <div className = 'moveDrag'
          onMouseDown = {(e)=>{
            const old = oldDistance!=0 ? oldDistance : 0
            actions.setObject('SENDBOX',e.pageY,old)
          }}
          ></div>
        <div className = 'gm-msgSendBox' style = {{height:(220+cssHeight)+'px'}}>
            <div className="toolBar">
                {selectRoomType == 'GROUP'&&<FaceForQQ />}
                {selectRoomType == 'GROUP'&&<div className="animation gm-icon">
                <div className="toolBtn uploadBtn icon-gm">
                  <div className="icon-text">图片</div>
                  <input id= 'imgFile' type = 'file' style = {{width:'40px',height:'40px',overflow:'hidden',opacity:0,cursor:'pointer'}}
                   onChange = {this.fileUpload.bind(this)}
                   accept="image/gif, image/jpeg,image/jpg,image/png"
                  />
                </div>
                </div>}
                {selectRoomType == 'GROUP'&&<AltMemberBox
                memberList = {memberList}
                putStoreByMember = {actions.putStoreByMember}
                altMember = {actions.altMember}
                altAll = {actions.altAll}
                />}
                {selectRoomType == 'GROUP'&&<GroupSendBox
                groupList = {groupList}
                selectGroup = {actions.selectSendGroup}
                selectAllGroup = {actions.selectAllGroup}
                cancelAllGroup = {actions.cancelAllGroup}
                initGroupList = {actions.initGroupList}
                initMemberList = {actions.initMemberList}
                initMsgList = {actions.initMsgList}
                selectRoom = {selectRoom}
                pullMesgById = {actions.pullMesgById}
                />}
              {/* {
                selectRoomType == 'GROUP'
                ||selectRoomType == 'MEMBER'?
                <div className="toolBtn pickMsgBtn icon-gm"
                  onClick = {this.showPickMsgBox.bind(this)}>
                  <div className="icon-text">合并转发</div>
                </div>  : ''
              } */}
              {
                selectRoomType == 'GROUP'
                ?
                <div className="animation gm-icon">
                <div className="toolBtn keywordFlow icon-gm"
                  onClick = {()=>{
                    keywordsCrumbClick()
                  }}>
                  <div className="icon-text">关键词信息</div>
                </div>
                </div>
                  : ''
              }
              {/* {
                selectRoomType == 'GROUP'
                ||selectRoomType == 'KEYWORDS'
                ||selectRoomType == 'MEMBER'?
                <RobotListBox
                groupList = {groupList}/> : ''
              } */}
            </div>
            {
              msgPicker_on &&selectRoomType=='GROUP'?
                <MsgPickerForm
                  userInfo = {userInfo}
                  groupId = {groupList.chatGroupId}
                  actions = {actions}
                  msgPicker = {msgPicker}/>
                :selectRoomType=='MEMBER'||selectRoomType=='KEYWORDS'?
                <div className='backBox'>
                    <div className="backButton" onClick={()=>{selectRoom('GROUP')}}>返回群聊</div>
                </div>
                :<div>
                  <pre contentEditable="true" ref = 'context' id='msg_context'className="gm-editBox"
                  style = {{height:(80+cssHeight)+'px'}}
                  ></pre>
                  <div className="msgSendBox">
                      <div className="sendBtn"  onClick = {this.clickEvent}>发送</div>
                  </div>
                </div>
            }
        </div>
      </div>
    )
  }
}
