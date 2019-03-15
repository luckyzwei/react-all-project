import React,{Component} from 'react'
import BuildRule from '../accurateModule/Step3'
import {SaveFail} from '../SaveFail'
import ResultPage from '../accurateModule/ResultPage'

export default class AccurateEditBuild extends Component {
    constructor(props){
        super(props)
        this.state = {
            templateData:props.selectTemplateData,
            step: 1,
            isSuccess: false,
            cacheRuleData: []
        }
    }
    nextStep = (flag)=> {
        if(this.state.step==1){
            this.props.selectType('SELECT')
        }else{
            this.setState({
                step: flag?this.state.step + 1:this.state.step - 1
            })
        }
    }
    setparamsHandle=(k,v,status,ruleData)=>{
        this.setState({
            isSuccess: status,
            step: this.state.step+1,
            cacheRuleData: ruleData
        })
        this.props.setPromptFlagHandle(false)
    }
    render(){
        const {templateData,step,isSuccess,cacheRuleData} = this.state

            // <BuildRule viewType={'EDIT'} setparamsHandle={this.setparamsHandle} templateData={templateData} nextStep={this.nextStep}/>
  
        const {selectType,cancelBuild,actions} = this.props
        let view
        switch (step) {
            case 1: 
                view = <BuildRule viewType={'EDIT'}  setparamsHandle={this.setparamsHandle} templateData={templateData} nextStep={this.nextStep} cacheRuleData={cacheRuleData}/>
                break;
            case 2:
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