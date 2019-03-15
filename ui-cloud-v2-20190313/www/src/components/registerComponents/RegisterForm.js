/**
 * Created by jiayi.hu on 8/25/17.
 */
import React, {Component, PropTypes} from "react";
import promiseXHR from "../../funStore/ServerFun";
import {API_PATH} from "../../constants/OriginName";
import VerifyTimer from "./VerifyTimer";
import ProtocalBox from './ProtocalBox'
import {tongji} from '../../funStore/tongji'

const verifyMethods = {
    'telephone': /^1\d{10}$/,
    'password': /^(\w){6,16}$/,
    'userName': /^[a-zA-Z0-9]{4,20}$/
}
const matchReg = ((location,name)=>{
    const reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)")
    const match = location.substr(1).match(reg)
    if(match!=null){
        return (match[2])
    }
    return null
})
export default class RegisterForm extends Component {
    constructor() {
        super()
        this.state = {
            formData: {
                userName: '',
                password: '',
                repeatPassword: '',
                recommendCode: '',
                telephone: '',
                verifyCode: ''
            },
            formVerify: {
                userName: 0,
                password: 0,
                repeatPassword: 0,
                recommendCode: 0,
                telephone: 0,
                verifyCode: 0
            },
            formTip: {
                userName: 0,
                password: 0,
                repeatPassword: 0,
                recommendCode: 0,
                telephone: 0,
                verifyCode: 0
            },
            formPoints: [
                {
                    name: 'userName',
                    placeholder: '用户名',
                    tipText: '用户名已存在'
                },
                {
                    name: 'password',
                    placeholder: '密码',
                    tipText: '密码最小长度为6个字符  密码最大长度为16个字符'
                },
                {
                    name: 'repeatPassword',
                    placeholder: '确认密码',
                    tipText: '两次密码输入不一致'
                },
                {
                    name: 'recommendCode',
                    placeholder: '推荐码',
                    tipText: '推荐码不存在'
                },
                {
                    name: 'telephone',
                    placeholder: '手机号',
                    tipText: '请输入正确的手机号码'
                },
                {
                    name: 'verifyCode',
                    placeholder: '验证码',
                    tipText: '验证码错误'
                }
            ],
            protocolChecked: false,
            verifyDisabled: false,
            verifyText: '获取验证码',
            recommendDisabled:false,
            recommendData:'',
            currentName:'',
            verification: '',
            verificationStatus: '',
            showVerificationModal: false,
            verifyCode: '',
            sendFlag: false,
            protocalShow: false,
            changeQRcode: true
        }
        this._setVerifyPoints = this._setVerifyPoints.bind(this)
    }
    componentWillMount(){
        const {childController,location} = this.props
        const uId = matchReg(location,'uId')
        if(childController=='CHILD_REGISTER'&&uId!=null){
            const url = API_PATH + '/basis-api/noauth/usermgmt/'+uId+'/loadPhoneAndTenantId'
            promiseXHR(url,null,null,'GET')
               .then((res)=>{
                const resData = JSON.parse(res)
                if(resData.resultCode==100){
                    this.setState({
                        formData:{...this.state.formData,recommendCode:resData.resultContent.inviteCode},
                        recommendDisabled:true,
                        recommendData:{...resData.resultContent,uId:uId}
                    })
                }
            })
        }
    }
    showProtocal = ()=>{
        this.setState({
            protocalShow: true
        })
    }
    hideProtocal = () => {
        this.setState({
            protocalShow: false
        })
    }
     submitForm(e) {
        e.stopPropagation()
        e.preventDefault()
        let promiseVerify = true
        const {childController} = this.props
        let {formData, formVerify, formTip, formPoints,recommendDisabled,recommendData} = this.state
        let registerData = new Object()
        for (let id in formData) {
            if (childController == 'CHILD_VERIFY') {
                if (id == 'telephone' || id == 'verifyCode') {
                    registerData[id] = formData[id]
                }
            } else if (childController == 'CHILD_RETRIEVE') {
                if (id == 'password' || id == 'repeatPassword') {
                    registerData[id] = formData[id]
                }
            } else {
                registerData[id] = formData[id]
            }
        }
        // console.log(registerData)
        for (let id in registerData) {
            if (formData[id] == ''&& id!='recommendCode') {
                formVerify[id] = 1
                formTip[id] = 0
                promiseVerify = false
            }
            else if (id == 'telephone' && formData[id] != '' && !verifyMethods[id].test(formData[id])) {
                formVerify[id] = 1
                formTip[id] = 1
                formPoints[4].tipText = '请输入正确的手机号码'
                promiseVerify = false
            } else if (id == 'password' && formData[id] != '' && !verifyMethods[id].test(formData[id])) {
                formVerify[id] = 1
                formTip[id] = 1
                promiseVerify = false
            } else if (id == 'repeatPassword' && formData[id] != '' && formData['password'] != '' && formData[id] != formData['password']) {
                formVerify[id] = 1
                formTip[id] = 1
                promiseVerify = false
            } else if(id=='userName'&&formData[id] != ''&&!verifyMethods[id].test(formData[id])){
                formVerify[id] = 1
                formTip[id] = 1
                formPoints[0].tipText = '用户名只能由字母、数字组成，且长度不少于4，不大于20'
                promiseVerify = false
            }else {
                formVerify[id] = 0
                formTip[id] = 2
            }
        }
        if (promiseVerify) {
            if (childController == 'CHILD_VERIFY') {
                const url = API_PATH + '/basis-api/noauth/usermgmt/checkPhoneAndCode'
                promiseXHR(url, null , {
                    "code": formData['verifyCode'],
                    "phone": formData['telephone']
                }, 'POST')
                  .then((res)=>{
                    const resData = JSON.parse(res)
                    if (resData.resultCode == 100) {
                        if (this.props.handleChildChange) {
                            this.props.handleChildChange('CHILD_RETRIEVE')
                            tongji('Lzc_ZhuCe_YanZhengMa')
                        }
                    } else if (resData.resultCode == '02504025') {
                        //手机号未注册
                        this._setVerifyPoints('telephone',4,'手机号未注册')
                    } else if (resData.resultCode == '02504021') {
                        this._setVerifyPoints('verifyCode',5,'验证码无效')
                    } else if (resData.resultCode == '02504022') {
                        this._setVerifyPoints('verifyCode',5,'验证码错误')
                    } else {

                    }
                })
            } else if (childController == 'CHILD_RETRIEVE') {
                const url = API_PATH + '/basis-api/noauth/usermgmt/reSetPassword'

                  promiseXHR(url, null , {
                        "newPassword": formData['password'],
                        "phone": formData['telephone'],
                        "code":formData['verifyCode']
                  }, 'PUT')
                  .then((res)=>{
                    const resData = JSON.parse(res)
                    if (resData.resultCode == 100) {
                        if (this.props.goLogin) {
                            this.props.goLogin()
                            tongji('Lzc_ZhuCe_ChongZhiMiMa')
                        }
                    }
                })
            } else {
                const url = API_PATH + '/basis-api/noauth/usermgmt/registUser'
                const recommendObject = recommendDisabled?recommendData:{'inviteCode': formData['recommendCode']}
                promiseXHR(url, null , Object.assign({},{
                    'loginName': formData['userName'],
                    'password': formData['password'],
                    'phone': formData['telephone'],
                    'code': formData['verifyCode'],
                    'orderType': 2,
                    'tenantType':2},recommendObject), 'POST')
                 .then((res)=> {
                    const resData = JSON.parse(res)
                    switch (resData.resultCode) {
                        case '100':
                            // console.log('register success')
                            if (this.props.goLogin) {
                                this.props.goLogin()
                                tongji('Lzc_ZhuCe_ZhuCeYongHu')
                            }
                            break
                        case '02504017':
                            this._setVerifyPoints('userName',0,'用户名已存在')
                            break
                        case '02504024':
                            this._setVerifyPoints('telephone',4,'手机号已被使用')
                            break
                        case '02504021':
                            this._setVerifyPoints('verifyCode',5,'验证码失效')
                            break
                        case '02504022':
                            this._setVerifyPoints('verifyCode',5,'验证码错误')
                            break
                        case '02504027':
                            this._setVerifyPoints('recommendCode',null,null)
                            break
                        case '02504028':
                            alert('注册失败!')
                            break
                    }
                })
            }
        }
        this.setState({
            formVerify: formVerify,
            formTip: formTip,
            formPoints: formPoints
        })
    }

