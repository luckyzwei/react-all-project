import React,{Component} from 'react'
import DatePicker from 'antd/lib/date-picker';
import 'antd/lib/date-picker/style/css';
import locale from 'antd/lib/date-picker/locale/zh_CN';
import moment from 'moment';

export default class DateRule extends Component {
    constructor(props){
        super(props)
        this.state={
            defaultStart:props.item.values[0].startValue,
            defaultEnd:props.item.values[0].endValue
        }
    }
    // setStartTime = (e, dateString) => {
    //     const {item} = this.props
    //     this.props.updateRangeRules(item.optionCode,'start',dateString)
    // }
    // setEndTime = (e, dateString) => {
    //     const {item} = this.props
    //     this.props.updateRangeRules(item.optionCode,'end',dateString)
    // }
    onChange = (date, dateString) => {
        const {item} = this.props
        this.props.updateRangeRules(item.optionCode,'start',dateString[0])
        this.props.updateRangeRules(item.optionCode,'end',dateString[1])
    }
      
    render(){
        const {defaultStart,defaultEnd} = this.state
        const {item,disabled} = this.props
        return (
            <div className='city-InGroupRuleRow city-border'>
                <div className="city-InGroupRuleRow-header">
                    <div className="left">
                        {/* {item.isMandatory?<span className='redTxt'>*</span>:''} */}
                        选择时间段
                    </div>
                </div>
                <div className="city-InGroupRuleRow-content">
                    {/* <aside>
                        <section>起始时间</section>
                        <DatePicker
                            defaultValue={defaultStart?moment(defaultStart):undefined}
                            locale={locale}
                            className={"dateSelect"}
                            dropdownClassName={"dateRangePicker"}
                            onChange={this.setStartTime}
                        />
                    </aside>
                    <aside>
                        <section>结束时间</section>
                        <DatePicker
                            defaultValue={defaultEnd?moment(defaultEnd):undefined}
                            locale={locale}
                            className={"dateSelect"}
                            dropdownClassName={"dateRangePicker"}
                            onChange={this.setEndTime}
                        />
                    </aside> */}
                    <aside>
                        <DatePicker.RangePicker 
                            locale={locale}
                            defaultValue={defaultStart&&defaultEnd?[moment(defaultStart, 'YYYY-MM-DD'), moment(defaultEnd, 'YYYY-MM-DD')]:undefined}
                            disabled={disabled}
                            onChange={this.onChange}
                        />
                    </aside>
                </div>
            </div>
        )
    }
}