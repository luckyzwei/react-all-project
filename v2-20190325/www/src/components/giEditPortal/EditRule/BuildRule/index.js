/**
 * 创建时间:2018-09-01 14:08:18
 * 作者：sufei  Xerath
 * 邮箱：fei.su@gemii.cc
 * 版本号：1.0
 * @版权所有
 **/
import React, { Component } from 'react'
import '../../../giBuildPortal/accurateModule/Step3/index.css'
import ButtonBox from '../../../shareComponent/ButtonBox'
import { API_PATH } from '../../../../constants/OriginName'
import AuthProvider from '../../../../funStore/AuthProvider'
import promiseXHR from '../../../../funStore/ServerFun'
import {sendEvent} from '../../../../funStore/CommonFun'
// import ModalBox from '../../../shareComponent/ModalBox'
import BuildGroup from './BuildGroup'
import BuildRule from './BuildRule'
import _uniq from 'lodash/uniq'
import _uniqBy from 'lodash/uniqBy'
import flatMap from 'lodash/flatMap'

/* const ruleInit = {
    "gmJgRuleItems": [
      {
        "optionCode": "", //templateItemCode
        "optionId": "", //templateItemId
        "optionName": "", //templateItemLabel
        "optionValueType": "",//0--单值 1--区间值 2--散列值 ,
        "values": [
          {
            "displayEndValue": "",
            "displayStartValue": "",
            "displayValue": "",//显示值
            "endValue": "",
            "startValue": "",
            "type": "", //0--单值 1--区间值 2--散列值 ,
            "value": "" //参数值
          }
        ]
      }
    ],
    "name": "",
    "templateId": "",//页面模板id
    "weight": 1
  }
 */


// [
//     {
//         "groupName":"string",
//         "groupRule":{
//             "gmJgRuleItems":[
//                 {
//                     "optionCode":"string",
//                     "optionId":"string",
//                     "optionName":"string",
//                     "optionValueType":"string",
//                     "values":[
//                         {
//                             "displayEndValue":"string",
//                             "displayStartValue":"string",
//                             "displayValue":"string",
//                             "endValue":"string",
//                             "startValue":"string",
//                             "type":"string",
//                             "value":"string"
//                         }
//                     ]
//                 }
//             ],
//             "name":"string",
//             "templateId":"string",
//         }
//     }
// ]

