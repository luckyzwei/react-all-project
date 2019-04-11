import React,{Component,PropTypes} from 'react'
import './index.css'
import promiseXHR from '../../../funStore/ServerFun'
import AuthProvider from '../../../funStore/AuthProvider'
import {API_PATH} from '../../../constants/OriginName'

const SVG = () => {
    return (
    <div className="loading">
        <svg width="112" height="112">
            <linearGradient id="linearColors" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFFFFF"></stop>
            <stop offset="100%" stopColor="#58A7F8"></stop>
            </linearGradient>
            <circle r="52" cx="56" cy="56" className="external-circle" strokeWidth="6" fill="none" stroke="url(#linearColors)"></circle>
            <animateTransform attributeName="transform" type="rotate" from="0 0 0" to="360 0 0" dur="1080ms" repeatCount="indefinite"></animateTransform>
        </svg>
    </div>)
}


const Loading = () => {
  return(
    <div className="loader" title="5" style = {{lineHeight: '140px'}}>
      <svg version="1.1" id="Layer_1" x="0px" y="0px"
         width="24px" height="30px" viewBox="0 0 24 30" style={{enableBackground:"new 0 0 50 50"}}>
        <rect x="0" y="13" width="4" height="5" fill="#58A7F8">
          <animate attributeName="height" attributeType="XML"
            values="5;21;5"
            begin="0s" dur="0.6s" repeatCount="indefinite" />
          <animate attributeName="y" attributeType="XML"
            values="13; 5; 13"
            begin="0s" dur="0.6s" repeatCount="indefinite" />
        </rect>
        <rect x="10" y="13" width="4" height="5" fill="#58A7F8">
          <animate attributeName="height" attributeType="XML"
            values="5;21;5"
            begin="0.15s" dur="0.6s" repeatCount="indefinite" />
          <animate attributeName="y" attributeType="XML"
            values="13; 5; 13"
            begin="0.15s" dur="0.6s" repeatCount="indefinite" />
        </rect>
        <rect x="20" y="13" width="4" height="5" fill="#58A7F8">
          <animate attributeName="height" attributeType="XML"
            values="5;21;5"
            begin="0.3s" dur="0.6s" repeatCount="indefinite" />
          <animate attributeName="y" attributeType="XML"
            values="13; 5; 13"
            begin="0.3s" dur="0.6s" repeatCount="indefinite" />
        </rect>
      </svg>
    </div>
  )
}

// statusFlag
// 0-登录中 1-成功 2-失败

export default class LoginModal extends Component {
    constructor(props){
        super(props)
        this.state = {
            statusFlag: 0,
            qrCode: '',
            robotInfo: {},
            imageLoad:false,
            loginText:'即将为您跳转页面…'
        }
        this.loginHandle = this.loginHandle.bind(this)
        this.getCode = this.getCode.bind(this)
        this.getLoginInfo = this.getLoginInfo.bind(this)
        this.refreshHandle = this.refreshHandle.bind(this)
        this.switchLoading = this.switchLoading.bind(this)
        this.changeLoginText = this.changeLoginText.bind(this)
    }

    changeLoginText(text){
      this.setState({
        loginText:text
      })
    }

    componentDidMount(){
        this.loginHandle()
    }

    switchLoading(state){
      this.setState({
        imageLoad:state
      })
    }

    refreshHandle(){
        clearInterval(this.timer1)
        clearInterval(this.timer2)
        this.loginHandle()
    }
    componentWillUnmount(){
        clearInterval(this.timer1)
        clearInterval(this.timer2)
    }
    loginHandle(){
        const url1 = `${API_PATH}/groupadmin-api/authsec/robothost/qrcode/req`
        this.switchLoading(true)
        const self = this
        // 第一步：获取登录序列号
        AuthProvider.getAccessToken().then((resolve,reject)=>{
            return promiseXHR(url1,{type:'Bearer',value:resolve},null,'GET')
        }).then(res => {
            const resData = JSON.parse(res)
            if(resData.resultCode=='100'){
                const serialCode = resData.resultContent
                self.getCode(serialCode)
            }
        })
    }
    getCode(serialCode){
         // 第二步：获取二维码
        const self = this
        const url2 = `${API_PATH}/groupadmin-api/noauth/robothost/qrcodeurl?indexNo=`
        self.timer1 = setInterval(function () {
            promiseXHR(url2+serialCode,null,null,'GET').then(res => {
                const resData = JSON.parse(res)
                if(resData.resultCode=='100'){
                    if(resData.resultContent!=null){
                        clearInterval(self.timer1)
                        self.getLoginInfo(serialCode)
                        self.setState({
                            qrCode: resData.resultContent
                        })
                    }
                }else{
                    // 登录失败
                    clearInterval(self.timer1)
                    self.setState({
                        statusFlag: 2
                    })
                }
            })
        },2000)
    }
    getLoginInfo(serialCode){
        // 第三步：获取登录信息
        const self = this
        const url3 = `${API_PATH}/groupadmin-api/authsec/robothost/account/logininfo?indexNo=`
        self.timer2 = setInterval(function () {
            AuthProvider.getAccessToken().then((resolve,reject)=>{
                return promiseXHR(url3+serialCode,{type:'Bearer',value:resolve},null,'GET')
            }).then(res => {
                const resData = JSON.parse(res)
                if(resData.resultCode=='100'){
                    if(resData.resultContent!=null){
                            // 登录成功
                        clearInterval(self.timer2)
                        self.setState({
                            statusFlag: 1,
                            robotInfo: resData.resultContent
                        })
                        setTimeout(() => {
                            if(self.props.type=='add'){
                              setTimeout(()=>{
                              self.changeLoginText('当前活跃的群即将导入，请耐心等待5分钟')
                            },500)
                                // self.props.changeView('ADD',resData.resultContent)
                            }else{
                                self.props.updateListData(resData.resultContent)
                                self.cancelHandle()
                            }
                        }, 2000+3000*Math.random())
                    }
                }else {
                    // 登录失败
                    clearInterval(self.timer2)
                    self.setState({
                        statusFlag: 2
                    })
                }
            })
        },2000)
    }
    render(){
        const {statusFlag,qrCode,robotInfo,imageLoad,loginText} = this.state
        return (
            <div className="loginModal">
                <div className="title">{
                    statusFlag==0?'扫码登录':statusFlag==1?'登录成功':'登录失败'
                }</div>
                {
                    statusFlag==1
                    ?<div className="successBox">
                        <div className="avatarBox">
                            <img src={robotInfo.headImage} alt=""/>
                            <SVG />
                        </div>
                        <p>{loginText}</p>
                    </div>
                    :<div className="loginBox">
                        <div className={statusFlag==2?"codeBox fail":"codeBox"}>
                            {
                            imageLoad ?
                            <Loading />
                            : ''
                            }
                            <img src={qrCode}
                                style = {{display:imageLoad?'none':'block'}}
                                onLoad = {()=>{
                                this.switchLoading(false)
                                }} alt=""/>
                        </div>
                        <p style={{marginBottom:'60px'}}>请打开托管微信账号的手机扫描二维码，授权登录</p>
                        {statusFlag==2&&<p>二维码过期？<span className="refreshBtn" onClick={this.refreshHandle}>刷新二维码</span></p>}
                    </div>
                }
            </div>
        )
    }
}
