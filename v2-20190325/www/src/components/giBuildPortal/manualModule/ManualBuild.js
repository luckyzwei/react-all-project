import React,{Component} from 'react'
import {API_PATH} from '../../../constants/OriginName'
import AuthProvider from '../../../funStore/AuthProvider'
import promiseXHR from '../../../funStore/ServerFun'
import Step2Manual from '../manualModule/Step2'
import Step3Manual from '../manualModule/Step3'
import SaveSuccess from '../SaveSuccess'
import {SaveFail} from '../SaveFail'
import {sendEvent} from '../../../funStore/CommonFun'

export default class ManualBuild extends Component {
    constructor(props){
        super(props)
        this.state = {
            robotNames : [],
            params: {
                "addRobotRole": "",//A:客服助手B:投放助手C:邀请助手
                "createType": 3,//3:手动建群,4:精准入群
                "groupEditInfo": {
                    "groupLabelNames": [],//群标签名字,string
                    "introduce": "",//群公告 
                    "keywordNames": [],//群关键字名字,string
                    "memThreshold": 500,//入群上限人数
                    "monitorSimpInfos": [],//群管理员名称 {id (string, optional): 班长ID ,name (string, optional): 班长名字}
                    "name": "",//群名称
                    "protectFlag": 0,//群的护群功能 0 关闭 1开启
                    "serviceRobotName": "",//机器人昵称
                    "welcomeMsgFlag": 0, //1为开，0为关 
                    "welcomeMsgInterval": 5,
                    "welcomeMsgReq": {
                        "id":null,
                        "status":null,
                        "items": [{
                            "content": "",
                            "files": [{
                                "fileId": null,
                                "fileType": "image",
                                "seqNo": 0
                                }],
                            "seqNo":0,
                            "type":0
                            }]
                    }
                },
                "joinGroupRuleId": "",//精准入群
                "joinGroupTemplateId": "",//精准入群
                "robotHostId": ""//托管群主
            },
            submiting:false,
            isSuccess: false
        }
    }
    componentDidMount() {
        // 获取群主托管号
        const url = `${API_PATH}/groupadmin-api/authsec/robothost/account?_currentPage=0&_pageSize=1000`
        AuthProvider.getAccessToken()
        .then((resolve,reject)=>{
            return promiseXHR(url,{type:'Bearer',value:resolve},{"status": "1"},'post')
        }).then(res => {
            const resData = JSON.parse(res)
            if(resData.resultCode==100){
                this.setState({
                    robotNames: resData.resultContent
                })
            }else{
                throw '获取群主托管号失败'
            }
        }).catch(err => {
            console.log(err)
        })
    }

    setparamsHandle=(k,v)=>{
        let {params} = this.state
        params[k] = v
        this.setState({params})
    }
    setGroupEditInfo=(k,v)=>{
        let {params} = this.state
        switch (k) {
            case 'time':
                params.groupEditInfo.welcomeMsgInterval=v;
                break;
            case 'monitorSimpInfos':
                let newData = v.map(v => {
                    return {
                        name:v.loginName,
                        id: v.id
                    }
                })
                params.groupEditInfo.monitorSimpInfos=newData;
                break;
            default:
                params.groupEditInfo[k] = v;
                break;
        }
        this.setState({params})
    }
    setWelcomeMsgResp=(k,v)=>{
        let {params} = this.state
        switch (k) {
            case 'image':
                params.groupEditInfo.welcomeMsgReq.items[0].files[0].fileId = v
                break;
            case 'text':
                params.groupEditInfo.welcomeMsgReq.items[0].content = v
                break;
            default:
                break;
        }
        this.setState({params})
    }
    addTag = (k,v)=>{
        let params = this.state.params
        params.groupEditInfo[k].push(v)
        this.setState({params})
    }
    delTag = (k,i) => {
        let params = this.state.params
        params.groupEditInfo[k].splice(i,1)
        this.setState({params})
    }
    updateInfo= ()=>{
        const {params,submiting} = this.state
        const {nextStep} = this.props
        const url = `${API_PATH}/groupadmin-api/authsec/robothost/create/group`
        if(submiting) return
        this.setState({submiting: true})
        sendEvent('message', {
            txt: "正在建群中",
            code: 1000
        })
        AuthProvider.getAccessToken()
        .then((resolve,reject)=>{
            return promiseXHR(url,{type:'Bearer',value:resolve},params,'post')
        }).then(res =>{
            const resData = JSON.parse(res)
            if(resData.resultCode=='100'){
                this.setState({submiting: false,isSuccess: true})
                nextStep(true)
                sendEvent('message', {
                    txt: "建群成功",
                    code: 1000
                })
            }else{
                throw '更新群信息失败'
            }
        }).catch(err => {
            console.log(err)
            sendEvent('message', {
                txt: "建群失败",
                code: 1004
            })
            this.setState({submiting: false,isSuccess: false})
            nextStep(true)
        })
    }
    render(){
        const {robotNames,params,submiting,isSuccess} = this.state
        const {step,nextStep,cancelBuild} = this.props
        let view
        switch (step) {
            case 2:
                view = <Step2Manual 
                            robotNames={robotNames} 
                            params={params} 
                            setparamsHandle={this.setparamsHandle}
                            nextStep={nextStep}
                        />
                break;
            case 3:
                view = <Step3Manual 
                            params={params} 
                            setGroupEditInfo={this.setGroupEditInfo} 
                            setWelcomeMsgResp={this.setWelcomeMsgResp}
                            addTag={this.addTag}
                            delTag={this.delTag}
                            submiting={submiting}
                            updateInfo={this.updateInfo}
                        />
                break;
            case 4: 
                view = isSuccess
                        ?<SaveSuccess />
                        :<SaveFail 
                            cancelBuild={cancelBuild}
                            nextStep={nextStep}
                        />
            default:
                break;
        }
        return view
    }
}