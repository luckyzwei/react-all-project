import React,{Component} from 'react'
import './index.css'
import SelectBox from '../../../shareComponent/SelectBox'
import AidCard from '../AidCard'
import {sendEvent} from '../../../../funStore/CommonFun'

export default class Step2 extends Component {
    constructor(props){
        super(props)
    }
    verifyHandle = () => {
        const {params,nextStep} = this.props
        if(params.addRobotRole==''||params.robotHostId==''){
            sendEvent('message', {txt: "信息不完整，请补全信息后重新提交",code: 1003})
            return
        }
        nextStep(true)
    }
    selectRobot = (data) => {
        const {params,setparamsHandle} = this.props
        if(data.status){
            setparamsHandle('addRobotRole',params.addRobotRole+data.name)
        }else{
            setparamsHandle('addRobotRole',params.addRobotRole.replace(data.name,''))
        }
    }
    render(){
        const {robotNames,params,setparamsHandle,nextStep} = this.props
        const selectOption = robotNames.map(v => v.wechatName)
        const paramaValue = robotNames.map(v => v.id)
        return (
            <div className="gi-manual-step2">
                <div className="inner">
                    <div className="row">
                        <SelectBox
                            selectLabel={"托管群主："}
                            placeholder={"请选择"}
                            selectOption={selectOption}
                            paramName={'robotHostId'}
                            paramaValue={paramaValue}
                            setparamsHandle={setparamsHandle}
                            paramDefault= {
                                paramaValue.indexOf(params.robotHostId)!=-1?{
                                    id: paramaValue.indexOf(params.robotHostId),
                                    name: selectOption[paramaValue.indexOf(params.robotHostId)],
                                }:undefined
                            }
                        />
                    </div>
                    <div className="row">
                        <div className="label">选择群助手：</div>
                        <AidCard
                            AidName={"A"}
                            AidStatus={params.addRobotRole.includes('A')}
                            AidClass={"service"}
                            AidFunc={this.selectRobot}
                        />
                        <AidCard
                            AidName={"C"}
                            AidStatus={params.addRobotRole.includes('C')}
                            AidClass={"holding"}
                            AidFunc={this.selectRobot}
                        />
                        <AidCard
                            AidName={"B"}
                            AidStatus={params.addRobotRole.includes('B')}
                            AidClass={"putting"}
                            AidFunc={this.selectRobot}
                        />
                    </div>
                    <div className="nextStep" onClick={this.verifyHandle}>下一步</div>
                </div>
            </div>
        )
    }
}