import React,{Component} from 'react'
import UploadFile from '../../../shareComponent/UploadFile'
import UploadBtn from '../../../shareComponent/UploadBtn'
import ButtonBox from '../../../shareComponent/ButtonBox'
import RcolorPicker from '../../../shareComponent/RcolorPicker'
import AuthProvider from '../../../../funStore/AuthProvider'
import {API_PATH} from '../../../../constants/OriginName'
import promiseXHR from '../../../../funStore/ServerFun'
import {sendEvent} from '../../../../funStore/CommonFun'

export default class EditBox extends Component {
    constructor(props){
        super(props)
        this.state = {
            titleColorIpt: false,
            textColorIpt: false,
            block: false,
            submiting: false
        }
    }
    colorFocus = (k)=>{
        if(this.state.block) return
        let params={}
        params[k] = true
        this.setState(params)
    }
    colorBlur = (k)=>{
        if(this.state.block) return
        let params={}
        params[k] = false
        this.setState(params)
    }
    mouesEnterHandle=()=>{
        this.setState({block: true})
    }
    mouseLeaveHandle=()=>{
        this.setState({block: false})
    }
    setParamsHandle = (code,k,v)=>{
        let {params,updateParams,isEdit} = this.props
        if(isEdit) return
        if(k=='label'){
            params = {
                ...params,
                template: {
                    ...params.template,
                    templateItems: params.template.templateItems.map(item => {
                        return item.code==code?{
                            ...item,
                            label: v
                        }:item
                    })
                }
            }
        }
        if(k=='size'){
            let item = params.template.templateItems.find(v => v.code==code)
            if(item){
                let css = eval('('+item.css+')')
                if(v<0||v>50) return
                css.fontSize = v+'px'
                // console.log(css)
                params = {
                    ...params,
                    template: {
                        ...params.template,
                        templateItems: params.template.templateItems.map(item => {
                            return item.code==code?{
                                ...item,
                                css: JSON.stringify(css)
                            }:item
                        })
                    }
                }
            }
        }
        if(k=='color'){
            let item = params.template.templateItems.find(v => v.code==code)
            if(item){
                let css = eval('('+item.css+')')
                css.color = v
                params = {
                    ...params,
                    template: {
                        ...params.template,
                        templateItems: params.template.templateItems.map(item => {
                            return item.code==code?{
                                ...item,
                                css: JSON.stringify(css)
                            }:item
                        })
                    }
                }
            }
        }
        updateParams(params)
    }
    setBgHandle=(v)=> {
        this.props.setParamsHandle('backgroundPicUrl',v.url)
    }
    submitData= () => {
        const {submiting} = this.state
        const {params,selectType} = this.props
        if(!this.verifyFirstStepHandle()) return 
        if(submiting) return
        params.template.name = params.name
        this.setState({
            submiting: true
        })
        const url = `${API_PATH}/groupadmin-api/authsec/group/join/template`
        AuthProvider.getAccessToken().then((reslove,reject)=> {
            return promiseXHR(url ,{type:'Bearer',value:reslove},{
                "pageReq": params,
                "sysTtims":[]
            },'PUT')
        }).then(res => {
            const resData = JSON.parse(res)
            if(resData.resultCode=='100'){
                selectType('SELECT')
                sendEvent('message', {txt: "更新快速入群页面成功",code: 1000})
            }else if(resData.resultCode=='03801410'){
                this.setState({
                    submiting: false
                })
                sendEvent('message', {txt: "页面名称重复",code: 1004})
            }else{
                throw '更新快速入群页面失败'
            }
        }).catch(err => {
            console.log(err)
            this.setState({
                submiting: false
            })
            sendEvent('message', {txt: "更新快速入群页面失败",code: 1004})
        })
    }
    verifyFirstStepHandle = () => {
        const {params} = this.props
        const titleItem = params.template.templateItems.find(v => v.code=='H5_PAGE_TITLE')
        const descriptionItem = params.template.templateItems.find(v => v.code=="H5_GROUP_DESCRIBE")
        if(params.name==''){
            sendEvent('message', {txt: "请设置页面名称",code: 1004})
            return false
        }
        if(params.name.length>16){
            sendEvent('message', {txt: "页面名称长度不能超过16个字",code: 1004})
            return false
        }
        if(titleItem.label==''){
            sendEvent('message', {txt: "请设置页面标题",code: 1004})
            return false
        }
        if (descriptionItem.label=='') {
            sendEvent('message', {txt: "请设置群介绍",code: 1004})
            return false
        }
        if(params.backgroundPicUrl==''){
            sendEvent('message', {txt: "请设置背景图",code: 1004})
            return false
        }
        return true
    }
    
