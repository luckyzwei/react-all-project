/**
 * Created by wenbin on 2017/7/21.
 */
import React, {Component} from "react";
import {Link} from "react-router-dom";
import NaviBar from "../components/NaviBar";
import Footer from "../components/Footer";
import TeamStyle from "./TeamStyle";
import SlidersWraper from "../components/SlidersWraper";
import $ from 'jquery'
import LiziCloud from './LiziCloud'
import JobBox from "../components/JobBox";
import LazyLoad from 'react-lazyload';


import Swiper from 'swiper/dist/js/swiper.js'

import 'swiper/dist/css/swiper.min.css'

var startPos = 0, endPos = 0, isScrolling = 0;
export default class NewAboutUs extends Component {
    constructor() {
        super();
        this.state = {
            screenWidth: document.documentElement.clientWidth,
            screenHeight: document.documentElement.clientHeight,
            naviState: 'transparent',
            scrollTop: 0,
            startScrollTop: 0,
            winHeight: 0,
            startPageY: 0,
            cultureMessage: [
                {
                    imgSrc: './images/aboutImg/about-culture.png',
                    english: 'Integrity',
                    firstText: '可以弯，',
                    lastText: '但是不能不正直。'
                },
                {
                    imgSrc: './images/aboutImg/about-culture2.png',
                    english: 'Result-oriented',
                    firstText: '管你躺着、站着、坐着、跑着，',
                    lastText: '活儿好就是好。'
                },
                {
                    imgSrc: './images/aboutImg/about-culture3.png',
                    english: 'Innovation',
                    firstText: '80个人，分分钟可以给你',
                    lastText: '160个想法，等你来挑战'
                },
                {
                    imgSrc: './images/aboutImg/about-culture4.png',
                    english: 'Cooperation',
                    firstText: '事不关己高高挂起？？',
                    lastText: 'OUT！'
                },
            ],
            phoneCul: ['./images/phoneImg/about3-culture-mini.png', './images/phoneImg/about4-culture-mini.png', './images/phoneImg/about1-culture-mini.png', './images/phoneImg/about2-culture-mini.png'],
            wedo: ['我们做什么?', '我们是智能微社群平台的创新实现者。', '我们利用创新性的营销理念和技术手段，', '助力母婴行业营销升级，', '帮助各大厂商降低成本。', '我们是妈妈闺蜜，宝妈专属姐妹团。', '深耕母婴行业，我们帮助妈妈找到最匹配的分享圈子与知识社区，', '提供行业权威的专家内容与育儿知识。'],
            phoneWeDo: ['我们做什么?', '景栗科技是一家专注母婴领域的科技公司，', '我们是智能微社群平台的创新实现者。', '我们利用创新性的营销理念和技术手段，', '助力母婴行业营销升级，', '帮助各大厂商降低成本。', '我们是妈妈闺蜜，宝妈专属姐妹团。', '深耕母婴行业，', '我们帮助妈妈找到最匹配的分享圈子与知识社区，', '提供行业权威的专家内容与育儿知识。'],
            howWe: ['我们是怎么样的？', '我们专注工作，秉持“匠人精神”，', '全情投入，全力进取，尽心尽责，尽忠尽职。', '我们用心生活，与栗子大家庭，', '共同见证每一次精彩蜕变，收集 每一刻感动瞬间。', '我们注重成长，无私互学，', '和烘培达人互通有无，和极限运动爱好者一较高下。', '我们就是“高智商”、“高颜值”、“高执行力”的三高代表。 ', '我们期待，在最好的年华，变成最好的自己。', '我们坚信，有些灵魂，终会相遇。'],
            woGive: ['我们提供什么？', '让人想入非非的薪资待遇。', '创业公司罕见的补充福利。', '热血，有趣，简单的团队氛围，', '随时随地发起”吃喝玩乐”项目。', '不定期团建，礼物和惊喜，无微不至的福利关怀。', '共同参与最时髦最炫酷的科技项目，成为时代弄潮儿。', '在正好时光，来为自己喝彩！'],
            coreBlackImg: ['./images/aboutImg/photo38.jpg', './images/aboutImg/photo37.jpg', './images/aboutImg/photo36.jpg', './images/aboutImg/photo39.jpg', './images/aboutImg/photo40.jpg', './images/aboutImg/photo41.jpg'],
            coreColorImg: ['./images/aboutImg/Group 38.jpg', './images/aboutImg/Group 37.jpg', './images/aboutImg/Group 36.jpg', './images/aboutImg/Group 39.jpg', './images/aboutImg/Group 40.jpg', './images/aboutImg/Group 41.jpg'],

        }
        this.scrollEvent = this.scrollEvent.bind(this)
        // this.clientWidthEvent = this.clientWidthEvent.bind(this)
    }