    _setVerifyPoints(verifyName,pointIndex,tipText){
        const {formVerify,formTip,formPoints} = this.state
        formVerify[verifyName] = 1
        formTip[verifyName] = 1
        if(pointIndex!=null) {
            formPoints[pointIndex].tipText = tipText
        }
        this.setState({
            formVerify:formVerify,
            formTip:formTip,
            formPoints:formPoints
        })
    }
    getVerifyCode() {
        let promiseVerify = true
        let {formData, formVerify, formTip} = this.state
        const {childController} = this.props
        const templateCode = childController == 'CHILD_VERIFY' ? 'PWD_RETRIEVAL_VCODE_MSG' : 'ADMIN_REGISTER_VCODE_MSG'
        if (formData['telephone'] == '') {
            formVerify['telephone'] = 1
            formTip['telephone'] = 0
            promiseVerify = false
        } else if (formData['telephone'] != '' && !verifyMethods['telephone'].test(formData['telephone'])) {
            formVerify['telephone'] = 1
            formTip['telephone'] = 1
            promiseVerify = false
        } else {
            formVerify['telephone'] = 0
            formTip['telephone'] = 2
            promiseVerify = true
        }
        this.setState({
            formVerify: formVerify,
            formTip: formTip
        })
        if (promiseVerify) {
            this.showVerificationModal(formData['telephone'])
        }
    }

