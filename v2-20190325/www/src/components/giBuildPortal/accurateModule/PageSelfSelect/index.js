/**
 * 创建时间:2018-08-31 16:30:06
 * 作者：sufei  Xerath
 * 邮箱：fei.su@gemii.cc
 * 版本号：1.0
 * @版权所有
 **/
import React, { Component } from 'react'
import './index.css'
import IptLimit from "../../../shareComponent/IptLimit";

import AuthProvider from '../../../../funStore/AuthProvider'
import promiseXHR from '../../../../funStore/ServerFun'
import {API_PATH} from '../../../../constants/OriginName'
import promiseFile from '../../../../funStore/promiseFile'
import {sendEvent} from '../../../../funStore/CommonFun'
import ModalBox from '../../../shareComponent/ModalBox'

class IptBox extends Component{
    constructor(props){
        super(props)
    }
    componentDidMount() {
        this._input&&this._input.focus();
    }
    render(){
        const {iptValue,addConfirm,textInput,styleClass} = this.props
        return (
            <div className={styleClass}>
                <input className='ipt'  ref={c => (this._input = c)} type="text" placeholder='请输入' value={iptValue} onKeyUp={(e)=>{e.keyCode==13&&addConfirm()}} onChange={textInput}/>
                {/* <span className='icon-confirm' onClick={this.addLevel1Confirm}>C</span>
                <span className='icon-cancel' onClick={this.addLevel1Cancel}>X</span> */}
            </div>
        )
    }
}

export default class PageSelfSelect extends Component {
    constructor() {
        super();
        this.state = {
            sourceData: [],
            add_Level1_flag: false,
            level1_value_cache: '',
            level2_value_cache: '',
            delete_flag: false,
            parentIndex: null,
            currentIndex: null,
            modalStyle: {}
        }
    }
    componentDidMount(){
        let {updateItem,sysTtims,updateSysTtims,disabled,data} = this.props;
        // 获取自定义下拉列表
        let CUSTOM_SELECT_data =  sysTtims.find(v => v.templateItemCode=='CUSTOM_SELECT')
        if(CUSTOM_SELECT_data){
            this.setState({
                sourceData: CUSTOM_SELECT_data.sysTtims
            })
        }else{
            console.log(data)
            let templateItemId = data.id
            const url = `${API_PATH}/basis-api/authsec/tenant/template/customregion/tree?templateItemMapCustomRegionId=${templateItemId}&customType=CUSTOM_SELECT`
            if(templateItemId){
                AuthProvider.getAccessToken()
                .then((resolve, reject)=>{
                    return promiseXHR(url,{type:'Bearer',value:resolve},null,'GET')
                })
                .then(res=>{
                    const resData=JSON.parse(res);
                    if(resData.resultCode=='100'){
                        let sourceData = resData.resultContent.map((v,i)=>({
                            ...v,
                            editFlag: false,
                            add_Level2_flag: false,
                            cityList: v.cityList.map(r => ({
                                ...r,
                                editFlag: false
                            }))
                        }))
                        this.setState({
                            sourceData: sourceData
                        })
                        updateSysTtims({
                            "sysTtims": sourceData,
                            "templateItemCode":data.code,
                            "templateItemId":data.templateItemId
                        },data.code,data.templateItemId)
                    }
                })
            }else{
                updateSysTtims({
                    "sysTtims":[],
                    "templateItemCode":data.code,
                    "templateItemId":data.templateItemId
                },data.code,data.templateItemId)
            }
        }
    }
    setparamsHandle=(k,v)=> {
        let data = this.props.data
        if(k=='name'){
            data.label = v
        }else if(k=='mandatory'){
            data.mandatory = v
        }else if(k=='value'){
            data.defaultValue = v
        }
        this.props.updateItem(data)
    }
    level1Input = (e)=>{
        this.setState({
            level1_value_cache: e.target.value
        })
    }
    level2Input = (e) => {
        this.setState({
            level2_value_cache: e.target.value
        })
    }
    // 1级目录新增操作
    addLevel1Click = ()=>{
        // 编辑时，所有edit关闭,除了1级新增
        let {sourceData} = this.state
        sourceData = sourceData.map((v,i)=>({
                ...v,
                editFlag: false,
                add_Level2_flag: false,
                cityList: v.cityList.map(r => ({
                    ...r,
                    editFlag: false
                }))
            })
        )
        this.setState({
            add_Level1_flag: true,
            level1_value_cache: '',
            sourceData
        })
    }
    addLevel1Cancel = () => {
        this.setState({
            add_Level1_flag: false,
            level1_value_cache: ''
        })
    }
    addLevel1Confirm = () => {
        let {sourceData,level1_value_cache} = this.state
        let {updateSysTtims,data} = this.props;
        const newLevel1 = {
            name: level1_value_cache.trim().slice(0,12),
            cityList: [],
            code: data.code,
            status: 1,
            editFlag: false,
            add_Level2_flag: false,
            expandFlag: false
        }
        if(newLevel1.name==''){
            this.setState({
                add_Level1_flag: false,
                level1_value_cache: ''
            })
            return
        }
        sourceData.push(newLevel1)
        this.setState({
            add_Level1_flag: false,
            level1_value_cache: '',
            sourceData
        })
        // 处理传递给后端的数据
        updateSysTtims({
            "sysTtims":sourceData,
            "templateItemCode":data.code,
            "templateItemId":data.templateItemId
        },data.code,data.templateItemId)
    }
    // 1级目录编辑操作
    editLevel1Click = (level1_index) => {
        // 编辑时，所有edit关闭,除了选中的这个
        let {sourceData} = this.state
        sourceData = sourceData.map((v,i)=>({
                ...v,
                editFlag: level1_index==i?true:false,
                add_Level2_flag: false,
                cityList: v.cityList.map(r => ({
                    ...r,
                    editFlag: false
                }))
            })
        )
        this.setState({
            add_Level1_flag: false,
            level1_value_cache:sourceData[level1_index].name,
            sourceData
        })
    }
    editLevel1Cancel = (level1_index) => {
        let {sourceData} = this.state
        sourceData[level1_index].editFlag = false
        this.setState({
            sourceData,
            level1_value_cache: ''
        })
    }
    editLevel1Confirm = (level1_index,e) => {
        let {sourceData,level1_value_cache} = this.state
        let newValue = level1_value_cache.trim().slice(0,12)
        sourceData[level1_index].editFlag = false
        if(newValue!=''){
            sourceData[level1_index].name = newValue
            this.setState({
                sourceData,
                level1_value_cache: ''
            })
            let {updateSysTtims,data} = this.props;
             // 处理传递给后端的数据
            updateSysTtims({
                "sysTtims":sourceData,
                "templateItemCode":data.code,
                "templateItemId":data.templateItemId
            },data.code,data.id)
        }else{
            this.deleteClick(null,level1_index,e)
        }
    }

