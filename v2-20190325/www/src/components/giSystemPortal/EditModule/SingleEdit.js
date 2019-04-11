import React,{Component} from 'react'
import './index.css'
import ButtonBox from '../../shareComponent/ButtonBox'
import UploadBtn from '../../shareComponent/UploadBtn'
import SearchFuzzy from '../../shareComponent/searchFuzzy'
import {Groupname,Welcome,PicText, Admin,GroupInform,Keyword,GroupLabel,CommonInput,MemberCountSmall,CommonSelect,CommonRadio,RobotName} from './unit'
import {API_PATH} from '../../../constants/OriginName'
import AuthProvider from '../../../funStore/AuthProvider'
import promiseXHR from '../../../funStore/ServerFun' 
import {textCountRange,sendEvent} from '../../../funStore/CommonFun' 
import LoadingAnimationS from '../../shareComponent/LoadingAnimationS' 
import {tongji} from '../../../funStore/tongji'
// import {mocaInfo} from '../mocaData'

/* welcomeMsgResp: {
    "welcomeMsgReq": {
        "status": 1,
        "items": [{
            "content": "",
            "files": [{
                "fileId": "",
                "seqNo": 0,
                "fileType": "image",
                "id": ""
            }],
            "type": 0,
            "seqNo": 0
        }]
    },
    "welcomeMsgInterval": 5,
    "messageGroupsMap": {
        "groupId": []
    }
} */

const welcomeMsgTemplate = {
    "welcomeMsgReq": {
        "status": 1,
        "items": [{
            "content": "",
            "files": [
            ],
            "type": 0,
            "seqNo": 0
        }]
    },
    "welcomeMsgInterval": 5,
    "messageGroupsMap": {
        "groupId": []
    }
}

