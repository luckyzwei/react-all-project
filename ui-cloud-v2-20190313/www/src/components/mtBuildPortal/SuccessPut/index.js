
import React, {Component} from 'react'
import './index.css'
import ButtonBox from "../../shareComponent/ButtonBox";
import {sendEvent} from "../../../funStore/CommonFun";

// function date_format(micro_second) {
//     // 秒数
//     var second = Math.floor(micro_second / 1000);
//     // 小时位
//     var hr = Math.floor(second / 3600);
//     // 分钟位
//     var min = (Math.floor((second - hr * 3600) / 60));
//     // 秒位
//     var sec = ((second - hr * 3600 - min * 60)); // equal to => var sec = second % 60;
//     // 毫秒位，保留2位
//     var micro_sec = (Math.floor((micro_second % 1000) / 10));
//
//     return sec;
// }


export default class SuccessPut extends Component {
    constructor() {
        super();
        this.changeView = this.changeView.bind(this)
    }

    changeView() {
        this.props.actions.goTo('/v2/MTScope')
    }

    componentDidMount() {
    }

    render() {
        let {changeStep} = this.props;
        return (
            <div className='SuccessPut'>
                <div className="SaveSuccess-content">
                    <img src={process.env.PUBLIC_URL + '/images/icon/success.png'} alt=''
                         className="SaveSuccess-content-img"/>
                    <div className="SaveSuccess-content-text">任务建立成功了哦～</div>
                    <div className="SaveSuccess-content-btn">
                        <ButtonBox
                            btnTxt={"返回投放列表"}
                            btnFunc={this.changeView.bind(this)}
                            isCancel={true}
                        />
                        <ButtonBox
                            btnTxt={"继续投放"}
                            isCancel={false}
                            btnFunc={() => {
                                sendEvent('clearEdit')
                                changeStep('EDITTEXT')
                            }}
                        />
                    </div>
                </div>
            </div>
        )
    }
}
