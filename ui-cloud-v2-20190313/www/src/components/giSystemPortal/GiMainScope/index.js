import React, { Component } from 'react'
import './index.css'
import SearchBox from '../SeacrhBox'
import GroupCard from '../GroupCard'
import PageRule from '../../shareComponent/PageRule'
import BatchEdit from '../EditModule/BatchEdit'
import SingeleEdit from '../EditModule/SingleEdit'
import {API_PATH} from '../../../constants/OriginName'
import AuthProvider from '../../../funStore/AuthProvider'
import promiseXHR from '../../../funStore/ServerFun'
import TipBubble from '../../shareComponent/TipBubble'
import {GUIDE_TEXT} from '../../../constants/ConstantData'
import {tongji} from '../../../funStore/tongji'
// import {mocaList} from '../mocaData'


export default class GiMainScope extends Component {
    constructor() {
        super();
        this.state = {
            isBatch: false,//false：群管理列表 true:批量设置
            editFlag: false,
            groupId: '',
            groupIds:[],
            pageInfo: {
                currentPage: 0,
                pageSize: 50,
                totalRecords: 1
            },
            data: [],
            checkAll: false,
            searchParams: {},
            guideFlag: false//群管理向导
        }
    }
    componentDidMount(){
        const {pageInfo} = this.state
        this.requestGroupList(pageInfo,{}).then(res => {
            const data = JSON.parse(res)
            // const data = mocaList
            if(data.resultCode=='100'){
                this.setState({
                    data: data.resultContent.map(v => {
                        return {
                            ...v,
                            select: false
                        }
                    }),
                    pageInfo: data.pageInfo?data.pageInfo:{
                        currentPage: 0,
                        pageSize: pageInfo.pageSize,
                        totalRecords: 1
                    },
                    guideFlag: data.resultContent && data.resultContent.length == 0
                })
            }else{
                throw '获取群成员列表错误'
            }
        }).catch(err => {
            // console.log(err)
        })
    }

    batchHandle=()=>{
        let {data,groupIds} = this.state
        console.log(data,groupIds);
        
        // 批量选择
        this.setState({
            isBatch: !this.state.isBatch,
            data: this.state.isBatch?data.map(v => {return {...v,select:false}}):data,
            groupIds: this.state.isBatch?[]:groupIds,
            checkAll: false
        })
    }

    goEditHandle = (groupId='') => {
        // 单个编辑
        this.setState({
            editFlag: !this.state.editFlag,
            groupId
        })
    }

    batchEditHandle = (groupIds=[])=>{
        // 批量编辑
        let data = this.state.data
        this.setState({
            editFlag: !this.state.editFlag,
            groupIds,
            data: groupIds.length==0?data.map(v => {return {...v,select:false}}):data,
            checkAll: false
        })
    }

    checkGroup = (id) => {
        // 选择群
        let {data} = this.state
        let groupIds = []
        let checkAll = false
        data = data.map(v =>{
            if((v.id==id&&!v.select)||(v.id!=id&&v.select)){
                groupIds.push(v.id)
            }
           return v.id==id?{...v,select: !v.select}:v
        })
        if(groupIds.length==data.length){
            checkAll = true
        }
        this.setState({data, groupIds,checkAll})
    }

    checkAllHandle = () => {
        // 全选
        let {data,checkAll} = this.state
        let groupIds = []
        checkAll = !checkAll
        data = data.map(v =>{
            if(checkAll){
                groupIds.push(v.id)
            }
            return {
                ...v,
                select:checkAll
            }
        })
        this.setState({data, groupIds,checkAll})
    }

    downloadHandle = () => {
        let {searchParams} = this.state
        const url = `${API_PATH}/groupadmin-api/authsec/groupadmin/tenant/group/export`
        tongji('Lzc_QunGuanLi_XiaZai')
        AuthProvider.getAccessToken().then((resolve,reject) => {
            return promiseXHR(url,{type:'Bearer',value:resolve},searchParams,'post')
        }).then(res => {
            const resData = JSON.parse(res)
            if(resData.resultCode=='100'){
                let url = resData.resultContent
                let a = document.createElement('a')
                a.href = url 
                url&&a.click()
            }else{
                throw '下载历史记录失败'
            }
        }).catch(err => {
            // console.log(err)
        })
    }

