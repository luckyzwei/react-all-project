import React, { Component } from 'react'
import ModalBox from '../../shareComponent/ModalBox'
import {API_PATH} from "../../../constants/OriginName"
import promiseXHR from '../../../funStore/ServerFun'
import AuthProvider from '../../../funStore/AuthProvider'
import { sendEvent } from '../../../funStore/CommonFun'
import { ImgDom,H5Dom,MProgramDom,PublicDom,VoiceDom } from '../MlTemplate'
import LoadingAnimationS from '../../shareComponent/LoadingAnimationS'
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

export default class MlMainScope extends Component {
    constructor() {
        super();
        this.state = {
            left: '',
            fixLeft: '14px',
            tabBar: 'img',
            library: {
                img: [],
                h5: [],
                mpro: [],
                public: [],
                voice: []
            },
            searchData: {
                img: {
                    createDateEnd: '',
                    createDateStart: '',
                    imUserNickname: '',
                    type: 8
                },
                h5: {
                    createDateEnd: '',
                    createDateStart: '',
                    imUserNickname: '',
                    type: 6
                },
                mpro: {
                    createDateEnd: '',
                    createDateStart: '',
                    imUserNickname: '',
                    type: 11
                },
                public: {
                    createDateEnd: '',
                    createDateStart: '',
                    imUserNickname: '',
                    type: 12
                },
                voice: {
                    createDateEnd: '',
                    createDateStart: '',
                    imUserNickname: '',
                    type: 9
                }
            },
            delItem: [],
            audioSrc: '',
            imgSrc: '',
            batchControl: false,
            showDelModal: false,
            showImgModal: false,
            delId: '',
            loading: true
        }
    }

    componentDidMount () {
        let createDateEnd = moment().format('YYYY-MM-DD')
        let createDateStart = moment().subtract('days', 29).format('YYYY-MM-DD')
        this.getMaterial({createDateEnd,createDateStart})
        this.changeTab(0, saveList[0])
    }

    getMaterial = (data) => {
        this.setState({loading:true})
        let img = []
        let h5 = []
        let mpro = []
        let publicArr = []
        let voice = []
        let dateObj = JSON.parse(JSON.stringify(data))
        if (!data.createDateStart) {
            dateObj.createDateEnd = moment().format('YYYY-MM-DD')+'T23:59:59'
            dateObj.createDateStart = moment().subtract('days', 29).format('YYYY-MM-DD')+'T00:00:00'
        } else {
            dateObj.createDateEnd = data.createDateEnd+'T23:59:59'
            dateObj.createDateStart = data.createDateStart+'T00:00:00'
        }
        const _url = API_PATH + '/basis-api/authsec/material/filter?_currentPage=0&_pageSize=2000'
        AuthProvider.getAccessToken().then(token => {
            return promiseXHR(_url, {type: 'bearer', value: token}, dateObj, "POST")
        }).then(result => {
            let {library} = this.state
            result = JSON.parse(result)
            if (result.resultCode == 100) {
                
                if (data.type) {
                    switch (data.type) {
                        case 8:
                            library.img = this.mapLoction(result.resultContent)
                            break;
                        case 6:
                            library.h5 = this.mapLoction(result.resultContent)
                            break;
                        case 11:
                            library.mpro = this.mapLoction(result.resultContent)
                            break;
                        case 12:
                            library.publicArr = this.mapLoction(result.resultContent)
                            break;
                        case 9:
                            library.voice = this.mapLoction(result.resultContent)
                            break;
                    
                        default:
                            break;
                    }
                    this.setState({library,loading:false})
                } else {
                    result.resultContent.map(v => {
                        v.type==8&&img.push(v)
                        v.type==6&&h5.push(v)
                        v.type==11&&mpro.push(v)
                        v.type==12&&publicArr.push(v)
                        v.type==9&&voice.push(v)
                    })
                    library.img = this.mapLoction(img)
                    library.h5 = this.mapLoction(h5)
                    library.mpro = this.mapLoction(mpro)
                    library.public = this.mapLoction(publicArr)
                    library.voice = this.mapLoction(voice)
                    this.setState({library,loading:false})
                }

            } else {
                sendEvent('message', {txt: '服务器错误，请稍后重试', code: 1004})
            }
        })
    }

    delMaterial = () => {
        let {library,tabBar,delId} = this.state
        const _url = API_PATH + '/basis-api/authsec/materials/del'
        AuthProvider.getAccessToken().then(token => {
            return promiseXHR(_url, {type: 'bearer', value: token}, {ids:[delId]}, "PUT")
        }).then(result => {
            result = JSON.parse(result)
            if (result.resultCode == 100) {
                let num = library[tabBar].findIndex(v => {
                    return v.data.find(v => v.id == delId)
                })
                let num2 = library[tabBar][num].data.findIndex(item => {
                    return item.id == delId
                })
                library[tabBar][num].data.splice(num2,1)
                this.setState({library})
                this.closeModal()
                sendEvent('message', {txt: '删除成功', code: 1000})
            } else {
                sendEvent('message', {txt: '服务器错误，请稍后重试', code: 1004})
            }
        })
    }

