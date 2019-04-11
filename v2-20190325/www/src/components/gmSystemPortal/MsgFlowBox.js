import React, { Component } from 'react'
import MsgBubble from './MsgBubble'
import $ from 'jquery'
import promiseXHR from '../../funStore/ServerFun'
import AuthProvider from '../../funStore/AuthProvider'
import {QQFACE_TEXT} from '../../constants/MapData'
import ImgModal from './ImgModal'
import MovieView from '../shareComponent/MovieView'
import GroupMsgBubble from './GroupMsgBubble'
import QuickAnswer from './QuickAnswer'
import UserOperateNew from './UserOperateNew'
import TipBox from '../tmSystemPortal/TipBox'
import {LoadCartoonGray} from './LoadCartoon'
import {API_PATH} from '../../constants/OriginName'
import {sendEvent} from '../../funStore/CommonFun'

export default class MsgFlowBox extends Component{
  constructor(props) {
    super(props)
    this.scrollHandle = this.scrollHandle.bind(this)
    this.msgLoading = this.msgLoading.bind(this)
    this.msgFresh = this.msgFresh.bind(this)
    this.quickSearchHandle = this.quickSearchHandle.bind(this)
    this.hideQuickSearch = this.hideQuickSearch.bind(this)
    this.quickAnswerHandle = this.quickAnswerHandle.bind(this)
    this.getUserInfoHandle = this.getUserInfoHandle.bind(this)
    this.switchBlock = this.switchBlock.bind(this)
    this.showTipBoxHandle = this.showTipBoxHandle.bind(this)
    this.hideTipBoxHandle = this.hideTipBoxHandle.bind(this)
    this.deleteUserHandle = this.deleteUserHandle.bind(this)
    this.changePrivilegeHandle = this.changePrivilegeHandle.bind(this)
    this.setRequest = this.setRequest.bind(this)
    this.getMesgByMemebr = this.getMesgByMemebr.bind(this)
    this.yleidModal = this.yleidModal.bind(this)
    this.yeidVideoModal = this.yeidVideoModal.bind(this)
  }

  state = {
    modalShow : false,
    modalSrc : '',
    modalShow_video:false,
    modalSrc_video: '',
    loading : false,
    searchCss:{
      display:'none',
      x:0,
      y:0
    },
    searchTxt:'',
    searchMemId: '',
    answerType: '',
    answerCss:{
      x:0,
      y:0
    },
    questionTxt: '',
    answerList: [],
    memberId:'',
    iconPath:'',
    basicInfoCss: {
      x:0,
      y:0
    },
    userBasicInfo:null,
    buttonBlock: false,
    tipStatus:'default',
    showTipBox: false,
    firstBarrier:false,
    sameRequestPending:{name:null,date:null}
  }

  setRequest(name,date){
    this.setState({
      sameRequestPending:{
        name:name,
        date:date
      }
    })
  }

  componentDidMount(){
    const self = this
    $('.msgBox').find('img').each(function(i){
          let  text = QQFACE_TEXT.qqEmoji_array[parseInt($(this).attr('name'))]
          $(this).attr('text',text)
      })

    $("#groupRoom").delegate(".friendMsgBubble",'mousedown',function(e){
      if(e.button!=0||e.target.className=="date"||e.target.className=="msgInfoBox") return
      window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty()
        self.setState({
          searchCss:{
            ...self.state.searchCss,
            x: e.clientX + 50,
            y: e.clientY
          }
        })
    })

    $("#groupRoom").delegate(".friendMsgBubble",'mouseup',function(e){
      if(e.button!=0||e.target.className=="date"||e.target.className=="msgInfoBox") return
      let txt = window.getSelection?window.getSelection().toString():document.selection.createRange().text
      // window.clipboardData.setData("Text",txt)
      let memId = this.parentNode.id
      if(txt==""){
        return
      }
      self.setState({
        searchCss:{
          ...self.state.searchCss,
          display:'block',
          x: e.clientX+50<self.state.searchCss.x?e.clientX+50:self.state.searchCss.x
          // y: e.clientY
        },
        searchTxt: txt,
        searchMemId: memId
      })
      $('.quickSearch').focus()
    })

    window.addEventListener("useroperate", this.useroperateHandle)
  }

