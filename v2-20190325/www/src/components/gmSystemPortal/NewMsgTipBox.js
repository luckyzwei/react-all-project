import React from 'react'
import $ from 'jquery'
const NewMsgTipBox = ({status,messageLength,singleMsgLength,changeNewTip,changeSlice,selectRoomType,changeNewTipSin,changeSliceSin}) => {
  const clickEvent = () => {
     if(selectRoomType == 'GROUP'){
        changeSlice(messageLength-120<0?0:messageLength-120)
        changeNewTip(false)
        $('#groupRoom').stop(true,false).animate({scrollTop:$('#groupRoom')[0].scrollHeight-1},"slow")
     }else if(selectRoomType == 'MEMBER'){
        changeSliceSin(messageLength-120<0?0:messageLength-120)
        changeNewTipSin(false)
        $('#memberRoom').stop(true,false).animate({scrollTop:$('#memberRoom')[0].scrollHeight-1},"slow") 
     }
  }
  return(
    <div className = 'newMsgTipBox'
    style = {{display : status ? 'block' : 'none'}}
    onClick = {clickEvent}
    >
      <div className = 'newMsgTip'>
        <div className = 'downArrow icon-gm'></div>
        <div className = 'newMsgContent'>点击查看新消息</div>
      </div>
    </div>
  )
}

export default NewMsgTipBox
