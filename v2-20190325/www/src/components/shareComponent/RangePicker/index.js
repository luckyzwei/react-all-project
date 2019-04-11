import React, { Component } from 'react'
import DatePicker from 'antd/lib/date-picker';
import 'antd/lib/date-picker/style/css';
import locale from 'antd/lib/date-picker/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
import "./index.css"

export default class RangePicker extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    onChange = (date, dateString) => {
        // console.log(date, dateString,1);
        if (this.props.setDateParams) {
            this.props.setDateParams(dateString)
        }
    }
    onOpenChange = (status) => {
        // console.log(status,2) //true or false
    }

    render() {
        const { disabledDate, disabled, styles } = this.props
        return (
            <DatePicker.RangePicker
                defaultValue={this.props.defaultValue}
                defaultPickerValue={this.props.defaultValue}
                locale={locale}
                className={"dateSelect"}
                dropdownClassName={"dateRangePicker"}
                getCalendarContainer={() => document.getElementsByClassName('dateSelect')[0]}
                onOpenChange={this.onOpenChange}
                showTime={false}
                style={styles}
                onChange={this.onChange}
                disabledDate={disabledDate}
                disabled={disabled}
            />

        )
    }
}