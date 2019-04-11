import React, { Component } from 'react';

import { getMemberMessage, putMemberMessage, deleteMember } from '../../../funStore/FetchApi';

import './index.css'
import Tag from 'antd/lib/tag'
import Input from 'antd/lib/input'
import Tooltip from 'antd/lib/tooltip'
import Icon from 'antd/lib/icon'
import Checkbox from 'antd/lib/checkbox'
import 'antd/lib/tag/style/css'
import 'antd/lib/input/style/css'
import 'antd/lib/tooltip/style/css'
import 'antd/lib/icon/style/css'
import 'antd/lib/checkbox/style/css'
const CheckboxGroup = Checkbox.Group;

// const mocaMemberData = {"resultCode":"100","detailDescription":"success","resultContent":{"labels":null,"imMemPrivilegeResp":{"memId":"f5933f54-f3bb-4be3-a5e1-e13c2a067537","groupId":"46608fd3-93cb-4ba9-83cd-895a28f07af4","mapId":"1144fe67-7290-4f55-8d1a-9ffeac7af488","nickName":"叶振华","remarkName":null,"sourceType":2,"addMemberPrivilege":0,"dropMemberPrivilege":0,"phone":null,"createDate":"2018-12-05T21:10:29","updateDate":null,"isBlackList":0,"status":null,"iconPath":"http://wx.qlogo.cn/mmhead/ver_1/qD3Cr9BibuNP3wDX5ECufygYvfZWrYRIEQsPDLib2h77ibBjP5GadQia8amnMN8C9LevyTiaf4SKdkv35jcyK5HSHgw/132","level":0}}}

export default class PersonCard extends Component {
    constructor() {
        super();
        this.state = {
            manageShow: false,
            personDel: false,
            personEdit: false,
            inputNum: 0,
            // limitsOptions: [
            //     { label: '允许拉人', value: '1' },
            //     { label: '允许踢人', value: '2' }
            // ],
            tags: [],
            tagArr: [],
            inputVisible: false,
            inputValue: '',

            memberMessage: '',//成员信息
            limitObj: {},
            // limtArr: '',
            personEditContent: false
        };
        this.deletePerson = this.deletePerson.bind(this);
        this.confirmDel = this.confirmDel.bind(this);
        this.personDelShow = this.personDelShow.bind(this);
        this.remarkName = this.remarkName.bind(this);
        // this.changeLimits = this.changeLimits.bind(this);
        this.editPerson = this.editPerson.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.showInput = this.showInput.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleInputConfirm = this.handleInputConfirm.bind(this);
        this.saveInputRef = this.saveInputRef.bind(this);
    }

    deletePerson() {
        this.setState({
            manageShow: !this.state.manageShow,
            personDel: false
        })
    };
    editPerson(e) {
        // console.log(e)
        if (!this.state.personEdit) {
            if (e.groupId) {
                let params = {
                    groupId: e.groupId,
                    memberId: e.memberId
                };
                getMemberMessage(params).then(res => {
                    res = JSON.parse(res);
                    // res = mocaMemberData
                    if (res.resultCode === '100') {
                        let limitObj = {
                            holding: res.resultContent.imMemPrivilegeResp.addMemberPrivilege ? true : false,
                            kicking: res.resultContent.imMemPrivilegeResp.dropMemberPrivilege ? true : false
                        }
                        let a = [];
                        if (res.resultContent.imMemPrivilegeResp.addMemberPrivilege) {
                            a.push("1")
                        }
                        if (res.resultContent.imMemPrivilegeResp.dropMemberPrivilege) {
                            a.push("2")
                        }
                        this.setState({
                            memberMessage: res.resultContent.imMemPrivilegeResp,
                            tags: res.resultContent.labels || [],
                            tagArr: res.resultContent.labels || [],
                            personEditContent: true,
                            // limtArr: a,
                            limitObj,
                            inputNum: res.resultContent.imMemPrivilegeResp.remarkName?res.resultContent.imMemPrivilegeResp.remarkName.length:0
                        })
                    }
                }).catch(req => {
                    console.log(req)
                })
            }
        }
        this.setState({
            personEdit: !this.state.personEdit
        })

    }