  componentWillUnmount(){
    window.removeEventListener("useroperate",this.useroperateHandle)
  }
  useroperateHandle = (res) => {
    this.getUserInfoHandle(res,res.vals.memberId,res.vals.iconPath)
  }

  componentWillReceiveProps(nextProps){
    const _before = this.props.messageData
    const _after = nextProps.messageData
    if(_before.msgFlow.length==0&&_after.msgFlow.length!=0){
      this.setState({
        firstBarrier:true
      })
    }else {
      setTimeout(()=>{
        this.setState({
          firstBarrier:false
        })
      },800)
    }
  }
  switchBlock(){
    this.setState({
        buttonBlock:true
    })
    setTimeout(()=>{
        this.setState({
            buttonBlock:false
        })
    },500)
  }

  queryNewCwList = (pageInfo,content) => {
    if(pageInfo.totalPage!==undefined&&pageInfo.currentPage+1>=pageInfo.totalPage){
        return {
            pageInfo: pageInfo,
            resultContent:[]
        }
    }
    if(pageInfo.totalPage!==undefined&&pageInfo.currentPage+1<pageInfo.totalPage){
        // 滚动加载
        pageInfo.currentPage +=1
    }
    const url = API_PATH+"/knowledge-base/authsec/knowledgelistmsg?_currentPage="+pageInfo.currentPage+"&_pageSize="+pageInfo.pageSize
    let params = {
        content: content
    }
    return AuthProvider.getAccessToken()
        .then((resolve, reject) => {
            return promiseXHR(url, {
                    type: 'Bearer',
                    value: resolve
                }, params, 'POST')
        }).then((res) => {
            return JSON.parse(res)
        })
}

queryOldCwList = (page_info,content) => {
    if((page_info.total_page!==undefined&&page_info.current_page+1>=page_info.total_page)||content.trim()==''){
        return {
            page_info: page_info,
            resultContent:[]
        }
    }
    if(content.trim()==''){
        return {
            page_info: page_info,
            resultContent:[]
        }
    }
    if(page_info.total_page!==undefined&&page_info.current_page+1<page_info.total_page){
        // 滚动加载
        page_info.current_page +=1
    }
    const {groupList,userInfo} = this.props
    // const url = API_PATH + "/content-api/noauth/content/knowledge/query/"
    // let user_id = groupList.targetGroup.robotGroupMemList==undefined||groupList.targetGroup.robotGroupMemList[0]==undefined
    //                 ?userInfo.info.userinfo.userId
    //                 :groupList.targetGroup.robotGroupMemList[0].imMemId
    // const timestamp = parseInt(new Date().getTime()/1000)
    // let paramas = {
    //     "birthday": "",
    //     "current_page": page_info.current_page,
    //     "knowledge_type": ["Q&A 问答", "知识卡"],
    //     "lib_name": ["栗子知识库", "惠氏知识库", "段涛知识库","好奇知识库"],
    //     "page_size": page_info.page_size,
    //     "question": content,
    //     "timestamp": timestamp,
    //     "user_id": user_id
    // }
    // return AuthProvider.getAccessToken()
    //     .then((resolve, reject) => {
    //         return promiseXHR(url, {
    //                 type: 'Bearer',
    //                 value: resolve
    //             }, paramas, 'POST')
    //     }).then((res) => {
    //         return JSON.parse(res)
    //     })
}
  quickSearchHandle(e){
    e.preventDefault()
    e.stopPropagation()

    let question = this.state.searchTxt
        this.setState({
          searchCss:{
            display:'none',
            x: 0,
            y: 0
          }
        })
        this.props.changeHotTip()
        Promise.all([this.queryNewCwList({currentPage:0,pageSize:10},question)]).then(([newCwList])=>{
          // oldCwList.resultContent = oldCwList.resultContent.map(v => ({
          //     ...v,
          //     publicFlag: true
          // }))
          let data = {}
          data.pageInfo = newCwList.pageInfo
          // data.page_info = oldCwList.page_info
          data.resultContent = newCwList.resultContent
          this.props.pullCwList(question,data)
          $('.gm-kmBaseWrapper').scrollTop(0)
          $('#menuWrapper1').trigger('click')
      })
        // AuthProvider.getAccessToken()
        //     .then((resolve, reject) => {
        //         promiseXHR(url, {
        //                 type: 'Bearer',
        //                 value: resolve
        //             }, paramas, 'POST')
        //             .then((res) => {
        //                 const data = JSON.parse(res)
        //                 this.props.pullCwList(question,data)
        //                 $('.gm-kmBaseWrapper').scrollTop(0)
        //                 $('#menuWrapper1').trigger('click')
        //             })
        //     })
  }
  hideQuickSearch(){
    // window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty()
    this.setState({
      searchCss:{
        ...this.state.searchCss,
        display:'none'
      }
    })
  }
  quickAnswerHandle(e){
    e.preventDefault()
    e.stopPropagation()
    let txt = window.getSelection?window.getSelection().toString():document.selection.createRange().text
    if(txt!=''){
      return
    }
    $('.quickAnswer').attr('class','quickAnswer')
    let searchText = $(e.target).parents('.msgBox').text()
    if(searchText[0]=='@'){
      searchText = searchText.replace(/^@\S*\s*/g,'')
    }
    let question = searchText
    if(question!=this.state.questionTxt){
      // let url = API_PATH+"/articlemgmt/authsec/knowledgelistmsg?_currentPage=0&_pageSize=20"
      // let paramas = {
      //     "content": question
      // }
      this.props.changeHotTip()
      Promise.all([this.queryNewCwList({currentPage:0,pageSize:10},question)]).then(([newCwList])=>{
        // oldCwList.resultContent = oldCwList.resultContent.map(v => ({
        //     ...v,
        //     publicFlag: true
        // }))
        let data = {}
        data.pageInfo = newCwList.pageInfo
        // data.page_info = oldCwList.page_info
        data.resultContent = newCwList.resultContent
        this.props.pullCwList(question,data)
        $('.gm-kmBaseWrapper').scrollTop(0)
        this.setState({
          questionTxt: searchText,
          answerList: data.resultContent
        })
        $('.quickAnswer').addClass('show')
    })
      // AuthProvider.getAccessToken()
      //   .then((resolve, reject) => {
      //       promiseXHR(url, {type: 'Bearer',value: resolve}, paramas, 'POST')
      //           .then((res) => {
      //               const data = JSON.parse(res)
      //               this.props.pullCwList(question,data)
      //               $('.gm-kmBaseWrapper').scrollTop(0)
      //               this.setState({
      //                 questionTxt: searchText,
      //                 answerList: data.resultContent
      //               })
      //               $('.quickAnswer').addClass('show')
      //           })
      //   })
    }else{
       $('.quickAnswer').addClass('show')
    }
    if(e.clientY<$('#groupRoom').offset().top+1/2*$('#groupRoom').height()){
      $('.quickAnswer').addClass('up')
      this.setState({
        answerCss: {
          x: e.clientX-1/2*$('.quickAnswer').width()+'px',
          y: e.clientY+20+'px'
        },
        answerType:'UP'
      })
    }else{
      $('.quickAnswer').addClass('down')
      this.setState({
        answerCss: {
          x: e.clientX-1/2*$('.quickAnswer').width()+'px',
          y: document.body.clientHeight-e.clientY+30+'px'
        },
        answerType:'DOWN'
      })
    }
  }
  mouseDownHandle(){
    this.setState({
      startTime:new Date().getTime()
    })
  }
  mouseUpHandle(){
    this.setState({
      endTime:new Date().getTime()
    })
  }
  yleidModal(src){
    if(src.substr(-11,11)=='imgFail.png') return
    this.setState({
      modalShow : true,
      modalSrc : src
    })
  }

