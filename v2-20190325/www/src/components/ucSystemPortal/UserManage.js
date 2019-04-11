import React, { Component } from 'react'
import promiseXHR from '../../funStore/ServerFun'
import AuthProvider from '../../funStore/AuthProvider'
import { API_PATH } from '../../constants/OriginName'
import ButtonBox from '../shareComponent/ButtonBox';
import {tongji} from '../../funStore/tongji'

export default class UserManage extends Component {
    constructor(props) {
        super(props)
        this.changeStatus = this.changeStatus.bind(this)
        this.sureChangeStatus = this.sureChangeStatus.bind(this)
        this.goPower = this.goPower.bind(this)
        this.state = {
            allData: [],
            roleType: [],
            statusDes: '您确定停用此用户吗',
            showMask: false,
            id: '',
            preStatus: '',
            screenWidth: document.documentElement.clientWidth,
            screenHeight: document.documentElement.clientHeight
        }
    }
    componentWillMount() {
        const url = API_PATH + '/basis-api/authsec/roles/allStatus'
        AuthProvider.getAccessToken()
            .then((resolve, reject) => {
                return promiseXHR(url, { type: 'Bearer', value: resolve }, null, 'GET');
            })
            .then((res) => {
                const resData = JSON.parse(res);
                this.setState({
                    allData: resData.resultContent,
                })
            })
        const roleurl = API_PATH + '/basis-api/authsec/sysdic/ROLE/TYPE';
        AuthProvider.getAccessToken()
            .then((resolve, reject) => {
                return promiseXHR(roleurl, { type: 'Bearer', value: resolve }, null, 'GET');
            })
            .then((res) => {
                const resData = JSON.parse(res).resultContent;
                this.setState({
                    roleType: resData
                })
            })
    }
    componentDidMount() {
        window.onresize = () => {
            this.setState({
                screenWidth: document.documentElement.clientWidth,
                screenHeight: document.documentElement.clientHeight
            })
        }
    }
    changeStatus(id, preStatus) {
        tongji(preStatus == 1 ?'Lzc_YongHuJueSe_TingYong':'Lzc_YongHuJueSe_QiYong')
        this.setState({
            statusDes: preStatus == 1 ? '您确定停用此用户吗？' : '您确定启用此用户吗？',
            showMask: true,
            id: id,
            preStatus: preStatus
        })
    }
    sureChangeStatus() {
        const { id, preStatus } = this.state
        const status = preStatus == 1 ? 2 : 1
        const url = API_PATH + '/basis-api/authsec/role/' + id + '/status?_status=' + status
        AuthProvider.getAccessToken()
            .then((resolve, reject) => {
                return promiseXHR(url, { type: 'Bearer', value: resolve }, null, 'PUT');
            })
            .then((res) => {
                const resData = JSON.parse(res);
                if (resData.resultCode == 100) {
                    this.setState({
                        allData: this.state.allData.map((item) => {
                            return item.id == id ? {
                                ...item,
                                status: status
                            } : item
                        }),
                        showMask: false
                    })
                }
            })
    }
    goPower(value, show) {
        tongji(value?'Lzc_YongHuJueSe_Bianji':'Lzc_YongHuJueSe_XinZeng')
        this.props.changeViewShow(value, show)
    }
    closeMask() {
        this.setState({
            showMask: false
        })
    }
    render() {
        const { allData, roleType } = this.state;

        return (
            <div className="user-list-content">
                <div className="user-list">
                    <ButtonBox
                        btnTxt={'新增角色'}
                        isCancel={false}
                        btnFunc={()=>{this.goPower('', 'POWER')}}
                    />
                    <div className="user-list-table">
                        <table>
                            <thead>
                                <tr>
                                    <th>序号</th>
                                    <th>用户角色</th>
                                    <th>角色状态</th>
                                    <th>操作</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    allData.map((item, index) => {
                                        let value = ''
                                        if (item.type != null && typeof item.type != 'string') {
                                            let _roleType = roleType.find(val => parseInt(val.value) == item.type)
                                            value = _roleType?_roleType.displayValue:'-'
                                        }
                                        return (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{item.name}</td>
                                                <td>{item.status == 1 ? '正常' : '停用'}</td>
                                                <td className='ucEdit'>
                                                    <span onClick={()=>{this.goPower(item, 'POWER')}} className='edit'>编辑</span>
                                                    <span className='ucEdit-line'></span>
                                                    <span
                                                        className={item.status == 1 ? 'stopUse' : 'startUse'}
                                                        onClick={() => { this.changeStatus(item.id, item.status) }}
                                                    >{item.status == 1 ? '停用' : '启用'}</span>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
                {
                    this.state.showMask ?
                        <div className="sureMask" style={{ width: this.state.screenWidth, height: this.state.screenHeight }}>
                            <div className="sureStop">
                                <em className="icon-set" onClick={this.closeMask.bind(this)}></em>
                                <div className="sureDec">
                                    <p>{this.state.statusDes}</p>
                                    <span onClick={this.sureChangeStatus}>确定</span>
                                </div>
                            </div>
                        </div>
                        : ''
                }

            </div>
        )
    }

}