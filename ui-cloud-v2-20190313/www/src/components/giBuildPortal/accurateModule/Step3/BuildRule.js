import React,{Component} from 'react'
import './index.css'
import DateRule from './DateRule'
import TreeRule from './TreeRule'
import InputRule from './InputRule'

const component = (item,updateRules,updateRangeRules,allItems,dataCache,dataCacheHandle,currentIndex,disabled,ruleDataLength) => {
    console.log(allItems,'******')
    switch (item.optionCode) {
        // case 'SUBMIT':
        //     // 提交按钮 
        // case 'H5_FORM_TITLE':
        //     // 标题设置
        // case 'TERMS':
        //     // 协议条款
        // case 'DESCRIPTION':
        //     // 活动规则
        case 'EXPECTED_DATE':
            // 日期设置
            return <DateRule key={item.optionCode+currentIndex+ruleDataLength} item={item} updateRangeRules={updateRangeRules} disabled={disabled}/>
        case 'CUSTOM_DATE':
            // 日期设置
            return <DateRule key={item.optionCode+currentIndex+ruleDataLength} item={item} updateRangeRules={updateRangeRules} disabled={disabled}/>
        case 'CITY':
            // 城市设置
            let selectedKeysCITY = allItems.find(v => v.optionCode=='CITY').values.filter(v => v.errorFlag).map(v => v.value+'|'+v.displayValue)
            return <TreeRule key={item.optionCode+currentIndex+ruleDataLength} item={item} updateRules={updateRules} allItems={allItems} dataCache={dataCache} dataCacheHandle={dataCacheHandle} selectedKeys={selectedKeysCITY} disabled={disabled}/>
        // case 'PHARMACY':
        //     // 药店设置
        //     return <TreeRule key={item.optionCode} item={item} updateRules={updateRules} allItems={allItems}/>
        // case 'HOSPITAL':
        //     // 医院设置
        //     return <TreeRule key={item.optionCode} item={item} updateRules={updateRules} allItems={allItems}/>
        case 'STORE':
            // 门店设置
            let selectedKeysSTORE = allItems.find(v => v.optionCode=='STORE').values.filter(v => v.errorFlag).map(v => v.value+'|'+v.displayValue)
            return <TreeRule key={item.optionCode+currentIndex+ruleDataLength} item={item} updateRules={updateRules} allItems={allItems} dataCache={dataCache} dataCacheHandle={dataCacheHandle} selectedKeys={selectedKeysSTORE} disabled={disabled}/>
        // case 'CLASS':
        //     // 班级设置 自定义下拉框
        //     return <TreeRule key={item.optionCode} item={item} updateRules={updateRules}/>
        // case 'CHANNEL':
        //     // 渠道设置 自定义下拉框
        //     return <TreeRule key={item.optionCode} item={item} updateRules={updateRules}/>
        // case 'PHONE':
        case 'RECOMMENDATION_CODE':
            // 推荐设置 自定义输入框
            return <InputRule key={item.optionCode+currentIndex+ruleDataLength} item={item} updateRules={updateRules} disabled={disabled}/>
        case 'CUSTOM_INPUT':
            // 自定义
            return <InputRule key={item.optionCode+currentIndex+ruleDataLength} item={item} updateRules={updateRules} disabled={disabled}/>
        case 'CUSTOM_SELECT':
            // 自定义
            let selectedKeysCUSTOM_SELECT = allItems.find(v => v.optionCode=='CUSTOM_SELECT').values.filter(v => v.errorFlag).map(v => v.value+'|'+v.displayValue)
            return <TreeRule key={item.optionCode+currentIndex+ruleDataLength} item={item} updateRules={updateRules} allItems={allItems} dataCache={dataCache} dataCacheHandle={dataCacheHandle} selectedKeys={selectedKeysCUSTOM_SELECT} disabled={disabled}/>
        default: return ''
    }
} 

// const item = {
//     _id: "abb6bcd6-1d7f-44d5-a134-dc7d8805f31d",
//     _type: 1,
//     _value: "8a51f94a-1c6b-422d-a846-793ef9715959",
//     isMandatory: 1,
//     optionCode: "CUSTOM_SELECT",
//     optionId: "17dab573-13e6-11e9-9e3c-0257d6c27a22",
//     optionName: "自定义下拉框",
//     optionValueType: 0,
//     values: []
// }


// const item = {
//     _id: "9c41df4e-4495-4e52-94d9-35af25f31a29",
//     _type: 2,
//     isMandatory: 1,
//     optionCode: "EXPECTED_DATE",
//     optionId: "c9429190-4f40-11e7-ae20-00155d000b01",
//     optionName: "预产期",
//     optionValueType: 1,
//     values: [{
//         displayValue: null,
//         type: 1,
//         value: null,
//     }]
// }

const nameMap = {
    'EXPECTED_DATE':'日期',
    'CUSTOM_DATE': '日期',
    'CITY': '城市',
    'STORE': '门店',
    'CLASS': '班级',
    'CHANNEL': '渠道',
    'RECOMMENDATION_CODE':'推荐码',
    'CUSTOM_INPUT': '输入框',
    'CUSTOM_SELECT': '下拉框'
}