  yeidVideoModal(src){
    this.setState({
      modalShow_video : true,
      modalSrc_video : src
    })
  }
  closeModal(){
    this.setState({
      modalShow : false,
      modalShow_video : false,
      modalSrc_video : '',
      modalSrc : ''
    })
  }
  msgLoading () {
    const messageData = this.props.messageData
    let sliceBegin = messageData.sliceBegin
    if(sliceBegin>0){
      // slicePage-60
      this.props.changeSlice(sliceBegin-60)
      // console.log('加载完成')
      this.refs.loading.style.display = 'none';
      this.refs.loadingText.style.display = 'none';
      this.refs.msgFlowBox.scrollTop = this.refs.msgFlowBox.scrollTop+50;
      this.setState({
        loading: false
      })
      return
    }
    if(messageData.roomType == 'GROUP'){
      const url =
      API_PATH+'/groupmsg-api/authsec/group/'+messageData.roomId+'/stream/messages?_msgId='+messageData.msgFlow[0].msgInfo.msgId+'&_direction=0&_pageSize=20'
      AuthProvider.getAccessToken()
      .then((resolve,reject)=>{
          promiseXHR(url,{type:'Bearer',value:resolve},null,'GET')
          .then(res => {
            const data = eval('('+res+')')
            this.props.insertMesg(data.resultContent,{})
            this.props.reduceUnreadMsg(messageData.roomId,data.resultContent.keywordInfo.totalCount)
            // console.log('加载完成')
            if(data.resultContent.messages.length==0){
              this.refs.loadingText.style.display = 'block';
              setTimeout(()=>{
                this.refs.loading.style.display = 'none';
                this.refs.loadingText.style.display = 'none';
              },100)
            }else {
              setTimeout(()=>{
                this.refs.loading.style.display = 'none';
                this.refs.loadingText.style.display = 'none';
              },100)
            }
            var itemTop = $("#"+messageData.msgFlow[0].msgInfo.msgId)[0].offsetTop;
            this.refs.msgFlowBox.scrollTop = itemTop
            this.setState({
              loading: false
            })
          })
      })
    }else {
      const self = this
      setTimeout(()=>{
        self.refs.loading.style.display = 'none';
        self.refs.loadingText.style.display = 'none';
        self.refs.msgFlowBox.scrollTop = self.refs.msgFlowBox.scrollTop+50;
        self.setState({
          loading: false
        })
      },800)
    }
  }

