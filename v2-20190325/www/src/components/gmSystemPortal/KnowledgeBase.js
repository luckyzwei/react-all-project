import React,{Component} from 'react'
import $ from 'jquery'
import QAcard from './QAcard'
import OldQAcard from './OldQAcard'
import ImgModal from './ImgModal'
import {sendEvent} from '.././../funStore/CommonFun'
// import KWcard from './KWcard'
// const msg = {
//     title:'宝宝发烧怎么办？宝宝发烧怎么办？宝宝发烧怎么办？宝宝发烧怎么办？宝宝发烧怎么办？宝宝发烧怎么办？',
//     text:'宝妈请别着急，宝宝现在几岁了？宝妈请别着急，宝宝现在几岁了？宝妈请别着急，宝宝现在几岁了？宝妈请别着急，宝宝现在几岁了？'
// }

const LoadingAnimation  = () => {
  return(
        <div className="loadingBox">
            <div className="loadingGif">
                <img src={`${process.env.PUBLIC_URL}/images/icon/loading.svg`} alt=""/>
            </div>
            <div className="loadingText">加载中...</div>
        </div>
    )
}
class KnowledgeBase extends Component {
    constructor(props){
        super(props)
        this.state={
            loading: false,
            imgModalFlag: false
        }
        this.msgFreshCallBack = this.msgFreshCallBack.bind(this)
    }
    componentDidMount(){
        this.props.hotTipIcon&&this.props.cwList.itemList.length==0&&this.props.initKW()
    }
    msgFreshCallBack () {
        this.setState({
            loading: false
        })
        // this.refs.fresh.style.display = 'none';
        $('.fresh').css('display','none')
        this.refs.rightBox&&(this.refs.rightBox.scrollTop = this.refs.rightBox.scrollTop-50)
    }

    setStateAsync(state) {
        return new Promise((resolve) => {
        this.setState(state, resolve)
        });
    }
    // scrollHandle () {
    //     let {rightBox,fresh} = this.refs;
    //     let scrollTop = rightBox.scrollTop;
    //     let scrollHeight = rightBox.scrollHeight;
    //     let clientHeight = rightBox.offsetHeight;
    //     if(!this.state.loading){
    //         if(scrollTop==scrollHeight-clientHeight){
    //             // 上拉刷新...
    //             // console.log('请求数据啦')
    //             this.setStateAsync({
    //                 loading: true
    //             })
    //             .then((resolve)=>{
    //                 // console.log(this.state.loading)
    //                 fresh.style.display = 'block'
    //                 // $('.fresh').css('display','block')
    //                 this.props.scrollEvent(this.msgFreshCallBack)
    //             })
    //         }
    //     }
    // }
    showImgModal = (url) =>{
        this.setState({
            imgUrl: url,
            imgModalFlag: true
        })
    }
    hideImgModal = () =>{
        this.setState({
            imgModalFlag: false
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
    sendHandle = () => {
        const {imgUrl} = this.state
        const socket = this.props.socket.state.socket
        const beforeData = this.sendBefore()
        if(beforeData!=''){
            sendEvent('message', {txt: '图片正在发送中，请稍候~', code: 1000})
            const result = Object.assign({},beforeData,{msgType:'photo',content:imgUrl})
            socket.send(JSON.stringify({command:252,frame:1,data:result}))
        }
    }
    render () {
        const {imgModalFlag,imgUrl} = this.state
        let {loadingText,cwList,hotTip,hotTipIcon,groupList,userInfo,memberList,selectRoomType,socket}=this.props;
        // console.log(cwList)
        return (
            <div ref='rightBox' className='gm-kmBaseWrapper'>
                <div className='kwBaseBox'>
                    {cwList.itemList&&cwList.itemList.map((item)=> {
                        return (
                            item.origin_type
                            ?<OldQAcard question={item.problem} answers={item.answer} groupList={groupList} questionTxt={cwList.searchKey}/>
                            :<QAcard key={item.id} item={item} questionTxt={cwList.searchKey} showImgModal={this.showImgModal}/>
                        )
                    })}
                    {
                        hotTipIcon
                        ?cwList.itemList.length==0?
                        <div className="emptyBase">
                            <div className="sit"></div>
                            <p>搜索问题，获得权威答案吧~</p>
                        </div>:null
                        :
                        cwList.itemList.length!=0?
                        <div className='fresh' ref='fresh' style={{display:'none',padding:'10px 0',textAlign:'center',fontSize:'26px'}}>
                            <LoadingAnimation loadingText={loadingText}/>
                        </div>
                        :
                        <div className="emptyBase">
                            <div className="none"></div>
                            <p>没有找到答案哦~</p>
                        </div>
                    }
                </div>
                {imgModalFlag?<ImgModal src={imgUrl} closeClickHandle={this.hideImgModal} canSend={true} sendHandle={this.sendHandle} />:''}
            </div>
        )
    }
}
export default KnowledgeBase
