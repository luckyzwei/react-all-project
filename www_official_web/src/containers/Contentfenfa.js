/**
 * Created by yangmiaomiao on 2018/10/10.
 */
import React, {Component} from "react";
import {Link} from "react-router-dom";
import NaviBar from "../components/NaviBar";
import Footer from "../components/Footer";
import LazyLoad from 'react-lazyload';
const iconsData = [
    {
        img:'./images/fenfaimg/fenfa_miniprograms.png',
        text:'小程序推广'
    },
    {
        img:'./images/fenfaimg/fenfa_official.png',
        text:'公众号涨粉'
    },
    {
        img:'./images/fenfaimg/fenfa_send.png',
        text:'热点内容分发'
    },
    {
        img:'./images/fenfaimg/fenfa_branding.png',
        text:'品牌活动宣传'
    }
]
const processData=[
    {
        img:'./images/fenfaimg/fenfa_register.png',
        text:'免费注册'
    },
    {
        img:'./images/fenfaimg/fenfa_price.png',
        text:'多种计费模式'
    },
    {
        img:'./images/fenfaimg/fenfa_data.png',
        text:'数据透明'
    }
]
const Toblank=({device})=>{
    return  <a className="fenfa-btn" href="https://ad.gemii.cc" target='_blank'>
        <span>立即体验</span>
        {device=='pc'?<img src="./images/fenfaimg/fenfa_icon_arrow.png" alt=""/>:null}
    </a>
}

export default class Contentfenfa extends Component{
    constructor(props) {
        super(props)
        this.scrollEvent = this.scrollEvent.bind(this)
    }
    state={
        screenWidth: document.documentElement.clientWidth,
        screenHeight: document.documentElement.clientHeight,
        naviState: 'transparent',
    }

    componentDidMount() {
        document.body.scrollTop = 0
        document.documentElement.scrollTop = 0
        window.addEventListener('scroll', this.scrollEvent);
        window.onresize = () => {
            this.setState({
                screenWidth: document.documentElement.clientWidth, //移动距离
            })
        }
    }
    componentWillUnmount() {
        window.removeEventListener('scroll', this.scrollEvent)
    }

    scrollEvent(e) {
        let scrollTop = document.body.scrollTop || document.documentElement.scrollTop
        let clientHeight = document.body.clientHeight || document.documentElement.clientHeight
        if (scrollTop > 600) {
            this.setState({
                naviState: 'white'
            })
        } else {
            this.setState({
                naviState: 'transparent'
            })
        }
    }

    render(){
        const device = this.state.screenWidth <= 750 ? 'phone' : 'pc'
        return(
            <div className='fenfa-wrapper'>
                <NaviBar state={this.state.naviState} device={device} current='content'/>
                <div className="fenfa-title">
                    <LazyLoad>
                            <img className='title-bg-img' src={`${this.state.screenWidth > 750 ?"./images/fenfaimg/fenfa_banner_bg.png":"./images/fenfaimg/fenfa_banner_bg-phone.png"}`} alt=""/>
                    </LazyLoad>
                    <div className='title-content'>
                        <div className="left">
                            <div className="title">
                                社群内容分发平台
                            </div>
                            <Toblank device={device}/>
                        </div>
                        <div className="right">
                            <LazyLoad><img src="./images/fenfaimg/fenfa_banner.png" alt=""/></LazyLoad>
                        </div>
                    </div>
                </div>
                <div className="icon-content">
                    <div className='icon-content-title'>
                        高效完成您的引流目标
                    </div>
                    <div className='icon-content-items'>
                        {
                            iconsData.map((item,index)=>{
                                return <div className='icon-item' key={index}>
                                    <LazyLoad><img className='icon-img' src={item.img} alt=""/></LazyLoad>
                                    <div className='text'>{item.text}</div>
                                </div>

                            })
                        }
                    </div>
                </div>
                <div className="info-content">
                    <div className="info-item-1">
                        <div className="left">
                            <h3>覆盖百万微信群、上亿活跃用户</h3>
                                {
                                    this.state.screenWidth > 750
                                        ? <p>根基于共同兴趣、目的、地理的社群内进行投放分发个性化、<br/>社会化推广，助您迅速裂变</p>
                                        : <p>根基于共同兴趣、目的、地理的社群内进行投放分<br/>发个性化、社会化推广，助您迅速裂变</p>

                                }
                            <div className='blueline'/>
                        </div>
                        <div className="right">
                            <LazyLoad><img src="./images/fenfaimg/fenfa_pic1.png" alt=""/></LazyLoad>
                        </div>
                    </div>
                    <div className="info-item-2">
                        <div className="left">
                            {
                                this.state.screenWidth > 750? <img src="./images/fenfaimg/fenfa_pic2.png" alt=""/>
                                    : <div>
                                        <h3>AI数据分析，精准定向目标用户</h3>
                                        <p>自然语言分析、社交分析、用户建模、高性能海量<br/>数据分析运算，助您快速找到潜在客户</p>
                                        <div className='blueline'/>
                                    </div>
                            }

                        </div>
                        <div className="right">
                            {
                                this.state.screenWidth > 750?  <div>
                                        <h3>AI数据分析，精准定向目标用户</h3>
                                        <p>自然语言分析、社交分析、用户建模、高性能海量数据分析运算，<br/>助您快速找到潜在客户</p>
                                    </div>
                                    : <LazyLoad><img src="./images/fenfaimg/fenfa_pic2.png" alt=""/></LazyLoad>
                            }
                        </div>
                    </div>
                    <div className="info-item-3">
                        <div className="left">
                            <h3>支持多种内容类型</h3>
                            <p>全面支持公众号推文、链接、海报、小程序等内容类型</p>
                            <div className='blueline'/>
                        </div>
                        <div className="right">
                            <LazyLoad><img src="./images/fenfaimg/fenfa_pic3.png" alt=""/></LazyLoad>
                        </div>
                    </div>
                </div>
                <div className="process-content">
                    {
                        this.state.screenWidth > 750
                            ? <div className="title">透明、合理的计价方式，助您控制成本</div>
                            : <div className="title">透明、合理的计价方式<br/>助您控制成本</div>
                    }

                    <div className='process-content-items'>
                        {
                            processData.map((item,index)=>{
                                return <div className='process-item' key={index}>
                                    <LazyLoad><img className='process-img' src={item.img} alt=""/></LazyLoad>
                                    <div className='text'>{item.text}</div>
                                </div>

                            })
                        }
                    </div>
                </div>
                <div className="footer-content">
                    <LazyLoad><img className='footer-img' src={`${this.state.screenWidth > 750 ?"./images/fenfaimg/fenfa_tiyan_bg.png":"./images/fenfaimg/fenfa_tiyan_bg-phone.png"}`} alt=""/></LazyLoad>
                    <div className='footer-content-view'>
                        <h3>体验内容分发平台，从这里开始</h3>
                        <p>即刻注册，体验前所未有的效率提升</p>
                        <Toblank device={device}/>
                    </div>
                </div>
                <Footer/>
            </div>
        )
    }
}