  msgFresh () {
    const messageData = this.props.messageData
    let sliceBegin = messageData.sliceBegin
    if(messageData.sliceBegin+120<messageData.msgFlow.length){
      // slicePage+60
      this.props.changeSlice(sliceBegin+60)
      // console.log('刷新完成')
      this.refs.fresh.style.display = 'none';
      this.refs.freshText.style.display = 'none';
      this.refs.msgFlowBox.scrollTop = this.refs.msgFlowBox.scrollTop-1;
      this.setState({
        loading: false
      })
      return
    }else {
      const lastMesg = messageData.msgFlow[messageData.msgFlow.length-1]
      const {name,date} = this.state.sameRequestPending
      if(lastMesg.origin!='socket'&&name=='messageDown'&&((new Date() - date)>500)||(lastMesg.origin!='socket'&&name!='messageDown')){
        this.setRequest('messageDown',new Date())
      const url =
      API_PATH+'/groupmsg-api/authsec/group/'+messageData.roomId+'/stream/messages?_msgId='+messageData.msgFlow[messageData.msgFlow.length-1].msgInfo.msgId+'&_direction=1&_pageSize=20'
      AuthProvider.getAccessToken()
      .then((resolve,reject)=>{
          promiseXHR(url,{type:'Bearer',value:resolve},null,'GET')
          .then(res => {
            const data = eval('('+res+')')
            this.props.appendMesg(data.resultContent,{})
            this.props.reduceUnreadMsg(messageData.roomId,data.resultContent.keywordInfo.totalCount)
            // console.log('加载完成')

            if(data.resultContent.messages.length==0){
              this.refs.loading.style.display = 'block';
              this.refs.freshText.style.display = 'block';
              this.refs.loadingText.style.display = 'block';
              setTimeout(()=>{
                this.refs.loading.style.display = 'none';
                this.refs.loadingText.style.display = 'none';
                this.refs.fresh.style.display = 'none';
                this.setState({
                  loading: false
                })
                this.refs.msgFlowBox.scrollTop = this.refs.msgFlowBox.scrollTop-1;
              },100)
          }else {
              setTimeout(()=>{
                this.refs.loading.style.display = 'none';
                this.refs.loadingText.style.display = 'none';
                this.refs.fresh.style.display = 'none';
                this.setState({
                  loading: false
                })
                this.refs.msgFlowBox.scrollTop = this.refs.msgFlowBox.scrollTop-1;
              },100)
          }
        })
      })
    }else {
      this.refs.loading.style.display = 'none';
      this.refs.loadingText.style.display = 'none';
      this.refs.fresh.style.display = 'none';
      this.setState({
        loading: false
      })
      this.refs.msgFlowBox.scrollTop = this.refs.msgFlowBox.scrollTop-1;
    }
    }
  }
  scrollHandle (){
    const messageData = this.props.messageData
    let {msgFlowBox,loading,fresh,loadingText,freshText} = this.refs;
    let scrollTop = msgFlowBox.scrollTop;
    let scrollHeight = msgFlowBox.scrollHeight;
    let clientHeight = msgFlowBox.offsetHeight;
    this.props.scrollControlHandle()
    // console.log(!this.state.firstBarrier);
    if(!this.state.firstBarrier&&this.props.scrollAble&&!this.state.loading){
      if(scrollTop==0){
        // 下拉加载...
        this.setState({
          loading: true
        })
        loading.style.display = 'block';
        // if(messageData.sliceBegin==0){
        //   loadingText.style.display = 'block'
        // }
        // console.log('下拉加载...')
        setTimeout(() => {
          this.msgLoading()
        },500)

      }else if(scrollTop==scrollHeight-clientHeight){
        // 上拉刷新...
        this.setState({
          loading: true
        })
        // console.log('上拉刷新...')
        fresh.style.display = 'block'
        // if(messageData.sliceBegin+120>=messageData.msgFlow.length){
        //   freshText.style.display = 'block'
        // }
        setTimeout(() => {
          this.msgFresh()
        },500)
      }
    }
    $('.gm-userOperateNew').removeClass('show')
  }

