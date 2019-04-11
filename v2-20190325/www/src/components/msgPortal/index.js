import React,{Component} from 'react'
import './index.css'
import PageRule from '../shareComponent/PageRule'
import promiseXHR from '../../funStore/ServerFun'
import AuthProvider from '../../funStore/AuthProvider'
import {API_PATH} from '../../constants/OriginName'
import LoadingAnimationS from '../shareComponent/LoadingAnimationS'
import {ErrorIcon, InfoIcon} from '../shareComponent/Notification'

export default class MsgRemind extends Component {
    constructor(props){
        super(props)
        this.state = {
            list:[],
            pageInfo: {
                currentPage: 0,
                pageSize: 50,
                totalRecords: 1
            },
            loading: true
        }
    }
    componentDidMount(){
        if(this.props.userId!=''){
            const {pageInfo} = this.state
            this.requestList(pageInfo.currentPage,pageInfo.pageSize,this.props.userId)
        }
    }
    shouldComponentUpdate(nextProps,nenxtState){
        // console.log(nextProps)
        if(nextProps.userId!=''&&this.props.userId==''){
            const {pageInfo} = this.state
            this.requestList(pageInfo.currentPage,pageInfo.pageSize,nextProps.userId)
        }
        return true
    }
    requestList = (page,size,userId) =>{
        const infoListUrl = `${API_PATH}/basis-api/authsec/api/sysmsg/msgs/notify?page=${page}&size=${size}&userId=${userId}`
        AuthProvider.getAccessToken()
        .then((resolve, reject) => {
            return promiseXHR(infoListUrl, {type: 'Bearer', value: resolve}, null, 'POST')
        }).then((res) => {
            res = JSON.parse(res);
            if (res.resultCode === '100') {
                // console.log('****')
                this.setState({
                    list: res.resultContent,
                    pageInfo: res.pageInfo,
                    loading: false
                })
            }
        }).catch(err => {
            console.log(err)
            this.setState({
                loading: false
            })
        })
    }

    render(){
        const {pageInfo,list,loading} = this.state
        const {userId} = this.props
        return (
            <div className='msg-bigBox'>
                {
                    loading?<LoadingAnimationS />
                    :<div className='msg-Portal'>
                        <div className="msg-box">
                            <p className='msg-title'>消息通知</p>
                            {
                                list.map(v =>{
                                    return (
                                        <div className='msg-item' key={v.id}>
                                            <div className='msg-item-box'>
                                                <div className='msg-item-icon'>
                                                    {
                                                        v.msgType==43||v.msgType==44||v.msgType==27||v.msgType==28?
                                                        <InfoIcon />:''
                                                    }
                                                    {
                                                        v.msgType==45||v.msgType==39||v.msgType==40||v.msgType==8?
                                                        <ErrorIcon />:''
                                                    }
                                                </div>
                                                <div className='title'>
                                                    <span className='title-cont'>{v.title}</span>
                                                    <span className='time'>{v.date.replace('T',' ')}</span>
                                                </div>
                                            </div>
                                            <p className='cont'>{v.content}</p>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div class="pageFooter" style={{paddingBottom:'50px'}}>
                            <PageRule
                                pageInfo={pageInfo}
                                handlersearchData={(searchParams)=>{
                                    this.requestList(searchParams.currentPage,searchParams.pageSize,userId)
                                }}
                            />
                        </div>
                    </div>
                }   
            </div>
        )
    }
}