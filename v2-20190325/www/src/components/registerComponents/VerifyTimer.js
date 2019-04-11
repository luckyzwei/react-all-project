/**
 * Created by jiayi.hu on 8/30/17.
 */
import React, {Component, PropTypes} from "react";

export default class VerifyTimer extends Component {
    constructor() {
        super()
        this.state = {
            verifyDisabled: false,
            verifyText: '获取验证码'
        }
    }

    getVerifyCode() {
        // let promise = new Promise((resolve, reject)=> {
        //     return resolve(this.props.getVerifyCode())
        // })
        // promise.then((res)=> {
            this.props.changeSendFlag()
            if (this.state.verifyText == '获取验证码') {
                let times = 60
                this.timer = setInterval(()=> {
                    times--
                    if (times <= 0) {
                        this.setState({
                            verifyDisabled: false,
                            verifyText: '获取验证码'
                        })
                        clearInterval(this.timer)
                    } else {
                        this.setState({
                            verifyDisabled: true,
                            verifyText: `等待${times}s`
                        })
                    }
                }, 1000)
            }
        // })
    }

    componentWillReceiveProps (next) {
        next.sendFlag ? this.getVerifyCode() : ''
    }

    componentWillUnmount() {
        clearInterval(this.timer)
    }

    render() {
        // const {verifyDisabled,verifyText,getVerifyCode} = this.props
        const {verifyDisabled, verifyText} = this.state
        // console.log(verifyDisabled, verifyText)
        return (
            <div style={{position:'relative'}}>
                <button
                    className={verifyDisabled ? 'verifyDisabled' : 'verifyBtn'}
                    onClick={verifyDisabled?'':this.props.getVerifyCode}
                    disabled={verifyDisabled}
                    tabIndex="1">
                    {verifyText}
                </button>
            </div>
        )
    }
}