    add =()=> {
        let item = this.props.params.template.templateItems.find(v => v.code=='H5_PAGE_TITLE')
        if(item){
            let css = eval('('+item.css+')')
            if(parseInt(css.fontSize)<50){
                let v = isNaN(parseInt(css.fontSize))?50:parseInt(css.fontSize)+1
                this.setParamsHandle('H5_PAGE_TITLE','size',v)
            }else if(isNaN(parseInt(css.fontSize))){
                this.setParamsHandle('H5_PAGE_TITLE','size',1)
            }
        }
    }
    sub = () => {
        let item = this.props.params.template.templateItems.find(v => v.code=='H5_PAGE_TITLE')
        if(item){
            let css = eval('('+item.css+')')
            console.log(css)
            if(parseInt(css.fontSize)>0){
                let v = isNaN(parseInt(css.fontSize))?12:parseInt(css.fontSize)-1
                this.setParamsHandle('H5_PAGE_TITLE','size',v)
            }
        }
    }
    render(){
        const {titleColorIpt,textColorIpt,submiting} = this.state
        const {params,isEdit,showHandle,nextStep,pageNo,groupParams,setGroupParamsHandle,actions,selectType} = this.props
        const titleItem = params.template.templateItems.find(v => v.code=='H5_PAGE_TITLE')
        const descriptionItem = params.template.templateItems.find(v => v.code=="H5_GROUP_DESCRIBE")
        const titleCss = titleItem?eval('('+titleItem.css+')'):{}
        const descriptionCss = descriptionItem?eval('('+descriptionItem.css+')'):{} 
        return (
            <div className="editBox">
                <div className="page1" style={{display: pageNo==1?'block':'none'}}>
                    <div className="row">
                        <div className="label">页面名称：</div>
                        <div className="inputArea">
                            <input type="text" className="titleInput" placeholder="请输入页面名称" maxLength={16} value={params.name} onChange={(e)=>{!isEdit&&this.props.setParamsHandle('name',e.target.value)}}/>
                            <span className="textLimit">{params.name.length>16?16:params.name.length}/16</span>
                        </div>
                    </div>
                    <div className="row">
                        <div className="label">页面标题：</div>
                        <div className="inputArea">
                            <input disabled={isEdit} style={{cursor:isEdit?'not-allowed':''}} maxLength={10} type="text" className="titleInput" placeholder="请输入页面标题" value={titleItem?titleItem.label:''} onChange={(e)=>{this.setParamsHandle('H5_PAGE_TITLE','label',e.target.value)}}/>
                            <span className="textLimit">{titleItem?titleItem.label.length>10?10:titleItem.label.length:0}/10</span>
                            <div className="coloInput" 
                                tabIndex='1' 
                                onFocus={()=>{this.colorFocus('titleColorIpt')}}
                                onBlur={()=>{this.colorBlur('titleColorIpt')}}
                                style={{cursor:isEdit?'not-allowed':''}}
                            >
                                <span className="icon"></span>标题颜色
                                <div className="colorArea" style={{display:titleColorIpt?'block':'none'}} onMouseEnter={this.mouesEnterHandle} onMouseLeave={this.mouseLeaveHandle}>
                                    <RcolorPicker 
                                        pageTitleColor={titleCss.color}
                                        paramName={'color'}
                                        handleColor={(k,v)=>{this.setParamsHandle('H5_PAGE_TITLE',k,v.hex)}}
                                        widths={{
                                            position: 'absolute',
                                            zIndex: '10',
                                            right:'0'
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="label">标题大小：</div>
                        <div className="inputArea">
                            <input type="number" disabled={isEdit} style={{cursor:isEdit?'not-allowed':''}} className="numberInput" placeholder="请输入标题大小" value={isNaN(parseInt(titleCss.fontSize))?'':parseInt(titleCss.fontSize)} onChange={(e)=>{this.setParamsHandle('H5_PAGE_TITLE','size',e.target.value)}}/>
                            <div className="add-des">
                                <span className="addBtn" onClick={this.add}></span>
                                <span className="desBtn" onClick={this.sub}></span>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="label">群介绍：</div>
                        <div className="inputArea">
                            <textarea className="intrdInput" disabled={isEdit} style={{cursor:isEdit?'not-allowed':''}} placeholder="请输入欢迎文字" value={descriptionItem?descriptionItem.label:''} onChange={(e)=>{e.target.value.length<=80&&this.setParamsHandle('H5_GROUP_DESCRIBE','label',e.target.value)}}></textarea>
                            <span className="textLimit">{descriptionItem?descriptionItem.label.length:0}/80</span>
                            <div className="coloInput" 
                                tabIndex='2'
                                onFocus={()=>{this.colorFocus('textColorIpt')}}
                                onBlur={()=>{this.colorBlur('textColorIpt')}}
                                disabled={isEdit} style={{cursor:isEdit?'not-allowed':''}}
                            >
                                <span className="icon"></span>文本颜色
                                <div className="colorArea" style={{display:textColorIpt?'block':'none'}} onMouseEnter={this.mouesEnterHandle} onMouseLeave={this.mouseLeaveHandle}>
                                    <RcolorPicker 
                                        pageTitleColor={descriptionCss.color}
                                        paramName={'color'}
                                        handleColor={(k,v)=>{this.setParamsHandle('H5_GROUP_DESCRIBE',k,v.hex)}}
                                        widths={{
                                            position: 'absolute',
                                            zIndex: '10',
                                            right:'0'
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="label">背景图：</div>
                        <div className="inputArea">
                            <UploadFile 
                                text={''}
                                limitSize={4194304}
                                propsStyle={{
                                    width:'120px',
                                    height:'120px',
                                    float: 'left',
                                    cursor: isEdit?'not-allowed':''
                                }}
                                imgUrl={params.backgroundPicUrl}
                                onChange={(v)=>{this.setBgHandle(v)}}
                                onDelete={()=>{this.props.setParamsHandle('backgroundPicUrl','')}}
                            />
                            <span className="tips">尺寸 750*1334px，小于1MB<br/>仅支持 JPG、JPEG、PNG 格式</span>
                        </div>
                       
                    </div>
                    <div className="buttonArea" style={{marginTop: '24px'}}>
                        <ButtonBox
                            btnTxt={"保存"}
                            isCancel={false}
                            btnStyle={{
                                float:'right',
                                display: isEdit?'none':'block',
                            }}
                            btnFunc={this.submitData}
                        />
                        <ButtonBox
                            btnTxt={"返回"}
                            isCancel={true}
                            btnStyle={{
                                float:'right',
                                marginRight: '36px'
                            }}
                            btnFunc={() => {
                                selectType('SELECT')
                            }}
                        />
                    </div>
                </div>
            </div>
        )
    }
}