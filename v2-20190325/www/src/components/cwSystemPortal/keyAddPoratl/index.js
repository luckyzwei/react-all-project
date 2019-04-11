/**
 * 创建时间:2018-10-08 10:31:15
 * 作者：sufei  Xerath
 * 邮箱：fei.su@gemii.cc
 * 版本号：1.0
 * @版权所有
 **/
import React, {Component} from 'react'
import './index.css'
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import {getKeywordRule, saveKeywordRule, updateKeywordRule} from "../../../funStore/FetchApi";
import {sendEvent} from "../../../funStore/CommonFun";
import {API_PATH} from "../../../constants/OriginName";
import AuthProvider from "../../../funStore/AuthProvider";
import promiseXHR from "../../../funStore/ServerFun";

let stop = true;
const components = (step, viewId, changeView, changeStep, confirmData, actions
    , saveMetter, saveMatterContent, saveKeywordData, saveGroupId, updateGroupId) => {
    switch (step) {
        case 'STEP3':
            return <Step3 saveGroupId={saveGroupId} updateGroupId={updateGroupId} viewId={viewId}
                          confirmData={confirmData} changeView={changeView} changeStep={changeStep}/>
        case 'STEP2':
            return <Step2
                viewId={viewId}
                changeStep={changeStep}
                confirmData={confirmData}
                saveMetter={saveMetter}
                saveMatterContent={saveMatterContent}
            />
        case 'STEP1':
        default:
            return <Step1 saveKeywordData={saveKeywordData} changeView={changeView} confirmData={confirmData}
                          changeStep={changeStep} viewId={viewId}/>
    }
}


export default class keyAddPoratl extends Component {
    constructor() {
        super();
        this.state = {
            step: 'STEP1',
            confirmData: {
                "title": "",
                "groupItems": [],
                "keywordProfiles": [],
                "kwMatchType": 1,
                "ruleMatchType": 1,
                "status": 1,
                "kwRuleActions": [
                    {
                        "kwRemoveAction": {"type": 0},
                        "type": 3
                    },
                    {
                        "kwAutoRespAction": {"responseType": 2},
                        "kwResponseItems": [],
                        "type": 1
                    }
                ]
            }

        }
        this.changeStep = this.changeStep.bind(this)
        this.saveMetter = this.saveMetter.bind(this)
        this.saveMatterContent = this.saveMatterContent.bind(this)
        this.saveKeywordData = this.saveKeywordData.bind(this)
        this.saveGroupId = this.saveGroupId.bind(this)
        this.updateGroupId = this.updateGroupId.bind(this)

    }

    changeStep(step) {
        this.setState({step});
    }

    saveMetter(res) {
        let arry = [];
        let {confirmData} = this.state;
        // console.log(res);
        for (let i = 0; i < res.length; i++) {
            for (let y = 0; y < res[i].length; y++) {
                arry.push(res[i][y])
            }
            // confirmData.kwRuleActions[i].kwResponseItems = arry
        }
        confirmData.kwRuleActions[1].kwResponseItems ? confirmData.kwRuleActions[1].kwResponseItems = arry
            : confirmData.kwRuleActions[0].kwResponseItems = arry

        // console.log(confirmData, '1234567890');
    }

    saveMatterContent(res) {
        let {confirmData} = this.state;
        let data = [];
        // console.log(res);
        for (let i = 0; i < res.length; i++) {
            data.push(...res[i]);
        }
        // console.log(data, '聚合后的参数')
        if (confirmData.kwRuleActions[1].kwResponseItems) {
            confirmData.kwRuleActions[1].kwResponseItems = data
        } else {
            confirmData.kwRuleActions[0].kwResponseItems = data
        }
        this.setState({
            confirmData
        })
    }

    saveKeywordData(res) {
        this.setState({
            confirmData: {
                ...res,
            }
        })
    }

    saveGroupId(ress) {
        if (stop) {
            stop = false;
            let {confirmData} = this.state;
            confirmData.groupItems = ress;
            // console.log(confirmData, '提交参数');
            let a = confirmData.kwRuleActions.find(item => item.type == 1);
            if (a.kwResponseItems.length) {
                saveKeywordRule(confirmData).then(res => {
                    res = JSON.parse(res);
                    stop = true;
                    if (res.resultCode === '100') {
                        // window.location.reload()
                        this.props.changeView('KEYMAINLIST')
                    } else {
                        sendEvent('message', {txt: res.detailDescription, code: 1004})
                    }
                }).catch(req => {
                    stop = true;
                });
            } else {
                stop = true;
                sendEvent('message', {txt: '请添加素材', code: 1004})
            }

        }
    }

