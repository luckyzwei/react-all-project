import React, { Component } from 'react'
import promiseXHR from '../../funStore/ServerFun'
import AuthProvider from '../../funStore/AuthProvider'
import {API_PATH} from '../../constants/OriginName'
import QRCodeMask from './QRCodeMask'
import LogOffRobot from './LogOffRobot'
import {tongji} from '../../funStore/tongji'
import LoadingAnimationS from '../shareComponent/LoadingAnimationS';


function FormatDate (strTime) {
    var date = new Date(strTime)
    var month = ((date.getMonth()+1)<10)? '0'+(date.getMonth()+1) : (date.getMonth()+1)
    var day = (date.getDate()<10)? '0'+date.getDate() : date.getDate()
    var hours = (date.getHours()<10) ? '0'+date.getHours() : date.getHours()
    var minutes = (date.getMinutes()<10) ? '0'+date.getMinutes() : date.getMinutes()
    var seconds = (date.getSeconds()%10>=0) ? '0'+date.getSeconds() : date.getSeconds()
    return date.getFullYear()+"/"+month+"/"+day;
}
export default class GoupList extends Component {
    constructor(props){
        super(props)
        this.state={
            showMask:false,
            groupId:'',
            groupName:'',
            showLogOffMask:false,
            groupMsg:{},
            groupListLoad: true
        }
        this.showMaskHandle=this.showMaskHandle.bind(this)
        this.goApplyRobot=this.goApplyRobot.bind(this)
        this.hideLogOff=this.hideLogOff.bind(this)
        this.getInitData=this.getInitData.bind(this)
        this.refreshALL=this.refreshALL.bind(this)
    }
    componentWillMount(){
        this.getInitData()
    }
    componentDidMount(){
    }
    getInitData(){
        this.setState({groupListLoad: true})
        const {robotId} =this.props
        const url=API_PATH + '/groupadmin-api/authsec/groupadmin/robot/'+robotId+'/groups';
        AuthProvider.getAccessToken()
            .then((resolve,reject)=>{
                return promiseXHR(url,{type:'Bearer',value:resolve},null,'GET')
            })
            .then((res)=>{
                const resData=JSON.parse(res);
                this.setState({
                    groupMsg:resData,
                    groupListLoad: false
                })
            })

    }
    showMaskHandle(){
        tongji('Lzc_ZhiNengZuShou_ErWeiMA')
        this.setState({
            showMask:!this.state.showMask,
        })
    }
    goApplyRobot(value){
        this.props.changeView(value)
    }
    showLogOff(groupId,groupName){
        this.setState({
            showLogOffMask:true,
            groupId:groupId,
            groupName:groupName
        })
    }
    hideLogOff(){
        this.setState({
            showLogOffMask:false,
        })
    }
    refreshALL(){
        tongji('Lzc_ZhiNengZuShou_ShuaXinQun')
        this.getInitData()
    }
    render(){
        const {showMask,showLogOffMask,groupMsg,groupListLoad} = this.state;
        const {code,qrCode,robotNickName,robotStatus,groupLeaveNum,h5Url}=this.props;
        return(
            <div className="groupStatusList">
                 <div className="robotMsg">
                    <img src={h5Url || "/v2/favicon.png"} alt=""/>
                    <span>助手昵称：{robotNickName}</span>
                    <span>状态：{robotStatus==3?'封号(等待替换)':'正常'}</span>
                    <span>剩余额度：<span>{groupLeaveNum}</span> 个</span>
                    {/* <div className="backRobot" onClick={()=>{this.props.changeView('ROBOTLIST')}}>返回</div> */}
                    <a href="javascript:;" onClick={this.showMaskHandle.bind(this)}>二维码</a>
                 </div>
                <div>
                    <div className="groupListTable clearfix">
                            <span onClick={this.refreshALL}><em className="icon-gi"></em>刷新</span>
                        <table>
                            <thead>
                            <tr>
                                <th ><span style={{paddingLeft:'20px'}}>序号</span></th>
                                <th >群名称</th>
                                <th >激活日期</th>
                                <th >群用户数</th>
                                <th >群状态</th>
                                <th >操作</th>
                            </tr>
                            </thead>
                            {groupListLoad ?
                                    <div className="loadBox">
                                        <LoadingAnimationS/>
                                    </div>
                                    :
                            <tbody>
                            {
                                groupMsg.resultContent&&groupMsg.resultContent!=null ?
                                    groupMsg.resultContent.map((item,index)=>{
                                    return(
                                        <tr key={index}>
                                            <td><span style={{paddingLeft:'20px'}}>{index+1}</span></td>
                                            <td>{item.name}</td>
                                            <td>{item.createDate==null||item.createDate==''?'':FormatDate(item.createDate)}</td>
                                            <td>{item.groupImemNum}</td>
                                            <td>{item.status==1?'正常':'--'}</td>
                                            <td onClick={this.showLogOff.bind(this,item.id,item.name)}>注销</td>
                                        </tr>
                                    )
                                    })
                                    :null
                            }
                            </tbody>
                            }
                        </table>
                    </div>
                    <div className="page-backBtn" onClick={()=>{this.props.changeView('ROBOTLIST')}} style={{margin:'24px 0 0 0'}}>返回</div>
                </div>
                {showMask && groupLeaveNum!=0 && robotStatus!=3
                    ?<QRCodeMask
                        showMask={showMask}
                        showMaskHandle={this.showMaskHandle}
                        robotCode={code}
                        qrCode={qrCode}
                    />
                    :''}
                {
                    showLogOffMask ?
                        <LogOffRobot
                            hideLogOff={this.hideLogOff}
                            groupId={this.state.groupId}
                            groupName={this.state.groupName}
                            refreshALL={this.refreshALL}
                        /> :''
                }

            </div>
        )
    }
}
