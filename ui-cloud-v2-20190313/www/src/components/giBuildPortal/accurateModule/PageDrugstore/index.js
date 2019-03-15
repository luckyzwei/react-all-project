import React, { Component } from 'react'
import './index.css'
import IptLimit from "../../../shareComponent/IptLimit";
import AuthProvider from '../../../../funStore/AuthProvider'
import promiseXHR from '../../../../funStore/ServerFun'
import {API_PATH} from '../../../../constants/OriginName'
import {sendEvent} from '../../../../funStore/CommonFun'
import flatMap from 'lodash/flatMap'
import ModalBox from '../../../shareComponent/ModalBox'

const mocaData = [{
    name:'11',
    id: 1,
    expandFlag: false,
    cityList: [{
        name: '11-11',
        id: 2,
        expandFlag: false,
        add_Level3_flag: false,
        cityList:[{
            name: '11-11-11',
            id: 3,
            editFlag: false,
            status: 0,
            cityList:[]
        }]
    }]
},{
    name:'22',
    id: 4,
    expandFlag: false,
    cityList: [{
        name: '22-22',
        id: 5,
        expandFlag: false,
        add_Level3_flag: false,
        cityList:[{
            name: '33-33-3',
            id: 6,
            editFlag: false,
            status: 0,
            cityList:[]
        }]
    }]
}]

const getUnderCityUrl = (templateItemMapCustomRegionId,templateItemMapCityId) => {
    return  `${API_PATH}/basis-api/authsec/tenant/template/customregion/tree?templateItemMapCustomRegionId=${templateItemMapCustomRegionId}&templateItemMapCityId=${templateItemMapCityId}&customType=STORE`
}

const titleMap = {
    'HOSPITAL': '医院设置：',
    'STORE': '门店设置：',
    'PHARMACY': '药店设置：'
}

const nameMap = {
    'HOSPITAL': '医院列表：',
    'STORE': '门店列表：',
    'PHARMACY': '药店列表：'
}

const selectMap = {
    'HOSPITAL': '选择医院：',
    'STORE': '选择门店：',
    'PHARMACY': '选择药店：'
}

const flatFunc = (data) => {
    // 新建数组扁平化
    return flatMap(data,(v)=>{
        return v.cityList&&v.cityList.length>0?[v].concat(flatFunc(v.cityList)):[v]
    })
}

const flatFunc1 = (data) => {
    // 新建数组扁平化
    return flatMap(data,(v)=>{
        return v.children&&v.children.length>0?[v].concat(flatFunc1(v.children)):[v]
    })
}

const treeMapFunc = (data,filterFunc) => {
    // 新建递归map数据
    return data.filter(v => filterFunc(v)).map(v => {
        return {
            ...v,
            key: v.regionId,
            title: v.displayName,
            children: !v.cityList||v.cityList.length==0?[]:treeMapFunc(v.cityList,filterFunc)
        }
    })
}

const getParentFunc = (arr,allData) =>{
    // 递归拿到父级id
    let newArr = []
    if(arr.length==0){
        return newArr
    }else {
        arr.forEach(v =>{
            allData[v].parentId!=null&&newArr.push(allData[v].parentId)
        })
    }
    return newArr.concat(getParentFunc(newArr,allData))
}

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
            </div>
        )
    }
}

