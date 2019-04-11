import React, { Component} from "react";
import $ from "jquery";
import promiseXHR from "../../funStore/ServerFun";
import AuthProvider from "../../funStore/AuthProvider";
import { API_PATH } from "../../constants/OriginName";
import { uuid } from '../../funStore/CommonFun'
import * as fetch from '../../funStore/funForComponent/fetchLocalData'
import ButtonLoading from '../shareComponent/ButtonLoading'
import {tongji} from '../../funStore/tongji'
/* global location */
/* eslint no-restricted-globals: ["off", "location"] */
const codeJudgeMap = {
    "041000101": '验证码不能为空！',
    "041000102": '验证码错误！',
    "041000103": '验证码已过期！',
    "041000104": '验证码不匹配！'
}

export default class LoginForm extends Component {
    constructor(props) {
        super(props)
        this.setFocus = this.setFocus.bind(this)
        this.handlePasswordVisible = this.handlePasswordVisible.bind(this)
        this.refresh = this.refresh.bind(this)
        this.recordClick = this.recordClick.bind(this)
        this.retrieveClick = this.retrieveClick.bind(this)
        this.loginClick = this.loginClick.bind(this)
        this.registerClick = this.registerClick.bind(this)
    }

    state = {
        record: window.localStorage.getItem('userBase'),
        infoJudge: true,
        codeJudge: true,
        codeJudgeTip: '',
        storage: window.localStorage,
        passwordVisible: false,
        randomNumber: 0,
        sessionKey: '',
        loading: false,
        focused: ''
    }

    setFocus(value) {
        this.setState({
            focused: value
        })
    }

    recordClick() {
        this.setState({
            record: !this.state.record
        })
    }

    loginClick() {
        const { infoJudge } = this.state
        const { naviMetaData,actions } = this.props
        const username = this.refs.userName.value
        const password = this.refs.password.value
        const imageCode = this.refs.imageCode.value
        const sessionKey = this.state.sessionKey
        const self = this
        if (!infoJudge && imageCode == "") {
            this.setState({
                codeJudge: false,
                codeJudgeTip: codeJudgeMap['041000101'],
                loading: false
            })
            return
        }
        const params = infoJudge ? { username, password } : { username, password, imageCode, sessionKey }
        this.setState({
            loading: true
        })
        AuthProvider.onLogin(params)
            .then((resolve) => {
                self.setState({
                    loading: false
                })
                if (resolve == 'error') {
                    self.setState({
                        infoJudge: false,
                        codeJudge: true
                    })
                    self.refresh()
                } else if (resolve.resultCode == '041000101'
                    || resolve.resultCode == '041000102'
                    || resolve.resultCode == '041000103'
                    || resolve.resultCode == '041000104') {
                    // 刷新验证码
                    self.refresh()
                    self.setState({
                        codeJudge: false,
                        codeJudgeTip: codeJudgeMap[resolve.resultCode]
                    })
                } else {
                    self.setState({
                        infoJudge: true,
                        codeJudge: true
                    })
                    tongji('Lzc_DengLu_DengLu')
                    self.setUserInfo()
                    .then(() => {
                        if (self.state.record) {
                            const username = self.refs.userName.value
                            const password = self.refs.password.value
                            self.state.storage.setItem('userBase', JSON.stringify({
                                username: username,
                                password: password
                            }))
                        } else {
                            this.state.storage.removeItem('userBase')
                        }
                        var path = fetch.getQueryString('redirect')
                        if (path == null) {
                            // location.href = location.origin + '/marketPortal/PCScope/account?redirect=v2'
                            actions.goTo('/v2/Home')
                        } else {
                            actions.goTo('/' + path)
                        }
                    })
                }
            })

    }

    registerClick() {
        this.props.actions.goTo('/v2/register')
    }

    retrieveClick() {
        this.props.goRetrieve()
    }

