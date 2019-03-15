import React,{Component} from 'react'
import TreeBox from '../../../shareComponent/TreeBox';
import {API_PATH} from '../../../../constants/OriginName'
import AuthProvider from '../../../../funStore/AuthProvider'
import promiseXHR from '../../../../funStore/ServerFun'
import flatMap from 'lodash/flatMap'

const nameMap = {
    'CITY':'选择城市',
    'CLASS': '选择班级',
    'CHANNEL': '选择渠道',
    'CUSTOM_SELECT': '自定义下拉框',
    'PHARMACY': '选择药店',
    'HOSPITAL': '选择医院',
    'STORE': '选择门店'
}

const mocaDataList = [{
    "regionId": "065f0ab1-2672-11e7-bc98-00155d000b01",
    "id": "065f0ab1-2672-11e7-bc98-00155d000b01",
    "name": "陕西",
    "displayName": "陕西省",
    "selected": 0,
    "parentId": null,
    "code": null,
    "type": 2,
    "status": null,
    "seqNo": 0,
    "cityId": null,
    "cityList": [{
        "regionId": "ace90791-565d-11e7-834f-00155d000b01",
        "id": "ace90791-565d-11e7-834f-00155d000b01",
        "name": "西安市",
        "displayName": "西安市",
        "selected": 0,
        "parentId": "065f0ab1-2672-11e7-bc98-00155d000b01",
        "code": null,
        "type": 3,
        "status": null,
        "seqNo": 0,
        "cityId": null,
        "cityList": []
    }, {
        "regionId": "ace93c35-565d-11e7-834f-00155d000b01",
        "id": "ace93c35-565d-11e7-834f-00155d000b01",
        "name": "铜川市",
        "displayName": "铜川市",
        "selected": 0,
        "parentId": "065f0ab1-2672-11e7-bc98-00155d000b01",
        "code": null,
        "type": 3,
        "status": null,
        "seqNo": 0,
        "cityId": null,
        "cityList": []
    }, {
        "regionId": "ace93c7b-565d-11e7-834f-00155d000b01",
        "id": "ace93c7b-565d-11e7-834f-00155d000b01",
        "name": "宝鸡市",
        "displayName": "宝鸡市",
        "selected": 0,
        "parentId": "065f0ab1-2672-11e7-bc98-00155d000b01",
        "code": null,
        "type": 3,
        "status": null,
        "seqNo": 0,
        "cityId": null,
        "cityList": []
    }, {
        "regionId": "ace93ca7-565d-11e7-834f-00155d000b01",
        "id": "ace93ca7-565d-11e7-834f-00155d000b01",
        "name": "咸阳市",
        "displayName": "咸阳市",
        "selected": 0,
        "parentId": "065f0ab1-2672-11e7-bc98-00155d000b01",
        "code": null,
        "type": 3,
        "status": null,
        "seqNo": 0,
        "cityId": null,
        "cityList": []
    }, {
        "regionId": "ace93cd3-565d-11e7-834f-00155d000b01",
        "id": "ace93cd3-565d-11e7-834f-00155d000b01",
        "name": "渭南市",
        "displayName": "渭南市",
        "selected": 0,
        "parentId": "065f0ab1-2672-11e7-bc98-00155d000b01",
        "code": null,
        "type": 3,
        "status": null,
        "seqNo": 0,
        "cityId": null,
        "cityList": []
    }, {
        "regionId": "ace93cff-565d-11e7-834f-00155d000b01",
        "id": "ace93cff-565d-11e7-834f-00155d000b01",
        "name": "延安市",
        "displayName": "延安市",
        "selected": 0,
        "parentId": "065f0ab1-2672-11e7-bc98-00155d000b01",
        "code": null,
        "type": 3,
        "status": null,
        "seqNo": 0,
        "cityId": null,
        "cityList": []
    }, {
        "regionId": "ace93d2b-565d-11e7-834f-00155d000b01",
        "id": "ace93d2b-565d-11e7-834f-00155d000b01",
        "name": "汉中市",
        "displayName": "汉中市",
        "selected": 0,
        "parentId": "065f0ab1-2672-11e7-bc98-00155d000b01",
        "code": null,
        "type": 3,
        "status": null,
        "seqNo": 0,
        "cityId": null,
        "cityList": []
    }, {
        "regionId": "ace93d55-565d-11e7-834f-00155d000b01",
        "id": "ace93d55-565d-11e7-834f-00155d000b01",
        "name": "榆林市",
        "displayName": "榆林市",
        "selected": 0,
        "parentId": "065f0ab1-2672-11e7-bc98-00155d000b01",
        "code": null,
        "type": 3,
        "status": null,
        "seqNo": 0,
        "cityId": null,
        "cityList": []
    }, {
        "regionId": "ace93d7e-565d-11e7-834f-00155d000b01",
        "id": "ace93d7e-565d-11e7-834f-00155d000b01",
        "name": "安康市",
        "displayName": "安康市",
        "selected": 0,
        "parentId": "065f0ab1-2672-11e7-bc98-00155d000b01",
        "code": null,
        "type": 3,
        "status": null,
        "seqNo": 0,
        "cityId": null,
        "cityList": []
    }, {
        "regionId": "ace93dab-565d-11e7-834f-00155d000b01",
        "id": "ace93dab-565d-11e7-834f-00155d000b01",
        "name": "商洛市",
        "displayName": "商洛市",
        "selected": 0,
        "parentId": "065f0ab1-2672-11e7-bc98-00155d000b01",
        "code": null,
        "type": 3,
        "status": null,
        "seqNo": 0,
        "cityId": null,
        "cityList": []
    }]
}]