    searchRequest = (params)=>{
        // 高级查询
        const {pageInfo} = this.state
        tongji('Lzc_QunGuanLi_ChaXun')
        this.requestGroupList({
            currentPage: 0,
            pageSize: pageInfo.pageSize
        },params).then(res => {
            const data = JSON.parse(res)
            if(data.resultCode=='100'){
                this.setState({
                    data: data.resultContent.map(v => {
                        return {
                            ...v,
                            select: false
                        }
                    }),
                    pageInfo: data.pageInfo?data.pageInfo:{
                        currentPage: 0,
                        pageSize: pageInfo.pageSize,
                        totalRecords: 1
                    },
                    searchParams: params
                })
            }else{
                throw '获取群成员列表错误'
            }
        }).catch(err => {
            // console.log(err)
        })
    }
    requestGroupList=(pageInfo,params)=>{
        // 获取群列表
        const url = `${API_PATH}/groupadmin-api/authsec/groupadmin/tenant/groupsAdvanced?_page=${pageInfo.currentPage}&_size=${pageInfo.pageSize}`
        return AuthProvider.getAccessToken()
            .then((resolve,reject)=>{
                return promiseXHR(url,{type:'Bearer',value:resolve},params,'post')
            })
    }
    handlersearchData=(pageInfo)=>{
        const {searchParams} = this.state
        this.requestGroupList(pageInfo,searchParams).then(res => {
            const data = JSON.parse(res)
            if(data.resultCode=='100'){
                this.setState({
                    data: data.resultContent.map(v => {
                        return {
                            ...v,
                            select: false
                        }
                    }),
                    pageInfo: data.pageInfo?data.pageInfo:{
                        currentPage: 0,
                        pageSize: pageInfo.pageSize,
                        totalRecords: 1
                    }
                })
            }else{
                throw '获取群成员列表错误'
            }
        }).catch(err => {
            // console.log(err)
        })
    }
    goToHostImport = () => {
        tongji('Lzc_QunGuanLi_WeXinDaoQun')
        this.props.actions.goTo('/v2/GIScope/HostScope')
    }
    goToHistory = () => {
        tongji('Lzc_QunGuanLi_LiShiJiLu')
        this.props.actions.goTo('/v2/GHScope')
    }
    goToBuild = () => {
        tongji('Lzc_QunGuanLi_XinJian')
        this.props.actions.goTo('/v2/GBScope')
    }
    refreshFunc = () =>{
        const {pageInfo,searchParams} = this.state
        this.requestGroupList(pageInfo,searchParams).then(res => {
            const data = JSON.parse(res)
            // const data = mocaList
            if(data.resultCode=='100'){
                this.setState({
                    data: data.resultContent.map(v => {
                        return {
                            ...v,
                            select: false
                        }
                    })
                })
            }
        })
    }
    render() {
        let {isBatch,editFlag,groupId,groupIds,data,pageInfo,checkAll,guideFlag} = this.state;
        const {actions} = this.props
        // data =[{capacityStatus:1,enterGroupStatus:1,exitPeopleNumber:0,fullReplace:0,fullReplaceGroupId:null,fullReplaceGroupName:null,id:"f5add659-0305-4a92-b8e9-29bbfa436787",innerId:null,introduce:null,joinGroupRuleId:null,joinPeopleNumber:0,matchStatus:2,memberCount:6,memberLimitCount:480,name:"测试群1",protectStatus:0,pushMicroTaskWitch:null,qrCode:"http://kfpt.oss-cn-hangzhou.aliyuncs.com/pc/ipadwx_dev_qrcode/20190108/c87cc3bfe8369e632b0682b44f57c6c6.jpg",select:false,setupBatchId:null,welcomeMsgFlag:1,welcomeMsgInterval:null},{capacityStatus:1,enterGroupStatus:1,exitPeopleNumber:0,fullReplace:0,fullReplaceGroupId:null,fullReplaceGroupName:null,id:"f5add659-0305-4a92-b8e9-29bbfa436787",innerId:null,introduce:null,joinGroupRuleId:null,joinPeopleNumber:0,matchStatus:2,memberCount:6,memberLimitCount:480,name:"测试群1",protectStatus:0,pushMicroTaskWitch:null,qrCode:"http://kfpt.oss-cn-hangzhou.aliyuncs.com/pc/ipadwx_dev_qrcode/20190108/c87cc3bfe8369e632b0682b44f57c6c6.jpg",select:false,setupBatchId:null,welcomeMsgFlag:1,welcomeMsgInterval:null}]
        return (
            <div className='gi-container'>
                <SearchBox 
                    searchRequest={this.searchRequest}
                />
                <div className="groupWrapper">
                    {
                        isBatch
                        ?<div className="pageSize operateArea">
                                <div className="import" onClick={()=>{groupIds.length>0&&this.batchEditHandle(groupIds)}}>批量操作</div>
                                <div className="item checkAll" onClick={this.checkAllHandle}><span className={!checkAll?"icon-checkall":"icon-checkall checked"}></span>全选</div>
                                <div className="item batch" onClick={this.batchHandle}>取消并返回</div>
                            </div>
                        :<div className="pageSize operateArea">
                            {/* <div className="import" onClick={this.goToHostImport}>
                                <span style={{position:'relative',zIndex:2}}>微信导群</span>
                                {guideFlag?<div className="wave-square"></div>:''}
                                {guideFlag?<TipBubble tipData ={GUIDE_TEXT.GI_IMPORT} styles={{left:0,top:'56px'}}/>:''}
                            </div> */}
                            <div className="more">
                                <span className="operate" onClick={this.batchHandle}>批量设置</span>
                                <span className="line"></span>
                                <div className="operate" onClick={this.downloadHandle}>导出群信息</div>
                            </div>
                        </div>
                    }
                    
                    <div className="pageSize groupList clearfix">
                        {
                            !isBatch
                            ?<div className="groupItem" style={{height:'187px',cursor:'pointer'}} onClick={this.goToBuild}>
                                <div className='groupItemInner'>
                                    <span className="icon-add">新建群</span>
                                </div>
                                {guideFlag?<div className="wave-square-small"></div>:''}
                                {guideFlag?<TipBubble tipData ={GUIDE_TEXT.GI_BUILD} styles={{left:'117px',top:'116px'}}/>:''}
                            </div>
                            :''
                        }
                        {
                            data.map((v,i) => {
                                return <GroupCard key={v.id} batchFlag={isBatch} group={v} goEditHandle={this.goEditHandle} checkGroup={this.checkGroup} actions={actions}/>
                            })
                        }
                    </div>
                    <div className="pageSize pageFooter">
                        <PageRule 
                            pageInfo={pageInfo}
                            handlersearchData={this.handlersearchData}
                        />
                    </div>
                </div>
                {
                    editFlag?
                        isBatch
                        ?<BatchEdit goEditHandle={this.batchEditHandle} groupIds={groupIds} refreshFunc={this.refreshFunc}/>
                        :<SingeleEdit groupId={groupId} goEditHandle={this.goEditHandle} refreshFunc={this.refreshFunc}/>
                    :''
                }
            </div>
        )
    }
}