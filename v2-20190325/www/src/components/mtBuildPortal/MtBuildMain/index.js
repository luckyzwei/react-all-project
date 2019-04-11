/**
 * 创建时间:2018-09-10 09:59:52
 * 作者：sufei  Xerath
 * 邮箱：fei.su@gemii.cc
 * 版本号：1.0
 * @版权所有
 **/
import React, {Component} from 'react'
import './index.css'

import {formatDate, sendEvent} from '../../../funStore/CommonFun'
import moment from 'moment'

import MtPhone from '../MtPhone'
import MtEdit from '../MtEdit'
import MtGroup from '../MtGroup'

import SuccessPut from '../SuccessPut'
import FailPut from '../FailPut'

import AuthProvider from '../../../funStore/AuthProvider'
import promiseXHR from '../../../funStore/ServerFun';
import {API_PATH} from '../../../constants/OriginName'
import LoadingAnimationS from '../../shareComponent/LoadingAnimationS'

import {getCustomH5Content, addGroupTask, updateGroupTask, getGroupTask} from '../../../funStore/FetchApi'

var UnloadConfirm = {};
//启用监听浏览器刷新、关闭的方法
UnloadConfirm.set = function (confirm_msg) {
    window.onbeforeunload = function (event) {
        event = event || window.event;
        event.returnValue = confirm_msg;
    }
}
//关闭监听浏览器刷新、关闭的方法
UnloadConfirm.clear = function () {
    window.onbeforeunload = function () {
    };
}

function contentText(params) {
    switch (params) {
        case 'EDITTEXT':
            return "编辑投放内容"
            break;
        case 'SELECTGROUP':
            return "选择投放的群"
            break;
        case 'SUCCESSPUT':
            return "投放成功"
            break;
        case 'FAILPUT':
            return "投放失败"
            break;
    }
}

export default class MtBuildMain extends Component {
    constructor() {
        super();
        this.state = {
            paramsValue: [],
            sendingDates: moment().format('YYYY-MM-DD'),
            sendingTimes: '',
            confirmData: {
                sendingTime: '',
                title: '',
                items: []
            },
            step: "EDITTEXT",
            saveEditStatus: false,
            saveGroupStatus: false,
            stop: true,
            loading: true,
            repeatGroupId: [],//重复群
        },
        this.setparamshandler = this.setparamshandler.bind(this);
        this.setparamsData = this.setparamsData.bind(this);
        this.delparamsData = this.delparamsData.bind(this);
        this.createparamsData = this.createparamsData.bind(this);
        this.changeStep = this.changeStep.bind(this);
        this.saveGroupTask = this.saveGroupTask.bind(this);
        this.saveGroupId = this.saveGroupId.bind(this);
        this.confirmPutTask = this.confirmPutTask.bind(this);
    }

