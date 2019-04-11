/**
 * 创建时间:2018-10-08 10:39:54
 * 作者：sufei  Xerath
 * 邮箱：fei.su@gemii.cc
 * 版本号：1.0
 * @版权所有
 **/
import React, {Component} from 'react'
import './index.css'
import ButtonBox from "../../../shareComponent/ButtonBox";
import MatterCard from "../MatterCard";
import ModalBox from "../../../shareComponent/ModalBox";
import Step2EditModule from "../Step2EditModule";
import {sendEvent} from "../../../../funStore/CommonFun";

function returnChina(num) {
    switch (num) {
        case '0':
        case 0:
            return '素材一';
            break;
        case '1':
        case 1:
            return '素材二';
            break;
        case '2':
        case 2:
            return '素材三';
            break;
    }
}


export default class Step2 extends Component {
    constructor() {
        super();
        this.state = {
            deleteMatterState: false,
            editMatterModalState: false,
            editId: null,//处理id
            paramsValue: [],
            staticParamsValue: [],
            type: '',
            modalStyle: {}
        }
        this.deleteMatterModal = this.deleteMatterModal.bind(this);
        this.confirmDelete = this.confirmDelete.bind(this);
        this.editMatterModal = this.editMatterModal.bind(this);

        this.createparamsData = this.createparamsData.bind(this)
        this.delparamsData = this.delparamsData.bind(this)
        this.setparamshandler = this.setparamshandler.bind(this)
        this.setparamsData = this.setparamsData.bind(this)
        this.setParamsValue = this.setParamsValue.bind(this)
        this.saveMatterContent = this.saveMatterContent.bind(this)

        this.newMatterModal = this.newMatterModal.bind(this)
    }

    deleteMatterModal(id,e) {
        let modalStyle = {}
        modalStyle.left = e.clientX+'px'
        modalStyle.top = e.clientY+'px'
        this.setState({
            modalStyle: modalStyle,
            deleteMatterState: true,
            editId: id >= 0 ? id : null
        })
    }
    closeModal=(id)=> {
        this.setState({
            deleteMatterState: false,
            editId: id >= 0 ? id : null
        })
    }

    editMatterModal(id, type) {
        let {paramsValue,staticParamsValue,editMatterModalState} = this.state
        this.setState({
            paramsValue: JSON.parse(JSON.stringify(staticParamsValue)),
            editMatterModalState: !editMatterModalState,
            editId: id >= 0 ? id : null
        })
        if (type == 'ADD') {
            this.setState({
                // paramsValue: this.state.paramsValue.slice(0, this.state.paramsValue.length - 1),
                type: ''
            })
        }
    }

    newMatterModal() {
        let {paramsValue} = this.state;
        // console.log(paramsValue);
        paramsValue.push([]);

        this.setState({
            editMatterModalState: true,
            paramsValue,
            editId: paramsValue.length - 1,
            type: 'ADD'
        });

    }


    // 初始化加载数据
    setParamsValue(paramsValue) {
        // console.log("有Id初始化数据");
        this.setState({paramsValue})
    }

    // 保存素材内容
    saveMatterContent() {
        let {paramsValue} = this.state;
        this.props.saveMatterContent(paramsValue);
        this.setState({
            staticParamsValue: JSON.parse(JSON.stringify(paramsValue)),
            editMatterModalState: false,
            type: ''
        })
    }

    // 删除素材
    confirmDelete() {
        let {paramsValue, editId, staticParamsValue} = this.state;
        paramsValue.splice(parseInt[editId], 1)
        paramsValue[0] && paramsValue[0].length&&paramsValue[0].forEach((v)=> {
            v.groupType = 0
        })
        paramsValue[1] && paramsValue[1].length&&paramsValue[1].forEach((v)=> {
            v.groupType = 1
        })
        staticParamsValue = JSON.parse(JSON.stringify(paramsValue))
        // for (let i = 0; i < paramsValue.length; i++) {
        //     if (paramsValue[0] && paramsValue[0].length) {
        //         for (let j = 0; j < paramsValue[0].length; j++) {

        //             paramsValue[0][j].groupType = 0
        //         }
        //     }
        //     if (paramsValue[1] && paramsValue[1].length) {
        //         for (let j = 0; j < paramsValue[1].length; j++) {
        //             paramsValue[0][j].groupType = 1
        //         }
        //     }
        // }
        this.props.saveMatterContent(paramsValue)
        this.setState({
            paramsValue,
            staticParamsValue
        })
        this.closeModal('')
    }

