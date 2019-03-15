
import React, {Component} from 'react'
import './index.css'

import MtGSModule from '../MtGSModule';

import ButtonBox from '../../shareComponent/ButtonBox'
import ModalBox from '../../shareComponent/ModalBox'
import {getUserTag, getSearchGroup} from '../../../funStore/FetchApi'

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
            saveModule: false,
            modalStyle: {}

        }
        this.changeSStyle = this.changeSStyle.bind(this)
        this.setparamshandle = this.setparamshandle.bind(this)
        this.chooseToPrimary = this.chooseToPrimary.bind(this)
        this.primaryToChoose = this.primaryToChoose.bind(this)
        this.formatPrimaryArr = this.formatPrimaryArr.bind(this)
        this.formatChooseArr = this.formatChooseArr.bind(this)
        this.changeSaveModule = this.changeSaveModule.bind(this)
        this.GetUserTag = this.GetUserTag.bind(this)
        this.GetSearchGroup = this.GetSearchGroup.bind(this)
    }

    changeSaveModule(e) {
        this.props.setPromptFlagHandle(false)
        let modalStyle = {}
        modalStyle.left = e.clientX+'px'
        modalStyle.top = e.clientY+'px'
        this.setState({
            modalStyle,
            saveModule: true
        })
    }

    closeModal = () => {
        this.props.setPromptFlagHandle(true)
        this.setState({
            saveModule: false
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

    GetUserTag() {
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
    }

    GetSearchGroup() {
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
                    for (let i = 0; i < this.props.groupIdArray.length; i++) {
                        let arrItem = res.resultContent.find(item => {
                            if (item.id === this.props.groupIdArray[i]) {
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

    componentDidMount() {
        this.GetUserTag();
        this.GetSearchGroup();
        window.addEventListener('clearEdit', () => {
            this.setState({
                searchStyle: 0,
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

            }, () => {
                this.GetUserTag();
                this.GetSearchGroup();
            })
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
            searchPrimaryTagArr, searchChooseArr, searchPrimaryArr, saveModule,modalStyle
        } = this.state;
        let {saveGroupStatus, changeStep, repeatGroupId,setPromptFlagHandle} = this.props;
        return (
            <div className='MtGroup'>
                <div className="MtGroup-header">
                    <div className='MtGroup-header-left'>
                        <span value="1" onClick={this.changeSStyle}
                              className={searchStyle ? "MtGroup-header-nav active" : "MtGroup-header-nav"}>精准查询</span>
                        <span value='0' onClick={this.changeSStyle}
                              className={searchStyle ? "MtGroup-header-nav" : "MtGroup-header-nav active"}>标签筛选</span>
                    </div>
                    {/* <div className="MtGroup-header-right" onClick={() => {
                        sessionStorage.setItem('noaddnavitem', 1)
                        if (searchChooseArr.length) {
                            this.changeSaveModule()
                        } else {
                            changeStep('EDITTEXT')
                        }
                    }}>返回上一步
                    </div> */}
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
                    {/* <div className="MtGroup-header-right" onClick={() => {
                            sessionStorage.setItem('noaddnavitem', 1)
                            if (searchChooseArr.length) {
                                this.changeSaveModule()
                            } else {
                                changeStep('EDITTEXT')
                            }
                        }}>返回
                    </div> */}
                    <ButtonBox
                        btnTxt={'返回'}
                        isCancel={true}
                        btnFunc={(e) => {
                            sessionStorage.setItem('noaddnavitem', 1)
                            if (searchChooseArr.length) {
                                this.changeSaveModule(e)
                            } else {
                                changeStep('EDITTEXT')
                            }
                        }}
                        btnStyle={{marginRight: '30px'}}
                    />
                    {/* <ButtonBox
                        btnTxt={'保存'}
                        isCancel={true}
                        btnFunc={() => {
                            this.props.saveGroupId(searchChooseArr)
                        }}
                        btnStyle={{marginRight: '30px'}}
                    /> */}
                    <ButtonBox
                        btnTxt={'确认投放'}
                        isCancel={false}
                        btnFunc={() => {
                            this.props.setPromptFlagHandle(false)
                            this.props.confirmPutTask(searchChooseArr)
                            // console.log("确认投放")
                        }}
                    />
                </div>
                {
                    saveGroupStatus
                        ? ""
                        :
                        <ModalBox
                            modalStatus={saveModule}
                            modalStyle={modalStyle}
                            closeModalFunc={() => {
                                this.closeModal()
                            }}
                            confirmFunc={() => {
                                this.closeModal()
                                changeStep('EDITTEXT')
                                // console.log('确定')
                            }}
                            modalTxt={'离开当前页面后将丢失所有编辑的内容哦'}
                            cancelTxt={'我再想想'}
                            confirmTxt={'知道了'}
                        />
                }
            </div>
        )
    }
}
