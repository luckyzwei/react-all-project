import React,{Component} from 'react'
import promiseXHR from '../../funStore/ServerFun'
import AuthProvider from '../../funStore/AuthProvider'
import {API_PATH} from '../../constants/OriginName'

export default class EditEmail extends Component {

  constructor(props) {
    super(props);
    this.state={
      error:false,
      email:''
    }
    this.submitEmail = this.submitEmail.bind(this)
    this.setEmail =this.setEmail.bind(this)
  }
  componentDidMount() {
    this.setState({
      email: this.props.email
    });
  }
  setEmail(e){
    this.setState({
      email: e.target.value
    })
  }
  submitEmail(){
    if(!this.props.buttonBlock){
      this.props.switchBlock()
      let emailIpt = this.state.email
      let id=this.props.userInfo.id
      let emailReg = /^[\.a-zA-Z0-9_-]+@([a-zA-Z0-9]+\.)+(com|cn|net|org||cc)$/;
      const url=API_PATH + '/basis-api/authsec/usermgmt/'+id+'/email?_email='+emailIpt
        if(emailReg.test(emailIpt)){
            this.setState({
              error:false
            })
            AuthProvider.getAccessToken()
            .then((resolve,reject)=>{
              promiseXHR(url,{type:'Bearer',value:resolve},{},'PUT')
                .then(res => {
                  const resData = JSON.parse(res)
                  if(resData.resultCode == 100){
                    this.props.hidePopHandle()
                    this.props.updateEmail(emailIpt)
                  }
                })
              })
        }else{
          this.setState({
            error:true
          })
        }
    }
  }
  render() {
    const {hidePopHandle,updateEmail} = this.props
    const {error,email} = this.state
    return (
      <div className="uploadBox editInfoWrap">
        <div className="offBtn icon-home" onClick={hidePopHandle}></div>
        <h4 className="title">编辑邮箱</h4>
        <div className="inputList clearfix">
          <div className="label">邮箱地址：</div>
          <input type="text" className="editIpt"   value={email||''}   placeholder='请输入您的邮箱' onChange={this.setEmail}/>
            <div className="error" style={{display:error?'block':'none'}}><em className="icon-set errorIcon"></em>请输入正确的邮箱</div>
        </div>
        <div className="btnBox">
          <button className='sure' onClick={this.submitEmail}>确定</button>
            <button className='cancel' onClick={hidePopHandle}>取消</button>
        </div>
      </div>
    )
  }
}
