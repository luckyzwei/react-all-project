import React,{Component} from 'react'
import './index.css'
import GroupListItem from '../../giEditPortal/GroupListItem'
import AidBox from '../../giEditPortal/AidBox'
import { API_PATH } from '../../../constants/OriginName'
import AuthProvider from '../../../funStore/AuthProvider'
import promiseXHR from '../../../funStore/ServerFun'

// const mocadata = {"resultCode":"100","detailDescription":"success","resultContent":{"successCount":0,"pendingCount":1,"failuerCount":0,"unStartCount":0,"taskItems":[{"id":"1d029461-79e3-463a-81db-e1e4bd370b74","wechatName":"大哈哈哈","headImage":"https://wechaty-message.s3.cn-north-1.amazonaws.com.cn/avatarUrl/wxid_j4dnmta3weod22.jpg","status":1,"taskItem":{"id":"43c438e1-a765-4fda-a85d-ae251fac7d0f","tenantId":"cd6d6121-3fe0-43c5-b6ca-e96c63a2025a","creatorId":"3024368f-08cb-40f5-b471-21fb6721eb6f","createDate":"2018-11-29T11:08:47","updateDate":"2018-11-29T11:16:58","status":4,"name":"tenantB01","taskId":"98b15326-e449-4214-8bd0-964b06b714ea","exeIndex":-2,"robotHostId":"1d029461-79e3-463a-81db-e1e4bd370b74","groupHostId":"96c9501d-006c-4062-80bf-662f2166a032","config":"AC","type":1,"description":"加好友失败"}}]}}

export default class ProcessModal extends Component {
    constructor(props){
        super(props)
        this.state = {
            data:null,
            checkGroup: null
        }
    }
    componentDidMount(){
        this.requestList()
    }
    requestList() {
        const {operationData} = this.props
        const url = `${API_PATH}/groupadmin-api/authsec/robothost/task/${operationData.lastOperationBatch}`
        AuthProvider.getAccessToken()
        .then((resolve,reject)=>{
            return promiseXHR(url,{type:'Bearer',value:resolve},null,'get')
        }).then(res => {
            const resData = JSON.parse(res)
            // const resData = mocadata
            if(resData.resultCode=='100'){
                this.setState({
                    data: resData.resultContent,
                    checkGroup: resData.resultContent.taskItems?resData.resultContent.taskItems[0]:null
                })
            }
        })
    }
    checkGroupHandle=(item)=>{
        this.setState({
            checkGroup: item
        })
    }
    render(){
        const {data,checkGroup} = this.state
        return (
            <div className="modalWrapper" style={{padding:'5%',overflow:'auto'}}>
                <div className="gi-processModal">
                    <div className="inner">
                        <div className="left">
                            <div className="header"><span className="icon-wx"></span><span>群列表</span></div>
                            <div className="groupList">
                                {
                                    data&&data.taskItems&&data.taskItems.map((v,i) => {
                                        return <GroupListItem key={i} group={v} checkGroupHandle={this.checkGroupHandle}/>
                                    })
                                }
                            </div>
                        </div>
                        {
                            checkGroup
                            ?<div className="right">
                                <div className="row">
                                    <div className="label">托管微信：</div>
                                    <div className="content">
                                        <div className="nickname">
                                            <img src={checkGroup.headImage} alt=""/>
                                            <span>{checkGroup.wechatName}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="label">群助手：</div>
                                    <div className="content">
                                        {checkGroup.taskItem.config.includes('A')&&<AidBox AidHas={{service:true}}/>}
                                        {checkGroup.taskItem.config.includes('C')&&<AidBox AidHas={{holding:true}}/>}
                                        {checkGroup.taskItem.config.includes('B')&&<AidBox AidHas={{putting:true}}/>}
                                    </div>
                                </div>
                            </div>
                            :''
                        }
                    </div>
                    <div className="closeBtn" onClick={this.props.hideProcessModal}></div>
                </div>
            </div>
        )
    }
}