import React from 'react'
import MsgTransform from './MsgTransform'
// import ImgMsgBox from './ImgMsgBox'
const getTime = (time) => {
  const result = new Date(new Date(time+'Z').getTime() - 8*3600*1000)
  let year = result.getFullYear().toString()
  let month = (result.getMonth()+1).toString()
  let day = result.getDate().toString()
  let hours = (result.getHours()).toString()
  let minutes = result.getMinutes().toString()
  let seconds = result.getSeconds().toString()
  month = month.length == 1 ? '0'+month : month
  day = day.length == 1 ? '0'+day : day
  hours = hours.length == 1 ? '0'+hours : hours
  minutes = minutes.length == 1 ? '0'+minutes : minutes
  seconds = seconds.length == 1 ? '0'+seconds : seconds
  return year+'.'+month+'.'+day+' '+hours+':'+minutes+':'+seconds
}
const GroupMsgBubble = ({msgData,groupList,src,action,index}) => {
    const type = msgData.msgInfo.msgType
    const msgTime = getTime(msgData.msgInfo.msgTime)
    const content = MsgTransform(msgData.msgInfo,msgData.keywordList)
    // console.log(msgData);
    const groupName = groupList.listData.find(item => item.id == msgData.msgInfo.groupId).nickName
    switch(type) {
        case 3:
        return (
            <div className='groupMsgBubble'>
                <div className='avatarBox'>
                    <img src={`${process.env.PUBLIC_URL}/images/group/group${index%10}.png`} alt=''/>
                </div>
                <div className="groupInfoBox">
                    <span className='groupName'>{groupName}</span>
                    <span className='msgStatus success'>成功</span>
                </div>
            </div>
        )

        default:
        return (
            <div className='groupMsgBubble'>
                <div className='avatarBox'>
                    <img src={`${process.env.PUBLIC_URL}/images/group/group${index%10}.png`} alt=''/>
                </div>
                <div className="groupInfoBox">
                    <span className='groupName'>{groupName}</span>
                    <span className='msgStatus success'>成功</span>
                </div>
            </div>

        )
    }
}

export default GroupMsgBubble
