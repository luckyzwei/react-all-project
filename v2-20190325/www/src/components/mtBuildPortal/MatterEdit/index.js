/**
 * 创建时间:2018-09-10 10:19:00
 * 作者：sufei  Xerath
 * 邮箱：fei.su@gemii.cc
 * 版本号：1.0
 * @版权所有
 **/
import React, {Component} from 'react'
import './index.css'
import {sendEvent} from '../../../funStore/CommonFun'
import {API_PATH} from "../../../constants/OriginName";

import promiseXHR from '../../../funStore/ServerFun';
import UploadXHR from '../../../funStore/UploadXHR';
import AuthProvider from '../../../funStore/AuthProvider';

import Input from '../../shareComponent/Input'
import ButtonBox from '../../shareComponent/ButtonBox'
import AlongDatePicker from '../../shareComponent/AlongDatePicker'
import {formatDate} from '../../../funStore/CommonFun'
import {EditText, EditImg, EditLink, EditSLink, EditWexx, EditSpace, EditPublic, EditVoice} from './editText';
import TipBubble from '../../shareComponent/TipBubble'
import {GUIDE_TEXT} from '../../../constants/ConstantData'
import MaterialAR from '../MaterialAR'
import MtPhone from "../MtPhone";
import moment from 'moment';
// TEXT:文字
// IMG:图片
// LINK:h5链接
// SLINK:自定义链接
// WEXX:小程序

function MtStyleSelectType(params) {
    switch (params) {
        case "0":
        case 0:
            return "TEXT"
            break;
        case "3":
        case 3:
            return "IMG"
            break;
        case "1":
        case 1:
            return "LINK"
            break;
        case "4":
        case 4:
        case "6":
        case 6:
            return "PUBLIC"
            break;
        case "5":
        case 5:
            return "VOICE"
            break;
        // case "4":
        // case 4:
        //     return "SLINK"
        //     break;
        case "2":
        case 2:
            return "WEXX"
            break;
    }
}

function MtStyleSelectTxt(str) {
    switch (str) {
        case "0":
        case 0:
            return "文字"
            break;
        case "3":
        case 3:
            return "图片"
            break;
        case "1":
        case 1:
            return "H5链接"
            break;
        case "4":
        case 4:
        case '6':
        case 6:
            return "公众号"
            break;
        case "5":
        case 5:
            return "语音"
            break;
        // case "4":
        // case 4:
        //     return "自定义链接"
        //     break;
        case "2":
        case 2:
            return "小程序"
            break;
    }
}

function editTips(str) {
    switch (str) {
        case "0":
        case 0:
            return "*文字信息至多可编辑三条哦"
            break;
        case "3":
        case 3:
            return "*图片仅能添加一张哦"
            break;
        case "1":
        case 1:
            return "*一次任务至多可添加一条链接信息，若已添加一条H5链接，则自定义链接不可添加哦"
            break;
        // case "4":
        // case 4:
        //     return "*一次任务至多可添加一条链接信息，若已添加一条H5链接，则自定义链接不可添加哦"
        //     break;
        case "2":
        case 2:
            return "*只能添加一条小程序信息哦"
            break;
    }
}

