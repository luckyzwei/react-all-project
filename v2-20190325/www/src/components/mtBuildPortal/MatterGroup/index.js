/**
 * 创建时间:2018-09-12 10:13:28
 * 作者：sufei  Xerath
 * 邮箱：fei.su@gemii.cc
 * 版本号：1.0
 * @版权所有
 **/
import React, {Component} from 'react'
import './index.css'

import MtGSModule from '../MtGSModule';

import ButtonBox from '../../shareComponent/ButtonBox'
import {getUserTag, getSearchGroup} from '../../../funStore/FetchApi'
import {sendEvent} from "../../../funStore/CommonFun";

export default class MtGroup extends Component {
    constructor() {
        super();
        this.state = {
            searchStyle: 1,
            primaryIpt: '',//预选输入框
            chooseIpt: '',//选中输入框
            primaryTagArr: [],//预选tag内容
            searchPrimaryTagArr: [],//筛选预选tag内容
            primaryArr: [],//预选group内容
            primaryArrCopy: [],//预选group内容
            searchPrimaryArr: [],//筛选预选group内容
            chooseArr: [],//选中内容
            searchChooseArr: [],//筛选选中内容
            primarySelectArr: [],//选中预选框中的
            chooseSelectArr: [],//选中选择框中的
            saveModule: false

        }
        this.changeSStyle = this.changeSStyle.bind(this)
        this.setparamshandle = this.setparamshandle.bind(this)
        this.chooseToPrimary = this.chooseToPrimary.bind(this)
        this.primaryToChoose = this.primaryToChoose.bind(this)
        this.formatPrimaryArr = this.formatPrimaryArr.bind(this)
        this.formatChooseArr = this.formatChooseArr.bind(this)
        this.changeSaveModule = this.changeSaveModule.bind(this)
    }

    changeSaveModule() {
        this.setState({
            saveModule: !this.state.saveModule
        })
    }

    changeSStyle(e) {
        this.setState({
            searchStyle: parseInt(e.target.getAttribute("value"))
        })
    }

    formatPrimaryArr(s) {
        let {primaryArr} = this.state;
        let searchPrimaryArr = [];
        if (s.length) {
            for (let i = 0; i < primaryArr.length; i++) {
                if (primaryArr[i].name.indexOf(s) > -1) {
                    searchPrimaryArr.push(primaryArr[i])
                }
            }
        } else {
            searchPrimaryArr = primaryArr;
        }
        this.setState({searchPrimaryArr})
    }

    formatChooseArr(s) {
        let {chooseArr} = this.state;
        let searchChooseArr = [];
        if (s.length) {
            for (let i = 0; i < chooseArr.length; i++) {
                if (chooseArr[i].name.indexOf(s) > -1) {
                    searchChooseArr.push(chooseArr[i])
                }
            }
        } else {
            searchChooseArr = chooseArr;
        }
        this.setState({searchChooseArr})
    }

    setparamshandle(e, s) {
        switch (e) {
            case 'primaryipt':
                let {searchStyle} = this.state;
                this.setState({
                    primaryIpt: s
                })
                if (searchStyle == 1) {
                    this.formatPrimaryArr(s);
                } else if (searchStyle == 0) {
                    let {primaryTagArr} = this.state;
                    let searchPrimaryTagArr = [];
                    if (s.length) {
                        for (let i = 0; i < primaryTagArr.length; i++) {
                            if (primaryTagArr[i].name.indexOf(s) > -1) {
                                searchPrimaryTagArr.push(primaryTagArr[i]);
                            }
                        }
                    } else {
                        searchPrimaryTagArr = primaryTagArr;
                    }
                    this.setState({
                        searchPrimaryTagArr
                    })
                }
                break;
            case "chooseipt":
                this.setState({
                    chooseIpt: s
                })
                this.formatChooseArr(s);
                break;
            case "choose":
                this.setState({
                    chooseSelectArr: s
                })
                break;
            case "primary":
                this.setState({
                    primarySelectArr: s
                })
                break;
            case "primarytag":
                let params = {
                    "bizType": 11,
                    "contentType": 2,
                    "labels": s.map(item => item.name)
                }
                getSearchGroup(params).then(res => {
                    res = JSON.parse(res);
                    if (res.resultCode == '100') {
                        for (let i = 0; i < res.resultContent.length; i++) {
                            res.resultContent[i].select = true;
                            res.resultContent[i].iconPath = `${process.env.PUBLIC_URL}/images/group/group${parseInt(Math.random() * 10)}.png`
                        }
                        this.setState({
                            primaryArr: this.state.primaryArrCopy,
                            chooseArr: [],
                            primarySelectArr: res.resultContent,
                        }, () => {
                            this.primaryToChoose()
                        })
                    } else {
                        // console.log(res.detailDescription);
                    }
                }).catch(req => {
                    console.log(req)
                })
                break;
            default:
                break;
        }

    }