// const mocaHroupRule = [{"groupName":"2","errorFlag":true,"groupRule":{"gmJgRuleItems":[{"optionCode":"CITY","errorFlag":true,"optionId":"8e475f27-fc56-11e8-a26f-000c2974a417","optionName":"城市/地区","optionValueType":0,"values":[{"displayValue":"西安市","errorFlag":true,"value":"ace90791-565d-11e7-834f-00155d000b01","displayEndValue":null,"displayStartValue":null,"endValue":null,"startValue":null,"type":0}],"isMandatory":1,"_id":"afbaaec5-0ac6-4bd0-aa23-70e279a1f3b2","_type":1},{"optionCode":"STORE","errorFlag":true,"optionId":"8e47605a-fc56-11e8-a26f-000c2974a417","optionName":"门店","optionValueType":0,"values":[{"displayEndValue":null,"displayStartValue":null,"displayValue":"西安市","errorFlag":true,"endValue":null,"startValue":null,"type":0,"value":"ace90791-565d-11e7-834f-00155d000b01"},{"displayEndValue":null,"displayStartValue":null,"displayValue":"西安1店","errorFlag":true,"endValue":null,"startValue":null,"type":0,"value":"f9b34a9b-2101-4910-ad51-c5d7d9c4effd"},{"displayEndValue":null,"displayStartValue":null,"displayValue":"西安2店","errorFlag":true,"endValue":null,"startValue":null,"type":0,"value":"d7db11ca-1238-408b-86fd-34af7a191ff6"}],"isMandatory":1,"_id":"aa535b75-8241-45ec-a57d-92d700d04d97","_type":1},{"optionCode":"CUSTOM_SELECT","errorFlag":true,"optionId":"4f692651-fcf2-11e8-a26f-000c2974a417","optionName":"自定义下拉框","optionValueType":0,"values":[{"displayEndValue":null,"displayStartValue":null,"displayValue":"初一","errorFlag":true,"endValue":null,"startValue":null,"type":0,"value":"e253c819-e591-4b9f-91bb-64d23650c7d9"},{"displayEndValue":null,"displayStartValue":null,"displayValue":"1班","errorFlag":true,"endValue":null,"startValue":null,"type":0,"value":"bc77c230-4939-49e5-bd23-30d6fbd9eff9"},{"displayEndValue":null,"displayStartValue":null,"displayValue":"2班","errorFlag":true,"endValue":null,"startValue":null,"type":0,"value":"5026287c-af15-4537-a5a3-6c72a0bee14f"}],"isMandatory":1,"_id":"5a4c0807-bd81-4508-95b0-c1e17c434526","_type":1}],"name":"2","templateId":"a0b7681d-b821-4ab3-96a8-fd16c650c74d"}},{"groupName":"1","errorFlag":true,"groupRule":{"gmJgRuleItems":[{"optionCode":"CITY","errorFlag":true,"optionId":"8e475f27-fc56-11e8-a26f-000c2974a417","optionName":"城市/地区","optionValueType":0,"values":[{"displayValue":"西安市","errorFlag":true,"value":"ace90791-565d-11e7-834f-00155d000b01","displayEndValue":null,"displayStartValue":null,"endValue":null,"startValue":null,"type":0}],"isMandatory":1,"_id":"afbaaec5-0ac6-4bd0-aa23-70e279a1f3b2","_type":1},{"optionCode":"STORE","errorFlag":true,"optionId":"8e47605a-fc56-11e8-a26f-000c2974a417","optionName":"门店","optionValueType":0,"values":[{"displayEndValue":null,"displayStartValue":null,"displayValue":"西安市","errorFlag":true,"endValue":null,"startValue":null,"type":0,"value":"ace90791-565d-11e7-834f-00155d000b01"},{"displayEndValue":null,"displayStartValue":null,"displayValue":"西安1店","errorFlag":true,"endValue":null,"startValue":null,"type":0,"value":"f9b34a9b-2101-4910-ad51-c5d7d9c4effd"},{"displayEndValue":null,"displayStartValue":null,"displayValue":"西安2店","errorFlag":true,"endValue":null,"startValue":null,"type":0,"value":"d7db11ca-1238-408b-86fd-34af7a191ff6"}],"isMandatory":1,"_id":"aa535b75-8241-45ec-a57d-92d700d04d97","_type":1},{"optionCode":"CUSTOM_SELECT","errorFlag":true,"optionId":"4f692651-fcf2-11e8-a26f-000c2974a417","optionName":"自定义下拉框","optionValueType":0,"values":[{"displayEndValue":null,"displayStartValue":null,"displayValue":"初一","endValue":null,"errorFlag":true,"startValue":null,"type":0,"value":"e253c819-e591-4b9f-91bb-64d23650c7d9"},{"displayEndValue":null,"displayStartValue":null,"displayValue":"1班","errorFlag":true,"endValue":null,"startValue":null,"type":0,"value":"bc77c230-4939-49e5-bd23-30d6fbd9eff9"},{"displayEndValue":null,"displayStartValue":null,"displayValue":"2班","errorFlag":true,"endValue":null,"startValue":null,"type":0,"value":"5026287c-af15-4537-a5a3-6c72a0bee14f"}],"isMandatory":1,"_id":"5a4c0807-bd81-4508-95b0-c1e17c434526","_type":1}],"name":"1","templateId":"a0b7681d-b821-4ab3-96a8-fd16c650c74d"}}]

