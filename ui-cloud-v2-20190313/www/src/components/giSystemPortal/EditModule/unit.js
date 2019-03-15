import React,{Component} from 'react'
import Radio from '../../shareComponent/Radio'
import SelectBox from '../../shareComponent/SelectBox'
import UploadFile from '../../shareComponent/UploadFile'
import Tag from '../../shareComponent/Tag'
import './unit.css'
import {ORIGIN_NAME} from '../../../constants/OriginName'
import {API_PATH} from '../../../constants/OriginName'
import AuthProvider from '../../../funStore/AuthProvider'
import promiseXHR from '../../../funStore/ServerFun'
import {textCountRange, sendEvent} from '../../../funStore/CommonFun'
// import {mocaMonitor} from '../mocaData'

export const Nickname = ({value,length,paramName,setparamsHandle}) => {
    return (
        <div className="row">
            <div className="label">机器人昵称：</div>
            <div className="input">
                <input className="name" type="text" placeholder="请输入" value={value} onChange={(e)=>{
                    if(textCountRange(e.target.value)<=16){
                        setparamsHandle(paramName,e.target.value)
                    }
                }}/>
                <span>{parseInt(length)}/16</span>
            </div>
        </div>
    )
}

export const Groupname = ({value,length,paramName,setparamsHandle}) => {
    return (
        <div className="row">
            <div className="label">
                <span style={{color: 'red'}}>*</span>
            群名称：</div>
            <div className="input">
                <input className="name" type="text" placeholder="请输入" value={value} onChange={(e)=>{
                    if(textCountRange(e.target.value)<=15){
                        setparamsHandle(paramName,e.target.value)
                    }
                }}/>
                <span>{parseInt(length)}/15</span>
            </div>
        </div>
    )
}

export const MemberCount = ({value,paramName,setparamsHandle}) => {
    return (
        <div className="row">
            <div className="label">群人数上限：</div>
            <div className="input">
                <input className="number" type="number" style={{paddingRight:'10px'}} placeholder="请输入群内最大人数" value={value} onChange={(e)=>{setparamsHandle(paramName,e.target.value)}}/>
                <span></span>
            </div>
        </div>
    )
}

export const Welcome = ({setparamsHandle,value,defaultValue,welcomeMsgInterval,setWelcomeMsgResp}) => {
    return (
        <div className="row">
            <div className="label">欢迎形式：</div>
            <SelectBox
                placeholder={"请选择"}
                width={100}
                selectOption={['关闭','图文']}
                paramName={'welcomeMsgFlag'}
                paramaValue={[0,1]}
                setparamsHandle={setparamsHandle}
                paramDefault= {
                    defaultValue==0||defaultValue==1?{
                        id: [0,1].indexOf(defaultValue),
                        name: ['关闭','图文'][[0,1].indexOf(defaultValue)],
                    }:undefined
                }
            />
            {
                value!=0
                ?<div className="numberBox">
                    <div className="time">
                        <input type="number" value={welcomeMsgInterval} 
                            onChange={(e)=>{if(e.target.value>=0){setWelcomeMsgResp('time',e.target.value)}}}
                        />
                        <div className="iconArea">
                            <div className="icon-add" onClick={()=>{setWelcomeMsgResp('time',++welcomeMsgInterval)}}></div>
                            <div className="icon-dec" onClick={()=>{if(welcomeMsgInterval>5){setWelcomeMsgResp('time',--welcomeMsgInterval)}}}></div>
                        </div>
                    </div>
                    分钟内不重复推送
                </div>
                :''
            }
        </div>
    )
}

