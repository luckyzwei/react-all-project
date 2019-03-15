import React,{Component} from 'react'
import './index.css'
import ButtonBox from '../../../shareComponent/ButtonBox'
import promiseXHR from '../../../../funStore/ServerFun'
import AuthProvider from '../../../../funStore/AuthProvider'
import promiseFile from '../../../../funStore/promiseFile'
import {API_PATH} from '../../../../constants/OriginName'
import {sendEvent} from '../../../../funStore/CommonFun'
import UploadBtn from '../../../shareComponent/UploadBtn'

export default class BatchModal extends Component {
    constructor(props){
        super(props)
        this.state = {
            submiting: false
        }
    }
    downloadHandle = () => {
        const url = `${API_PATH}/articlemgmt/noauth/knowledgemodel`
        // AuthProvider.getAccessToken().then((resolve,reject)=>{
        //     return promiseXHR(url,{type:'Bearer',value:resolve},null,'POST')
        // })
        promiseXHR(url,null,null,'POST')
        .then(res => {
            let form = document.createElement('form');
            form.id = "form";
            form.method = "post";
            form.action = url;
            document.body.appendChild(form).submit()
            document.getElementById('form').remove()
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
        if(size>512000||!format.includes(finalName.toLowerCase())){
            // 格式错误或大小超过限制
            return
        }
        this.successHandle(formData)
    }
    successHandle=(formData)=>{
        const {pageInfo,searchParams} = this.props
        const url = `${API_PATH}/knowledge-base/authsec/knowledgeexcel/${this.props.userId}`
        const {submiting} = this.state
        if(submiting) return
        this.setState({submiting: true})
        AuthProvider.getAccessToken().then((resolve,reject)=>{
         return promiseFile(url,resolve,formData)
        }).then(res => {
            const resData = res
            if(resData.resultCode=='100'){
                this.setState({submiting: false})
                sendEvent('message', {txt: "批量上传成功",code: 1000}) 
                this.props.onCancel()
                this.props.repullList()
            }else{
                throw '批量上传失败'
            }
        })
        .catch(err => {
            this.setState({submiting: false})
            sendEvent('message', {txt: "批量上传失败",code: 1004})
        })
    }
    render(){
        const {submiting} = this.state
        const {onCancel,userId} = this.props
        return (
            <div className="modalWrapper">
                <div className="modalBox cw-batchModal">
                    <div className="title">批量导入内容</div>
                    <img src={process.env.PUBLIC_URL+"/images/icon/cw_batch.png"} alt=""/>
                    <UploadBtn 
                        loading={submiting}
                        text={"上传文件"}
                        loadingText={"上传中"}
                        clickHandle={this.uploadHandle}
                        propsStyle={{
                            width:'108px',
                            height:'36px',
                            margin:'0 auto'
                        }}
                    />
                    <div className="tips">如果没有模板，请先<span onClick={this.downloadHandle}>下载模板</span>哦</div>
                    <div className="closeBtn" onClick={onCancel}></div>
                </div>
            </div>
        )
    }
}