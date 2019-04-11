import React, {Component} from 'react'
import './index.css'
import {sendEvent} from '../../../funStore/CommonFun'
// import {API_PATH} from "../../../constants/OriginName";

// import promiseXHR from '../../../funStore/ServerFun';
// import UploadXHR from '../../../funStore/UploadXHR';
// import AuthProvider from '../../../funStore/AuthProvider';

import Input from '../../shareComponent/Input'
import ButtonBox from '../../shareComponent/ButtonBox'
import AlongDatePicker from '../../shareComponent/AlongDatePicker'
import ModalBox from '../../shareComponent/ModalBox'
// import {formatDate} from '../../../funStore/CommonFun'
import {addMoment, editMoment} from '../../../funStore/MomentApi'
import {EditText, EditImg, EditLink, EditSpace} from './editText';
// import TipBubble from '../../shareComponent/TipBubble'
// import {GUIDE_TEXT} from '../../../constants/ConstantData'
import moment from 'moment';

// TEXT:文字
// IMG:图片
// LINK:h5链接

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
    }
}

function editTips(str) {
    switch (str) {
        case "3":
        case 3:
            return "*图片和链接仅能添加一种哦"
            break;
        case "1":
        case 1:
            return "*图片和链接仅能添加一种哦"
            break;
    }
}

