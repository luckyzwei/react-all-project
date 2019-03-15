
import React, { Component } from 'react'
import './index.css'
import flatMap from 'lodash/flatMap'

import IptLimit from "../../../shareComponent/IptLimit";

import Radio from '../../../shareComponent/Radio';

import TreeBox from "../../../shareComponent/TreeBox";
import _ from 'lodash'

import AuthProvider from '../../../../funStore/AuthProvider'
import promiseXHR from '../../../../funStore/ServerFun'
import {API_PATH} from '../../../../constants/OriginName'
import { sendEvent } from '../../../../funStore/CommonFun';


export default class PageCity extends Component {
    constructor() {
        super();
        this.state = {
            cityList: [],
            flatCityList: [],
            paramValue: []
        }
    }
    componentDidMount=()=> {
        let {sysTtims,disabled,data,city_store_tree_data,update_city_store_tree,city_tree_flag,store_tree_flag} = this.props;
        // 获取城市列表
        if(!city_tree_flag){
            // 有数据
            // let flatCityList = flatMap(city_store_tree_data,(v1)=>{
            //     return v1.cityList?[v1].concat(flatMap(v1.cityList,(v2)=>{
            //         return v2.cityList?[v2].concat(v2.cityList):[v2]
            //     })
            //         ):[v1]
            // })
            let flatCityList = flatMap(city_store_tree_data,(v1)=>{
                return v1.cityList?[v1].concat(v1.cityList):[v1]
            })
            // 默认值处理 数据中带有
            let checkedKeys = flatCityList.filter(v => v.selected!=0&&v.selected!=2).map(v => v.regionId) //获取默认值
            this.setState({
                cityList: city_store_tree_data,
                flatCityList: flatCityList,
                paramValue: checkedKeys
            })
            return
        }
        // 没有数据，拉取城市列表
        const {_ttimId}  = this.props
        const url = `${API_PATH}/basis-api/authsec/region/regionTtims?_ttimId=${_ttimId?_ttimId:''}` 
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
                console.log(flatCityList)
                console.log(checkedKeys)
                this.setState({
                    cityList: cityList,
                    flatCityList: flatCityList,
                    paramValue: checkedKeys
                })
                update_city_store_tree(cityList,'city',checkedKeys)
            }
        })
    }
    setparamsHandle=(k,v)=> {
        console.log(k,v)
        let data = this.props.data
        if(k=='cityName'){
            data.label = v
            this.props.updateItem(data)
        }else if(k=='cityOnlyNeed'){
            data.mandatory = v
            this.props.updateItem(data)
        }else if(k=='cityList'){
            let {cityList} = this.state
            // 城市处理
            cityList = cityList.map((level1_city,level1_index)=>({
                ...level1_city,
                selected: v.includes(level1_city.id)?1:level1_city.cityList.find(level2_city => v.includes(level2_city.id))?2:0,//如果在checkedkeys里，selected:1,不在但是下面的城市有选中，selceted:2，否则为0 未选中
                cityList: level1_city.cityList.map((level2_city,level1_index) =>({
                    ...level2_city,
                    selected: v.includes(level2_city.id)?1:0,//城市选择判断
                    cityList: level2_city.cityList.map(level3_city=>({
                        ...level3_city,
                        status: level3_city.status!=3?(v.includes(level2_city.id)?1:2):3 //3 强制删除；2 未勾选城市导致的删除
                    }))
                }))
            }))
            this.setState({cityList})
            this.props.update_city_store_tree(cityList)
        }
    }
    checkAuthFunc = (events) => {
        // 如果有门店数据，则城市选择无效
        if(events&&!events.checked){
            let {disabledKeys,city_store_tree_data,store_tree_flag} = this.props
            let cityNode = events.node.props.dataRef
            if(store_tree_flag){
                // 还没有拉取门店数据
                // 根据记录的初始值判断城市下面是否有门店
                if(cityNode.parentId){
                    // 有parentId 城市
                    // 城市id初始状态为选中
                    let flag = disabledKeys.includes(cityNode.id)
                    if(flag){
                        sendEvent('message', {txt: "城市下存在门店，将门店全部删除后才可取消选择",code: 1004,timer:3000})
                        return {
                            status: true,
                            checkedKeys: []
                        }
                    }
                }else{
                    // 省份处理
                    let checkedKeys = []
                    checkedKeys = checkedKeys.concat(disabledKeys.filter(v => cityNode.cityList.find(city => city.id==v)))
                    return {
                        status: false,
                        checkedKeys: checkedKeys
                    }
                }
            }else{
                // 拉取门店数据
                // 根据城市和门店的树数据判断城市下面是否有门店
                if(cityNode.parentId){
                    // 有parentId 城市
                    let province = city_store_tree_data.find(v => v.id==cityNode.parentId)
                    let city = province.cityList.find(v => v.id==cityNode.id)
                    if(city.cityList.find(s => s.id&&s.status==1)){
                        sendEvent('message', {txt: "城市下存在门店，将门店全部删除后才可取消选择",code: 1004,timer:3000})
                        return {
                            status: true,
                            checkedKeys: []
                        }
                    }
                }else{
                    // 省份处理
                    let province = city_store_tree_data.find(v => v.id==cityNode.id)
                    let checkedKeys = province.cityList.filter(v => v.cityList.find(s => s.id&&s.status==1)).map(v => v.id)
                    return {
                        status: false,
                        checkedKeys: checkedKeys
                    }
                }
            }
        }
        return {
            status: false,
            checkedKeys: []
        }
    }
    render() {
        let {cityList,paramValue,flatCityList} = this.state
        let { data,updateItem,sysTtims,updateSysTtims,disabled} = this.props;
        return (
            <div className='PageCity'>
                <div className="Pagetitle">城市/地区设置：</div>
                <div className="PageContent">
                    <div className='row'>
                        <IptLimit
                            widths={{ width: '316px' }}
                            paramName={'cityName'}
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
                            <span className={data.mandatory=='1'?"icon-check checked":"icon-check"} style={{cursor:disabled?'not-allowed':''}} onClick={()=>{!disabled&&this.setparamsHandle('cityOnlyNeed',data.mandatory=='1'?0:1)}}></span>
                            必填
                        </div>
                    </div>
                    {/* <div className="row">
                        <div className="phone-content-title">必填：</div>
                        <Radio
                            paramName={'cityOnlyNeed'}
                            value={data.mandatory}
                            sourceData={[{ name: '是', value: 1 }, { name: '否', value: 0 }]}
                            onChange={this.setparamsHandle}
                            disabled={disabled}
                        />
                    </div> */}
                    <div className="row list">
                        <div className="phone-content-title">城市列表：</div>
                        <TreeBox
                            selectName={'选择城市'}
                            paramName={'cityList'}
                            setparamsHandle={this.setparamsHandle}
                            paramValue={paramValue}
                            paramList={cityList}
                            flatCityList={flatCityList}
                            checkAll={false}
                            disabled={disabled}
                            checkAuthFunc={this.checkAuthFunc}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

PageCity.defaultProps={
    disabledKeys: []
}
