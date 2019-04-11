import React,{Component} from 'react'
import ButtonBox from '../../../shareComponent/ButtonBox'
import promiseXHR from '../../../../funStore/ServerFun'
import AuthProvider from '../../../../funStore/AuthProvider'
import {API_PATH} from '../../../../constants/OriginName'
import {textCountIndex,sendEvent} from '../../../../funStore/CommonFun'

const addMap = {
    1:'添加目录',
    2:'添加二级类目',
    3:'添加三级类目'
}

const editMap = {
    1:'编辑目录',
    2:'编辑二级类目',
    3:'编辑三级类目'
}

export default class AddCateGory extends Component {
    constructor(props){
        super(props)
        this.state ={
            params:{
                "className": props.item.className,
                "type": 1, //1,2,3
                "parentId": null
            },
            submiting: false
        }
    }
    categoryInput = (e)=> {
        // 目录名输入
        let value = e.target.value.trim()
        let textIndex = textCountIndex(value,8)
        value = value.slice(0,textIndex)
        this.setItemParams('className',value)
    }
    setItemParams = (k,v) => {
        let {params} = this.state
        params[k] = v
        this.setState({params})
    }
    addCategoryItem = (type,id,parentId) => {
        // 有id 编辑，无id新增
        let {params,submiting} = this.state
        if(params.className===''||submiting) return
        this.setState({submiting: true})
        sendEvent('message', {txt: `正在努力${id?'编辑':'创建'}目录中，请稍后~`, code: 1001, timer:60000})
        params.type = type
        params.parentId = parentId
        let url = id?`${API_PATH}/knowledge-base/authsec/class/${id}`:`${API_PATH}/knowledge-base/authsec/class`
        AuthProvider.getAccessToken().then((resolve,reject)=>{
            return promiseXHR(url,{type:'Bearer',value:resolve},params,id?'PUT':'POST')
        }).then(res => {
            const resData = JSON.parse(res)
            if(resData.resultCode=='100'){
                this.setState({
                    params:{
                        "className": "",
                        "type": 1, //1,2,3
                        "parentId": null
                    },
                    submiting: false
                })
                sendEvent('message', {txt: `${id?'编辑':'创建'}目录成功~`, code: 1000})
                this.updateCategoryItem(type,id,parentId,resData.resultContent)
            }else{
                this.setState({
                    submiting: false
                })
                sendEvent('message', {txt: `目录已存在`, code: 1004})
            }
        }).catch(err => {
            this.setState({
                submiting: false
            })
            sendEvent('message', {txt: `${id?'编辑':'创建'}目录失败`, code: 1004})
        })
    }
    updateCategoryItem=(type,id,parentId,newItem)=> {
        // 更新目录表
        let data = this.props.data
        let newData = {
            "className": newItem.className,
            "id": newItem.id,
            "parentId": newItem.parentId,
            "firstClass": [],
            "firstCount": 0
        }
        if(id==null){
            // 新增
            if(type==1){
                // 1级新增
                data.splice(data.length - 1, 0, newData)
            }else if(type==2){
                // 2级新增
                data.forEach((v,i) => {
                    if(v.id==parentId){
                        v.thirdClass.push(newData)
                    }
                });
            }else {
                // 3级新增
                data.forEach((v,i)=>{
                    v.thirdClass.forEach((r,i)=>{
                        if(r.id==parentId){
                            r.thirdClass.push(newData)
                        }
                    })
                })
            }
        }else{
            // 编辑
            if(type==1){
                // 1级编辑
                data = data.map((v,i)=>{
                    return v.id == newData.id?{
                        ...v,
                        className: newData.className
                    }:v
                })
            }else if(type==2){
                // 2级编辑
                data = data.map((v,i)=>{
                    return {
                        ...v,
                        thirdClass:v.id==newData.parentId?v.thirdClass.map((r,i)=>{
                            return r.id == newData.id?{
                                ...r,
                                className: newData.className
                            }:r
                        }):v.thirdClass
                    }
                })
            }else {
                // 3级编辑
                data.forEach(v => {
                    v.thirdClass = v.thirdClass.map((r,i)=>{
                        return {
                            ...r,
                            thirdClass:r.id==newData.parentId?r.thirdClass.map((m,i)=>{
                                return m.id==newData.id?{
                                    ...m,
                                    className: newData.className
                                }:m
                            }):r.thirdClass
                        }
                    })
                });
            }
        }
        this.props.setCategoryList(data)
        this.props.hideHandle()
    }
    render(){
        const {params} = this.state
        const {hideHandle,editFlag,editLevel,item,parentId,data} = this.props
        return (
            <div className='modalWrapper'>
                <div className="modalBox addBox">
                    <div className="header">{editFlag=='ADD'?addMap[editLevel]:editMap[editLevel]}</div>
                    <div className="addArea">
                        <div className="row">
                            <span className="label">目录名称：</span>
                            <input type="text" placeholder='创建一个目录名称吧' value={params.className} onChange={this.categoryInput}/>
                        </div>
                        <ButtonBox
                            btnTxt={"创建"}
                            btnStyle={{
                                margin: '46px auto'
                            }}
                            btnFunc={() => {
                                this.addCategoryItem(editLevel,item.id,parentId)
                            }}
                        />
                    </div>
                    <div className="closeBtn" onClick={hideHandle}></div>
                </div>
            </div>
        )
    }
}