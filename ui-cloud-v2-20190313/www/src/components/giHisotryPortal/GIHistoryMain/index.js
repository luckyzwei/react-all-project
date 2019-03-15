import React,{Component} from 'react'
import './index.css'
import SearchBox from '../SearchBox'
import Table from '../Table'
import PageRule from '../../shareComponent/PageRule'
import AuthProvider from '../../../funStore/AuthProvider'
import promiseXHR from '../../../funStore/ServerFun'
import {API_PATH} from '../../../constants/OriginName'
import Tableloading from '../../shareComponent/TableLoading'
import BuildGroupList from '../BuildGroupList'


export default class GIHistoryMain extends Component {
    constructor(props){
        super(props)
        this.state = {
            params:{},
            pageInfo: {
                pageSize: 20,
                currentPage: 0,
                totalRecords: 0
            },
            list:[],
            loading: true,
            showGroupList: false,
            taskId: ''
        }
    }
    componentWillMount() {
        this.changeView()
    }
    componentDidMount(){
        this.getHistoryList(this.state.pageInfo,{})
    }
    getHistoryList = (pageInfo,params={}) => {
        this.setState({loading: true})
        const url = `${API_PATH}/groupadmin-api/authsec/robothost/tasks?_currentPage=${pageInfo.currentPage}&_pageSize=${pageInfo.pageSize}`
        AuthProvider.getAccessToken()
        .then((resolve,reject)=>{
            return promiseXHR(url,{type:'Bearer',value:resolve},params,'post')
        }).then(res => {
            const resData = JSON.parse(res)
            if(resData.resultCode=='100'){
                this.setState({
                    list:resData.resultContent?resData.resultContent.map((v,i) => ({...v,ordersqu:i})):[],
                    pageInfo: resData.pageInfo?resData.pageInfo:{
                        pageSize: pageInfo.pageSize,
                        currentPage: 0,
                        totalRecords: 0
                    },
                    loading: false
                })
            }
        }).catch(err => {
            // console.log(err)
        })
    }
    refreshALL = () => {
        this.getHistoryList(this.state.pageInfo)
    }
    searchHandle = () => {
        let pageInfo = {
            pageSize: this.state.pageInfo.pageSize,
            currentPage: 0,
        }
        let params = this.state.params
        this.getHistoryList(pageInfo,params)
    }
    setSearchParams = (k,v) => {
        const params = this.state.params
        if(k=='time'){
            params.startDate = v[0]?v[0]+'T00:00:00':''
            params.endDate = v[1]?v[1]+'T23:59:59':''
        }else{
            params[k] = v
        }
        this.setState({
            params
        })
    }
    editHandle = (item) => {
        let taskId = item.id
        let type = item.type==4?3:item.type==5?2:1
        this.setState({showGroupList: false,taskId})
        // this.props.actions.goTo('/v2/GIScope/edit/'+taskId+'/'+type)
    }
    changeView = () => {
        this.setState({showGroupList: true})
    }
    downloadHandle = (item) => {
        const url = `${API_PATH}/groupadmin-api/authsec/robothost/task/${item.id}/download/qrcodeurl?createType=${item.type}`
        AuthProvider.getAccessToken()
        .then((resolve,reject)=>{
            return promiseXHR(url,{type:'Bearer',value:resolve},null,'get')
        }).then(res => {
            const resData = JSON.parse(res)
            if(resData.resultCode =='100'){
                let url = resData.resultContent
                let a = document.createElement('a')
                a.href=url+'?d'
                a.click()
            }else{
                throw '下载二维码失败'
            }
        }).catch(err => {
            console.log(err)
        })
    }
    render(){
        const {pageInfo,list,params,loading,taskId,showGroupList} = this.state
        // console.log(params)
        return (
            showGroupList ?
            <div className="gi-history">
                <SearchBox params={params} actions={this.props.actions} setSearchParams={this.setSearchParams} searchHandle={this.searchHandle}/>
                <div className="historyWrapper">
                    <div className="tableArea">
                        <p className='refresh' onClick={this.refreshALL}><em className="icon-gi"></em>刷新</p>
                        <Table dataSource={list} editHandle={this.editHandle} downloadHandle={this.downloadHandle} pageInfo={pageInfo} loading={loading}/>
                    {
                        list.length>0?
                        <div className="pageFooter">
                            <PageRule 
                                pageInfo={pageInfo}
                                handlersearchData={this.getHistoryList}
                            />
                        </div>
                        :''
                    }
                    </div>
                </div>
            </div>
            :
            <BuildGroupList taskId={taskId} changeView={this.changeView} />
        )
    }
}