import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as TodoActions from '../../actions'
import AuthProvider from '../../funStore/AuthProvider'
import './index.css'
import {tongji} from '../../funStore/tongji'
/* global location */
/* eslint no-restricted-globals: ["off", "location"] */

class MonitorStatus extends Component {
    constructor(props){
        super(props)
        this.state = {
            stateBoxShow: false,
            infoBoxShow: false
        }
        this.clickHandle = this.clickHandle.bind(this)
        this.blurHandle = this.blurHandle.bind(this)
        this.logout = this.logout.bind(this)
    }

    clickHandle () {
        this.setState({
            stateBoxShow: !this.state.stateBoxShow
        })
    }
    blurHandle(){
        this.setState({
            stateBoxShow: false
        })
    }
    logout(){
        tongji('Lzc_DengChu')
        try {
            const socket = this.props.socketState.webSocket.state.socket
            socket.close()
        } catch (error) {
            console.log('socket未连接')
        }
        AuthProvider.deleteCookie('access_token')
        AuthProvider.deleteCookie('refresh_token')
        AuthProvider.deleteCookie('webclient_id')
        this.props.turnOffws()
        this.props.actions.goTo('/v2/login?redirect=v2/InitScope')
        this.props.actions.initGroupList()
        this.props.actions.initMemberList()
    }

    goCenter(){
        tongji('Lzc_YongHuZhongXin_enter')
        location.href = location.origin+'/marketPortal/PCScope/account'
    }
    goHelp(){
        tongji('Lzc_BangZuZhongXin_enter')
        window.open(window.location.origin+'/v2/HPScope','_blank')
    }
    goMsgCenter = () =>{
        tongji('Lzc_XiaoXiZhongXin_enter')
        this.props.actions.sysInfoRead()
        if(location.href.includes('/v2/MSScope')) return
        this.props.actions.goTo('/v2/MSScope')
    }
    viewHandle = () => {
        tongji('Lzc_TongZhi')
        this.setState({
            infoBoxShow: !this.state.infoBoxShow
        })
    }
    viewBlurHandle = () => {
        this.setState({
            infoBoxShow: false
        })
    }
    render () {
        const {turnOffws,userInfo,systemInfo} = this.props
        let {stateBoxShow,infoBoxShow} = this.state;
        return  (
            <div className='monitorStateWrapper'>
                <div className='stateTitle' onClick={this.clickHandle} onBlur={this.blurHandle} tabIndex={1}>
                    {userInfo&&userInfo.info.userinfo&&userInfo.info.userinfo.type==0?"我的":"我的"}
                    <div className='monitorStateBox' style={{display:stateBoxShow?'block':'none'}}>
                        <div className='exit' onClick = {this.goCenter}>账户信息</div>
                        <div className='exit' onClick = {this.logout}>退出登录</div>
                    </div>
                </div>
                <div className="newsBox" onClick={this.viewHandle} onBlur={this.viewBlurHandle} tabIndex={1}>通知
                    {systemInfo.unreadCount>0&&<span className="num">{systemInfo.unreadCount<100?systemInfo.unreadCount:'99+'}</span>}
                    <div className="newsList" style={{display:infoBoxShow?'block':'none'}}>
                        <div className='item-title'>消息通知</div>
                        {
                            systemInfo.infoList.length>0?
                            <div>
                                <ul style={{overflow: 'auto',maxHeight:'235px',margin:'0'}}>
                                    {systemInfo.infoList.map((item,i)=>{
                                        return  <li className="item" key={i}>
                                            <p className='title'>{item.title}<br/><span className="time">{item.date.replace('T',' ')}</span></p>
                                            <p className="content">{item.content}</p>
                                        </li>
                                    })}
                                </ul>
                                <div className="item-check" onClick={this.goMsgCenter}>查看更多></div>
                            </div>
                        :
                        <div className="newsList-none">
                            <div className="item-img"></div>
                            <p>暂时没有收到消息哦～</p>
                        </div>
                    }
                    </div>
                </div>
                <div className="helpBox" onClick={this.goHelp}>
                    <span className="icon-home help"></span>帮助中心
                </div>
            </div>
            )
    }
}

const mapStateToProps = state => ({
    socketState: state.socketState,
    systemInfo: state.systemInfo
})
const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(TodoActions, dispatch)
})
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MonitorStatus)
