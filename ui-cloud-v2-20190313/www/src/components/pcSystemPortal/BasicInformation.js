import React,{Component,PropTypes} from 'react'
import OprateBox from './OprateBox'
import ResultBox from './ResultBox'
import promiseXHR from '../../funStore/ServerFun'
import AuthProvider from '../../funStore/AuthProvider'
import {API_PATH} from '../../constants/OriginName'

export default class BasicInformation extends Component {

  	constructor(props) {
		super(props);
		this.state={
			qrcode:false,
			resultStatus:'',
			resultDisplay: 'none',
			roleArray:null,
			userInfo: null,
			logoPath: '',
			phone:'',
			email:'',
			invitePath:'',
			inviteQrPath:'',
			hasNewInfo:true
    	}
		this.showQrcode=this.showQrcode.bind(this)
		this.hideQrcode=this.hideQrcode.bind(this)
		this.goProxy = this.goProxy.bind(this)
		this.changeAvatar = this.changeAvatar.bind(this)
		this.uploadSuccess = this.uploadSuccess.bind(this)
		this.uploadFail = this.uploadFail.bind(this)
		this.changePhone = this.changePhone.bind(this)
		this.updateEmail = this.updateEmail.bind(this)
	}
	
	componentWillMount(){
        AuthProvider.getAccessToken()
        .then((resolve,reject)=>{
          const url = API_PATH+'/basis-api/authsec/usermgmt/loadUserAndTenant'
            promiseXHR(url,{type:'Bearer',value:resolve},null,'GET')
            .then(res => {
				const resData = JSON.parse(res)
				const userInfo = resData.resultContent
                if(resData.resultCode == 100){
                    this.setState({
						userInfo: userInfo,
						logoPath: userInfo.logoPath==null?process.env.PUBLIC_URL+"/images/icon/avatar.png":userInfo.logoPath,
						phone: userInfo.phone,
						email: userInfo.email,
						invitePath: userInfo.invitePath,
						inviteQrPath: userInfo.inviteQrPath+'?d',
						hasNewInfo:userInfo.hasNew
					})
					this.props.getUserInfo(userInfo)
					return userInfo
                }
            }).then(userInfo => {
				const url = API_PATH+'/basis-api/authsec/usermgmt/inviteQr?_id='+userInfo.id
				if(userInfo.invitePath==null||userInfo.invitePath==''){
					promiseXHR(url,{type:'Bearer',value:resolve},null,'GET')
					.then(res => {
						const resData = JSON.parse(res)
						if(resData.resultCode==100){
							this.setState({
								invitePath: resData.resultContent.invitePath,
								inviteQrPath: resData.resultContent.inviteQrPath+'?d' 
							})
						}
					})
				}
			})
		})
		AuthProvider.getAccessToken()
        .then((resolve,reject)=>{
          const url = API_PATH+'/basis-api/authsec/sysdic/ROLE/TYPE'
            promiseXHR(url,{type:'Bearer',value:resolve},null,'GET')
            .then(res => {
				const resData = JSON.parse(res)
				const userInfo = resData.resultContent
                if(resData.resultCode == 100){
                    this.setState({
						roleArray: resData.resultContent
					})
                }
            })
        })
    }
	componentDidMount(){
		window.addEventListener('click',this.hideQrcode,true)
	}
	componentWillUnmount(){
	  	window.removeEventListener('click',this.hideQrcode,true)
	}
	showQrcode(){
		this.setState({
			qrcode: true
		});
	}
	hideQrcode(){
		this.setState({
			qrcode:false 
		});
	}
	goProxy(){
		this.props.goTo('PROXYTABLE')
		this.setState({
			hasNewInfo:false 
		});
	}
	uploadSuccess(){
        this.setState({
            resultStatus: 'success',
            resultDisplay: 'block'
        })
        setTimeout(() => {
            this.setState({
                resultStatus: '',
                resultDisplay: 'none'
            })
        }, 1500);
    }

    uploadFail(){
        this.setState({
            resultStatus: 'fail',
            resultDisplay: 'block'
        })
        setTimeout(() => {
            this.setState({
                resultStatus: '',
                resultDisplay: 'none'
            })
        }, 1500);
	}
	changeAvatar(url){
		this.setState({
			logoPath: url
		})
	}
	changePhone(phone){
		this.setState({
			phone: phone
		})
	}
	updateEmail(value){
       this.setState({
		   email:value 
       })
	}
	render() {
		const {qrcode,resultStatus,resultDisplay,roleArray,userInfo,logoPath,phone,email,invitePath,inviteQrPath,hasNewInfo}=this.state
		const {viewScope,popController,showPopHandle,hidePopHandle,buttonBlock,switchBlock} = this.props
		return (
		<div className='pc-basicInforWrap' style={{display:viewScope=="BASICINFO"?'block':'none'}}>
			<div className="inner">
				<div className="basicInforBox">
				{/* <div className="basicInforBox" style={{height:'575px'}}> */}
					<div className="basicContent">	
						<div className="avator-bigbox">
							<div className="avatorBox" onClick={()=>{showPopHandle('AVATAR')}}>
								<em className="modify">修改头像</em>
								<div className="maskAuator"></div>
								<img className="avator" src={logoPath} />
							</div>
							<div className="avatorName">{userInfo==null?'':userInfo.loginName}</div>
						</div>
						<div className="inforContent ">
							<div className="inforList clearfix">
								<div className="label">用户角色</div>
								<div className="inforMessage">{userInfo==null||userInfo.roles.length==0?'':userInfo.roles[0].name}</div>
							</div>
							<div className="inforList clearfix">
								<div className="label">角色类型</div>
								<div className="inforMessage">{userInfo==null||userInfo.roles.length==0||roleArray==null?'':roleArray.find(item => item.value==userInfo.roles[0].type).displayValue}</div>
							</div>
							<div className="inforList clearfix">
								<div className="label">手机号码</div>
								<div className="inforMessage">{phone}</div>
								<div className="edit icon-set" onClick={()=>{showPopHandle('PHONE')}}></div>
							</div>
							<div className="inforList clearfix">
								<div className="label">邮箱地址</div>
								<div className="inforMessage">{email}</div>
								<div className="edit icon-set" onClick={()=>{showPopHandle('EMAIL')}}></div>
							</div>
							<div className="inforList clearfix">
								<div className="label">用户密码</div>
								<div className="btnSet" onClick={()=>{showPopHandle('PASSWORD')}}>重置密码</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<OprateBox 
				popController={popController}
				hidePopHandle={hidePopHandle}
				email={email}
				userInfo={userInfo}
				logoPath={logoPath}
				changeAvatar={this.changeAvatar}
				uploadSuccess={this.uploadSuccess}
				uploadFail={this.uploadFail}
				phone={phone}
				changePhone={this.changePhone}
				updateEmail={this.updateEmail}
				buttonBlock={buttonBlock}
                switchBlock={switchBlock}
			/>
			<ResultBox status={resultStatus} display={resultDisplay}/>
		</div>
    )
  }
}
