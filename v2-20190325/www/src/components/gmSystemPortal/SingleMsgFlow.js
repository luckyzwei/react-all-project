import React, { Component } from 'react'
import MsgBubble from './MsgBubble'
import $ from 'jquery'
import promiseXHR from '../../funStore/ServerFun'
import AuthProvider from '../../funStore/AuthProvider'
import {QQFACE_TEXT} from '../../constants/MapData'
import ImgModal from './ImgModal'
import {LoadCartoonGray} from './LoadCartoon'
import {API_PATH} from '../../constants/OriginName'

export default class SingleMsgFlow extends Component{
  constructor(props) {
    super(props)
    this.scrollHandle = this.scrollHandle.bind(this)
    this.msgLoading = this.msgLoading.bind(this)
    this.msgFresh = this.msgFresh.bind(this)
  }

  state = {
    modalShow : false,
    modalSrc : '',
    loading : false
  }

  componentDidMount(){
    $('.msgBox').find('img').each(function(i){
          var  text = QQFACE_TEXT.qqEmoji_array[parseInt($(this).attr('name'))]
          $(this).attr('text',text)
      })
  }

  yleidModal(src){
    this.setState({
      modalShow : true,
      modalSrc : src
    })
  }
  closeModal(){
    this.setState({
      modalShow : false,
    })
  }
  msgLoading () {
    const singleMesgData = this.props.singleMesgData
    let sliceBegin = singleMesgData.sliceBegin
    if(sliceBegin>0){
      // slicePage-60
      this.props.changeSliceSin(sliceBegin-60)
      // console.log('加载完成')
      this.refs.loading.style.display = 'none';
      this.refs.loadingText.style.display = 'none';
      this.refs.msgFlowBox.scrollTop = this.refs.msgFlowBox.scrollTop+50;
      this.setState({
        loading: false
      })
      return
    }

    if(singleMesgData.pageInfo.currentPage<(singleMesgData.pageInfo.totalPage-1)){
      const url = API_PATH+'/groupmsg-api/authsec/group/'+this.props.groupId+'/immem/'+singleMesgData.singleId+'/readmessages?_page='+(singleMesgData.pageInfo.currentPage+1)+'&_size=20'
      AuthProvider.getAccessToken()
      .then((resolve,reject)=>{
          promiseXHR(url,{type:'Bearer',value:resolve},null,'GET')
          .then(res => {
            const data = eval('('+res+')')
            this.props.insertSingleMesg(data.resultContent,data.pageInfo)
            // console.log('加载完成')
            this.refs.loading.style.display = 'none';
            this.refs.loadingText.style.display = 'none';
            var itemTop = $("#"+singleMesgData.msgFlow[0].msgInfo.msgId)[0].offsetTop;
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
    const singleMesgData = this.props.singleMesgData
    let sliceBegin = singleMesgData.sliceBegin
    if(singleMesgData.sliceBegin+120<singleMesgData.msgFlow.length){
      // slicePage+60
      this.props.changeSliceSin(sliceBegin+60)
      // console.log('刷新完成')
      this.refs.fresh.style.display = 'none';
      this.refs.freshText.style.display = 'none';
      this.refs.msgFlowBox.scrollTop = this.refs.msgFlowBox.scrollTop-1;
      this.setState({
        loading: false
      })
      return
    }
    // console.log('刷新完成')
    this.refs.fresh.style.display = 'none';
    this.refs.msgFlowBox.scrollTop = this.refs.msgFlowBox.scrollTop-1;
    this.setState({
      loading: false
    })
  }
  scrollHandle () {
    const singleMesgData = this.props.singleMesgData
    let {msgFlowBox,loading,fresh,loadingText,freshText} = this.refs;
    let scrollTop = msgFlowBox.scrollTop;
    let scrollHeight = msgFlowBox.scrollHeight;
    let clientHeight = msgFlowBox.offsetHeight;
    this.props.scrollControlHandle()
    if(this.props.scrollAble&&!this.state.loading){
      if(scrollTop==0){
        // 下拉加载...
        this.setState({
          loading: true
        })
        loading.style.display = 'block';
        if(singleMesgData.pageInfo.currentPage==(singleMesgData.pageInfo.totalPage-1)&&singleMesgData.sliceBegin==0){
          loadingText.style.display = 'block'
        }
        // console.log('下拉加载...')
        setTimeout(() => {
          this.msgLoading()
        },1000)
      }else if(scrollTop==scrollHeight-clientHeight){
        // 上拉刷新...
        this.setState({
          loading: true
        })
        // console.log('上拉刷新...')
        fresh.style.display = 'block'
        if(singleMesgData.sliceBegin+120>=singleMesgData.msgFlow.length){
          freshText.style.display = 'block'
        }
        setTimeout(() => {
          this.msgFresh()
        },1000)
      }
    }
  }

  render(){
    const singleMesgData = this.props.singleMesgData.msgFlow
    const roomType = this.props.singleMesgData.roomType
    const {selectRoomType,groupList,dragObject,distance,oldDistance} = this.props
    const imMemIDs = groupList.targetGroup.id != '' ? groupList.targetGroup.robotGroupMemList : ''
    const modalShow = this.state.modalShow
    const modalSrc = this.state.modalSrc
    let cssHeight = dragObject!=null ? distance+oldDistance+240 : oldDistance+240
    return(
      <div id='memberRoom' className = 'msgFlowBox' ref='msgFlowBox' onScroll={this.scrollHandle} style={Object.assign({},{display:selectRoomType=='MEMBER'?'block':'none'},{height: 'calc(100% - '+cssHeight+'px)'})}>
        <div ref='loading' style={{display:'none',padding:'10px 0 0',textAlign:'center',fontSize:'26px'}}>
          <LoadCartoonGray />
          <p ref='loadingText' style={{display:'none',fontSize:'12px'}}>没有更早的消息啦！</p>
        </div>
        <div style={{width:'100%',height:'20px'}}></div>
        {
         singleMesgData.slice(0,40).map((item,id) =>
           <MsgBubble key = {'bubble'+id} msgData = {item}
           imMemIDs = {imMemIDs}
           action = {this.yleidModal.bind(this)}
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
      </div>
    )
  }
}
