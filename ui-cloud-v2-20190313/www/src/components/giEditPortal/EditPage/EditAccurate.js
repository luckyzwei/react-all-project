
import React, { Component } from 'react'
import '../../giBuildPortal/accurateModule/Step2/index.css'

import IptLimit from "../../shareComponent/IptLimit";
import AccurateBlock from "../../giBuildPortal/accurateModule/AccurateBlock";
import AccuratePhone from "../../giBuildPortal/accurateModule/AccuratePhone";
import UploadBtn from "../../shareComponent/UploadBtn";
import {LoadingBlue} from '../../shareComponent/UploadBtn/Loading'
import ButtonBox from '../../shareComponent/ButtonBox'

import PageTitle from "../../giBuildPortal/accurateModule/PageTitle";
import PagePhone from "../../giBuildPortal/accurateModule/PagePhone";
import PageRule from "../../giBuildPortal/accurateModule/PageRule";
import PageAgreement from "../../giBuildPortal/accurateModule/PageAgreement";
import PageButton from "../../giBuildPortal/accurateModule/PageButton";
import PageCity from "../../giBuildPortal/accurateModule/PageCity";
import PageDrugstore from "../../giBuildPortal/accurateModule/PageDrugstore";
import PageTime from "../../giBuildPortal/accurateModule/PageTime";
import PageSelfIpt from "../../giBuildPortal/accurateModule/PageSelfIpt";
import PageSelfSelect from "../../giBuildPortal/accurateModule/PageSelfSelect";

import AuthProvider from '../../../funStore/AuthProvider'
import promiseXHR from '../../../funStore/ServerFun'
import {API_PATH} from '../../../constants/OriginName'
import promiseFile from '../../../funStore/UploadXHR'
import {sendEvent} from '../../../funStore/CommonFun'
import flatMap from 'lodash/flatMap'

const uploadMap = {
    '0':'上传图片',
    '1': '上传中',
    '2': '更改背景',
    '3': '重新上传'
}