    setparam = (params,resultData) => {
        let {paramsValue, editId} = this.state;
        let obj = {groupType: editId}
        let index = paramsValue[editId].findIndex(v => v.type==params[2])
        switch (params[0]) {
            case "img":
                if (index != -1) {
                    paramsValue[editId].files.find(item => item.fileType === 'image').fileId = ''
                    paramsValue[editId][index].files.find(item => item.fileType === 'image').filePath = params[1].sendContent
                    
                    this.setState({
                        paramsValue,
                        saveEditStatus: false,
                    })
                } else {
                    obj.files=[]
                    obj.files.push({filePath: params[1].sendContent,fileType:'image'})
                    obj.type = 3
                    this.setparamsData(obj,paramsValue[editId].length)
                }
                break;
            case "H5":
                if (index != -1) {
                    paramsValue[editId][index].files.find(item => item.fileType === 'image').fileId = ''
                    paramsValue[editId][index].files.find(item => item.fileType === 'image').filePath = params[1].sendContent
                    paramsValue[editId][index].title = params[1].linkTitle
                    paramsValue[editId][index].content = params[1].linkDesc
                    paramsValue[editId][index].uri = params[1].linkHref
                    
                    this.setState({
                        paramsValue,
                        saveEditStatus: false,
                    })
                } else {
                    obj.files=[]
                    obj.files.push({filePath: params[1].sendContent,fileType:'image'})
                    obj.type = 1
                    obj.title = params[1].linkTitle
                    obj.content = params[1].linkDesc
                    obj.uri = params[1].linkHref
                    this.setparamsData(obj,paramsValue[editId].length)
                }
                break;
            case 'mpro':
                let url = params[1].sendContent.match(/<pagepath>(\S*?)<\/pagepath>/)[1]
                if (index != -1) {
                    paramsValue[editId][index].wexx = params[1].sendContent.match(/<title>(\S*?)<\/title>/)[1]
                    paramsValue[editId][index].uri = url.replace('<![CDATA[', '').replace(']]>', '')
                    paramsValue[editId][index].files.find(item => item.fileType === 'image').filePath = params[1].linkHref
                    paramsValue[editId][index].files.find(item => item.fileType === 'image').fileId = ''
                    paramsValue[editId][index].files.find(item => item.fileType === 'text').filePath = resultData.uri
                    paramsValue[editId][index].files.find(item => item.fileType === 'text').fileId = resultData.id
                    paramsValue[editId][index].title = params[1].sendContent.match(/<title>(\S*?)<\/title>/)[1]
                    paramsValue[editId][index].content = params[1].sendContent.match(/<title>(\S*?)<\/title>/)[1]
                    paramsValue[editId][index].logSrc = params[1].linkDesc
                    paramsValue[editId][index].wexx = params[1].sendContent.match(/<sourcedisplayname>(\S*)<\/sourcedisplayname>/)[1]
                    
                    this.setState({
                        paramsValue,
                        saveEditStatus: false,
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
                    this.setparamsData(obj, paramsValue[editId].length)
                }
                break;
            case "public":
                if (index != -1) {
                    paramsValue[editId][index].content = params[1].sendContent
                    paramsValue[editId][index].title = params[1].linkDesc
                    paramsValue[editId][index].uri = params[1].linkHref

                    paramsValue[editId][index].files = [{
                        filePath: params[1].linkHref,
                        fileType: 'image',
                        type: 3
                    }]
                    this.setState({
                        paramsValue,
                        saveEditStatus: false,
                    })
                } else {
                    obj.type = 6
                    obj.content = params[1].sendContent
                    obj.title = params[1].linkDesc
                    obj.uri = params[1].linkHref
                    obj.files = [{
                        filePath: params[1].linkHref,
                        fileType: 'image',
                        type: 3
                    }]
                    this.setparamsData(obj,paramsValue[editId].length)
                }
                break;
            case "voice":
                if (index != -1) {
                    paramsValue[editId][index].files[0].fileId=''
                    paramsValue[editId][index].files[0].filePath=params[1].sendContent
                    paramsValue[editId][index].files[0].type=params[1].voiceTime
                    this.setState({paramsValue})
                } else {
                    obj.files=[]
                    obj.files.push({filePath: params[1].sendContent,fileType:'audio',type: params[1].voiceTime})
                    obj.type = 5
                    this.setparamsData(obj,paramsValue[editId].length)
                }
                break;
        }
    }
    //编辑素材内容
    setparamshandler(name, value, e) {
        let {paramsValue, editId} = this.state;
        let obj = paramsValue[editId][value];
        switch (name) {
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
                let parser = new DOMParser();
                let xmlDoc = parser.parseFromString(e, "text/xml")
                let logoSrc = xmlDoc ? xmlDoc.querySelectorAll('weappiconurl') : []
                let logoSrcs = logoSrc[0] ? logoSrc[0].innerHTML.replace('<![CDATA[', '').replace(']]>', '') : ''
                let logoTitle = xmlDoc ? xmlDoc.querySelectorAll('sourcedisplayname') : []
                let logoTitles = logoTitle[0] ? logoTitle[0].innerHTML.replace('<![CDATA[', '').replace(']]>', '') : ''
                let title = xmlDoc ? xmlDoc.querySelectorAll('appmsg>title') : []
                let titles = title[0] ? title[0].innerHTML : '预览小程序标题'
                obj.wexx = logoTitles;
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
            case 'paramsSlink':
                obj.files.find(item => item.fileType === 'image').filePath = e.url;
                obj.files.find(item => item.fileType === 'image').fileId = e.id;
                this.setparamsData(obj, value)
                break;
            case 'paramsSLinkTitle':
                obj.title = e;
                this.setparamsData(obj, value)
                break;
            case 'paramsSLinkDescription':
                obj.content = e;
                this.setparamsData(obj, value)
                break;
            case 'paramsSLinkTxt':
                let indexs1;
                paramsValue[editId].find((item, index) => {
                    if (item.type == 4) {
                        indexs1 = index;
                        return item
                    }
                }).files.find(item => item.fileType === 'text').fileContent[value].value = e;
                this.setparamsData(paramsValue[editId][indexs1], indexs1)
                break;
            case 'paramsSLinkTxtAdd':
                let indexss;
                paramsValue[editId].find((item, index) => {
                    if (item.type == 4) {
                        indexss = index;
                        return item
                    }
                }).files.find(item => item.fileType === 'text').fileContent.push({
                    type: 'txt',
                    value: ''
                });
                this.setparamsData(paramsValue[editId][indexss], indexss)
                break;
            case 'paramsSLinkImgAdd':
                let indexs;
                paramsValue[editId].find((item, index) => {
                    if (item.type == 4) {
                        indexs = index;
                        return item
                    }
                }).files.find(item => item.fileType === 'text').fileContent.push({
                    type: 'img',
                    value: ''
                });
                this.setparamsData(paramsValue[editId][indexs], indexs);
                break;
            default:
                break;
        }
    }

    // 新增素材内容
    createparamsData(c) {
        let {paramsValue, editId} = this.state;
        // console.log(editId,"editId")
        c = parseInt(c);
        switch (c) {
            case 0:
                paramsValue[editId].push({
                    content: "",
                    type: 0,
                    files: [],
                    groupType: editId
                })
                break;
            case 2:
                paramsValue[editId].push({
                    type: 2,
                    groupType: editId,
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
                paramsValue[editId].push({
                    type: 4,
                    groupType: editId,
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
            case 1:
                paramsValue[editId].push({
                    title: '',
                    groupType: editId,
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
                paramsValue[editId].push({
                    files: [{
                        fileType: 'image',
                        fileId: "",
                        filePath: ''
                    }],
                    type: 3,
                    groupType: editId,
                })
                break;
            default:
                break;
        }
        this.setState({
            paramsValue
        })
    }

    // 删除素材内容
    delparamsData(n) {
        let {paramsValue, editId} = this.state;
        paramsValue[editId].splice(parseInt(n), 1);

        this.setState({
            paramsValue
        })
    }


    setparamsData(c, n) {
        let {paramsValue, editId} = this.state;
        paramsValue[editId][n] = c;
        this.setState({
            paramsValue
        })
    }

    componentDidMount() {
        let newArr = this.props.confirmData.kwRuleActions[1].kwResponseItems
            ?
            this.props.confirmData.kwRuleActions[1].kwResponseItems
            :
            this.props.confirmData.kwRuleActions[0].kwResponseItems;
        let temp1 = [];
        let temp2 = [];
        let temp3 = [];
        if (newArr) {
            for (let i = 0; i < newArr.length; i++) {
                if (newArr[i].groupType == 0) {
                    temp1.push(newArr[i])
                }
                if (newArr[i].groupType == 1) {
                    temp2.push(newArr[i])
                }
                if (newArr[i].groupType == 2) {
                    temp3.push(newArr[i])
                }
            }
            let oNewArr = [];
            if (temp1.length) {
                oNewArr.push(temp1)
            }
            if (temp2.length) {
                oNewArr.push(temp2)
            }
            if (temp3.length) {
                oNewArr.push(temp3)
            }
            // console.log(oNewArr);
            this.setState({
                paramsValue: oNewArr,
                staticParamsValue: oNewArr
            })
        }
    }

    componentWillUnmount() {
    }

    checkDate = () => {
        let {paramsValue,editId} = this.state
        let paramsData = paramsValue[editId]
        let flag = paramsData.map(item => {
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
        if (!paramsData.length || flag.indexOf(false)!=-1) {
            sendEvent('message', {txt: "回复素材没有编辑完整", code: 1003, timer: 2000})
            return false
        }
        return true
    }
    
    render() {
        let {deleteMatterState, editMatterModalState, paramsValue, editId, type, modalStyle} = this.state;
        let {changeStep} = this.props;
        // console.log(editId,'打开渲染')
        // console.log(paramsValue)
        return (
            <div className='Step2'>
                {/* <div className="Step2-title">
                    第二步：编辑自动回复素材
                </div> */}
                <div className="stepTitle">
                    <span className='done'>1.新增关键词</span>
                    <span className='done' style={{margin:'0 12px'}}>></span>
                    <span className='done'>2.编辑自动回复素材</span>
                    <span className='todo' style={{margin:'0 12px'}}>></span>
                    <span className='todo'>3.选择生效目标群</span>
                </div>
                <div className="Step2-content">
                    {
                        paramsValue.length < 3 ?
                            <div className="add-new-matter" onClick={this.newMatterModal}>
                                <span className='add-new-matter-icon'></span>
                                新建自动回复
                            </div> : ''
                    }
                    {
                        paramsValue.map((item, index) => {
                            return item.length ?
                                (
                                    <MatterCard
                                        key={index}
                                        title={returnChina(item[0].groupType)}
                                        paramsIndex={index}
                                        paramsItem={item}
                                        deleteMatterModal={this.deleteMatterModal}
                                        editMatterModal={this.editMatterModal}
                                    />
                                ) : ''
                        })
                    }

                </div>
                <div className="Step2-footer">
                    <ButtonBox
                        btnTxt={"上一步"}
                        isCancel={true}
                        btnFunc={() => {
                            changeStep('STEP1')
                        }}
                    />
                    <ButtonBox
                        btnTxt={"下一步"}
                        isCancel={false}
                        btnFunc={() => {
                            if(paramsValue.length==0) {
                                sendEvent('message', {txt: '请先添加素材', code: 1004, timer: 3000})
                                return false
                            }
                            this.props.saveMetter(this.state.paramsValue)
                            changeStep('STEP3')
                        }}
                    />
                </div>
                <ModalBox
                    modalStatus={deleteMatterState}
                    modalTxt={'确定要删除当前素材吗'}
                    modalStyle={modalStyle}
                    confirmTxt={'删除'}
                    closeModalFunc={this.closeModal}
                    confirmFunc={this.confirmDelete}
                    isDelete={true}
                />
                {
                    editMatterModalState ?
                        <Step2EditModule
                            editMatterModal={this.editMatterModal}
                            paramsValue={paramsValue[editId]}
                            createparamsData={this.createparamsData}
                            delparamsData={this.delparamsData}
                            setparamshandler={this.setparamshandler}
                            setParamsValue={this.setParamsValue}
                            saveMatterContent={this.saveMatterContent}
                            type={type}
                            setparam={this.setparam}
                            checkDate={this.checkDate}
                        />
                        :
                        ''
                }
            </div>
        )
    }
}