    // 删除操作
    deleteClick = (parentIndex,currentIndex,e) => {
        let modalStyle = {}
        modalStyle.left = e.clientX+'px'
        modalStyle.top = e.clientY+'px'
        this.setState({
            modalStyle,
            parentIndex,
            currentIndex,
            delete_flag: true
        })
    }

    deleteCancel = () => {
        this.setState({
            parentIndex:null,
            currentIndex:null,
            delete_flag: false
        })
    }

    deleteConfirm = () => {
        const {sourceData,parentIndex,currentIndex} = this.state
        if(parentIndex===null){
            if(sourceData[currentIndex].id){
                // 1级菜单删除，子菜单也状态置为3
                sourceData[currentIndex].status=3
                sourceData[currentIndex].cityList = sourceData[currentIndex].cityList.map(v => ({...v,status:3}))
            }else{
                sourceData.splice(currentIndex,1)
            }
        }else{
            if(sourceData[parentIndex].cityList[currentIndex].id){
                sourceData[parentIndex].cityList[currentIndex].status=3
            }else{
                sourceData[parentIndex].cityList.splice(currentIndex,1)
            }   
        }
        this.setState({
            parentIndex: null,
            currentIndex: null,
            delete_flag: false,
            sourceData
        })
        let {updateSysTtims,data} = this.props;
        // 处理传递给后端的数据
        updateSysTtims({
            "sysTtims":sourceData,
            "templateItemCode":data.code,
            "templateItemId":data.templateItemId
        },data.code,data.templateItemId)
    }