    updateGroupId(ress) {
        if (stop) {
            stop = false;
            let {confirmData} = this.state;
            confirmData.groupItems = ress;
            // console.log(confirmData);
            // this.setState({confirmData});
            // console.log(confirmData, '提交参数');
            let a = confirmData.kwRuleActions.find(item => item.type == 1);
            if (a.kwResponseItems.length) {
                let params = {
                    id: this.props.viewId,
                    query: confirmData
                }
                updateKeywordRule(params).then(res => {
                    res = JSON.parse(res);
                    stop = true;
                    if (res.resultCode === '100') {
                        // window.location.reload()
                        this.props.changeView('KEYMAINLIST')
                    } else {
                        sendEvent('message', {txt: res.detailDescription, code: 1004})
                    }
                }).catch(req => {
                    stop = true;
                    console.log(req)
                });
            } else {
                stop = true;
                sendEvent('message', {txt: '请添加素材', code: 1004})
            }
        }
    }

    componentDidMount() {
        if (this.props.viewId) {
            // console.log(this.props.viewId);
            getKeywordRule(this.props.viewId).then(res => {
                res = JSON.parse(res);
                if (res.resultCode === '100') {
                    let wexxs = res.resultContent.kwRuleActions[1].kwResponseItems ? res.resultContent.kwRuleActions[1].kwResponseItems : res.resultContent.kwRuleActions[0].kwResponseItems;
                    let wexx = wexxs && wexxs.filter(item => item.type == 2);
                    this.setState({
                        confirmData: res.resultContent
                    }, () => {
                        if (wexx.length>0) {
                            // console.log(wexx);
                            Promise.all(wexx.map(v => {
                                const _url = API_PATH + '/taskadminapi/authsec/resolve/base64?fileId=' + v.files.find(item => item.fileType == 'text').fileId;
                                return AuthProvider.getAccessToken().then(token => {
                                    return promiseXHR(_url, {
                                        type: 'bearer',
                                        value: token
                                    }, {fileUrl: v.files.find(item => item.fileType == 'text').filePath}, "GET");
                                })
                            })).then((resultArr) => {
                                resultArr.map((item,index) => {
                                    let result = JSON.parse(item)
                                    let parser = new DOMParser()
                                    let xmlDoc = parser.parseFromString(decodeURIComponent(result.resultContent), "text/xml")
                                    let logoSrc = xmlDoc ? xmlDoc.querySelectorAll('weappiconurl') : []
                                    let logoSrcs = logoSrc[0] ? logoSrc[0].innerHTML.replace('<![CDATA[', '').replace(']]>', '') : ''
                                    let logoTitle = xmlDoc ? xmlDoc.querySelectorAll('sourcedisplayname') : []
                                    let logoTitles = logoTitle[0] ? logoTitle[0].innerHTML.replace('<![CDATA[', '').replace(']]>', '') : ''
                                    // let title = xmlDoc ? xmlDoc.querySelectorAll('appmsg>title') : []
                                    // let titles = title[0] ? title[0].innerHTML : '预览小程序标题'
                                    wexx[index].wexx = logoTitles
                                    wexx[index].logSrc = logoSrcs
                                })
                                wexx.forEach(v => {
                                    wexxs.forEach (item => {
                                        if (item.groupType == v.groupType) {
                                            item.type == v.type&&(item = v)
                                        }
                                    })
                                })
                                if (res.resultContent.kwRuleActions[1].kwResponseItems) {
                                    res.resultContent.kwRuleActions[1].kwResponseItems = wexxs
                                } else {
                                    res.resultContent.kwRuleActions[0].kwResponseItems = wexxs
                                }
                                this.setState({
                                    confirmData: res.resultContent
                                })
                            }).catch(req => {
                                console.log(req);
                            })

                        }
                    })
                } else {
                    sendEvent('message', {txt: res.detailDescription, code: 1004})
                }
            }).catch(req => {
                console.log(req)
            })
        }
    }

    render() {
        let {step, confirmData} = this.state;
        let {viewId, changeView, actions} = this.props;
        return (
            <div className='keyAddPoratl'>{
                components(step, viewId,
                    changeView, this.changeStep, confirmData, actions,
                    this.saveMetter, this.saveMatterContent,
                    this.saveKeywordData,
                    this.saveGroupId,
                    this.updateGroupId
                )
            }</div>
        )
    }
}
