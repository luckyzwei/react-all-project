import {store} from '../index'
import $ from 'jquery'
import { push, replace } from 'react-router-redux'
import AuthProvider from './AuthProvider'
import promiseXHR from './ServerFun'
import {WS_NAME,API_PATH} from '../constants/OriginName'
import { Base64 } from 'js-base64';
import Notification from '../components/shareComponent/Notification'
class WebSocketConnect {
  constructor(){
    const self = this
    this.setUserInfo()
    .then((res) => {
      self.connector(res.userinfo.userId)
    })
  }

  state = {
    socket:'',
    timer:''
  }

  encodeClientId(pipLineData){
    const self = this
    return new Promise((resolve,reject)=>{
      if(self.getCookie('webclient_id')==null){
        var webclient_id = Base64.encode('lizClient'+Math.random().toString())
        self.saveWebClienId(webclient_id)
      }
      setTimeout(()=>{
        resolve(pipLineData)
      },1300)
    })
  }

  saveWebClienId(webclient_id){
    let exp = new Date();
    exp.setTime(exp.getTime() + 1000*60*60*24*365)
    document.cookie = 'webclient_id' + "="+ escape (webclient_id) + ";expires=" + exp.toGMTString()+";path=/";
  }

  getCookie(key) {
         var aCookie = document.cookie.split("; ");
         // console.log(aCookie);
         for (var i=0; i < aCookie.length; i++)
         {
             var aCrumb = aCookie[i].split("=");
             if (key == aCrumb[0])
                 return unescape(aCrumb[1]);
         }
         return null;
   }

