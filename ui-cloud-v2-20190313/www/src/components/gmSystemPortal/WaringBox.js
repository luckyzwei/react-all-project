import React from 'react'
import {sendEvent} from '../../funStore/CommonFun'

const  WaringBox = ({socket,waringBoxShow,groupId,memberId,groupList,memCode}) => {
    const warningTip = [
        {
            innerList: "请勿在群内发送敏感语句，下次将会被移除出群哦～",
            content: "请勿在群内发送敏感语句，下次将会被移除出群哦～"
        },
        {
            innerList: "请勿私拉其他用户入群，下次将会被移除入群哦～",
            content: "请勿私拉其他用户入群，下次将会被移除入群哦～"
        },
        {
            innerList: "请勿在群内发送广告，下次将会被移除出群哦～",
            content: "请勿在群内发送广告，下次将会被移除出群哦～"
        },
        {
            innerList: "为了避免网络风险，请不要在群内发送与本群无关的二维码及链接。我们交流、讨论的话可以发截图，有需要的群成员自己搜索下。<img class='qqemoji qqemoji81' text='[Shake]' src='"+process.env.PUBLIC_URL+"/images/icon/spacer.png'>",
            content: "为了避免网络风险，请不要在群内发送与本群无关的二维码及链接。我们交流、讨论的话可以发截图，有需要的群成员自己搜索下。[Shake]"
        }]
    const alertHandle = (socket,id,groupId,text,groupList) => {
        const sendId = groupList.targetGroup.robotGroupMemList[0]?groupList.targetGroup.robotGroupMemList[0].robotCode:''
        socket.send(JSON.stringify({command:252,frame:1,data:{imMemId:"",
        groups:[{groupId:groupId,atAll:false,users:[id],sendId:sendId}],msgType:"text",content:text}}))
        // console.log({command:252,frame:1,data:{imMemId:"",
        // groups:[{groupId:groupId,atAll:false,users:[id]}],msgType:"text",content:text}});
        sendEvent('message', {txt: '消息已发送', code: 1000});
    }
    return (
        <div className="warningBox" style={{display:waringBoxShow?'block':'none'}}>
            <ul className="warnDisc">
            {warningTip.map((list,i)=>
            <li title = {list.content.replace(/\[\S+]/g,'')} className="innerTip" key={i}
                onClick={()=>{
                    alertHandle(socket,memCode,groupId,list.content,groupList)
                    }
                }
                dangerouslySetInnerHTML={{__html: list.innerList}}
            >
            </li>
            )}
            </ul>
        </div>
    )
}

export default WaringBox
