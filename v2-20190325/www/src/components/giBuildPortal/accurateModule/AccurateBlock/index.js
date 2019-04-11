/**
 * 创建时间:2018-08-29 17:24:25
 * 作者：sufei  Xerath
 * 邮箱：fei.su@gemii.cc
 * 版本号：1.0
 * @版权所有
 **/
import React, { Component } from 'react'
import './index.css'
import AuthProvider from '../../../../funStore/AuthProvider'
import promiseXHR from '../../../../funStore/ServerFun'
import {API_PATH} from '../../../../constants/OriginName'
import {sendEvent} from '../../../../funStore/CommonFun'

const changeType = (v,modalType) => {
    switch (modalType) {
        case 'city':
            return v.code == 'H5_FORM_TITLE'
            ||v.code == 'SUBMIT'
            ||v.code == 'TERMS'
            ||v.code == 'CITY'
            break;
        case 'store':
            return v.code == 'H5_FORM_TITLE'
            ||v.code == 'SUBMIT'
            ||v.code == 'TERMS'
            ||v.code == 'CITY'
            ||v.code == 'STORE'
            break;
        case 'dueDate':
            return v.code == 'H5_FORM_TITLE'
            ||v.code == 'CITY'
            ||v.code == 'EXPECTED_DATE'
            ||v.code == 'SUBMIT'
            ||v.code == 'TERMS'
            ||v.code == 'PHONE'
            break;
        default:   
            return v.code == 'DESCRIPTION'
            ||v.code == 'H5_FORM_TITLE'
            ||v.code == 'SUBMIT'
            ||v.code == 'TERMS'
            ||v.code == 'PHONE'
            ||v.code == 'CITY'
            break;
    }
}

export default class AccurateBlock extends Component {
    constructor() {
        super();
        this.state = {
            templateItemsSet: []
        }
    }
    componentWillMount() {
        // 根据类型获取模板元素 
        const url = `${API_PATH}/groupadmin-api/authsec/group/join/template/type/items?_type=4`
        AuthProvider.getAccessToken().then((reslove,reject)=> {
            return promiseXHR(url ,{type:'Bearer',value:reslove},null,'get')
        }).then(res => {
            const resData = JSON.parse(res)
            const {params} = this.props
            if(resData.resultCode==100){
                let templateItemsSet = []
                // 模板初始化设置 初始设置 非 活动说明，标题，提交，协议； 添加 mandatory字段： 0可选，1必填
                templateItemsSet = resData.resultContent.map(v => {
                    if(params.id){
                        return params.template.templateItems.find(i => i.code==v.code)
                        ?{...v,selected:true,isError: false,mandatory:0}
                        :{...v,selected:false,isError: false,mandatory:0}
                    }else{
                        return changeType(v,this.props.modalType)
                        ?{...v,selected:true,isError: false,mandatory:0}
                        :{...v,selected:false,isError: false,mandatory:0}
                    }
                })
                this.props.modalType=='dueDate'&&(templateItemsSet.find(v => v.code == 'EXPECTED_DATE').label = '预产期')
                this.setState({
                    templateItemsSet
                })
                this.props.initTemplateItem(templateItemsSet)
            }else{
                throw '获取模板元素失败'
            }
        }).catch(err => {
            console.log(err)
        })
    }
    componentWillReceiveProps(nextProps){
        if(this.props.params.id!=nextProps.params.id){
            let templateItemsSet = this.state.templateItemsSet
            templateItemsSet = templateItemsSet.map(v => {
                return nextProps.params.template.templateItems.find(i => i.code==v.code)?{
                    ...v,
                    selected: true
                }:{
                    ...v,
                    selected: false
                }
            })
            this.setState({templateItemsSet})
        }
    }
    clickHandle=(item)=>{
        let {templateItemsSet} = this.state
        let {disabled} = this.props
        if(disabled) return
        let sortItems = templateItemsSet.filter(v => v.code !='DESCRIPTION'&&v.code !='H5_FORM_TITLE'&&v.code !='SUBMIT'&&v.code != 'TERMS'&&v.selected)
        if(sortItems.length<4||item.selected||item.code == 'DESCRIPTION'||item.code == 'H5_FORM_TITLE'||item.code == 'SUBMIT'||item.code == 'TERMS'){
            // 最多只有4个元素
            let {setparamsHandle} = this.props
            templateItemsSet = templateItemsSet.map(v => {
                return v.id == item.id?{
                    ...v,
                    selected: !v.selected
                }:v
            })
            this.setState({templateItemsSet})
            setparamsHandle(item)
        }else{
            sendEvent('message', {
                txt: "最多只能添加4个输入模块",
                code: 1003
            })
        }
        
    }
    render() {
        let { templateItemsSet} = this.state;
        let {setparamsHandle,disabled} = this.props
        return (
            <div className="AccurateBlockBox">
                <div className='AccurateBlock'>
                    {
                        templateItemsSet.map((item, index) => {
                            return (
                                item.code=='SUBMIT'
                                ?null
                                :<div className={`AccurateBlockItem ${item.selected?'active':'normal'} ${disabled?'disabled':''}`} key={index} onClick={()=>{this.clickHandle(item)}}>
                                    {item.name}
                                    <span className='icon-check'></span>
                                </div>
                            )
                        })
                    }
                </div>
                {/* <div className="tips">
                    小提示：点击左图“模版预览”中的任何功能模块都能及时编辑的哦～
                </div> */}
            </div>

        )
    }
}