    chooseToPrimary() {
        let {chooseSelectArr, chooseArr, primaryArr, primaryIpt, chooseIpt, primaryTagArr} = this.state;
        primaryArr.push(...chooseSelectArr);
        for (let i = 0; i < chooseSelectArr.length; i++) {
            chooseArr = chooseArr.filter(item => item.id != chooseSelectArr[i].id)
        }
        primaryArr = primaryArr.map(item => {
            item.select = false;
            return item;
        });
        primaryTagArr = primaryTagArr.map(item => {
            item.select = false;
            for (let i = 0; i < chooseArr.length; i++) {
                for (let j = 0; j < chooseArr[i].groupLabelProfiles.length; j++) {
                    if (chooseArr[i].groupLabelProfiles[j].name.indexOf(item.name) > -1) {
                        item.select = true;
                    }
                }
            }
            return item;
        })
        this.setState({
            chooseSelectArr: [],
            chooseArr,
            primaryArr,
            primaryTagArr
        }, () => {
            this.formatPrimaryArr(primaryIpt);
            this.formatChooseArr(chooseIpt);
        })
    }

    primaryToChoose() {
        let {primarySelectArr, chooseArr, primaryArr, primaryIpt, chooseIpt, primaryTagArr} = this.state;
        if (chooseArr.length) {
            for (let i = 0; i < chooseArr.length; i++) {
                chooseArr[i].select = false;
            }
        }
        chooseArr.push(...primarySelectArr);
        for (let i = 0; i < primarySelectArr.length; i++) {
            primaryArr = primaryArr.filter(item => item.id != primarySelectArr[i].id)
        }
        if (chooseArr.length) {
            primaryTagArr = primaryTagArr.map(item => {
                for (let i = 0; i < chooseArr.length; i++) {
                    for (let j = 0; j < chooseArr[i].groupLabelProfiles.length; j++) {
                        if (chooseArr[i].groupLabelProfiles[j].name.indexOf(item.name) > -1) {
                            item.select = true;
                        }
                    }
                }
                return item;
            })
        }
        // chooseArr = chooseArr.map(item => {
        //     item.select = false;
        //     return item;
        // });
        this.setState({
            primarySelectArr: [],
            chooseSelectArr: primarySelectArr,
            chooseArr,
            primaryArr,
            primaryTagArr
        }, () => {
            this.formatPrimaryArr(primaryIpt);
            this.formatChooseArr(chooseIpt);
        })
    }

    componentDidMount() {
        getUserTag().then(res => {
            res = JSON.parse(res);
            if (res.resultCode == "100") {
                this.setState({
                    primaryTagArr: res.resultContent
                })
            }
            else {
                // console.log(res.detailDescription)
            }
        }).catch(req => {
            console.log(req)
        })

        let params = {
            "bizType": 11,
            "city": null,
            "content": "",
            "contentType": 1,
            "innerId": null,
            "labels": [],
            "matchStatus": null,
            "monitorId": null,
            "name": null,
            "province": null,
            "tenantId": null
        }
        getSearchGroup(params).then(res => {
            res = JSON.parse(res);
            if (res.resultCode == "100") {

                for (let i = 0; i < res.resultContent.length; i++) {
                    res.resultContent[i].iconPath = `${process.env.PUBLIC_URL}/images/group/group${parseInt(Math.random() * 10)}.png`
                }
                let primarySelectArr = [];
                if (this.props.groupIdArray.length) {
                    // console.log(this.props.groupIdArray);
                    for (let i = 0; i < this.props.groupIdArray.length; i++) {
                        let arrItem = res.resultContent.find(item => {
                            if (item.id === this.props.groupIdArray[i].id) {
                                item.select = true
                                return item;
                            }
                        });
                        if (arrItem) {
                            primarySelectArr.push(arrItem)
                        }
                    }
                }
                ;
                this.setState({
                    primaryArr: res.resultContent,
                    primaryArrCopy: res.resultContent,
                    primarySelectArr,
                }, () => {
                    this.formatPrimaryArr(this.state.primaryIpt);
                    this.primaryToChoose();
                })
            }
            else {
                // console.log(res.detailDescription)
            }
        }).catch(req => {
            console.log(req)
        })


    }