const MmStyleSelect = ({mtStyleSelect, checkedNav}) => {
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
        <div className="MmEdit-nav-content">
            {
                mtStyleNav.map((item, index) => {
                    return (
                        <div key={index}
                             className={editStatus == index ? ("MmEdit-nav-content-item active " + MtStyleSelectType(item)) : ("MmEdit-nav-content-item " + MtStyleSelectType(item))}
                             onClick={editDetail.bind(this, item, index)}>
                            <span className="close-icon" onClick={deleteDetail.bind(this, item, index)}></span>
                            <span className="imgs"></span>
                            <span className="text">{MtStyleSelectTxt(item)}</span>
                        </div>
                    )
                })
            }
            {
                mtStyleNav.length < 2
                    ?
                    <div className="MmEdit-nav-content-item" onClick={firstAdd}>
                        <span
                            className={firstAddState ? "MmEdit-nav-content-item-icon active" : "MmEdit-nav-content-item-icon"}></span>
                        {
                            firstAddState ?
                                <MmStyleSelect
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
const EditContent = ({editItem, setparamshandler, paramsValue, paramsTxt, editStatus, texteareTxt, delImg, paramsImg, paramsLink}) => {
    switch (editItem) {
        case "0":
        case 0:
            return (
                <EditText
                    placeholder={"请输入文字"}
                    setparamshandler={setparamshandler}
                    paramsname={'paramstext'}
                    paramsTxt={paramsTxt}
                    editStatus={editStatus}
                />
            )
            break;
        case "3":
        case 3:
            return <EditImg
                paramsImg={paramsImg}
                delImg={delImg}
                paramsname={'paramsimg'}
                value={paramsValue[editStatus] || {}}
                paramsValue={paramsValue}
                editStatus={editStatus}
                setparamshandler={setparamshandler}
            />
            break;
        case "1":
        case 1:
            return <EditLink
                paramsLink={paramsLink}
                paramsname={'paramslink'}
                value={paramsValue[editStatus] || {}}
                editStatus={editStatus}
                setparamshandler={setparamshandler}
            />
            break;
        default:
            return (
                <EditSpace/>
            )
            break;
    }
}
export default class MmEdit extends Component {
    constructor() {
        super();
        this.state = {
            mtStyle: [0, 3, 1],
            mtStyleSelect: [0, 3, 1],
            mtStyleNav: [],//当前选项
            firstAddState: false,
            editStatus: -1,
            editItem: null,
            saveModule: false,
            guideFlag: window.location.href.includes('flag=new')
        }
        this.firstAdd = this.firstAdd.bind(this);
        this.checkedNav = this.checkedNav.bind(this);
        this.editDetail = this.editDetail.bind(this);
        this.deleteDetail = this.deleteDetail.bind(this);
        // this.successHandle = this.successHandle.bind(this);
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
        // console.log(c)
        // console.log(n)
        this.setState({
            editItem: c,
            editStatus: parseInt(n)
        })
        if (parseInt(c) === 0) {
            sendEvent("deletetext", this.props.paramsTxt)
        }
        sendEvent('slinkcontent', false)
    }

    deleteDetail(str, n, e) {
        // console.log(str,'str')
        // console.log(n,'n')
        // console.log(e,'e')
        e.nativeEvent.stopImmediatePropagation()
        e.stopPropagation()
        this.props.delparamsData(str)
        let {mtStyleNav, editStatus, mtStyleSelect, mtStyle} = this.state
        if (n == editStatus && n != 0) {
            editStatus--;
        } else if (n == editStatus && n == 0) {
            editStatus++
        } else if (n < editStatus || n < mtStyleNav.length) {
            editStatus--;
        }
        mtStyleNav.splice(parseInt(n), 1);

        if (str != 0) {
            mtStyle.push(3,1);
        } else {
            mtStyle.push(0);
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
        if (str == 0) {
            let index = mtStyle.indexOf(0);
            mtStyle.splice(index, 1)
            let s = mtStyle;
            mtStyleSelect = [...new Set(s)]
        } else {
            let index = mtStyle.indexOf(1)
            let index1 = mtStyle.indexOf(3)
            mtStyle.splice(index, 1)
            mtStyle.splice(index1, 1)
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

    // successHandle(formData) {
    //     const url = API_PATH + '/gridfs-api/noauth/media';
    //     UploadXHR(url, formData).then(res => {
    //         const file = res.resultContent
    //         this.props.setparamshandler('fileUrl', this.state.editStatus, file)
    //         const _url = API_PATH + '/taskadminapi/authsec/resolve/base64?fileId=' + file.id;
    //         AuthProvider.getAccessToken().then(token => {
    //             return promiseXHR(_url, {type: 'bearer', value: token}, {fileUrl: file.url}, "GET");
    //         }).then(result => {
    //             result = JSON.parse(result);
    //             this.props.setparamshandler('xmlFile', this.state.editStatus, result.resultContent);
    //         }).catch(req => {
    //             sendEvent('message', {txt: "XML解析失败", code: 1004, timer: 2000})
    //             // console.log(req);
    //         })
    //     }).catch(req => {
    //         sendEvent('message', {txt: "XML上传失败", code: 1004, timer: 2000})
    //         // console.log(req)
    //     })
    // }

    componentDidMount() {
        document.addEventListener('click',this.firstAddBlur)
        this.setState({editStatus: this.props.confirmData.items.length - 1})
        switch(this.props.confirmData.itemGroup) {
            case 'txt':
                this.setState({
                    mtStyleNav: [0],
                    mtStyle: [3, 1],
                    mtStyleSelect: [3, 1]
                })
                this.editDetail(0, 0)
                break;
            case 'pic':
                this.setState({
                    mtStyleNav: [3],
                    mtStyle: [0],
                    mtStyleSelect: [0]
                })
                this.editDetail(3, 0)
                break;
            case 'link':
                this.setState({
                    mtStyleNav: [1],
                    mtStyle: [0],
                    mtStyleSelect: [0]
                })
                this.editDetail(1, 0)
                break;
            case 'picTxt':
                this.setState({
                    mtStyleNav: [0,3],
                    mtStyle: [],
                    mtStyleSelect: []
                })
                this.editDetail(3, 1)
                break;
            case 'linkTxt':
                this.setState({
                    mtStyleNav: [0,1],
                    mtStyle: [],
                    mtStyleSelects: []
                })
                this.editDetail(1, 1)
                break;
        }
    }

    // componentWillReceiveProps (nextProps) {
    //     if (nextProps.confirmData.itemGroup && this.state.mtStyleNav.length == 0) {
    //         this.setState({editStatus: nextProps.confirmData.items.length - 1})
    //         switch(nextProps.confirmData.itemGroup) {
    //             case 'txt':
    //                 this.setState({
    //                     mtStyleNav: [0],
    //                     mtStyle: [3, 1],
    //                     mtStyleSelect: [3, 1]
    //                 })
    //                 this.editDetail(0, 0)
    //                 break;
    //             case 'pic':
    //                 this.setState({
    //                     mtStyleNav: [3],
    //                     mtStyle: [0],
    //                     mtStyleSelect: [0]
    //                 })
    //                 this.editDetail(3, 0)
    //                 break;
    //             case 'link':
    //                 this.setState({
    //                     mtStyleNav: [1],
    //                     mtStyle: [0],
    //                     mtStyleSelect: [0]
    //                 })
    //                 this.editDetail(1, 0)
    //                 break;
    //             case 'picTxt':
    //                 this.setState({
    //                     mtStyleNav: [0,3],
    //                     mtStyle: [],
    //                     mtStyleSelect: []
    //                 })
    //                 this.editDetail(3, 1)
    //                 break;
    //             case 'linkTxt':
    //                 this.setState({
    //                     mtStyleNav: [0,1],
    //                     mtStyle: [],
    //                     mtStyleSelects: []
    //                 })
    //                 this.editDetail(1, 1)
    //                 break;
    //         }
    //     }
    // }

    componentWillUnmount(){
        document.removeEventListener('click',this.firstAddBlur)
    }

    sendAddMoment () {
        let {confirmData,paramsTxt,paramsImg,paramsLink,sendingDates,sendingTimes} = this.props
        let txt, link, itemGroup, items
        let pic = []
        if (paramsTxt) {
            txt = {
                type: 0,
                content: paramsTxt,
            }
        }
        if (paramsImg.url.length) {
            paramsImg.url.map(item => {
                pic.push({type: 3,content:item.url?item.url:item})
            })
        }
        if (paramsLink.title) {
            link = {
                type: 1,
                title: paramsLink.title,
                uri: paramsLink.url,
                content: paramsLink.img.url
            }
        }
        let flag1 = txt ? true : false
        let flag2 = pic.length>0 ? true : false
        let flag3 = link ? true : false
        if (flag1 && !flag2 && !flag3) {
            itemGroup = 'txt'
        }
        if (!flag1 && flag2 && !flag3) {
            itemGroup = 'pic'
        }
        if (!flag1 && !flag2 && flag3) {
            itemGroup = 'link'
        }
        if (flag1 && flag2) {
            itemGroup = 'picTxt'
        }
        if (flag1 && flag3) {
            itemGroup = 'linkTxt'
        }
        if (itemGroup == 'txt') {
            items = [txt]
        }
        if (itemGroup == 'pic') {
            items = [...pic]
        }
        if (itemGroup == 'link') {
            items = [link]
        }
        if (itemGroup == 'picTxt') {
            items = [txt, ...pic]
        }
        if (itemGroup == 'linkTxt') {
            items = [txt, link]
        }
        let params = {
            title: confirmData.title,
            sendingTime: sendingDates + ' ' + sendingTimes.replace('时',':').replace('分','')+':00',
            itemGroup,
            items,
        }
        if (this.props.params.type == 'edit') {
            params.id = this.props.params.id
            return editMoment(params).then(res => {
                res = JSON.parse(res)
                if (res.resultCode == '03803400') {
                    sendEvent('message', {txt: "链接格式错误", code: 1003, timer: 2000})
                }
                if (res.resultCode == '01028411') {
                    sendEvent('message', {txt: "当前选择的日期已存在朋友圈发送任务，请重新选择发送时间～", code: 1003, timer: 2000})                    
                }
                if (res.resultCode == '100') {
                    sendEvent('message', {txt: "保存成功", code: 1000, timer: 2000})
                }
                if (res.resultCode == '101') {
                    sendEvent('message', {txt: "服务器错误", code: 1003, timer: 2000})
                }
                return res.resultCode == 100 ? true : false
            })
        } else {
            return addMoment(params).then(res => {
                res = JSON.parse(res)
                if (res.resultCode == '03803400') {
                    sendEvent('message', {txt: "链接格式错误", code: 1003, timer: 2000})
                }
                if (res.resultCode == '01028411') {
                    sendEvent('message', {txt: "当前选择的日期已存在朋友圈发送任务，请重新选择发送时间～", code: 1003, timer: 2000})                    
                }
                if (res.resultCode == '100') {
                    sendEvent('message', {txt: "保存成功", code: 1000, timer: 2000})
                }
                if (res.resultCode == '101') {
                    sendEvent('message', {txt: "服务器错误", code: 1003, timer: 2000})
                }
                return res.resultCode == 100 ? true : false
            })
        }
    }

    setDisabledDate = (time) => {
        return moment(time) < Date.now() - 24*3600*1000||moment(time) > Date.now() + 180*24*3600*1000
    }

    render() {
        let {mtStyleNav, mtStyleSelect, firstAddState, editStatus, editItem, saveModule,guideFlag,modalStyle} = this.state;
        let {setParamsData,sendingTimes,sendingDates, setparamshandler, paramsValue, changeStep, saveEditStatus, confirmData, actions, setPromptFlagHandle, delImg,paramsImg,paramsTxt,paramsLink} = this.props;
        return (
            <div className='MmEdit'>
                <div className="MmEdit-header">
                    <Input
                        label={"朋友圈标题："}
                        value={confirmData.title}
                        placeholder={'输入标题'}
                        paramsname={'mtTitle'}
                        styles={{width: "236px"}}
                        iptChangeParams={setparamshandler}
                    />
                    <AlongDatePicker
                        setDisabledDate={this.setDisabledDate}
                        label={"发送时间："}
                        styles={{width: "188px"}}
                        paramsname={'mtTime'}
                        sendingTimes={sendingTimes}
                        sendingDates={sendingDates}
                        setparamsHandle={setparamshandler}
                    />
                </div>
                <div className="MmEdit-nav">
                    {
                        !mtStyleNav.length
                            ?
                            //事件改变firstAddState
                            <div className="MmEdit-nav-add" onClick={this.firstAdd}>
                                <span className="MmEdit-nav-add-img"></span>
                                {/* {guideFlag?<TipBubble tipData ={GUIDE_TEXT.MT_BUILD} styles={{left:'6px',top:'64px'}}/>:null}
                                {guideFlag?<div className="wave-circle"></div>:null} */}
                                {
                                    // 判断是否有一个内容
                                    firstAddState ?
                                        <MmStyleSelect
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
                <div className="MmEdit-edit">
                    <EditContent
                        paramsTxt={paramsTxt}
                        paramsImg={paramsImg}
                        paramsLink={paramsLink}
                        delImg={delImg}
                        editItem={editItem}
                        setparamshandler={setparamshandler}
                        paramsValue={paramsValue}
                        editStatus={editStatus}
                    />
                </div>
                <div className="MmEdit-edit-tips">{editTips(editItem)}</div>
                <div className="MmEdit-edit-btn">
                    <ButtonBox
                        btnTxt={'取消'}
                        isCancel={true}
                        btnFunc={(e) => {
                            if (!saveEditStatus) {
                                this.changeSaveModule(e)
                            } else {
                                actions.goTo('/v2/MMScope')
                            }
                        }}
                        btnStyle={{marginRight: '30px'}}
                    />
                    <ButtonBox
                        btnTxt={'保存'}
                        isCancel={false}
                        btnFunc={() => {
                            this.props.checkDate()&&this.sendAddMoment().then(e => e&&this.props.setPromptFlagHandle(false).then(v => actions.goTo('/v2/MMScope')))
                        }}
                    />
                </div>
                {
                    saveEditStatus
                        ? ""
                        :
                        <ModalBox
                            modalStatus={saveModule}
                            closeModalFunc={() => {
                                this.closeModal()
                                setPromptFlagHandle()
                            }}
                            confirmFunc={() => {
                                this.closeModal()
                                actions.goTo('/v2/MMScope')
                            }}
                            modalStyle={modalStyle}
                            modalTxt={'离开当前页面后将丢失本次编辑的内容哦'}
                            cancelTxt={'我再想想'}
                            confirmTxt={'知道了'}
                        />
                }

            </div>
        )
    }
}
