import React, {Component} from 'react'
import promiseXHR from '../../funStore/ServerFun'
import AuthProvider from '../../funStore/AuthProvider'
import {API_PATH} from '../../constants/OriginName'
import UserPowerDetail from './UserPowerDetail'
// import SelectBox from '../mtSystemPortal/SelectBox'
import ButtonBox from '../shareComponent/ButtonBox';


export default class UserPower extends Component {
    constructor() {
        super();
        this.state = {
            menuMsg: [],
            listMsg: [],
            checkedAll: false,
            userName: '',
            searchParamas: {
                "code": "",
                "menuIds": [],
                "name": "",
                "type": "",
            },
            disable: false,
            showFail: {name: false, type: false},
            // selectData: [{
            //     selectLabel: '角色类型',
            //     selectOption: [],
            //     paramaName: 'type',
            //     paramaValue: []
            // },]
        }
        this.changeMenuMsg = this.changeMenuMsg.bind(this)
        this.setParamasHandle = this.setParamasHandle.bind(this)
    }

    componentWillMount() {
        // console.log('wqer', this.props.detailMsg);
        // let selectData = this.state.selectData
        let searchParamas = this.state.searchParamas
        let roleUrl;
        if (this.props.detailMsg == '') {
            roleUrl = API_PATH + '/basis-api/authsec/v2/menu/tree';
        } else {
            searchParamas.type = this.props.detailMsg.type
            roleUrl = API_PATH + '/basis-api/authsec/v2/menu/tree/' + this.props.detailMsg.id
            this.setState({
                userName: this.props.detailMsg.name
            })
        }
        AuthProvider.getAccessToken()
            .then((resolve, reject) => {
                return promiseXHR(roleUrl, {type: 'Bearer', value: resolve}, null, 'GET')
            })
            .then((res) => {
                // console.log(JSON.parse(res));
                this.setState({
                    menuMsg: JSON.parse(res).resultContent
                })
            })
        // const url = API_PATH + '/basis-api/authsec/role/types';
        // AuthProvider.getAccessToken()
        //     .then((resolve, reject) => {
        //         return promiseXHR(url, { type: 'Bearer', value: resolve }, null, 'GET');
        //     })
        //     .then((res) => {
        //         const resData = JSON.parse(res).resultContent;
        //         // console.log(resData);
        //         resData.forEach((item, index) => {
        //             // console.log(1212, item)
        //             selectData[0].selectOption.push(item.displayValue)
        //             selectData[0].paramaValue.push(item.value)
        //         })
        //         this.setState({
        //             selectData: selectData,
        //             listMsg: resData
        //         })
        //     })

    }

    componentDidMount() {

    }

    changeUserName(e) {
        this.setState({
            userName: e.target.value
        })
    }

    changeMenuMsg(value) {
        this.setState({
            menuMsg: value
        })
    }

    setParamasHandle(name, value) {
        let searchParamas = this.state.searchParamas
        searchParamas[name] = parseInt(value)
        // console.log(searchParamas)
        this.setState({
            searchParamas: searchParamas
        })
    }

