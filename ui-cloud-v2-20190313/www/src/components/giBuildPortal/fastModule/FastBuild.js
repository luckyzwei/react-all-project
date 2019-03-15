import React,{Component} from 'react'
import {API_PATH} from '../../../constants/OriginName'
import AuthProvider from '../../../funStore/AuthProvider'
import promiseXHR from '../../../funStore/ServerFun'
import {sendEvent} from '../../../funStore/CommonFun'
import Step2Fast from './Step2'
import ResultPage from '../accurateModule/ResultPage'
import {SaveFail} from '../SaveFail'

export default class FastBuild extends Component {
    constructor(props){
        super(props)
        this.state = {
            isSuccess: false,
            templateId:'',
            step: 1
        }
    }
    // setSuccess= (status)=>{
    //     this.setState({
    //         isSuccess: status
    //     },()=>{
    //         this.props.nextStep(true)
    //     })
        
    // }
    setTemplateId = (id,qrUrl,status) => {
        this.setState({
            templateId: id,
            qrUrl,
            isSuccess: status,
            step: this.state.step+1
        })
        this.props.setPromptFlagHandle(false)
    }
    nextStep = (flag)=> {
        this.setState({
            step: flag?this.state.step + 1:this.state.step - 1
        })
    }
    render(){
        const {isSuccess,templateId,qrUrl,step} = this.state
        const {selectType,cancelBuild,actions} = this.props
        // console.log(step)
        let view
        switch (step) {
            case 1:
                view = <Step2Fast setTemplateId={this.setTemplateId} nextStep={this.nextStep} selectType={selectType} templateId={templateId}/>
                break;
            case 2:
                view = isSuccess
                        ?<ResultPage 
                            actions={actions}
                        />
                        :<SaveFail 
                            cancelBuild={cancelBuild}
                            nextStep={this.nextStep}
                        />
                break;
        }
        return view
    }
}