const MtStyleSelect = ({showModal,mtStyleSelect, checkedNav}) => {
    return (
        <div className="MtStyleSelectBox" onClick={e=>{e.stopPropagation()}}>
            <div className="MtStyleSelectBox-trg"></div>
            {
                mtStyleSelect.map((item, index) => {
                    return (
                        item != 4&&item != 5&&item != 6&&
                        <div key={index} className={'MtStyleSelectBox-item ' + MtStyleSelectType(item)}
                            onClick={checkedNav.bind(this, item)}>
                            <div className="animation mt-icon">
                                <span className="img"></span>
                            </div>
                            <span className="text">{MtStyleSelectTxt(item)}</span>
                        </div>
                    )
                })
            }
            <div className='MtStyleSelectBox-item material'
                onClick={() => {showModal()}}>
                    <span className="img"></span>
                <span className="text">素材库</span>
            </div>
        </div>
    )
}
const MtNav = ({showModal,mtStyleNav, editStatus, firstAdd, firstAddBlur, checkedNav, mtStyleSelect, firstAddState, editDetail, deleteDetail}) => {
    return (
        <div className="MtEdit-nav-content">
            {
                mtStyleNav.map((item, index) => {
                    return (
                        <div key={index}
                             className={editStatus == index ? ("MtEdit-nav-content-item active " + MtStyleSelectType(item)) : ("MtEdit-nav-content-item " + MtStyleSelectType(item))}
                             onClick={editDetail.bind(this, item, index)}>
                            <span className="close-icon" onClick={deleteDetail.bind(this, item, index)}></span>
                            <span className="imgs"></span>
                            <span className="text">{MtStyleSelectTxt(item)}</span>
                        </div>
                    )
                })
            }
            {
                mtStyleNav.length < 5
                    ?
                    <div className="MtEdit-nav-content-item" onClick={firstAdd}>
                        <span
                            className={firstAddState ? "MtEdit-nav-content-item-icon active" : "MtEdit-nav-content-item-icon"}></span>
                        {
                            firstAddState ?
                                <MtStyleSelect
                                    showModal={showModal}
                                    mtStyleSelect={mtStyleSelect}
                                    checkedNav={checkedNav}
                                />
                                : ''
                        }
                    </div>
                    : ''
            }
        </div>
    )
}
const EditContent = ({editItem, setparamshandler, paramsValue, editStatus, texteareTxt, uploadXmlfile}) => {
    switch (editItem) {
        case "0":
        case 0:
            return (
                <EditText
                    placeholder={"请输入文字"}
                    setparamshandler={setparamshandler}
                    paramsname={'paramstext'}
                    value={paramsValue[editStatus] || {}}
                    editStatus={editStatus}
                />
            )
            break;
        case "3":
        case 3:
            return <EditImg
                paramsname={'paramsimg'}
                value={paramsValue[editStatus] || {}}
                editStatus={editStatus}
                setparamshandler={setparamshandler}
            />
            break;
        case "1":
        case 1:
            return <EditLink
                paramsname={'paramslink'}
                value={paramsValue[editStatus] || {}}
                editStatus={editStatus}
                setparamshandler={setparamshandler}
            />
            break;
        case "4":
        case 4:
        case "6":
        case 6:
            return <EditPublic
                paramsname={'paramspublic'}
                value={paramsValue[editStatus] || {}}
                editStatus={editStatus}
                setparamshandler={setparamshandler}
            />
            break;
        case "5":
        case 5:
            return <EditVoice
                paramsname={'paramsvoice'}
                value={paramsValue[editStatus] || {}}
                editStatus={editStatus}
                setparamshandler={setparamshandler}
            />
            break;
        // case "4":
        // case 4:
        //     return <EditSLink
        //         paramsname={'paramsSlink'}
        //         value={paramsValue[editStatus] || {}}
        //         editStatus={editStatus}
        //         setparamshandler={setparamshandler}

        //     />
        //     break;
        case "2":
        case 2:
            return <EditWexx
                paramsname={'paramswexx'}
                value={paramsValue[editStatus] || {}}
                editStatus={editStatus}
                setparamshandler={setparamshandler}
                uploadXmlfile={uploadXmlfile}
            />
            break;
        default:
            return (
                <EditSpace txt={'点击左上角“+”,开始编辑你的回复内容吧～'}/>
            )
            break;
    }
}
export default class MtEdit extends Component {
    constructor() {
        super();
        this.state = {
            mtStyle: [0, 0, 0, 3, 1, 2, 4, 5],
            mtStyleSelect: [0, 3, 1, 2],
            mtStyleNav: [],//当前选项
            firstAddState: false,
            editStatus: -1,
            editItem: null,
            saveModule: false,
            guideFlag: window.location.href.includes('flag=new'),
            modalStyle: {},
            showMaterial: false
        }
        this.firstAdd = this.firstAdd.bind(this);
        this.checkedNav = this.checkedNav.bind(this);
        this.editDetail = this.editDetail.bind(this);
        this.deleteDetail = this.deleteDetail.bind(this);
        this.uploadXmlfile = this.uploadXmlfile.bind(this);
        this.uploadEvent = this.uploadEvent.bind(this);
        this.successHandle = this.successHandle.bind(this);
        this.changeSaveModule = this.changeSaveModule.bind(this);
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
        this.setState({
            saveModule: false
        })
    }

    firstAdd(e) {
        // 阻止合成事件与最外层document上的事件间的冒泡
        e.nativeEvent.stopImmediatePropagation();
        e.stopPropagation()
        this.setState({
            firstAddState: true,
            guideFlag: false
        })
    }
    firstAddBlur = () => {
        this.setState({
            firstAddState: false,
            guideFlag: false
        })
    }

