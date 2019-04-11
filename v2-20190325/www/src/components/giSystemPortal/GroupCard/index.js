import React, { Component } from 'react'
import './index.css'
import {tongji} from '../../../funStore/tongji'
import AuthProvider from "../../../funStore/AuthProvider";
import promiseXHR from "../../../funStore/ServerFun";
import {sendEvent} from "../../../funStore/CommonFun";
import {API_PATH} from "../../../constants/OriginName";

export default class GroupC extends Component {
    constructor() {
        super();
        this.state = {
            qrcodeShow:false,
            groupCode: ''
        }
    }
    selectFunc = (e) => {
        // console.log(e)
    }
    componentWillMount () {
        const {group} = this.props
        this.setState({groupCode:group.qrCode})
    }
    shouldComponentUpdate(nextProps, nextState){
        // 避免不必要的render
        const {batchFlag,group} = this.props
        // this.setState({group})
        const {qrcodeShow,groupCode} = this.state
        if(nextProps.batchFlag!==batchFlag||group.select!==nextProps.group.select||group.enterGroupStatus!=nextProps.group.enterGroupStatus||nextState.qrcodeShow != qrcodeShow||nextState.groupCode != groupCode){
            return true
        }else{
            return false
        }
    }
    goToMember = (e,id,name,matchStatus,groupCode) => {
        e.stopPropagation()
        this.props.actions.goTo('/v2/GIScope/member/'+id+'/'+name+'/'+matchStatus+'/'+groupCode)
        tongji('Lzc_QunGuanLi_ChaKanChengYuan')
    }
    changeQRcodeShow = () => {
        this.setState({qrcodeShow: !this.state.qrcodeShow})
    }
    refreshQRcode = () => {
        let {group} = this.props
        let url = API_PATH + '/groupadmin-api/authsec/groupmgmt/group/qrcode/refresh?groupId='+group.id+'&isRefresh=true'
        AuthProvider.getAccessToken().then((resolve,reject) => {
            return promiseXHR(url,{type:'Bearer',value:resolve},null,'get')
        }).then(res => {
            let resData = JSON.parse(res)
            if(resData.resultCode=='100'){
                this.setState({groupCode: resData.resultContent})
                sendEvent('message', {txt: '刷新成功', code: 1000})
            }
        }).catch(err => {
            sendEvent('message', {txt: '刷新失败', code: 1004})
        })
    }
    render() {
        const {batchFlag,goEditHandle,checkGroup,group} = this.props
        let {qrcodeShow,groupCode} = this.state
        return (
            <div className="groupItem" onClick={()=>{batchFlag&&checkGroup(group.id)}}>
                <div className="title-content">
                    <div className="title">
                        <span className="img backGroupIcon"></span>
                        <span className="text">{group.name}</span>
                        {
                            batchFlag ? <span className={group.select ? 'select active backGroupIcon' : 'select  backGroupIcon'}></span> : ''
                        }
                    </div>
                </div>
                <div className="content">
                    <div className='contentItem'>
                        <aside className='left'>
                            <span style={{ fontWeight:400 }}>群成员(人)：</span>
                            <span className="leftData">{group.memberCount}</span>
                        </aside>
                        {
                            group.matchStatus==1?
                            <aside className='groupDes warning'>
                                群主待转移
                            </aside>:
                                group.sourceType==3?
                                    <aside className='groupDes warning'>
                                        未验证
                                        <div className="tip">请尽快在群内发送验证码</div>
                                    </aside> 
                                    :group.enterGroupStatus!==1
                                    ?<aside className={group.enterGroupStatus === 3 ? 'groupDes error' : 'groupDes warning'}>
                                        {group.enterGroupStatus  === 3 ? "已满群" : "暂停入群"}
                                    </aside> 
                                    : ''
                        }
                    </div>
                    <div className='contentItem'>
                        <aside className='left'>
                            <span style={{ fontWeight:400 }}>新增人数：</span>
                            <span className="leftData" style={{marginRight:'20px'}}>{group.joinPeopleNumber}</span>
                            <span style={{ fontWeight:400 }}>退群人数：</span>
                            <span className="leftData">{group.exitPeopleNumber}</span>
                        </aside>
                        {
                            group.memberCount<100?
                            <aside className='groupCode' tabIndex='0' onFocus={this.changeQRcodeShow} onBlur={this.changeQRcodeShow}>
                                <div className="previewBox" style={{display: qrcodeShow?'block':'none'}}>
                                    {
                                        groupCode
                                        ?<img src={groupCode}/>
                                        :<div className='altTxt'>暂无二维码<br/>点击下方按钮刷新</div>
                                    }
                                    <p className="previewBox-refresh" onClick={this.refreshQRcode}>刷新二维码</p>
                                </div>
                            </aside>
                            :''
                        }
                    </div>
                </div>
                <div className='footers' style={{ height: !batchFlag ? '39px' : '0px' ,overflow: !batchFlag ? 'visible' : 'hidden' }}>
                    <div className="footerItem" style={{cursor:group.sourceType!=3?'cursor':'not-allowed'}}>
                        <span className='backGroupIcon person'></span>
                        <span onClick={(e)=>{group.sourceType!=3&&this.goToMember(e,group.id,group.name,group.matchStatus,group.groupCode)}}>
                            {group.matchStatus!=1?'查看群员':'设置群主'}
                            {group.matchStatus!=1?'':<span className="tip">将群主转给指定群成员</span>}
                        </span>
                    </div>
                    <div className='footerLine'></div>
                    <div className="footerItem" style={{cursor:group.sourceType!=3?'cursor':'not-allowed'}} onClick={(e)=>{e.stopPropagation();group.sourceType!=3&&goEditHandle(group.id)}}>
                        <span className='backGroupIcon edit'></span>
                        <span>编辑</span>
                    </div>
                </div>
            </div>
        )
    }
}