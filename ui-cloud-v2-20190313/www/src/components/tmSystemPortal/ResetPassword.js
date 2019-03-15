import React, {Component} from 'react'
import promiseXHR from '../../funStore/ServerFun'
import AuthProvider from '../../funStore/AuthProvider'
import {API_PATH} from '../../constants/OriginName'
import {sendEvent} from "../../funStore/CommonFun";

const errorTips = {
    'NO_OLD_PSW':'请输入原始密码',
    'NO_NEWPASW':'请输入重置密码',
    'USER_NONE': '用户不存在',
    'PASSWORD_ERROR': '旧密码不正确',
    'UPDATE_FAIL': '更新失败',
    'PASSWORD_DIFF': '两次密码不一致'
}

export default class ResetPassword extends Component {

    constructor(props) {
        super(props)
        this.oldPwdInput = this.oldPwdInput.bind(this)
        this.newPwdInput = this.newPwdInput.bind(this)
        this.confirmPwdInput = this.confirmPwdInput.bind(this)
        this.confirmHandle = this.confirmHandle.bind(this)
        this.state = {
            showTip: false,
            tipType: '',
            oldPwd: '',
            newPwd: '',
            confirmPwd: ''
        }
    }

    oldPwdInput(e) {
        this.setState({
            oldPwd: e.target.value
        })
    }

    newPwdInput(e) {
        this.setState({
            newPwd: e.target.value
        })
    }

    confirmPwdInput(e) {
        this.setState({
            confirmPwd: e.target.value
        })
    }

    confirmHandle() {
        if(!this.handleVerity()) return

        const paramas = {
            "id": this.props.echoId,
            "newPassword": this.state.newPwd,
            "oldPassword": this.state.oldPwd
        }
        // console.log(paramas,'paramas===')
        AuthProvider.getAccessToken()
            .then((resolve, reject) => {
                const url = API_PATH + '/basis-api/authsec/usermgmt/password'
                promiseXHR(url, {type: 'Bearer', value: resolve}, paramas, 'POST')
                    .then(res => {
                        const resData = JSON.parse(res)
                        if (resData.resultCode == 100) {
                            sendEvent('message', {txt: "重置密码成功", code: 1000, timer: 2000})
                            this.props.hideResetpsw()
                        } else if (resData.resultCode == '01050002') {
                            this.handleShowTip('USER_NONE')

                        } else if (resData.resultCode == '01050007') {
                            this.handleShowTip('PASSWORD_ERROR')
                        } else if (resData.resultCode == '01050006') {
                            this.handleShowTip('UPDATE_FAIL')
                        }else{
                            sendEvent('message', {txt: "重置密码失败", code: 1000, timer: 2000})
                        }
                    })
            })
    }

    handleVerity=()=>{
        let flag = true
        const {oldPwd, newPwd, confirmPwd} =this.state
        if(oldPwd==''){
            this.handleShowTip('NO_OLD_PSW')
            flag = false
            return
        }
        if(newPwd==''){
            this.handleShowTip('NO_NEWPASW')
            flag = false
            return
        }
        if(newPwd!=confirmPwd){
            this.handleShowTip('PASSWORD_DIFF')
            flag = false
            return
        }
        return flag
    }

    handleShowTip=(tipType)=>{
        this.setState({
            showTip: true,
            tipType: tipType
        })
    }


    render() {
        const {showTip, tipType, oldPwd, newPwd, confirmPwd} = this.state
        const {hideResetpsw} = this.props
        return (
            <div className='pc-oprateWrapper'>
            <div className="uploadBox reSetWrap">
                <div className="offBtn icon-home" onClick={hideResetpsw}></div>
                <h4 className="title" style={{marginBottom:'38px'}}>重置密码</h4>
                <div className="inputList clearfix">
                    <div className="label">原始密码：</div>
                    <input required type="password" className="editIpt" placeholder='请输入您账号的密码' value={oldPwd}
                           onChange={this.oldPwdInput} name='oldPassword'/>
                </div>
                <div className="inputList clearfix">
                    <div className="label">重置密码：</div>
                    <input required type="password" className="editIpt" placeholder='请输入您要重置的密码' value={newPwd}
                           onChange={this.newPwdInput} name='newPassword'/>
                </div>
                <div className="inputList clearfix">
                    <div className="label">确认密码：</div>
                    <input required type="password" className="editIpt" placeholder='请再次确认您的密码' value={confirmPwd}
                           onChange={this.confirmPwdInput} name='passwordRepeat'/>
                    <div className="error reserError" style={{visibility: showTip ? 'visible' : 'hidden'}}>
                        <em className="icon-set errorIcon"></em>
                        {errorTips[tipType]}
                    </div>
                </div>
                <div className="btnBox">
                    <button className='sure' onClick={this.confirmHandle}>确定</button>
                    <button className='cancel' onClick={hideResetpsw}>取消</button>
                </div>
            </div>
            </div>
        );
    }
}
