import React,{Component} from 'react'
import Table from 'antd/lib/table'
import 'antd/lib/table/style/css'
import './index.css'
import ButtonBox from '../../shareComponent/ButtonBox'
import Tableloading from '../../shareComponent/TableLoading'
import AddModal from './AddModal'
import PageRule from '../../shareComponent/PageRule'
import { API_PATH } from '../../../constants/OriginName';
import AuthProvider from '../../../funStore/AuthProvider'
import promiseXHR from '../../../funStore/ServerFun'
import {sendEvent} from '../../../funStore/CommonFun'

class GroupItem extends Component {
    constructor(props){
        super(props)
        this.state = {
            qrBoxShow: false,
            qrUrl: props.record.qrCode
        }
    }
    showQrBoxHandle = () =>{
        const {record} = this.props
        this.setState({
            qrBoxShow: true
        })
        this.refreshHandle(record.id,false).then(res => {
            const resData = JSON.parse(res)
            if(resData.resultCode=='100'&&resData.resultContent){
                this.setState({
                    qrUrl: resData.resultContent
                })
            }
        })
    }
    hideQrBoxHandle = () =>{
        this.setState({
            qrBoxShow: false
        })
    }
    refreshHandle = (groupId,isRefresh) => {
        // isRefresh : true 刷新二维码 false 获取二维码
        const url = `${API_PATH}/groupadmin-api/authsec/groupmgmt/group/qrcode/refresh?groupId=${groupId}&isRefresh=${isRefresh}`
        return AuthProvider.getAccessToken().then((reslove,reject)=> {
            return promiseXHR(url ,{type:'Bearer',value:reslove},null,'get')
        })
    }
    updateQrCode = ()=>{
        const {record} = this.props
        this.refreshHandle(record.id,true).then(res => {
            const resData = JSON.parse(res)
            if(resData.resultCode=='100'){
                sendEvent('message', {txt: "群二维码正在同步中，请稍后重新查看~",code: 1000})
            }
        })
    }

    render(){
        const {qrBoxShow,qrUrl} = this.state
        const {record} = this.props
        return (
            <div className="qrCode" tabIndex={1} onFocus={this.showQrBoxHandle} onBlur={this.hideQrBoxHandle}>
                <div className="qrBox" style={{display:qrBoxShow?'block':'none'}}>
                    <img className='qrImg' src={qrUrl} alt=""/>
                    <div className="text">
                        扫描二维码入群<br/>过期请<span style={{color:'#58A7F8',textDecoration:'underline'}} onClick={this.updateQrCode}>刷新</span>
                    </div>   
                </div>
            </div>
        )
    }
}

export default class FastEditBuild extends Component {
    constructor(props){
        super(props)
        this.state = {
            loading: false,
            addFlag: false,
            initGroupIndex: 0,
            pageInfo:{
                currentPage: 0,
                pageSize: 50,
                totalRecords: 0,
                totalPage: 0
            },
            groupList:[],
            baseData:{
                groupCount: 0,
                memCount: 0,
                newCount: 0
            },
            initFlag: false
        }
    }
    componentDidMount () {
        this.getBaseData()
        this.getGroupList(0,50).then(res => {
            const resData = JSON.parse(res)
            if(resData.resultCode=='100'){
                this.setState({
                    pageInfo: resData.pageInfo,
                    groupList: resData.resultContent?resData.resultContent.map((v,i) => ({
                        ...v,
                        seqNo: i+1
                    })):[],
                    loading: false
                })
            }
        })
    }
    addClick = () =>{
        if(this.state.initFlag){
            this.setState({
                addFlag: !this.state.addFlag
            })
        }
    }
    getBaseData = () => {
        const {selectTemplateData} = this.props
        const url = `${API_PATH}/groupadmin-api/authsec/groupadmin/tenant/template/group/count?templateId=${selectTemplateData.id}`
        AuthProvider.getAccessToken().then((reslove,reject)=> {
            return promiseXHR(url ,{type:'Bearer',value:reslove},null,'get')
        }).then(res => {
            const resData = JSON.parse(res)
            if(resData.resultCode=='100'){
                this.setState({
                    baseData: resData.resultContent,
                    initGroupName: resData.resultContent.createGroupPrefixName,
                    initFlag: true
                })
            }
            
        })
    }
    getGroupList = (page,size) => {
        const {loading} = this.state
        const {selectTemplateData} = this.props
        const url = `${API_PATH}/groupadmin-api/authsec/groupadmin/tenant/template/groups?templateId=${selectTemplateData.id}&_page=${page}&_size=${size}` 
        this.setState({
            loading: true
        })
        if(loading) return
        return AuthProvider.getAccessToken().then((reslove,reject)=> {
            return promiseXHR(url ,{type:'Bearer',value:reslove},null,'get')
        })
    }

