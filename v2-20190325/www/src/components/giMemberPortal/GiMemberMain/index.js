import React, { Component } from 'react'
import './index.css'
import SearchBox from '../SearchBox'
import PersonCard from '../PersonCard'
import PageRule from '../../shareComponent/PageRule'

import { getGroupPerson } from '../../../funStore/FetchApi';
import Table from 'antd/lib/table'
import 'antd/lib/table/style/css'
import './index.css'
import Tableloading from '../../shareComponent/TableLoading'
import EditBox from '../EditBox'
import ModalBox from '../../shareComponent/ModalBox'
import { API_PATH } from '../../../constants/OriginName'
import AuthProvider from '../../../funStore/AuthProvider'
import promiseXHR from '../../../funStore/ServerFun'
import {sendEvent} from '../../../funStore/CommonFun'

// const mocaMemberList = {
//     "resultCode": "100",
//     "detailDescription": "",
//     "resultContent": [{
//         "memberId": "c13d33ee-6cf3-41ee-9ca3-9170c7bdf927",
//         "groupId": "3feb0dad-75b5-422a-9e8d-a141b4676feb",
//         "mapId": "8c92a116-f2d4-11e8-8150-02f43d3f4778",
//         "nickName": "Kitty豆豆妈",
//         "remarkName": null,
//         "groupName": null,
//         "sourceType": null,
//         "addMemberPrivilege": 0,
//         "dropMemberPrivilege": 0,
//         "phone": null,
//         "createDate": "2018-11-28T14:12:14",
//         "isBlackList": 0,
//         "status": 1,
//         "iconPath": "http://wx.qlogo.cn/mmhead/ver_1/6KEZicj4xhfRhSOmicuvhK7IbHr0OXaKrvoYcD89mXlgtlVRvN6URtjCeoFRrz36gqZqyWanOvXkdLzK8hYlnyhpqD0cydraLrkibr9gVzXrkA/132"
//     }],
//     "pageInfo": {
//         "currentPage": 0,
//         "totalPage": 1,
//         "pageSize": 50,
//         "totalRecords": 31
//     }
// }

const typeMap = {
    0:'普通成员',
    1:'群主',
    2:'普通成员',
    3:'小助手'
}

export default class GiMemberMain extends Component {

    constructor(props) {
        super(props);
        this.state = {
            personList: [],
            groupId: props.groupId,
            groupName: props.groupName,
            nickName: '',
            pageInfo: {
                pageSize: 50,
                currentPage: 0,
                totalPage: 5
            },
            loading: true,
            personEdit: false,
            memberId: '',
            memberName: '',
            modalStyle: {}
        }
        this.handlersearchData = this.handlersearchData.bind(this);
        this.iptChangeParams = this.iptChangeParams.bind(this);
        this.confirmSearch = this.confirmSearch.bind(this);
        this.refreshFunc = this.refreshFunc.bind(this);
    }
    handlersearchData(searchParams) {
        let params = {
            groupId: this.state.groupId,
            ...searchParams
        }
        this.setState({
            loading: true
        })
        getGroupPerson(params).then(res => {
            res = JSON.parse(res)
            // res = mocaMemberList
            if (res.resultCode === '100') {
                this.setState({
                    pageInfo: res.pageInfo,
                    personList: res.resultContent.map((v,i) => ({...v,ordersqu:i})),
                    loading: false
                })
            }
        }).catch(req => {
            console.log(req)
            this.setState({
                loading: false
            })
        })
    }
    refreshMemberHandle = () => {
        const url = API_PATH + '/groupadmin-api/authsec/groupadmin/group/mem/async?groupCode='+this.props.groupCode
        AuthProvider.getAccessToken()
        .then((resolve,reject)=>{
            promiseXHR(url,{type:'Bearer',value:resolve},null,'GET')
            .then(res => {
                const resData = JSON.parse(res)
                if(resData.resultCode=='100'){
                sendEvent('message', {txt: "正在刷新群成员信息，请稍候~",code: 1000})
                }
            })
        })
    }
    refreshFunc() {
        let searchParams = {
            nickName: this.state.nickName,
            pageSize: this.state.pageInfo.pageSize,
            currentPage: this.state.pageInfo.currentPage
        }
        this.handlersearchData(searchParams);
    }
    confirmSearch() {
        let searchParams = {
            groupId: this.state.groupId,
            pageSize: 50,
            currentPage: 0,
            nickName: this.state.nickName
        }
        this.handlersearchData(searchParams);
    }
    iptChangeParams(ev, value) {
        // console.log(ev, value)
        switch (ev) {
            case 'nickName':
                this.setState({
                    nickName: value
                })
                break;
            case 'groupName':
                this.setState({
                    groupName: value
                })
                break;
        }
    }

