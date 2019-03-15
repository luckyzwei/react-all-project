import React, { Component} from 'react'
import $ from 'jquery'
import promiseXHR from '../../funStore/ServerFun'
import AuthProvider from '../../funStore/AuthProvider'
import {API_PATH} from '../../constants/OriginName'
import ListItem from './ListItem'
import {sendEvent} from '../../funStore/CommonFun'
const getTime = (time) => {
  const result = new Date(time)
  let hours = result.getHours().toString()
  let minutes = result.getMinutes().toString()
  hours = hours.length == 1 ? '0'+hours : hours
  minutes = minutes.length == 1 ? '0'+minutes : minutes
  return hours+':'+minutes
}
const MemberList = ({memberList,tagEdit,groupId,selectMemberId,searchKey,selectRoom,pullSingleMesgById,setIdForLabel,selectRoomType,groupCode}) => {
  // console.log(searchKey);
  // const isMember = searchKey.key.memberKey!=''
  // const dataList = isMember ? memberList.listData.filter(item =>
  // item.nickName!=null&&item.nickName.includes(searchKey.key.memberKey)) : memberList.listData
  // const dataList = memberList.listData
  const getMesgByMemebr = (memberId) => {
    const url = API_PATH+'/groupmsg-api/authsec/group/'+groupId+'/immem/'+memberId+'/readmessages?_page=0&_size=20'
    AuthProvider.getAccessToken()
    .then((resolve,reject)=>{
        promiseXHR(url,{type:'Bearer',value:resolve},null,'GET')
        .then(res => {
          const data = eval('('+res+')')
          pullSingleMesgById(memberId,data.resultContent,data.pageInfo)
          $('#memberRoom').scrollTop($('#memberRoom')[0].scrollHeight-1)
        })
    })
  }

  const refreshMemberHandle = () => {
    const url = API_PATH + '/groupadmin-api/authsec/groupadmin/group/mem/async?groupCode='+groupCode
    AuthProvider.getAccessToken()
    .then((resolve,reject)=>{
        promiseXHR(url,{type:'Bearer',value:resolve},null,'GET')
        .then(res => {
          const resData = JSON.parse(res)
          if(resData.resultCode=='100'){
            sendEvent('message', {txt: "正在刷新群成员信息，请稍候~",code: 1000})
          }
        })
    })
  }
  const searchValue = searchKey.key.memberKey
  const searchValue_rest = searchValue.substring(1, searchValue.length).toString()
  let dataList = []
  if(searchValue.substring(0, 1).toString() == "\uff03"||searchValue.substring(0, 1).toString() == "\u0023"){
    dataList = memberList.listData.filter(item =>
      item.labelList.length!=0&&item.labelList.find(t => t.name.includes(searchValue_rest))
    )
  }else {
    dataList = searchValue != '' ? memberList.listData.filter(item =>{
      if(item.remarkName!=null){
        return item.remarkName.includes(searchValue)
      }else if(item.nickName!=null){
        return item.nickName.includes(searchValue)
      }
      return false
    }
    ) : memberList.listData
  }
  if(dataList.find(item=>item.type==1||item.type==4)){//把群主放在第一个
    dataList = dataList.filter(item=>item.type==4).concat(dataList.filter(item=>item.type==1)).concat(dataList.filter(item=>item.type==3)).concat(dataList.filter(item=>item.type!=1&&item.type!=3&&item.type!=4))
  }


  const selectId = memberList.chatMemberId
  return  (
      dataList&&dataList.length>0?
      <div className = 'memberList' >
        <div className="refreshMember" style={{textAlign:'right',padding:'3px 17px 0'}}>
            <span className='refreshMemberBtn' onClick={refreshMemberHandle}>
              <em className="icon-gm refreshBtn"></em>刷新
            </span>  
        </div>
        {dataList.map((item,id) =>
        <ListItem key = {'member'+id}
          id = {item.id}
          keywordNumber = {item.keywordMsgCount}
          name = {item.remarkName?item.remarkName:item.nickName}
          iconPath = {item.iconPath}
          type={item.type}
          time = {item.lastMsgTime != null ? getTime(item.lastMsgTime) : ''}
          selectId = {selectId}
          onClick={(id) => {
          getMesgByMemebr(id)
          selectMemberId(id)
          selectRoom('MEMBER')
          }}
          control = {
            (id)=>{
              // tagEdit('USER')
              // setIdForLabel(id)
              sendEvent('useroperate',{memberId:id,iconPath:item.iconPath})
            }
          }
          flag={'MEMBER'}
          selectRoomType ={selectRoomType}
          level={item.level}
        />
        )}
      </div>
      :groupId?
      <div className = 'memberList' >
        <div className="refreshMember">
          <span className='refreshMemberBtn' onClick={refreshMemberHandle}>
            <em className="icon-gm refreshBtn"></em>刷新群用户
          </span>
        </div>
      </div>
      :
      <div className = 'memberList' >
        <div className="none"></div>
        <p className="noneTxt">还没有群哦~</p>
      </div>
  )
}

export default MemberList
