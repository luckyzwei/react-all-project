import React,{Component} from 'react'
import $ from 'jquery'
import promiseXHR from '../../funStore/ServerFun'
import AuthProvider from '../../funStore/AuthProvider'
import {API_PATH} from '../../constants/OriginName'
import ImageEditor from '../shareComponent/ImageEditor'

export default class UploadBox extends Component {

  constructor(props) {
		super(props)
		this.getImage = this.getImage.bind(this)
		this.imgSelect = this.imgSelect.bind(this)
		this.uploadHandle = this.uploadHandle.bind(this)
		this.state={
			imgUrl: '',
			imgData: null
		}
	}

	componentDidMount(){
		this.setState({
			imgUrl:	this.props.logoPath+'?'+Math.random()
		})
	}

	getImage(data){
		this.setState({
			imgData: data
		})
	}

	uploadHandle(){
		const parama = {
			data: this.state.imgData,
			id: this.props.userInfo.id
		}
		AuthProvider.getAccessToken()
		.then((resolve,reject)=>{
			const url = API_PATH+'/basis-api/authsec/usermgmt/uploadUserLogo'
				promiseXHR(url,{type:'Bearer',value:resolve},parama,'POST')
				.then(res => {
					const resData = JSON.parse(res)
					if(resData.resultCode==100){
						this.props.uploadSuccess&&this.props.uploadSuccess()
						this.props.changeAvatar(resData.resultContent)
					}else{
						this.props.uploadFail&&this.props.uploadFail()
					}
				})
		})
		this.props.hidePopHandle()
	}

	imgSelect(){
		const file = $('#avatarInput')[0].files[0]
		const _this = this
		let reader=new FileReader()
		reader.onload=function (e) {
				let data=e.target.result//读取的结果
				// let image=new Image()
				// image.onload=() => {
				// 		let width=image.width,
				// 				height=image.height;
				// 		callback(width,height)
				// };
				// image.src=data
					_this.setState({
						imgUrl: data
					})
		}
		reader.readAsDataURL(file)
	}

  render() {
		const {imgUrl,imgData} = this.state
		const {hidePopHandle} = this.props
    return (
			<div className="uploadBox">
				<div className="offBtn icon-home" onClick={hidePopHandle}></div>
				<h4 className="title">上传头像</h4>
				<ImageEditor url={imgUrl} width={120} height={120} borderRadius={60} getImage={this.getImage}/>
				<div className="uploadTip">
					上传头像
					<input id="avatarInput" type="file" className='uploadBtn' onChange={this.imgSelect}/>
				</div>
				<div className="btnBox" style={{marginTop: '34px'}}>
					<button className='sure' onClick={this.uploadHandle}>确定</button>
                    <button className='cancel' onClick={hidePopHandle}>取消</button>
				</div>
			</div>
    )
  }
}