    keydownEvent(e) {
        if (e.keyCode == 13) {
            $(".loginButton").trigger("click")
        }
    }
    componentWillMount() {
        const sessionKey = uuid()
        this.setState({
            sessionKey: sessionKey
        })
    }
    componentDidMount() {
        $(window).get(0).addEventListener('keydown', this.keydownEvent)
        const record = this.state.record
        if (record) {
            this.refs.userName.value = JSON.parse(record).username
            this.refs.password.value = JSON.parse(record).password
        }
    }

    componentWillUnmount() {
        $(window).get(0).removeEventListener('keydown', this.keydownEvent)

    }

    setUserInfo() {
        const self = this
        return AuthProvider.getAccessToken()
            .then((resolve, reject) => {
                return self.pullUserinfo(API_PATH + '/tenantadmin/authsec/tenantbase/currentuser', resolve)
            })
            .then((resolve, reject) => {
                self.props.actions.initUserInfo(resolve)
            })
    }

    pullUserinfo(url, resolve) {
        return promiseXHR(url, { type: 'Bearer', value: resolve }, null, 'GET')
            .then((res) => {
                const data = eval('(' + res + ')')
                return data.resultContent
            })
    }
    handlePasswordVisible() {
        this.setState({
            passwordVisible: !this.state.passwordVisible
        })
    }
    refresh(e) {
        const sessionKey = uuid()
        this.setState({
            sessionKey: sessionKey
        })
        this.refs.verifyCode.src = API_PATH + '/uaa/code/image?height=42&width=90&sessionKey=' + sessionKey

    }
    render() {
        const isRecord = this.state.record
        const { passwordVisible, randomNumber, codeJudgeTip, loading, focused } = this.state
        const textInvalid = this.state.codeJudge ? this.state.infoJudge ? '' : '用户名或密码错误!' : codeJudgeTip
        return (
            <div className='innerBox'>
                <div className='checkBar' style={{
                    opacity: this.state.codeJudge && this.state.infoJudge ? '0' : '1'
                }}>{textInvalid}</div>
                <div className='userName'>
                    <input ref='userName' type='text' placeholder='用户名'
                        onFocus={() => {
                            this.setFocus('userName')
                        }}
                        onBlur={() => {
                            this.setFocus('')
                        }}
                    />
                    <em className={focused == 'userName' ? 'icon-home icon-visible' : 'icon-invisible'}
                    ></em>
                </div>
                <div className="password">
                    <input ref='password' type={passwordVisible ? 'text' : 'password'} placeholder='密码'
                        onFocus={() => {
                            this.setFocus('password')
                        }}
                        onBlur={() => {
                            this.setFocus('')
                        }}
                    />
                    <em className={focused == 'password' ? 'icon-home visible' : 'invisible'}
                        onClick={this.handlePasswordVisible}
                    ></em>
                </div>
                <div className='codeBox' style={{ display: !this.state.infoJudge ? 'block' : 'none' }}>
                    <input ref='imageCode' id='code' type='text' placeholder='验证码' style={{ width: '173px',marginBottom:'0' }} />
                    <img id='verifyCode'
                        ref='verifyCode' src={!this.state.infoJudge ? (API_PATH + '/uaa/code/image?height=42&width=90&sessionKey=' + this.state.sessionKey) : ''} onClick={this.refresh} />
                </div>
                <div className='handleBar'>
                    <span className={
                        `${isRecord ? 'font-selected' : 'font-unselected'} icon-home`
                    }
                        onClick={this.recordClick}>
                    </span>
                    <lable style={{ color: isRecord ? '#485767' : '#B5BDC6' }}>记住我</lable>
                    <div className='forgetButton' onClick={this.retrieveClick}>忘记密码?</div>
                </div>
                <div className='loginButton' onClick={this.loginClick}>
                    {
                        loading ?
                            <ButtonLoading text={'登录中'} />
                            :
                            '登录'
                    }
                </div>
                <div className="registerButton" onClick={this.registerClick}><u>注册账号</u></div>
            </div>
        )
    }


}
