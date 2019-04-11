import React,{Component} from 'react'
import $ from 'jquery'
import promiseXHR from '../../funStore/ServerFun'
import AuthProvider from '../../funStore/AuthProvider'
import {API_PATH} from '../../constants/OriginName'
import WaringBox from './WaringBox'
import Tag from '../shareComponent/Tag'
// import IptLimit from '../shareComponent/IptLimit'
import {sendEvent} from '../../funStore/CommonFun'

export default class UserOperateNew extends Component {
    constructor(props){
        super(props)
        this.state = {
            waringBoxShow: false,
            authListShow: true,
            initTags: [],
            tags:[],
            remarkName:''
        }
        this.defaultEvent = this.defaultEvent.bind(this)
        this.alertUserHandle = this.alertUserHandle.bind(this)
        this.closeAlertHandle = this.closeAlertHandle.bind(this)
        this.modifyAuth = this.modifyAuth.bind(this)
        this.closeModifyAuth = this.closeModifyAuth.bind(this)
        this.addPrivilegeHandle = this.addPrivilegeHandle.bind(this)
        this.dropPrivilegeHandle = this.dropPrivilegeHandle.bind(this)
        this.blackListHandle = this.blackListHandle.bind(this)
        this.changeSourceType = this.changeSourceType.bind(this)
        this.handleSubmitTag = this.handleSubmitTag.bind(this)
        this.handleDeleteSure = this.handleDeleteSure.bind(this)
        this.setparamsHandle = this.setparamsHandle.bind(this)
        this.setRemarkName = this.setRemarkName.bind(this)
    }
    componentDidMount(){
        $('body').get(0).addEventListener('click',this.defaultEvent)
    }
    componentWillUnmount(){
        $('body').get(0).removeEventListener('click',this.defaultEvent)
    }
    componentWillReceiveProps(nextProps){
        const {userBasicInfo} = this.props
        if((userBasicInfo!=null&&nextProps.userBasicInfo!=null&&userBasicInfo.member.memberId!=nextProps.userBasicInfo.member.memberId)||(userBasicInfo==null&&nextProps.userBasicInfo!=null)){
            let initTags = nextProps.userBasicInfo.member.labelItemList?nextProps.userBasicInfo.member.labelItemList:[]
            let tags = initTags.map(v => v.name)
            let remarkName = nextProps.userBasicInfo.member.remarkName?nextProps.userBasicInfo.member.remarkName:''
            this.setState({
                initTags,tags,remarkName
            })
            this.showLoading()
        }else if(userBasicInfo==null&&nextProps.userBasicInfo!=null){
            this.showLoading()
        }
    }
    showLoading() {
        $('.operate-loading').hide()
    }
    setparamsHandle(k,v){
        if(k=='backname'){
            this.setState({
                remarkName: v
            })
        }
    }
    defaultEvent(e){
        this.closeAlertHandle(e)
        this.closeModifyAuth(e)
    }
    alertUserHandle () {
        this.setState({
            waringBoxShow: !this.state.waringBoxShow
        })
    }
    closeAlertHandle (e) {
        if(e.target.className!='alert'){
            this.setState({
                waringBoxShow: false
            })
        }
    }
    modifyAuth(){
        this.setState({
            authListShow: !this.state.authListShow
        })
    }
    closeModifyAuth(e){
        if(e.target.className!='modifyAuth'){
            this.setState({
                authListShow: false
            })
        }
    }
    handleSubmitTag(tagName){
        const reg = /\ud83c[\udf00-\udfff]|\ud83d[\udc00-\ude4f]|\ud83d[\ude80-\udeff]/g
        if(reg.test(tagName)) this.filterEmojiHandle();
        tagName = tagName.replace(reg,'')
        if(tagName == '') return
        const {initTags,tags} = this.state
        const {groupId,memberId,actions} = this.props
        const url = API_PATH+'/groupadmin-api//authsec/groupadmin/group/'+groupId+'/member/'+memberId+'/label'
        AuthProvider.getAccessToken()
        .then((resolve,reject)=>{
        promiseXHR(url,{type:'Bearer',value:resolve},{'name':tagName},'POST')
        .then((res) =>{
            let data = JSON.parse(res)
            if(data.resultCode==100){
                actions.addMemberTag(memberId,[data.resultContent])
                initTags.push(data.resultContent)
                tags.push(data.resultContent.name)
                this.setState({initTags,tags})
            }
        })
        })
    }
    handleDeleteSure(index){
        const {groupId,memberId,actions} = this.props
        const {initTags} = this.state
        let labelid = initTags[index].id
        const url = API_PATH+'/groupadmin-api/authsec/groupadmin/group/'+groupId+'/member/'+memberId+'/label/'+labelid
        AuthProvider.getAccessToken()
            .then((resolve, reject) => {
                promiseXHR(url, {
                        type: 'Bearer',
                        value: resolve
                    }, null, 'DELETE')
                    .then((res) => {
                        let data = JSON.parse(res)
                        if (data.resultCode == 100) {
                            actions.deleteMemberTag(memberId, labelid)
                            initTags.splice(index,1)
                            this.setState({initTags})
                        }
                    })
            })
    }
    setRemarkName(){
        const {remarkName} = this.state
        const {groupId,memberId} = this.props
        const url = `${API_PATH}/groupmsg-api/authsec/group/${groupId}/immem/${memberId}/label/note?remarkName=${remarkName}`
        AuthProvider.getAccessToken()
            .then((resolve, reject) => {
                promiseXHR(url, {
                        type: 'Bearer',
                        value: resolve
                    }, null, 'PUT')
                    .then((res) => {
                        let data = JSON.parse(res)
                        if (data.resultCode == 100) {
                            
                        }
                    })
            })
    }
    addPrivilegeHandle(){
        const member = this.props.userBasicInfo.member
        const paramas = {
            addMemberPrivilege: member.addMemberPrivilege==0?1:0
        }
        AuthProvider.getAccessToken()
        .then((resolve,reject)=>{
            const url = API_PATH + '/groupadmin-api/authsec/memberprivilege/group/'+member.groupId+'/member/'+member.memberId
            promiseXHR(url,{type:'Bearer',value:resolve},paramas,'PUT')
            .then(res => {
                const resData = JSON.parse(res)
                if(resData.resultCode==100){
                    this.props.changePrivilegeHandle('addMemberPrivilege',paramas.addMemberPrivilege)
                    sendEvent('message', {txt: "群成员权限操作成功",code: 1000})
                }else{
                    sendEvent('message', {txt: "您没有群主的权限，请先去完成群主托管",code: 1003})
                }
            })
        })
    }

