import React,{Component} from 'react'
import promiseXHR from '../../funStore/ServerFun'
import AuthProvider from '../../funStore/AuthProvider'
import {API_PATH} from '../../constants/OriginName'

const errorTips = {
    'PHONE_ERROE':'手机号码有误',
    'CODE_ERROE':'验证码错误',
    'PHONE_USED':'手机号码已被使用',
    'CODE_INVALID':'验证码失效',
    'UPDATE_FAIL':'更新失败'
}

export default class EditPhone extends Component {
    constructor(props){
        super(props)
        this.getCodeHandle = this.getCodeHandle.bind(this)
        this.changeHandle = this.changeHandle.bind(this)
        this.phoneCheck = this.phoneCheck.bind(this)
        this.changePhoneHandle = this.changePhoneHandle.bind(this)
        this.inputCode = this.inputCode.bind(this)
        this.state = {
            status: 0,
            timeout: 60,
            showTip: false,
            tipType:'',
            phone:'',
            code:''
        }
    }
    componentDidMount(){
        this.setState({
            phone: this.props.phone 
        })
    }
    getCodeHandle(){
        this.setState({
            status: 1
        })
        this.timer = setInterval(() => {
            if(this.state.timeout>1){
                this.setState({
                    timeout: this.state.timeout - 1
                })
            }else{
                clearInterval(this.timer)
                this.setState({
                    status: 2,
                    timeout: 60
                })
            }
        }, 1000)
        AuthProvider.getAccessToken()
        .then((resolve,reject)=>{
          const url = API_PATH+'/basis-api/authsec/usermgmt/sendPhoneCode?_phone='+this.state.phone+'&_templateCode=UPDATE_MOBILE_VCODE_MSG'
            promiseXHR(url,{type:'Bearer',value:resolve},null,'GET')
            .then(res => {
				const resData = JSON.parse(res)
            })
        })
    }
    changeHandle(e){
        this.setState({
            phone: e.target.value 
        })
    }
    phoneCheck(){
        const phoneReg = /^1\d{10}$/g
        const phone = this.state.phone
        if(!phoneReg.test(phone)){
            this.setState({
                showTip: true,
                tipType: 'PHONE_ERROE' 
            })
        }else{
            this.setState({
                showTip: false
            })
        }
    }
    inputCode(e){
        this.setState({
            code: e.target.value
        })
    }
    changePhoneHandle(){
        const paramas = {
            code: this.state.code,
            id: this.props.userInfo.id,
            phone: this.state.phone
        }
        if(!this.props.buttonBlock){
            this.props.switchBlock()
            AuthProvider.getAccessToken()
            .then((resolve,reject)=>{
            const url = API_PATH+'/basis-api/authsec/usermgmt/updatePhone'
                promiseXHR(url,{type:'Bearer',value:resolve},paramas,'PUT')
                .then(res => {
                    const resData = JSON.parse(res)
                    if(resData.resultCode == 100){
                        this.props.hidePopHandle()
                        this.props.changePhone(paramas.phone)
                    }else if(resData.resultCode == '02504023'){
                        this.setState({
                            showTip: true,
                            tipType: 'PHONE_ERROE' 
                        })
                    }else if(resData.resultCode == '02504024'){
                        this.setState({
                            showTip: true,
                            tipType: 'PHONE_USED' 
                        })
                    }else if(resData.resultCode == '02504021'){
                        this.setState({
                            showTip: true,
                            tipType: 'CODE_INVALID' 
                        })
                    }else if(resData.resultCode == '02504022'){
                        this.setState({
                            showTip: true,
                            tipType: 'CODE_ERROE' 
                        })
                    }else if(resData.resultCode == '02504015'){
                        this.setState({
                            showTip: true,
                            tipType: 'UPDATE_FAIL' 
                        })
                    }
                    
                })
            })
        }
    }
    render(){
        const {status,timeout,showTip,tipType,phone} = this.state
        const {hidePopHandle} = this.props
        return (
            <div className="phoneWrapper">
                <h3>编辑手机号</h3>
                <div className="inputBox">
                   <span>手机号：</span>
                   <input
                       maxLength={11}
                        type="text" 
                        value={phone||''} 
                        className="phoneNumber" 
                        placeholder="请输入您的手机号" 
                        onChange={this.changeHandle} 
                        onBlur={this.phoneCheck}
                    />
                </div>
                <div className="inputBox">
                    <span>验证码：</span>
                    <input type="text" className="verifyCode" placeholder="请输入验证码" onChange={this.inputCode} maxLength={6}/>
                    <div className="codeBtn" style={{display:status==0?'inline-block':'none'}} onClick={this.getCodeHandle}>获取验证码</div>
                    <div className="timeout" style={{display:status==1?'inline-block':'none'}}>{'剩余'+timeout+'s'}</div> 
                    <div className="codeBtn" style={{display:status==2?'inline-block':'none'}} onClick={this.getCodeHandle}>重新获取</div>  
                </div>
                <div className="tips" style={{ visibility: showTip ? 'visible' : 'hidden' }}>{errorTips[tipType]}</div>
                <div className="saveArea">
                    <div className="confirmBtn" onClick={this.changePhoneHandle}>确定</div>
                    <div className="cancelBtn" onClick={()=>{hidePopHandle();clearInterval(this.timer)}}>取消</div>
                </div>
                <div className="closeBtn icon-home bigClose" onClick={()=>{hidePopHandle();clearInterval(this.timer)}}></div>
            </div>
        )
    }
}   