    editDetail(c, n) {
        this.setState({
            editItem: c,
            editStatus: parseInt(n)
        })
        if (parseInt(c) === 0) {
            sendEvent("deletetext", this.props.paramsValue[parseInt(n)].content)
        }
        sendEvent('slinkcontent', false)
    }

    deleteDetail(str, n, e) {
        e.nativeEvent.stopImmediatePropagation();
        e.stopPropagation();
        this.props.delparamsData(n,str)
        let {mtStyleNav, editStatus, mtStyleSelect, mtStyle} = this.state;
        if (n == editStatus && n != 0) {
            editStatus--;
        } else if (n == editStatus && n == 0) {
            editStatus++
        } else if (n < editStatus || n < mtStyleNav.length) {
            editStatus--;
        }
        mtStyleNav.splice(parseInt(n), 1);

        // if (str != 1 && str != 4) {
        if (str != 1) {
            mtStyle.push(str);
        } else {
            mtStyle.push(1);
            // mtStyle.push(4);
        }
        let s = mtStyle;
        mtStyleSelect = [...new Set(s)];

        editStatus = mtStyleNav.length ? editStatus : -1;
        editStatus = mtStyleNav.length == 1 ? 0 : editStatus;
        this.setState({
            mtStyleNav, editStatus, mtStyleSelect, mtStyle,
            editItem: mtStyleNav[editStatus]
        })
    }

    checkedNav(str, obj) {
        // console.log(str, 'str')
        // console.log(obj, 'obj')
        sendEvent('slinkcontent', false)
        let {mtStyle, mtStyleSelect, mtStyleNav} = this.state;
        let index = mtStyle.indexOf(str);
        mtStyle.splice(index, 1)
        let s = mtStyle;
        mtStyleSelect = [...new Set(s)]
        mtStyleNav.push(str)
        this.setState({
            firstAddState: false,
            mtStyleNav, mtStyleSelect, mtStyle,
            editItem: str,
            editStatus: ++this.state.editStatus
        }, () => {
            // console.log(this.state.editStatus, 'editStatus');
            if (obj === 'createItem') {
                // console.log('不创建新项目')
            } else {
                this.props.createparamsData(str);
                sendEvent("deletetext")
            }
        })
    }

    addNav = (params) => {
        let {paramsValue} = this.props
        this.showModal()
        let resultData = {}
        if (params[2] == 2) {
            let url = API_PATH + '/taskadmin-api/authsec/file/save/body/string'
            AuthProvider.getAccessToken().then(token => {
                return promiseXHR(url, {
                    type: 'bearer',
                    value: token
                }, {body:params[1].sendContent}, "POST").then(result => {
                    resultData = JSON.parse(result)
                    let i = paramsValue.findIndex(v => v.type==params[2])
                    if (i == -1) {
                        let {mtStyle, mtStyleSelect, mtStyleNav} = this.state;
                        let index = mtStyle.indexOf(params[2]);
                        mtStyle.splice(index, 1)
                        let s = mtStyle;
                        mtStyleSelect = [...new Set(s)]
                        mtStyleNav.push(params[2])
                        this.setState({
                            firstAddState: false,
                            mtStyleNav, mtStyleSelect, mtStyle,
                            editItem: params[2],
                            editStatus: ++this.state.editStatus
                        })
                    }
                    this.props.setparam(params,resultData.resultContent)
                })
            })
        } else {
            let i = paramsValue.findIndex(v => v.type==params[2])
            if (i == -1) {
                let {mtStyle, mtStyleSelect, mtStyleNav} = this.state;
                let index = mtStyle.indexOf(params[2]);
                mtStyle.splice(index, 1)
                let s = mtStyle;
                mtStyleSelect = [...new Set(s)]
                mtStyleNav.push(params[2])
                this.setState({
                    firstAddState: false,
                    mtStyleNav, mtStyleSelect, mtStyle,
                    editItem: params[2],
                    editStatus: ++this.state.editStatus
                })
            }
            this.props.setparam(params)
        }
        // , () => {
        //     this.props.createparamsData(params[2]);
        //     sendEvent("deletetext")
        // }
    }

    uploadXmlfile() {
        let fileContainer = document.createElement("input")
        fileContainer.type = 'file'
        fileContainer.onchange = (e) => {
            this.uploadEvent(e.target.files[0], e.target.value);
        }
        fileContainer.click()

    }