    setparam = (params,resultData) => {
        let {paramsValue, confirmData, sendingDates, sendingTimes} = this.state;
        let obj = {}
        let index = paramsValue.findIndex(v => v.type==params[2])
        switch (params[0]) {
            case "img":
                if (index != -1) {
                    paramsValue[index].files.find(item => item.fileType === 'image').fileId = ''
                    paramsValue[index].files.find(item => item.fileType === 'image').filePath = params[1].sendContent
                    
                    confirmData.items = paramsValue;
                    this.setState({
                        paramsValue,
                        saveEditStatus: false,
                        confirmData
                    })
                } else {
                    obj.files=[]
                    obj.files.push({filePath: params[1].sendContent,fileType:'image'})
                    obj.type = 3
                    this.setparamsData(obj,paramsValue.length)
                }
                break;
            case "H5":
                if (index != -1) {
                    paramsValue[index].files.find(item => item.fileType === 'image').fileId = ''
                    paramsValue[index].files.find(item => item.fileType === 'image').filePath = params[1].sendContent
                    paramsValue[index].title = params[1].linkTitle
                    paramsValue[index].content = params[1].linkDesc
                    paramsValue[index].uri = params[1].linkHref
                    
                    confirmData.items = paramsValue;
                    this.setState({
                        paramsValue,
                        saveEditStatus: false,
                        confirmData
                    })
                } else {
                    obj.files=[]
                    obj.files.push({filePath: params[1].sendContent,fileType:'image'})
                    obj.type = 1
                    obj.title = params[1].linkTitle
                    obj.content = params[1].linkDesc
                    obj.uri = params[1].linkHref
                    this.setparamsData(obj,paramsValue.length)
                }
                break;
            case 'mpro':
                let url = params[1].sendContent.match(/<pagepath>(\S*?)<\/pagepath>/)[1]
                if (index != -1) {
                    paramsValue[index].wexx = params[1].sendContent.match(/<title>(\S*?)<\/title>/)[1]
                    paramsValue[index].uri = url.replace('<![CDATA[', '').replace(']]>', '')
                    paramsValue[index].files.find(item => item.fileType === 'image').filePath = params[1].linkHref
                    paramsValue[index].files.find(item => item.fileType === 'image').fileId = ''
                    paramsValue[index].files.find(item => item.fileType === 'text').filePath = resultData.uri
                    paramsValue[index].files.find(item => item.fileType === 'text').fileId = resultData.id
                    paramsValue[index].title = params[1].sendContent.match(/<title>(\S*?)<\/title>/)[1]
                    paramsValue[index].content = params[1].sendContent.match(/<title>(\S*?)<\/title>/)[1]
                    paramsValue[index].logSrc = params[1].linkDesc
                    paramsValue[index].wexx = params[1].sendContent.match(/<sourcedisplayname>(\S*)<\/sourcedisplayname>/)[1]
                    
                    confirmData.items = paramsValue;
                    this.setState({
                        paramsValue,
                        saveEditStatus: false,
                        confirmData
                    })
                } else {
                    obj.wexx = params[1].sendContent.match(/<title>(\S*?)<\/title>/)[1]
                    obj.uri = url.replace('<![CDATA[', '').replace(']]>', '')
                    obj.files=[]
                    obj.files.push({filePath: params[1].linkHref?params[1].linkHref:'',fileType:'image'})
                    obj.files.push({filePath: resultData.uri,fileId: resultData.id,fileType:'text'})
                    obj.title = params[1].sendContent.match(/<title>(\S*?)<\/title>/)[1]
                    obj.content = params[1].sendContent.match(/<title>(\S*?)<\/title>/)[1]
                    obj.logSrc = params[1].linkDesc
                    obj.wexx = params[1].sendContent.match(/<sourcedisplayname>(\S*)<\/sourcedisplayname>/)[1]
                    obj.type = 2
                    this.setparamsData(obj, paramsValue.length)
                }
                break;
            case "public":
                if (index != -1) {
                    paramsValue[index].content = params[1].sendContent
                    paramsValue[index].title = params[1].linkDesc
                    paramsValue[index].uri = params[1].linkHref

                    confirmData.items = paramsValue;
                    this.setState({
                        paramsValue,
                        saveEditStatus: false,
                        confirmData
                    })
                } else {
                    obj.type = 6
                    obj.content = params[1].sendContent
                    obj.title = params[1].linkDesc
                    obj.uri = params[1].linkHref
                    this.setparamsData(obj,paramsValue.length)
                }
                break;
            case "voice":
                if (index != -1) {
                    paramsValue[index].files[0].fileId=''
                    paramsValue[index].files[0].filePath=params[1].sendContent
                    paramsValue[index].files[0].type=params[1].voiceTime
                    this.setState({paramsValue})
                } else {
                    obj.files=[]
                    obj.files.push({filePath: params[1].sendContent,fileType:'audio',type: params[1].voiceTime})
                    obj.type = 5
                    this.setparamsData(obj,paramsValue.length)
                }
                break;
        }
    }

