import React, { Component } from 'react';
import './index.css';

let setTimeOuttimer;

export default class Messages extends Component {
    constructor() {
        super();
        this.state = {
            messageTxt: null,//消息提示txt
            messageState: false,//控住显示影藏
            messageCode: null,//消息提示code
        };
        this.showMessage = this.showMessage.bind(this);
    }

    showMessage(e) {
        let _this = this;
        if (e.vals) {
            clearTimeout(setTimeOuttimer);
            _this.setState({
                messageState: true,
                messageTxt: e.vals.txt,
                messageCode: e.vals.code
            });
            if (e.vals.code !== 1001) {
                setTimeOuttimer = setTimeout(function () {
                    _this.setState({
                        messageState: false,
                        messageTxt: null,
                        messageCode: null
                    });
                }, e.vals.timer || 2000)
            }
        }
    }

    componentDidMount() {
        window.addEventListener("message", this.showMessage)
    }

    componentWillUnmount() {
        window.removeEventListener("message", this.showMessage)
    }

    render() {
        let { messageTxt, messageState, messageCode } = this.state;
        return (
            <div className='MessagesMain'>
                {
                    messageState ?
                        <div
                            className={
                                messageCode === 1000 ?
                                    'MessagesMainContent success' :
                                    (messageCode === 1003 ?
                                        'MessagesMainContent warning' :
                                        (messageCode === 1001 ?
                                            'MessagesMainContent loading' :
                                            (messageCode === 1004 ?
                                                'MessagesMainContent error' :
                                                'MessagesMainContent other')))
                            }
                        >
                            {
                                messageCode === 1001 ?
                                    <img src={process.env.PUBLIC_URL+'/images/icon/loading.svg'} className='MessagesMainIcon' /> :
                                    ''
                            }
                            <span>{messageTxt}</span>
                        </div>
                        :
                        ''
                }
            </div>
        )
    }
}


/**
 * =>timer参数非必传，默认2s;
 * success sendEvent("message",{txt:"",code:1000,  timer:2000})
 * worning sendEvent("message",{txt:"",code:1003,  timer:2000})
 * loading sendEvent("message",{txt:"",code:1001})
 * error   sendEvent("message",{txt:"",code:1004,  timer:2000})
 */