    componentDidMount() {
        // console.log("群ID：" + this.props.groupId)
        let searchParams = {
            groupId: this.props.groupId,
            pageSize: 50,
            currentPage: 0
        }
        this.handlersearchData(searchParams);
        window.addEventListener('refreshmember',this.refreshFunc)
    }

    componentWillUnmount(){
        window.removeEventListener('refreshmember',this.refreshFunc)
    }

    editPerson=(memberId)=>{
        this.setState({
            personEdit: true,
            memberId
        })
    }
    closeModal = () =>{
        this.setState({
            personEdit: false,
            masterFlag: false
        })
    }
    changeMaster=(memberId,memberName,e) =>{
        let modalStyle = {}
        modalStyle.left = e.clientX+'px'
        modalStyle.top = e.clientY+'px'
        this.setState({
            modalStyle,
            masterFlag: true,
            memberName,
            memberId
        })
    }
    confirmMaster =() =>{
        const {groupId,memberId} = this.state
        const url = `${API_PATH}/groupadmin-api/authsec/groupadmin/admin/robot/transferGroup?groupId=${groupId}&immemId=${memberId}`
        AuthProvider.getAccessToken()
        .then((resolve,reject)=>{
            return promiseXHR(url,{type:'Bearer',value:resolve},null,'get')
        }).then(res => {
            const resData = JSON.parse(res)
            if(resData.resultCode=='100'){
                sendEvent('message', {txt: '转移群主成功', code: 1000})
                this.closeModal()
                this.refreshFunc()
            }else{
                throw '转移群主失败'
            }
        }).catch(err => {
            console.log(err)
            sendEvent('message', {txt: '转移群主失败', code: 1004})
        })
    }
    render() {
        let { pageInfo, personList, groupId,memberId, memberName,nickName, groupName ,loading,personEdit,masterFlag,modalStyle} = this.state;
        const {matchStatus,groupCode} = this.props
        const columns = [{
            title: '序号',
            dataIndex: 'sequence',
            key: 'sequence',
            render: (text, record) => (
                <span className="sequence">{pageInfo.currentPage*pageInfo.pageSize+1+record.ordersqu}</span>
              )
          },{
            title: '用户昵称',
            dataIndex: 'nickName',
            key: 'nickName',
            render: (text, record) => (
                <span className="nickName"><span className='nickNameIcon' style={record.iconPath?{background:`url(${record.iconPath}) no-repeat center/cover`}:{}}></span>{record.remarkName?record.remarkName:record.nickName?record.nickName:'-'}</span>
              )
          }, {
            title: '入群时间',
            dataIndex: 'createDate',
            key: 'createDate',
            render: (text, record) => (
                <span>{record.createDate?record.createDate.replace('T',' '):'-'}</span>
              )
          },  {
            title: '角色',
            dataIndex: 'type',
            key: 'type',
            render: (text, record) => (
                <span className={record.type==1?'type lord':'type'}>{typeMap[record.type]}</span>
              )
          }, {
            title: '操作',
            key: 'action',
            render: (text, record) => (
                        matchStatus==1
                        ?record.type!=1?<span className="operate" onClick={(e)=>{this.changeMaster(record.memberId,record.nickName,e)}}>设为群主</span>:<span></span>
                        :<span className="operate" onClick={()=>{this.editPerson(record.memberId)}}>编辑</span>
                    )
          }]
        return (
            <div className="gi-member" >
                <SearchBox
                    iptChangeParams={this.iptChangeParams}
                    groupName={groupName}
                    nickName={nickName}
                    actions={this.props.actions}
                    confirmSearch={this.confirmSearch}
                />
                <div className="memberWrapper pageSize">
                    <div className="refresh" onClick={this.refreshMemberHandle}>
                        <div className="icon"></div>
                        <p className="txt">刷新群成员</p>
                    </div>
                    {
                        <Table 
                            rowKey={record => record.id} 
                            columns={columns} 
                            locale={{
                                emptyText: '暂无数据！'
                            }}
                            dataSource={personList} 
                            pagination={false}
                            loading={{
                                tip:"数据加载中...",
                                indicator:<Tableloading />,
                                spinning:loading
                            }}
                        />
                    }
                    {personEdit&&<EditBox groupId={groupId} memberId={memberId} cancelEdit={this.closeModal}/>}
                    <ModalBox
                        modalStatus={masterFlag}
                        modalTxt={'是否将【'+memberName+'】设为群主'}
                        cancelTxt={'取消'}
                        confirmTxt={'确定'}
                        modalStyle={modalStyle}
                        closeModalFunc={this.closeModal}
                        confirmFunc={this.confirmMaster}
                    />
                    <div className="pageFooter">
                        <PageRule
                            pageInfo={pageInfo}
                            searchParams={{ nickName }}
                            handlersearchData={this.handlersearchData}
                        />
                    </div>
                </div>
                <div className="page-backBtn" onClick={() => this.props.actions.goTo('/v2/GIScope')}>返回</div>
            </div>
        )
    }
}