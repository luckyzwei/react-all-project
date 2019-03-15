import React,{Component} from 'react'
import EditFast from './EditFast'
import EditAccurate from './EditAccurate'
import LoadingAnimationS from '../../shareComponent/LoadingAnimationS'
import { timingSafeEqual } from 'crypto';
import { API_PATH } from '../../../constants/OriginName';
import AuthProvider from '../../../funStore/AuthProvider';
import promiseXHR from '../../../funStore/ServerFun';

export default class EditPage extends Component {
    constructor(props){
        super(props)
        this.state = {
            pageLoading: true,
            templateData: null
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
    backHandle = () => {
        this.props.actions.goTo('/v2/GTScope')
    }
    render(){
        const {pageLoading,templateData} = this.state
        const {actions,templateId,changeWhen} = this.props
        return (
            pageLoading
            ?<LoadingAnimationS />
            :templateData.type==4
            ?<EditFast templateData={templateData} changeWhen={changeWhen} selectType={this.backHandle}/>
            :<EditAccurate templateData={templateData} changeWhen={changeWhen} selectType={this.backHandle}/>
        )
    }

}