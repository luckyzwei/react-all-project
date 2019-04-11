import React, {Component} from 'react'
import ButtonBox from '../../shareComponent/ButtonBox'

import {API_PATH} from "../../../constants/OriginName"
import promiseXHR from '../../../funStore/ServerFun'
import AuthProvider from '../../../funStore/AuthProvider'
import { sendEvent } from '../../../funStore/CommonFun'
import moment from 'moment'

import './index.css'

const list = [
    {name:'图片',type: 3},
    {name:'链接H5',type: 1},
    {name:'小程序',type: 2},
    {name:'公众号名片',type: 6},
    {name:'语音',type: 5}
]
const saveList = [
    {name:'img',type: 3},
    {name:'h5',type: 1},
    {name:'mpro',type: 2},
    {name:'public',type: 6},
    {name:'voice',type: 5}
]

const Bgbox = ({showFlag,data,voice,setSrc}) => {
    return (
        <div className={showFlag?'active bg-box':'bg-box'}>
            <p>{data.createDate.replace('T',' ')}</p>
            <p>{data.imUserNickname}</p>
            {
                voice?<em onClick={() => {setSrc(data.sourceContent)}} className="play"></em>
                :''
            }
            <em className="select"></em>
        </div>
    )
}

const Img = ({data,setParams,params}) => {
    return (
        data.length?
        data.map(v => (
            <div className="item img-box" onClick={() => {params[1]==v?setParams('','',''):setParams('img',v,3)}}>
                <img src={v.sourceContent} alt=""/>
                <Bgbox data={{createDate:v.createDate,imUserNickname:v.imUserNickname}} showFlag={params[1]==v}/>
            </div>
        ))
        :
        <div className="noData"><p>还没有内容哦</p></div>
    )
}
const H5 = ({data,setParams,params}) => {
    return (
        data.length?
        data.map(v => (
            <div className="item H5-box" onClick={() => {
                params[1]==v?setParams('','',''):setParams('H5',v,1)
            }}>
                <div className="title">{v.linkTitle}</div>
                <div className="item-content-box">
                    <div className="cont-txt">{v.linkDesc}</div>
                    <img src={v.sourceContent} className="cont-img"/>
                </div>
                <Bgbox data={{createDate:v.createDate,imUserNickname:v.imUserNickname}} showFlag={params[1]==v}/>
            </div>
        ))
        :
        <div className="noData"><p>还没有内容哦</p></div>
    )
}
const MProgram = ({data,setParams,params}) => {
    return (
        data.length?
        data.map(v => (
            <div className="item mpro-box" onClick={() => {
                params[1]==v?setParams('','',''):setParams('mpro',v,2)
            }}>
                <div className="item-content-box">
                    <div className="flex-box">
                        <img src={v.linkDesc} className="item-icon"/>
                        <p>{v.sourceContent.match(/<sourcedisplayname>(\S*)<\/sourcedisplayname>/)[1]}</p>
                    </div>
                    <div className="content-txt">{v.sourceContent.match(/<title>(\S*?)<\/title>/)[1]}</div>
                    <img className="content-img" src={v.linkHref?v.linkHref:(process.env.PUBLIC_URL+'/images/icon/wxapp_img.png')}/>
                </div>
                <div className="btm-cont">
                    <em className="icon"></em>
                    <p>小程序</p>
                </div>
                <Bgbox data={{createDate:v.createDate,imUserNickname:v.imUserNickname}} showFlag={params[1]==v}/>
            </div>
        ))
        :
        <div className="noData"><p>还没有内容哦</p></div>
    )
}
const Public = ({data,setParams,params}) => {
    return (
        data.length?
        data.map(v => (
            <div className="item public-box" onClick={() => {
                params[1]==v?setParams('','',''):setParams('public',v,6)
            }}>
                <div className="item-content-box">
                    <img src={v.linkHref} className="item-icon"/>
                    <p>{v.linkDesc}</p>
                </div>
                <p className="btm-txt">公众号名片</p>
                <Bgbox data={{createDate:v.createDate,imUserNickname:v.imUserNickname}} showFlag={params[1]==v}/>
            </div>
        ))
        :
        <div className="noData"><p>还没有内容哦</p></div>
    )
}
const Voice = ({data,setParams,params,setSrc}) => {
    return (
        data.length?
        data.map(v => (
            <div className="item voice-box" onClick={() => {
                params[1]==v?setParams('','',''):setParams('voice',v,5)
            }}>
                <img className="head-icon" src={v.imUserAvatar?v.imUserAvatar:(process.env.PUBLIC_URL+"/images/icon/head-icon.png")}/>
                <div className="item-content-box">
                    <div className="name">{v.imUserNickname}</div>
                    <div className="item-content">
                        <em></em>{v.voiceTime}"
                    </div>
                </div>
                <Bgbox voice={true} setSrc={setSrc} data={{sourceContent:v.sourceContent,createDate:v.createDate,imUserNickname:v.imUserNickname}} showFlag={params[1]==v}/>
            </div>
        ))
        :
        <div className="noData"><p>还没有内容哦</p></div>
    )
}

export default class Material extends Component {
    constructor() {
        super()
        this.state = {
            left: '',
            fixLeft: '14px',
            tabBar: 'img',
            params: [],
            library: {
                img: [],
                h5: [],
                mpro: [],
                public: [],
                voice: []
            },
            audioSrc: '',
            caveat: false,
            caveatTxt: ''
        }
    }

