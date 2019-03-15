import React,{Component} from 'react'
import Step1Accurate from './Step2'
import Step2Accurate from './Step3'
// import Step4Accurate from './Step4'
// import Step5Accurate from './Step5'
import {SaveFail} from '../SaveFail'
// import {API_PATH} from '../../../constants/OriginName'
// import AuthProvider from '../../../funStore/AuthProvider'
// import promiseXHR from '../../../funStore/ServerFun'
// import {sendEvent} from '../../../funStore/CommonFun'
import ResultPage from './ResultPage'

export default class AccurateBuild extends Component {
    constructor(props){
        super(props)
        this.state = {
            isSuccess: false,
            joinGroupRuleId: "",//精准入群 缓存规则id 参数重置
            templateData:{
                "backgroundPicUrl": 'http://saas-1252311027.cossh.myqcloud.com/cloud/images/bg/phongbg.png',//背景图
                "id": null,// 模板库的id
                "name": "",// 模板库name
                "groupCount": 1,//1 
                "template": {
                    "code": "H5_JG_RULE",
                    "id": null,
                    "name": "",//模板库name
                    "templateItems": [],//模板元素
                    "type": 0,
                    "status": 1 //状态 1--正常 2--停用 3--删除 默认值为1 ,
                },
                "type": 5
            },
            step: 1,
            cacheRuleData: []
        }
    }
    nextStep = (flag)=> {
        this.setState({
            step: flag?this.state.step + 1:this.state.step - 1
        })
    }
    setSuccess= (status,ruleData)=>{
        this.setState({
            isSuccess: status,
            step: this.state.step+1,
            cacheRuleData: ruleData
        })
        this.props.setPromptFlagHandle(false)
    }
    setData = (k,v,status,ruleData) => {
        // 设置data
        let params = {}
        params[k] = v
        this.setState(params,()=>{
            if(k=='templateData'){
                this.nextStep(true)
            }
            if(k=='joinGroupRuleId'){
                this.setSuccess(status,ruleData)
            }
        })
    }

    render(){
        const {isSuccess,templateData,step,cacheRuleData} = this.state
        const {selectType,cancelBuild,actions} = this.props
        let view
        switch (step) {
            case 1:
                view = <Step1Accurate setparamsHandle={this.setData} viewType={'ADD'} nextStep={this.nextStep} templateData={templateData} selectType={selectType} />
                break;
            case 2: 
                view = <Step2Accurate setparamsHandle={this.setData} viewType={'ADD'} templateData={templateData} nextStep={this.nextStep} cacheRuleData={cacheRuleData}/>
                break;
            case 3:
                view = isSuccess
                        ?<ResultPage actions={actions}/>
                        :<SaveFail 
                            cancelBuild={cancelBuild}
                            nextStep={this.nextStep}
                        />
                break;
        }
        return view
    }
}