    setparamshandler(name, value, e) {
        let {paramsValue, confirmData, sendingDates, sendingTimes} = this.state;
        let obj = paramsValue[value];
        if (e == 'tooBig') {
            this.setState({
                tooBig: true
            })
            return false
        }
        if (e == 'tooSmall') {
            this.setState({
                tooBig: false
            })
            return false
        }
        switch (name) {
            case "mtTitle":
                confirmData.title = value;
                this.setState({
                    confirmData
                });
                break;
            case "mtTimeDates":
                sendingDates = value;
                // console.log(sendingDates);
                this.setState({
                    sendingDates
                });
                break;
            case "mtTimeTimes":
                sendingTimes = value;
                this.setState({
                    sendingTimes
                });
                break;
            case 'paramstext':
                obj.content = e;
                this.setparamsData(obj, value)
                break;
            case 'paramsimg':
                obj.files.find(item => item.fileType === 'image').filePath = e.url;
                obj.files.find(item => item.fileType === 'image').fileId = e.id;
                this.setparamsData(obj, value)
                break;
            case 'paramsLinkTitle':
                obj.title = e;
                this.setparamsData(obj, value)
                break;
            case 'paramsLinkContent':
                obj.content = e;
                this.setparamsData(obj, value)
                break;
            case 'paramsLinklink':
                obj.uri = e;
                this.setparamsData(obj, value)
                break;
            case 'paramslink':
                obj.files.find(item => item.fileType === 'image').filePath = e.url;
                obj.files.find(item => item.fileType === 'image').fileId = e.id;
                this.setparamsData(obj, value)
                break;
            case 'fileUrl':
                obj.files.find(item => item.fileType === 'text').filePath = e.url;
                obj.files.find(item => item.fileType === 'text').fileId = e.id;
                this.setparamsData(obj, value)
                break;
            case 'xmlFile':
                let parser = new DOMParser()
                let xmlDoc = parser.parseFromString(e, "text/xml")
                let logoSrc = xmlDoc ? xmlDoc.querySelectorAll('weappiconurl') : []
                let logoSrcs = logoSrc[0] ? logoSrc[0].innerHTML.replace('<![CDATA[', '').replace(']]>', '') : ''
                let logoTitle = xmlDoc ? xmlDoc.querySelectorAll('sourcedisplayname') : []
                let logoTitles = logoTitle[0] ? logoTitle[0].innerHTML.replace('<![CDATA[', '').replace(']]>', '') : ''
                let title = xmlDoc ? xmlDoc.querySelectorAll('appmsg>title') : []
                let titles = title[0] ? title[0].innerHTML : '预览小程序标题'
                let url = xmlDoc ? xmlDoc.querySelectorAll('pagepath')[0].textContent : []
                obj.wexx = logoTitles;
                obj.uri = url
                obj.title = titles;
                obj.content = titles;
                obj.logSrc = logoSrcs;
                this.setparamsData(obj, value)
                break;
            case 'paramswexx':
                obj.files.find(item => item.fileType === 'image').filePath = e.url;
                obj.files.find(item => item.fileType === 'image').fileId = e.id;
                this.setparamsData(obj, value)
                break;
            case 'paramsWexxTitle':
                obj.title = e;
                obj.content = e;
                this.setparamsData(obj, value)
                break;
            case 'paramsWexxlink':
                obj.uri = e;
                this.setparamsData(obj, value)
                break;
            // case 'paramsSlink':
            //     obj.files.find(item => item.fileType === 'image').filePath = e.url;
            //     obj.files.find(item => item.fileType === 'image').fileId = e.id;
            //     this.setparamsData(obj, value)
            //     break;
            // case 'paramsSLinkTitle':
            //     obj.title = e;
            //     this.setparamsData(obj, value)
            //     break;
            // case 'paramsSLinkDescription':
            //     obj.content = e;
            //     this.setparamsData(obj, value)
            //     break;
            // case 'paramsSLinkTxt':
            //     let indexs1;
            //     paramsValue.find((item, index) => {
            //         if (item.type == 4) {
            //             indexs1 = index;
            //             return item
            //         }
            //     }).files.find(item => item.fileType === 'text').fileContent[value].value = e;
            //     this.setparamsData(paramsValue[indexs1], indexs1)
            //     break;
            // case 'paramsSLinkTxtAdd':
            //     let indexss;
            //     paramsValue.find((item, index) => {
            //         if (item.type == 4) {
            //             indexss = index;
            //             return item
            //         }
            //     }).files.find(item => item.fileType === 'text').fileContent.push({
            //         type: 'txt',
            //         value: ''
            //     });
            //     this.setparamsData(paramsValue[indexss], indexss)
            //     break;
            // case 'paramsSLinkImgAdd':
            //     let indexs;
            //     paramsValue.find((item, index) => {
            //         if (item.type == 4) {
            //             indexs = index;
            //             return item
            //         }
            //     }).files.find(item => item.fileType === 'text').fileContent.push({
            //         type: 'img',
            //         value: ''
            //     });
            //     this.setparamsData(paramsValue[indexs], indexs);
            //     break;
            default:
                break;
        }
    }