  getMesgByMemebr(memberId){
    const url = API_PATH+'/groupmsg-api/authsec/group/'+this.props.groupId+'/immem/'+memberId+'/readmessages?_page=0&_size=20'
    AuthProvider.getAccessToken()
    .then((resolve,reject)=>{
        promiseXHR(url,{type:'Bearer',value:resolve},null,'GET')
        .then(res => {
          const data = eval('('+res+')')
          this.props.pullSingleMesgById(memberId,data.resultContent,data.pageInfo)
          $('#memberRoom').scrollTop($('#memberRoom')[0].scrollHeight-1)
        })
    })
  }

  getUserInfoHandle(e,memberId,iconPath){
    e.preventDefault()
    e.stopPropagation()
    if(memberId!=this.state.memberId){
      if(!this.state.buttonBlock){
        this.setState({
          userBasicInfo: null
        })
        this.switchBlock()
        $('.gm-userOperateNew').addClass('show')
        $('.operate-loading').show()
        const url = API_PATH + '/groupadmin-api/authsec/memberprivilege/group/'+this.props.groupId+'/member/'+memberId
        AuthProvider.getAccessToken()
        .then((resolve,reject)=>{
            promiseXHR(url,{type:'Bearer',value:resolve},null,'GET')
            .then(res => {
              const resData = JSON.parse(res)
              if(resData.resultCode == 100){
                this.setState({
                  userBasicInfo: resData.resultContent
                })
              }
            }).catch(error =>{
              this.setState({
                userBasicInfo: null
              })
            })
        })
      }
    }else if(this.state.userBasicInfo!=null){
      setTimeout(function() {
        $('.gm-userOperateNew').addClass('show')
      }, 100)
    }
    // if(e.clientY<$('#groupRoom').offset().top+1/2*$('#groupRoom').height()){
    //   this.setState({
    //     basicInfoCss: {
    //       x: e.clientX+'px',
    //       y: e.clientY+20+'px'
    //     }
    //   })
    // }else{
    //   this.setState({
    //     basicInfoCss: {
    //       x: e.clientX+'px',
    //       y: e.clientY-250+'px'
    //     }
    //   })
    // }
    this.setState({
      memberId: memberId,
      iconPath: iconPath
    })
  }