    getGroupListByPage = (pageInfo) =>{
        this.getGroupList(pageInfo.currentPage,pageInfo.pageSize).then(res => {
            const resData = JSON.parse(res)
            if(resData.resultCode=='100'){
                this.setState({
                    pageInfo: resData.pageInfo,
                    groupList: resData.resultContent?resData.resultContent.map((v,i) => ({
                        ...v,
                        seqNo: i+1
                    })):[],
                    loading: false
                })
            }
        })
    }
    refresh = (num) => {
        let baseData = this.state.baseData
        baseData.newCount +=num
        this.setState({baseData})
    }
    

    stopEnterGroup = (groupId,status)=>{
        const url = `${API_PATH}/groupadmin-api/authsec/groupadmin/tenant/group/${groupId}`
        AuthProvider.getAccessToken().then((reslove,reject)=> {
            return promiseXHR(url ,{type:'Bearer',value:reslove},{
                "jgStatus": status
            },'put')
        }).then(res => {
            const resData = JSON.parse(res)
            if(resData.resultCode=='100'){
                let {groupList} = this.state
                groupList = groupList.map(v => ({
                    ...v,
                    enterGroupStatus: v.id==groupId?status:v.enterGroupStatus
                }))
                this.setState({groupList})
            }
        })
    }
    render(){
        const {loading,addFlag,initGroupIndex,pageInfo,groupList,baseData,initGroupName} = this.state
        console.log(this.state)
        const {selectTemplateData,selectType} = this.props
        const columns = [{
            title: '序号',
            dataIndex: 'sequence',
            key: 'sequence',
            render: (text, record) => (
                <span>{record.seqNo}</span>
                )
            },{
            title: '群名称',
            dataIndex: 'groupName',
            key: 'groupName',
            render: (text, record) => (
                <span>{record.name?record.name:'-'}</span>
                )
            }, {
            title: '群人数',
            dataIndex: 'groupNum',
            key: 'groupNum',
            render: (text, record) => (
                <span>{record.memberCount}</span>
                )
            },  {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            render: (text, record) => (
                <span>{record.memberCount<record.memberLimitCount?'未满群':'已满群'}</span>
                )
            },{
                title: '群二维码',
                key: 'qrcode',
                render: (text, record) => (
                    record.qrCode?<GroupItem record={record}/>:'-'
                )
            },{
            title: '操作',
            key: 'action',
            render: (text, record) => {
                return record.enterGroupStatus==1
                ?<span className="operate" onClick={()=>{this.stopEnterGroup(record.id,2)}}>停止入群</span>
                :record.enterGroupStatus==2?<span className="operate" onClick={()=>{this.stopEnterGroup(record.id,1)}}>恢复入群</span>
                :'-'
            }
        }]
        return (
            <div className="fast-edit-build-group">
                <div className="header">
                    <div className="dataItem">
                        <span className="dataName">覆盖群数：</span>
                        <span className="dataValue"><span style={{fontSize:'36px'}}>{baseData.groupCount?baseData.groupCount:0}</span>个</span>
                    </div>
                    <div className="dataItem">
                        <span className="dataName">累计入群：</span>
                        <span className="dataValue"><span style={{fontSize:'36px'}}>{baseData.memCount?baseData.memCount:0}</span>人</span>
                    </div>
                </div>
                <div className="content">
                    <ButtonBox
                        btnTxt={"新增微信群"}
                        isCancel={false}
                        btnStyle={{
                            marginBottom: '24px'
                        }}
                        btnFunc={this.addClick}
                    />
                     <Table 
                        rowKey={record => record.id} 
                        columns={columns} 
                        locale={{
                            emptyText: '暂无数据！'
                        }}
                        dataSource={groupList} 
                        pagination={false}
                        loading={{
                            tip:"数据加载中...",
                            indicator:<Tableloading />,
                            spinning:loading
                        }}
                    />
                    {
                        pageInfo.totalPage>1
                        &&<div className="pageFooter">
                            <PageRule 
                                pageInfo={pageInfo}
                                handlersearchData={(v)=>{this.getGroupListByPage(v)}}
                            />
                        </div>
                    }
                </div>
                <div className="bottom">
                    <div className='page-backBtn' onClick={()=>{selectType('SELECT')}} style={{marginRight:0}}>返回</div>
                </div>
                {
                    addFlag?<AddModal closeModal={this.addClick} initGroupIndex={baseData.newCount} initGroupName={initGroupName} templateData={selectTemplateData} refresh={this.refresh}/>:''
                }
            </div>
        )
        
    }
}