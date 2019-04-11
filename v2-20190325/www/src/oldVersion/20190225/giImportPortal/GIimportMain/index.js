import React,{Component} from 'react'
import './index.css'
// import Step1 from '../Step1'
import Step2 from '../Step3' //选群
import Step3 from '../Step2' //选助手
import Step4 from '../Step4' //高级设置
import AuthProvider from '../../../funStore/AuthProvider'
import promiseXHR from '../../../funStore/ServerFun'
import { API_PATH } from '../../../constants/OriginName'
import LoadingAnimationS from '../../shareComponent/LoadingAnimationS'
import { sendEvent } from '../../../funStore/CommonFun'
import {SaveFail} from '../SaveFail'
import SaveSuccess from '../SaveSuccess'
// import {mocaGroupList} from '../mocaData'

export default class GIimportMain extends Component {
    constructor(props){
        super(props)
        this.state = {
            params: {
                "addRobotRole": "",//A:客服助手B:投放助手C:邀请助手
                "createType": 3,//3:手动建群,4:精准入群
                "groupEditInfo": {
                    "groupLabelNames": [],//群标签名字,string
                    "introduce": "",//群公告 
                    "keywordNames": [],//群关键字名字,string
                    "memThreshold": 500,//入群上限人数
                    "monitorSimpInfos": [],//群管理员名称 {id (string, optional): 班长ID ,name (string, optional): 班长名字}
                    // "name": "",//群名称
                    "protectFlag": 1,//群的护群功能 0 关闭 1开启
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
            isSuccess: false,
            step: 2,
            groups: [],
            loading: true
        }
    }
    componentDidMount(){
        this.requestGroupList()
    }

    requestGroupList=()=>{
        const url = `${API_PATH}/groupadmin-api/authsec/robothost/groups?robotHostId=${this.props.hostId}&_currentPage=0&_pageSize=1000`
        return AuthProvider.getAccessToken().then((reslove,reject)=> {
            return promiseXHR(url ,{type:'Bearer',value:reslove},null,'get')
        }).then(res => {
            const resData = JSON.parse(res)
            // const resData = mocaGroupList
            const oldGroups = this.state.groups
            this.setState({
                groups: resData.resultContent.robotGroupMap?resData.resultContent.robotGroupMap.map(v => {
                    let oldGroup = oldGroups.find(o => o.id==v.id)
                    return oldGroup?oldGroup:{
                        ...v,
                        checkStatus: 1,
                        checked: false
                    }
                }):[],
                headImage: resData.resultContent.headImage,
                wechatName: resData.resultContent.wechatName,
                loading: false
            })
        }).catch(err => {
            console.log(err,'GIimportMain')
        })
    }

    updateGroups=(data) =>{
        // 更新群数据
        this.setState({
            groups: data
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
    nextStep = () =>{
        this.setState({
            step: this.state.step+1
        })
    }
    prevStep = () => {
        this.setState({
            step: this.state.step-1
        })
    }
    updateInfo = () => {
        const {params,groups,submiting,step} = this.state
        const {hostId} = this.props
        const url = `${API_PATH}/groupadmin-api/authsec/robothost/admin/grouptrust?robotHostId=${hostId}`
        let addHostGroupInfo = groups.filter(v => v.checkStatus==2).map(v =>({
            "existsRobotFlag": params.addRobotRole,
            "groupHostName": v.name,
            "id": v.id
        }))
        let groupEditInfo = params.groupEditInfo
        let data = {
            addHostGroupInfo,
            groupEditInfo
        }
        if(submiting) return
        this.setState({submiting: true})
        sendEvent('message', {txt: '正在努力导群中，请稍后~', code: 1001, timer:60000})
        AuthProvider.getAccessToken().then((reslove,reject)=> {
            return promiseXHR(url ,{type:'Bearer',value:reslove},data,'POST')
        }).then(res => {
            const resData = JSON.parse(res)
            if(resData.resultCode==100){
                this.setState({submiting: false,isSuccess:true,step:5})
            }else{
                throw '导群失败'
            }
        }).catch(err => {
            this.setState({submiting: false,isSuccess:false,step:5})
            sendEvent('message', {txt: '导群失败~', code: 1004})
        })
    }
    render(){
        const {params,step,groups,headImage,wechatName,loading,submiting,isSuccess} =this.state
        const {hostId} = this.props
        return (
            loading?<LoadingAnimationS />
            :<div className="gi-import">
                {
                    step==2
                        ?<Step2 
                            hostId={hostId} 
                            groups={groups}
                            headImage={headImage} 
                            wechatName={wechatName} 
                            nextStep={this.nextStep} 
                            updateGroups={this.updateGroups}
                            requestGroupList={this.requestGroupList}
                        />
                        :step==3
                            ?<Step3 
                                params={params} 
                                headImage={headImage} 
                                wechatName={wechatName} 
                                setparamsHandle={this.setparamsHandle} 
                                nextStep={this.nextStep} 
                                prevStep={this.prevStep}
                            />
                            :step==4?<Step4 
                                params={params} 
                                setGroupEditInfo={this.setGroupEditInfo} 
                                setWelcomeMsgResp={this.setWelcomeMsgResp}
                                addTag={this.addTag}
                                delTag={this.delTag}
                                submiting={submiting}
                                updateInfo={this.updateInfo}
                                prevStep={this.prevStep}
                            />:isSuccess?<SaveSuccess />:<SaveFail cancelBuild={this.cancelBuild} updateInfo={this.updateInfo}/>
                }
            </div>
        )
    }
}