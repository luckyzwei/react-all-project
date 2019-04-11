import React, {Component} from "react";
import promiseXHR from "../../funStore/ServerFun";
import AuthProvider from "../../funStore/AuthProvider";
import {API_PATH} from "../../constants/OriginName";
import SelectBox from '../shareComponent/SelectBox'
import TipBox from './TipBox'
import PageRule from '../../components/shareComponent/PageRule'
import {tongji} from '../../funStore/tongji'

const adminListPath = API_PATH + '/basis-api/authsec/usermgmts'
export default class AdminListContent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectData: [
                {
                    selectLabel: '用户角色:',
                    selectOption: [],
                    paramaName: 'roleId',
                    paramaValue: []
                },
                {
                    selectLabel: '用户状态:',
                    selectOption: [],
                    paramaName: 'status',
                    paramaValue: []
                }
            ],

            adminList: '',
            pageInfo: {
                "currentPage": 0,
                "totalPage": 1,
                "pageSize": 20,
                "totalRecords": 1
            },
            searchParameters: {
                loginName: '',
                roleId: '',
                status: ''
            },
            echoItem: '',
            deleteAdmin: {
                checkAll: false,
                adminList: ''
            },
            tipStatus: 'default',
            showTipBox: false
        }
        this.searchAdminList = this.searchAdminList.bind(this)
        this._deleteAdminItem = this._deleteAdminItem.bind(this)
        this.setGroupName = this.setGroupName.bind(this)
        this.setParamasHandle = this.setParamasHandle.bind(this)
        this.showTipBpx = this.showTipBpx.bind(this)
        this.handleCheckAllBox = this.handleCheckAllBox.bind(this)
        this.editAdminItem = this.editAdminItem.bind(this)
        this.cancelTipBox = this.cancelTipBox.bind(this)
        this.confirmTipBox = this.confirmTipBox.bind(this)
    }

    componentWillMount() {
        this.searchHandleList()
    }

    searchHandleList=()=>{
        this.searchAdminList(this.state.pageInfo)
    }

    searchAdminList(pageInfo) {
        const {deleteAdmin, searchParameters} = this.state
        // console.log(searchParameters,'searchParameters===')
        const adminListUrl = adminListPath + '?_page=' + pageInfo.currentPage + '&_size=' + pageInfo.pageSize
        AuthProvider.getAccessToken()
            .then((resolve, reject) => {
                return promiseXHR(adminListUrl, {type: 'Bearer', value: resolve}, searchParameters, 'POST')
            })
            .then((res) => {
                const resData = JSON.parse(res)
                // console.log(resData,'resData-list')
                if (resData.resultCode == 100) {
                    this.setState({
                        adminList: resData.resultContent,
                        pageInfo: resData.pageInfo,
                        deleteAdmin: {
                            ...deleteAdmin,
                            adminList: resData.resultContent.map((item, i) => {
                                item.checked = false
                                return item
                            })
                        }
                    })
                }
            })
    }

    handlersearchData = (pageInfoVal) => {
        this.searchAdminList(pageInfoVal)
    }

    changeAdminList(value) {
        this.setState({
            pageInfo: value.pageInfo,
            deleteAdmin: {
                checkAll: false,
                adminList: value.resultContent.map((item, i) => {
                    item.checked = false
                    return item
                })
            }
        })
        if (this.props.getPageInfo) {
            this.props.getPageInfo(value.pageInfo)
        }
    }

    handleCheckAllBox() {
        const {adminList, deleteAdmin} = this.state
        this.setState({
            deleteAdmin: {
                checkAll: !deleteAdmin.checkAll,
                adminList: deleteAdmin.adminList.map((item, i) => {
                    return {
                        ...item,
                        checked: !deleteAdmin.checkAll
                    }
                })
            }
        })
    }

    handleCheckBox=(index,id)=> {
        const {adminList, deleteAdmin} = this.state
        let unselect = deleteAdmin.adminList.filter(v => !v.checked)
        let checkAll= false
        if(unselect.length===1&&unselect[0].id===id){
            checkAll = true
        }
        this.setState({
            deleteAdmin: {
                checkAll:checkAll,
                adminList: deleteAdmin.adminList.map((item, i) => {
                    return i == index ? {
                        ...item,
                        checked: !item.checked
                    } : item
                })
            }
        })
    }

    editAdminItem(id) {
        tongji(id?'Lzc_YongHuSheZhi_BianJi':'Lzc_YongHuSheZhi_XinZeng')
        if (this.props.goEditAdminItem) {
            this.props.goEditAdminItem(id)
        }
    }

    _deleteAdminItem() {
        const {deleteAdmin} = this.state
        const adminIds = deleteAdmin.adminList.filter((item, i) => (item.checked)).map((val, j) => (val.id))
        const url = API_PATH + '/basis-api/authsec/usermgmts'
        tongji('Lzc_YongHuSheZhi_ShanChu')
        AuthProvider.getAccessToken()
            .then((resolve, reject) => {
                return promiseXHR(url, {type: 'Bearer', value: resolve}, {'ids': adminIds}, 'DELETE')
            })
            .then((res) => {
                const resData = JSON.parse(res)
                if (resData.resultCode == 100) {
                    this.searchHandleList()
                }
            })
    }

    setParamasHandle(name, value) {
        let searchParameters = this.state.searchParameters
        searchParameters[name] = value
        this.setState({
            searchParameters: searchParameters
        })
    }

    setGroupName(e) {
        let searchParameters = this.state.searchParameters
        searchParameters['loginName'] = e.target.value
        this.setState({
            searchParameters: searchParameters
        })
    }

    showTipBpx() {
        this.setState({
            tipStatus: 'DELETE_ALL',
            showTipBox: true
        })
    }

    cancelTipBox() {
        this.setState({
            showTipBox: false
        })
    }

    confirmTipBox() {
        let promise = new Promise((resolve, reject) => {
            resolve(this._deleteAdminItem())
        })
        promise.then(() => {
            this.setState({
                showTipBox: false
            })
        })
    }

    render() {
        const {roleList, statusList} = this.props
        const {pageInfo, searchParameters, deleteAdmin, tipStatus, showTipBox} = this.state
        let selectData = this.state.selectData
        selectData.forEach((val, index) => {
            val.selectOption.length = 0
            val.paramaValue.length = 0
        })
        for (let i = 0; i < roleList.length; i++) {
            selectData[0].selectOption.push(roleList[i].name)
            selectData[0].paramaValue.push(roleList[i].id)
        }
        for (let i = 0; i < statusList.length; i++) {
            selectData[1].selectOption.push(statusList[i].displayValue)
            selectData[1].paramaValue.push(statusList[i].value)
        }
        return (
            <div className="tm-listContent">
                <div className="searchBox">
                    <div className="selectWrapper">
                        <div className="selectLabel">用户名:</div>
                        <input className='titleInput' type='text' placeholder='请输入用户名称' onChange={this.setGroupName}/>
                    </div>
                    {
                        selectData.map((item, i) => (
                            <SelectBox selectLabel={item.selectLabel}
                                       selectOption={item.selectOption}
                                       paramName={item.paramaName}
                                       paramaValue={item.paramaValue}
                                       setparamsHandle={this.setParamasHandle}
                            />
                        ))
                    }
                    <div className="searchBtn" onClick={()=>{this.searchHandleList();tongji('Lzc_YongHuSheZhi_SouSuo')}}>搜索</div>
                </div>
                <div className="tableContent">
                    <div className="operateArea">
                        <div className="addAdmin"
                             onClick={()=>{this.editAdminItem(null)}}>新增用户
                        </div>
                        {
                            deleteAdmin.adminList!=''&&deleteAdmin.adminList.find(v=>v.checked)
                                ? <div className="deleteAdmin" onClick={this.showTipBpx}><em className="icon-cw"/>删除</div>
                                :null
                        }
                    </div>
                    <div className="tableArea">
                        <table>
                            <thead>
                            <tr>
                                <th>
                                    <div className="checkBox">
                                        <em className={deleteAdmin.checkAll?'icon-set checked' : 'icon-set unchecked'}
                                            onClick={this.handleCheckAllBox}
                                        />
                                    </div>
                                </th>
                                <th>序号</th>
                                <th>用户名</th>
                                <th>用户角色</th>
                                <th>用户状态</th>
                                <th>管理群数量</th>
                                <th>操作</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                deleteAdmin.adminList ?
                                    deleteAdmin.adminList.map((item, i) => (
                                        <tr>
                                            <th>
                                                <div className="checkBox" key={i}>
                                                    <em className={item.checked ? 'icon-set checked' : 'icon-set unchecked'}
                                                        onClick={()=>this.handleCheckBox(i,item.id)}
                                                    />
                                                </div>
                                            </th>
                                            <td>{i + 1 + pageInfo.currentPage * 10}</td>
                                            <td>{item.loginName ? item.loginName : '--'}</td>
                                            <td>{item.roleName ? item.roleName : '--'}</td>
                                            <td>
                                                {
                                                    item.statusName ? <span
                                                        style={{color: item.statusName == '停用' ? '#FF99A5' : ''}}>{item.statusName}</span> : '--'
                                                }

                                            </td>
                                            <td>{item.groupNum ? item.groupNum : '--'}</td>
                                            <td className='edit' onClick={()=>{this.editAdminItem(item.id)}}>
                                                编辑
                                            </td>
                                        </tr>
                                    )) : null
                            }
                            </tbody>
                            <tfoot>
                            <tr>
                                <td colSpan='7' style={{textAlign: 'center'}}>
                                    <PageRule
                                        pageInfo={pageInfo}
                                        handlersearchData={this.handlersearchData}
                                    />
                                </td>
                            </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
                {tipStatus != 'default' ? <TipBox status={tipStatus}
                                                  showTipBox={showTipBox}
                                                  cancelTipBox={this.cancelTipBox}
                                                  confirmTipBox={this.confirmTipBox}
                /> : null}
            </div>
        )
    }
}
