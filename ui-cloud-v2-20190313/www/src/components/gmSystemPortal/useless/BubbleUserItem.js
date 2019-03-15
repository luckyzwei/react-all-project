/**
 * Created by jiayi.hu on 5/26/17.
 * 废弃代码
 */

import React, { Component } from 'react'

const  WaringBox = ({socket,waringBoxShow,groupId,memberId,alertUserHandle,groupList}) => {

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
        },
        {
            innerList: "群成员都有各自的观点，大家来这个群里都是为了学习更多的育儿方法，我们要做一个安静的美少女呢<img class='qqemoji qqemoji6' text='[Shy]' src='"+process.env.PUBLIC_URL+"/images/icon/spacer.png'>",
            content: "群成员都有各自的观点，大家来这个群里都是为了学习更多的育儿方法，我们要做一个安静的美少女呢[Shy]"
        }]
    const alertHandle = (socket,id,groupId,text,groupList) => {
        const sendId = groupList.targetGroup.robotGroupMemList[0]?groupList.targetGroup.robotGroupMemList[0].robotCode:''
        socket.send(JSON.stringify({command:252,frame:1,data:{imMemId:"",
        groups:[{groupId:groupId,atAll:false,users:[id],sendId:sendId}],msgType:"text",content:text}}))
        // console.log({command:252,frame:1,data:{imMemId:"",
        //groups:[{groupId:groupId,atAll:false,users:[id],sendId:sendId}],msgType:"text",content:text}});
    }
    return (
        <div className="warningBox" style={{display:waringBoxShow?'block':'none'}}>
            <ul className="warnDisc">
            {warningTip.map((list,i)=>
            <li title = {list.content.replace(/\[\S+]/g,'')}
              className="innerTip" key={i}
                onClick={()=>{
                    alertUserHandle()
                    alertHandle(socket,memberId,groupId,list.content,groupList)
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
export default class BubbleGroupItem extends Component {
    constructor(props){
        super(props)
        this.state = {
            waringBoxShow: false
        }
        this.alertUserHandle = this.alertUserHandle.bind(this)
        this.setReadHandle = this.setReadHandle.bind(this)
    }
    setReadHandle () {
        this.props.setRead(this.props.memberId)
        this.props.removeTagBox()
    }
    removeUserHanddle () {
        this.props.featureTypeHandle('REMOVEUSER');
        this.props.showFlagHandle('block')
    }
    alertUserHandle () {
        this.setState({
            waringBoxShow: !this.state.waringBoxShow
        })
    }
    render(){
        const {waringBoxShow} = this.state
        const {groupId,memberId,socket,groupList} = this.props
        return(
            <div className="bubbleGroupItem">
                <div className="bubbleGroupItem-field-leftButton">
                    <div className = 'button button-goGroup'>前往该群</div>
                </div>
                <div className="bubbleGroupItem-field-rightButton">
                    <div className = 'button button-read' onClick={this.setReadHandle}>标记已读</div>
                </div>
                <div className="bubbleGroupItem-field-leftButton">
                    <div className = 'button button-alert' onClick={this.alertUserHandle}>警告用户</div>
                    <WaringBox waringBoxShow={waringBoxShow}
                    alertUserHandle={this.alertUserHandle}
                    socket = {socket}
                    groupId={groupId} memberId={memberId} groupList={groupList}/>
                </div>
                <div className="bubbleGroupItem-field-rightButton">
                    <div className = 'button button-remove' onClick={this.removeUserHanddle.bind(this)}>
                        移除用户
                    </div>
                </div>
                {/*<div className="bubbleGroupItem-field-leftButton">
                    <div className = 'button'>用户信息</div>
                </div>
                <div className="bubbleGroupItem-field-rightButton">
                    <div className = 'button'>近期数据</div>
                </div>*/}
            </div>
        )
    }
}