    // 2级目录新增
    addLevel2Click = (level1_index) =>{
        // 编辑时，所有edit关闭,除了2级新增
        let {sourceData} = this.state
        sourceData = sourceData.map((v,i)=>({
                ...v,
                editFlag: false,
                add_Level2_flag: level1_index==i?true:false,
                expandFlag: level1_index==i?true:v.expandFlag,
                cityList: v.cityList.map(r => ({
                    ...r,
                    editFlag: false
                }))
            })
        )
        this.setState({
            add_Level1_flag: false,
            level2_value_cache: '',
            sourceData
        })
    }

    addLevel2Cancel = (level1_index)=>{
        let {sourceData} = this.state
        sourceData[level1_index].add_Level2_flag = false
        this.setState({
            sourceData,
            level2_value_cache: ''
        })
    }

    addLevel2Confirm = (level1_index) => {
        let {sourceData,level2_value_cache} = this.state
        let {updateSysTtims,data} = this.props;
        const newLevel2 = {
            name: level2_value_cache.trim().slice(0,12),
            cityList: [],
            code: data.code,
            status: 1,
            editFlag: false,
            parentId: sourceData[level1_index].id?sourceData[level1_index].id:null
        }
        sourceData[level1_index].add_Level2_flag = false
        if(newLevel2.name!=''){
            sourceData[level1_index].cityList.push(newLevel2)
             // 处理传递给后端的数据
            updateSysTtims({
                "sysTtims":sourceData,
                "templateItemCode":data.code,
                "templateItemId":data.templateItemId
            },data.code,data.templateItemId)
        }
        this.setState({
            level2_value_cache: '',
            sourceData
        })
    }

    // 2级目录编辑
    editLevel2Click = (level1_index,level2_index) => {
         let {sourceData} = this.state
        sourceData = sourceData.map((v,vIndex)=>({
                ...v,
                editFlag: false,
                add_Level2_flag: false,
                cityList: v.cityList.map((r,rIndex) => ({
                    ...r,
                    editFlag: level1_index==vIndex&&level2_index==rIndex?true:false
                }))
            })
        )
        this.setState({
            add_Level1_flag: false,
            level2_value_cache:sourceData[level1_index].cityList[level2_index].name,
            sourceData
        })
    }

    editLevel2Cancel = (level1_index,level2_index) => {
        let {sourceData} = this.state
        sourceData[level1_index].cityList[level2_index].editFlag = false
        this.setState({
            sourceData,
            level2_value_cache: ''
        })
    }
    editLevel2Confirm = (level1_index,level2_index,e) => {
        let {sourceData,level2_value_cache} = this.state
        let newValue = level2_value_cache.trim().slice(0,12)
        sourceData[level1_index].cityList[level2_index].editFlag = false
        if(newValue!=''){
            sourceData[level1_index].cityList[level2_index].name = newValue
            this.setState({
                sourceData,
                level2_value_cache: ''
            })
            let {updateSysTtims,data} = this.props;
             // 处理传递给后端的数据
            updateSysTtims({
                "sysTtims":sourceData,
                "templateItemCode":data.code,
                "templateItemId":data.templateItemId
            },data.code,data.templateItemId)
        }else{
            this.deleteClick(level1_index,level2_index,e)
        }
    }

    // 展开操作
    expandHandle = (level1_index) => {
        let {sourceData} = this.state
        sourceData = sourceData.map((v,i)=> ({
            ...v,
            expandFlag: level1_index==i?!v.expandFlag:v.expandFlag
        }))
        this.setState({sourceData})
    }

