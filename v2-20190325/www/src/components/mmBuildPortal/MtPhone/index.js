import React, {Component} from 'react'
import './index.css'


import {TextDom, ImgDom, LinkDom, AppModule} from './showDom';
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

export default class MmPhone extends Component {
    constructor() {
        super();
        this.state = {
            ImgH: '148px',
            imgH: []
        }
        this.scrollPhoneTop = this.scrollPhoneTop.bind(this);
        this.changeSlinkcontent = this.changeSlinkcontent.bind(this);
    }

    scrollPhoneTop(e) {
        let element = document.querySelector('.MmPhone-content-detail');
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
        // let _this = this;
        // window.addEventListener('setImgH', this.setImgH)
        // window.addEventListener('imgArr', this.setImgArr)
        // window.addEventListener('slinkcontent', this.setSlinkcontent)
        // this.getImgType(_this.props.paramsValue);
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

    // componentWillUnmount() {
        // let _this = this;
        // window.removeEventListener('slinkcontent', this.setSlinkcontent)
        // window.removeEventListener('setImgH', this.setImgH)
        // window.removeEventListener('imgArr', this.setImgArr)
    // }

    // componentWillReceiveProps(nextProps) {
        // if (this.props.paramsValue.length != nextProps.paramsValue.length) {
        // this.getImgType(nextProps.paramsValue);
        // }

    // }

    // getImgType(s) {
    //     let img = s.paramsimg
    //     if (img) {
    //         getImgH(img.files.find(item => item.fileType === 'image').filePath)
    //     }

    //     let imgArr = s.find(item => item.type == 4)
    //     if (imgArr) {
    //         let imgArrs = imgArr.files.find(item => item.fileType === 'text').fileContent;
    //         let imgH = [];
    //         imgArrs.map((item) => {
    //             cbGetImgH(item.value, res => {
    //                 // console.log(res);
    //                 imgH.push(res);
    //                 sendEvent('imgArr', imgH)
    //             })
    //         })
    //     }
    // }

    render() {
        let {slinkcontent, ImgH, imgH} = this.state;
        this.scrollPhoneTop();
        // console.log(imgH, ImgH);
        let {paramsValue, styles, paramsImg, paramsTxt, paramsLink} = this.props;
        // console.log(paramsValue, '数据')
        return (
            <div className='MmPhone' style={styles}>
                <div className="MmPhone-title"><span className='MmPhone-title-iocn'></span>效果预览</div>
                {/* {
                    slinkcontent ?
                        <div className="MmPhone-content">
                            <div className="MmPhone-content-detail">
                                {
                                    paramsValue.find(item => item.type == '4').files.find(item => item.fileType === 'text').fileContent.map((item, index) => {
                                        return (
                                            <div className="MmPhone-content-detail-box" key={index}>
                                                {
                                                    item.type == 'txt' ? <div
                                                            className='MmPhone-content-detail-box-txt'>{item.value}</div> :
                                                        item.type == 'img' && item.value ?
                                                            <img src={item.value} style={{height: 'auto'}}
                                                                 className='MmPhone-content-detail-box-img'/> : ''
                                                }
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        : */}
                        <div className="MmPhone-content">
                            {
                                paramsLink.status || paramsTxt || paramsImg.status ?
                                    <div className="MmPhone-content-detail">
                                        <div className="Dom-item">
                                            <div className='Dom-item-icon-box'>
                                                <span className='Dom-item-icon'></span>
                                                <span className="Dom-item-name">入群小助手</span>
                                            </div>
                                            {
                                                paramsTxt ?
                                                    <TextDom item={paramsTxt} />
                                                :''
                                            }
                                            <div className='Dom-item-img-box' style={{display: paramsImg.url.length == 1 ? 'block':'flex'}}>
                                            {
                                                paramsImg.status ?
                                                paramsImg.url.map((item, index) => {
                                                    return (
                                                    <img src={paramsImg.status ? (item.url?item.url:item) : process.env.PUBLIC_URL+'/images/icon/default.png'} style={{width: paramsImg.url.length == 1 ? '148px' : paramsImg.url.length == 2 ? '94px' : paramsImg.url.length >= 3 ? '60px' : '' ,height: paramsImg.url.length == 1 ? '' : paramsImg.url.length == 2 ? '94px' : paramsImg.url.length >= 3 ? '60px' : ''}}
                                                        className='Dom-item-ImgDom'/>
                                                        )
                                                    })
                                                :''
                                            }
                                            </div>
                                            {
                                                paramsLink.status ?
                                                    <div className='Dom-item-LinkDom'>
                                                        <div className="Dom-item-LinkDom-box">
                                                            <img src={paramsLink.img && Object.keys(paramsLink.img).length != 0 ? paramsLink.img.url : process.env.PUBLIC_URL+'/images/icon/default.png'}
                                                                className="Dom-item-LinkDom-img"/>
                                                            <span className="Dom-item-LinkDom-content">{paramsLink.title}</span>
                                                        </div>
                                                    </div>
                                                :''
                                            }
                                        </div>
                                    </div>
                                    :
                                    <div className="MmPhone-content-noData">
                                        <div className="MmPhone-content-noData-img"></div>
                                        <span className="MmPhone-content-noData-txt">还没有朋友圈内容哦</span>
                                        {/* <span className="MmPhone-content-noData-txt">快去添加吧～</span> */}
                                    </div>
                            }
                        </div>
                {/* } */}
            </div>
        )
    }
}
