import React,{Component} from 'react'
import PropTypes from 'prop-types';
import './index.css'
import AuthProvider from '../../../funStore/AuthProvider'
import promiseFile from '../../../funStore/UploadXHR'
import {API_PATH} from '../../../constants/OriginName'
import {sendEvent} from '../../../funStore/CommonFun'

export default class UploadFile extends Component {
    constructor(props){
        super(props)
        this.state = {
            imgUrl: props.imgUrl,
            loading: false,
            num: 0
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        // Store prevId in state so we can compare when props change.
        if (nextProps.imgUrl !== prevState.imgUrl) {
            return {
                imgUrl: nextProps.imgUrl
            }
        }
        return null;
    }
    
    clickHandle=()=> {
        let fileContainer = document.createElement("input")
        fileContainer.type = 'file'
        fileContainer.onchange = (e) => {
          this.uploadEvent(e.target.files[0],e.target.value)
        }
        fileContainer.click()
    }
    uploadEvent=(file,value) =>{
        const index = value.lastIndexOf('.')
        const finalName = value.substr(index+1)
        const format = this.props.limitFormat
        const size = file.size
        const formData = new FormData()
        formData.append('file',file)
        if(!format.includes(finalName.toLowerCase())){
            // 图片格式错误或大小超过限制
            sendEvent('message', {txt: '图片格式错误！', code: 1004})
            return
        }
        if(size>this.props.limitSize){
            // 图片格式错误或大小超过限制
            sendEvent('message', {txt: '图片大小超过限制！', code: 1004})
            return
        }
        this.getImageSize(file, (w,h,data)=>{
            this.setState({
                imgUrl: data
            })
            this.successHandle(formData).then(res => {
                this.props.onChange(res)
            })
        })
    }
    successHandle=(formData)=>{
        const self = this
        // const url = API_PATH+'/gridfs-api/noauth/s3-media'
        const url = API_PATH+'/gridfs-api/noauth/media'
        this.startLoading()
          return promiseFile(url,formData)
          .then(res => {
            this.endLoading()
            if(self.props.clear){
                this.setState({
                    imgUrl: ''
                })
            }
            return res.resultContent
          })
    }
    getImageSize = (file,callback) => {
        let reader=new FileReader()
        reader.onload=function (e) {
            let data=e.target.result//读取的结果
            let image=new Image()
            image.onload=() => {
                let width=image.width,
                    height=image.height;
                callback(width,height,data)
            };
            image.src=data
        };
        reader.readAsDataURL(file);
    }
    startLoading = () => {
        this.setState({
            loading: true
        })
        let timecount =()=> {
            let num = this.state.num
            num+=1
            if(num<100){
                this.setState({
                    num: num
                })
            }else{
                clearInterval(this.timer)
            }
        } 
        this.timer = setInterval(timecount,10)
    }
    endLoading = () => {
        clearInterval(this.timer)
        this.setState({
            loading: false,
            num: 0
        })
    }
    deleteHandle = (e) =>{
        e.stopPropagation()
        this.setState({
            imgUrl: ''
        })
        this.props.onDelete('')
    }
    render(){
        const {imgUrl,loading,num} = this.state
        const {text,propsStyle,limitSize} = this.props
        return (
            <div className="public-uploadFile" onClick={this.clickHandle} style={propsStyle}>
            {
                imgUrl
                ?<div className="preview" style={{backgroundImage:'url('+imgUrl+')'}}>
                    {
                        loading
                        ?<div className="loadModal" style={{height:(100-num)+'%'}}>
                        </div>
                        :<div className="icon-del" onClick={this.deleteHandle}></div>
                    }
                    {
                        loading?<span>{num}%</span>:''
                    }
                </div>
                :<div className="noPic">
                    <div className="icon-add"></div>
                    <div>{text}</div>
                </div>
            }
            </div>
        )
    }
}

UploadFile.defaultProps={
    text: '',//图片不超过4M
    limitSize: 4194304,
    imgUrl:'',
    limitFormat:["jpg","png","jpeg"]
}

UploadFile.propTypes = {
    // optionalArray: PropTypes.array,
    // optionalBool: PropTypes.bool,
    // optionalFunc: PropTypes.func,
    // optionalNumber: PropTypes.number,
    // optionalObject: PropTypes.object,
    // optionalString: PropTypes.string,
    // optionalSymbol: PropTypes.symbol,
    text: PropTypes.string,
    limitSize: PropTypes.number,
    limitFormat: PropTypes.array,
    propsStyle: PropTypes.object,
    imgUrl: PropTypes.string,
    onChange: PropTypes.func,
    onDelete: PropTypes.func
}