export default class PageDrugstore extends Component {
    constructor() {
        super();
        this.state = {
            dataList: [],
            level3_value_cache:'',
            modalStyle:{}
        }
    }
    componentDidMount(){
        const {templateItems,sysTtims,type,data,updateSysTtims,city_store_tree_data,update_city_store_tree,store_tree_flag} = this.props
        let templateItemCode = data.code
        let templateItemId = data.id
        // 数据初始化，有初始值和没有初始值
        // 没有值，合并城市数据
        if(!store_tree_flag){
            this.setState({
                dataList: city_store_tree_data
            })
            return
        } 
        AuthProvider.getAccessToken()
        .then((resolve, reject)=>{
            let templateItemMapCityId = templateItems.find(item => item.code == 'CITY')
            const url=getUnderCityUrl(templateItemId,templateItemMapCityId.id)
            if(templateItemId){
                return promiseXHR(url,{type:'Bearer',value:resolve},null,'GET')
            }else{
                return JSON.stringify({
                    'resultCode':100,
                    'resultContent':[]
                })
            }
        })
        .then(res=>{
            const data=JSON.parse(res);
            if(data.resultCode=='100'){
                let storeTree = city_store_tree_data.map(level1 => ({
                    ...level1,
                    code:templateItemCode,
                    expandFlag: false,
                    cityList: level1.cityList.map(level2 =>({
                        ...level2,
                        code:templateItemCode,
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
                this.setState({dataList: storeTree})
                update_city_store_tree(storeTree,'store')
            }
        }).catch(err => {
            console.log(err,'PageDrugstore')
        })
    }
    
    setparamsHandle=(k,v)=> {
        let data = this.props.data
        if(k=='name'){
            data.label = v
            this.props.updateItem(data)
        }else if(k=='mandatory'){
            data.mandatory = v
            this.props.updateItem(data)
        }
    }

    level3Input = (e)=>{
        this.setState({
            level3_value_cache: e.target.value
        })
    }

    // 新增
    addLevel3Click = (level1_index,level2_index) =>{
        // 编辑时，所有edit关闭,除了3级新增
        let {dataList} = this.state
        dataList = dataList.map((v,vIndex)=>({
                ...v,
                cityList: v.cityList.map((s,sIndex)=>({
                    ...s,
                    add_Level3_flag: vIndex==level1_index&&sIndex==level2_index?true:false,
                    expandFlag: vIndex==level1_index&&sIndex==level2_index?true:s.expandFlag,
                    cityList: s.cityList.map((t,tIndex)=>({
                        ...t,
                        editFlag: false
                    }))
                }))
            })
        )
        this.setState({
            level3_value_cache: '',
            dataList
        })
    }

    addLevel3Confirm = (level1_index,level2_index) => {
        let {dataList,level3_value_cache} = this.state
        const newLevel3 = {
            name: level3_value_cache.trim().slice(0,12),
            cityList: [],
            editFlag: false,
            status: 1,
            code: 'STORE'
        }
        dataList[level1_index].cityList[level2_index].add_Level3_flag = false
        if(newLevel3.name!=''){
            dataList[level1_index].cityList[level2_index].cityList.push(newLevel3)
        }
        this.setState({
            level3_value_cache: '',
            dataList
        })
        const {update_city_store_tree} = this.props
        update_city_store_tree(dataList)
    }

    // 编辑
    editLevel3Click = (level1_index,level2_index,level3_index) => {
        let {dataList} = this.state
        dataList = dataList.map((v,vIndex)=>({
            ...v,
            cityList: v.cityList.map((s,sIndex)=>({
                ...s,
                add_Level3_flag: false,
                cityList: s.cityList.map((t,tIndex)=>({
                    ...t,
                    editFlag: level1_index==vIndex&&level2_index==sIndex&&level3_index==tIndex?true:false
                }))
            }))
        }))
        this.setState({
            level3_value_cache:dataList[level1_index].cityList[level2_index].cityList[level3_index].name,
            dataList
        })
    }

   editLevel3Confirm = (level1_index,level2_index,level3_index,e) => {
       let {dataList,level3_value_cache} = this.state
       let newValue = level3_value_cache.trim().slice(0,12)
       dataList[level1_index].cityList[level2_index].cityList[level3_index].editFlag = false
       if(newValue!=''){
            dataList[level1_index].cityList[level2_index].cityList[level3_index].name = newValue
            this.setState({
                dataList,
                level3_value_cache: ''
            })
            const {update_city_store_tree} = this.props
            update_city_store_tree(dataList)
       }else{
           this.deleteClick(level1_index,level2_index,level3_index,e)
       }
    }

    // 删除操作
    deleteClick = (level1_index,level2_index,level3_index,e) => {
        let modalStyle = {}
        modalStyle.left = e.clientX+'px'
        modalStyle.top = e.clientY+'px'
        this.setState({
            modalStyle,
            fIndex: level1_index,
            sIndex: level2_index,
            tIndex: level3_index,
            delete_flag: true
        })
    }

    deleteCancel = () => {
        this.setState({
            fIndex: null,
            sIndex: null,
            tIndex: null,
            delete_flag: false
        })
    }

    deleteConfirm = () => {
        const {dataList,fIndex,sIndex,tIndex} = this.state
        dataList[fIndex].cityList[sIndex].cityList[tIndex].status = 3
        this.setState({
            parentIndex: null,
            currentIndex: null,
            delete_flag: false,
            dataList
        })
        const {update_city_store_tree} = this.props
        console.log(dataList)
        update_city_store_tree(dataList)
    }

    // 展开操作
    expandHandle = (parentIndex,currentIndex) => {
        let {dataList} = this.state
        if(parentIndex===null){
            // 1级展开
            dataList = dataList.map((v,vIndex)=> ({
                ...v,
                expandFlag: currentIndex==vIndex?!v.expandFlag:v.expandFlag
            }))
        }else{
            // 2级展开
            dataList = dataList.map((v,vIndex)=>({
                ...v,
                cityList: v.cityList.map((r,rIndex)=>({
                    ...r,
                    expandFlag: parentIndex==vIndex&&currentIndex==rIndex?!r.expandFlag:r.expandFlag
                }))
            }))
        }
        this.setState({dataList})
    }


    render() {
        let {dataList,delete_flag,fIndex,sIndex,tIndex,level3_value_cache,modalStyle} = this.state
        let { data,updateItem,type ,disabled} = this.props;
        // console.log(dataList)
        return (
            <div className='PageDrugstore'>
                <div className="Pagetitle">{titleMap[type]}</div>
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
                        <div className="phone-content-title">{nameMap[type]}</div>
                        <div className='TreeBox'>
                            <div className="selectHospital">
                                <div className="left">{selectMap[type]}</div>
                            </div>
                            <div className='selectHospital-content'>
                                <ul className="level1">
                                    {
                                        dataList.map((level1,level1_index) => {
                                            return (
                                                level1.selected!=0&&
                                                <li className='level1-item'>
                                                    <div className="level1-content">
                                                        <span className='expandBox' onClick={()=>{this.expandHandle(null,level1_index)}}>
                                                            <span className={level1.expandFlag?'icon-expand expanded':'icon-expand'}></span>
                                                        </span>
                                                        <span className='level1-name'>{level1.displayName}</span>
                                                    </div>
                                                    <ul className='level2' style={{height:level1.expandFlag?'auto':'0px',overflow:level1.expandFlag?'visible':'hidden'}}>
                                                        {level1.cityList.map((level2,level2_index) => {
                                                            return (
                                                                level2.selected!=0&&
                                                                <li className='level2-item'>
                                                                    <div className="level2-content">
                                                                        <span className='expandBox' onClick={()=>{this.expandHandle(level1_index,level2_index)}} style={{visibility: level2.cityList.length>0?'visible':'hidden'}}>
                                                                            <span className={level2.expandFlag?'icon-expand expanded':'icon-expand'}></span>
                                                                        </span>
                                                                        <span className='level2-name'>{level2.displayName}</span>
                                                                        <span className='icon-add' onClick={()=>{this.addLevel3Click(level1_index,level2_index)}}>
                                                                            <span className="iconTip">添加二级选项</span>
                                                                        </span>
                                                                    </div>
                                                                    <ul className="level3" style={{height:level2.expandFlag?'auto':'0px',overflow:level2.expandFlag?'visible':'hidden'}}>
                                                                        {
                                                                            level2.cityList.map((level3,level3_index)=> {
                                                                                return (
                                                                                    level3.status!=3&&
                                                                                    <li className='level3-item'>
                                                                                        <span className='level3-name'>{level3.name}</span>
                                                                                        <span className="icon-delete" onClick={(e)=>{this.deleteClick(level1_index,level2_index,level3_index,e)}}>
                                                                                            <span className="iconTip">删除</span>
                                                                                        </span>
                                                                                        <span className='icon-edit' onClick={()=>{this.editLevel3Click(level1_index,level2_index,level3_index)}}>
                                                                                            <span className="iconTip">编辑</span>
                                                                                        </span>
                                                                                        {
                                                                                            level3.editFlag
                                                                                            ?<IptBox 
                                                                                                styleClass={"iptBox level3-edit-iptBox"}
                                                                                                iptValue={level3_value_cache}
                                                                                                addConfirm={(e)=>{this.editLevel3Confirm(level1_index,level2_index,level3_index,e)}}
                                                                                                textInput={this.level3Input}
                                                                                            />:''
                                                                                        }
                                                                                    </li>
                                                                                )
                                                                            })
                                                                        }
                                                                        {
                                                                            level2.add_Level3_flag
                                                                            ?<IptBox 
                                                                                styleClass={"iptBox level3-add-iptBox"}
                                                                                addConfirm={()=>{this.addLevel3Confirm(level1_index,level2_index)}}
                                                                                textInput={this.level3Input}
                                                                            />:''
                                                                        }
                                                                    </ul>
                                                                </li>
                                                            )
                                                        })}
                                                    </ul>
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                            </div>
                        </div>
                        <ModalBox
                            modalStyle={modalStyle}
                            modalStatus={delete_flag}
                            modalTxt={'确定要删除此项吗？'}
                            confirmTxt={'删除'}
                            closeModalFunc={this.deleteCancel}
                            confirmFunc={this.deleteConfirm}
                            isDelete={true}
                        />
                    </div>
                </div>
            </div>
        )
    }
}