export default class InGroupRule extends Component {
    constructor(props) {
        super(props);
        let ruleTemp = {
            "groupName":"",
            "groupRule":{
                "gmJgRuleItems":[
                    {
                        "optionCode":"",
                        "optionId":"",
                        "optionName":"",
                        "optionValueType":"",
                        "values":[
                            {
                                "displayEndValue":"",
                                "displayStartValue":"",
                                "displayValue":"",
                                "endValue":"",
                                "startValue":"",
                                "type":"",
                                "value":""
                            }
                        ]
                    }
                ],
                "name":"",
                "templateId":props.templateData.id,
            },
            "selected":0,//1：选中 0：未选中
            "editFlag":0
        }
        this.state = {
            submiting: false,
            ruleData: props.cacheRuleData,
            ruleTemp: JSON.stringify(ruleTemp),
            existGroup: [],
            cancelFlag: false,
            dataCache: {},
        }
    }
    componentWillMount(){
        const city_ttim = this.props.templateData.template.templateItems.find(v => v.code=='CITY')
        const store_ttim = this.props.templateData.template.templateItems.find(v => v.code=='STORE')
                
        const initCityList = (url,filterOption) => {
            AuthProvider.getAccessToken()
            .then((resolve,reject)=>{
                return promiseXHR(url,{type:'Bearer',value:resolve},null,'get')
            }).then(res => {
                const resData = JSON.parse(res)
                console.log(resData)
                if(resData.resultCode==100){
                    let dataList = resData.resultContent.filter(v => filterOption=='CITY'?v.selected!=0:true).map(p => {return (
                        {
                            ...p,
                            key: p.regionId+'|'+p.displayName,
                            title: p.displayName,
                            children: !p.cityList?[]:p.cityList.filter(v => filterOption=='CITY'?v.selected:true).map(city => {
                                return {
                                    ...city,
                                    key: city.regionId+'|'+city.displayName,
                                    title: city.displayName,
                                    children: !city.cityList?[]:city.cityList.map(county => {
                                        return {
                                            ...county,
                                            key: county.regionId+'|'+county.displayName,
                                            title: county.displayName
                                        }
                                    })
                                }
                            })
                        }
                    )})
                    let flatCityList = flatMap(dataList,(v1)=>{
                        return v1.children?[v1].concat(flatMap(v1.children,(v2)=>{
                            return v2.children?[v2].concat(v2.children):[v2]
                        })
                            ):[v1]
                    }).map(v =>({
                        ...v,
                        regionId: v.regionId+'|'+v.displayName
                    }))
                    this.dataCacheHandle(filterOption,{dataList,flatCityList})
                }
            }).catch(err => {
                console.log(err)
            })
        }
        if(city_ttim){
            let city_url = `${API_PATH}/basis-api/authsec/region/regionTtims?_ttimId=${city_ttim.id}`
            initCityList(city_url,city_ttim.code)
        }
        if(store_ttim){
            let store_url = `${API_PATH}/basis-api/authsec/tenant/template/customregion/tree?templateItemMapCustomRegionId=${store_ttim.id}&templateItemMapCityId=${city_ttim.id}&customType=STORE`
            initCityList(store_url,store_ttim.code)
        }
    }
    componentDidMount() {
        // map 参数值
        let {templateData,viewType} = this.props
        // templateData = {"id":"39563eb8-05bc-4d78-bbd6-6758e1e1226b","code":"CHENG_SHI_MEN_DIAN_GUI_ZE_6","name":"城市门店规则6","groupCount":"1","type":5,"status":1,"backgroundPicUrl":"http://saas-1252311027.cossh.myqcloud.com/cloud/images/bg/phongbg.png","creatorId":"7a5fe1bd-b7fe-4cbc-9f41-5fc9ebb46af6","tenantId":"203c104e-b1a4-4075-b5ae-80aef9623c0d","template":{"id":"ef156932-0314-417c-9143-09400d0b7c43","code":"H5_JG_RULE","name":"城市门店规则6","type":0,"tiCategoryId":"4f6925eb-fcf2-11e8-a26f-000c2974a417","status":3,"tenantId":"203c104e-b1a4-4075-b5ae-80aef9623c0d","creatorId":"7a5fe1bd-b7fe-4cbc-9f41-5fc9ebb46af6","templateItems":[{"id":"0d6ebddf-0cda-4b3c-b653-912fe5a61f38","code":"CITY","name":"城市/地区","templateId":"ef156932-0314-417c-9143-09400d0b7c43","templateItemId":"8e475f27-fc56-11e8-a26f-000c2974a417","label":"城市/地区","type":1,"rwmType":"2","status":1,"placeholderTip":"请选择城市/地区","valueSource":"/basis-api/authsec/regionTtims/region?_templateId={_templateId}","valueDomain":"/basis-api/authsec/region/regionTtims?_ttimId={_ttimId}","tip":"不可为空","orderSeq":1,"mandatory":1,"visible":true,"editable":true,"css":"不可为空"},{"id":"c1f60d44-5cb9-4e37-9c7f-aa4ea8e55f14","code":"DESCRIPTION","name":"活动说明","templateId":"ef156932-0314-417c-9143-09400d0b7c43","templateItemId":"8e475da0-fc56-11e8-a26f-000c2974a417","label":"活动说明","type":15,"rwmType":"2","status":1,"placeholderTip":"请输入显示活动说明","tip":"显示活动说明不能为空","orderSeq":2,"mandatory":0,"visible":true,"editable":true,"css":"显示活动说明不能为空"},{"id":"4ad6f99e-4bad-4e50-b54c-86e9cf0c8fea","code":"H5_FORM_TITLE","name":"标题","templateId":"ef156932-0314-417c-9143-09400d0b7c43","templateItemId":"8e475cf1-fc56-11e8-a26f-000c2974a417","label":"城市门店规则6","type":14,"rwmType":"2","status":1,"tip":"{fontSize: '23px',color: 'rgb(255,255,255)',opacity: 1}","orderSeq":3,"mandatory":0,"visible":true,"editable":true,"css":"{fontSize: '23px',color: 'rgb(255,255,255)',opacity: 1}"},{"id":"7fd19c55-5490-427d-a66c-e0893451956d","code":"SUBMIT","name":"提交","templateId":"ef156932-0314-417c-9143-09400d0b7c43","templateItemId":"8e475def-fc56-11e8-a26f-000c2974a417","label":"提交入群","type":13,"rwmType":"2","status":1,"tip":"{fontSize: '18px',backgroundColor: '#85D8AA',opacity: 1}","orderSeq":4,"mandatory":0,"visible":true,"editable":true,"css":"{fontSize: '18px',backgroundColor: '#85D8AA',opacity: 1}"},{"id":"02acb0c3-a3b0-4541-9840-6affc90ac72c","code":"TERMS","name":"协议条款","templateId":"ef156932-0314-417c-9143-09400d0b7c43","templateItemId":"8e475fec-fc56-11e8-a26f-000c2974a417","label":"我同意并接受栗子云用户手册","type":7,"rwmType":"2","status":1,"tip":"{fontSize:'12px'}","orderSeq":5,"mandatory":0,"visible":true,"editable":true,"css":"{fontSize:'12px'}"},{"id":"494e29bd-ac66-4af4-9637-76238cabeb3a","code":"STORE","name":"门店","templateId":"ef156932-0314-417c-9143-09400d0b7c43","templateItemId":"8e47605a-fc56-11e8-a26f-000c2974a417","label":"门店","type":1,"rwmType":"2","status":1,"placeholderTip":"请输入门店","valueSource":"/basis-api/authsec/tenant/template/city/customregions?cityId={cityId}&customType={customType}&templateItemMapCustomRegionId={ttimId}","valueDomain":"/basis-api/authsec/tenant/template/city/customregions?cityId={cityId}&customType={customType}&templateItemMapCustomRegionId={ttimId}","tip":"不可为空","orderSeq":6,"mandatory":1,"visible":true,"editable":true,"css":"不可为空"},{"id":"04e8ac1d-2832-47c6-9ddb-e8103c8c79fd","code":"CUSTOM_SELECT","name":"自定义下拉框","templateId":"ef156932-0314-417c-9143-09400d0b7c43","templateItemId":"4f692651-fcf2-11e8-a26f-000c2974a417","label":"自定义下拉框","type":1,"rwmType":"2","status":1,"placeholderTip":"请选择来源","valueSource":"/basis-api/authsec/usercustommap?customId={_customId}","valueDomain":"/basis-api/authsec/usercustomTtimMap?ttimId={_ttimId}","orderSeq":7,"mandatory":1,"visible":true,"editable":true}]}}
        let ruleTemp = JSON.parse(this.state.ruleTemp)
        let gmJgRuleItems = templateData.template.templateItems.filter(v => v.code!='SUBMIT'&&v.code!='H5_FORM_TITLE'&&v.code!='TERMS'&&v.code!='DESCRIPTION'&&v.code!='PHONE'&&v.mandatory==1).map(v => {
            return  v.code=='EXPECTED_DATE'||v.code=='CUSTOM_DATE'?{
                "optionCode": v.code, //templateItemCode
                "optionId": v.templateItemId, //templateItemId
                "optionName": v.label, //templateItemLabel
                "optionValueType": 1,//0--单值 1--区间值 2--散列值 ,
                "values": [{
                    "displayEndValue": v.maxValue,
                    "displayStartValue": v.minValue,
                    "displayValue": null,//显示值
                    "endValue":  v.maxValue,
                    "startValue": v.minValue,
                    "type": 1, //0--单值 1--区间值 2--散列值 ,
                    "value": null //参数值
                  }],
                "isMandatory":v.mandatory,
                "_id":v.id,
                "_value": v.defaultValue,
                "_type": v.type
              }:v.code=='RECOMMENDATION_CODE'||v.code=='CUSTOM_INPUT'?{
                "optionCode": v.code, //templateItemCode
                "optionId": v.templateItemId, //templateItemId
                "optionName": v.label, //templateItemLabel
                "optionValueType": 0,//0--单值 1--区间值 2--散列值 ,
                "values": [{
                    "displayEndValue": null,
                    "displayStartValue": null,
                    "displayValue": v.label,//显示值
                    "endValue":  null,
                    "startValue": null,
                    "type": 0, //0--单值 1--区间值 2--散列值 ,
                    "value": v.label //参数值
                  }],
                "isMandatory":v.mandatory,
                "_id": v.id,
                "_value": v.defaultValue,
                "_type": v.type
              }:{
                "optionCode": v.code, //templateItemCode
                "optionId": v.templateItemId, //templateItemId
                "optionName": v.label, //templateItemLabel
                "optionValueType": 0,//0--单值 1--区间值 2--散列值 ,
                "values": [],
                "isMandatory":v.mandatory,
                "_id": v.id,
                "_value": v.defaultValue,
                "_type": v.type
              }
        })
        ruleTemp.groupRule.gmJgRuleItems = gmJgRuleItems
        if(viewType!='ADD'&&this.state.existGroup.length==0){
            this.getExistGroup()
        }
        this.setState({ruleTemp:JSON.stringify(ruleTemp)})
    }
    getExistGroup = () =>{
        let {templateData} = this.props
        const url = `${API_PATH}/groupadmin-api/authsec/group/join/rules?_currentPage=0&_pageSize=-1`
        AuthProvider.getAccessToken().then((reslove,reject)=> {
            return promiseXHR(url ,{type:'Bearer',value:reslove},{
                templateId: templateData.id,
                flag: 2
            },'post')
        }).then(res => {
            const resData = JSON.parse(res)
            if(resData.resultCode=='100'){
                let ruleTemp = JSON.parse(this.state.ruleTemp)
                let existGroup = resData.resultContent.map(v => {
                    return v.groupRule.status==1?{
                    ...v,
                    selected: 0,
                    editFlag:0,
                    groupRule: {
                        ...v.groupRule,
                        gmJgRuleItems: v.groupRule.gmJgRuleItems.map(gmJgRuleItem => {
                            let gmJgRuleItemTemp = ruleTemp.groupRule.gmJgRuleItems.find(s => s.optionCode==gmJgRuleItem.optionCode)
                            return {
                                ...gmJgRuleItem,
                                "isMandatory":gmJgRuleItemTemp.mandatory,
                                "_id": gmJgRuleItemTemp._id,
                                "_value": gmJgRuleItemTemp._value,
                                "_type": gmJgRuleItemTemp._type
                            }
                        })
                    }
                }:{
                    ...v,
                    selected: 0,
                    editFlag:0,
                    groupRule: {
                        ...v.groupRule,
                        gmJgRuleItems: ruleTemp.groupRule.gmJgRuleItems
                    }
                }})
                if(this.state.ruleData.length==0&&existGroup.length>0){
                    existGroup[0].selected=1
                }
                this.setState({
                    existGroup: existGroup,
                    ruleData: this.state.ruleData.concat(existGroup)
                })
            }
        })
    }
    dataCacheHandle = (code,data)=>{
        console.log(code)
        let dataCache = this.state.dataCache
        dataCache[code] = data
    }
    updateRules = (k,values,type) => {
        // 更新rule值
        console.log(values,'!!!!!')
        let {ruleData,dataCache} = this.state
        let select_index = ruleData.findIndex(v => v.selected)
        let params = ruleData[select_index].groupRule
        if(k=='CITY'||k=='STORE'||k=='CUSTOME_SELECT'){
            // 所有数据不能直接替换，需要保持原来数据结构不变，替换更新值
            params.gmJgRuleItems = params.gmJgRuleItems.map(v => {
                return (
                    v.optionCode == k&&v._type==type?{
                        ...v,
                        values: values.map(st => {
                            let old = v.values.find(rule => rule.value==st.value)
                            if(old){
                                return Object.assign({},old,st)
                            }else{
                                return st
                            }
                        })
                    }:v
                )
            })
        }else{
            params.gmJgRuleItems = params.gmJgRuleItems.map(v => {
                return (
                    v.optionCode == k&&v._type==type?{
                        ...v,
                        values: values.map(st => {
                            return Object.assign({},v.values[0],st)
                        })
                    }:v
                )
            })
        }
        if(k=='STORE'){
            let allId = values.map(v => v.value)
            // 筛选出所有城市
            let allCityId = []
            allId.forEach(v => {
                let item = dataCache['STORE'].flatCityList.find(r => r.id==v)
                if(item.code=='STORE'){
                    allCityId.push(item.parentId)
                }
            })
            allCityId = _uniq(allCityId)
            // 筛选出所有省份
            let allProvinceId = []
            allCityId = allCityId.map(v =>{
                let item = dataCache['STORE'].flatCityList.find(r => r.id==v)
                allProvinceId.push(item.parentId)
                return {
                    displayValue: item.displayName,
                    value: item.id,
                    displayEndValue: null,
                    displayStartValue: null,
                    endValue: null,
                    startValue: null,
                    type: 0
                }
            })
            allProvinceId = _uniq(allProvinceId)
             // 筛选出所有全选省份
            let checkProvinceId = []
            allProvinceId.forEach(v => {
                let province = dataCache['STORE'].dataList.find(r => r.id==v)
                if(!province.cityList.find(s => !allCityId.find(r => r.value==s.id))){
                    checkProvinceId.push({
                        displayValue: province.displayName,
                        value: province.id,
                        displayEndValue: null,
                        displayStartValue: null,
                        endValue: null,
                        startValue: null,
                        type: 0
                    })
                }
            })
            let cityValues = checkProvinceId.concat(allCityId)
            params.gmJgRuleItems = params.gmJgRuleItems.map(v => {
                return (
                    v.optionCode == 'CITY'?{
                        ...v,
                        values: cityValues.map(st => {
                            let old = v.values.find(rule => rule.value==st.value)
                            if(old){
                                return Object.assign({},old,st)
                            }else{
                                return st
                            }
                        })
                    }:v
                )
            })
        }
        console.log(ruleData)
        this.setState({ruleData})
    } 
    updateRangeRules = (k,pos,v) => {
        console.log(k,pos,v)
        let {ruleData} = this.state
        let select_index = ruleData.findIndex(v => v.selected)
        let groupRule = ruleData[select_index].groupRule
        let newValue = pos=='start'?{
            "displayStartValue": v,
            "startValue":v
        }:{
            "displayEndValue": v,
            "endValue":v
        }
        groupRule.gmJgRuleItems = groupRule.gmJgRuleItems.map(v => {
            return (
                v.optionCode == k?{
                    ...v,
                    values: [{...v.values[0],...newValue}]
                }:v
            )
        })
        ruleData[select_index].groupRule = groupRule
        this.setState({ruleData})
    }
    verifyHandle = (ruleData) => {
        let flag = true 

        ruleData = ruleData.map(v =>{
            if(!v.selected){
                return v
            }
            let groupErrorFlag = false
            let rules = v.groupRule.gmJgRuleItems.map(item => {
                let ruleErrorFlag = false
                if(item.optionCode=='EXPECTED_DATE'||item.optionCode=='CUSTOM_DATE'){
                    if(item.values[0].startValue==''||item.values[0].endValue==''||item.values[0].startValue==undefined||item.values[0].endValue==undefined){
                        sendEvent('message', {txt: '请选择日期',code: 1004})
                        flag = false
                        ruleErrorFlag = true
                        groupErrorFlag = true
                    }else if(new Date(item.values[0].startValue).getTime()>new Date(item.values[0].endValue).getTime()){
                        sendEvent('message', {txt: '日期格式错误',code: 1004})
                        flag = false
                        ruleErrorFlag = true
                        groupErrorFlag = true
                    }
                }

                if(item.optionCode=='CITY'&&item.values.length==0){
                    sendEvent('message', {txt: '请选择城市',code: 1004})
                    flag = false
                    ruleErrorFlag = true
                    groupErrorFlag = true
                }

                if(item.optionCode=='STORE'&&item.values.length==0){
                    sendEvent('message', {txt: '请选择城市',code: 1004})
                    flag = false
                    ruleErrorFlag = true
                    groupErrorFlag = true
                }

                if(item.optionCode=='CUSTOM_SELECT'&&item.values.length==0){
                    sendEvent('message', {txt: '请选择自定义下拉框选项',code: 1004})
                    flag = false
                    ruleErrorFlag = true
                    groupErrorFlag = true
                }

                if(item.optionCode=='RECOMMENDATION_CODE'&&item.values[0].displayValue==''){
                    sendEvent('message', {txt: '请输入推荐码',code: 1004})
                    flag = false
                    ruleErrorFlag = true
                    groupErrorFlag = true
                }


                if(item.optionCode=='CUSTOM_INPUT'&&item.values[0].displayValue==''){
                    sendEvent('message', {txt: '请输入自定义输入框选项',code: 1004})
                    flag = false
                    ruleErrorFlag = true
                    groupErrorFlag = true
                }

                return {
                    ...item,
                    errorFlag: ruleErrorFlag
                }
            })

            v.groupRule.gmJgRuleItems = rules
            v.errorFlag = groupErrorFlag
            return v
        })
        // 报错提示
        if(flag){
            return ruleData
        }else{
            this.setState({ruleData})
            return flag
        }
    }
    submitPageParams =(callBack)=> {
        let {submiting,ruleData} = this.state
        let {templateData} = this.props
        if(submiting) return
        // if(!this.verifyHandle()) return
        ruleData = this.verifyHandle(ruleData)
        // 校验失败，return
        if(ruleData===false) return
        // 清洗ruleData数据
        let editRuleData = ruleData.find(v => v.selected)
        ruleData = this.cleanRuleData()
        this.setState({
            submiting: true
        })
        sendEvent('message', {txt: "正在更新规则，请稍等~",code: 1000})
        let url = `${API_PATH}/groupadmin-api/authsec/group/join/rule?id=${editRuleData.groupRule.id?editRuleData.groupRule.id:'default'}`
        AuthProvider.getAccessToken().then((reslove,reject)=> {
            return promiseXHR(url ,{type:'Bearer',value:reslove},editRuleData.groupRule,'put')
        }).then(res => {
            const resData = JSON.parse(res)
            if(resData.resultCode=='100'){
                let newRuleData = this.state.ruleData.map(v => {
                    return v.selected?{
                        ...v,
                        groupName: resData.resultContent.groupName,
                        groupRule: resData.resultContent.groupRule,
                        errorFlag: resData.resultContent.errorFlag
                    }:v
                })
                this.setState({
                    submiting: false,
                    ruleData: newRuleData
                })
                this.props.setparamsHandle('joinGroupRuleId','',true,newRuleData)
                callBack&&callBack()
                sendEvent('message', {txt: "编辑规则提交成功",code: 1000})
            }else if(resData.resultCode=='03801414'||resData.resultCode=='03801412'){
                let newRuleData = this.state.ruleData.map(v => {
                    return v.selected?{
                        ...v,
                        groupName: resData.resultContent.groupName,
                        groupRule: resData.resultContent.groupRule,
                        errorFlag: resData.resultContent.errorFlag
                    }:v
                })
                this.setState({
                    ruleData: newRuleData,
                    submiting: false
                })
                this.props.setparamsHandle('joinGroupRuleId','',true,newRuleData)
                sendEvent('message', {txt: "规则值冲突",code: 1004})
            }else if(resData.resultCode=='03801400'){
                throw {
                    txt:'请求参数校验失败',
                    type: 'self'
                }
            }else if(resData.resultCode=='03801401'){
                throw {
                    txt:'请求权限不足',
                    type: 'self'
                }
            }else if(resData.resultCode=='03801403'){
                throw {
                    txt:'操作失败',
                    type: 'self'
                }
            }else if(resData.resultCode=='03801404'){
                throw {
                    txt:'指定信息不存在',
                    type: 'self'
                }
            }else if(resData.resultCode=='03801413'){
                throw {
                    txt:'规则区间值冲突',
                    type: 'self'
                }
            }else if(resData.resultCode=='03801500'){
                throw {
                    txt:'未知运行异常',
                    type: 'self'
                }
            }else if(resData.resultCode=='03801503'){
                throw {
                    txt:'服务暂不可用',
                    type: 'self'
                }
            }else{
                throw {
                    txt:'规则提交失败',
                    type: 'self'
                }
            }
        }).catch(err => {
            console.log(err)
            this.setState({
                submiting: false
            })
            this.props.setparamsHandle('joinGroupRuleId','',false,this.state.ruleData)
            err.type=='self'&&sendEvent('message', {txt: err.txt,code: 1004})
        })
    }
    cleanRuleData = () => {
        // 传递值，清洗code
        let {dataCache} = this.state
        let ruleData = this.state.ruleData.map(v => {
            let STORE_rule = v.groupRule.gmJgRuleItems.find(v =>v.optionCode=='STORE')
            if(STORE_rule){
                let store_flat_treedata = dataCache['STORE'].flatCityList
                v.groupRule.gmJgRuleItems = v.groupRule.gmJgRuleItems.map(gmJgRuleItem => ({
                    ...gmJgRuleItem,
                    values: gmJgRuleItem.optionCode=='STORE'?gmJgRuleItem.values.map(value => ({
                        ...value,
                        _code: store_flat_treedata.find(s => s.id==value.value).code
                    })):gmJgRuleItem.values
                }))
            }
            return {
                groupName: v.groupName,
                groupRule: v.groupRule
            }
           
        })
        return ruleData
    }
    backHandle=()=>{
        this.setState({
            cancelFlag: !this.state.cancelFlag
        })
    }