export const PicText = ({welcomeMsgResp,setparamsHandle,length}) => {
    return (
        <div className="row">
            <div className="label">入群欢迎语：</div>
            <div className="input">
                <UploadFile 
                    onChange={(res) => {
                        setparamsHandle('image',res.id)
                    }}
                    onDelete={()=>{
                        setparamsHandle('image','')
                    }}
                    text={'图片不超过1MB'}
                    limitSize={4194304}
                    imgUrl={welcomeMsgResp.welcomeMsgReq.items[0].files[0]&&welcomeMsgResp.welcomeMsgReq.items[0].files[0].fileId?`http://${ORIGIN_NAME}/lizcloud/fs/noauth/media/${welcomeMsgResp.welcomeMsgReq.items[0].files[0].fileId}`:''}
                />
                <div className="textBox">
                    <textarea placeholder="请输入欢迎文字" value={welcomeMsgResp.welcomeMsgReq.items[0].content} onChange={(e)=>{
                        if(textCountRange(e.target.value)<=200){
                            setparamsHandle('text',e.target.value)
                        }
                    }}></textarea>
                    <div>{parseInt(length)}/200</div>
                </div>
            </div>
        </div>
    )
}

/* 
    // 链接暂不支持
    export const Link = () => {
        return (
            <div className="row" style={{alignItems:"flex-start"}}>
                <div className="label">入群欢迎语：</div>
                <div className="input">
                    <div className="textBox linkTitleBox">
                        <textarea placeholder="请输入标题"></textarea>
                        <div>{0}/50</div>
                    </div>
                    <div className="textBox linkContentBox">
                        <textarea placeholder="请输入描述文字"></textarea>
                        <div>{0}/50</div>
                    </div>
                    <UploadFile />
                    <input className="linkHref" type="text" placeholder="请输入跳转链接"/>
                </div>
            </div>
        )
    } 
*/

export class Admin extends Component {
    constructor(props){
        super(props)
        this.state = {
            placeholder:'请选择',
            options: [],
            adminSet: [],
            block: false
        }
    }
    componentWillMount(){
        const {monitors} = this.props
        const url = `${API_PATH}/groupadmin-api/authsec/groupadmin/tenant/monitors`
        AuthProvider.getAccessToken()
        .then((resolve,reject)=>{
            // 获取群管理员
            return promiseXHR(url,{type:'Bearer',value:resolve},{loginName:''},'POST')
        }).then(res => {
            const resData = JSON.parse(res)
            // const resData = mocaMonitor
            if(resData.resultCode=='100'){
                let options = resData.resultContent.map(v => {
                    return monitors.find(m => m.id==v.id)?{
                        ...v,
                        selected: true
                    }:{
                        ...v,
                        selected: false
                    }
                })
                let adminSet = options.filter(v => v.selected)
                this.setState({options,adminSet})
            }
            // console.log(resData)
        })
    }
    checked=(id)=>{
        let options = this.state.options
        if(this.state.adminSet.length<3||options.find(v=>id==v.id).selected){
            const {setparamsHandle,paramName} = this.props
            options = options.map(v => {
                return v.id==id?{
                    ...v,
                    selected: !v.selected
                }:v
            })
            let checkedMonitors = options.filter(v => v.selected)
            let adminSet = checkedMonitors
            this.setState({options,adminSet})
            setparamsHandle(paramName,checkedMonitors)
        }else{
            sendEvent('message', {txt: "最多选择3个管理员哦~",code: 1000})
        }
    }
    render(){
        const {placeholder,options,adminSet,block} = this.state
        return (
            <div className='row'>
                <div className="label">
                    <span style={{color: 'red'}}>*</span>
                群管理员：</div>
                <div className={adminSet.length==0?"multiSelect unselect":"multiSelect"} tabIndex={1}>
                    <div className="inputArea">
                        <div className="noSrcoll" style={{height:'100%',overflow:'auto',display: 'flex', alignItems: 'center'}}>
                            {
                                adminSet.length==0?placeholder:adminSet.map(v => (<span className="loginName" key={v.id} tabIndex={2}>{v.loginName}<span className="delete" onClick={()=>{this.checked(v.id)}}></span></span>))
                            }
                        </div>
                        <span className="icon-arrow"></span>
                    </div>
                    <ul className="selectArea">
                        {
                            options.map((v,i)=>{
                                return <li key={i} className='option' onClick={()=>{this.checked(v.id)}}><span className={v.selected?"icon-check checked":"icon-check"}></span>{v.loginName}</li>
                            })
                        }
                    </ul>
                </div>
            </div>
        )
    }
}