const EditBoard = (type,template,updateItem,sysTtims,updateSysTtims,disabled,itemType,city_store_tree_data,update_city_store_tree,store_tree_flag,city_tree_flag,disabledKeys) => {
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
            return <PageCity data={data} _ttimId={data.id} updateItem={updateItem} sysTtims={sysTtims} updateSysTtims={updateSysTtims} disabled={disabled} city_store_tree_data={city_store_tree_data} update_city_store_tree={update_city_store_tree} city_tree_flag={city_tree_flag} store_tree_flag={store_tree_flag} disabledKeys={disabledKeys}/>
        case 'STORE':
            // 门店设置
            var data = template.templateItems.find(item => item.code == type)
            return <PageDrugstore data={data} templateItems={template.templateItems} updateItem={updateItem} type={'STORE'} sysTtims={sysTtims} updateSysTtims={updateSysTtims} disabled={disabled} city_store_tree_data={city_store_tree_data} update_city_store_tree={update_city_store_tree} store_tree_flag={store_tree_flag}/>
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
            uploadstate: 0,
            sysTtims:[],
            submiting: false,
            city_store_tree_data:[],
            disabledKeys:[],
            city_tree_data:[],
            store_tree_data:[],
            store_tree_flag: true,
            city_tree_flag: true,
            hasEdit: false
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
        console.log(templateItemsSet)
        let params = this.state.params
        this.setState({
            selectItem: params.template.templateItems.find(v => v.code=='SUBMIT')
        })
    }   
    sortItemHandle=(templateItems)=> {
        // 页面是否已经编辑判断
        let {hasEdit} = this.state
        let {changeWhen} =this.props
        if(!hasEdit){
            changeWhen(true)
        }
        // 模板排序,元素互换位置
        let params = this.state.params
        params.template.templateItems = templateItems.map((v,i)=>({...v,orderSeq:i}))
        this.setState({params,hasEdit:true})
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
        // 页面是否已经编辑判断
        let {hasEdit} = this.state
        let {changeWhen} =this.props
        if(!hasEdit){
            changeWhen(true)
        }
        let params =  this.state.params
        let templateItems = params.template.templateItems.map(v =>{
           return v.templateItemId == item.templateItemId&&v.type==item.type?item:v
        })
        params.template.templateItems = templateItems
        this.setState({params,hasEdit:true})
    }

     // 城市门店树数据更新
     update_city_store_tree = (treeData,code,disabledKeys) => {
        if(code=='store'){
            // 让门店数据只请求一次
            this.setState({
                city_store_tree_data:treeData,
                store_tree_flag: false
            })
        }else if(code=='city'){
            this.setState({
                city_store_tree_data:treeData,
                disabledKeys:disabledKeys,
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
        let {sysTtims} = this.state
        // 页面是否已经编辑判断
        let {hasEdit} = this.state
        let {changeWhen} =this.props
        if(!hasEdit){
            changeWhen(true)
        }
        if(del){
            sysTtims = sysTtims.filter(v => v.templateItemCode!=code)
        }else if(code=='CUSTOM_SELECT'||code=='CITY'){
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
        this.setState({sysTtims,hasEdit:true})
    }

    // 模板编辑
    setparamsHandle = (k,v) => {
        // if(k=='groupCount'&&(v>500||v<=0)) return
        // 页面是否已经编辑判断
        let {hasEdit} = this.state
        let {changeWhen} =this.props
        if(!hasEdit){
            changeWhen(true)
        }
        let params = this.state.params
        if(k=='groupCount'){
            params[k] = params[k]==-1?'1':'-1'
        }else{
            params[k] = v
        }
        this.setState({params,hasEdit:true})
    }

    setTemplateHandle = (k,v) => {
        // 页面是否已经编辑判断
        let {hasEdit} = this.state
        let {changeWhen} =this.props
        if(!hasEdit){
            changeWhen(true)
        }
        let params = this.state.params        
        let template = params.template
        template[k] = v
        params.template = template
        this.setState({params,hasEdit:true})
    }

    // 上传背景图片
    uploadHandle = (e) => {
        // 页面是否已经编辑判断
        let {hasEdit} = this.state
        let {changeWhen} =this.props
        if(!hasEdit){
            changeWhen(true)
        }
        let {params,uploadstate} = this.state
        if(uploadstate == '1') return
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
            this.setState({params,uploadstate:2,hasEdit:true})
            sendEvent('message', {txt: "上传背景图片成功",code: 1000})
        })
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
        let {params,sysTtims,submiting,city_tree_data,store_tree_data,city_tree_flag,store_tree_flag} = this.state
        if(submiting||!this.verifyHandle()) return
        let cityTtim = params.template.templateItems.find(v => v.code=='CITY')
        if(cityTtim&&!city_tree_flag){
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
        if(storeTtim&&!store_tree_flag){
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
            },'put')
        }).then(res => {
            const resData = JSON.parse(res)
            if(resData.resultCode=='100'){
                this.setState({
                    submiting: false
                })
                sendEvent('message', {txt: "更新精准入群页面成功",code: 1000})
                this.props.changeWhen(false)&&this.props.selectType('SELECT')
            }else if(resData.resultCode=='03801400'){
                throw resData.detailDescription
            }else if(resData.resultCode=='03801403'){
                throw resData.detailDescription
            }else if(resData.resultCode=='03801410'){
                throw '模板名称重复'
            }else{
                throw '更新精准入群页面失败'
            }
        }).catch(err => {
            console.log(err)
            this.setState({
                submiting: false
            })
            sendEvent('message', {txt: err?err:"更新精准入群页面失败",code: 1004})
        })
    }
    verifyHandle=()=>{
        const {params,sysTtims,city_tree_data,store_tree_data,city_tree_flag,store_tree_flag} = this.state
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
        // if(PHARMACYindex!='-1'&&cityIndex!='-1'&&PHARMACYindex<cityIndex){
        //     sendEvent('message', {txt: "城市选项需在药店选项之前",code: 1004})
        //     return false
        // }
        // if(HOSPITALindex!='-1'&&cityIndex!='-1'&&HOSPITALindex<cityIndex){
        //     sendEvent('message', {txt: "城市选项需在医院选项之前",code: 1004})
        //     return false
        // }
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
        if(cityIndex==-1&&STOREindex==-1&&EXPECTED_DATE_index==-1&&CUSTOM_DATE_index==-1&&CLASS_index==-1&&CHANNEL_index==-1&&PHONE_index==-1&&RECOMMENDATION_CODE_index==-1&&CUSTOM_INPUT_index==-1&&CUSTOM_SELECT_index==-1){
            sendEvent('message', {txt: "请至少选择一个入群条件",code: 1004})
            return false
        }
        if(cityIndex!=-1&&!city_tree_flag&&city_tree_data.length==0){
            sendEvent('message', {txt: "请选择城市",code: 1004})
            return false
        }
        if(STOREindex!=-1&&!store_tree_flag){
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
    render() {
        let {params,selectItem,uploadstate,sysTtims,submiting,city_store_tree_data,store_tree_flag,city_tree_flag,disabledKeys} = this.state
        let {selectType} = this.props;
        let disabled = false
        let itemDisabled = true
        // console.log(params)
        // console.log(sysTtims)
        return (
            <div className='gi-accurate-step2'>
            <div className="inner">
                <AccuratePhone
                    params = {params}
                    selectItem = {selectItem}
                    sortItemHandle = {this.sortItemHandle}
                    selectEditItem = {this.selectEditItem}
                />
                <div className="gi-accurate-step2-right" style={{marginTop:'90px'}}>
                    <div className="gi-accurate-step2-right-row" style={{alignItems:'center'}}>
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
                            <span className={params.groupCount=='-1'?"icon-check checked":"icon-check"} onClick={()=>{this.setparamsHandle('groupCount')}}></span>
                            允许用户重复入群
                        </div>
                    </div>
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
                            params={params}
                            initTemplateItem={this.initTemplateItem}
                            disabled={itemDisabled}
                            updateSysTtims={this.updateSysTtims}
                        />
                    </div>
                    <div className="gi-accurate-step2-right-row">
                        <div className="gi-accurate-step2-right-row-lable translateY">页面背景：</div>
                        <div className="gi-accurate-step2-right-row-upload-box">
                            <div className={false ? "upload-box active" : "upload-box"}>
                                {uploadstate=='1'?<LoadingBlue/>: <span className='icon'></span>}
                                {uploadMap[uploadstate]}
                                <input type='text' style={{cursor:disabled?'not-allowed':''}} disabled={disabled} className="fileIpt" onClick={this.uploadHandle}/>
                            </div>
                            <div className="upload-txt">建议尺寸750*1334px且小于1MB，仅支持 JPG、JPEG、PNG 格式</div>
                        </div>
                    </div>
                    <div className="gi-accurate-step2-right-row">
                        {
                            // 编辑模块
                            EditBoard(selectItem.code,params.template,this.updateItem,sysTtims,this.updateSysTtims,disabled,selectItem.type,city_store_tree_data,this.update_city_store_tree,store_tree_flag,city_tree_flag,disabledKeys)
                        }
                    </div>
                    <div className="gi-accurate-step2-right-row btnBox">
                        <ButtonBox
                            btnTxt={"返回"}
                            isCancel={true}
                            btnFunc={() => {
                               selectType('SELECT')
                            }}
                        />
                         <UploadBtn 
                            loading={submiting}
                            text={"保存"}
                            loadingText={"保存中"}
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