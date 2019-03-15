import React,{Component} from 'react'

const nameMap = {
    'RECOMMENDATION_CODE':'输入推荐码',
    'CUSTOM_INPUT': '自定义输入框'
}

export default class InputRule extends Component {
    constructor(props){
        super(props)
        this.state = {
            value : props.item.values[0].displayValue
        }
    }
    iptCode = (e) => {
        const {item} = this.props
        this.setState({
            value: e.target.value
        })
        let value = [
            {
                "displayEndValue": null,
                "displayStartValue": null,
                "displayValue": e.target.value,//显示值
                "endValue": null,
                "startValue": null,
                "type": 0, //0--单值 1--区间值 2--散列值 ,
                "value": e.target.value //参数值
              }
        ]
        this.props.updateRules(item.optionCode,value,item._type)
    }
    render(){
        const {value} = this.state
        const {item,disabled} = this.props
        return (
            <div className='city-InGroupRuleRow city-border'>
                <div className="city-InGroupRuleRow-header">
                    <div className="left">
                        {/* {item.isMandatory?<span className='redTxt'>*</span>:''} */}
                        {nameMap[item.optionCode]}
                    </div>
                </div>
                <div className="city-InGroupRuleRow-content">
                    <input placeholder='请输入' value={value} onChange={this.iptCode} className='city-InGroupRuleRow-content-ipt' disabled={disabled}/>
                </div>
            </div>
        )
    }
}