export const GroupInform = ({value,length,paramName,setparamsHandle}) => {
    return (
    <div className="row row-top">
            <div className="label">群公告：</div>
            <div className="informBox">
                    <textarea placeholder="请输入内容" value={value} onChange={(e)=>{
                        if(textCountRange(e.target.value)<=200){
                            setparamsHandle(paramName,e.target.value)
                        }
                    }}></textarea>
                    <div>{parseInt(length)}/200</div>
                </div>
        </div>
    )
}

export const Keywords = ({keywordSimpleItems,paramName,addTag,delTag,isCheck,checkItems}) => {
    return (
        <div className="row" style={{width:"100%"}}>
            <div className="keywordBox" style={{display:'flex',justifyContent:'space-between',width:'100%'}}>
                <Tag
                    text={'添加关键词'}
                    style={{
                        background: '#ECF6FF',
                        borderRadius: '10px',
                        border:'0 none',
                        fontFamily: 'PingFang SC',
                        fontSize: '14px',
                        color: '#58A7F8',
                        lineHeight:'24px',
                        height: '24px',
                        marginBottom: '8px',
                        verticalAlign: 'top'
                    }}
                    btnStyle={{
                        background: '#ECF6FF',
                        borderRadius: '10px',
                        border:'0 none',
                        fontFamily: 'PingFang SC',
                        fontSize: '14px',
                        color: '#58A7F8',
                        lineHeight:'24px',
                        height: '24px',
                        marginBottom: '8px',
                        verticalAlign: 'top'
                    }}
                    inputStyle={{
                        marginBottom: '8px',
                        verticalAlign: 'top'
                    }}
                    limit={10}
                    tags={keywordSimpleItems.map(v=>v.name?v.name:v)}
                    onAdd={(tag)=>{addTag(paramName,tag)}}
                    onDel={(index)=>{delTag(paramName,index)}}
                    isCheck={isCheck}
                    checkItems={checkItems}
                />
                <div className="limit" style={{color:'#B5BDC6',width:'60px',whiteSpace:'nowrap'}}>{`${keywordSimpleItems.length}/10个`}</div>
            </div>
        </div>
    )
}
export const Keyword = ({keywordSimpleItems,paramName,addTag,delTag}) => {
    return (
        <div className="row row-top">
                <div className="label">群关键词：</div>
                <div className="keywordBox">
                    <Tag
                        text={'添加关键词'}
                        style={{
                            background: '#ECF6FF',
                            borderRadius: '10px',
                            border:'0 none',
                            fontFamily: 'PingFang SC',
                            fontSize: '14px',
                            color: '#58A7F8',
                            lineHeight:'20px',
                            height: '20px',
                            marginBottom:'8px',
                            verticalAlign: 'top'
                        }}
                        limit={10}
                        tags={keywordSimpleItems.map(v=>v.name?v.name:v)}
                        onAdd={(tag)=>{addTag(paramName,tag)}}
                        onDel={(index)=>{delTag(paramName,index)}}
                    />
                    <div className="limit">{`${keywordSimpleItems.length}/10个`}</div>
                </div>
            </div>
        )
}

export const GroupLabel = ({groupLabelProfiles,paramName,addTag,delTag}) => {
    return (
        <div className="row row-top">
                <div className="label">群标签：</div>
                <div className="groupLabelBox">
                    <Tag
                        text={'添加标签'}
                        style={{
                            background: 'rgba(106,210,152,.15)',
                            borderRadius: '10px',
                            border:'0 none',
                            fontFamily: 'PingFang SC',
                            fontSize: '14px',
                            color: '#6AD298',
                            lineHeight:'20px',
                            height: '20px',
                            marginBottom:'8px',
                            verticalAlign: 'top'
                        }}
                        inputStyle={{
                            border: '1px solid rgba(106,210,152)'
                        }}
                        limit={10}
                        tags={groupLabelProfiles.map(v => v.name?v.name:v)}
                        onAdd={(tag)=>{addTag(paramName,tag)}}
                        onDel={(index)=>{delTag(paramName,index)}}
                    />
                    <div className="limit">{`${groupLabelProfiles.length}/10个`}</div>
                </div>
            </div>
        )
}

