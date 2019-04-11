import React, { Component } from 'react'
import PropTypes from 'prop-types'
import $ from 'jquery'
import _ from 'lodash'
import promiseXHR from '../../funStore/ServerFun'
import AuthProvider from '../../funStore/AuthProvider'
import {API_PATH} from '../../constants/OriginName'
import GroupList from './GroupList'
import HandleInner from './HandleInner'
import SearchBox from './SearchBox'
import CrumbsBox from './CrumbsBox'
import MsgFlowBox from './MsgFlowBox'
import SingleMsgFlow from './SingleMsgFlow'
import KeywordsFlow from './KeywordsFlow'
import BgFlowBox from './BgFlowBox'
import SendMsBox from './SendMsBox'
// import UnreadTipBox from './UnreadTipBox'
import NewMsgTipBox from './NewMsgTipBox'
import ListBubble from './ListBubble'
export default class GmMainScope extends Component {
  static propTypes = {
      actions: PropTypes.object.isRequired
  }
  constructor(props){
    super(props)
    this.checkReturn = this.checkReturn.bind(this)
    this.getGroupList = this.getGroupList.bind(this)
    this.removeTagBox = this.removeTagBox.bind(this)
    this.changePosition = this.changePosition.bind(this)
    this.bodyDefaultEvent = this.bodyDefaultEvent.bind(this)
    this.bodyMoveEvent = this.bodyMoveEvent.bind(this)
    this.bodyMouseUpEvent = this.bodyMouseUpEvent.bind(this)
    this.changeKeyForMember = this.changeKeyForMember.bind(this)
    this.changeKeyForGroup = this.changeKeyForGroup.bind(this)
    this.changeHotTip = this.changeHotTip.bind(this)
    this.setObject = this.setObject.bind(this)
  }

  state = {
    idForlabel : '',
    chatRoom : '',
    tagBoxType: '',
    targetPosition: {
      x:0,
      y:0
    },
    unreadMsgCount:0,
    scrollAble : false,
    keyForMember: '',
    keyForGroup: '',
    hotTip:"热门内容",
    hotTipIcon:true,
    dragObject:null,
    startPoint:0,
    oldDistance:0,
    distance:0,
    accountStatus: 0,//账户状态 1 正常 2 租户有群但是账户没群 3 租户没有群
  }

  setObject(object,startPoint,oldDistance){
    this.setState({
      dragObject:object,
      startPoint:startPoint,
      oldDistance:oldDistance,
      distance:0
    })
  }

  changeKeyForMember (value) {
    this.setState({
        keyForMember: value
    })
  }

  changeKeyForGroup (value) {
    this.setState({
      keyForGroup: value
    })
  }
  checkReturn(){
    if(AuthProvider.getCookie('refresh_token')==undefined){
      this.props.actions.goTo('/v2/login')
      return false
    }else {
      return true
    }
  }
  componentDidMount(){
      if(this.checkReturn()){
        this.getGroupList()
        const self = this
        $('body').get(0).addEventListener('click',this.bodyDefaultEvent)
        $('body').get(0).addEventListener('mousemove',this.bodyMoveEvent)
        $('body').get(0).addEventListener('mouseup',this.bodyMouseUpEvent)

        $('.groupList').get(0).addEventListener('scroll',this.removeTagBox)
        // $('.memberList').get(0).addEventListener('scroll',this.removeTagBox)
      }
  }
  onRef = (ref) => {
    // 获取群列表组件
    this.child = ref
  }
  bodyMouseUpEvent(e){
    const {dragObject,startPoint,distance,oldDistance} = this.state
    this.setObject(null,e.pageY,distance+oldDistance)
  }
  bodyMoveEvent(e){
    const {dragObject,startPoint,distance,oldDistance} = this.state
    if(dragObject=='SENDBOX'){
      let cssHeight = dragObject!=null ? distance+oldDistance : oldDistance
      if(Math.abs(cssHeight)>90&&Math.abs(distance)>0){
        this.setObject(null,e.pageY,distance>0?90:(-90))
      }else {
        this.setState({
          distance:startPoint-e.pageY
        })
      }
    }
  }