    componentDidMount () {
        this.getMaterial()
        this.changeTab(0, saveList[0])
        
    }

    getMaterial = (refresh) => {
        let createDateEnd = moment().format('YYYY-MM-DD')+'T23:59:59'
        let createDateStart = moment().subtract('days', 29).format('YYYY-MM-DD')+'T00:00:00'
        const _url = API_PATH + '/basis-api/authsec/material/filter?_currentPage=0&_pageSize=200'
        AuthProvider.getAccessToken().then(token => {
            return promiseXHR(_url, {type: 'bearer', value: token}, {createDateEnd,createDateStart}, "POST")
        }).then(result => {
            let {library} = this.state
            result = JSON.parse(result)
            if (result.resultCode == 100) {
                library = {
                    img: [],
                    h5: [],
                    mpro: [],
                    public: [],
                    voice: []
                }
                result.resultContent.map(v => {
                    v.type==8&&library.img.push(v)
                    v.type==6&&library.h5.push(v)
                    v.type==11&&library.mpro.push(v)
                    v.type==12&&library.public.push(v)
                    v.type==9&&library.voice.push(v)
                })
                this.setState({library})
                refresh == 'refresh'&&sendEvent('message', {txt: '刷新成功', code: 1000})
            } else {
                sendEvent('message', {txt: '服务器错误，请稍后重试', code: 1004})
            }
        })
    }

    refresh = () => {
        this.getMaterial('refresh')
    }

    setParams = (k,v,i) => {
        let {params} = this.state
        params[0] = k
        params[1] = v
        params[2] = i
        this.setState({params})
    }

    changeLeft (i) {
        this.setLeft('left',i)
    }

    setLeft (value,i) {
        let obj = {}
        switch (i) {
            case 0:
            obj[value] = '14px'
                break;
            case 1:
            obj[value] = '134px'
                break;
            case 2:
            obj[value] = '262px'
                break;
            case 3:
            obj[value] = '398px'
                break;
            case 4:
            obj[value] = '534px'
                break;
            case 'none':
            obj[value] = ''
                break;
            default:
                break;
        }
        this.setState(obj)
    }

    changeTab (i,v) {
        let {paramsValue} = this.props
        this.setLeft('fixLeft',i)
        if (paramsValue.find(item => item.type == v.type)) {
            this.setState({tabBar: v.name,caveat: true,caveatTxt: list[i]})
        } else {
            this.setState({tabBar: v.name,caveat: false})
        }
    }

    setSrc = (v) => {
        this.setState({audioSrc: v},() => {
            this.refs.audio.play()
        })
    }

    render () {
        let {left, fixLeft, tabBar, params, library, audioSrc, caveat, caveatTxt} = this.state
        return (
            <div className="Material-bg">
                <div className="Material-box">
                    <em className="btn-close" onClick={() => {this.props.showModal()}}></em>
                    <div className="tab-box">
                        <ul className='tab-titles'>
                            {
                                list.map((v,i) => {
                                    return <li 
                                        className={tabBar==saveList[i].name?"tab-title active":"tab-title"} 
                                        onClick={() => {this.changeTab(i,saveList[i])}} 
                                        onMouseOver={() => {this.changeLeft('none')}} 
                                        onMouseLeave={() => {this.changeLeft(i)}}>
                                            {v.name}
                                        </li>
                                })
                            }
                            <li className="refresh" onClick={this.refresh}><em></em>刷新</li>
                            <li className="tab-line" style={{left: left}}></li>
                            <li className="tab-line-b" style={{left: fixLeft}}></li>
                        </ul>
                    </div>
                    <div className="content-box">
                        {
                            tabBar == 'img'?
                            <Img params={params} setParams={this.setParams} data={library.img}/>
                            :''
                        }
                        {
                            tabBar == 'h5'?
                            <H5 params={params} setParams={this.setParams} data={library.h5}/>
                            :''
                        }
                        {
                            tabBar == 'mpro'?
                            <MProgram params={params} setParams={this.setParams} data={library.mpro}/>
                            :''
                        }
                        {
                            tabBar == 'public'?
                            <Public params={params} setParams={this.setParams} data={library.public}/>
                            :''
                        }
                        {
                            tabBar == 'voice'?
                            <Voice params={params} setSrc={this.setSrc} setParams={this.setParams} data={library.voice}/>
                            :''
                        }
                    </div>
                    <audio ref="audio" src={audioSrc}></audio>
                    <div className="btm-box">
                        <p className="howImport">如何导入素材？<p>1. 将素材（图片、链接、小程序、公众号名片及语音）发送给小助手；<br/>2. 点击页面上刷新按钮，点击【刷新】按钮，即可查看最新素材。</p></p>
                        <ButtonBox 
                            btnTxt={'确定'}
                            btnStyle={{width: '80px',float: 'right'}}
                            btnFunc={() => {params[0]?this.props.addNav(params):sendEvent('message', {txt: '请选择素材', code: 1004})}}
                        />
                        {
                            caveat?
                            <p className="caveat">{`*投放中已存在${caveatTxt.name}类型素材，选择后将覆盖原素材。`}</p>
                            :''
                        }
                    </div>
                </div>
            </div>
        )
    }
}