
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
import ModalBox from '../../shareComponent/ModalBox'
import {formatDate} from '../../../funStore/CommonFun'
import {EditText, EditImg, EditLink, EditSLink, EditWexx, EditSpace} from '../MatterEdit/editText';
import TipBubble from '../../shareComponent/TipBubble'
import {GUIDE_TEXT} from '../../../constants/ConstantData'

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

const MtStyleSelect = ({mtStyleSelect, checkedNav}) => {
    return (
        <div className="MtStyleSelectBox" onClick={e=>{e.stopPropagation()}}>
            <div className="MtStyleSelectBox-trg"></div>
            {
                mtStyleSelect.map((item, index) => {
                    return (
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
        </div>
    )
}
const MtNav = ({mtStyleNav, editStatus, firstAdd, firstAddBlur, checkedNav, mtStyleSelect, firstAddState, editDetail, deleteDetail}) => {
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
                <EditSpace txt={'点击左上角“+”,开始编辑你的投放内容吧～'}/>
            )
            break;
    }
}
export default class MtEdit extends Component {
    constructor() {
        super();
        this.state = {
            mtStyle: [0, 0, 0, 3, 1, 2],
            mtStyleSelect: [0, 3, 1, 2],
            mtStyleNav: [],//当前选项
            firstAddState: false,
            editStatus: -1,
            editItem: null,
            saveModule: false,
            modalStyle:{},
            guideFlag: window.location.href.includes('flag=new')
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
        console.log(modalStyle)
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
        if (str != 1 && str != 4) {
            let index = mtStyle.indexOf(str);
            mtStyle.splice(index, 1)
            let s = mtStyle;
            mtStyleSelect = [...new Set(s)]
        } else {
            let index1 = mtStyle.indexOf(1);
            mtStyle.splice(index1, 1)
            // let index2 = mtStyle.indexOf(4);
            // mtStyle.splice(index2, 1)
            let s = mtStyle;
            mtStyleSelect = [...new Set(s)]
        }
        mtStyleNav.push(str);
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

    render() {
        let {mtStyleNav, mtStyleSelect, firstAddState, editStatus, editItem, saveModule,guideFlag,modalStyle} = this.state;
        let {setParamsData,sendingTimes,sendingDates, setparamshandler, paramsValue, changeStep, saveEditStatus, confirmData, actions, setPromptFlagHandle} = this.props;
        return (
            <div className='MtEdit'>
                <div className="MtEdit-header">
                    <Input
                        label={"投放标题："}
                        value={confirmData.title}
                        placeholder={'创建投放标题'}
                        paramsname={'mtTitle'}
                        styles={{width: "244px"}}
                        iptChangeParams={setparamshandler}
                    />
                    <AlongDatePicker
                        label={"投放时间："}
                        styles={{width: "188px"}}
                        paramsname={'mtTime'}
                        sendingTimes={sendingTimes}
                        sendingDates={sendingDates}
                        setparamsHandle={setparamshandler}
                    />
                </div>
                <div className="MtEdit-nav">
                    {
                        !mtStyleNav.length
                            ?
                            //事件改变firstAddState
                            <div className="MtEdit-nav-add" onClick={this.firstAdd}>
                                <span className="MtEdit-nav-add-img"></span>
                                {guideFlag?<TipBubble tipData ={GUIDE_TEXT.MT_BUILD} styles={{left:'6px',top:'64px'}}/>:null}
                                {guideFlag?<div className="wave-circle"></div>:null}
                                {
                                    // 判断是否有一个内容
                                    firstAddState ?
                                        <MtStyleSelect
                                            mtStyleSelect={mtStyleSelect}
                                            checkedNav={this.checkedNav}
                                        />
                                        : ''
                                }
                            </div>
                            :
                            <MtNav
                                editStatus={editStatus}
                                mtStyleNav={mtStyleNav}
                                firstAdd={this.firstAdd}
                                firstAddBlur={this.firstAddBlur}
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
                        btnTxt={'返回'}
                        isCancel={true}
                        btnFunc={(e) => {
                            if (!saveEditStatus) {
                                this.changeSaveModule(e)
                            } else {
                                actions.goTo('/v2/MTScope')
                            }
                        }}
                        btnStyle={{marginRight: '30px'}}
                    />
                    {/* <ButtonBox
                        btnTxt={'保存'}
                        isCancel={true}
                        btnFunc={() => {
                            this.props.setPromptFlagHandle(false)
                            this.props.saveGroupTask()
                        }}
                        btnStyle={{marginRight: '30px'}}
                    /> */}
                    <ButtonBox
                        btnTxt={'选择群'}
                        isCancel={false}
                        btnFunc={() => {
                            this.props.checkDate()&&changeStep("SELECTGROUP")
                        }}
                    />
                </div>
                {
                    saveEditStatus
                        ? ""
                        :
                        <ModalBox
                            modalStatus={saveModule}
                            modalStyle={modalStyle}
                            closeModalFunc={() => {
                                this.closeModal()
                            }}
                            confirmFunc={() => {
                                actions.goTo('/v2/MTScope')
                            }}
                            modalTxt={'离开当前页面后将丢失本次编辑的内容哦'}
                            cancelTxt={'我再想想'}
                            confirmTxt={'知道了'}
                        />
                }

            </div>
        )
    }
}
