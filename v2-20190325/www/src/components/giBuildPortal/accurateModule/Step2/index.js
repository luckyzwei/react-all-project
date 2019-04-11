/**
 * 创建时间:2018-08-29 14:44:39
 * 作者：sufei  Xerath
 * 邮箱：fei.su@gemii.cc
 * 版本号：1.0
 * @版权所有
 **/
import React, { Component } from 'react'
import './index.css'
import flatMap from 'lodash/flatMap'

import SelectBox from "../../../shareComponent/SelectBox";
import IptLimit from "../../../shareComponent/IptLimit";
import Radio from "../../../shareComponent/Radio";
import AccurateBlock from "../AccurateBlock";
import AccuratePhone from "../AccuratePhone";
import UploadBtn from "../../../shareComponent/UploadBtn";
import {LoadingBlue} from '../../../shareComponent/UploadBtn/Loading'
import ButtonBox from '../../../shareComponent/ButtonBox'

import PageTitle from "../PageTitle";
import PagePhone from "../PagePhone";
import PageHospital from "../PageHospital";
import PageRule from "../PageRule";
import PageAgreement from "../PageAgreement";
import PageButton from "../PageButton";
import PageCity from "../PageCity";
import PageDrugstore from "../PageDrugstore";
import PageTime from "../PageTime";
import PageSelfIpt from "../PageSelfIpt";
import PageSelfSelect from "../PageSelfSelect";

import AuthProvider from '../../../../funStore/AuthProvider'
import promiseXHR from '../../../../funStore/ServerFun'
import {API_PATH} from '../../../../constants/OriginName'
import promiseFile from '../../../../funStore/UploadXHR'
import {sendEvent} from '../../../../funStore/CommonFun'

/* 
模板元素
{
    "css": "string",
    "editable": false,
    "entireValue": "string",
    "id": "string",
    "label": "string",
    "mandatory": "string",
    "maxValue": "string",
    "minValue": "string",
    "orderSeq": "string",
    "reliedId": "string",
    "rwmType": "string",
    "status": "string",
    "visible": false
} */

/* 
"sysTtims":[
    {
        "sysTtims":[{
                "cityList":[],
                "code":"string",
                "name":"string",
                "status":"string",
        }],
        "templateItemCode":"string",
        "templateItemId":"string"
    }
]
*/
// const paramsInit = {
//     "backgroundPicUrl": null,//背景图
//     "id": null,// 模板库的id
//     "name": "",// 模板库name
//     "groupCount": 1,
//     "template": {
//         "code": "H5_JG_RULE",
//         "id": null,
//         "name": "",//模板库name
//         "templateItems": [],//模板元素
//         "type": 0,
//         "status": 1 //状态 1--正常 2--停用 3--删除 默认值为1 ,
//     },
//     "type": 5
// }


// viewType : ADD 新增 | 
// 

const uploadMap = {
    '0':'上传图片',
    '1': '上传中',
    '2': '更改背景',
    '3': '重新上传'
}

