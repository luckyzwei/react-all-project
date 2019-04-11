import React, {Component} from 'react'
import './index.css'

import {formatDate, sendEvent} from '../../../funStore/CommonFun'

import MtPhone from '../MtPhone'
import MmEdit from '../MmEdit'
import LoadingAnimationS from '../../shareComponent/LoadingAnimationS'

import {getMoment} from '../../../funStore/MomentApi'

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

export default class MmBuildMain extends Component {
    constructor() {
        super();
        this.state = {
            paramsValue: [],
            paramsImg: {status:false,url:[]},
            paramsTxt: '',
            paramsLink: {status:false},
            sendingDates: '',
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
            tooBig: false
        },
        this.setparamshandler = this.setparamshandler.bind(this);
        this.setparamsData = this.setparamsData.bind(this);
        this.delparamsData = this.delparamsData.bind(this);
        this.createparamsData = this.createparamsData.bind(this);
        this.changeStep = this.changeStep.bind(this);
    }

    setparamshandler(name, value, e) {
        let {paramsValue, confirmData, sendingDates, sendingTimes, paramsImg, paramsLink} = this.state;
        let obj = paramsValue[value];
        // console.log(value)
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
                this.setState({paramsTxt: e})
                break;
            case 'paramsimg':
                paramsImg.url.push(e)
                paramsImg.status = true
                this.setState({paramsImg})
                break;
            case 'paramsLinkTitle':
                paramsLink.title = e
                paramsLink.status = true
                this.setState({paramsLink})
                break;
            case 'paramsLinklink':
                paramsLink.url = e
                paramsLink.status = true
                this.setState({paramsLink})
                break;
            case 'paramslinkImg':
                paramsLink.img = e
                paramsLink.status = true
                this.setState({paramsLink})
                break;
            // case 'fileUrl':
            //     obj.files.find(item => item.fileType === 'text').filePath = e.url;
            //     obj.files.find(item => item.fileType === 'text').fileId = e.id;
            //     this.setparamsData(obj, value)
            //     break;
            default:
                break;
        }
    }

    createparamsData(c) {
        let {paramsValue} = this.state;
        c = parseInt(c)
        // switch (c) {
        //     case 0:
        //         paramsValue.push({
        //             content: "",
        //             type: 0
        //         })
        //         break;
        //     case 2:
        //         paramsValue.push({
        //             type: 2,
        //             title: '',
        //             content: '',
        //             uri: '',
        //             files: [
        //                 {
        //                     fileType: 'image',
        //                     fileId: '',
        //                     filePath: ''
        //                 }, {
        //                     fileType: 'text',
        //                     filePath: ''
        //                 }
        //             ]
        //         })
        //         break;
        //     case 4:
        //         paramsValue.push({
        //             type: 4,
        //             title: '',
        //             content: '',
        //             files: [
        //                 {
        //                     fileType: 'image',
        //                     fileId: '',
        //                     filePath: ''
        //                 }, {
        //                     fileType: "text",
        //                     fileContent: [
        //                         {type: 'txt', value: ""},
        //                         {type: "img", value: ""}
        //                     ]
        //                 }
        //             ]
        //         })
        //         break;
        //     case 1:
        //         paramsValue.push({
        //             title: '',
        //             content: '',
        //             uri: "",
        //             type: 1,
        //             files: [{
        //                 fileType: 'image',
        //                 fileId: "",
        //                 filePath: ''
        //             }]
        //         })
        //         break;
        //     case 3:
        //         paramsValue.push({
        //             files: [{
        //                 fileType: 'image',
        //                 fileId: "",
        //                 filePath: ''
        //             }],
        //             type: 3
        //         })
        //         break;
        //     default:
        //         break;
        // }
        this.setState({
            paramsValue
        })
    }

    setparamsData(c, n) {
        let {paramsValue, confirmData} = this.state;
        paramsValue[n] = c;
        confirmData.items = paramsValue;
        this.setState({
            paramsValue,
            saveEditStatus: false,
            confirmData
        }, () => {
            // console.log(this.state.confirmData, "提交参数")
        })
    }

    delImg = (i) => {
        let {paramsImg} = this.state
        paramsImg.url.splice(i, 1)
        this.setState({
            paramsImg
        })
    }

    delparamsData(n) {
        n == 0 && this.setState({paramsTxt: '', tooBig: false})
        n == 1 && this.setState({paramsLink: {status:false}})
        n == 3 && this.setState({paramsImg: {status:false,url:[]}}) 
    }

    changeStep(e) {
        this.setState({
            step: e
        })
    }

    componentDidMount() {
        if (this.props.match.params.id) {
            getMoment(this.props.match.params.id).then(res => {
                res = JSON.parse(res);
                // console.log(res);
                if (res.resultCode == '100') {
                    let {paramsTxt,paramsImg,paramsLink} = this.state
                    res.resultContent.sendingTime = formatDate(res.resultContent.sendingTime);
                    res.resultContent.items.map(item => {
                        if (item.type == 0) {
                            paramsTxt = item.content
                        }
                        if (item.type == 3) {
                            paramsImg.status = true
                            paramsImg.url.push(item.content)
                        }
                        if (item.type == 1) {
                            paramsLink.status = true
                            paramsLink.img = {}
                            paramsLink.img.url = item.content
                            paramsLink.title = item.title
                            paramsLink.url = item.uri
                        }
                    })
                    this.setState({
                        confirmData: res.resultContent,
                        paramsTxt,paramsImg,paramsLink,
                        sendingDates: formatDate(res.resultContent.sendingTime)[0],
                        sendingTimes: formatDate(res.resultContent.sendingTime)[1],
                        loading: false
                    })
                }
            })
        } else {
            this.setState({loading: false})
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

    checkDate = () => {
        let paramsData = this.state.confirmData;
        let {sendingTimes, sendingDates, paramsTxt, paramsImg, paramsLink, tooBig} = this.state
        let date = (sendingDates +' '+ sendingTimes).replace(/-/g,'/')
        date = date.replace('时',':').replace('分','')+':00'
        if (tooBig) {
            sendEvent('message', {txt: "内容字数超过限制", code: 1003, timer: 2000})
            return false
        }
        if (!paramsData.title) {
            sendEvent('message', {txt: "朋友圈标题没有编辑完整", code: 1003, timer: 2000})
            return false
        }
        if (!paramsTxt && !paramsImg.status && !paramsLink.status) {
            sendEvent('message', {txt: "素材没有编辑完整", code: 1003, timer: 2000})
            return false
        }
        if (paramsImg.status && !paramsImg.url.length) {
            sendEvent('message', {txt: "图片素材没有编辑完整", code: 1003, timer: 2000})
            return false
        }
        if (paramsLink.status && (!paramsLink.title || !paramsLink.url || !paramsLink.img || Object.keys(paramsLink.img).length == 0)){
            sendEvent('message', {txt: "链接素材没有编辑完整", code: 1003, timer: 2000})
            return false
        }
        if (!sendingTimes || !sendingDates) {
            sendEvent('message', {txt: "请选择发送时间", code: 1003, timer: 2000})
            return false
        }
        if (new Date(date).getTime() < new Date().getTime()) {
            sendEvent('message', {txt: "请选择正确的时间", code: 1003, timer: 2000})
            return false
        }
        return true
    }

    addMoment () {

    }

    render() {
        let {loading,paramsValue, step, saveGroupStatus, saveEditStatus, confirmData, repeatGroupId, sendingDates, sendingTimes,paramsImg,paramsTxt,paramsLink} = this.state;
        let {actions, setPromptFlagHandle} = this.props;
        // console.log(confirmData.groupIds, 'shuju ')
        // console.log(step)
        return (
            loading?<LoadingAnimationS/>:
            <div className='MmBuildMain'>
                {
                    step == "EDITTEXT"
                        ?
                        <div className="MmBuildMain-content">
                            <div className="MmBuildMain-content-left">
                                <MtPhone
                                    paramsTxt={paramsTxt}
                                    paramsImg={paramsImg}
                                    paramsLink={paramsLink}
                                    styles={{position: 'absolute'}}
                                    paramsValue={paramsValue}
                                />
                            </div>
                            <div className="MmBuildMain-content-right">
                                <MmEdit
                                    params={this.props.match.params}
                                    paramsTxt={paramsTxt}
                                    paramsImg={paramsImg}
                                    paramsLink={paramsLink}
                                    delImg={this.delImg}
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
                                    setPromptFlagHandle={setPromptFlagHandle}
                                />
                            </div>
                        </div>
                        : ''
                }
            </div>
        )
    }
}