    confirmDel(e) {
        // console.log("确认删除");
        let query = {};
        query[e.groupId] = e.memberId;
        let params = {
            query: query
        }
        deleteMember(params).then(res => {
            res = JSON.parse(res);
            if (res.resultCode === "100") {
                if (this.props.refreshFunc) {
                    this.props.refreshFunc();
                }
            } else {
                // console.log(res.detailDescription)
            }
            this.deletePerson();
        }).catch(req => {
            console.log(req)
            this.deletePerson();
        })

    }

    confirmEdit(e) {
        // console.log("确认编辑");
        // console.log(e);
        let params = {
            groupId: e.groupId,
            memberId: e.memId,
            query: {
                addMemberPrivilege: this.state.limitObj && this.state.limitObj.holding ? 1 : 0,
                dropMemberPrivilege: this.state.limitObj && this.state.limitObj.kicking ? 1 : 0,
                labels: this.state.tagArr,
                remarkName: this.state.memberMessage.remarkName
            }
        }
        // console.log(params)
        putMemberMessage(params).then(res => {
            res = JSON.parse(res);
            if (res.resultCode === '100') {
                if (this.props.refreshFunc) {
                    this.props.refreshFunc();
                }
                this.setState({
                    personEditContent: false
                })
            } else {
                // console.log(res.detailDescription)
            }
            this.editPerson();
        }).catch(req => {
            console.log(req)
            this.editPerson();
        })
    }

    personDelShow() {
        let { manageShow, personDel } = this.state;
        if (!manageShow) {
            this.setState({
                personDel: !personDel
            })
        }
    }

    remarkName(e) {
        let { memberMessage } = this.state
        memberMessage.remarkName = e.target.value
        this.setState({
            inputNum: e.target.value.length,
            memberMessage
        })
    }

    // changeLimits(checkedValues) {
    //     let params = {};
    //     checkedValues.map(item => {
    //         if (item == 1) {
    //             params.holding = true;
    //         }
    //         if (item == 2) {
    //             params.kicking = true;
    //         }
    //     })
    //     // console.log(params);
    //     this.setState({
    //         limitObj: params
    //     })
    // }
    handleClose = (removedTag) => {
        // console.log(removedTag);
        let tags = this.state.tags;
        let tagArr = this.state.tagArr;
        tags = tags.filter(tag => tag !== removedTag)
        let as = tagArr.find(tag => tag === removedTag);
        // console.log(as)
        if (as.id) {
            let a = tagArr.find(tag => tag === removedTag);
            a.flag = 0;
        } else {
            tagArr = tagArr.filter(tag => tag !== removedTag)
        }
        // console.log(tags);
        // console.log(tagArr);
        this.setState({ tags, tagArr });
    }
    showInput = () => {
        this.setState({ inputVisible: true }, () => this.input.focus());
    }
    handleInputChange = (e) => {
        this.setState({ inputValue: e.target.value });
    }
    handleInputConfirm = () => {
        let state = this.state;
        let inputValue = state.inputValue;
        let tags = state.tags;
        let tagArr = state.tagArr;
        if (inputValue && tags.indexOf(inputValue) === -1) {
            let se = {
                name: inputValue,
                flag: 1
            }
            tags = [...tags, se];
            tagArr = [...tagArr, se]
        }
        // console.log(tags);
        // console.log(tagArr);
        this.setState({
            tags,
            tagArr,
            inputVisible: false,
            inputValue: '',
        });
    }
    saveInputRef = input => this.input = input



