import React,{Component} from 'react'
import LoadingAnimationS from '../../shareComponent/LoadingAnimationS'
import { API_PATH } from '../../../constants/OriginName';
import AuthProvider from '../../../funStore/AuthProvider';
import promiseXHR from '../../../funStore/ServerFun';
import BuildRule from './BuildRule'

export default class EditRule extends Component {
    constructor(props){
        super(props)
        this.state = {
            templateData:null,
            pageLoading: true,
            step: 1,
            isSuccess: false,
            cacheRuleData: []
        }
    }
    componentDidMount(){
        this.getTemplateData()
    }
    getTemplateData = () => {
        const url = `${API_PATH}/groupadmin-api/authsec/group/join/template/detail?_templateId=${this.props.templateId}`
        AuthProvider.getAccessToken()
        .then((resolve,reject)=>{
            return promiseXHR(url,{type:'Bearer',value:resolve},null,'get')
        }).then(res => {
            const resData = JSON.parse(res)
            if(resData.resultCode==100){
                this.setState({
                    templateData:resData.resultContent,
                    pageLoading: false
                })
            }else{
                throw '获取模板详情失败'
            }
        }).catch(err => {
            console.log(err)
        })
    }
    nextStep = (flag)=> {
        this.props.actions.goTo('/v2/GTScope')
    }
    setparamsHandle=(k,v,status,ruleData)=>{
        this.setState({
            isSuccess: status,
            step: this.state.step+1,
            cacheRuleData: ruleData
        })
    }
    render(){
        const {templateData,pageLoading,step,isSuccess,cacheRuleData} = this.state
        const {selectType,actions,changeWhen} = this.props
        return (
            pageLoading
            ?<LoadingAnimationS />
            :<BuildRule viewType={'EDIT'}  setparamsHandle={this.setparamsHandle} templateData={templateData} nextStep={this.nextStep} cacheRuleData={cacheRuleData} changeWhen={changeWhen}/>
        )
    }
}