export default class EditModule extends Component {
    constructor(props){
        super(props)
        this.state = {
            params: {},
            loading: true,
            submiting: false
        }
    }
    componentDidMount(){
        const {groupId} = this.props
        const url = `${API_PATH}/groupadmin-api/authsec/groupadmin/groupmgmt/${groupId}/detail?type=1`
        AuthProvider.getAccessToken()
        .then((resolve,reject)=>{
            // 获取群详情
            return promiseXHR(url,{type:'Bearer',value:resolve},null,'get')
        }).then(res => {
            const resData = JSON.parse(res)
            // const resData = mocaInfo
            if(resData.resultCode=='100'){
                let data = resData.resultContent
                if(data.welcomeMsgResp==null){
                    data.welcomeMsgResp = Object.assign({},welcomeMsgTemplate)
                    data.welcomeMsgResp.messageGroupsMap.groupId.push(groupId)
                }
                this.setState({
                    params: data,
                    loading: false
                })
                return data.h5JGTemplateId
            }else{
                throw '获取群信息失败'
            }
        }).catch(err => {
            console.log(err)
        })

        // then(id => {
        //     // 通过模板id获取群规则
        //     const url = `${API_PATH}/groupadmin-api/authsec/grouprules/types?sourceTemplateId=${id}`
        //     return AuthProvider.getAccessToken().then((resolve,reject)=>{
        //         return promiseXHR(url,{type:'Bearer',value:resolve},null,'get')
        //     })
        // }).then(res => {
        //     let data = JSON.parse(res)
        //     if(data.resultCode=='100'){
        //         let rules = data.resultContent.map(v => {
        //            return  {
        //                 name: v.ruleTypeName,
        //                 id: v.id
        //             }
        //         })
        //         this.setState({rules})
        //     }else{
        //         throw '获取群规则失败'
        //     }
        // })
    }
    setparamsHandle=(k,v)=>{
        let {params} = this.state
        params[k] = v
        this.setState({params})
    }
    setGroupMgmtResp=(k,v) => {
        // 设置群相关信息
        let {params} = this.state
        params.groupMgmtResp[k] = v
        this.setState({params})
    }
    setProtectInfo=(k) => {
        let {params} = this.state
        switch (k) {
            case 'openInJoin':
                params.groupMgmtResp.protectInfo.openInJoin = params.groupMgmtResp.protectInfo.openInJoin==1?0:1
                break;
        
            case 'openInLinkUrl':
                params.groupMgmtResp.protectInfo.openInLinkUrl = params.groupMgmtResp.protectInfo.openInLinkUrl==1?0:1
                break;

            case 'openInMiniPro':
                params.groupMgmtResp.protectInfo.openInMiniPro = params.groupMgmtResp.protectInfo.openInMiniPro==1?0:1
                break;
            default:
                break;
        }
        this.setState({params})
    }
    setGroupRobotItem=(k,v) => {
        // 设置群机器人信息
        let {params} = this.state
        params.groupRobotItem[k] = v
        this.setState({params})
    }
    setWelcomeMsgResp = (k,v) => {
        // 设置欢迎语相关信息
        let {params} = this.state
        switch (k) {
            case 'image':
                if(v===''){
                    params.welcomeMsgResp.welcomeMsgReq.items[0].files = []
                }else{
                    let file = {
                        "fileId": v,
                        "seqNo": 0,
                        "fileType": "image"
                    }
                    params.welcomeMsgResp.welcomeMsgReq.items[0].files[0] = file
                }
                break;
            case 'text':
                params.welcomeMsgResp.welcomeMsgReq.items[0].content = v
                break;
            case 'time':
                params.welcomeMsgResp.welcomeMsgInterval = v
                break;
            default:
                break;
        }
        this.setState({params})
    }
    addTag = (k,v)=>{
        let params = this.state.params
        // 标签 { "name": v,"type":'1',"visible":true}
        // 关键字 {"name": v}
        if(params[k]){
            params[k].push({
                "name": v,
                "type":'1',
                "visible":true
            })
        }else{
            params[k]=[{
                "name": v,
                "type":'1',
                "visible":true
            }]
        }
        this.setState({params})
    }
    delTag = (k,i) => {
        let params = this.state.params
        params[k].splice(i,1)
        this.setState({params})
    }
    handleAutoComParamas=(name, id, paramasValue,type) =>{
        // 替换群模糊查询
        // console.log(name, id, paramasValue,type)
        let {params} = this.state
        if(params.groupMgmtResp){
            params.groupMgmtResp.fullReplaceGroupId = id
            params.groupMgmtResp.fullReplaceGroupName = name
            this.setState({params})
        }
    }
    updateInfo= ()=>{
        const {groupId} = this.props
        const {submiting} = this.state
        let params = Object.assign({},this.state.params)
        const url = `${API_PATH}/groupadmin-api/authsec/groupadmin/groupmgmt/${groupId}?type=1`
        if(submiting) return
        if (!params.groupMgmtResp.name) {
            sendEvent('message', {
                txt: "请填写群名称",
                code: 1004
            })
            return
        } 
        if (params.monitors.length==0) {
            sendEvent('message', {
                txt: "请填写群管理员",
                code: 1004
            })
            return
        }
        if(params.welcomeMsgResp.welcomeMsgInterval<5){
            sendEvent('message', {
                txt: "欢迎语重复推送时间不能少于5分钟！",
                code: 1004
            })
            return
        }
        if(params.groupMgmtResp.welcomeMsgFlag!=1){
            delete params.welcomeMsgResp
        }
        if(params.groupMgmtResp.protectStatus==1&&params.groupMgmtResp.protectInfo.openInJoin==0&&params.groupMgmtResp.protectInfo.openInLinkUrl==0&&params.groupMgmtResp.protectInfo.openInMiniPro==0){
            sendEvent('message', {
                txt: "请选择护群功能触发条件！",
                code: 1004
            })
            return
        }
        this.setState({submiting: true})
        sendEvent('message', {
            txt: "正在保存群信息",
            code: 1000
        })
        tongji('Lzc_QunGuanLi_DanGeBianJi')
        AuthProvider.getAccessToken()
        .then((resolve,reject)=>{
            return promiseXHR(url,{type:'Bearer',value:resolve},params,'put')
        }).then(res =>{
            const resData = JSON.parse(res)
            if(resData.resultCode=='100'){
                this.setState({submiting: false})
                this.props.goEditHandle()
                this.props.refreshFunc()
                sendEvent('message', {
                    txt: "信息编辑成功，重新刷新页面才能看到哦~",
                    code: 1000
                })
            }else{
                throw resData.resultCode
            }
        }).catch(err => {
            let errTxt = '服务异常'
            switch(err)
            {
                case '02505021':
                errTxt = '群不存在'
                break;
                case '02505131':
                errTxt = '班长数量大于3个'
                break;
                case '02505132':
                errTxt = '标签数量大于10个'
                break;
                case '02505023':
                errTxt = '群名重复'
                break;
                case '02505024':
                errTxt = '群名非法'
                break;
                case '02505020':
                errTxt = '更新异常'
                break;
                case '100':
                errTxt = '成功'
                break;
                case '101':
                errTxt = '服务异常'
                break;
            }
            sendEvent('message', {
                txt: errTxt,
                code: 1004
            })
            this.setState({submiting: false})
        })
    }
    closeHandle = () => {
        const {submiting} = this.state
        !submiting&&this.props.goEditHandle()
    }
    render(){
        const {params,loading,submiting} = this.state
        const {goEditHandle,groupId} = this.props
        // console.log(params)
        return (
            <div className="modalWrapper">
                <div className="editBox" style={{height:'872px',transform: 'scale(1)'}}>
                    <div className="header">编辑群信息</div>
                    {
                        loading
                        ?<LoadingAnimationS />
                        :<div className="public-edit content clearfix">
                        <div className="left">
                            <Groupname 
                                value = {params.groupMgmtResp&&params.groupMgmtResp.name}
                                length = {params.groupMgmtResp?textCountRange(params.groupMgmtResp.name):0}
                                paramName = {'name'}
                                setparamsHandle = {this.setGroupMgmtResp}
                            />
                            <CommonInput 
                                options ={{
                                    label:'群编号：',
                                    placeholder: '请输入'
                                }}
                                value = {params.groupMgmtResp&&params.groupMgmtResp.innerId}
                                paramName = {'innerId'}
                                setparamsHandle = {this.setGroupMgmtResp}
                            />
                            <MemberCountSmall 
                                memberCount = {params.groupMgmtResp&&params.groupMgmtResp.memberCount}
                                memberLimitCount = {params.groupMgmtResp&&params.groupMgmtResp.memberLimitCount}
                                paramName = {'memberLimitCount'}
                                setparamsHandle = {this.setGroupMgmtResp}
                            />
                            <CommonRadio 
                                options={{
                                    label:'入群状态：'
                                }}
                                sourceData={[{name:'正常入群',value:1},{name:'暂停入群',value:2}]}
                                paramName={'enterGroupStatus'}
                                value={params.groupMgmtResp?params.groupMgmtResp.enterGroupStatus:1}
                                setparamsHandle={this.setGroupMgmtResp}
                            />
                            <CommonSelect 
                                options = {{
                                    label:'满群替换：',
                                    placeholder:"请选择",
                                    width:300,
                                    selectOption:['替换','不替换'],
                                    paramName:'fullReplace',
                                    paramaValue:[1,0]
                                }}
                                defaultValue = {params.groupMgmtResp&&params.groupMgmtResp.fullReplace}
                                setparamsHandle = {this.setGroupMgmtResp}
                                isDisabled={!params.joinGroupRuleId?true:(params.joinGroupRuleType==1)}
                            />
                            <div className="row" style={{paddingLeft:'20px'}}>
                                <SearchFuzzy
                                    option={{
                                        placeholder: '请输入',
                                        label: '替换群名：',
                                        defaultValue: params.groupMgmtResp?params.groupMgmtResp.fullReplaceGroupName:'',
                                        keyName: 'name',//返回值获取的key
                                        keyId: 'id',//返回值获取id的key
                                        keyShow: 'showName',//展示值，固定
                                        paramName: 'content', //搜索时传递的参数名
                                        paramasValue: 'fullReplaceGroupId',//设置id的key值
                                        url: API_PATH+'/groupadmin-api/authsec/groupadmin/tenant/groups?_page=0&_size=20',
                                        method: 'POST',
                                        data:{"bizType":2,"contentType":1,"content":params.groupMgmtResp?params.groupMgmtResp.fullReplaceGroupName:''},
                                        uploadId: true,
                                        style: {width: '300px', height: '36px', lineHeight: '36px'},
                                        disabledStyle: {background: 'rgb(247, 248, 249)'},
                                        labelStyle: {marginRight: '0px',marginTop:'-3px'}
                                    }}
                                    handleAutoComParamas={this.handleAutoComParamas}
                                    getDataReport={()=>{}}
                                    isDisabled={!params.joinGroupRuleId?true:params.joinGroupRuleType==1?true:!(params.groupMgmtResp&&params.groupMgmtResp.fullReplace)}
                                />
                            </div>
                            {/* <CommonRadio 
                                options={{
                                    label:'护群功能：'
                                }}
                                hasTip={true}
                                tipText={'护群功能只适用于有模板的群，开启护群后，若用户私自拉人入群，小助手会@被拉入的用户并发出警告。'}
                                sourceData={[{name:'启用',value:1},{name:'关闭',value:0}]}
                                paramName={'protectStatus'}
                                value={params.groupMgmtResp?params.groupMgmtResp.protectStatus:1}
                                setparamsHandle={this.setGroupMgmtResp}
                            /> */}
                            <CommonSelect 
                                options = {{
                                    label:'护群功能：',
                                    placeholder:"请选择",
                                    width:300,
                                    selectOption:['开启','关闭'],
                                    paramName:'protectStatus',
                                    paramaValue:[1,0]
                                }}
                                hasTip={true}
                                tipText={'护群功能只适用于有模板的群，开启护群后，若用户私自拉人入群，小助手会@被拉入的用户并发出警告。'}
                                defaultValue = {params.groupMgmtResp?params.groupMgmtResp.protectStatus:0}
                                setparamsHandle = {this.setGroupMgmtResp}
                            />
                            {
                                params.groupMgmtResp&&params.groupMgmtResp.protectStatus==1
                                ?<div className="row">
                                    <div className="label"></div>
                                    <div className="checkWrapper">
                                        <div className="checkItem">
                                            <div className={`${params.groupMgmtResp.protectInfo.openInJoin==1?'checked':''} checkBox`} onClick={()=>{this.setProtectInfo('openInJoin')}}></div>
                                            <div className="text">入群时</div>
                                        </div>
                                        <div className="checkItem">
                                            <div className={`${params.groupMgmtResp.protectInfo.openInLinkUrl==1?'checked':''} checkBox`} onClick={()=>{this.setProtectInfo('openInLinkUrl')}}></div>
                                            <div className="text">发送链接</div>
                                        </div>
                                        <div className="checkItem">
                                            <div className={`${params.groupMgmtResp.protectInfo.openInMiniPro==1?'checked':''} checkBox`} onClick={()=>{this.setProtectInfo('openInMiniPro')}}></div>
                                            <div className="text">发送小程序</div>
                                        </div>
                                    </div>
                                </div>
                                :''
                            }
                            <RobotName 
                                options ={{
                                    label:'助手群昵称：',
                                    placeholder: '请输入'
                                }}
                                value = {params.groupRobotItem&&params.groupRobotItem.name}
                                code = {params.groupRobotItem&&params.groupRobotItem.imCode}
                                paramName={'name'}
                                setparamsHandle={this.setGroupRobotItem}
                            />
                            <Welcome 
                                value={params.groupMgmtResp?params.groupMgmtResp.welcomeMsgFlag:''}
                                defaultValue = {params.groupMgmtResp?params.groupMgmtResp.welcomeMsgFlag:''}
                                setparamsHandle={this.setGroupMgmtResp}
                                welcomeMsgInterval={params.welcomeMsgResp&&params.welcomeMsgResp.welcomeMsgInterval}
                                setWelcomeMsgResp={this.setWelcomeMsgResp}
                            />
                            {
                                params.groupMgmtResp&&params.groupMgmtResp.welcomeMsgFlag==1
                                ?<PicText  
                                    welcomeMsgResp={params.welcomeMsgResp}
                                    length={textCountRange(params.welcomeMsgResp.welcomeMsgReq.items[0].content)}
                                    setparamsHandle={this.setWelcomeMsgResp}
                                />
                                :''
                            }
                        </div>
                        <div className="right">
                            {/* <CommonSelect 
                                options = {{
                                    label:'入群规则：',
                                    placeholder:"请选择",
                                    width:374,
                                    selectOption:rules.map(v=> v.name),
                                    paramName:'joinGroupRuleId',
                                    paramaValue:rules.map(v=> v.id)
                                }}
                                defaultValue = {params.joinGroupRuleId}
                                setparamsHandle={this.setparamsHandle}
                            /> */}
                            <div className="row">
                                <div className="label">入群规则：</div>
                                <div className="">{params.joinGroupRuleName?params.joinGroupRuleName:'暂无'}</div>
                            </div>
                            <Admin 
                                monitors={params.monitors?params.monitors:[]}
                                paramName = {'monitors'}
                                setparamsHandle={this.setparamsHandle}
                            />
                            <GroupInform
                                value={params.groupMgmtResp&&params.groupMgmtResp.introduce}
                                paramName={'introduce'}
                                length={params.groupMgmtResp?textCountRange(params.groupMgmtResp.introduce?params.groupMgmtResp.introduce:''):0}
                                setparamsHandle={this.setGroupMgmtResp}
                            />
                            {/* <Keyword 
                                keywordSimpleItems={params.keywordSimpleItems?params.keywordSimpleItems:[]}
                                paramName={'keywordSimpleItems'}
                                addTag={this.addTag}
                                delTag={this.delTag}
                            /> */}
                            <GroupLabel 
                                groupLabelProfiles={params.groupLabelProfiles?params.groupLabelProfiles:[]}
                                paramName={'groupLabelProfiles'}
                                addTag={this.addTag}
                                delTag={this.delTag}
                            />
                            <div className="buttonArea" style={{marginTop:'305px'}}>
                                <UploadBtn 
                                    loading={submiting}
                                    text={"确定"}
                                    loadingText={"确定"}
                                    clickHandle={this.updateInfo}
                                    propsStyle={{
                                        width:'108px',
                                        height:'36px',
                                        float:'right',
                                        fontWeight:400,
                                    }}
                                />
                                <ButtonBox 
                                    btnTxt={'取消'}
                                    isCancel={true}
                                    btnStyle={{
                                        float:'right',
                                        marginRight:'30px',
                                        fontWeight:400
                                    }}
                                    btnFunc={goEditHandle}
                                />
                            </div>
                        </div>
                    </div>
                    }
                    <div className="closeBtn" onClick={this.closeHandle}></div>
                </div>
            </div>
        )
    }
}