    showVerificationModal (telephone) {
        this.setState({showVerificationModal: true,changeQRcode: false})
        const url = API_PATH + '/basis-api/noauth/basis/usermgmt/phone/verifyCode?phone=' + telephone
        // const url = 'http://swagger.dev.gemii.cc/basis-api/noauth/basis/usermgmt/phone/verifyCode?phone=' + telephone
        promiseXHR(url, null, null, 'GET')
            .then((res)=>{
                this.setState({verifyCode: JSON.parse(res).resultContent,changeQRcode: true})
            })
    }

    sendPhoneCode = () => {
        let {formData, verification} = this.state
        const {childController} = this.props
        const templateCode = childController == 'CHILD_VERIFY' ? 'PWD_RETRIEVAL_VCODE_MSG' : 'ADMIN_REGISTER_VCODE_MSG'
        const url = API_PATH + '/basis-api/noauth/basis/usermgmt/sendPhoneCode?phone=' + formData['telephone'] + '&templateCode=' + templateCode + '&verifyCode=' + verification
            promiseXHR(url, null, null, 'GET')
            .then((res)=>{
                const resData = JSON.parse(res)
                if (resData.resultCode == '100') {
                    this.setState({sendFlag: true,verificationStatus: ''})
                    this.setState({showVerificationModal: false})
                    this.refs.verification.value = ''
                }
                if (resData.resultCode == '01530110') {
                    this.setState({verificationStatus: '*图形码错误'})
                    this.showVerificationModal(formData['telephone'])
                }
                if (resData.resultCode == '01530111') {
                    this.setState({verificationStatus: '*图形码过期'})
                    this.showVerificationModal(formData['telephone'])
                }
                if (resData.resultCode == '01530112') {
                    this.setState({verificationStatus: '*操作频繁请稍后'})
                }
            })
    }

    handleInputChange(e) {
        let {formData} = this.state
        formData[e.target.name] = e.target.value
        this.setState({
            formData: formData,
            currentName:e.target.value
        })
        // console.log(e.target.value)

    }
    focusInput(name,e){
        // console.log(name,e)
        this.setState({
            currentName:name
        })
        // console.log(e)
    }
    protocolCheck() {
        this.setState({
            protocolChecked: !this.state.protocolChecked
        })
    }
    changeSendFlag = () => {
        this.setState({sendFlag: false})
    }
    changeQRcode = () => {
        let {formData} = this.state
        this.showVerificationModal(formData['telephone'])
    }