  connector(info){
    var ws = new WebSocket(WS_NAME)
    const self = this
    let timer;
        ws.onopen = function(e) {
            //WebSocket Status:: Socket Open
            //// 发送一个初始化消息

            try{
              ws.send(self.init(info));
              self.state.timer = self.heartbeat(ws)
              // console.log('--连接')
            }catch(error){
              console.log(error)
            }

        }
        //监听当接收信息时触发匿名函数
        ws.onmessage= function(message){
          const data = eval('('+message.data+')')
          if(data.command === 0xff&&data.frame === 1){
            self.responseBeat(ws)
          }else if (data.command==0xef&&data.frame === 0) {
            store.dispatch(
              {type:'TURN_OFF_STATE'}
            )
            setTimeout(function(){
              ws.close()
              AuthProvider.deleteCookie('access_token')
              AuthProvider.deleteCookie('refresh_token')
              AuthProvider.deleteCookie('webclient_id')
              store.dispatch(
                push('/v2/offline')
              )
            },500)
          }else if (data.command==254&&data.frame === 1) {
            setTimeout(function(){
              ws.send(self.init(info));
            },50)
          }else {
            // 处理群聊消息
            if(data.command==247){
              if(store.getState().messageData.roomType!='GROUPMSG'){
                if(store.getState().groupList.chatGroupId==data.data.msgInfo.groupId){
                  // console.log('有消息');
                  if(store.getState().messageData.msgFlow.slice(-10).find((item)=>data.data.msgInfo.msgId==item.msgId)==undefined){
                    store.dispatch(
                      {type:'SOCKETMESG',data : Object.assign({},data.data,{origin:'socket'})}
                    )
                  }
                  if(store.getState().messageData.msgFlow.length > store.getState().messageData.sliceBegin+120){
                    store.dispatch(
                      {type:'CHANGE_NEWTIP', status: true}
                    )
                  }else {
                   $('#groupRoom').scrollTop($('#groupRoom')[0].scrollHeight-1)
                  }

                  // 消息socket中有keyword消息
                  if (store.getState().keywordsData.keyword) {
                    if(store.getState().keywordsData.msgFlow.length > store.getState().keywordsData.sliceBegin+120){
                      store.dispatch(
                        {type:'CHANGE_NEWTIP_KEYWORD', status: true}
                      )
                    }else {
                      $('#keywordsRoom').scrollTop($('#keywordsRoom')[0].scrollHeight-1)
                    }
                    if(data.data.keywordList.length>0){
                      store.dispatch({
                        type:'SOCKET_KEYWORDSMESGS',data: Object.assign({},data.data,{origin:'socket'})
                      })
                      $('#keywordsRoom').scrollTop($('#keywordsRoom')[0].scrollHeight-1)
                    }
                  }
                  // 消息socket中有当前打开群成员消息列表的消息和班长@成员消息
                  var filterMMsg_F =
                  store.getState().memberList.chatMemberId
                  ==data.data.memInfo.id
                  var filterMMsg_M =
                  store.getState().groupList.targetGroup.robotGroupMemList[0].imMemId==data.data.memInfo.id
                  &&
                  (store.getState().memberList.chatMemberId!=''? data.data.msgInfo.content.includes(store.getState().memberList.listData.find(item => item.id==store.getState().memberList.chatMemberId).nickName):false)

                  if(filterMMsg_F||filterMMsg_M){
                    if(store.getState().singleMesgData.msgFlow.length > store.getState().singleMesgData.sliceBegin+120){
                      store.dispatch(
                        {type:'CHANGE_NEWTIP_SIN', status: true}
                      )
                    }else {
                      $('#memberRoom').scrollTop($('#memberRoom')[0].scrollHeight-1)
                    }
                    store.dispatch(
                      {type:'SOCKET_SINGLEMESGS',data : Object.assign({},data.data,{origin:'socket'})}
                    )
                    $('#memberRoom').scrollTop($('#memberRoom')[0].scrollHeight-1)
                    // 当前消息致为已读
                    // ws.send(self.readMesg(data.data.msgId))
                  }else {
                    if(data.data.keywordList.length>0){
                      store.dispatch(
                        {type:'ADD_MEMBER_UNREADMSG', id : data.data.memInfo.id,lastMsgTime:data.data.msgInfo.msgTime}
                      )
                    }
                  }
                  // 当前消息致为已读
                  // console.log(data.data.msgInfo.msgId);
                  ws.send(self.readMesg(data.data.msgInfo.msgId))

                }else {
                  store.dispatch(
                    {type:'ADD_NORMALUNREADMSG', id : data.data.msgInfo.groupId,lastMsgTime:data.data.msgInfo.msgTime}
                  )
                  if(data.data.keywordList.length>0){
                    store.dispatch(
                      {type:'ADD_UNREADMSG', id : data.data.msgInfo.groupId,lastMsgTime:data.data.msgInfo.msgTime}
                    )
                  }
                }
              }else {
                const imMemIdList = store.getState().groupList.listData.map(item => item.robotGroupMemList.length!=0 ? item.robotGroupMemList[0].imMemId:'')
                if(imMemIdList.includes(data.data.memInfo.id)){
                  // 群发消息
                  store.dispatch(
                    {type:'SOCKETMESG',data : Object.assign({},data.data,{origin:'socket'})}
                  )
                }
              }
            }
            // console.log(data.data);
            // 处理系统消息
            if(data.command==248){
              // msgType： 27 普通消息 28 结束 46 同步群成员消息
              // msgLevel: 0 一般消息 1 警告 2 错误
              if(data.data.msgType!=46){
                // 非同步群成员消息 加入到系统消息列表中
                store.dispatch(
                  {type:'SYSINFO_ADD',data :[data.data]}
                )
              }
              if(data.data.msgType==46){
                // 同步群成员消息 ，如果还在群消息页面,并且当前群是同步这个消息的群，重新拉取列表
                let targetId = store.getState().groupList.targetGroup.id
                if(targetId==data.data.batchId&&window.location.href.includes('GMScope')){
                  let url = API_PATH+'/groupmsg-api/authsec/group/'+targetId+'/immems/keywordmsg/countinfo?_size=500&_page=0'
                  AuthProvider.getAccessToken()
                  .then((resolve,reject) => {
                    return promiseXHR(url,{type:'Bearer',value:resolve},null,'GET')
                  }).then((res) => {
                    const resData = JSON.parse(res)
                    if(resData.resultCode=='100'){
                      let memberList = resData.resultContent.map(v => ({
                        ...v,
                        altSelected:false,
                        putStore:false
                      }))
                      store.dispatch(
                        {
                          type:'MEMBERLIST_REFRESH',
                          data: memberList
                        }
                      )
                    }
                  })
                }else if(window.location.href.includes('/GIScope/member')){
                  // 触发刷新群列表事件
                  var event = new Event('refreshmember');
                  window.dispatchEvent(event);
                }
              }
              if(data.data.msgType==45){
                // error 消息
                Notification.error({
                  batchId: data.data.batchId,
                  title: data.data.title,
                  content: data.data.content
                })

              }else if(data.data.msgType==46){
                // 4s后自动关闭
                Notification.info({
                  batchId: data.data.batchId,
                  title: data.data.title,
                  content: data.data.content,
                  duration: 4
                })
              }else{
                Notification.info({
                  batchId: data.data.batchId,
                  title: data.data.title,
                  content: data.data.content
                })
              }
            }
          }
          // console.log(store.getState().messageData.roomId);
    		  // console.log(message.data)
       }

       ws.onclose = function(message){
    	//alert("与服务器连接中断，请重新连接");
          const socketState = store.getState().socketState
          clearInterval(self.state.timer)
          ws.close()
          // console.log(socketState.closeState);
          if(socketState.closeState){
            setTimeout(function(){
              const userid = store.getState().userInfo.info.userinfo.userId
                  self.connector(userid)
            },500)
          }
          // console.log('与服务器连接中断，请重新连接');
      }

      this.state.socket = ws
  }

  init(code){
    let map = {}
    map.command=0xfe
    map.frame = 1
    map.data = code
    return JSON.stringify(map)
  }

  beatMap(){
    let map = {}
    map.command=0xff
    map.frame = 1
    map.data = 'ping'
    return JSON.stringify(map)
  }

  readMesg(id){
    let map = {}
    map.command=0xfd
    map.frame = 0
    map.data = id
    return JSON.stringify(map)
  }

  responseBeat(ws){
    ws.send(this.beatMap());
    // console.log('--我发的--'+this.beatMap());
  }


  receiveMsg(f){
    // console.log(f);
  }

  heartbeat(ws){
    const data = this.beatMap()
    return setInterval(function(){
      ws.send(data);
      // console.log('--我发的--'+data);
    },30000)
  }

  setUserInfo(){
    const self = this
    return AuthProvider.getAccessToken()
          .then((resolve,reject) => {
            return self.pullUserinfo(API_PATH+'/tenantadmin/authsec/tenantbase/currentuser',resolve)
          })
  }

  getUserInfo(){
    return store.getState().userInfo.info.userinfo.userId
  }

  pullUserinfo(url,resolve){
    return promiseXHR(url,{type:'Bearer',value:resolve},null,'GET')
          .then((res) => {
            const data = eval('('+res+')')
            return data.resultContent
          })
  }


}

export default WebSocketConnect