  bodyDefaultEvent(e){
    $('.faceBox').css({marginTop:"50px",opacity:0},300);
    $('.mt-faceBox').css({marginTop:"-50px",opacity:0},300);
    setTimeout(function(){
      $('.faceBox').hide()
    },280)
    $('.userBubble').text()!=''?$('.userBubble').show():$('.userBubble').hide()
    if(e.target.className != 'gm-bubble-container'&&
      (e.target.offsetParent!=undefined ? e.target.offsetParent.className !='gm-bubble-container':true)&&
       e.target.className != 'check-field-state'&&
     e.target.className != 'button'&&
     e.target.className != 'innerTip'){
      this.removeTagBox()
    }
    if(e.target.className == 'control icon-cw'){
      const x = e.pageX > document.documentElement.clientWidth*0.8  ?
      document.documentElement.clientWidth - 240 : e.pageX
      const y = e.pageY < document.documentElement.clientHeight*0.8?e.pageY:e.pageY-150
      // console.log(e.pageX,e.pageY,x,y)
      this.changePosition(x,y)
    }
    $('.gm-box-groupSend').css({marginBottom:"-50px",opacity:0},300);

      $('.gm-box-altMember').css({marginBottom:"-50px",opacity:0},300);
      setTimeout(function(){
        $('.gm-box-groupSend').hide()
        $('.gm-box-altMember').hide()
      },280)

    // 隐藏快速回复弹窗
    if(e.target.offsetParent==null||e.target.offsetParent.className!='msgBox'&&e.target.offsetParent.className!='answerBox'){
      $('.quickAnswer').attr('class','quickAnswer')
    }

    // 隐藏用户信息编辑
    if($(e.target).parents('.gm-userOperateNew').length == 0&&e.target.className != 'gm-userOperateNew show'&&e.target.className != 'closeBtn'){
      $('.gm-userOperateNew').removeClass('show')
    }
  }

  componentWillUnmount() {
    this.props.actions.initMsgList()
    $('body').get(0).removeEventListener('click',this.bodyDefaultEvent)
    $('.groupList').get(0).removeEventListener('scroll',this.removeTagBox)
    this.props.actions.initMicroTask()
  }

  setIdForLabel(id){
    this.setState({
      idForlabel: id
    })
  }

  getGroupList(){
    const action = this.props.actions
    const url = API_PATH+'/groupmsg-api/authsec/groups/unreadmessages/countinfo?_page=0&_size=50'
    AuthProvider.getAccessToken()
    .then((resolve,reject)=>{
      promiseXHR(url,{type:'Bearer',value:resolve},null,'GET')
      .then((res) =>{
          const resData = JSON.parse(res)
          if(resData.resultCode=='100'){
            const data = resData.resultContent
            const reducerList = data.map((item)=>
              Object.assign({},{altSelected:false},item)
            )
            action.pullGroupList(reducerList)
            //  群排序
            const data1 = _.groupBy(reducerList,(item)=>(item.lastMsgTime!=null ? 'higher':'lower'))
            let list_unreadNum = data1.higher!=undefined ? data1.higher.sort((a,b)=>new Date(b.lastMsgTime)-new Date(a.lastMsgTime)).concat(data1.lower):reducerList
            list_unreadNum[0]&&this.child.itemClick(list_unreadNum[0].id,list_unreadNum[0].unreadMsgCount*1 != 0 ? 1 : 0)
            this.setState({
              accountStatus: 1
            })
          }else if(resData.resultCode=='02503201'){
            this.setState({
              accountStatus: 3
            })
            action.pullGroupList([])
          }else if(resData.resultCode=='02503202'){
            this.setState({
              accountStatus: 2
            })
            action.pullGroupList([])
          }
      })
    }).catch(err =>{
      console.log(err)
    })
  }

  showTagBox(type){
    this.setState({
      tagBoxType:type
    })
  }

  removeTagBox(){
    this.setState({
      tagBoxType: ''
    })
  }

  changePosition(x,y){
    this.setState({
      targetPosition: {
        x:x,
        y:y
      }
    })
  }

  setChatRoom(room){
    this.setState({
      chatRoom : room,
      scrollAble : false
    })
  }