    saveChange() {
        const {detailMsg} = this.props;
        const {selectData,} = this.state;
        // console.log(selectData)
        let {menuMsg, searchParamas, userName, showFail, clickNum, disable, selectId, iptId} = this.state;
        // console.log(searchParamas)
        this.setState({
            disable: true,
        });
        searchParamas.menuIds = [];
        menuMsg.forEach((item, index) => {
            if (item.selected) {
                searchParamas.menuIds.push(item.id)
            }
            if (item.children != null) {
                item.children.forEach((value, i) => {
                    if (value.selected) {
                        searchParamas.menuIds.push(value.id)
                    }
                    if (value.children != null) {
                        value.children.forEach((v, j) => {
                            if (v.selected) {
                                searchParamas.menuIds.push(v.id)
                            }
                        })
                    }
                })
            }
        });
        // console.log(detailMsg, 'detailMsg');
        if (detailMsg == '') {
            searchParamas.name = userName;
            let isSave = true;
            for (let key in searchParamas) {
                if (!searchParamas[key]) {
                    if (key == 'name') {
                        isSave = false;
                        showFail[key] = true
                    } else {
                        showFail.name = false
                        // showFail.type = false
                    }
                }
            }
            // console.log(searchParamas, showFail);

            if (isSave) {
                const url = API_PATH + '/basis-api/authsec/role/menus';
                AuthProvider.getAccessToken()
                    .then((resolve, reject) => {
                        return promiseXHR(url, {type: 'Bearer', value: resolve}, searchParamas, 'POST')
                    })
                    .then((res) => {
                        const resData = JSON.parse(res)
                        if (resData.resultCode == 100) {
                            this.setState({
                                disable: true
                            })
                            this.props.changeViewShow('MANAGE', this.props.detailMsg)
                        } else {
                            this.setState({
                                disable: false
                            })
                            alert(resData.resultCode)
                        }
                    })
            } else {
                this.setState({
                    disable: false
                })
            }

        } else {
            searchParamas.name = userName;
            let isSave = true;
            // console.log(searchParamas);
            for (let key in searchParamas) {
                if (!searchParamas[key]) {
                    if (key == 'name') {
                        // console.log(123123123, searchParamas)
                        isSave = false;
                        showFail[key] = true
                    } else {
                        showFail.name = false
                        // showFail.type = false
                    }
                }
            }
            // console.log(isSave, 'isSave')
            // console.log(searchParamas)
            if (isSave) {
                const url = API_PATH + '/basis-api/authsec/role/' + detailMsg.id + '/menus';
                AuthProvider.getAccessToken()
                    .then((resolve, reject) => {
                        return promiseXHR(url, {type: 'Bearer', value: resolve}, searchParamas, 'PUT')
                    })
                    .then((res) => {
                        const resData = JSON.parse(res)
                        if (resData.resultCode == 100) {
                            this.setState({
                                disable: true
                            })
                            this.props.changeViewShow('MANAGE', this.props.detailMsg)
                        } else {
                            this.setState({
                                disable: false
                            })
                            alert(resData.resultCode)
                        }
                    })
            } else {
                this.setState({
                    disable: false
                })
            }


        }
    }

    render() {
        const {menuMsg, userName, disable, selectData, showFail, listMsg, checkedAll} = this.state
        // console.log(listMsg);
        let value;
        let id;
        if (this.props.detailMsg != '') {
            listMsg.forEach((item, index) => {
                if (parseInt(item.value) == this.props.detailMsg.type) {
                    value = item.displayValue;
                    id = parseInt(item.value)
                }
            })
        }
        // console.log(value, id)
        return (
            <div className="user-power-list">
                <div className="userNameSet">
                    <p><span style={{display: 'inline-block', width: '70px'}}>角色名称：</span>
                        <input
                            type="text"
                            placeholder="请输入角色名"
                            value={userName}
                            id={showFail.name ? 'fail' : ''}
                            onChange={this.changeUserName.bind(this)}
                        />
                    </p>
                    {/* {
                        this.props.detailMsg=='' ?
                        selectData.map((item,i)=>{
                            return <SelectBox
                                key={i}
                                selectLabel={item.selectLabel}
                                selectOption={item.selectOption}
                                paramaName={item.paramaName}
                                paramaValue={item.paramaValue}
                                setParamasHandle = {this.setParamasHandle}
                                id={showFail.type?"fail":''}
                            />
                        })
                            : selectData.map((item,i)=>{
                            return <SelectBox
                                key={i}
                                selectLabel={item.selectLabel}
                                selectOption={item.selectOption}
                                paramaName={item.paramaName}
                                paramaValue={item.paramaValue}
                                setParamasHandle = {this.setParamasHandle}
                                id={showFail.type?"fail":''}
                                paramDefault={{name:value,id:id}}
                            />
                        })
                    } */}
                    <div className="clearFloat"></div>
                </div>
                <div className="user-power-set">
                    <p>用户权限：</p>
                    <div className="userPower">
                        <div className="set-power">
                            {
                                menuMsg.length > 0
                                    ? <UserPowerDetail menuMsg={menuMsg} changeMenuMsg={this.changeMenuMsg}/>
                                    : ''
                            }

                        </div>
                        <div className="userPowerBottom">
                            <ButtonBox
                                btnTxt={'返回'}
                                isCancel={true}
                                btnFunc={() => {
                                    this.props.changeViewShow('MANAGE', this.props.detailMsg)
                                }}
                            />
                            <ButtonBox
                                btnTxt={'保存'}
                                isCancel={false}
                                btnFunc={this.saveChange.bind(this)}
                            />

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}