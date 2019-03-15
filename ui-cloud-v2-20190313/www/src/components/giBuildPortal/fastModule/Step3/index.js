/* 
    已废弃，过期删除
*/

import React,{Component} from 'react'
import {Robot1,Robot2,Robot3} from './unit'
import {API_PATH} from '../../../../constants/OriginName'
import AuthProvider from '../../../../funStore/AuthProvider'
import promiseXHR from '../../../../funStore/ServerFun'
import promiseFile from '../../../../funStore/promiseFile'
import {sendEvent} from '../../../../funStore/CommonFun'
// import './index.css'
import UploadBtn from '../../../shareComponent/UploadBtn'
import ButtonBox from '../../../shareComponent/ButtonBox'


export default class Step2 extends Component {
    constructor(props){
        super(props)
        this.state = {
            uploading: false,
            downloadFlag: false
        }
    }
    downloadHandle = () => {
        const {templateId} = this.props
        const url = `${API_PATH}/groupadmin-api/authsec/robothost/template/download?joinGroupTemplateId=${templateId}`
        AuthProvider.getAccessToken().then((reslove,reject)=> {
            return promiseXHR(url ,{type:'Bearer',value:reslove},null,'post')
        }).then(res => {
            const resData = JSON.parse(res)
            if(resData.resultCode==100){
                let url = resData.resultContent
                let a = document.createElement('a')
                a.href=url
                a.click()
                this.setState({
                    downloadFlag: true
                })
                sendEvent('message', {txt: "下载模板成功",code: 1000})
            }else{
                throw '下载模板失败'
            }
        }).catch(err => {
            console.log(err)
            sendEvent('message', {txt: "下载模板失败",code: 1004})
        })
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
        const format = ["xls","xlsx"]
        const size = file.size
        const formData = new FormData()
        formData.append('file',file)
        if(size>548576||!format.includes(finalName.toLowerCase())){
            // 图片格式错误或大小超过限制
            return
        }
        this.successHandle(formData)
    }
    successHandle=(formData)=>{
        const {setSuccess} = this.props
        const url = API_PATH+'/groupadmin-api/authsec/robothost/batch/create/groups?createType=5'
        this.startLoading()
        AuthProvider.getAccessToken().then((reslove,reject)=> {
            return promiseFile(url ,reslove,formData)
        }).then(res => {
            const resData =  res
            if(resData.resultCode=='100'){
                this.endLoading()
                setSuccess(true)
            }else{
                throw '快速入群失败'
            }
        })
        .catch(err => {
            console.log(err)
            this.endLoading()
            setSuccess(false)
        })
    }
    startLoading=()=>{
        this.setState({
            uploading : true 
        })
    }
    endLoading=()=>{
        this.setState({
            uploading : false
        })
    }
    render(){
        const {uploading,downloadFlag} = this.state
        return (
            <div className="gi-batch-step2">
                <div className="row">
                    <div className="label">机器人介绍：</div>
                    <div className="content">
                        <Robot1 />
                        <Robot2 />
                        <Robot3 />
                    </div>
                </div>
                <div className="row" style={{marginBottom:'32px'}}>
                    <div className="label">建群模版示例：</div>
                    <div className="content">
                        <div className="top">
                            <span className="download" onClick={this.downloadHandle}>下载建群模版</span>
                            <span className="upload">完善信息后上传</span>
                            <div className="imageBox"></div>
                        </div>
                    </div>
                </div>
                <div className="buttonArea">
                {
                    downloadFlag
                    ?<UploadBtn 
                        loading={uploading}
                        text={"上传模版建群"}
                        loadingText={"上传中"}
                        clickHandle={this.uploadHandle}
                        propsStyle={{
                            width:'108px',
                            height:'36px'
                        }}
                    />
                    :<ButtonBox 
                        btnTxt={'下载模板'}
                        isCancel={false}
                        btnStyle={{
                            width:'108px',
                            height:'36px'
                        }}
                        btnFunc={this.downloadHandle}
                    />
                } 
                </div>
            </div>
        )
    }
}