export default class BuildRule extends Component {
    constructor(props){
        super(props)
        this.state = {
            tabIndex: 0,
            currentIndex: -1,
            selectItem: {}
        }
    }
    componentDidMount(){
        if(this.props.ruleData.length>0){
            // 如果群长度没有发生变化，并且选中的群位置发生改变，说明需要把规则tab置为0
            let currentIndex = this.props.ruleData.findIndex(v => v.selected)
            if(currentIndex!=-1){
                // 切换默认值
                let hasStore = this.props.ruleData[currentIndex].groupRule.gmJgRuleItems.find(v => v.optionCode=='STORE')?true:false
                let selectItem
                if(hasStore){
                    // 如果有门店，选择非城市第一个
                    selectItem = this.props.ruleData[currentIndex].groupRule.gmJgRuleItems.find(v => v.optionCode!='CITY')
                }else{
                    // 如果没有门店，选择第一个
                    selectItem = this.props.ruleData[currentIndex].groupRule.gmJgRuleItems[0]
                    selectItem = selectItem?selectItem:{optionCode:'PHONE'}
                }
                this.setState({
                    tabIndex: selectItem.optionCode,
                    selectItem: selectItem,
                    currentIndex: currentIndex
                })
            }
        }
    }
    shouldComponentUpdate(nextProps,nextState){
        if((this.props.ruleData.length==nextProps.ruleData.length)||(this.props.ruleData.length==0&&nextProps.ruleData.length>0)){
            // 如果群长度没有发生变化，并且选中的群位置发生改变，说明需要把规则tab置为0
            let currentIndex = this.props.ruleData.findIndex(v => v.selected)
            let nextIndex = nextProps.ruleData.findIndex(v => v.selected)
            if((currentIndex!=nextIndex)||(currentIndex!=-1&&!this.state.selectItem.optionCode)){
                // 切换默认值
                let hasStore = nextProps.ruleData[nextIndex].groupRule.gmJgRuleItems.find(v => v.optionCode=='STORE')?true:false
                let selectItem
                if(hasStore){
                    // 如果有门店，选择非城市第一个
                    selectItem = nextProps.ruleData[nextIndex].groupRule.gmJgRuleItems.find(v => v.optionCode!='CITY')
                }else{
                    // 如果没有门店，选择第一个
                    selectItem = nextProps.ruleData[nextIndex].groupRule.gmJgRuleItems[0]
                    selectItem = selectItem?selectItem:{optionCode:'PHONE'}
                }
                this.setState({
                    tabIndex: selectItem.optionCode,
                    selectItem: selectItem,
                    currentIndex: nextIndex
                })
            }
        }
        return true
    }
    checkTab = (v)=>{
        this.setState({
            selectItem:v,
            tabIndex:v.optionCode
        })
    }
    render(){
        const {tabIndex,currentIndex,selectItem} = this.state
        const {ruleData,updateRules,updateRangeRules,dataCache,dataCacheHandle} = this.props
        let groupRuleData = ruleData.find(v => v.selected)
        // console.log(ruleData,'**********')
        // console.log(groupRuleData,'+++++++++')
        let hasStore = groupRuleData&&groupRuleData.groupRule.gmJgRuleItems.find(v => v.optionCode=='STORE')?true:false
        return (
            groupRuleData?
            <div className="rightContent">
                <div className="contentTitle">群规则</div>
                <div className="ruleTab">
                    {/* <div className='tab active'>
                        <span className='mandatory'>*</span>下拉框
                    </div>
                    <div className='tab'>
                        <span className='mandatory'>*</span>输入框
                    </div>
                    <div className='tab'>
                        <span className='mandatory'>*</span>门店
                    </div>
                    <div className='tab'>
                        <span className='mandatory'>*</span>日期
                    </div> */}
                    <div className="ruleTabBox">
                        {
                            groupRuleData.groupRule.gmJgRuleItems.map((v,i)=> {
                                return (
                                    !(hasStore&&v.optionCode=='CITY')?
                                    <div className={`tab ${v.optionCode==tabIndex?'active':''} ${v.errorFlag?'errorTab':''}`} onClick={()=>{this.checkTab(v)}}>
                                        {/* {v.optionName} */}
                                        {nameMap[v.optionCode]}
                                    </div>
                                    :''
                                )
                            })
                        }
                    </div>
                </div>
                {
                    component(selectItem,updateRules,updateRangeRules,groupRuleData.groupRule.gmJgRuleItems,dataCache,dataCacheHandle,currentIndex,groupRuleData.groupRule.id?true:false,ruleData.length)
                }
            </div>
            :<div className="rightContent">
                <div className="contentTitle">群规则</div>
                <div className="noData">
                    <img className="noDataImage" src={`${process.env.PUBLIC_URL}/images/icon/cw_notask.png`} alt=""/>
                    <div className="noDataText">点击左侧按钮新建群吧！</div>
                </div>
            </div>
        )
    }
}