    updateRuleData =(ruleData) =>{
        this.setState({ruleData})
    } 
    selectGroupRuleData = (index) =>{
        this.setState({
            ruleData: this.state.ruleData.map((v,i)=>{
                return {
                    ...v,
                    selected: i==index?1:0
                }
            })
        })
    }
    render() {
        let {cancelFlag,ruleData,ruleTemp,dataCache} = this.state;
        let {templateData,viewType,nextStep,ruleType,changeWhen} = this.props;
        console.log(ruleData)
        return (
            <div className='InGroupRule'>
            <div className="inner">
                <div className="stepTitle" style={{display:ruleType||viewType!=='ADD'?'none':'block'}}>
                    <span className='done'>1.创建入群页面</span>
                    <span className='done' style={{margin:'0 12px'}}>></span>
                    <span className='done'>2.新建群</span>
                </div>
                <div className="InGroupRuleRow pageSize">
                    <BuildGroup ruleData={ruleData} ruleTemp={ruleTemp} updateRuleData={this.updateRuleData} selectGroupRuleData={this.selectGroupRuleData} />
                    <BuildRule ruleData={ruleData} updateRules={this.updateRules} updateRangeRules={this.updateRangeRules} dataCache={dataCache} dataCacheHandle={this.dataCacheHandle} submitPageParams={this.submitPageParams} changeWhen={changeWhen}/>
                    <div className="buttonArea" style={{marginTop:'36px'}}>
                        <ButtonBox
                            btnTxt={"返回"}
                            isCancel={true}
                            btnStyle={{
                                float: 'right',
                                marginRight:'0'
                            }}
                            btnFunc={()=>{
                                nextStep(false)
                            }}
                        />
                        {/* <ButtonBox 
                            btnTxt={'保存'}
                            isCancel={false}
                            btnStyle={{
                                float: 'left'
                            }}
                            btnFunc={this.submitPageParams}
                        /> */}
                    </div>
                </div>
                {/* <ModalBox 
                    modalStatus={cancelFlag} //控制显示隐藏状态
                    modalStyle={{width:'430px'}}//修改样式，默认最小高度220px，宽度420px
                    closeModalFunc={this.backHandle} //关闭弹出框函数
                    confirmFunc={()=>{nextStep(false)}} //弹出框确定函数，处理主逻辑
                    modalTxt={'返回上一步你会丢失当前页信息，你确定返回？'} //弹出框的文本信息
                    cancelTxt={'我再想想'}//取消按钮的文本
                    confirmTxt={"知道了"}//确定按钮的文本
                /> */}
            </div>
            </div>
        )
    }
}
