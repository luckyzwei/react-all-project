import React, { Component, PropTypes } from 'react'
import $ from 'jquery'
import promiseXHR from '../../funStore/ServerFun'
import AuthProvider from '../../funStore/AuthProvider'
import {API_PATH} from '../../constants/OriginName'
import ListItem from './ListItem'
import _ from 'lodash'
const getTime = (time) => {
  const result = new Date(new Date(time+'Z').getTime() - 8*3600*1000)
  let hours = result.getHours().toString()
  let minutes = result.getMinutes().toString()
  hours = hours.length == 1 ? '0'+hours : hours
  minutes = minutes.length == 1 ? '0'+minutes : minutes
  return hours+':'+minutes
}

export default class GoupList extends Component {
  constructor(props){
    super(props)
    this.closeBlock = this.closeBlock.bind(this)
    // this.openBlock = this.openBlock.bind(this)
    this.itemClick = this.itemClick.bind(this)
  }
  componentDidMount(){
    this.props.onRef&&this.props.onRef(this)
  }

  state = {
    selectId:'',
    random:0
  }

  closeBlock(id,callback){
    this.setState({
      random:Math.random(),
      selectId:id
    },()=>{
    callback()
    })
  }

  // openBlock(){
  //   this.setState({
  //     block:false
  //   })
  // }

  getMembers(id){
    const {selectRoom,initMemberList,initMsgList} = this.props
    const self = this
    selectRoom('GROUP')
    let url = [API_PATH+'/groupmsg-api/authsec/group/'+id+'/immems/keywordmsg/countinfo?_size=250&_page=',0]
    return AuthProvider.getAccessToken()
    .then((resolve,reject)=>{
        initMemberList()
        return self.successionRequest(this.state.random,url,resolve)
    })
  }

  getMesgByGroup(id,type){
    const {selectChatId,pullMesgById,initMsgList} = this.props
    const self = this
    const random = this.state.random
    // const url = API_PATH+'/groupmsg-api/authsec/group/'+id+'/messages?_page=0&_size=20'
    const url =
    API_PATH+'/groupmsg-api/authsec/group/'+id+'/stream/messages?_setRead='+type+'&_pageSize=20'
    initMsgList()
    return AuthProvider.getAccessToken()
    .then((resolve,reject)=>{
        return promiseXHR(url,{type:'Bearer',value:resolve},null,'GET')
        .then(res => {
          const data = eval('('+res+')')
          if(random==this.state.random){
            selectChatId(id,data.resultContent.keywordInfo.totalCount)
            pullMesgById('GROUP',id,data.resultContent,{})
            $('#groupRoom')[0]&&$('#groupRoom').scrollTop($('#groupRoom')[0].scrollHeight-1)
          }
        })
    })
  }
  getMicroTasks(id){
    const {pullMicroTask} = this.props
    const params = {
      "currentPage": 0,
      "groupId": id,
      "pageSize": 20
    }
    const random = this.state.random
    let url = API_PATH+'/taskadminapi/authsec/v2/group/task'
      return AuthProvider.getAccessToken()
            .then((resolve, reject) => {
                return promiseXHR(url, {
                        type: 'Bearer',
                        value: resolve
                    }, params, 'POST')
                    .then((res) => {
                        const data = JSON.parse(res)
                        if(random==this.state.random){
                          pullMicroTask('',data)
                        }
                    })
            })
  }

  successionRequest(id,url,resolve){
      const self = this
      return promiseXHR(url[0]+url[1],{type:'Bearer',value:resolve},null,'GET')
      .then(res => {
        var data = eval('('+res+')')
        if(data.pageInfo.currentPage == data.pageInfo.totalPage - 1){
          var reducerList = data.resultContent.map((item)=>
          Object.assign({},{altSelected:false, putStore:false},item))
          if(id==this.state.random){
            self.props.pullMemberList(reducerList)
          }
        }else if (data.pageInfo.currentPage < data.pageInfo.totalPage - 1&&
        data.pageInfo.currentPage != data.pageInfo.totalPage - 1){
          var reducerList = data.resultContent.map((item)=>
          Object.assign({},{altSelected:false, putStore:false},item))
          if(id==this.state.random){
            self.props.pullMemberList(reducerList)
          }
          // 判断条件后期需要修改(当前页码 < totalPage)
          // 需要添加事件action添加store中的值
          // console.log('next');
          url[1] = url[1]+1
          return self.successionRequest(id,url,resolve)
        }else {
          return 'done'
        }
      })
  }

  itemClick(id,type){
    // if(!this.state.block){
      this.closeBlock(id,()=>{
        Promise.all([this.getMesgByGroup(id,type),this.getMembers(id),this.getMicroTasks(id)])
        .then(res => {
          // this.openBlock()
          this.props.changeKeyForMember('')
          this.props.searchKeyInMember('')
          this.props.initKeywordsMsgList()
        })
      })
    // }
  }





  render(){

    const {
        list,
        selectChatId,
        pullMemberList,
        initMemberList,
        pullMicroTask,
        searchKey,
        tagEdit,
        selectRoom,
        pullMesgById,
        setIdForLabel,
        initMsgList,
        changeKeyForMember,
        searchKeyInMember
      } = this.props
      // 群groupBy（更具lastTime）
      const data = _.groupBy(list.listData,(item)=>(item.lastMsgTime!=null ? 'higher':'lower'))
      let list_unreadNum = data.higher!=undefined ? data.higher.sort((a,b)=>new Date(b.lastMsgTime)-new Date(a.lastMsgTime)).concat(data.lower):list.listData

      const searchValue = searchKey.key.groupKey
      const searchValue_rest = searchValue.substring(1, searchValue.length).toString()
      let dataList = []
      list_unreadNum = list_unreadNum.filter(item => item!=undefined)
      if(searchValue.substring(0, 1).toString() == "\uff03"||searchValue.substring(0, 1).toString() == "\u0023"){
        dataList = list_unreadNum.filter(item =>
          item.labelList.length!=0&&item.labelList.find(t => t.name.includes(searchValue_rest))
        )
      }else {
        dataList = searchValue != '' ? list_unreadNum.filter(item =>
          item.nickName!=null&&item.nickName.includes(searchValue)
        ) : list_unreadNum
      }
      const selectId = list.chatGroupId
      const itemClick = this.itemClick.bind(this)
      return  (
        <div className = 'groupList' >
          {dataList.map((item) =>
           <ListItem
             key = {item.id}
             id = {item.id}
             number = {item.unreadMsgCount}
             keywordNumber = {item.unreadKeywordMsgCount}
             name = {item.nickName}
             iconPath = {item.iconPath}
             time = {item.lastMsgTime != null ? getTime(item.lastMsgTime) : ''}
             selectId = {this.state.selectId}
             onClick = {(id)=>{
               {/*拉群消息请求*/}
               itemClick(id,item.unreadMsgCount*1 != 0 ? 1 : 0)
             }}
             control = {
               (id)=>{
                 tagEdit('GROUP')
                 setIdForLabel(id)
               }
             }
           />
          )}
        </div>
      )
  }

}
