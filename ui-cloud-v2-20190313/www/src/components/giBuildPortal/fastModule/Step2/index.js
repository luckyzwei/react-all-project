import React,{Component} from 'react'
import './index.css'
import PrevieBox from '../PreviewBox'
import EditBox from '../EditBox'
import AuthProvider from '../../../../funStore/AuthProvider'
import {API_PATH} from '../../../../constants/OriginName'
import promiseXHR from '../../../../funStore/ServerFun'


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
// const paramsInit = {
//     "backgroundPicUrl": "",//背景图
//     "id": null,// 模板库的id
//     "name": "快速入群模板5"+Math.random(),// 模板库name
//     "groupCount": 400,
//     "template": {
//         "code": "H5_JG_RULE",
//         "id": null,
//         "name": "快速入群模板5"+Math.random(),//模板库name
//         "templateItems": [],//模板元素
//         "type": 0,
//         "status": 1 //状态 1--正常 2--停用 3--删除 默认值为1 ,
//     },
//     "type": 4
// }

export default class Step2 extends Component {
    constructor(props){
        super(props)
        this.state = {
            params: {
                "backgroundPicUrl": "http://saas-1252311027.cossh.myqcloud.com/cloud/images/bg/phongbg.png",//背景图
                "id": null,// 模板库的id
                "name": '',// 模板库name
                "groupCount": 1,
                "template": {
                    "code": "H5_JG_RULE",
                    "id": null,
                    "name": '',//模板库name
                    "templateItems": [],//模板元素
                    "type": 0,
                    "status": 1 //状态 1--正常 2--停用 3--删除 默认值为1 ,
                },
                "type": 4
            },
            pageNo: 1,
            groupParams: {
                "createGroupNum": 1,
                "groupName": "",
                "initIndexNum": 1,
                "introduce": "",
                "joinGroupTemplateId": ""
            }
        }
    }
    componentDidMount() {
        // 根据类型获取模板元素 
        if(this.props.templateId){
            this.getTemplateData(this.props.templateId)
            return
        }
        const url = `${API_PATH}/groupadmin-api/authsec/group/join/template/type/items?_type=3`
        AuthProvider.getAccessToken().then((reslove,reject)=> {
            return promiseXHR(url ,{type:'Bearer',value:reslove},null,'get')
        }).then(res => {
            const resData = JSON.parse(res)
            if(resData.resultCode==100){
                // 模板初始化设置 初始设置 非 活动说明，标题，提交，协议； 添加 mandatory字段： 0可选，1必填
                let templateItemsSet = resData.resultContent.map((v,i) => {
                    return {
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
                })
                let params = this.state.params
                params.template.templateItems = templateItemsSet
                this.setState({params})
            }else{
                throw '获取模板元素失败'
            }
        }).catch(err => {
            console.log(err)
        })
    }
    getTemplateData = (id) => {
        const url = `${API_PATH}/groupadmin-api/authsec/group/join/template/detail?_templateId=${id}`
        AuthProvider.getAccessToken()
        .then((resolve,reject)=>{
            return promiseXHR(url,{type:'Bearer',value:resolve},null,'get')
        }).then(res => {
            const resData = JSON.parse(res)
            if(resData.resultCode==100){
                this.setState({params:resData.resultContent})
            }else{
                throw '获取模板详情失败'
            }
        }).catch(err => {
            console.log(err)
        })
    }
    setParamsHandle = (k,v)=>{
        let params = this.state.params
        params[k] = v
        this.setState({params})
    }
    updateParams = (newP)=>{
        this.setState({
            params:newP
        })
    }
    setPageNo = (pageNo) =>{
        this.setState({pageNo})
    }
    setGroupParamsHandle = (k,v) =>{
        let {groupParams} = this.state
        groupParams[k] = v
        this.setState({groupParams})
    }
    render(){
        const {params,pageNo,groupParams} = this.state
        const {setTemplateId,isEdit,showHandle,nextStep,actions,selectType} = this.props
        // console.log(params)
        return (
            <div className="gi-fast-step2">
                <div className="inner">
                    <div className="stepTitle">
                        <span className='done'>1.设置入群H5页面</span>
                        <span className={pageNo==2?'done':'todo'} style={{margin:'0 12px'}}>></span>
                        <span className={pageNo==2?'done':'todo'}>2.设置群信息</span>
                    </div>
                    <div className="left">
                        <PrevieBox params={params} templateItems={params.template.templateItems} pageNo={pageNo} groupParams={groupParams}/>
                    </div>
                    <div className="right">
                        <div className="bottom">
                            <h4>说明</h4>
                            <p>1.左侧为展示给用户的效果图，图中二维码为示意图，访问H5时将展示真实群二维码。</p>
                            <p>2.当群人数不满100人时，用户访问页面一，直接扫描群二维码入群。</p>
                            <p>3.当群人数超过100人时，用户访问页面二，添加智能拉群助手为好友，由拉群助手拉入群内。</p>
                            <p>4.当一个群的入群人数到达上限后，将自动替换群。</p>
                        </div>
                        <EditBox 
                            params={params}
                            setParamsHandle={this.setParamsHandle}
                            updateParams={this.updateParams}
                            setTemplateId={setTemplateId}
                            isEdit={isEdit}
                            showHandle={showHandle}
                            nextStep={nextStep}
                            pageNo={pageNo}
                            setPageNo={this.setPageNo}
                            groupParams={groupParams}
                            setGroupParamsHandle={this.setGroupParamsHandle}
                            actions={actions}
                            selectType={selectType}
                        />
                    </div>
                </div>
                
            </div>
        )
    }
}