    dropPrivilegeHandle(){
        const member = this.props.userBasicInfo.member
        const paramas = {
            dropMemberPrivilege: member.dropMemberPrivilege==0?1:0
        }
        AuthProvider.getAccessToken()
        .then((resolve,reject)=>{
            const url = API_PATH + '/groupadmin-api/authsec/memberprivilege/group/'+member.groupId+'/member/'+member.memberId
            promiseXHR(url,{type:'Bearer',value:resolve},paramas,'PUT')
            .then(res => {
                const resData = JSON.parse(res)
                if(resData.resultCode==100){
                    this.props.changePrivilegeHandle('dropMemberPrivilege',paramas.dropMemberPrivilege)
                    sendEvent('message', {txt: "群成员权限操作成功",code: 1000})
                }else{
                    sendEvent('message', {txt: "您没有群主的权限，请先去完成群主托管",code: 1003})
                }
            })
        })
    }
    blackListHandle(){
        const member = this.props.userBasicInfo.member
        const action = member.isBlackList == 0?'add':'remove'
        AuthProvider.getAccessToken()
        .then((resolve,reject)=>{
            const url = API_PATH + '/groupadmin-api/authsec/memberprivilege/member/'+member.memberId+'/blacklist?action='+action
            promiseXHR(url,{type:'Bearer',value:resolve},null,'PUT')
            .then(res => {
                const resData = JSON.parse(res)
                if(resData.resultCode==100){
                    this.props.changePrivilegeHandle('isBlackList',member.isBlackList == 0?1:0)
                    sendEvent('message', {txt: "群成员权限操作成功",code: 1000})
                }else{
                    sendEvent('message', {txt: "您没有群主的权限，请先去完成群主托管",code: 1003})
                }
            })
        })
    }
    changeSourceType(){
        const member = this.props.userBasicInfo.member
        const paramas = {
            sourceType: member.sourceType==0?1:0
        }
        AuthProvider.getAccessToken()
        .then((resolve,reject)=>{
            const url = API_PATH+'/groupadmin-api/authsec/memberprivilege/group/'+member.groupId+'/member/'+member.memberId
            promiseXHR(url,{type:'Bearer',value:resolve},paramas,'PUT')
            .then(res => {
                const resData = JSON.parse(res)
                if(resData.resultCode==100){
                    this.props.changePrivilegeHandle('sourceType', paramas.sourceType)
                    sendEvent('message', {txt: "群成员权限操作成功",code: 1000})
                }else{
                    sendEvent('message', {txt: "您没有群主的权限，请先去完成群主托管",code: 1003})
                }
            })
        })
    }
    render(){
        const {waringBoxShow,authListShow,tags,initTags,remarkName} = this.state
        const {socket,groupId,memberId,iconPath,userBasicInfo,showTipBoxHandle,altMember,getMesgByMemebr,selectMemberId,selectRoom,groupList,actions} = this.props
        return (
            <div className="gm-userOperateNew">
                <div className="baseInfo">
                    <img src={iconPath}/>
                    <span className="nickName">{userBasicInfo==null?'':userBasicInfo.member.nickName}</span>
                    <span className="icon-gm icon-level"></span>
                    <span className="num">{userBasicInfo==null?0:userBasicInfo.member.level}</span>
                </div>
                <div className="backname">
                    <div className="label">备注名：</div>
                    <div className='IptLimit'>
                        <div className="content" style={{ width: '280px' }}>
                            <input className="input" type="text" value={remarkName} maxLength={16} placeholder={'请输入'} onChange={(e)=>{e.target.value.length<17&&this.setparamsHandle('backname',e.target.value)}}  onBlur={this.setRemarkName}/>
                            <span className="num">{remarkName.length}/{16}</span>
                        </div>
                    </div>
                </div>
                <div className="tagName">
                    <div className="label">标签：</div>
                    <div className="tagBox">
                        <Tag
                            text={'添加标签'}
                            style={{
                                background: '#FFFFFF',
                                borderRadius: '12px',
                                border:'0 none',
                                fontFamily: 'PingFang SC',
                                fontSize: '14px',
                                color: '#485767',
                                lineHeight:'24px',
                                height: '24px',
                                marginBottom:'8px'
                            }}
                            btnStyle={{
                                background: '#FFFFFF',
                                borderRadius: '12px',
                                border:'0 none',
                                fontFamily: 'PingFang SC',
                                fontSize: '14px',
                                color: '#B5BDC6',
                                lineHeight:'24px',
                                height: '24px',
                                marginBottom:'8px'
                            }}
                            limit={10}
                            tags={tags}
                            onAdd={this.handleSubmitTag}
                            onDel={this.handleDeleteSure}
                            options={userBasicInfo==null?'':userBasicInfo.member.memberId}
                        />
                    </div>
                </div>
                <div className="footer">
                    <div className="alertBox">
                        <div className="icon-gm icon alert" onClick={this.alertUserHandle}></div>
                        <div className="tipBox">警告</div>
                        <WaringBox
                            socket={socket.state==undefined?null:socket.state.socket}
                            waringBoxShow={waringBoxShow}
                            groupId={groupId}
                            groupList={groupList}
                            memberId={memberId}
                            memCode={userBasicInfo==null?'':userBasicInfo.member.memberCode}
                        />
                    </div>
                    <div className="historyBox" onClick={() => {
                        getMesgByMemebr(memberId)
                        selectMemberId(memberId)
                        selectRoom('MEMBER')
                    }}>
                        <div className="icon-gm icon history"></div>
                        <div className="tipBox">消息</div>
                    </div>
                    <div className="modifyAuth" onClick={this.modifyAuth}>
                        <div className="icon-gm icon more"></div>
                        <div className="tipBox">更多</div>
                        <div className="authList" style={{display:authListShow?'block':'none'}}>
                            <ul>
                                <li onClick={this.changeSourceType}>
                                    {userBasicInfo==null?'':userBasicInfo.member.sourceType==0?'转为私拉':'转为正常'}
                                </li>
                                <li onClick={this.addPrivilegeHandle}>
                                    {userBasicInfo==null||userBasicInfo.member.addMemberPrivilege==0?'赋予拉人权限':'取消拉人权限'}
                                </li>
                                <li onClick={this.dropPrivilegeHandle}>
                                    {userBasicInfo==null||userBasicInfo.member.dropMemberPrivilege==0?'赋予踢人权限':'取消踢人权限'}
                                </li>
                                <li onClick={showTipBoxHandle}>踢出该群</li>
                                <li onClick={this.blackListHandle}>
                                    {userBasicInfo==null||userBasicInfo.member.isBlackList==0?'加入黑名单':'取消黑名单'}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="operate-loading" style={{display:'none'}}>
                    <img src={`${process.env.PUBLIC_URL}/images/icon/loading.svg`} alt=""/>
                </div>
            </div>
        )
    }
}