export default class TreeRule extends Component {
    constructor(props){
        super(props)
        this.state = {
            dataList: [],
            paramValue: [],
            flatCityList:[]
        }
    }
    componentDidMount() {
        let {dataCache,item} = this.props
        if(dataCache[item.optionCode]){
            console.log(item)
            let paramValue = item.values.map(v => v.value+'|'+v.displayValue) //获取默认值
            this.setState({
                dataList:dataCache[item.optionCode].dataList,
                flatCityList:dataCache[item.optionCode].flatCityList,
                paramValue
            })
        }else {
            this.initCityList()
        }
    }
    initCityList = () => {
        const {item,allItems,dataCacheHandle} = this.props
        let url
        if(item.optionCode=='CITY'){
            url = `${API_PATH}/basis-api/authsec/region/regionTtims?_ttimId=${item._id}`
        }else if(item.optionCode=='CUSTOM_SELECT'){
            url = `${API_PATH}/basis-api/authsec/tenant/template/customregion/tree?templateItemMapCustomRegionId=${item._id}&customType=CUSTOM_SELECT`
        }else if(item.optionCode=='STORE'){
            const cityItem = allItems.find(v => v.optionCode=='CITY')
            url = `${API_PATH}/basis-api/authsec/tenant/template/customregion/tree?templateItemMapCustomRegionId=${item._id}&templateItemMapCityId=${cityItem._id}&customType=STORE`
        }
        let filterOption = item.optionCode
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
                let paramValue = item.values.map(v => v.value+'|'+v.displayValue) //获取默认值
                this.setState({
                    dataList,
                    flatCityList,
                    paramValue
                })
                dataCacheHandle(item.optionCode,{dataList,flatCityList})
            }
        }).catch(err => {
            console.log(err)
        })
    }
    setparamsHandle=(k,v)=> {
        let values = v.map(u => {
            let uv = u.split('|')
            let id= uv[0]
            let name = uv[1]
            return {
                    "displayEndValue": null,
                    "displayStartValue": null,
                    "displayValue": name,//显示值
                    "endValue": null,
                    "startValue": null,
                    "type": 0, //0--单值 1--区间值 2--散列值 ,
                    "value": id //参数值
                  }
        })
        this.props.updateRules(k,values,this.props.item._type)
    }
    render(){
        const {dataList,paramValue,flatCityList} = this.state
        const {item,selectedKeys,disabled} = this.props
        console.log(selectedKeys)
        return (
            <div className='city-InGroupRuleRow'>
                <TreeBox
                    selectName={nameMap[item.optionCode]}
                    paramName={item.optionCode}
                    setparamsHandle={this.setparamsHandle}
                    paramList={dataList}
                    paramValue={paramValue}
                    flatCityList={flatCityList}
                    checkAll={true}
                    selectedKeys={selectedKeys}
                    disabled={disabled}
                    // isMandatory={item.isMandatory}
                />
            </div>
        )
    }
}