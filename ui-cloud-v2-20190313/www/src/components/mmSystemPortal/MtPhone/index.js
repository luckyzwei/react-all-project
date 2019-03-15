import React, {Component} from 'react'
import './index.css'


import {TextDom} from './showDom';

export default class MmPhone extends Component {
    constructor() {
        super();
        this.state = {
        }
        this.scrollPhoneTop = this.scrollPhoneTop.bind(this);
    }

    scrollPhoneTop(e) {
        let element = document.querySelector('.MmPhone-content-detail');
        if (element) {
            setTimeout(() => {
                element.scrollTop = element.scrollHeight;
            }, 500);
        }
    }

    render() {
        this.scrollPhoneTop();
        let {styles, paramsImg, paramsTxt, paramsLink, closeModal} = this.props;
        return (
            <div className='MmPhone' style={styles}>
                <em className='close-btn' onClick={closeModal}></em>
                        <div className="MmPhone-content">
                            {
                                paramsLink.status || paramsTxt || paramsImg.status ?
                                    <div className="MmPhone-content-detail">
                                        <div className='top-title'>朋友圈</div>
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
                                            <div className='Dom-item-img-box'>
                                            {
                                                paramsImg.status ?
                                                paramsImg.url.map((item, index) => {
                                                    return (
                                                    <img src={paramsImg.status ? (item.url?item.url:item) : process.env.PUBLIC_URL+'/images/icon/default.png'} style={{width: paramsImg.url.length == 1 ? '148px' : paramsImg.url.length == 2 ? '94px' : paramsImg.url.length >= 3 ? '60px' : '' ,height: paramsImg.url.length == 1 ? '148px' : paramsImg.url.length == 2 ? '94px' : paramsImg.url.length >= 3 ? '60px' : ''}}
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
                                    </div>
                            }
                        </div>
            </div>
        )
    }
}