    createparamsData(c) {
        let {paramsValue} = this.state;
        c = parseInt(c);
        switch (c) {
            case 0:
                paramsValue.push({
                    content: "",
                    type: 0
                })
                break;
            case 2:
                paramsValue.push({
                    type: 2,
                    title: '',
                    content: '',
                    uri: '',
                    files: [
                        {
                            fileType: 'image',
                            fileId: '',
                            filePath: ''
                        }, {
                            fileType: 'text',
                            filePath: ''
                        }
                    ]
                })
                break;
            case 4:
                paramsValue.push({
                    type: 4,
                    title: '',
                    content: '',
                    files: [
                        {
                            fileType: 'image',
                            fileId: '',
                            filePath: ''
                        }, {
                            fileType: "text",
                            fileContent: [
                                {type: 'txt', value: ""},
                                {type: "img", value: ""}
                            ]
                        }
                    ]
                })
                break;
            case 5:
                paramsValue.push({
                    title: '',
                    content: '',
                    uri: "",
                    type: 5,
                    files: [{
                        fileType: 'image',
                        fileId: "",
                        filePath: ''
                    }]
                })
                break;
            case 1:
                paramsValue.push({
                    title: '',
                    content: '',
                    uri: "",
                    type: 1,
                    files: [{
                        fileType: 'image',
                        fileId: "",
                        filePath: ''
                    }]
                })
                break;
            case 3:
                paramsValue.push({
                    files: [{
                        fileType: 'image',
                        fileId: "",
                        filePath: ''
                    }],
                    type: 3
                })
                break;
            default:
                break;
        }
        this.setState({
            paramsValue
        })
    }

    setparamsData(c, n) {
        let {paramsValue, confirmData} = this.state
        paramsValue[n] = c
        confirmData.items = paramsValue;
        this.setState({
            paramsValue,
            saveEditStatus: false,
            confirmData
        }, () => {
            // console.log(this.state.confirmData, "提交参数")
        })
    }

    delparamsData(n,str) {
        let {paramsValue} = this.state;
        paramsValue.splice(parseInt(n), 1)
        str == 0 ?
        this.setState({
            paramsValue,
            tooBig: false
        })
        :
        this.setState({
            paramsValue
        })
    }

    changeStep(e) {
        this.setState({
            step: e
        })
    }

