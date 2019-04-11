import React,{Component} from 'react'
import AsynTree from '../../../shareComponent/TreeBox/AsynTree';
import {API_PATH} from '../../../../constants/OriginName'
import AuthProvider from '../../../../funStore/AuthProvider'
import promiseXHR from '../../../../funStore/ServerFun'

const nameMap = {
    'PHARMACY': '选择药店',
    'HOSPITAL': '选择医院',
    'STORE': '选择门店'
}

const getUnderCityUrl = (type,originName,cityId,ttimId) => {
    switch (type) {
      case 'HOSPITAL':
        return  originName+"/basis-api/authsec/hospitalTtims/hospitals?_cityId="+cityId+'&_ttimId='+ttimId
      case 'STORE':
        return  originName+"/basis-api/authsec/stores/current?_cityId="+cityId
      case 'PHARMACY':
        return  originName+"/basis-api/authsec/pharmacyTtims/pharmacy?_cityId="+cityId+'&_ttimId='+ttimId
    }
  }

export default class TreeRule extends Component {
    constructor(props){
        super(props)
        this.state = {
            dataList: [],
            paramValue: []
        }
    }
    componentDidMount() {
        const {item} = this.props
        let paramValue
        paramValue = item.values.map(v => {
            return v.value+'|'+v.displayValue
        })
        this.setState({paramValue})
        const url= `${API_PATH}/basis-api/authsec/region/regionTtims?_ttimId=${item._id}`
        AuthProvider.getAccessToken()
        .then((resolve,reject)=>{
            return promiseXHR(url,{type:'Bearer',value:resolve},null,'get')
        }).then(res => {
            const resData = JSON.parse(res)
            if(resData.resultCode==100){
                let dataList = resData.resultContent.map(v => ({
                    key: v.regionId+'|'+v.displayName,
                    title: v.displayName,
                    level: 1,
                    children: v.cityList?v.cityList.map(v2 => {
                        return {
                            key: v2.regionId+'|'+v2.displayName,
                            title: v2.displayName,
                            level: 2,
                            // children: v2.cityList?v2.cityList.map(v3 => {
                            //     return {
                            //         key: v3.regionId+'|'+v3.displayName,
                            //         title: v3.displayName,
                            //         level: 3
                            //     }
                            // }):[]
                        }
                    }):[]
                }))
                this.setState({dataList})
            }
        })
    }
    onLoadData= (treeNode) => {
        // console.log(treeNode.props)
            //三级展开
        const {item} = this.props
        return AuthProvider.getAccessToken()
        .then((resolve, reject)=>{
            if(treeNode.props.children){
                return
            }else{
                const url=getUnderCityUrl(item.optionCode,API_PATH,treeNode.props.dataRef.key.split('|')[0],item._id)
                promiseXHR(url,{type:'Bearer',value:resolve},null,'GET').then(res=>{
                    const data=JSON.parse(res);
                    if(data.resultCode=='100'){
                        treeNode.props.dataRef.children = data.resultContent?data.resultContent.map(v => (
                            {
                                key: v.id+'|'+v.name,
                                title: v.name,
                                isLeaf: true,
                                level:4
                            }
                        )):[]
                        this.setState({
                            dataList: [...this.state.dataList],
                        })
                    }
                })
            } 
        })
    }
    setparamsHandle = (checkedKeys) => {
        let values = checkedKeys.map(u => {
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
        this.props.updateRules(this.props.item.optionCode,values)
    }
    render(){
        const {dataList,paramValue} = this.state
        const {item} = this.props
        return (
            <div className='city-InGroupRuleRow'>
                <AsynTree
                    checkable={true}
                    selectName={nameMap[item.optionCode]}
                    treeData={dataList}
                    onLoadData={this.onLoadData}
                    paramName={item.optionCode}
                    setparamsHandle={this.setparamsHandle}
                    paramValue={paramValue}
                    isMandatory={item.isMandatory}
                />
            </div>
        )
    }
}