  showTipBoxHandle(){
    this.setState({
      tipStatus: 'DELETE_SINGLE',
      showTipBox: true
    })
  }

  hideTipBoxHandle(){
    this.setState({
      showTipBox: false
    })
  }

  deleteUserHandle(){
    this.hideTipBoxHandle()
    const paramas = {}
    paramas[this.state.memberId] = this.props.groupId
    AuthProvider.getAccessToken()
    .then((resolve,reject)=>{
        const url = API_PATH+'/groupadmin-api/authsec/memberprivilege/removemembers'
        promiseXHR(url,{type:'Bearer',value:resolve},paramas,'POST')
        .then(res => {
            const resData = JSON.parse(res)
            if(resData.resultCode == 100){
              //  删除成功
              sendEvent('message', {txt: "删除群成员成功",code: 1000})
            }else{
              sendEvent('message', {txt: "您没有群主的权限，请先去完成群主托管",code: 1003})
            }
        })
    })
  }

  changePrivilegeHandle(type,status){
    if(type=="addMemberPrivilege"){
        this.setState({
            userBasicInfo:{
                ...this.state.userBasicInfo,
                member: {
                  ...this.state.userBasicInfo.member,
                  addMemberPrivilege: status
                }
            }
        })
    }else if(type=="dropMemberPrivilege"){
        this.setState({
            userBasicInfo:{
              ...this.state.userBasicInfo,
              member: {
                ...this.state.userBasicInfo.member,
                dropMemberPrivilege: status
              }
            }
        })
    }else if(type=="isBlackList"){
      this.setState({
        userBasicInfo:{
          ...this.state.userBasicInfo,
          member: {
            ...this.state.userBasicInfo.member,
            isBlackList: status
          }
        }
      })
    }else if(type=="sourceType"){
      this.setState({
        userBasicInfo:{
          ...this.state.userBasicInfo,
          member: {
            ...this.state.userBasicInfo.member,
            sourceType: status
          }
        }
      })
    }
  }

