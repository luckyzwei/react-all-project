import React, { Component } from 'react'
import promiseXHR from '../../../funStore/ServerFun'
import AuthProvider from '../../../funStore/AuthProvider'
import {API_PATH} from '../../../constants/OriginName'
import LoadingAnimationS from '../../shareComponent/LoadingAnimationS';
import PageRule from '../../shareComponent/PageRule'
import './index.css'

const statusMap = {
    '0':'未启动',
    '1':'建群中',
    '2':'成功',
    '4':'异常'
}
export default class BuildGoupList extends Component {
    constructor(props){
        super(props)
        this.state={
            groupMsg:{},
            groupListLoad: true,
            taskId:'',
            pageInfo: {
                pageSize: 20,
                currentPage: 0,
                totalRecords: 0
            },
        }
    }

    componentWillMount(){
        this.getGroupList()
    }

    getGroupList =() => {
        this.setState({groupListLoad: true})
        const {pageInfo} =this.state
        const {taskId} =this.props
        const url=API_PATH + `/groupadmin-api/authsec/robothost/task/${taskId}?_currentPage=${pageInfo.currentPage}&_pageSize=${pageInfo.pageSize}`;
        AuthProvider.getAccessToken()
            .then((resolve,reject)=>{
                return promiseXHR(url,{type:'Bearer',value:resolve},null,'GET')
            })
            .then((res)=>{
                const resData=JSON.parse(res)
                this.setState({
                    pageInfo:resData.pageInfo,
                    groupMsg:resData.resultContent,
                    groupListLoad: false
                })
            })
    }

    refreshALL = () => {
        this.getGroupList()
    }
    render(){
        const {groupMsg,groupListLoad,pageInfo} = this.state;
        return(
            <div className="buildGroupList">
                 <div className="robotMsg">
                    <span>页面名称：{groupMsg.name}</span>
                    <span>建群类型：{groupMsg.type==4?'精准入群':'快速入群'}</span>
                    <span>建群时间：{groupMsg.createDate&&groupMsg.createDate.replace('T', ' ')}</span>
                 </div>
                <div>
                    <div className="groupListTable clearfix">
                        <span onClick={this.refreshALL}><em className="icon-gi"></em>刷新</span>
                        <table>
                            <thead>
                            <tr>
                                <th><span style={{paddingLeft:'20px'}}>序号</span></th>
                                <th>群名称</th>
                                <th>建群状态</th>
                            </tr>
                            </thead>
                            {groupListLoad ?
                                    <div className="loadBox">
                                        <LoadingAnimationS/>
                                    </div>
                                    :
                            <tbody>
                            {
                                groupMsg.taskItems&&groupMsg.taskItems!=null ?
                                    groupMsg.taskItems.map((item,index)=>{
                                    return(
                                        <tr key={index}>
                                            <td><span style={{paddingLeft:'20px'}}>{index+1}</span></td>
                                            <td>{item.name}</td>
                                            <td><em className='bgl-point' style={{background: item.status==1?'gray':item.status==1?'#6AD298':item.status==2?'#58A7F8':item.status==4?'#FF99A5':''}}></em>{statusMap[item.status]}<span className='abnormal'>{item.status==4?' （'+item.description+'）':''}</span></td>
                                        </tr>
                                    )
                                    })
                                    :null
                            }
                            </tbody>
                            }
                        </table>
                        {
                            groupMsg.taskItems&&groupMsg.taskItems.length>0?
                            <div className="pageFooter">
                                <PageRule 
                                    pageInfo={pageInfo}
                                    handlersearchData={this.getGroupList}
                                />
                            </div>
                            :''
                        }
                    </div>
                    <div className="backRobot" onClick={this.props.changeView}>返回</div>
                </div>
            </div>
        )
    }
}