    componentDidMount() {
        if (this.props.match.params.id) {
            getGroupTask({id: this.props.match.params.id, force: false}).then(res => {
                res = JSON.parse(res);
                // console.log(res);
                if (res.resultCode == '100') {
                    // console.log(formatDate(res.resultContent.sendingTime), '哈哈哈');
                    // res.resultContent.sendingTime = formatDate(res.resultContent.sendingTime);
                    let wexx = res.resultContent.items.find(item => item.type == 2);
                    this.setState({
                        loading: false,
                        confirmData: res.resultContent,
                        paramsValue: res.resultContent.items,
                        sendingDates: formatDate(res.resultContent.sendingTime)[0],
                        sendingTimes: formatDate(res.resultContent.sendingTime)[1]
                    }, () => {
                        if (wexx) {
                            // console.log(wexx);
                            const _url = API_PATH + '/taskadminapi/authsec/resolve/base64?fileId=' + wexx.files.find(item => item.fileType == 'text').fileId;
                            AuthProvider.getAccessToken().then(token => {
                                return promiseXHR(_url, {
                                    type: 'bearer',
                                    value: token
                                }, {fileUrl: wexx.files.find(item => item.fileType == 'text').filePath}, "GET");
                            }).then(result => {
                                result = JSON.parse(result);
                                let parser = new DOMParser()
                                let xmlDoc = parser.parseFromString(result.resultContent, "text/xml")
                                let logoSrc = xmlDoc ? xmlDoc.querySelectorAll('weappiconurl') : []
                                let logoSrcs = logoSrc[0] ? logoSrc[0].innerHTML.replace('<![CDATA[', '').replace(']]>', '') : ''
                                let logoTitle = xmlDoc ? xmlDoc.querySelectorAll('sourcedisplayname') : []
                                let logoTitles = logoTitle[0] ? logoTitle[0].innerHTML.replace('<![CDATA[', '').replace(']]>', '') : ''
                                let title = xmlDoc ? xmlDoc.querySelectorAll('appmsg>title') : []
                                let titles = title[0] ? title[0].innerHTML : '预览小程序标题'
                                wexx.wexx = logoTitles;
                                wexx.logSrc = logoSrcs;
                                for (let i = 0; i < res.resultContent.items.length; i++) {
                                    if (res.resultContent.items[i].type == 2) {
                                        res.resultContent.items[i] = wexx;
                                    }
                                }
                                this.setState({
                                    confirmData: res.resultContent,
                                    paramsValue: res.resultContent.items,
                                })
                            }).catch(req => {
                                console.log(req);
                            })

                        }
                    })

                }
            })
        } else {
            this.setState({
                loading: false
            })
        }
        var MSG_UNLOAD = "离开当前页面后将丢失本次编辑的内容哦";
        UnloadConfirm.set(MSG_UNLOAD);
        window.addEventListener('changestep', (e) => {
            this.changeStep(e.vals)
        })
        window.addEventListener('clearEdit', () => {
            let paramsValue = [], sendingDates = '', sendingTimes = '', confirmData = {
                sendingTime: '',
                title: '',
                items: []
            }, repeatGroupId = [], stop = true
            this.setState({
                paramsValue, sendingDates, sendingTimes, confirmData, repeatGroupId, stop
            })
        })
    }

    componentWillUnmount() {
        window.removeEventListener('changestep', (e) => {
            this.changeStep(e)
        })
        window.removeEventListener('clearEdit', () => {
        })
        UnloadConfirm.clear()
    }

    saveGroupTask(put) {
        if (this.state.stop) {
            this.setState({
                stop: false
            }, () => {
                let {match, actions} = this.props;
                let paramsData = this.state.confirmData;
                let {sendingTimes, sendingDates} = this.state
                sendingDates = sendingDates.replace(/-/g, '/')
                sendingTimes = sendingTimes.replace('时', ':')
                sendingTimes = sendingTimes.replace('分', '')
                paramsData.sendingTime = new Date(sendingDates + ' ' + sendingTimes + ':00').getTime();
                if (!paramsData.title) {
                    sendEvent('message', {txt: "请填写任务名称", code: 1003, timer: 2000})
                    this.setState({
                        stop: true
                    })
                } else if (!sendingTimes || !sendingDates) {
                    sendEvent('message', {txt: "请填写投放时间", code: 1003, timer: 2000})
                    this.setState({
                        stop: true
                    })
                } else {
                    if (match.params.type == "edit") {
                        // console.log("updade  ")
                        var params = {
                            query: paramsData,
                            force: false
                        }
                        updateGroupTask(params).then(res => {
                            res = JSON.parse(res);
                            // console.log(res);
                            this.setState({
                                stop: true
                            })
                            if (res.resultCode === "100") {
                                if (put) {
                                    sendEvent('changestep', 'SUCCESSPUT')
                                } else {
                                    sendEvent('message', {txt: "保存成功，所有保存的草稿可在投放列表里查看并编辑哦～", code: 1000})
                                    actions.goTo('/v2/MTScope')
                                }
                                this.setState({
                                    saveEditStatus: true
                                })
                            } else if (res.resultCode === '01508110') {
                                sendEvent('message', {txt: "存在发生冲突的群，请重新选择投放的群或时间", code: 1003})
                                this.setState({
                                    repeatGroupId: res.resultContent.conflictGroups
                                })
                            } else {
                                // this.setState({
                                //     paramsValue: [],
                                //     confirmData: {
                                //         sendingTime: '',
                                //         title: '',
                                //         items: []
                                //     }
                                // })
                                sendEvent('changestep', 'FAILPUT')
                            }
                        }).catch(req => {
                            this.setState({
                                stop: true,
                                // paramsValue: [],
                                // confirmData: {
                                //     sendingTime: '',
                                //     title: '',
                                //     items: []
                                // }
                            })
                            sendEvent('changestep', 'FAILPUT')
                            console.log(req)
                        })
                    } else {
                        // console.log("add new ")
                        var params = {
                            query: paramsData,
                            force: false
                        }
                        addGroupTask(params).then(res => {
                            res = JSON.parse(res);
                            this.setState({
                                stop: true
                            })
                            if (res.resultCode === '100') {
                                this.setState({
                                    saveEditStatus: true
                                })
                                if (put) {
                                    sendEvent('changestep', 'SUCCESSPUT')
                                } else {
                                    sendEvent('message', {txt: "保存成功，所有保存的草稿可在投放列表里查看并编辑哦～", code: 1000})
                                    actions.goTo('/v2/MTScope')
                                }

                            } else if (res.resultCode === '01508110') {
                                sendEvent('message', {txt: "存在发生冲突的群，请重新选择投放的群或时间", code: 1003})
                                this.setState({
                                    repeatGroupId: res.resultContent.conflictGroups
                                })
                            } else {
                                // this.setState({
                                //     paramsValue: [],
                                //     confirmData: {
                                //         sendingTime: '',
                                //         title: '',
                                //         items: []
                                //     }
                                // })
                                if (put) {
                                    sendEvent('changestep', 'FAILPUT')
                                } else {
                                    sendEvent('message', {txt: res.detailDescription, code: 1003})
                                }

                            }
                        }).catch(req => {
                            this.setState({
                                stop: true,
                                // paramsValue: [],
                                // confirmData: {
                                //     sendingTime: '',
                                //     title: '',
                                //     items: []
                                // }
                            })
                            sendEvent('changestep', 'FAILPUT')
                            console.log(req)
                        })
                    }
                }

            })
        }

    }

