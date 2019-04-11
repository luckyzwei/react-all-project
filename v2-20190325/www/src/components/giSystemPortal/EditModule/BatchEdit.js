import React,{Component} from 'react'
import './index.css'
import ButtonBox from '../../shareComponent/ButtonBox'
import UploadBtn from '../../shareComponent/UploadBtn'
import {Nickname,MemberCount,CommonRadio,Welcome,PicText, Admin,GroupInform,Keyword,GroupLabel,CommonSelect} from './unit'
import {textCountRange,sendEvent} from '../../../funStore/CommonFun'
import {API_PATH} from '../../../constants/OriginName'
import AuthProvider from '../../../funStore/AuthProvider'
import promiseXHR from '../../../funStore/ServerFun'
import {tongji} from '../../../funStore/tongji'

export default class EditModule extends Component {
    constructor(props){
        super(props)
        this.state = {
            params: {
                "protectStatus": 0,// 0 关闭 1 开启 ,
                "protectInfo":{
                    "openInJoin":0,
                    "openInLinkUrl":0,
                    "openInMiniPro":0
                },
                "groupIds": props.groupIds,
                "introduce": "",
                "keywords": [],//{name:''}
                "labels": [],//{name:'',type:'1'}
                "memberLimitCount": 480,
                "monitorIds": [],
                "robotName": "",
                "welcomeMsgFlag": 0, //1为开，0为关 ,
                "welcomeMsgResp": {
                  "messageGroupsMap": {"groupId": props.groupIds},
                  "welcomeMsgInterval": 5,
                  "welcomeMsgReq": {
                    "id":null,
                    "status":null,
                    "items": [{
                        "content": "",
                        "files": [],
                        "seqNo":0,
                        "type":0
                      }]
                  }
                }
            },
            submiting: false
        }
    }
    setparamsHandle=(k,v)=>{
        let {params} = this.state
        if(k=='monitorIds'){
            params[k] = v.map(v => v.id)
        }else{
            params[k] = v
        }
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
    setProtectInfo = (k)=>{
        let {params} = this.state
        switch (k) {
            case 'openInJoin':
                params.protectInfo.openInJoin = params.protectInfo.openInJoin==1?0:1
                break;
        
            case 'openInLinkUrl':
                params.protectInfo.openInLinkUrl = params.protectInfo.openInLinkUrl==1?0:1
                break;

            case 'openInMiniPro':
                params.protectInfo.openInMiniPro = params.protectInfo.openInMiniPro==1?0:1
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

    updateInfo= ()=>{
        const {submiting} = this.state
        let params = Object.assign({},this.state.params)
        const url = `${API_PATH}/groupadmin-api/authsec/groupadmin/groupmgmts`
        if(submiting) return
        if (params.monitorIds.length==0) {
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
        if(params.protectStatus==1&&params.protectInfo.openInJoin==0&&params.protectInfo.openInLinkUrl==0&&params.protectInfo.openInMiniPro==0){
            sendEvent('message', {
                txt: "请选择护群功能触发条件！",
                code: 1004
            })
            return
        }
        if(params.welcomeMsgFlag!=1){
            delete params.welcomeMsgResp
        }
        this.setState({submiting: true})
        sendEvent('message', {
            txt: "正在保存群信息",
            code: 1000
        })
        tongji('Lzc_QunGuanLi_PiLiangBianJi')
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
        const {params,submiting} = this.state
        const {goEditHandle} = this.props
        return (
            <div className="modalWrapper">
                <div className="editBox">
                    <div className="header">批量操作</div>
                    <div className="public-edit content clearfix">
                        <div className="left">
                            <Nickname 
                                value = {params.robotName}
                                length = {textCountRange(params.robotName)}
                                paramName = {'robotName'}
                                setparamsHandle = {this.setparamsHandle}
                            />
                            <MemberCount 
                                value = {params.memberLimitCount}
                                paramName = {'memberLimitCount'}
                                setparamsHandle = {this.setparamsHandle}
                            />
                            {/* <CommonRadio 
                                options={{
                                    label:'群用户私拉：'
                                }}
                                sourceData={[{name:'允许',value:1},{name:'禁止',value:0}]}
                                paramName={'protectStatus'}
                                value={params.protectStatus}
                                setparamsHandle={this.setparamsHandle}
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
                                defaultValue = {params.protectStatus}
                                setparamsHandle = {this.setparamsHandle}
                            />
                            {
                                params.protectStatus==1
                                ?<div className="row">
                                    <div className="label"></div>
                                    <div className="checkWrapper">
                                        <div className="checkItem">
                                            <div className={`${params.protectInfo.openInJoin==1?'checked':''} checkBox`} onClick={()=>{this.setProtectInfo('openInJoin')}}></div>
                                            <div className="text">入群时</div>
                                        </div>
                                        <div className="checkItem">
                                            <div className={`${params.protectInfo.openInLinkUrl==1?'checked':''} checkBox`} onClick={()=>{this.setProtectInfo('openInLinkUrl')}}></div>
                                            <div className="text">发送链接</div>
                                        </div>
                                        <div className="checkItem">
                                            <div className={`${params.protectInfo.openInMiniPro==1?'checked':''} checkBox`} onClick={()=>{this.setProtectInfo('openInMiniPro')}}></div>
                                            <div className="text">发送小程序</div>
                                        </div>
                                    </div>
                                </div>
                                :''
                            }
                            <Welcome 
                                value={params.welcomeMsgFlag}
                                defaultValue = {params.welcomeMsgFlag}
                                setparamsHandle={this.setparamsHandle}
                                welcomeMsgInterval={params.welcomeMsgResp.welcomeMsgInterval}
                                setWelcomeMsgResp={this.setWelcomeMsgResp}
                            />
                            {
                                params.welcomeMsgFlag==1
                                ?<PicText  
                                    welcomeMsgResp={params.welcomeMsgResp}
                                    length={textCountRange(params.welcomeMsgResp.welcomeMsgReq.items[0].content)}
                                    setparamsHandle={this.setWelcomeMsgResp}
                                />
                                :''
                            }
                        </div>
                        <div className="right">
                            <Admin 
                                monitors={params.monitorIds}
                                paramName = {'monitorIds'}
                                setparamsHandle={this.setparamsHandle}
                            />
                            <GroupInform 
                                value={params.introduce}
                                paramName={'introduce'}
                                length={textCountRange(params.introduce)}
                                setparamsHandle={this.setparamsHandle}
                            />
                            {/* <Keyword 
                                keywordSimpleItems={params.keywords}
                                paramName={'keywords'}
                                addTag={this.addTag}
                                delTag={this.delTag}
                            /> */}
                            <GroupLabel 
                                groupLabelProfiles={params.labels}
                                paramName={'labels'}
                                addTag={this.addTag}
                                delTag={this.delTag}
                            />
                            <div className="buttonArea">
                                <UploadBtn 
                                    loading={submiting}
                                    text={"确定"}
                                    loadingText={"确定"}
                                    clickHandle={this.updateInfo}
                                    propsStyle={{
                                        width:'108px',
                                        height:'36px',
                                        float:'right',
                                        fontWeight:400
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
                    <div className="closeBtn" onClick={this.closeHandle}></div>
                </div>
            </div>
        )
    }
}