export const CommonInput = ({options,value,paramName,setparamsHandle})=>{
    return (
        <div className="row">
            <div className="label">{options.label}</div>
            <div className="input">
                <input className="name" type="text" placeholder={options.placeholder} value={value} onChange={(e)=>{setparamsHandle(paramName,e.target.value)}}/>
            </div>
        </div>
    )
}

export const MemberCountSmall = ({memberLimitCount,memberCount,setparamsHandle,paramName}) => {
    return (
        <div className="row">
            <div className="label">人数上限：</div>
            <div className="input">
                <input className="number" type="number" style={{paddingRight:'10px',width:'100px'}} value={memberLimitCount} onChange={(e)=>{setparamsHandle(paramName,e.target.value)}}/>
                <span></span>
            </div>
            <div className="label" style={{marginLeft:'10px'}}>群人数：</div>
            <div className="input">
                <input className="number" type="number" style={{paddingRight:'10px',width:'100px',color: '#B5BDC6',fontWeight:'300'}} disabled value={memberCount}/>
                <span></span>
            </div>
        </div>
    )
}

export const CommonSelect = ({options,setparamsHandle,defaultValue,isDisabled})=>{
    return (
        <div className="row">
            <div className="label">{options.label}</div>
            <SelectBox
                disable={isDisabled}
                placeholder={options.placeholder}
                width={options.width}
                selectOption={options.selectOption}
                paramName={options.paramName}
                paramaValue={options.paramaValue}
                setparamsHandle={setparamsHandle}
                paramDefault= {
                    options.paramaValue.indexOf(defaultValue)!=-1?{
                        id: options.paramaValue.indexOf(defaultValue),
                        name: options.selectOption[options.paramaValue.indexOf(defaultValue)],
                    }:undefined
                }
            />
        </div>
    )
}

export const CommonRadio = ({options,sourceData,paramName,setparamsHandle,value,hasTip,tipText}) => {
    return (
        <div className="row">
            <div className="label">
            {
                hasTip
                ?<em className="help-radio-icon">
                    <p className="help-radio-bubble">{tipText}</p>
                </em>:''
            }
                {options.label}
            </div>
            <Radio
                sourceData = {sourceData}
                paramName = {paramName}
                value = {value}
                onChange= {(k,v)=>{setparamsHandle(k,v)}}
            />
        </div>
    )
}

export const RobotName = ({options,setparamsHandle,value,code,paramName}) =>{
    return (
        <div className="row" style={{alignItems:'flex-start',flexWrap: 'wrap'}}>
            <div className="label" style={{marginTop: '8px'}}>{options.label}</div>
            <div className="input">
                <input className="name" type="text" placeholder={options.placeholder} value={value} onChange={(e)=>{setparamsHandle(paramName,e.target.value)}}/>
                {/* <input className="name" type="text" value={code} disabled style={{background:'#F7F8F9',color:'#B5BDC6',marginTop:'4px',fontWeight:'300'}}/> */}
            </div>
            <div className="label" style={{marginTop: '8px'}}>助手编号：</div>
            <div className="input">
                {/* <input className="name" type="text" placeholder={options.placeholder} value={value} onChange={(e)=>{setparamsHandle(paramName,e.target.value)}}/> */}
                <input className="name" type="text" value={code} disabled style={{background:'#F7F8F9',color:'#B5BDC6',marginTop:'4px',fontWeight:'300'}}/>
            </div>
        </div>
    )
}