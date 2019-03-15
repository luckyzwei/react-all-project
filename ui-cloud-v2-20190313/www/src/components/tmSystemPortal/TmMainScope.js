import React, {Component, PropTypes} from "react";
import promiseXHR from "../../funStore/ServerFun";
import AuthProvider from "../../funStore/AuthProvider";
import {API_PATH} from "../../constants/OriginName";
import AdminListContent from "./AdminListContent";
import MinorModule from "./MinorModule";

export default class TmMainScope extends Component {
    constructor() {
        super()
        this.state = {
            viewController: '',
            // viewController: 'MINOR_MODULE',
            roleList: [],
            statusList: [],
            echoId: '',
            selectDataEdit: [
                {
                    selectLabel: '角色:',
                    selectOption: [],
                    paramaName: 'roleIds',
                    paramaValue: [],
                    echoIndex: '',
                    paramDefault:{}
                },
                {
                    selectLabel: '状态:',
                    selectOption: [],
                    paramaName: 'status',
                    paramaValue: [],
                    echoIndex: '',
                    paramDefault: {}
                }
            ],
        }
    }

    componentWillMount() {
        const {selectDataEdit} =this.state
        //请求角色列表
        const roleUrl = API_PATH + '/basis-api/authsec/roles'
        AuthProvider.getAccessToken()
            .then((resolve, reject)=> {
                return promiseXHR(roleUrl, {type: 'Bearer', value: resolve}, null, 'GET')
            })
            .then((res)=> {
                const resData = JSON.parse(res)
                if (resData.resultCode == 100) {
                    let content = resData.resultContent
                    this.setState({
                        roleList: resData.resultContent
                    })
                    for (let i = 0; i < content.length; i++) {
                        selectDataEdit[0].selectOption.push(content[i].name)
                        selectDataEdit[0].paramaValue.push(content[i].id)
                    }
                }
            })
        //请求角色状态
        const statusUrl = API_PATH + '/basis-api/authsec/sysdic/USER/STATUS'
        AuthProvider.getAccessToken()
            .then((resolve, reject)=> {
                return promiseXHR(statusUrl, {type: 'Bearer', value: resolve}, null, 'GET')
            })
            .then((res)=> {
                const resData = JSON.parse(res)
                if (resData.resultCode == 100) {
                    let content = resData.resultContent
                    this.setState({
                        statusList: resData.resultContent
                    })
                    for (let i = 0; i < content.length; i++) {
                        selectDataEdit[1].selectOption.push(content[i].displayValue)
                        selectDataEdit[1].paramaValue.push(content[i].value)
                    }
                }
            })
    }

    goEditAdminItem=(id)=> {
        // console.log('run edit')
        this.setState({
            viewController: 'MINOR_MODULE',
            echoId: id
        })
    }

    goHome() {
        this.setState({
            viewController: 'ADMIN_LIST_CONTENT'

        })
    }

    render() {
        const {actions,userInfo} = this.props
        const {viewController, roleList, statusList, echoId,pageInfo} = this.state
        let viewScope = null
        switch (viewController) {
            case 'ADMIN_LIST_CONTENT':
                viewScope = <AdminListContent goEditAdminItem={this.goEditAdminItem.bind(this)}
                                              roleList={roleList}
                                              statusList={statusList}

                />
                break
            case 'MINOR_MODULE':
                viewScope = <MinorModule goHome={this.goHome.bind(this)}
                                         echoId={echoId}
                                         selectDataEdit={this.state.selectDataEdit}

                />
                break
            default:
                viewScope = <AdminListContent goEditAdminItem={this.goEditAdminItem.bind(this)}
                                              roleList={roleList}
                                              statusList={statusList}
                />
                break
        }
        return (
            <div className="jm-container">
                {viewScope}
            </div>
        )
    }
}