  render(){
    const messageData = this.props.messageData.msgFlow
    const roomType = this.props.messageData.roomType
    const sliceBegin = this.props.messageData.sliceBegin
    const { answerType,
            answerCss,
            answerList,
            memberId,
            iconPath,
            userBasicInfo,
            basicInfoCss,
            tipStatus,
            showTipBox,
            modalShow_video,
            modalSrc_video} = this.state
    const {selectRoomType,userInfo,groupList,selectMemberId,selectRoom,msgPicker,actions,socket,groupId,dragObject,distance,oldDistance} = this.props
    const imMemIDs = groupList.targetGroup.id != '' ? groupList.targetGroup.robotGroupMemList : ''
    const modalShow = this.state.modalShow
    const modalSrc = this.state.modalSrc
    let cssHeight = dragObject!=null ? distance+oldDistance+240 : oldDistance+240
    // console.log(modalShow_video);
    return(
      <div id='groupRoom' className = 'msgFlowBox' ref='msgFlowBox' onScroll={this.scrollHandle} style={Object.assign({},{display:selectRoomType=='GROUP'||selectRoomType=='GROUPMSG'?'block':'none'},{height: 'calc(100% - '+cssHeight+'px)'})} onMouseDown={this.mouseDownHandle.bind(this)} onMouseUp={this.mouseUpHandle.bind(this)}>
        <div ref='loading' style={{display:'none',padding:'10px 0 0',textAlign:'center',fontSize:'26px'}}>
          <LoadCartoonGray />
          <p ref='loadingText' style={{display:'none',fontSize:'12px'}}>没有更早的消息啦！</p>
        </div>
        <div style={{width:'100%',height:'20px'}}></div>
        {
          roomType=='GROUPMSG'&&messageData[0]&&<MsgBubble key = {'bubble0'} msgData = {messageData[0]}
            msgPicker = {msgPicker}
            imMemIDs = {imMemIDs}
            action = {{
              imgView :
              this.yleidModal,
              videoView :
              this.yeidVideoModal,
            }}
            selectMemberId = {selectMemberId}
            selectRoom = {selectRoom}
            getMesgByMemebr = {this.getMesgByMemebr}
            insertMsgPicker = {actions.insertMsgPicker}
            removeMsgPicker = {actions.removeMsgPicker}
            quickAnswerHandle = {this.quickAnswerHandle}
            getUserInfoHandle = {this.getUserInfoHandle}
            roomType={roomType}
          />
        }
        {
         roomType=='GROUPMSG'?
         messageData.map((item,id)=>
           <GroupMsgBubble key= {'bubble'+id} msgData = {item}
             groupList = {groupList}
           action = {this.yleidModal} index={id}/>
         ):
         messageData.slice(sliceBegin,sliceBegin+120).map((item,id) =>
           <MsgBubble key = {'bubble'+id} msgData = {item}
           msgPicker = {msgPicker}
           imMemIDs = {imMemIDs}
           action = {{
             imgView :
             this.yleidModal,
             videoView :
             this.yeidVideoModal,
           }}
           selectMemberId = {selectMemberId}
           selectRoom = {selectRoom}
           getMesgByMemebr = {this.getMesgByMemebr}
           insertMsgPicker = {actions.insertMsgPicker}
           removeMsgPicker = {actions.removeMsgPicker}
           altMember = {actions.altMember}
           putStoreByMember ={actions.putStoreByMember}
           quickAnswerHandle = {this.quickAnswerHandle}
           getUserInfoHandle = {this.getUserInfoHandle}
           roomType={roomType}
           />
         )
       }
        <div ref='fresh' style={{display:'none',padding:'10px 0',textAlign:'center',fontSize:'26px'}}>
          <LoadCartoonGray />
          <p ref='freshText' style={{display:'none',fontSize:'12px'}}>已经到达最新的消息啦！</p>
        </div>
        {
          modalShow ? <ImgModal src = {modalSrc}  closeClickHandle = {this.closeModal.bind(this)} /> : ''
        }
        {
          modalShow_video ? <MovieView src = {modalSrc_video}  closeClickHandle = {this.closeModal.bind(this)}/> : ''
        }
        <div className="quickSearch icon-gm"
          tabIndex={2}
          style={{display:this.state.searchCss.display,left:this.state.searchCss.x+'px',top:this.state.searchCss.y+'px'}}
          onClick={this.quickSearchHandle}
          onBlur={this.hideQuickSearch}
        >
        </div>
        <QuickAnswer
          answerType={answerType}
          answerCss={answerCss}
          answerList={answerList}
          groupList={groupList}
          questionTxt={this.state.questionTxt}
        />
        <UserOperateNew 
          socket={socket}
          groupId={groupId}
          memberId={memberId}
          iconPath={iconPath}
          userBasicInfo={userBasicInfo}
          showTipBoxHandle={this.showTipBoxHandle}
          altMember = {actions.altMember}
          selectMemberId = {selectMemberId}
          selectRoom = {selectRoom}
          getMesgByMemebr = {this.getMesgByMemebr}
          changePrivilegeHandle={this.changePrivilegeHandle}
          groupList={groupList}
          actions={actions}
        />
        <TipBox status={tipStatus} showTipBox={showTipBox} cancelTipBox={this.hideTipBoxHandle} confirmTipBox={this.deleteUserHandle}/>
      </div>
    )
  }
}
