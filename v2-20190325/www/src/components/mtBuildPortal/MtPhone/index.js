/**
 * 创建时间:2018-09-10 10:16:47
 * 作者：sufei  Xerath
 * 邮箱：fei.su@gemii.cc
 * 版本号：1.0
 * @版权所有
 **/


import React, {Component} from 'react'
import './index.css'


import {TextDom, ImgDom, LinkDom, AppModule, PublicDom, VoiceDom} from './showDom';
import {sendEvent} from "../../../funStore/CommonFun";

function cbGetImgH(url, cb) {
    if (url.indexOf('http') != -1) {
        let img_url = url;
        let img = new Image();
        let ImgH = 224;
        img.src = img_url;
        if (img.complete) {
            let v = img.width / 224;
            if (v) {
                ImgH = img.height / v + 'px';
                cb(ImgH)
            } else {
                cb(ImgH)
            }

        } else {
            img.onload = function () {
                let v = img.width / 224;
                if (v) {
                    ImgH = img.height / v + 'px';
                    cb(ImgH)
                } else {
                    cb(ImgH)
                }
            }
        }
    } else {
        cb('1')
    }

}

function getImgH(url) {
    let img_url = url;
    let img = new Image();
    let ImgH = 148;
    img.src = img_url;
    if (img.complete) {
        let v = img.width / 148;
        if (v) {
            ImgH = img.height / v + 'px';
            sendEvent('setImgH', ImgH)
        }

    } else {
        img.onload = function () {
            let v = img.width / 148;
            if (v) {
                ImgH = img.height / v + 'px';
                sendEvent('setImgH', ImgH)
            }
        }
    }

}

export default class MtPhone extends Component {
    constructor() {
        super();
        this.state = {
            ImgH: '148px',
            imgH: []
        }
        this.scrollPhoneTop = this.scrollPhoneTop.bind(this);
        this.changeSlinkcontent = this.changeSlinkcontent.bind(this);
        this.getImgType = this.getImgType.bind(this);
    }

    scrollPhoneTop(e) {
        let element = document.querySelector('.MtPhone-content-detail');
        if (element) {
            setTimeout(() => {
                element.scrollTop = element.scrollHeight;
            }, 500);
        }
    }

    changeSlinkcontent(e) {
        this.setState({
            slinkcontent: e
        })
    }

    componentDidMount() {
        let _this = this;
        window.addEventListener('setImgH', this.setImgH)
        window.addEventListener('imgArr', this.setImgArr)
        window.addEventListener('slinkcontent', this.setSlinkcontent)
        this.getImgType(_this.props.paramsValue);
    }

    setImgH = (e) => {
        this.setState({
            ImgH: e.vals
        })
    }

    setImgArr = (e)=>{
        this.setState({
            imgH: e.vals
        })
    }

    setSlinkcontent = (e)=>{
        this.changeSlinkcontent(e.vals)
    }

    componentWillUnmount() {
        let _this = this;
        window.removeEventListener('slinkcontent', this.setSlinkcontent)
        window.removeEventListener('setImgH', this.setImgH)
        window.removeEventListener('imgArr', this.setImgArr)
    }

    componentWillReceiveProps(nextProps) {
        // if (this.props.paramsValue.length != nextProps.paramsValue.length) {
        this.getImgType(nextProps.paramsValue);
        // }

    }

    getImgType(s) {
        let img = s.find(item => item.type == 3);
        if (img) {
            getImgH(img.files.find(item => item.fileType === 'image').filePath)
        }

        let imgArr = s.find(item => item.type == 4)
        if (imgArr) {
            let imgArrs = imgArr.files.find(item => item.fileType === 'text').fileContent;
            let imgH = [];
            imgArrs.map((item) => {
                cbGetImgH(item.value, res => {
                    // console.log(res);
                    imgH.push(res);
                    sendEvent('imgArr', imgH)
                })
            })
        }

    }

    render() {
        let {slinkcontent, ImgH, imgH} = this.state;
        this.scrollPhoneTop();
        // console.log(imgH, ImgH);
        let {paramsValue, styles} = this.props;
        // console.log(paramsValue, '数据')
        return (
            <div className='MtPhone' style={styles}>
                <div className="MtPhone-title"><span className='MtPhone-title-iocn'></span>效果预览</div>
                {
                    slinkcontent ?
                        <div className="MtPhone-content">
                            <div className="MtPhone-content-detail">
                                {
                                    paramsValue.find(item => item.type == '4').files.find(item => item.fileType === 'text').fileContent.map((item, index) => {
                                        return (
                                            <div className="MtPhone-content-detail-box" key={index}>
                                                {
                                                    item.type == 'txt' ? <div
                                                            className='MtPhone-content-detail-box-txt'>{item.value}</div> :
                                                        item.type == 'img' && item.value ?
                                                            <img src={item.value} style={{height: 'auto'}}
                                                                 className='MtPhone-content-detail-box-img'/> : ''
                                                }
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        :
                        <div className="MtPhone-content">
                            {
                                paramsValue.length ?
                                    <div className="MtPhone-content-detail">
                                        {
                                            paramsValue.map((item, index) => {
                                                return (
                                                    item.type == '0' ? <TextDom key={index} item={item}/> :
                                                        item.type == "3" ?
                                                            <ImgDom key={index} item={item} ImgH={ImgH}/> :
                                                            item.type == '6'?
                                                            <PublicDom key={index} item={item} ImgH={ImgH}/>:
                                                            item.type == '5'?
                                                            <VoiceDom key={index} item={item} ImgH={ImgH}/>:
                                                            item.type == '1' || item.type == '4' ?
                                                                <LinkDom key={index} item={item}/> :
                                                                item.type == '2' && item.title ? <AppModule key={index}
                                                                                                            item={item}
                                                                    /> :
                                                                    ''
                                                )
                                            })
                                        }
                                    </div>
                                    :
                                    <div className="MtPhone-content-noData">
                                        <div className="MtPhone-content-noData-img"></div>
                                        <span className="MtPhone-content-noData-txt">还没有内容哦</span>
                                        <span className="MtPhone-content-noData-txt">快去添加吧～</span>
                                    </div>
                            }
                        </div>
                }
            </div>
        )
    }
}