    render() {
        const {formData, formVerify, formTip, protocolChecked, verifyDisabled, verifyText,recommendDisabled,protocalShow,showVerificationModal,verifyCode,sendFlag,verificationStatus} = this.state
        const {childController, goLogin} = this.props
        let {formPoints,currentName,changeQRcode} = this.state
        let registerPoints = null
        if (childController == 'CHILD_VERIFY') {
            registerPoints = formPoints.filter((item, i)=>(item.name == 'telephone' || item.name == 'verifyCode'))
        } else {
            registerPoints = formPoints.filter((item,i)=>{return item.name != 'recommendCode'})
        }
        return (
            <div className="innerBox">
                <div className='verification-mask' style={{display: showVerificationModal ? 'block' : 'none'}}>
                    <div className="verification-modal">
                        <em onClick={() => {this.setState({showVerificationModal: false});this.refs.verification.value = ''}}></em>
                        <p className='verification-modal-title'>请提交图形码发送注册短信</p>
                        <p className='change-tips'>*点击验证码切换</p>
                        <div className="verification-box">
                            <input ref='verification' onChange={(e) => {this.setState({verification: e.target.value})}} type="text"/>
                            <img src={verifyCode} onClick={changeQRcode?this.changeQRcode:''} alt=""/>
                        </div>
                        <p className='verification-status'>{verificationStatus}</p>
                        <button className="verification-btn" onClick={this.sendPhoneCode}>确定</button>
                    </div>
                </div>
                <table style={{position:'relative'}}>
                    <tbody>
                    {
                        registerPoints.map((item, i)=>(
                            <tr key={i}>
                                <td colSpan={item.name == 'verifyCode' ? '0' : '2'}>
                                    <input className={item.name=='recommendCode'&&recommendDisabled?'recommendDisabled':'formInput'}
                                           value={formData[item.name]}
                                           type={item.name == 'password' || item.name == 'repeatPassword'? 'password' : 'text'}
                                           placeholder={item.placeholder}
                                           onChange={this.handleInputChange.bind(this)}
                                           onFocus={this.focusInput.bind(this,item.name)}
                                           onBlur={this.focusInput.bind(this,'')}
                                           name={item.name}
                                           id={formVerify[item.name] == 0 ? '' : 'fail'}
                                           disabled={item.name=='recommendCode'&&recommendDisabled}

                                    />
                                    <em className="inputIcon icon-home" style={{display: item.name == currentName ? 'block' : 'none'}}></em>
                                </td>
                                {
                                    item.name == 'verifyCode' ?
                                        <td>
                                            <VerifyTimer 
                                            // verifyDisabled={verifyDisabled}
                                                        //  verifyText={verifyText}
                                                        changeSendFlag={this.changeSendFlag}
                                                         sendFlag={sendFlag}
                                                         getVerifyCode={this.getVerifyCode.bind(this)}/>
                                        </td> : null
                                }
                                {
                                    formTip[item.name] == 0 ? null : formTip[item.name] == 1 ?
                                        <span><em className="icon-home"></em>{item.tipText}</span> :item.name=='recommendCode'?null:
                                        <span><em className="icon-home success"></em></span>
                                }
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
                {
                    childController == 'CHILD_REGISTER' ?
                        <div className="protocolBox" style={{color:protocolChecked?'#485767':'#b5bdc6'}}>
                            <em className={protocolChecked ? 'icon-home checked' : 'unchecked-confirm icon-home'}
                                onClick={this.protocolCheck.bind(this)}
                            ></em>
                            我已阅读并接受<span  style={{color:"#288bf2",textDecoration:'underline'}} onClick={this.showProtocal}>《栗子云服务协议》</span>
                        </div> : null
                }
                <button
                    className={childController == 'CHILD_REGISTER' ? protocolChecked ? 'registerBtn' : 'unchecked' : 'registerBtn'}
                    onClick={this.submitForm.bind(this)}
                    disabled={childController == 'CHILD_REGISTER' && !protocolChecked}>
                    {childController == 'CHILD_REGISTER' ? '注册' : '下一步'}
                </button>
                {
                    childController == 'CHILD_REGISTER' ?
                        <div className="registeredBox">
                            <a>已拥有账户?</a>
                            <a className="loginBtn"
                               onClick={goLogin}
                            >直接<span style={{color:"#288bf2"}}>登录</span></a>
                        </div> :
                        <div className="registeredBox">
                            <u className="backBtn"
                               onClick={goLogin}
                            >返回上一页</u>
                        </div>
                }
                {
                    protocalShow?<ProtocalBox hide={this.hideProtocal}/>:''
                }
            </div>
        )
    }
}
