import React,{Component,PropTypes} from 'react'
import './index.css'
import promiseXHR from '../../../funStore/ServerFun'
import AuthProvider from '../../../funStore/AuthProvider'
import {API_PATH} from '../../../constants/OriginName'
import promiseFile from '../../../funStore/UploadXHR'
import IptLimit  from '../../shareComponent/IptLimit'
// import Radio from '../../shareComponent/Radio'
import ButtonBox from '../../shareComponent/ButtonBox'
import UploadBtn from '../../shareComponent/UploadBtn'
import {sendEvent} from '../../../funStore/CommonFun'

export default class AvatarSet extends Component {
    constructor(props){
        super(props)
        this.state = {
            data: {
                "headImage": props.selectData.headImage,
                "wechatName": props.selectData.wechatName,
                "verfyFlg": props.selectData.verfyFlg?props.selectData.verfyFlg:1
            },
            submiting: false
        }
    }
    setparamsHandle= (k,v) =>{
        let {data} = this.state
        data[k] = v
        this.setState({data})
    }
    uploadHandle = () => {
        let fileContainer = document.createElement("input")
        fileContainer.type = 'file'
        fileContainer.onchange = (e) => {
            this.uploadEvent(e.target.files[0],e.target.value)
        }
        fileContainer.click()
    }
    uploadEvent=(file,value)=> {
        const index = value.lastIndexOf('.')
        const finalName = value.substr(index+1)
        const format = ["jpg","jpeg",'png']
        const size = file.size
        const formData = new FormData()
        formData.append('file',file)
        if(size>4194304||!format.includes(finalName.toLowerCase())){
            // 图片格式错误或大小超过限制
            return
        }
        this.successHandle(formData)
    }
    successHandle=(formData)=>{
        const url = API_PATH+'/gridfs-api/noauth/media'
        promiseFile(url,formData)
        .then(res => {
            const resData = res
            if(resData.resultCode=='100'){
                this.setparamsHandle('headImage',resData.resultContent.url)
                sendEvent('message', {txt: "上传头像成功",code: 1000})
            }else{
                throw '上传头像失败'
            }
        })
        .catch(err => {
            sendEvent('message', {txt: "上传头像失败",code: 1004})
        })
    }
    submitData = () =>{
        const {data} = this.state
        const {selectData,updateListData,hideModal} = this.props
        const url = `${API_PATH}/groupadmin-api/authsec/robothost/account/${selectData.id}`
        AuthProvider.getAccessToken()
        .then((resolve,reject)=>{
            return promiseXHR(url,{type:'Bearer',value:resolve},data,'POST')})
        .then((res) =>{
            const resData = JSON.parse(res)
            if(resData.resultCode=='100'){
                updateListData(resData.resultContent)
                hideModal('avatarSetFlag')
                sendEvent('message', {txt: "账号设置成功",code: 1000})
            }else{
                throw '账号设置失败'
            }
        })
        .catch(err => {
            hideModal('avatarSetFlag')
            sendEvent('message', {txt: "账号设置失败",code: 1004})
        })
    }
    render (){
        const {data,submiting} = this.state
        const {selectData,hideModal} = this.props
        return (
            <div className="modalWrapper">
                <div className="modalBox avatarSet">
                    <div className="header">账号设置</div>
                    <div className="set">
                        <img className="img" src={data.headImage} alt="" onClick={this.uploadHandle}/>
                        <p className="nickname">{data.wechatName}</p>
                        <IptLimit
                            label={"昵称："}
                            placeholder={"请输入"}
                            maxLength={16}
                            widths={{
                                width:'280px',
                                height: '36px'
                            }}
                            widthsLa={{
                                paddingLeft: '36px'
                            }}
                            value={data.wechatName}
                            paramName={'wechatName'}
                            setparamsHandle={this.setparamsHandle}
                        />
                        <div className="row">
                            <div className="label">签名：</div>
                            <div className="text">{selectData.aliasName?selectData.aliasName:'暂无签名~'}</div>
                        </div>
                        {/* <div className="row">
                            <div className="label">加我好友时需要验证：</div>
                            <Radio
                                sourceData = {[{name:'开启',value:1},{name:'关闭',value:2}]}
                                paramName = {'verfyFlg'}
                                value = {data.verfyFlg}
                                onChange= {this.setparamsHandle}
                            />
                        </div> */}
                        <div className="buttonArea">
                            <ButtonBox 
                                btnTxt={'取消'}
                                isCancel={true}
                                btnStyle={{
                                    float:'left',
                                    fontWeight:400
                                }}
                                btnFunc={()=>{hideModal('avatarSetFlag')}}
                            />
                            <UploadBtn 
                                loading={submiting}
                                text={"保存"}
                                loadingText={"提交中"}
                                clickHandle={this.submitData}
                                propsStyle={{
                                    width:'108px',
                                    height:'36px',
                                    float:'left'
                                }}
                            />
                        </div>
                    </div>
                    <div className="closeBtn" onClick={()=>{hideModal('avatarSetFlag')}}></div>
                </div>
            </div>
        )
    }
}