    saveGroupId(id) {
        // console.log(id);
        if (id.length) {
            let groupIds = [];
            let {confirmData} = this.state;
            groupIds = id.map(item => item.id);
            confirmData.groupIds = groupIds;
            this.setState({confirmData}, () => {
                this.saveGroupTask();
            })
        } else {
            sendEvent('message', {txt: "请选择群", code: 1003, timer: 2000})
        }

    }

    checkDate = () => {
        let paramsData = this.state.confirmData;
        let {sendingTimes, sendingDates, tooBig} = this.state
        let date = (sendingDates +' '+ sendingTimes).replace(/-/g,'/')
        date = date.replace('时',':').replace('分','')+':00'
        if (tooBig) {
            sendEvent('message', {txt: "内容字数超过限制", code: 1003, timer: 2000})
            return false
        }
        if (!sendingTimes || !sendingDates) {
            sendEvent('message', {txt: "请选择投放时间", code: 1003, timer: 2000})
            return false
        }
        let flag = paramsData.items.map(item => {
            if(item.type == 0) {
                return item.content.replace(/(^\s*)|(\s*$)/g, "") ? true : false
            }
            if(item.type == 1) {
                if (item.content.replace(/(^\s*)|(\s*$)/g, "") && item.title.replace(/(^\s*)|(\s*$)/g, "") && item.uri.replace(/(^\s*)|(\s*$)/g, "") && item.files[0].filePath) {
                    return true
                } else {
                    return false
                }
            }
            if(item.type == 2) {
                // console.log(item)
                return item.content.replace(/(^\s*)|(\s*$)/g, "") && item.files[0].filePath && item.uri ? true : false
            }
            if(item.type == 3) {
                return item.files[0].filePath ? true : false
            }
            if(item.type == 5) {
                return item.files[0].filePath ? true : false
            }
            if(item.type == 6) {
                return item.content ? true : false
            }
        })
        // console.log(flag.indexOf(false)!=-1)
        if (!paramsData.title || !paramsData.items.length || flag.indexOf(false)!=-1) {
            sendEvent('message', {txt: "投放标题或素材没有编辑完整", code: 1003, timer: 2000})
            return false
        }
        if (new Date(date).getTime() < new Date().getTime()) {
            sendEvent('message', {txt: "请选择正确的时间", code: 1003, timer: 2000})
            return false
        }
        return true
    }

