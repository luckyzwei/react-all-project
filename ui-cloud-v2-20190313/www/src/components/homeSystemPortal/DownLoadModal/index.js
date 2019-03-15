import React, { Component} from 'react'
import AuthProvider from "../../../funStore/AuthProvider";
import promiseXHR from "../../../funStore/ServerFun";
import {API_PATH} from "../../../constants/OriginName";
import {sendEvent} from "../../../funStore/CommonFun";
import ButtonBox from '../../shareComponent/ButtonBox'
import ButtonLoading from '../../shareComponent/ButtonLoading'
import RangePicker from '../../shareComponent/RangePicker'
import {Loading} from '../HomeMainScope/Loading'
import moment from 'moment'
import './index.css'
import {tongji} from '../../../funStore/tongji'

export default class Index extends Component{
    constructor(props){
        super(props)
        this.state={
            dateArr: '',
            limitLoad:false
        }
    }
    //导出数据
    exportAsExcel = () => {
        let self = this;
        if(!this.props.userInfo) return
        let userId = this.props.userInfo.info.userinfo.userId;
        // console.log(userId,'导出数据id')

        let { dateArr } = self.state;
        let url = API_PATH + '/message-measure/authsec/downloaddailyreport/' + userId;
        if ( dateArr == '') {
            return;
        }
        this.setState({ limitLoad: true })
        tongji('Lzc_QunZhuangTai_DaoChuShuJu')
        AuthProvider.getAccessToken().then(resolve => {
            return promiseXHR(url, { type: 'Bearer', value: resolve }, { dateStart: dateArr[0]+' 00:00:00', dateEnd: dateArr[1]+' 00:00:00' }, 'POST')
        }).then(response => {
            let resData = JSON.parse(response);
            if (resData.resultCode == 100) {
                let a = document.createElement('a');
                a.href = resData.resultContent.url;
                a.click();
                setTimeout(()=>{
                    sendEvent("message", { txt: "导出成功", code: 1000 })
                })
            }else{
                sendEvent("message", { txt: "导出失败", code: 1003 })
            }
            this.setState({ limitLoad: false })
            this.props.hideHandel()

        })
    }

    setDateParams = (dateString) => {
        // console.log(dateString);
        this.setState({
            dateArr: dateString[0] != '' ? dateString : ''
        })
    }

    render(){
        const {hideHandel} =this.props
        const {dateArr,limitLoad}=this.state
        console.log(dateArr,'dateArr')
        return <div className='modalWrapper'>
            <div className='modalBox download-modal'>
                <div className="title">导出数据</div>
               <div className="content">
                   <span className='label'>选择时间：</span>
                   <div className="dateRangePicker">
                       <RangePicker
                           disabledDate={(current)=>{return  current > new Date(new Date().getTime()- 1 * 24 * 60 * 60 * 1000) }}
                           setDateParams={this.setDateParams}
                       />
                   </div>
               </div>
                <div className="closeBtn" onClick={hideHandel}/>
                <div className="btnBox">
                    {
                        !limitLoad
                            ?<ButtonBox btnTxt={'导出'} btnFunc={this.exportAsExcel}/>
                            :<div className='ButtonBox confirm'><ButtonLoading text={'导出中'}/></div>

                    }
                </div>
            </div>

        </div>
    }
}