  scrollControlHandle () {
    this.setState({
      scrollAble : true
    })
  }

  changeHotTip(){
        this.setState({
            hotTip:"搜索结果",
            hotTipIcon:false
        })
    }

  render() {
    const {keyForMember,keyForGroup,hotTip,hotTipIcon,dragObject,startPoint,distance
      ,oldDistance,accountStatus} = this.state
    const {socketState,userInfo,groupList,memberList,searchKey,messageData,singleMesgData,keywordsData,actions,microTaskList,cwList,msgPicker} = this.props
    const containerWidth  = this.props.width
    const isExtend = this.props.isExtend
    const tagBoxType = this.state.tagBoxType
    const targetPosition = this.state.targetPosition
    const targetGroup = groupList.targetGroup
    const tipStatus = this.state.chatRoom == 'GROUP' ? messageData.isNew : (this.state.chatRoom == 'MEMBER' ? singleMesgData.isNew : false)
    const messageLength = messageData.msgFlow.length
    const singleMsgLength = singleMesgData.msgFlow.length
    return (
      <div className = 'gm-container' style = {{width:isExtend?'calc(100%)':'calc(100%)'}}>
        <div className = 'gm-goupWrapper' >
          <SearchBox focusColor = '#F8F8F9'  blurColor = '#F8F8F9' searchKey = {actions.searchKeyInGroup} inputValue={keyForGroup} changeKeyForMember={this.changeKeyForGroup}/>
          <GroupList list = {groupList}
          selectChatId = {actions.selectChatId}
          pullMemberList = {actions.pullMemberList}
          initMemberList = {actions.initMemberList}
          pullMicroTask = {actions.pullMicroTask}
          tagEdit = {this.showTagBox.bind(this)}
          searchKey = {searchKey}
          selectRoom = {this.setChatRoom.bind(this)}
          pullMesgById = {actions.pullMesgById}
          setIdForLabel = {this.setIdForLabel.bind(this)}
          initMsgList = {actions.initMsgList}
          initKeywordsMsgList = {actions.initKeywordsMsgList}
          changeKeyForMember = {this.changeKeyForMember}
          searchKeyInMember = {actions.searchKeyInMember}
          onRef={this.onRef}
          />
        </div>
        <div className = 'gm-msgWrapper'>
          <CrumbsBox
          width = {containerWidth > 1042? '100%' : '100%'}
          groupList = {groupList}
          memberList = {memberList}
          keywordsData = {keywordsData}
          selectRoomType = {this.state.chatRoom}
          selectRoom = {this.setChatRoom.bind(this)}
          pullMesgById = {actions.pullMesgById}
          logout = {() => {actions.goTo('/v2/login')}}
          turnOffws = {actions.turnOffws}
          userInfo = {userInfo}
          />
          <div className = 'msgFlowWrapper'>
             <div className = 'innerContainer'>
               <div className = 'msgFlowInner'>
                    {/*<UnreadTipBox
                    number = {targetGroup.unreadMsgCount}
                    id = {targetGroup.id}
                    />*/}
                    <BgFlowBox
                      dragObject = {dragObject}
                      startPoint = {startPoint}
                      oldDistance = {oldDistance}
                      distance = {distance}
                      actions={actions}
                      selectRoomType = {this.state.chatRoom}
                      accountStatus={accountStatus} />
                    <NewMsgTipBox
                    messageLength = {messageLength}
                    singleMsgLength = {singleMsgLength}
                    selectRoomType = {this.state.chatRoom}
                    changeNewTip = {actions.changeNewTip}
                    changeSlice = {actions.changeSlice}
                    changeNewTipSin = {actions.changeNewTipSin}
                    changeSliceSin = {actions.changeSliceSin}
                    status = {tipStatus} />
                  <MsgFlowBox
                  dragObject = {dragObject}
                  startPoint = {startPoint}
                  oldDistance = {oldDistance}
                  distance = {distance}
                  messageData = {messageData}
                  groupList = {groupList}
                  selectRoomType = {this.state.chatRoom}
                  scrollAble = {this.state.scrollAble}
                  scrollControlHandle = {this.scrollControlHandle.bind(this)}
                  insertMesg = {actions.insertMesg}
                  appendMesg = {actions.appendMesg}
                  reduceUnreadMsg = {actions.reduceUnreadMsg}
                  changeSlice = {actions.changeSlice}
                  pullCwList = {actions.pullCwList}
                  selectRoom = {this.setChatRoom.bind(this)}
                  selectMemberId = {actions.selectMemberId}
                  pullSingleMesgById = {actions.pullSingleMesgById}
                  groupId = {groupList.chatGroupId}
                  changeHotTip={this.changeHotTip}
                  msgPicker = {msgPicker}
                  actions = {actions}
                  socket = {socketState.webSocket}
                  />
                  <SingleMsgFlow
                  dragObject = {dragObject}
                  startPoint = {startPoint}
                  oldDistance = {oldDistance}
                  distance = {distance}
                  singleMesgData = {singleMesgData}
                  groupList = {groupList}
                  selectRoomType = {this.state.chatRoom}
                  scrollAble = {this.state.scrollAble}
                  scrollControlHandle = {this.scrollControlHandle.bind(this)}
                  groupId = {groupList.chatGroupId}
                  insertSingleMesg = {actions.insertSingleMesg}
                  changeSliceSin = {actions.changeSliceSin}
                  />
                  <KeywordsFlow
                  dragObject = {dragObject}
                  startPoint = {startPoint}
                  oldDistance = {oldDistance}
                  distance = {distance}
                  keywordsData = {keywordsData}
                  groupList = {groupList}
                  pullMesgById = {actions.pullMesgById}
                  selectChatId = {actions.selectChatId}
                  selectRoomType = {this.state.chatRoom}
                  selectRoom = {this.setChatRoom.bind(this)}
                  scrollAble = {this.state.scrollAble}
                  scrollControlHandle = {this.scrollControlHandle.bind(this)}
                  groupId = {groupList.chatGroupId}
                  initMsgList = {actions.initMsgList}
                  insertKeywordsMsg = {actions.insertKeywordsMsg}
                  changeSliceKey = {actions.changeSliceKey}
                  />
                  <SendMsBox
                  userInfo = {userInfo}
                  groupList = {groupList}
                  memberList = {memberList}
                  selectRoomType = {this.state.chatRoom}
                  dragObject = {dragObject}
                  startPoint = {startPoint}
                  oldDistance = {oldDistance}
                  distance = {distance}
                  actions = {Object.assign({},actions,{setObject:this.setObject})}
                  socket = {socketState.webSocket}
                  selectRoom = {this.setChatRoom.bind(this)}
                  msgPicker = {msgPicker}
                  />
               </div>
             </div>
          </div>
        </div>
        <HandleInner
          groupId = {groupList.chatGroupId}
          memberList = {memberList}
          actions = {actions}
          tagEdit = {this.showTagBox.bind(this)}
          searchKey = {searchKey}
          selectRoomType = {this.state.chatRoom}
          selectRoom = {this.setChatRoom.bind(this)}
          setIdForLabel = {this.setIdForLabel.bind(this)}
          microTaskList = {microTaskList}
          cwList = {cwList}
          keyForMember = {keyForMember}
          changeKeyForMember = {this.changeKeyForMember}
          hotTip={hotTip}
          hotTipIcon={hotTipIcon}
          changeHotTip={this.changeHotTip}
          groupList={groupList}
          userInfo={userInfo}
          removeTagBox={this.removeTagBox}
          socket={socketState.webSocket}
        />
        {tagBoxType !='' ? <ListBubble type = {tagBoxType}
        socket = {socketState.webSocket}
        id = {this.state.idForlabel}
        targetPositionX = {targetPosition.x}
        targetPositionY = {targetPosition.y}
        groupList = {groupList}
        memberList = {memberList}
        groupId = {groupList.chatGroupId}
        tagEdit = {this.showTagBox.bind(this)}
        removeTagBox = {this.removeTagBox}
        actions = {actions}/> : ''}
        <audio id = 'voiceMsgPlayer' preload = 'metaData' src = '' ></audio>
      </div>
    )
  }
}