const EditBoard = (type,template,updateItem,sysTtims,updateSysTtims,disabled,itemType,city_store_tree_data,update_city_store_tree,store_tree_flag,city_tree_flag) => {
	switch (type) {
        case 'SUBMIT':
            // 提交按钮 
            var data = template.templateItems.find(item => item.code == type)
            return <PageButton data={data} updateItem={updateItem} disabled={disabled}/>
        case 'H5_FORM_TITLE':
            // 标题设置
            var data = template.templateItems.find(item => item.code == type)
            return <PageTitle data={data} updateItem={updateItem} disabled={disabled}/>
        case 'TERMS':
            // 协议条款
            var data = template.templateItems.find(item => item.code == type)
            return <PageAgreement data={data} updateItem={updateItem} disabled={disabled}/>
        case 'DESCRIPTION':
            // 活动规则
            var data = template.templateItems.find(item => item.code == type)
            return <PageRule data={data} updateItem={updateItem} disabled={disabled}/>
        case 'EXPECTED_DATE':
            // 日期设置
            var data = template.templateItems.find(item => item.code == type)
            return <PageTime data={data} updateItem={updateItem} disabled={disabled}/>
        case 'CUSTOM_DATE':
            // 日期设置
            var data = template.templateItems.find(item => item.code == type)
            return <PageTime data={data} updateItem={updateItem} disabled={disabled}/>
        case 'CITY':
            // 城市设置
            var data = template.templateItems.find(item => item.code == type)
            return <PageCity data={data} _ttimId={data.id} updateItem={updateItem} sysTtims={sysTtims} updateSysTtims={updateSysTtims} disabled={disabled} city_store_tree_data={city_store_tree_data} update_city_store_tree={update_city_store_tree} city_tree_flag={city_tree_flag} store_tree_flag={store_tree_flag}/>
        // case 'PHARMACY':
        //     // 药店设置
        //     var data = template.templateItems.find(item => item.code == type)
        //     return <PageDrugstore data={data} updateItem={updateItem} type={'PHARMACY'} sysTtims={sysTtims} updateSysTtims={updateSysTtims} disabled={disabled}/>
        // case 'HOSPITAL':
        //     // 医院设置
        //     var data = template.templateItems.find(item => item.code == type)
        //     return <PageDrugstore data={data} updateItem={updateItem} type={'HOSPITAL'} sysTtims={sysTtims} updateSysTtims={updateSysTtims} disabled={disabled}/>
        case 'STORE':
            // 门店设置
            var data = template.templateItems.find(item => item.code == type)
            return <PageDrugstore data={data} templateItems={template.templateItems} updateItem={updateItem} type={'STORE'} sysTtims={sysTtims} updateSysTtims={updateSysTtims} disabled={disabled} city_store_tree_data={city_store_tree_data} update_city_store_tree={update_city_store_tree} store_tree_flag={store_tree_flag}/>
        case 'CLASS':
            // 班级设置 自定义下拉框
            var data = template.templateItems.find(item => item.code == type)
            return <PageSelfSelect data={data} updateItem={updateItem} sysTtims={sysTtims} updateSysTtims={updateSysTtims} disabled={disabled}/>
        case 'CHANNEL':
            // 渠道设置 自定义下拉框
            var data = template.templateItems.find(item => item.code == type)
            return <PageSelfSelect data={data} updateItem={updateItem} sysTtims={sysTtims} updateSysTtims={updateSysTtims} disabled={disabled}/>
        case 'PHONE':
            // 手机号码
            var data = template.templateItems.find(item => item.code == type)
            return <PagePhone  data={data} updateItem={updateItem} disabled={disabled}/>
        case 'RECOMMENDATION_CODE':
            // 推荐设置 自定义输入框
            var data = template.templateItems.find(item => item.code == type)
            return <PageSelfIpt data={data} updateItem={updateItem} disabled={disabled}/>
        case 'CUSTOM_INPUT':
            // 自定义
            var data = template.templateItems.find(item => item.code == type&&item.type==itemType)
            return <PageSelfIpt data={data} updateItem={updateItem} disabled={disabled}/>
        case 'CUSTOM_SELECT':
            var data = template.templateItems.find(item => item.code == type&&item.type==itemType)
            return <PageSelfSelect data={data} updateItem={updateItem} sysTtims={sysTtims} updateSysTtims={updateSysTtims} disabled={disabled}/>
        }
}

