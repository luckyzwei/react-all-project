import React,{Component} from 'react'
import './index.css'
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
        const {params} = this.props
        if(!this.verifySecondStepHandle()) return 
        if(submiting) return
        // const titleItem = params.template.templateItems.find(v => v.code=='H5_PAGE_TITLE')
        params.template.name = params.name
        this.setState({
            submiting: true
        })
        const url = `${API_PATH}/groupadmin-api/authsec/group/join/template`
        AuthProvider.getAccessToken().then((reslove,reject)=> {
            return promiseXHR(url ,{type:'Bearer',value:reslove},{
                "pageReq": params,
                "sysTtims":[]
            },params.id?'put':'post')
        }).then(res => {
            const resData = JSON.parse(res)
            if(resData.resultCode=='100'){
                return resData.resultContent.id
            }else if(resData.resultCode=='03801410'){
                this.setState({
                    submiting: false
                })
                sendEvent('message', {txt: "页面名称重复",code: 1004})
            }else{
                throw '创建快速模板失败'
            }
        }).then(id =>{
            const url = `${API_PATH}/groupadmin-api/authsec/robothost/quick/create/group`
            const {groupParams} = this.props
            groupParams.joinGroupTemplateId = id
            return AuthProvider.getAccessToken().then((reslove,reject)=> {
                return promiseXHR(url ,{type:'Bearer',value:reslove},groupParams,'post')
            }).then(res => {
                const resData = JSON.parse(res)
                if(resData.resultCode=='100'){
                    this.props.setTemplateId(id,resData.resultContent,true)
                    this.setState({
                        submiting: false
                    })
                }else{
                    this.props.setTemplateId(id,'',false)
                    throw '创建快速模板失败'
                }
            })
        }).catch(err => {
            console.log(err)
            this.setState({
                submiting: false
            })
            sendEvent('message', {txt: "创建快速模板失败",code: 1004})
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
        // if(titleItem.label==''){
        //     sendEvent('message', {txt: "请设置页面标题",code: 1004})
        //     return false
        // }
        // if (descriptionItem.label=='') {
        //     sendEvent('message', {txt: "请设置群介绍",code: 1004})
        //     return false
        // }
        if(params.backgroundPicUrl==''){
            sendEvent('message', {txt: "请设置背景图",code: 1004})
            return false
        }
        return true
    }
    verifySecondStepHandle=()=>{
        const {groupParams} = this.props
        if(groupParams.groupName==''){
            sendEvent('message', {txt: "群名称不能为空",code: 1004})
            return false
        }
        if(isNaN(groupParams.createGroupNum)){
            sendEvent('message', {txt: "请输入正确群数量",code: 1004})
            return false
        }else if(groupParams.createGroupNum>5){
            sendEvent('message', {txt: "群数量不能大于5个",code: 1004})
            return false
        }
        
        if(isNaN(groupParams.initIndexNum)){
            sendEvent('message', {txt: "请输入正确编号初始值",code: 1004})
            return false
        }
        if(parseInt(groupParams.createGroupNum)<=0){
            sendEvent('message', {txt: "群数量必须大于0个",code: 1004})
            return false
        }
        if(parseInt(groupParams.initIndexNum)<=0){
            sendEvent('message', {txt: "编号初始值必须大于0",code: 1004})
            return false
        }
        if(groupParams.introduce==''){
            sendEvent('message', {txt: "群公告不能为空",code: 1004})
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
                                onChange={(v)=>{!isEdit&&this.setBgHandle(v)}}
                                onDelete={()=>{this.props.setParamsHandle('backgroundPicUrl','')}}
                            />
                            <span className="tips">尺寸 750*1334px，小于1MB<br/>仅支持 JPG、JPEG、PNG 格式</span>
                        </div>
                       
                    </div>
                    <div className="buttonArea" style={{marginTop: '24px'}}>
                        <ButtonBox
                            btnTxt={"下一步"}
                            isCancel={false}
                            btnStyle={{
                                float:'right',
                                display: isEdit?'none':'block',
                            }}
                            btnFunc={() => {
                                this.verifyFirstStepHandle()&&this.props.setPageNo(2)
                            }}
                        />
                        <ButtonBox
                            btnTxt={"返回"}
                            isCancel={true}
                            btnStyle={{
                                float:'right',
                                marginRight: isEdit?'0':''
                            }}
                            btnFunc={() => {
                                selectType&&selectType('SELECTMODAL')
                            }}
                        />
                    </div>
                </div>
                <div className="page2" style={{display: pageNo==2?'block':'none'}}>
                    <div className="row">
                        <div className="label">群名称：</div>
                        <div className="inputArea">
                            <input type="text" className="titleInput" placeholder="请输入群名称" maxLength={10} value={groupParams.groupName} onChange={(e)=>{!isEdit&&setGroupParamsHandle('groupName',e.target.value)}}/>
                            <span className="textLimit">{groupParams.groupName.length>10?10:groupParams.groupName.length}/10</span>
                        </div>
                    </div>
                    <div className="row">
                        <div className="label">群数量：</div>
                        <div className="inputArea" style={{flex:'none'}}>
                            <input type="text" className="groupNoInput" value={groupParams.createGroupNum} onChange={(e)=>{!isEdit&&setGroupParamsHandle('createGroupNum',e.target.value)}}/>
                            <span> 个</span>
                        </div>
                        <div className="label self-label">编号初始值：</div>
                        <div className="inputArea" style={{flex:'none'}}>
                            <input type="text" className="startNoInput" value={groupParams.initIndexNum} onChange={(e)=>{!isEdit&&setGroupParamsHandle('initIndexNum',e.target.value)}}/>
                        </div>
                    </div>
                    <div className="noteInfo">
                        注：您新建的群将使用【群名称】+【编号】的方式命名，编号将从初始值开始递增，达到您指定的群数量为止。
                    </div>
                    <div className="row">
                        <div className="label">群公告：</div>
                        <div className="inputArea">
                            <textarea className="msgInput" placeholder="请输入群公告" maxLength={200} value={groupParams.introduce} onChange={(e)=>{!isEdit&&setGroupParamsHandle('introduce',e.target.value)}}></textarea>
                            <span className="textLimit">{groupParams.introduce.length>200?200:groupParams.introduce.length}/200</span>
                        </div>
                    </div>
                    <div className="buttonArea" style={{marginTop: '39px'}}>
                        <UploadBtn 
                            loading={submiting}
                            text={"保存"}
                            loadingText={"保存中"}
                            clickHandle={this.submitData}
                            propsStyle={{
                                width:'108px',
                                height:'36px',
                                float:'right'
                            }}
                        />
                        <ButtonBox
                            btnTxt={"上一步"}
                            isCancel={true}
                            btnStyle={{
                                float:'right'
                            }}
                            btnFunc={() => {
                                this.props.setPageNo(1)
                            }}
                        />
                    </div>
                </div>
                {/* {isEdit?<span className="importGroup" onClick={showHandle}>绑定的群</span>:''} */}
            </div>
        )
    }
}