
import React, {Component} from 'react'
import './index.css'
import DatePicker from 'antd/lib/date-picker';
import TimePicker from 'antd/lib/time-picker';
import 'antd/lib/date-picker/style/css';
import 'antd/lib/time-picker/style/css';
import locale from 'antd/lib/date-picker/locale/zh_CN';
import locales from 'antd/lib/time-picker/locale/zh_CN';
import {LocaleProvider} from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';

import moment from 'moment';

const dateFormat = 'YYYY-MM-DD';
const format = 'HH:mm';

export default class AlongDatePicker extends Component {
    constructor() {
        super();
        this.changeStartTime = this.changeStartTime.bind(this);
        this.changeStartDate = this.changeStartDate.bind(this);
    }

    changeStartDate(e, dateString) {
        if(this.props.sendingTimes) {
            let date = (dateString +' '+ this.props.sendingTimes).replace(/-/g,'/')
            date = date.replace('时',':').replace('分','')+':00'
            if(new Date(date).getTime() < new Date().getTime()) {
                let hours = new Date().getHours()
                let minutes = 0
                if((new Date().getMinutes()+'').charAt((new Date().getMinutes()+'').length - 1) < 5) {
                    minutes = new Date().getMinutes() + 5 - (new Date().getMinutes()+'').charAt((new Date().getMinutes()+'').length - 1)
                } else {
                    minutes = new Date().getMinutes() + 10 - (new Date().getMinutes()+'').charAt((new Date().getMinutes()+'').length - 1)
                }
                if(minutes == 60) {
                    minutes = '00'
                    hours == 23 ? hours = '00' : hours++
                }
                this.props.setparamsHandle(this.props.paramsname + 'Times', hours+'时'+minutes+'分')
            } 
        }
        this.props.setparamsHandle(this.props.paramsname + 'Dates', dateString)
    }

    changeStartTime(e, dateString) {
        if(this.props.sendingDates) {
            let date = (this.props.sendingDates +' '+ dateString).replace(/-/g,'/')
            date = date.replace('时',':').replace('分','')+':00'
            if(new Date(date).getTime() < new Date().getTime()) {
                let hours = new Date().getHours()
                let minutes = 0
                if((new Date().getMinutes()+'').charAt((new Date().getMinutes()+'').length - 1) < 5) {
                    minutes = new Date().getMinutes() + 5 - (new Date().getMinutes()+'').charAt((new Date().getMinutes()+'').length - 1)
                } else {
                    minutes = new Date().getMinutes() + 10 - (new Date().getMinutes()+'').charAt((new Date().getMinutes()+'').length - 1)
                }
                if(minutes == 60) {
                    minutes = '00'
                    hours == 23 ? hours = '00' : hours++
                }
                this.props.setparamsHandle(this.props.paramsname + 'Times', hours+'时'+minutes+'分')
                return
            } 
        }
        this.props.setparamsHandle(this.props.paramsname + 'Times', dateString)
    }
    getDisabledDate = (time) => {
        return moment(time) < Date.now() - 24*3600*1000
    }

    getDisabledHours = () => {
        let {sendingDates} = this.props;
        if (sendingDates && sendingDates.slice(0, 4) == new Date().getFullYear() && sendingDates.slice(5, 7) == new Date().getMonth() + 1 && sendingDates.slice(8, 10) == new Date().getDate()) {
            var hours = []
            new Date().getHours()
            for(var i =0; i < new Date().getHours(); i++){
                hours.push(i)
            }
            return hours
        }
    }

    getDisabledMinutes = () => {
        let {sendingDates,sendingTimes} = this.props;
        if (sendingDates && sendingDates.slice(0, 4) == new Date().getFullYear() && sendingDates.slice(5, 7) == new Date().getMonth() + 1 && sendingDates.slice(8, 10) == new Date().getDate() && sendingTimes && sendingTimes.slice(0, 2) == new Date().getHours()) {
            var Minutes = []
            new Date().getMinutes()
            for(var i =0; i < new Date().getMinutes(); i++){
                Minutes.push(i)
            }
            return Minutes
        }
    }

    render() {
        let {label, sendingTimes, sendingDates} = this.props
        // console.log(sendingTimes,"sendingTimes")
        return (
            <LocaleProvider locale={zhCN}>
                <div className='AlongDatePicker'>
                    <section>{label}</section>
                    <div className='AlongDatePicker-content'>
                        <DatePicker
                            locale={locale}
                            format="YYYY-MM-DD"
                            disabledDate={this.getDisabledDate}
                            defaultValue={sendingDates ? moment(sendingDates, dateFormat) : null}
                            defaultPickerValue={sendingDates ? moment(sendingDates, dateFormat) : null}
                            onChange={this.changeStartDate}
                            showToday={false}
                        />
                        <TimePicker
                            format='HH时mm分'
                            disabledHours={this.getDisabledHours}
                            disabledMinutes={this.getDisabledMinutes}
                            value={sendingTimes ? moment(sendingTimes, format) : null}
                            onChange={this.changeStartTime}
                            minuteStep={5}
                        />
                    </div>
                </div>
            </LocaleProvider>

        )
    }
}
