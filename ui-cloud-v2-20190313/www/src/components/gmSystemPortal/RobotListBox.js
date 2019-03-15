import React, { Component } from 'react'
import AuthProvider from '../../funStore/AuthProvider'
import promiseXHR from '../../funStore/ServerFun'
import $ from 'jquery'
import {API_PATH} from '../../constants/OriginName'

export default class RobotListBox extends Component {
    constructor(props) {
        super(props)
    }
    state = {
        robotList: ['liebiao']
    }

    componentWillReceiveProps() {
        // console.log(this.props.groupList.chatGroupId)
        if(!this.state.hasOwnProperty('chatGroupId') || this.state.chatGroupId !== this.props.groupList.chatGroupId) {
            this.getRobotsList()
        }
    }

    getRobotsList () {
        const {groupList} = this.props
        this.setState({chatGroupId: groupList.chatGroupId})
        // console.log(this.state.chatGroupId)
        const url = API_PATH+'/groupmsg-api/authsec/group/reply/robot?_groupId=' + groupList.chatGroupId
        AuthProvider.getAccessToken()
        .then((resolve,reject)=>{
            promiseXHR(url,{type:'Bearer',value:resolve},null,'GET')
            .then(res => {
                // console.log(res)
            })
        })
    }

    cutRobot (e) {
        $('.toolSelectList').stop().slideUp()
        if (e.target.getAttribute('status')) {
            $('.modal').fadeIn()
        }
    }

    render () {
        return (
            <div className="toolSelect" onBlur={$('.toolSelectList').stop().slideUp()} onClick={() => {$('.toolSelectList').stop().slideToggle()}}>
                <span>{this.state.robotList[0]}</span><em className="icon-gi"></em>
                <ul className="toolSelectList">
                {/* this.state.robotList.map((item) => { */}
                    <li status='item.status' onClick={(e) => this.cutRobot(e)}>item</li>
                {/* }) */}
                </ul>
                <div className="modal" onClick={(e) => {e.stopPropagation()}}>
                    <div className="modalbox">
                        <p>微信托管已下线</p>
                        <div className="QRcode">
                            <img src="" alt=""/>
                        </div>
                        <p>请打开托管微信账号的手机扫描二维码，授权登录</p>
                        <p>
                            <span>二维码过期？</span>
                            <span>刷新二维码</span>
                        </p>
                    </div>
                </div>
            </div>
        )
    }
}
    