    mapLoction (arr) {
        let newArr = []
        arr.map((v, i) => {
            let index = -1
            let createTime = v.createDate.substring(0, 10)
            let flag = newArr.some((newData, j) => {
                if (createTime === newData.createDate.substring(0, 10)) {
                    index = j
                    return true
                }
            })
            if (!flag) {
                newArr.push({
                    createDate: v.createDate,
                    data: [v]
                })
            } else {
                newArr[index].data.push(v)
            }
        })
        return newArr
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

    changeLeft (i) {
        this.setLeft('left',i)
    }

    changeTab (i,v) {
        this.setLeft('fixLeft',i)
        this.setState({tabBar: v.name})
    }

    searchMaterial = () => {
        let {searchData,tabBar} = this.state
        this.getMaterial(searchData[tabBar])
    }

    // selectItem = (v) => {
    //     let {delItem} = this.state
    //     delItem.push(v)
    //     this.setState({delItem})
    // }

    setSrc = (v) => {
        this.setState({audioSrc: v},() => {
            this.refs.audio.play()
        })
    }

    changeBatch = () => {
        this.setState({batchControl: !this.state.batchControl})
    }

    setSearchDate = (value, e) => {
        let {searchData, tabBar} = this.state
        switch (value) {
            case 'searchDate':
                searchData[tabBar].createDateStart = e[0]
                searchData[tabBar].createDateEnd = e[1]
                this.setState({searchData})
                break;
            case 'searchName':
                searchData[tabBar].imUserNickname = e
                this.setState({searchData})
                break;
        }
    }

    showDelModal = (e,id) => {
        let modalStyle = {}
        modalStyle.left = e.clientX+'px'
        modalStyle.top = e.clientY+'px'
        this.setState({showDelModal: true, modalStyle, delId: id})
    }

    closeModal = () => {
        this.setState({showDelModal: false})
    }

    showImg = (img) => {
        this.setState({showImgModal: true,imgSrc: img})
    }

    showH5 = (h5) => {
        window.open(h5)
    }

    closeImgModal = () => {
        this.setState({showImgModal: false,imgSrc: ''})
    }

    refresh = () => {
        let createDateEnd = moment().format('YYYY-MM-DD')
        let createDateStart = moment().subtract('days', 29).format('YYYY-MM-DD')
        this.getMaterial({createDateEnd,createDateStart})
        this.changeTab(0, saveList[0])
    }

    render() {
        let {loading, left, fixLeft, tabBar, library, delItem, audioSrc, batchControl, showDelModal, modalStyle, delId, searchData, imgSrc, showImgModal} = this.state
        return (
            loading?
            <LoadingAnimationS/>:
            <div className="MlMainScope">
                <div className="MlMain-title-box">
                    <p className="MlMain-title">素材库</p>
                    <div className="refresh" onClick={this.refresh}><em></em>刷新</div>
                    <p className="howImport">如何导入素材？<p>1. 将素材（图片、链接、小程序、公众号名片及语音）发送给小助手；<br/>2. 点击【刷新】按钮，即可查看最新素材。</p></p>
                </div>
                <div className="MlMain-box">
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
                            <li className="tab-line" style={{left: left}}></li>
                            <li className="tab-line-b" style={{left: fixLeft}}></li>
                        </ul>
                    </div>
                    <div className="content-box">
                        <div className="item-box">
                        {
                            tabBar == 'img'?
                            <ImgDom 
                                setSearchDate={this.setSearchDate}
                                showImg={this.showImg}
                                data={library.img}
                                searchData={searchData.img}
                                changeBatch={this.changeBatch}
                                showDelModal={this.showDelModal}
                                searchMaterial={this.searchMaterial}
                            />
                            :''
                        }
                        {
                            tabBar == 'h5'?
                            <H5Dom
                                setSearchDate={this.setSearchDate}
                                showH5={this.showH5}
                                data={library.h5}
                                searchData={searchData.h5}
                                changeBatch={this.changeBatch}
                                showDelModal={this.showDelModal}
                                searchMaterial={this.searchMaterial}
                            />
                            :''
                        }
                        {
                            tabBar == 'mpro'?
                            <MProgramDom
                                setSearchDate={this.setSearchDate}
                                data={library.mpro}
                                searchData={searchData.mpro}
                                changeBatch={this.changeBatch}
                                showDelModal={this.showDelModal}
                                searchMaterial={this.searchMaterial}
                            />
                            :''
                        }
                        {
                            tabBar == 'public'?
                            <PublicDom
                                setSearchDate={this.setSearchDate}
                                data={library.public}
                                searchData={searchData.public}
                                changeBatch={this.changeBatch}
                                showDelModal={this.showDelModal}
                                searchMaterial={this.searchMaterial}
                            />
                            :''
                        }
                        {
                            tabBar == 'voice'?
                            <VoiceDom
                                setSrc={this.setSrc}
                                setSearchDate={this.setSearchDate}
                                data={library.voice}
                                searchData={searchData.voice}
                                changeBatch={this.changeBatch}
                                showDelModal={this.showDelModal}
                                searchMaterial={this.searchMaterial}
                            />
                            :''
                        }
                        </div>
                    </div>
                    <audio ref="audio" src={audioSrc}></audio>
                </div>
                <ModalBox
                    modalStatus={showDelModal}
                    modalTxt={'确定要删除当前素材吗'}
                    modalStyle={modalStyle}
                    confirmTxt={'删除'}
                    closeModalFunc={this.closeModal}
                    confirmFunc={this.delMaterial}
                    isDelete={true}
                />
                {
                    showImgModal?
                    <div className="img-modal">
                        <div className="img-box">
                            <img src={imgSrc} alt=""/>
                            <em className="close-btn" onClick={this.closeImgModal}></em>
                        </div>
                    </div>
                    :''
                }
            </div>
        )
    }
}