    render() {
        let {modalStyle,sourceData,add_Level1_flag,delete_flag,level1_value_cache,level2_value_cache} = this.state;
        let { data ,disabled} = this.props
        // console.log(sourceData)
        return (
            <div className='PageSelfSelect'>
                <div className="Pagetitle">自定义下拉框：</div>
                <div className="PageContent">
                    <div className='row'>
                        <IptLimit
                            widths={{ width: '316px' }}
                            paramName={'name'}
                            placeholder={'请输入文字'}
                            label={'显示文字：'}
                            value={data.label}
                            maxLength={10}
                            limitState={false}
                            widthsLa={{ width: '70px', textAlign: "right" }}
                            setparamsHandle={this.setparamsHandle}
                            disabled={disabled}
                        />
                        <div className="statusCheck">
                            <span className={data.mandatory=='1'?"icon-check checked":"icon-check"} style={{cursor:disabled?'not-allowed':''}} onClick={()=>{!disabled&&this.setparamsHandle('mandatory',data.mandatory=='1'?0:1)}}></span>
                            必填
                        </div>
                    </div>
                    <div className="row list">
                        <div className="phone-content-title">下拉列表：</div>
                        <div className="treeBox">
                            <div className='select-content'>
                                <div className="select-title">编辑下拉框</div>
                                <ul className="level1">
                                    {
                                        sourceData.map((v,vIndex) => {
                                            return (
                                                <li className='level1-item' key={vIndex} style={{display:v.status==3?'none':'block'}}>
                                                    <div className="level1-content">
                                                        <span className='expandBox' onClick={()=>{this.expandHandle(vIndex)}}>
                                                            <span className={v.expandFlag?'icon-expand expanded':'icon-expand'}></span>
                                                        </span>
                                                        <span className='level1-name'>{v.name}</span>
                                                        <span className='icon-add' onClick={()=>{this.addLevel2Click(vIndex)}}>
                                                            <span className="iconTip">添加二级选项</span>
                                                        </span>
                                                        <span className="icon-delete" onClick={(e)=>{this.deleteClick(null,vIndex,e)}}>
                                                            <span className="iconTip">删除</span>
                                                        </span>
                                                        <span className='icon-edit' onClick={()=>{this.editLevel1Click(vIndex)}}>
                                                            <span className="iconTip">编辑</span>
                                                        </span>
                                                        {
                                                            v.editFlag&&<IptBox 
                                                                styleClass={"iptBox level1-edit-iptBox"}
                                                                iptValue={level1_value_cache}
                                                                addConfirm={(e)=>{this.editLevel1Confirm(vIndex,e)}}
                                                                textInput={this.level1Input}
                                                            />
                                                        }
                                                    </div>
                                                    <ul className='level2' style={{height:v.expandFlag?(v.cityList.filter(v => v.status!=3).length+Number(v.add_Level2_flag))*24+'px':'0',overflow:v.expandFlag?'visible':'hidden'}}>
                                                        {v.cityList.map((r,rIndex) => {
                                                            return (
                                                                <li className='level2-item' key={rIndex} style={{display:r.status==3?'none':'block'}}>
                                                                    <span className='level2-name'>{r.name}</span>
                                                                    <span className="icon-delete" onClick={(e)=>{this.deleteClick(vIndex,rIndex,e)}}>
                                                                        <span className="iconTip">删除</span>
                                                                    </span>
                                                                    <span className='icon-edit' onClick={()=>{this.editLevel2Click(vIndex,rIndex)}}>
                                                                        <span className="iconTip">编辑</span>
                                                                    </span>
                                                                    {
                                                                        r.editFlag
                                                                        ?<IptBox 
                                                                            styleClass={"iptBox level2-edit-iptBox"}
                                                                            iptValue={level2_value_cache}
                                                                            addConfirm={(e)=>{this.editLevel2Confirm(vIndex,rIndex,e)}}
                                                                            textInput={this.level2Input}
                                                                        />:''
                                                                    }
                                                                </li>
                                                            )
                                                        })}
                                                        {
                                                            v.add_Level2_flag
                                                            ?
                                                            <IptBox 
                                                                styleClass={"iptBox level2-add-iptBox"}
                                                                addConfirm={()=>{this.addLevel2Confirm(vIndex)}}
                                                                textInput={this.level2Input}
                                                            />
                                                            :''
                                                        }
                                                    </ul>
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                                {
                                    add_Level1_flag
                                    ?<IptBox 
                                        styleClass={"iptBox level1-add-iptBox"}
                                        addConfirm={()=>{this.addLevel1Confirm()}}
                                        textInput={this.level1Input}
                                    />
                                    :<div className="addBtn" onClick={this.addLevel1Click}>+ 添加一级选项</div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <ModalBox
                    modalStatus={delete_flag}
                    modalStyle={modalStyle}
                    modalTxt={'确定要删除此项吗？'}
                    confirmTxt={'删除'}
                    closeModalFunc={this.deleteCancel}
                    confirmFunc={this.deleteConfirm}
                    isDelete={true}
                />
            </div>
        )
    }
}

