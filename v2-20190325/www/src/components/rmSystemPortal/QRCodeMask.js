import React,{Component} from 'react';
import promiseXHR from '../../funStore/ServerFun'
import AuthProvider from '../../funStore/AuthProvider'
import {API_PATH} from '../../constants/OriginName'

export default class QRCodeMask extends Component{
    constructor(){
        super();
        this.state={
            VRCode:''
        }
    };
    componentWillMount(){
        const robotCode=this.props.robotCode;
        const url = API_PATH+'/groupadmin-api/authsec/groupadmin/robot/validate/code?robotCode='+robotCode;
        AuthProvider.getAccessToken()
            .then((resolve,reject)=>{
            return promiseXHR(url,{type:'Bearer',value:resolve},null,'GET')
            })
            .then((res)=>{
                this.setState({
                    VRCode:'『'+JSON.parse(res).resultContent + '』'
                })
            })
    }
    render(){
        const {VRCode} =this.state;
        return(
            <div style={{height:'100%', width:'100%',display:this.props.showMask?'block':'none'}} className="qr-mask">
                <div className="operating-steps">
                    <p>助手二维码</p>
                    <div className="qr-code">
                        <img
                            src={this.props.qrCode}
                        />
                    </div>
                    <p className="VRCode" style={{height:'21px'}}>{VRCode}</p>
                    <div className="qr-code-steps">
                        <p>导入群步骤：</p>
                        <p>1. 扫描小助手二维码，添加其为好友；</p>
                        <p>2. 将上方验证码（不包含#）发给小助手，进行绑定和激活；</p>
                        <p>3. 将绑定成功的小助手拉入需要管理的群内，并在群内发送任意一条文本消息；</p>
                        <p>4. 刷新群管理列表，查看该群。</p>
                    </div>
                    <span
                        className="icon-home close-qrcode"
                        onClick={this.props.showMaskHandle}
                    ></span>
                </div>
            </div>
        )
    }
}