    uploadEvent(file, value) {
        const index = value.lastIndexOf('.')
        const finalName = value.substr(index + 1)
        const format = ["xml"]
        const size = file.size
        if(!format.includes(finalName.toLowerCase())){
            // XML文件格式错误或大小超过限制
            sendEvent('message', {txt: 'XML文件格式错误！', code: 1004})
            return
        }
        if (size > 5242880 || !format.includes(finalName.toLowerCase())) {
            sendEvent('message', {txt: "XML文件大小超过限制", code: 1004, timer: 2000})
            return
        }
        const formData = new FormData()
        formData.append('file', file)
        this.successHandle(formData)
    }

    successHandle(formData) {
        const url = API_PATH + '/gridfs-api/noauth/media';
        UploadXHR(url, formData).then(res => {
            const file = res.resultContent
            this.props.setparamshandler('fileUrl', this.state.editStatus, file)
            const _url = API_PATH + '/taskadminapi/authsec/resolve/base64?fileId=' + file.id;
            AuthProvider.getAccessToken().then(token => {
                return promiseXHR(_url, {type: 'bearer', value: token}, {fileUrl: file.url}, "GET");
            }).then(result => {
                result = JSON.parse(result);
                this.props.setparamshandler('xmlFile', this.state.editStatus, result.resultContent);
            }).catch(req => {
                sendEvent('message', {txt: "XML解析失败", code: 1004, timer: 2000})
                console.log(req);
            })
        }).catch(req => {
            sendEvent('message', {txt: "XML上传失败", code: 1004, timer: 2000})
            console.log(req)
        })
    }

    componentDidMount() {
        this.props.paramsValue.map(item => {
            this.checkedNav(item.type, 'createItem');
        })
        document.addEventListener('click',this.firstAddBlur)
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.paramsValue.length != nextProps.paramsValue.length) {
            nextProps.paramsValue.map(item => {
                this.checkedNav(item.type, 'createItem');
            })
        }
    }

    componentWillUnmount(){
        document.removeEventListener('click',this.firstAddBlur)
    }

    setDisabledDate = (time) => {
        return moment(time) < Date.now() - 24*3600*1000||moment(time) > Date.now() + 180*24*3600*1000
    }

    showModal = () => {
        this.setState({showMaterial: !this.state.showMaterial})
    }

    render() {
        let {mtStyleNav, mtStyleSelect, firstAddState, editStatus, editItem, saveModule,guideFlag,modalStyle,showMaterial} = this.state;
        let {setParamsData, setparamshandler, paramsValue, saveMatterContent, checkDate} = this.props;
        return (
            <React.Fragment>
                {showMaterial?
                    <MaterialAR paramsValue={paramsValue} addNav={this.addNav} showModal={this.showModal}/>
                :''}
                <div className={showMaterial?'MtBuildMain-content none':"MtBuildMain-content"}>
                    <div className="MtBuildMain-content-left">
                        <MtPhone
                            paramsValue={paramsValue}
                        />
                    </div>
                    <div className="MtBuildMain-content-right">
                        <div className='MattertEdit'>
                            <div className="MtEdit-header">
                                自动回复内容
                            </div>
                            <div className="MtEdit-nav">
                                {
                                    !mtStyleNav.length
                                        ?
                                        <div className="MtEdit-nav-add" onClick={this.firstAdd}>
                                            <span className="MtEdit-nav-add-img"></span>
                                            {
                                                firstAddState ?
                                                    <MtStyleSelect
                                                        showModal={this.showModal}
                                                        mtStyleSelect={mtStyleSelect}
                                                        checkedNav={this.checkedNav}
                                                    />
                                                    : ''
                                            }
                                        </div>
                                        :
                                        <MtNav
                                            showModal={this.showModal}
                                            editStatus={editStatus}
                                            mtStyleNav={mtStyleNav}
                                            firstAdd={this.firstAdd}
                                            firstAddState={firstAddState}
                                            mtStyleSelect={mtStyleSelect}
                                            checkedNav={this.checkedNav}
                                            editDetail={this.editDetail}
                                            deleteDetail={this.deleteDetail}
                                        />
                                }
                            </div>
                            <div className="MtEdit-edit">
                                <EditContent
                                    editItem={editItem}
                                    setparamshandler={setparamshandler}
                                    paramsValue={paramsValue}
                                    editStatus={editStatus}
                                    uploadXmlfile={this.uploadXmlfile}
                                />
                            </div>
                            <div className="MtEdit-edit-tips">{editTips(editItem)}</div>
                            <div className="MtEdit-edit-btn">

                                <ButtonBox
                                    btnTxt={'保存'}
                                    isCancel={false}
                                    btnFunc={()=>{checkDate()&&saveMatterContent()}}
                                    btnStyle={{marginRight: '30px'}}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
