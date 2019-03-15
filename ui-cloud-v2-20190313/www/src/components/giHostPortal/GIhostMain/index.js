import React, { Component} from 'react'
import promiseXHR from '../../../funStore/ServerFun'
import AuthProvider from '../../../funStore/AuthProvider'
import {API_PATH} from '../../../constants/OriginName'
import './index.css'
import RobotList from '../RobotList'
import {Nodata} from '../Nodata'
import LoadingAnimationS from '../../shareComponent/LoadingAnimationS'
import LoginModal from '../LoginModal'
import ProcessModal from '../ProcessModal'
// import {mocaHostList} from '../mocaData'

export default class GIhostMain extends Component {
    constructor(props){
        super(props)
        this.state = {
            robotList : [],
            pageInfo :{
                currentPage: 0,
                pageSize: 20,
                totalRecords: 1
            },
            searchParams: {
                "aliasName": "",
                "status": null
            },
            loading: true,
            loginModalFlag: false,
            type:'',
            processModalFlag: false,
            operationData: {}
        }
    }
    componentDidMount(){
        const {pageInfo,searchParams} = this.state
        this.requestRobotList(pageInfo,searchParams)
    }
    setparamsHandle = (k,v)=>{
        let {searchParams} = this.state
        searchParams[k] = v
        this.setState({searchParams})
    } 
    requestRobotList=(pageInfo,params)=>{
        const url = `${API_PATH}/groupadmin-api/authsec/robothost/account?_currentPage=${pageInfo.currentPage}&_pageSize=${pageInfo.pageSize}`
        AuthProvider.getAccessToken()
        .then((resolve,reject)=>{
            return promiseXHR(url,{type:'Bearer',value:resolve},params,'POST')})
        .then((res) =>{
            const resData = JSON.parse(res)
            // moca data
            // const resData = mocaHostList
            if(resData.resultCode==100){
                this.setState({
                    robotList: resData.resultContent?resData.resultContent:[],
                    pageInfo: resData.pageInfo,
                    loading: false
                })
            }
        }).catch(err => {
            console.log(err)
        })
    }
    searchHandle =(status)=>{
        let {searchParams,pageInfo} = this.state
        if(status!==undefined){
            searchParams.status = status
            this.setState({searchParams})
        }
        this.requestRobotList({
            currentPage: 0,
            pageSize: pageInfo.pageSize
        },searchParams)
    }
    pageSearch = (pageInfo) =>{
        let {searchParams} = this.state
        this.requestRobotList(pageInfo,searchParams)
    }
    updateListData=(data) =>{
        let {robotList} = this.state
        robotList = robotList.map(v =>{
            return v.id ==data.id?data:v
        })
        this.setState({robotList})
    }
    initListData=()=>{
        const {pageInfo,searchParams} = this.state
        this.requestRobotList({
            currentPage: 0,
            pageSize: pageInfo.pageSize,
        },searchParams)
    }
    showLoginModal=(type)=>{
        this.setState({
            loginModalFlag: true,
            type
        })
    }
    hideLoginModal=()=>{
        this.setState({
            loginModalFlag: false,
            type:''
        })
    }
    showProcessModal = (data) =>{
        this.setState({
            processModalFlag: true,
            operationData: data
        })
    }
    hideProcessModal = () =>{
        this.setState({
            processModalFlag: false
        })
    }
    render(){
        const {robotList,pageInfo,searchParams,loading,loginModalFlag,type,processModalFlag,operationData} = this.state
        const {actions} = this.props
        return (
            <div className="gi-host">
                {
                    loading?<LoadingAnimationS />
                    :robotList&&robotList.length>0||searchParams.status!=null
                        ?<RobotList 
                            robotList={robotList} 
                            pageInfo={pageInfo} 
                            searchParams={searchParams} 
                            updateListData={this.updateListData}
                            setparamsHandle={this.setparamsHandle}
                            searchHandle={this.searchHandle}
                            pageSearch={this.pageSearch}
                            showLoginModal={this.showLoginModal}
                            showProcessModal={this.showProcessModal}
                            actions={actions}
                        />
                        :<Nodata showLoginModal={this.showLoginModal}/>
                }
                {
                    loginModalFlag?<LoginModal hideLoginModal={this.hideLoginModal} updateListData={this.updateListData} type={type} initListData={this.initListData}/>:''
                }
                {
                    processModalFlag?<ProcessModal hideProcessModal={this.hideProcessModal} operationData={operationData}/>:''
                }
            </div>
        )
    }
}

