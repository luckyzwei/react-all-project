import React,{Component} from 'react'
import './index.css'
import GroupCard from './GroupCard'
import AvatarSet from '../AvatarSet'
import ModalBox from '../../shareComponent/ModalBox'
import PageRule from '../../shareComponent/PageRule'
import promiseXHR from '../../../funStore/ServerFun'
import AuthProvider from '../../../funStore/AuthProvider'
import { API_PATH } from '../../../constants/OriginName'
import {sendEvent} from '../../../funStore/CommonFun'


// 1: 在线；
// 2: 异常；
// 5: 离线；

export default class RobotList extends Component {
    constructor(props){
        super(props)
        this.state = {
            selectData: null,
            cancelFlag: false,
            avatarSetFlag: false
        }
    }
   
    showModal=(flag,data)=>{
        let params = {selectData: data,editFlag:false}
        params[flag]=true
        this.setState(params)
    }
    hideModal=(flag)=>{
        let params = {}
        params[flag]=false
        this.setState(params)
    }
    confirmModal=()=>{
        const {selectData} = this.state
        const url = `${API_PATH}/groupadmin-api/authsec/robothost/cancle/account/${selectData.id}`
        AuthProvider.getAccessToken()
        .then((resolve,reject)=>{
            return promiseXHR(url,{type:'Bearer',value:resolve},null,'GET')})
        .then((res) =>{
            const resData = JSON.parse(res)
            if(resData.resultCode=='100'){
                this.props.updateListData(Object.assign({},selectData,{status:5}))
                this.hideModal('cancelFlag')
                sendEvent('message', {txt: "群主托管取消成功",code: 1000})
            }else{
                throw '取消托管失败'
            }
        }).catch(err =>{
            this.hideModal('cancelFlag')
            sendEvent('message', {txt: "群主托管取消失败",code: 1004})
        })
    }
    render(){
        const {cancelFlag,avatarSetFlag,selectData} = this.state
        const {robotList,pageInfo,searchParams,updateListData,showLoginModal,setparamsHandle,searchHandle,pageSearch,showProcessModal,actions} = this.props
        console.log(searchParams)
        return (
            <div className="gi-robotList">
                 <div className="searchBar pageSize">
                    <div className="statusBox">
                        <div className={searchParams.status==null?"status checked":"status"} onClick={()=>{searchHandle(null)}}>全部</div>
                        <div className={searchParams.status==1?"status checked":"status"} onClick={()=>{searchHandle(1)}}>在线</div>
                        <div className={searchParams.status==5?"status checked":"status"} onClick={()=>{searchHandle(5)}}>离线</div>
                        <div className={searchParams.status==2?"status checked":"status"} onClick={()=>{searchHandle(2)}}>异常</div>
                    </div>
                    <div className="searchBox">
                        <input type="text" placeholder='请输入昵称或微信号查询' value={searchParams.aliasName} onChange={(e)=>{setparamsHandle('aliasName',e.target.value)}} onKeyUp={(e)=>{e.keyCode==13&&searchHandle()}}/>
                        <div className="searchBtn" onClick={()=>{searchHandle()}}></div>
                    </div>
                </div>
                <div className="listBox pageSize clearfix">
                    <div className="addBtn cardItem" onClick={()=>{showLoginModal('ADD')}}>
                        <span className='icon-add'></span>
                        <span>新增导群托管</span>
                    </div>
                    {
                        robotList.map(v => {
                            return <GroupCard key={v.id} item={v} showModal={this.showModal} showLoginModal={showLoginModal} updateListData={updateListData} showProcessModal={showProcessModal} actions={actions}/>
                        })
                    }
                </div>
                <div className="pageFooter pageSize">
                    <PageRule 
                        pageInfo={pageInfo}
                        handlersearchData={pageSearch}
                    />
                </div>
                {
                    avatarSetFlag?<AvatarSet hideModal={this.hideModal} selectData={selectData} updateListData={updateListData}/>:''
                }
                <ModalBox 
                    modalStatus={cancelFlag} //控制显示隐藏状态
                    modalStyle={{width:'530px',textAlign:'left'}}//修改样式，默认最小高度220px，宽度420px
                    closeModalFunc={()=>{this.hideModal('cancelFlag')}} //关闭弹出框函数
                    confirmFunc={this.confirmModal} //弹出框确定函数，处理主逻辑
                    modalTxt={'1、取消托管后，列表中的群将无法进行护群、踢出用户和 @all 等功能；2、若需要恢复列表内群的相关管理功能，请使用管理重新托管操作。'} //弹出框的文本信息
                    cancelTxt={'我再想想'}//取消按钮的文本
                    confirmTxt={"知道了"}//确定按钮的文本
                />
            </div>
        )
    }
}

RobotList.defaultProps = {
    pageInfo: {
        currentPage: 0,
        pageSize: 20,
        totalRecords: 1
    }
}