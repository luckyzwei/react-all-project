import React,{Component} from 'react'

const nameMap = {
    'EXPECTED_DATE':'日期',
    'CUSTOM_DATE': '日期',
    'CITY': '城市',
    'STORE': '门店',
    'RECOMMENDATION_CODE':'推荐码',
    'CUSTOM_INPUT': '输入框',
    'CUSTOM_SELECT': '下拉框'
}

const TreeRule = ({rule,allrule}) =>{
    let cityRuleValue = allrule.find(v => v.optionCode=='CITY')
    return (
        <div className="ruleItem">
            <div className="ruleName">{nameMap[rule.optionCode]}</div>
            <div className="ruleValue">
                {
                    rule.values.filter(v => rule.optionCode=='STORE'?!cityRuleValue.values.find(r => r.value==v.value):true).map((v,i,a) => {
                        return i==a.length-1?v.displayValue:v.displayValue+'、 '
                    })
                }
            </div>
        </div>
    )
}

const InputRule = ({rule,allrule}) =>{
    return (
        <div className="ruleItem">
            <div className="ruleName">{nameMap[rule.optionCode]}</div>
            <div className="ruleValue">
                {rule.values[0].displayValue}
            </div>
        </div>
    )
}

const TimeRule = ({rule,allrule}) => {
    return (
        <div className="ruleItem">
            <div className="ruleName">{nameMap[rule.optionCode]}</div>
            <div className="ruleValue">
                {
                   rule.values[0].displayStartValue+'-'+rule.values[0].displayEndValue
                }
            </div>
        </div>
    )
}

export default class RulePreviewModal extends Component {
    render(){
        const {groupRuleData,closeHandle} = this.props
        return (
            <div className="modalWrapper" onClick={(e)=>{e.stopPropagation();}}>
                <div className="modalBox rulePreviewBox">
                    <div className="titleBox">入群规则</div>
                    <div className="ruleBox">
                        {
                            groupRuleData.groupRule.gmJgRuleItems.map((v,i,a) => {
                                return (
                                    ['EXPECTED_DATE','CUSTOM_DATE'].includes(v.optionCode)
                                    ?<TimeRule rule={v} allrule={a}/>
                                    :['CUSTOM_INPUT','RECOMMENDATION_CODE'].includes(v.optionCode)
                                        ?<InputRule rule={v} allrule={a}/>
                                        :<TreeRule rule={v} allrule={a}/>
                                )
                            })
                        }
                    </div>
                    <div className="closeBtn" onClick={closeHandle}></div>
                </div>
            </div>
        )
    }
}