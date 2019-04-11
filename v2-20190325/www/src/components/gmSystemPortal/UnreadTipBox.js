import React from 'react'
const UnreadTipBox = ({state,number}) => {
  return(
    <div className = 'countinfoBox'
    style = {{display : number == 0 ? 'none' : 'block'}}

    >
      <div className = 'unreadMsg'>
        <div className = 'upArrow icon-gm'></div>
        <div className = 'unreadMsgContent'>{number}条未读关键字消息</div>
      </div>
    </div>
  )
}

export default UnreadTipBox
