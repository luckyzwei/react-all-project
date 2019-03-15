
import React, { Component } from 'react'
import './index.css'

// 时间格式化输出，如03:25:19 86。每10ms都会调用一次
function date_format(micro_second) {
    // 秒数
    var second = Math.floor(micro_second / 1000);
    // 小时位
    var hr = Math.floor(second / 3600);
    // 分钟位
    var min = (Math.floor((second - hr * 3600) / 60));
    // 秒位
    var sec = ((second - hr * 3600 - min * 60)); // equal to => var sec = second % 60;
    // 毫秒位，保留2位
    var micro_sec = (Math.floor((micro_second % 1000) / 10));

    return sec;
}
export default class SaveSuccess extends Component {
    constructor() {
        super();
        this.state = {
            s: ''
        }
        this.couuntDown = this.couuntDown.bind(this);
    }
    couuntDown(s) {
        if (s <= 0) {
            return
        }
        this.setState({
            s: date_format(s)
        })
        setTimeout(() => {
            s -= 10;
            this.couuntDown(s)
        }, 10);
    }
    componentDidMount() {
        this.couuntDown(3000)
    }
    componentWillUnmount() { }
    render() {
        let { s } = this.state;
        return (
            <div className='SaveSuccess'>
                <div className="SaveSuccess-content">
                    <img src={process.env.PUBLIC_URL+'/images/icon/success.png'} alt='' className="SaveSuccess-content-img" />
                    <div className="SaveSuccess-content-text">保存成功，请前往托管群页面查看操作进度</div>
                    {/* <div className="SaveSuccess-content-txt">
                        <span className="SaveSuccess-content-txt-blue">{s}s</span>
                        后自动回到托管群页面
                    </div> */}
                </div>
            </div>
        )
    }
}