    render() {
        let { manageShow, personDel, personEdit, inputNum,
            tags, inputVisible, inputValue, memberMessage, personEditContent } = this.state;
        let { dataParams } = this.props
        return (
            <div className="PersonCard">
                <div className="title-content" onClick={this.editPerson.bind(this, dataParams)}>
                    <div className="title">
                        <img className="img" src={dataParams.iconPath} />
                        <span className="text">{dataParams.remarkName || dataParams.nickName}</span>
                    </div>
                </div>
                <div className="content" onClick={this.editPerson.bind(this, dataParams)}>
                    <div className='contentItem'>
                        <aside className='left'>
                            <span>允许拉人：</span>
                            <span className="leftData">{dataParams.addMemberPrivilege ? "是" : "否"}</span>
                        </aside>
                        <aside className='left'>
                            <span>允许踢人：</span>
                            <span className="leftData">{dataParams.dropMemberPrivilege ? "是" : "否"}</span>
                        </aside>
                    </div>
                    <div className='contentItem'>
                        <span>入群时间：</span>
                        <span className="leftData">{dataParams.createDate.replace("T", " ")}</span>
                    </div>
                </div>
                <div className='footers'>
                    <div className="footerItem editBox" onClick={this.editPerson.bind(this, dataParams)}>
                        <span className='backGroupIcon edit'></span>
                        <span>编辑</span>
                    </div>
                    <div className='footerLine'></div>
                    <div className="footerItem manageBox" onMouseEnter={this.personDelShow}
                        onMouseLeave={this.personDelShow}>
                        <span className='backGroupIcon manage'></span>
                        <span>管理</span>
                        {
                            personDel ?
                                <div className='manageList'>
                                    <div className='triangle'></div>
                                    <span className='manageListItem' onClick={this.deletePerson}>踢出该群</span>
                                </div>
                                : ""
                        }
                        {
                            manageShow ? <div className='manageMain'>
                                <div className='manageText'>
                                    <span className='blackText'>确定要将</span>
                                    <span className='redText'>{dataParams.nickName}</span>
                                    <span className='blackText'>踢出该群吗？</span>
                                </div>
                                <div className='manageBtn'>
                                    <div className='cancel btn' onClick={this.deletePerson}>取消</div>
                                    <div className='confirm btn' onClick={this.confirmDel.bind(this, dataParams)}>确认
                                    </div>
                                </div>
                                <div className='triangle'></div>
                                <div className='closeManageMain backGroupIcon' onClick={this.deletePerson}></div>
                            </div> : ""
                        }

                    </div>
                </div>
                {
                    personEdit ?
                        <div className="personEditBox">
                            {personEditContent ?

                                <div className="personEditContent">
                                    <div className='personEditContentTitle'>编辑信息</div>
                                    <div className='personEditContentBox'>
                                        <img className='img' src={memberMessage.iconPath} />
                                        <span className='name'>{memberMessage.nickName}</span>
                                        <aside className='inputBox'>
                                            <span className='inputBoxTitle'>备注名：</span>
                                            <section className='inputMain'>
                                                <input maxLength='16' className='inputMainIpt' placeholder="请输入"
                                                    onChange={this.remarkName} value={memberMessage.remarkName||''} />
                                                <span className='inputMainIptNum'>{inputNum}/16</span>
                                            </section>
                                        </aside>
                                        <aside className='tagBox'>
                                            <span className='tagBoxTitle'>标签：</span>
                                            <section className='tagBoxMain'>
                                                {
                                                    tags.map((tag, index) => {
                                                        const isLongTag = tag.length > 20;
                                                        const tagElem = (
                                                            <Tag key={tag.id} closable
                                                                color="green"
                                                                afterClose={() => this.handleClose(tag)}>
                                                                {isLongTag ? `${tag.slice(0, 20)}...` : tag.name}
                                                            </Tag>
                                                        );
                                                        return isLongTag ?
                                                            <Tooltip title={tag.name} key={index}>{tagElem}</Tooltip> : tagElem;
                                                    })}
                                                {inputVisible && (
                                                    <Input
                                                        ref={this.saveInputRef}
                                                        type="text"
                                                        size="small"
                                                        style={{ width: 78 }}
                                                        value={inputValue}
                                                        onChange={this.handleInputChange}
                                                        onBlur={this.handleInputConfirm}
                                                        onPressEnter={this.handleInputConfirm}
                                                    />
                                                )}
                                                {!inputVisible && (
                                                    <Tag
                                                        onClick={this.showInput}
                                                        style={{ background: '#f8f8f8', borderColor: '#f8f8f8', marginBottom: "0" }}
                                                    >
                                                        <Icon type="plus" /> 添加标签
                                                </Tag>
                                                )}
                                            </section>
                                        </aside>
                                        {/* <aside className='checkBox'>
                                            <span className='checkBoxTitle'>权限：</span>
                                            <section className='checkBoxMain'>
                                                <CheckboxGroup
                                                    options={limitsOptions}
                                                    onChange={this.changeLimits}
                                                    defaultValue={limtArr}
                                                />
                                            </section>
                                        </aside> */}
                                        <div className='personEditContentBoxFooter'>
                                            <div className='cancel btn' onClick={this.editPerson}>取消</div>
                                            <div className='confirm btn' onClick={this.confirmEdit.bind(this, memberMessage)}>
                                                确认
                                        </div>
                                        </div>
                                    </div>
                                </div>
                                : ''}

                        </div>
                        :
                        ""
                }
            </div>
        )
    }
}