    componentDidMount() {

        new Swiper(this.swiperID, {
            pagination: {
                el: this.paginateID,
            },
            navigation: {
                nextEl: this.nextID,
                prevEl: this.prevID,
            },
            loop : true,
            autoplay:true,
        });
        document.body.scrollTop = 0
        document.documentElement.scrollTop = 0
        window.addEventListener('scroll', this.scrollEvent);
        window.onresize = () => {
            this.setState({
                screenWidth: document.documentElement.clientWidth, //移动距离
                screenHeight: document.documentElement.clientHeight,
            })
            // this.clientWidthEvent()
            let phone = document.getElementsByClassName('team-style-phone')[0];
            let img = phone.getElementsByTagName('img')[0];
            phone.style.height = img.offsetWidth * 1.05 * 4 + 'px'
        }
        if(location.hash=='#joinus'){
            const top = document.querySelector('#joinus').offsetTop
            $('html,body').animate({scrollTop:top}, 500)
        }    
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.scrollEvent)
    }

    clientWidthEvent() {
        if (this.state.screenWidth > 750) {
            var liHeight = document.getElementsByClassName('core-team')[0].getElementsByTagName('li');
            var ul = document.getElementsByClassName('core-team')[0].getElementsByTagName('ul')[0];
            ul.style.height = parseInt(liHeight[0].offsetWidth) * 2 + 20 + 'px';
        } else {
            var ul = document.getElementsByClassName('core-team')[0].getElementsByTagName('ul')[0];
            ul.style.height = 'inherit'
        }
    }

    scrollEvent(e) {
        // window.debugger(document.body.scrollTop);
        // window.debugger(this.refs.lineBox)
        let scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
        window.debugger('scrollTop', scrollTop)
        const {screenHeight} = this.state
        this.setState({
            scrollTop: scrollTop
        });

        if (scrollTop > 750) {
            this.setState({
                naviState: 'white'
            })
        } else {
            this.setState({
                naviState: 'transparent'
            })
        }
    }

    handleTouchStart(e) {
        // e.preventDefault()
        // e.stopPropagation()
        const startPageY = e.touches[0].pageY
        window.debugger('startPageY', startPageY)
        this.setState({
            startPageY: startPageY,
        })
    }

    handleTouchMove(num,e) {
        const {startPageY} = this.state
        const movePageY = e.touches[0].pageY
        if(startPageY > movePageY){
            if(num==1||num==2){
                e.preventDefault()
                e.stopPropagation()
            }
        }
        if(startPageY<movePageY){
            if(num==2||num==3){
                e.preventDefault()
                e.stopPropagation()
            }
        }
        // e.preventDefault()
        window.debugger('movePageY', movePageY)
    }

    handleTouchEnd(num, e) {
        // e.preventDefault()
        // e.stopPropagation()
        const endPageY = e.changedTouches[0].pageY
        const {startPageY, screenHeight} = this.state
        window.debugger('endPageY', endPageY, document.documentElement.scrollTop, startPageY - endPageY)
        if (startPageY - endPageY > 5) {
            e.preventDefault()
            e.stopPropagation()
            if (num == 1) {
                $(document.body).animate({scrollTop: screenHeight * 2 + 372}, 'fast')
                $(document.documentElement).animate({scrollTop: screenHeight * 2 + 372}, 'fast')
            }
            if (num == 2) {
                $(document.body).animate({scrollTop: screenHeight * 3 + 372}, 'fast')
                $(document.documentElement).animate({scrollTop: screenHeight * 3 + 372}, 'fast')
            }
        }
        if (startPageY - endPageY < -5) {
            e.preventDefault()
            e.stopPropagation()
            if (num == 2) {
                $(document.body).animate({scrollTop: screenHeight + 372}, 'fast')
                $(document.documentElement).animate({scrollTop: screenHeight + 372}, 'fast')
            }
            if (num == 3) {
                $(document.body).animate({scrollTop: screenHeight * 2 + 372}, 'fast')
                $(document.documentElement).animate({scrollTop: screenHeight * 2 + 372}, 'fast')
            }
        }
    }

    render() {
        const {screenWidth, phoneCul, scrollTop, winHeight, screenHeight} = this.state
        const WallImgList = ['WallImgList0', 'WallImgList1', 'WallImgList0', 'WallImgList1']
        const WallImgListPhone = ['WallImgList0', 'WallImgList1', 'WallImgList2']
        const device = screenWidth <= 750 ? 'phone' : 'pc'
        window.debugger('screenWidth', screenWidth)
        return (
            // this.state.screenWidth<=750?
            //     <LiziCloud />:
            <div id="aboutUsWrapper" style={{width: '100%'}}>
                <NaviBar state={this.state.naviState} device={this.state.screenWidth <= 750 ? 'phone' : 'pc'}
                         current='about'/>
                <div className="aboutBanner" style={{position: 'relative'}}>
                    {this.state.screenWidth > 750 ? <img src="http://gemii-1252311027.cosgz.myqcloud.com/aboutImg/About_bg_middle.jpg" alt=""/> :
                        <img src="http://gemii-1252311027.cosgz.myqcloud.com/aboutImg/About_bg_middle_mobile.png" alt=""/>}
                    <div></div>
                </div>
                <div className="about-banner">
                    <div className="center-area">
                        <div className="blueline"></div>
                        <div className="text">景栗科技成立于 2016 年 3 月，是全国领先的社群管理和内容分发平台，希望给予群内更优质内容，激活用户讨论，提升社群价值。现已覆盖超过数十万群、千万用户，已经同几百家品牌、上万家门店紧密合作，至今已获得分众传媒、经纬中国等机构数千万美元的投资。</div>
                        <div className={`join ${this.state.screenWidth > 750 ? '' : 'center'}`} onClick={()=>{
                            const top = document.querySelector('#joinus').offsetTop
                            $('html,body').animate({scrollTop:top}, 500)
                        }}>加入我们<span className={`${this.state.screenWidth > 750 ? 'right-arrow' : ''}`}></span></div>
                    </div>
                </div>
                <div className="core-team">
                    <div className="center-area">
                        <p>我们的团队</p>
                        <div className="blueline"></div>
                        <div className="list">
                            <div className="member member-lift">
                                <img className="avatar" src={`${this.state.screenWidth > 750 ?
                                    './images/aboutImg/manager/profile_kv_web.png': './images/aboutImg/manager/profile_kv_mobile.png'}`}/>
                                <p className="name">Kevin Lai</p>
                                <p className="position" style={{fontSize:'16px'}}>首席执行官</p>
                            </div>
                            <div className="member member-right">
                                <img className="avatar" src={`${this.state.screenWidth > 750 ?
                                    './images/aboutImg/manager/profile_helen_web.png': './images/aboutImg/manager/profile_helen_mobile.png'}`}/>
                                <p className="name">Helen Xu</p>
                                <p className="position" style={{fontSize:'16px'}}>首席顾问</p>
                            </div>
                            <div className="member member-lift">
                                <img className="avatar" src={`${this.state.screenWidth > 750 ?
                                    './images/aboutImg/manager/profile_wzk_web.png': './images/aboutImg/manager/profile_wzk_mobile.png'}`}/>
                                <p className="name">Zhikun Wang</p>
                                <p className="position" style={{fontSize:'16px'}}>首席技术官</p>
                            </div>
                            <div className="member member-right web-member-right">
                                <img className="avatar" src={`${this.state.screenWidth > 750 ?
                                    './images/aboutImg/manager/profile_asher_web.png': './images/aboutImg/manager/profile_asher_mobile.png'}`}/>
                                <p className="name">Asher Qian</p>
                                <p className="position" style={{fontSize:'16px'}}>首席运营官</p>
                            </div>
                            <div className="member member-lift">
                                <img className="avatar" src={`${this.state.screenWidth > 750 ?
                                    './images/aboutImg/manager/profile_wlj_web.png': './images/aboutImg/manager/profile_wlj_mobile.png'}`}/>
                                <p className="name">Linjun Weng</p>
                                <p className="position" style={{fontSize:'16px'}}>算法总监</p>
                            </div>
                            <div className="member member-right">
                                <img className="avatar" src={`${this.state.screenWidth > 750 ?
                                    './images/aboutImg/manager/profile_even_web.png': './images/aboutImg/manager/profile_even_mobile.png'}`}/>
                                <p className="name">Even Lu</p>
                                <p className="position" style={{fontSize:'16px'}}>商务总监</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="our-culture">
                    <div className="center-area">
                        <p>团队风采</p>
                        <div className="blueline"></div>

                        <div className="swiper-example-layout">
                            <div>
                                <div className="swiper-container" ref={self => this.swiperID = self}>
                                    {this.state.screenWidth > 750 ? <div className="swiper-wrapper">
                                        <div className="swiper-slide"><img className="img" src="http://gemii-1252311027.cosgz.myqcloud.com/aboutImg/team/team1.png"/></div>
                                        <div className="swiper-slide"><LazyLoad><img className="img" src="http://gemii-1252311027.cosgz.myqcloud.com/aboutImg/team/team2.png"/></LazyLoad></div>
                                        <div className="swiper-slide"><LazyLoad><img className="img" src="http://gemii-1252311027.cosgz.myqcloud.com/aboutImg/team/team3.png"/></LazyLoad></div>
                                        <div className="swiper-slide"><LazyLoad><img className="img" src="http://gemii-1252311027.cosgz.myqcloud.com/aboutImg/team/team4.png"/></LazyLoad></div>
                                        <div className="swiper-slide"><LazyLoad><img className="img" src="http://gemii-1252311027.cosgz.myqcloud.com/aboutImg/team/team5.png"/></LazyLoad></div>
                                        <div className="swiper-slide"><LazyLoad><img className="img" src="http://gemii-1252311027.cosgz.myqcloud.com/aboutImg/team/team6.png"/></LazyLoad></div>
                                    </div> :
                                        <div className="swiper-wrapper">
                                            <div className="swiper-slide"><img className="img" src="http://gemii-1252311027.cosgz.myqcloud.com/aboutImg/team_mobile/team1.png"/></div>
                                            <div className="swiper-slide"><LazyLoad><img className="img" src="http://gemii-1252311027.cosgz.myqcloud.com/aboutImg/team_mobile/team2.png"/></LazyLoad></div>
                                            <div className="swiper-slide"><LazyLoad><img className="img" src="http://gemii-1252311027.cosgz.myqcloud.com/aboutImg/team_mobile/team3.png"/></LazyLoad></div>
                                            <div className="swiper-slide"><LazyLoad><img className="img" src="http://gemii-1252311027.cosgz.myqcloud.com/aboutImg/team_mobile/team4.png"/></LazyLoad></div>
                                            {/* <div className="swiper-slide"><img className="img" src="./images/aboutImg/team_mobile/team5.png"/></div> */}
                                        </div>}
                                    <div className={`swiper-button-prev ${this.state.screenWidth > 750 ? 'swiper-button-prev-web' : 'swiper-button-prev-mobile'}`} ref={self => this.prevID = self}></div>
                                    <div className={`swiper-button-next ${this.state.screenWidth > 750 ? 'swiper-button-next-web' : 'swiper-button-next-mobile'}`} ref={self => this.nextID = self}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <img src="http://gemii-1252311027.cosgz.myqcloud.com/aboutImg/bg_rectangle.png" alt=""/>
                </div>
                <div className="join-us" id="joinus">
                    <div className="center-area">
                        <p className="title">加入我们</p>
                        <div className="blueline"></div>
                        <p className="desc">简历投递邮箱：recruitment@gemii.cc</p>
                    </div>
                </div>
                <div className="joinRecruit">
                    <div className="center-area">
                        <div>
                            <JobBox device={screenWidth}/>
                        </div>
                    </div>
                </div>
                <div className="contact-us">
                    <div className="center-area">
                        <p className="title">联系我们</p>
                        <div className="blueline"></div>
                        <p className="desc">公司地址：上海市静安区灵石路 718 号 B1 北楼 402 室</p>
                        <div className="bottom">
                            <div className="left-action">
                                <div className="mobile-icon" style={{backgroundImage:'url(../images/aboutImg/about-call.png)'}}></div>
                                <div className="mobile-info">
                                    <div className="mobile-sub">电话</div>
                                    <div className="mobile-num">021-66615889</div>
                                </div>
                            </div>
                            <div className="right-action">
                                <div className="mobile-icon" style={{backgroundImage:'url(../images/aboutImg/about-email.png)'}}></div>
                                <div className="mobile-info">
                                    <div className="mobile-sub">邮箱</div>
                                    <div className="mobile-num">seller@gemii.cc</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        )
    }
}