    confirmPutTask(id) {
        let paramsData = this.state.confirmData;
        let {sendingTimes, sendingDates} = this.state
        // if (!sendingTimes || !sendingDates) {
        //     sendEvent('message', {txt: "请选择投放时间", code: 1003, timer: 2000})
        // }
        // if (!paramsData.title || !paramsData.items.length) {
        //     sendEvent('message', {txt: "投放标题或素材没有编辑完整，请返回上一步进行完善", code: 1003, timer: 2000})
        // } else {
            if (this.state.stop) {
                if (!id.length) {
                    sendEvent('message', {txt: "请选择群", code: 1003, timer: 2000})
                } else {
                    let {confirmData} = this.state;
                    let groupIds = [];
                    groupIds = id.map(item => item.id);
                    confirmData.groupIds = groupIds;
                    confirmData.sendOption = '&';
                    this.setState({confirmData}, () => {
                        this.saveGroupTask(1)
                    });
                }
            }
        // }
    }

    render() {
        let {loading,paramsValue, step, saveGroupStatus, saveEditStatus, confirmData, repeatGroupId, sendingDates, sendingTimes} = this.state;
        let {actions, setPromptFlagHandle} = this.props;
        // console.log(confirmData.groupIds, 'shuju ')
        // console.log(step)
        return (
            loading ?<LoadingAnimationS/>:
            <div className='MtBuildMain'>
                {/* {
                    step != "SUCCESSPUT" && step != "FAILPUT" ?
                        <div className="MtBuildMain-title">{contentText(step)}</div> : ''
                } */}
                {
                    step != "SUCCESSPUT" && step != "FAILPUT" ?
                    <div className="stepTitle">
                        <span className='done'>1.编辑投放内容</span>
                        <span className={step == "SELECTGROUP" ? 'done': 'todo'} style={{margin:'0 12px'}}>></span>
                        <span className={step == "SELECTGROUP" ? 'done': 'todo'}>2.选择投放的群</span>
                    </div>
                    :''
                }
                {
                    step == "EDITTEXT"
                        ?
                        <div className="MtBuildMain-content">
                            <div className="MtBuildMain-content-left">
                                <MtPhone
                                    styles={{position: 'absolute'}}
                                    paramsValue={paramsValue}
                                />
                            </div>
                            <div className="MtBuildMain-content-right">
                                <MtEdit
                                    setparam={this.setparam}
                                    checkDate={this.checkDate}
                                    confirmData={confirmData}
                                    sendingDates={sendingDates}
                                    sendingTimes={sendingTimes}
                                    setparamshandler={this.setparamshandler}
                                    paramsValue={paramsValue}
                                    setparamsData={this.setparamsData}
                                    delparamsData={this.delparamsData}
                                    createparamsData={this.createparamsData}
                                    changeStep={this.changeStep}
                                    saveEditStatus={saveEditStatus}
                                    actions={actions}
                                    saveGroupTask={this.saveGroupTask}
                                    setPromptFlagHandle={setPromptFlagHandle}
                                />
                            </div>
                        </div>
                        :
                        step == "SELECTGROUP"
                            ?
                            <div className="MtBuildMain-content">
                                <MtGroup
                                    setparamshandler={this.setparamshandler}
                                    changeStep={this.changeStep}
                                    saveGroupStatus={saveGroupStatus}
                                    groupIdArray={confirmData.groupIds || []}
                                    saveGroupId={this.saveGroupId}
                                    confirmPutTask={this.confirmPutTask}
                                    actions={actions}
                                    repeatGroupId={repeatGroupId}
                                    setPromptFlagHandle={setPromptFlagHandle}
                                />
                            </div>
                            :
                            step == 'SUCCESSPUT' ?
                                <SuccessPut
                                    actions={actions}
                                    changeStep={this.changeStep}
                                />
                                :
                                step == 'FAILPUT' ?
                                    <FailPut
                                        actions={actions}
                                        changeStep={this.changeStep}
                                    />
                                    : ''
                }
            </div>
        )
    }
}