export default class Step2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            params: props.templateData,
            selectItem: {},
            templateStore: [],
            storeName: [],
            storeOption: [],
            uploadstate: 0,
            sysTtims:[],
            submiting: false,
            city_store_tree_data:[],
            city_tree_data:[],
            store_tree_data:[],
            city_tree_flag: true,
            store_tree_flag: true,
        }
        this.submitPageParams = this.submitPageParams.bind(this);
    }
    componentDidMount(){
        let {city_store_tree_data} = this.state
        const {templateData} = this.props
        // sysTtims数据初始化 包括城市、门店、自定义下拉框
        let CUSTOM_SELECT_templateItem = templateData.template.templateItems.find(v => v.code=='CUSTOM_SELECT')
        if(CUSTOM_SELECT_templateItem){
            // 自定义下拉框数据
            let templateItemId = CUSTOM_SELECT_templateItem.id
            const url = `${API_PATH}/basis-api/authsec/tenant/template/customregion/tree?templateItemMapCustomRegionId=${templateItemId}&customType=CUSTOM_SELECT`
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
                    this.updateSysTtims({
                        "sysTtims": sourceData,
                        "templateItemCode":CUSTOM_SELECT_templateItem.code,
                        "templateItemId":CUSTOM_SELECT_templateItem.templateItemId
                    },CUSTOM_SELECT_templateItem.code,CUSTOM_SELECT_templateItem.templateItemId)
                }
            })
        }
        let CITY_templateItem = templateData.template.templateItems.find(v => v.code=='CITY')
        if(CITY_templateItem){
            // 城市数据
            const _ttimId  = CITY_templateItem.id
            const url = `${API_PATH}/basis-api/authsec/region/regionTtims?_ttimId=${_ttimId}` 
            AuthProvider.getAccessToken()
            .then((resolve,reject)=>{
                return promiseXHR(url,{type:'Bearer',value:resolve},null,'get')
            }).then(res => {
                let resData = JSON.parse(res)
                if(resData.resultCode=='100'){
                    let cityList = resData.resultContent.map(p => {return (
                        {
                            ...p,
                            key: p.regionId,
                            title: p.displayName,
                            children: !p.cityList?[]:p.cityList.map(city => {
                                return {
                                    ...city,
                                    key: city.regionId,
                                    title: city.displayName,
                                    children: !city.cityList?[]:city.cityList.map(county => {
                                        return {
                                            ...county,
                                            key: county.regionId,
                                            title: county.displayName
                                        }
                                    })
                                }
                            })
                        }
                    )})
                    let flatCityList = flatMap(cityList,(v1)=>{
                        return v1.cityList?[v1].concat(v1.cityList):[v1]
                    })
                    // 默认值处理 数据中带有
                    let checkedKeys = flatCityList.filter(v => v.selected!=0&&v.selected!=2).map(v => v.regionId) //获取默认值
                    city_store_tree_data.forEach(f => {
                        let fPosition = cityList.findIndex(v => v.id==f.id)
                        f.cityList.forEach(s => {
                            let sPosition = cityList[fPosition].cityList.findIndex(v => v.id==s.id)
                            cityList[fPosition].cityList[sPosition].cityList = s.cityList
                        })
                    })
                    this.update_city_store_tree(cityList,'city',checkedKeys)
                    getStoreData(cityList)
                }
            })
        }
        const getStoreData = (city_store_tree_data) => {
            let STORE_templateItem = templateData.template.templateItems.find(v => v.code=='STORE')
            if(STORE_templateItem){
                // 门店数据
                AuthProvider.getAccessToken()
                .then((resolve, reject)=>{
                    let templateItemMapCityId = CITY_templateItem.id
                    const url=`${API_PATH}/basis-api/authsec/tenant/template/customregion/tree?templateItemMapCustomRegionId=${STORE_templateItem.id}&templateItemMapCityId=${templateItemMapCityId}&customType=STORE`
                    return promiseXHR(url,{type:'Bearer',value:resolve},null,'GET')
                }).then(res=>{
                    const data=JSON.parse(res);
                    if(data.resultCode=='100'){
                        let storeTree = city_store_tree_data.map(level1 => ({
                            ...level1,
                            code:STORE_templateItem.code,
                            expandFlag: false,
                            cityList: level1.cityList.map(level2 =>({
                                ...level2,
                                code:STORE_templateItem.code,
                                expandFlag: false,
                                add_Level3_flag: false,
                            }))
                        }))
                        // 合并门店数据
                        data.resultContent.forEach((f,fIndex)=>{
                            let fPosition = storeTree.findIndex(v => v.id==f.id)
                            if(fPosition==-1){
                                storeTree.push({
                                    ...f,
                                    selected:1,
                                    cityList: f.cityList.map(v => ({
                                        ...v,
                                        selected:1
                                    }))
                                })
                            }else{
                                f.cityList.forEach((s,sIndex)=>{
                                    let sPosition = storeTree[fPosition].cityList.findIndex(v => v.id==s.id)
                                    if(sPosition==-1){
                                        storeTree[fPosition].cityList.push({...s,selected:1})
                                    }else{
                                        s.cityList.forEach((t,tIndex)=>{
                                            let tPosition = storeTree[fPosition].cityList[sPosition].cityList.findIndex(v => v.id==t.id)
                                            if(tPosition==-1){
                                                storeTree[fPosition].cityList[sPosition].cityList.push(Object.assign({},t,{editFlag: false,status:1}))
                                            }
                                        })
                                    }
                                })
                            }
                        })
                        this.update_city_store_tree(storeTree,'store')
                    }
                }).catch(err => {
                    console.log(err,'PageDrugstore')
                })
            }
        }

    }
    /* 模板元素选择处理函数 */
    initTemplateItem = (templateItemsSet) =>{
        // 模板初始化设置 初始设置 活动说明，标题，提交，协议，城市，时间，渠道，推荐码
        let params = this.state.params
        let {viewType} = this.props
        if(!(params.id&&(viewType=='ADD'||viewType=='EDIT'))){
            // console.log(params)
            let initTemplateItem = templateItemsSet.filter(v => {
                return v.selected==true
            }).map((v,i) => {
                let newV = {
                    "templateItemId":v.id,
                    "code":v.code,
                    "css": v.tip,
                    "editable": true,
                    "entireValue": v.entireValue,
                    "label": v.label,
                    "mandatory": 0,
                    "maxValue": null,
                    "minValue": null,
                    "orderSeq": i,
                    "reliedId": null,
                    "rwmType": 2,
                    "status": v.status,
                    "visible":true,
                    "type": v.type,
                    "defaultValue":null
                }
                if(v.code=='EXPECTED_DATE'||v.code=='CUSTOM_DATE'){
                    newV.myTimelimit = 0
                }
                if(v.type==13||v.type==14||v.type==7||v.type==15){
                    newV['css'] = v.tip
                }else {
                    newV['mandatory'] = 1
                }
                return newV
            })
            params.template.templateItems = initTemplateItem
        }
        this.setState({
            params,
            selectItem: params.template.templateItems.find(v => v.code=='SUBMIT')
        },()=>{
            //页面初始化完成后加载回显数据
            this.props.taskId&&this.getTemplateDataByTaskId()
            // viewType=='EDIT'&&this.requestTemplateStore()
        })
    }   
    selectTemplateItem = (item) => {
        // 选择模板或取消模板,同时更新顺序
        let {params,sysTtims} = this.state
        let templateItems = params.template.templateItems
        if(item.selected){
            templateItems = templateItems.filter(v => v.code!=item.code||v.type!=item.type)
        }else{
            let newV = {
                "templateItemId":item.id,
                "code":item.code,
                "css": item.tip,
                "editable": true,
                "entireValue": item.entireValue,
                "label": item.label,
                "mandatory": 0,
                "maxValue": null,
                "minValue": null,
                "orderSeq": templateItems.length,
                "reliedId": null,
                "rwmType": 2,
                "status": item.status,
                "visible":true,
                "type": item.type,
                "defaultValue":null
            }
            if(item.code=='EXPECTED_DATE'||item.code=='CUSTOM_DATE'){
                newV.myTimelimit = 0
            }
            if(item.type==13||item.type==14||item.type==7||item.type==15){
				newV['css'] = item.tip
			}else {
				newV['mandatory'] = 1
            }
            templateItems.push(newV)
        }
        params.template.templateItems = templateItems.map((v,i)=>{
            return {
                ...v,
                orderSeq: i
            }
        })
        // if(item.selected&&(item.code=='CLASS'||item.code=='CHANNEL'||item.code=='CUSTOM_SELECT')){
        if(item.selected){
            sysTtims = sysTtims.filter(v => v.templateItemCode!=item.code)
        }
        this.setState({
            params,
            selectItem: {},
            sysTtims
        })
    }
    sortItemHandle=(templateItems)=> {
        // 模板排序,元素互换位置
        let params = this.state.params
        params.template.templateItems = templateItems.map((v,i)=>({...v,orderSeq:i}))
        this.setState({params})
    }

    // 模板元素选择编辑
    selectEditItem = (item) => {
        // console.log(item)
        this.setState({
            selectItem: item
        })
    }

    // 模板元素编辑
    updateItem = (item) => {
        // console.log(item)
        let params =  this.state.params
        let templateItems = params.template.templateItems.map(v =>{
           return v.templateItemId == item.templateItemId&&v.type==item.type?item:v
        })
        params.template.templateItems = templateItems
        this.setState({params})
    }

    // 城市门店树数据更新
    update_city_store_tree = (treeData,code) => {
        if(code=='store'){
            // 让门店数据只请求一次
            this.setState({
                city_store_tree_data:treeData,
                store_tree_flag: false
            })
        }else if(code=='city'){
            this.setState({
                city_store_tree_data:treeData,
                city_tree_flag: false
            })
        }else{
            this.setState({
                city_store_tree_data:treeData
            })
        }
    }

    // 自定义数据更新
    updateSysTtims = (selects,code,id,del) => {
        // 城市门店数据合并，提交时处理！
        console.log(selects,code,id)
        let {sysTtims} = this.state
        if(del){
            sysTtims = sysTtims.filter(v => v.templateItemCode!=code)
        }else if(code=='CUSTOM_SELECT'||code=='CITY'||code=="STORE"){
            let CUSTOM_SELECT_index =  sysTtims.findIndex(v => v.templateItemCode==code)
            if(CUSTOM_SELECT_index==-1){
                sysTtims.push(selects)
            }else{
                sysTtims[CUSTOM_SELECT_index] = selects
            }
        }else{
            // 兼容老的
            if(sysTtims.find(v => v.templateItemCode==code)){
                sysTtims = sysTtims.map(v => {
                    return v.templateItemCode==code?{
                        ...v,
                        sysTtims:selects.map(v => ({
                            id: null,
                            status: 1,
                            sysId: v
                        }))
                    }:v
                })
            }else{
                sysTtims.push({
                    sysTtims:  selects.map(v => ({
                        id: null,
                        status: 1,
                        sysId: v
                    })),
                    templateItemCode: code,
                    templateItemId: id
                })
            }
        }
        this.setState({sysTtims})
    }

    // 模板编辑
    setparamsHandle = (k,v) => {
        // if(k=='groupCount'&&(v>500||v<=0)) return
        let params = this.state.params
        if(k=='groupCount'){
            params[k] = params[k]==-1?'1':'-1'
        }else{
            params[k] = v
        }
        this.setState({params})
    }

    setTemplateHandle = (k,v) => {
        let params = this.state.params        
        // if(k=='status'&&params.id){
        //     // 编辑模式下启用禁用模板
        //     this.startHandle(v)
        // }else{
        let template = params.template
        template[k] = v
        params.template = template
        this.setState({params})
        // }
        
    }
    // 上传背景图片
    uploadHandle = (e) => {
        let {params,uploadstate} = this.state
        let {taskId} = this.props
        if(uploadstate == '1'||taskId) return
        let fileContainer = document.createElement("input")
        fileContainer.type = 'file'
        fileContainer.onchange = (e) => {
          this.uploadEvent(e.target.files[0],e.target.value)
        }
        fileContainer.click()
    }
    uploadEvent = (file,value) => {
        const index = value.lastIndexOf('.')
        const finalName = value.substr(index+1)
        const format = ["jpg","png","jpeg"]
        const size = file.size
        const formData = new FormData()
        formData.append('file',file)
        if(size>4194304){
            // 图片格式错误或大小超过限制
            this.setState({uploadstate:3})
            sendEvent('message', {txt: "上传背景图片大小不能超过1MB",code: 1004})
            return
        }
        if(!format.includes(finalName.toLowerCase())){
            this.setState({uploadstate:3})
            sendEvent('message', {txt: "上传背景图片格式错误",code: 1004})
            return
        }
        this.successHandle(formData).then(res => {
            let params = this.state.params
            params.backgroundPicUrl = res.url
            this.setState({params,uploadstate:2})
            sendEvent('message', {txt: "上传背景图片成功",code: 1000})
        })
        // this.getImageSize(file, (w,h,data)=>{
        //     if(w==750&&h==1334){
        //         this.successHandle(formData).then(res => {
        //             let params = this.state.params
        //             params.backgroundPicUrl = res.url
        //             this.setState({params,uploadstate:2})
        //             sendEvent('message', {txt: "上传背景图片成功",code: 1000})
        //         })
        //     }else{
        //         // 图片大小错误
        //         this.setState({uploadstate:3})
        //         sendEvent('message', {txt: "上传背景图片尺寸仅支持750*1334px",code: 1004})
        //         return
        //     }
        // })
    }
    successHandle=(formData)=>{
        const self = this
        this.setState({uploadstate: 1})  
        // const url = API_PATH+'/gridfs-api/noauth/s3-media'
        const url = API_PATH+'/gridfs-api/noauth/media'
          return promiseFile(url,formData)
          .then(res => {
            return res.resultContent
          })
    }
    getImageSize = (file,callback) => {
        let reader=new FileReader()
        reader.onload=function (e) {
            let data=e.target.result//读取的结果
            let image=new Image()
            image.onload=() => {
                let width=image.width,
                    height=image.height;
                callback(width,height,data)
            };
            image.src=data
        };
        reader.readAsDataURL(file);
    }

    submitPageParams() {
        let {params,sysTtims,submiting,city_tree_data,store_tree_data} = this.state
        if(submiting||!this.verifyHandle()) return
        let cityTtim = params.template.templateItems.find(v => v.code=='CITY')
        if(cityTtim){
            let sysTtims_city = {
                "sysTtims":city_tree_data,
                "templateItemCode":cityTtim.code,
                "templateItemId":cityTtim.templateItemId
            }
            let sysTtims_city_index = sysTtims.findIndex(v => v.templateItemCode=='CITY')
            if(sysTtims_city_index==-1){
                sysTtims.push(sysTtims_city)
            }else{
                sysTtims[sysTtims_city_index] = sysTtims_city
            }
        }
        let storeTtim = params.template.templateItems.find(v => v.code=='STORE')
        if(storeTtim){
            let sysTtims_store = {
                "sysTtims":store_tree_data,
                "templateItemCode":storeTtim.code,
                "templateItemId":storeTtim.templateItemId
            }
            let sysTtims_store_index = sysTtims.findIndex(v => v.templateItemCode=='STORE')
            if(sysTtims_store_index==-1){
                sysTtims.push(sysTtims_store)
            }else{
                sysTtims[sysTtims_store_index] = sysTtims_store
            }
        }
        this.setState({
            submiting: true
        })
        const url = `${API_PATH}/groupadmin-api/authsec/group/join/template`
        AuthProvider.getAccessToken().then((reslove,reject)=> {
            return promiseXHR(url ,{type:'Bearer',value:reslove},{
                "pageReq": params,
                "sysTtims":sysTtims
            },params.id?'put':'post')
        }).then(res => {
            const resData = JSON.parse(res)
            if(resData.resultCode=='100'){
                this.getTemplateData(resData.resultContent.id)
                sendEvent('message', {txt: "保存模板成功",code: 1000})
            }else if(resData.resultCode=='03801400'){
                throw resData.detailDescription
            }else if(resData.resultCode=='03801403'){
                throw resData.detailDescription
            }else if(resData.resultCode=='03801410'){
                throw '模板名称重复'
            }else{
                throw '创建模板失败'
            }
        }).catch(err => {
            console.log(err)
            this.setState({
                submiting: false
            })
            sendEvent('message', {txt: err?err:"创建模板失败",code: 1004})
        })
    }
    verifyHandle=()=>{
        const {params,sysTtims,city_tree_data,store_tree_data } = this.state
        // console.log(sysTtims)
        if(params.name.trim()===''){
            sendEvent('message', {txt: "请输入入群页面名称",code: 1004})
            return false
        }
        if(params.backgroundPicUrl==null){
            sendEvent('message', {txt: "请上传入群页面背景图片",code: 1004})
            return false
        }
        let cityIndex = params.template.templateItems.findIndex(v => v.code=='CITY')
        let PHARMACYindex = params.template.templateItems.findIndex(v => v.code=='PHARMACY')
        let HOSPITALindex = params.template.templateItems.findIndex(v => v.code=='HOSPITAL')
        let STOREindex = params.template.templateItems.findIndex(v => v.code=='STORE')
        if((PHARMACYindex!='-1'||HOSPITALindex!='-1'||STOREindex!='-1')&&cityIndex=='-1'){
            sendEvent('message', {txt: "请先选择城市",code: 1004})
            return false
        }
        if(PHARMACYindex!='-1'&&cityIndex!='-1'&&PHARMACYindex<cityIndex){
            sendEvent('message', {txt: "城市选项需在药店选项之前",code: 1004})
            return false
        }
        if(HOSPITALindex!='-1'&&cityIndex!='-1'&&HOSPITALindex<cityIndex){
            sendEvent('message', {txt: "城市选项需在医院选项之前",code: 1004})
            return false
        }
        if(STOREindex!='-1'&&cityIndex!='-1'&&STOREindex<cityIndex){
            sendEvent('message', {txt: "城市选项需在门店选项之前",code: 1004})
            return false
        }
        let EXPECTED_DATE_index = params.template.templateItems.findIndex(v => v.code=='EXPECTED_DATE')
        let CUSTOM_DATE_index = params.template.templateItems.findIndex(v => v.code=='CUSTOM_DATE')
        let CLASS_index = params.template.templateItems.findIndex(v => v.code=='CLASS')
        let CHANNEL_index = params.template.templateItems.findIndex(v => v.code=='CHANNEL')
        let PHONE_index = params.template.templateItems.findIndex(v => v.code=='PHONE')
        let RECOMMENDATION_CODE_index = params.template.templateItems.findIndex(v => v.code=='RECOMMENDATION_CODE')
        let CUSTOM_INPUT_index = params.template.templateItems.findIndex(v => v.code=='CUSTOM_INPUT')
        let CUSTOM_SELECT_index = params.template.templateItems.findIndex(v => v.code=='CUSTOM_SELECT')
        if(cityIndex==-1&&PHARMACYindex==-1&&HOSPITALindex==-1&&STOREindex==-1&&EXPECTED_DATE_index==-1&&CUSTOM_DATE_index==-1&&CLASS_index==-1&&CHANNEL_index==-1&&PHONE_index==-1&&RECOMMENDATION_CODE_index==-1&&CUSTOM_INPUT_index==-1&&CUSTOM_SELECT_index==-1){
            sendEvent('message', {txt: "请至少选择一个入群条件",code: 1004})
            return false
        }
        if(cityIndex!=-1&&city_tree_data.length==0){
            sendEvent('message', {txt: "请选择城市",code: 1004})
            return false
        }
        if(STOREindex!=-1){
            let flag
            console.log(store_tree_data)
            store_tree_data.forEach(f => {
                f.cityList.forEach(s => {
                    let storeList = s.cityList.filter(t => t.status==1)
                    if(storeList.length==0){
                        flag = false
                    }
                })
            })
            if(flag === false){
                sendEvent('message', {txt: "存在没有设置门店的城市，请检查门店数据",code: 1004})
                return false
            }
        }
        let selectTtim = sysTtims.find(v => v.templateItemCode=='CUSTOM_SELECT')
        if(CUSTOM_SELECT_index!=-1){
            if(!selectTtim){
                sendEvent('message', {txt: "自定义下拉框数据不能为空",code: 1004})
                return false
            }
            let filterSysTtims = selectTtim.sysTtims.filter(v => v.status!=3)
            filterSysTtims = filterSysTtims.map(v =>({
                ...v,
                cityList: v.cityList.filter(v => v.status!=3)
            }))
            if(filterSysTtims.length==0){
                sendEvent('message', {txt: "自定义下拉框数据不能为空",code: 1004})
                return false
            }
            let filterData = filterSysTtims.filter(v => v.cityList.length>0)
            if(filterData.length>0&&filterData.length<filterSysTtims.length){
                sendEvent('message', {txt: "自定义下拉框数据需为全部1级或全部2级",code: 1004})
                return false
            }
        }

        return true
    }
    buildTemplate = () => {
        let {city_store_tree_data,city_tree_data,store_tree_data} = this.state
        city_tree_data = city_store_tree_data.filter(v => v.selected==1||v.selected==2)
        city_tree_data = city_tree_data.map(v => ({
            ...v,
            children: [],
            code:'CITY',
            cityList: v.cityList.filter(v => v.selected==1).map(r => ({
                ...r,
                code:'CITY',
                cityList: []
            }))
        }))
        store_tree_data = city_store_tree_data.filter(v => v.selected==1||v.selected==2)
        store_tree_data = store_tree_data.map(v => ({
            ...v,
            children: [],
            code:'CITY',
            cityList: v.cityList.filter(v => v.selected==1).map(r => ({
                ...r,
                code:'CITY',
                cityList: r.cityList.map(t => ({
                    ...t,
                    parentId: r.id
                }))
            }))
        }))
        this.setState({
            city_tree_data,
            store_tree_data 
        },this.submitPageParams)
    }
    getTemplateData = (id) => {
        const url = `${API_PATH}/groupadmin-api/authsec/group/join/template/detail?_templateId=${id}`
        AuthProvider.getAccessToken()
        .then((resolve,reject)=>{
            return promiseXHR(url,{type:'Bearer',value:resolve},null,'get')
        }).then(res => {
            const resData = JSON.parse(res)
            if(resData.resultCode==100){
                this.setState({submiting: false})
                this.props.setparamsHandle('templateData',resData.resultContent)
            }else{
                throw '获取模板详情失败'
            }
        }).catch(err => {
            console.log(err)
            this.setState({
                submiting: false
            })
        })
    }
    getTemplateDataByTaskId = () => {
        const {taskId} = this.props
        const url = `${API_PATH}/groupadmin-api/authsec/robothost/task/${taskId}/edit`
        AuthProvider.getAccessToken()
        .then((resolve,reject)=>{
            return promiseXHR(url,{type:'Bearer',value:resolve},null,'get')
        }).then(res => {
            const resData = JSON.parse(res)
            if(resData.resultCode==100){
                this.setState({
                    params:resData.resultContent,
                    selectItem: resData.resultContent.template.templateItems.find(v => v.code=='SUBMIT')
                })
            }else{
                throw '获取模板详情失败'
            }
        }).catch(err => {
            console.log(err)
        })
    }
    render() {
        let {params,selectItem,storeName,storeOption,uploadstate,sysTtims,submiting,city_store_tree_data,store_tree_flag,city_tree_flag} = this.state
        let {taskId,viewType,actions,selectType,modalType} = this.props;
        let disabled = params.id?true:false
        let itemDisabled = taskId?true: false
        // console.log(params)
        // console.log(sysTtims)
        // ********
        return (
            <div className='gi-accurate-step2'>
            <div className="inner">
                <div className="stepTitle" style={{display:viewType=='DETAIL'?'none':'block'}}>
                    <span className='done'>{viewType=='EDIT'?'1.选择入群页面':'1.创建入群页面'}</span>
                    <span className='todo' style={{margin:'0 12px'}}>></span>
                    <span className='todo'>2.新建群</span>
                </div>
                <AccuratePhone
                    params = {params}
                    selectItem = {selectItem}
                    sortItemHandle = {this.sortItemHandle}
                    selectEditItem = {this.selectEditItem}
                />
                <div className="gi-accurate-step2-right">
                    {
                        viewType=='EDIT'?<div className="gi-accurate-step2-right-row">
                            <SelectBox
                                selectLabel={"选择页面："}
                                placeholder={"请选择"}
                                width={516}
                                selectOption={storeName}
                                paramName={'storeName'}
                                paramaValue={storeOption}
                                paramDefault={
                                    storeOption.indexOf(params.id)!=-1?{
                                        name: storeName[storeOption.indexOf(params.id)],
                                        id:storeOption[storeOption.indexOf(params.id)]
                                    }:undefined
                                }
                                widths={{ width: '114px', textAlign: "right" }}
                                setMoreSelectParama={this.setMoreSelectParama}
                                disable={taskId}
                            />
                        </div>
                        :<div className="gi-accurate-step2-right-row" style={{alignItems:'center'}}>
                            <IptLimit
                                widths={{ width: '362px' }}
                                paramName={'name'}
                                placeholder={'请输入页面名称'}
                                label={'页面名称：'}
                                value={params.template.name}
                                length={params.template.name.length}
                                maxLength={16}
                                limitState={true}
                                widthsLa={{ width: '114px', textAlign: "right" }}
                                setparamsHandle={(k,v)=>{this.setTemplateHandle(k,v);this.setparamsHandle(k,v)}}
                                disabled={disabled}
                            />
                            <div className="statusCheck">
                                <span className={params.groupCount=='-1'?"icon-check checked":"icon-check"} style={{cursor:itemDisabled?'not-allowed':''}} onClick={()=>{!itemDisabled&&this.setparamsHandle('groupCount')}}></span>
                                允许用户重复入群
                            </div>
                        </div>
                    }
                    
                    <div className="gi-accurate-step2-right-row">
                        <div className="gi-accurate-step2-right-row-lable">
                            <div className="titleBox">
                                <em className="icon">
                                    <p className="bubble">
                                        *小提示：<br/>
                                        点击左图“模板预览”中的任何功能模块都能及时编辑的哦～
                                    </p>
                                </em>
                                页面模块：
                            </div>
                        </div>
                        <AccurateBlock
                            modalType={modalType}
                            params={params}
                            initTemplateItem={this.initTemplateItem}
                            setparamsHandle={this.selectTemplateItem}
                            sortItemHandle={this.sortItemHandle}
                            disabled={disabled}
                        />
                    </div>
                    <div className="gi-accurate-step2-right-row">
                        <div className="gi-accurate-step2-right-row-lable translateY">页面背景：</div>
                        <div className="gi-accurate-step2-right-row-upload-box">
                            <div className={false ? "upload-box active" : "upload-box"}>
                                {uploadstate=='1'?<LoadingBlue/>: <span className='icon'></span>}
                                {uploadMap[uploadstate]}
                                <input type='text' style={{cursor:itemDisabled?'not-allowed':''}} disabled={itemDisabled} className="fileIpt" onClick={this.uploadHandle}/>
                            </div>
                            <div className="upload-txt">建议尺寸750*1334px且小于1MB，仅支持 JPG、JPEG、PNG 格式</div>
                        </div>
                    </div>
                    <div className="gi-accurate-step2-right-row">
                        {
                            // 编辑模块
                            EditBoard(selectItem.code,params.template,this.updateItem,sysTtims,this.updateSysTtims,itemDisabled,selectItem.type,city_store_tree_data,this.update_city_store_tree,store_tree_flag,city_tree_flag)
                        }
                    </div>
                    <div className="gi-accurate-step2-right-row btnBox">
                        <ButtonBox
                            btnTxt={"返回"}
                            isCancel={true}
                            btnFunc={() => {
                                taskId
                                ?actions.goTo('/v2/GHScope')
                                :selectType('SELECTMODAL')
                            }}
                        />
                         <UploadBtn 
                            loading={submiting}
                            text={"下一步"}
                            loadingText={"下一步"}
                            clickHandle={this.buildTemplate}
                            propsStyle={{
                                width:'108px',
                                height:'36px',
                            }}
                        />
                    </div>
                </div>
                </div>
            </div>
        )
    }
}