    componentWillReceiveProps(nextProps) {
        if (this.props.repeatGroupId != nextProps.repeatGroupId && nextProps.repeatGroupId) {
            let {searchChooseArr} = this.state;
            nextProps.repeatGroupId.map(item => {
                searchChooseArr.find(items => {
                    if (items.id == item) {
                        items.repeatId = true
                    }
                })
            })
            this.setState({
                searchChooseArr
            })
        }
    }

    render() {
        let {
            searchStyle, primaryIpt, chooseIpt, primaryArr, chooseArr,
            primarySelectArr, chooseSelectArr, primaryTagArr,
            searchPrimaryTagArr, searchChooseArr, searchPrimaryArr, saveModule
        } = this.state;
        let {saveGroupStatus, changeStep, repeatGroupId, viewId} = this.props;
        return (
            <div className='MtGroup'>
                <div className="MtGroup-header">
                    <div className='MtGroup-header-left'>
                        <span value="1" onClick={this.changeSStyle}
                              className={searchStyle ? "MtGroup-header-nav active" : "MtGroup-header-nav"}>精准查询</span>
                        <span value='0' onClick={this.changeSStyle}
                              className={searchStyle ? "MtGroup-header-nav" : "MtGroup-header-nav active"}>标签筛选</span>
                    </div>
                </div>
                <div className="MtGroup-content">
                    <MtGSModule
                        value={primaryIpt}
                        searchStyle={searchStyle}
                        placeholder={searchStyle ? "输入文字筛选群" : "输入文字筛选标签"}
                        contentValue={searchStyle ? searchPrimaryArr : (searchPrimaryTagArr.length ? searchPrimaryTagArr : primaryTagArr)}
                        paramsname={'primary'}
                        setparamshandle={this.setparamshandle}
                    />
                    <div className="MtGroup-content-shuttle">
                        <div
                            className={chooseSelectArr.length ? "MtGroup-content-shuttle-item left active" : "MtGroup-content-shuttle-item left"}
                            onClick={this.chooseToPrimary}
                        ></div>
                        <div
                            className={primarySelectArr.length ? "MtGroup-content-shuttle-item right active" : "MtGroup-content-shuttle-item right"}
                            onClick={this.primaryToChoose}
                        ></div>
                    </div>
                    <MtGSModule
                        value={chooseIpt}
                        placeholder={"输入文字筛选群"}
                        contentValue={searchChooseArr}
                        paramsname={'choose'}
                        setparamshandle={this.setparamshandle}
                    />
                </div>
                <div className="MtGroup-footer">
                    <ButtonBox
                        btnTxt={'上一步'}
                        isCancel={true}
                        btnFunc={() => {
                            changeStep('STEP2')
                        }}
                        btnStyle={{marginRight: '30px'}}
                    />
                    <ButtonBox
                        btnTxt={'保存'}
                        isCancel={false}
                        btnFunc={() => {
                            // console.log(searchChooseArr);
                            let ids = searchChooseArr.map(item => {
                                return {id: item.id}
                            });
                            if (viewId) {
                                this.props.updateGroupId(ids)
                            } else {
                                this.props.saveGroupId(ids)
                            }

                            // console.log("保存")
                        }}
                    />
                </div>
            </div>
        )
    }
}
