import React, {Component, PropTypes} from "react";
import NaviBar from "./NaviBar";
import BrandsBox from "./BrandsBox";
import Footer from "./Footer";
import Animate1 from '../components/animate1/Animate1'
import Animate2 from '../components/animate2/Animate2'
import $ from 'jquery'
import LazyLoad from 'react-lazyload';
import {Link} from "react-router-dom";
export default class HomePage extends Component {
    static propTypes = {
        actions: PropTypes.object.isRequired
    }

    constructor(props) {
        super(props)
        this.scrollEvent = this.scrollEvent.bind(this)
        this.handleImgHovered = this.handleImgHovered.bind(this)
        this.handleImgUnhovered = this.handleImgUnhovered.bind(this)
        this.leftProductAction = this.leftProductAction.bind(this)
        this.rightProductAction = this.rightProductAction.bind(this)
    }

    state = {
        screenWidth: document.documentElement.clientWidth,
        naviState: 'transparent',
        screenHeight: document.documentElement.clientHeight,
        firstPlatformHover: false,
        secondPlatformHover: false,
        thirdPlatformHover: false,
        checkTool: 'left',
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
        if (scrollTop > 630) {
            this.setState({
                naviState: 'white'
            })
        } else {
            this.setState({
                naviState: 'transparent'
            })
        }
        if (document.querySelector('#imageBox1')) {
            let offsetTop = document.querySelector('#imageBox1').offsetTop
            if (scrollTop + clientHeight > offsetTop && document.querySelector('#imageBox1').className == '') {
                document.querySelector('#imageBox1').className = 'animate'
            }
        }
    }

    handleImgHovered(type) {


        switch (type) {
            case 0 :
                this.setState({
                    firstPlatformHover: true
                });
                break;
            case 1 :
                this.setState({
                    secondPlatformHover: true
                });
                break;
            case 2 :
                this.setState({
                    thirdPlatformHover: true
                });
                break;
            default :
                break;
        }

    }

    handleImgUnhovered(type) {

        switch (type) {
            case 0 :
                this.setState({
                    firstPlatformHover: false
                });
                break;
            case 1 :
                this.setState({
                    secondPlatformHover: false
                });
                break;
            case 2 :
                this.setState({
                    thirdPlatformHover: false
                });
                break;
            default :
                break;

        }
    }

    leftProductAction() {
        this.setState({
            checkTool: 'left'
        })
    }

    rightProductAction() {
        this.setState({
            checkTool: 'right'
        })
    }


    render() {
        const wallimgList = ['wallimg0', 'wallimg1', 'wallimg2', 'wallimg3']
        const downWallimglist = ['downWallimg0', 'downWallimg1', 'downWallimg2']
        const firstPlatFormHover = this.state.firstPlatformHover
        const secondPlatFormHover = this.state.secondPlatformHover
        const thirdPlatFormHover = this.state.thirdPlatformHover
        const checkTool = this.state.checkTool
        // window.debugger('naviState', this.state.naviState);
        const device = this.state.screenWidth <= 750 ? 'phone' : 'pc'
        return (
            <div id="container">
                <NaviBar state={this.state.naviState} device={device} current='/'/>
                <div className="banner">
                    <p>赋能社群 对话未来</p>
                    <div onClick={() => {
                        let offsetTop = document.querySelector('#platform').offsetTop
                        $('html,body').animate({scrollTop: offsetTop}, 400)
                    }}>了解更多
                    </div>
                    {this.state.screenWidth > 750 ? <img className="animateScale"
                                                         src="http://gemii-1252311027.cosgz.myqcloud.com/main/pc/bg_banner_pc.png"
                                                         alt=""/> :
                        <img className="animateScale"
                             src="http://gemii-1252311027.cosgz.myqcloud.com/main/mobile/bg_banner_mobile.png" alt=""/>}
                </div>
                <div className="platform" id="platform">
                    <p>{`${this.state.screenWidth > 750 ? '深耕社交生态，致力于让对话更有价值' : '深耕社交生态'}`}</p>
                    {this.state.screenWidth > 750 ? '' : <p>致力于让对话更有价值</p>}
                    <div className='blueline'></div>
                    <div className="groups">
                        <div className="lizCloud" onClick={() => {
                            let a = document.createElement('a')
                            a.href = '#recommand'
                            a.click()
                        }}>
                            <div className={`${firstPlatFormHover ? 'shadowHover' : 'shadowUnhover'}`}
                                 onMouseEnter={this.handleImgHovered.bind(this, 0)}
                                 onMouseLeave={this.handleImgUnhovered.bind(this, 0)}>
                                <LazyLoad><img src='./images/main/mobile/1_icon.png' alt=""
                                               className={`${firstPlatFormHover ? 'imageHover' : 'imageUnhover'}`}/></LazyLoad>
                                <div className={`line ${firstPlatFormHover ? 'lineHover' : 'lineUnhover'}`}></div>
                                <p className={`${firstPlatFormHover ? 'textHover' : 'textUnhover'}`}>高效智能管理平台 {this.state.screenWidth > 750 ? "" :
                                    <LazyLoad><img
                                        src="./images/main/mobile/icon_arrow.png" alt=""/></LazyLoad>}</p>
                                {this.state.screenWidth <= 750 ? '' :
                                    <div className={`${firstPlatFormHover ? 'moreHover' : 'moreUnhover'}`}>了解更多</div>}
                            </div>
                            <LazyLoad><img
                                src={this.state.screenWidth > 750 ? 'http://gemii-1252311027.cosgz.myqcloud.com/main/pc/bg_1.png' : 'http://gemii-1252311027.cosgz.myqcloud.com/main/mobile/bg_1.png'}
                                alt=""/></LazyLoad>
                        </div>
                        <div className="deliverySystem" onClick={() => {
                            let a = document.createElement('a')
                            a.href = '#advertising'
                            a.click()
                        }}>
                            <div className={`${secondPlatFormHover ? 'shadowHover' : 'shadowUnhover'}`}
                                 onMouseEnter={this.handleImgHovered.bind(this, 1)}
                                 onMouseLeave={this.handleImgUnhovered.bind(this, 1)}>
                                <LazyLoad><img src='./images/main/mobile/2_icon.png' alt=""
                                               className={`${secondPlatFormHover ? 'imageHover' : 'imageUnhover'}`}/></LazyLoad>
                                <div className={`line ${secondPlatFormHover ? 'lineHover' : 'lineUnhover'}`}></div>
                                <p className={`${secondPlatFormHover ? 'textHover' : 'textUnhover'}`}>算法支持对话流推荐引擎 {this.state.screenWidth > 750 ? "" :
                                    <LazyLoad><img
                                        src="./images/main/mobile/icon_arrow.png" alt=""/></LazyLoad>}</p>
                                {this.state.screenWidth <= 750 ? '' :
                                    <div className={`${secondPlatFormHover ? 'moreHover' : 'moreUnhover'}`}>了解更多</div>}
                            </div>
                            <LazyLoad><img
                                src={this.state.screenWidth > 750 ? 'http://gemii-1252311027.cosgz.myqcloud.com/main/pc/bg_2.png' : 'http://gemii-1252311027.cosgz.myqcloud.com/main/mobile/bg_2.png'}
                                alt=""/></LazyLoad>
                        </div>
                        <div className="partner" onClick={() => {
                            let a = document.createElement('a')
                            a.href = '#brandsWrapper'
                            a.click()
                        }}>
                            <div className={`${thirdPlatFormHover ? 'shadowHover' : 'shadowUnhover'}`}
                                 onMouseEnter={this.handleImgHovered.bind(this, 2)}
                                 onMouseLeave={this.handleImgUnhovered.bind(this, 2)}>
                                <LazyLoad><img src='./images/main/mobile/3_icon.png' alt=""
                                               className={`${thirdPlatFormHover ? 'imageHover' : 'imageUnhover'}`}/></LazyLoad>
                                <div className={`line ${thirdPlatFormHover ? 'lineHover' : 'lineUnhover'}`}></div>
                                <p className={`${thirdPlatFormHover ? 'textHover' : 'textUnhover'}`}>全商业生态合作 {this.state.screenWidth > 750 ? "" :
                                    <LazyLoad><img
                                        src="./images/main/mobile/icon_arrow.png" alt=""/></LazyLoad>}</p>
                                {this.state.screenWidth <= 750 ? '' :
                                    <div className={`${thirdPlatFormHover ? 'moreHover' : 'moreUnhover'}`}>了解更多</div>}
                            </div>
                            <LazyLoad><img
                                src={this.state.screenWidth > 750 ? 'http://gemii-1252311027.cosgz.myqcloud.com/main/pc/bg_3.png' : 'http://gemii-1252311027.cosgz.myqcloud.com/main/mobile/bg_3.png'}
                                alt=""/></LazyLoad>
                        </div>
                    </div>
                </div>

                <div className="product">
                    <img
                        src={this.state.screenWidth > 750 ? 'http://gemii-1252311027.cosgz.myqcloud.com/main/pc/bg_blue.png' : 'http://gemii-1252311027.cosgz.myqcloud.com/main/mobile/bg_blue.png'}
                        alt=""/>
                    <div className="title">做更好用的管理工具</div>
                    <div className="actionBox">
                        <div className={`lizCloud ${checkTool == 'left' ? 'selected' : 'unselected'}`}
                             onClick={this.leftProductAction}>栗子云
                        </div>
                        <div className={`deliverySystem ${checkTool == 'right' ? 'selected' : 'unselected'}`}
                             onClick={this.rightProductAction}>内容分发
                        </div>
                    </div>
                    <div className="bottom">
                        {checkTool == 'left' ? <div className="info">
                                <LazyLoad><img src="./images/main/pc/logo.svg" alt=""/></LazyLoad>
                                <p className={`${checkTool == 'left' ? 'title_left' : ''}`}>智能社群管理 SaaS 平台 — 栗子云</p>
                                <ul>
                                    <li><LazyLoad><img
                                        src={this.state.screenWidth > 750 ? './images/main/pc/icon_check.png' : './images/main/mobile/icon_check.png'}
                                        alt=""/></LazyLoad><span>提升效率</span></li>
                                    <li><LazyLoad><img
                                        src={this.state.screenWidth > 750 ? './images/main/pc/icon_check.png' : './images/main/mobile/icon_check.png'}
                                        alt=""/></LazyLoad><span>内容推荐</span></li>
                                    <li><LazyLoad><img
                                        src={this.state.screenWidth > 750 ? './images/main/pc/icon_check.png' : './images/main/mobile/icon_check.png'}
                                        alt=""/></LazyLoad><span>自动问答</span></li>
                                    <li><LazyLoad><img
                                        src={this.state.screenWidth > 750 ? './images/main/pc/icon_check.png' : './images/main/mobile/icon_check.png'}
                                        alt=""/></LazyLoad><span>实时数据</span></li>
                                </ul>
                                <Link to={'/lizicloud'}>
                                    <div className="action action_left">我要了解<LazyLoad><img src="./images/main/pc/icon_arrow.png" alt=""/></LazyLoad></div>
                                </Link>

                            </div> :
                            <div className="info">
                                <p className={`${checkTool == 'right' ? 'title_right' : ''}`}>内容分发自助平台</p>
                                <ul>
                                    <li><LazyLoad><img
                                        src={this.state.screenWidth > 750 ? './images/main/pc/icon_check.png' : './images/main/mobile/icon_check.png'}
                                        alt=""/></LazyLoad><span>热点内容</span></li>
                                    <li><LazyLoad><img
                                        src={this.state.screenWidth > 750 ? './images/main/pc/icon_check.png' : './images/main/mobile/icon_check.png'}
                                        alt=""/></LazyLoad><span>精准人群</span></li>
                                    <li><LazyLoad><img
                                        src={this.state.screenWidth > 750 ? './images/main/pc/icon_check.png' : './images/main/mobile/icon_check.png'}
                                        alt=""/></LazyLoad><span>自动竞价</span></li>
                                </ul>
                                <Link to='/content'>
                                    <div className="action action_right">
                                        我要了解
                                        <LazyLoad><img src="./images/main/pc/icon_arrow.png" alt=""/></LazyLoad>
                                    </div>
                                </Link>
                            </div>

                        }
                        <LazyLoad><img
                            src={`${checkTool == 'left' ? 'http://gemii-1252311027.cosgz.myqcloud.com/main/mobile/liz_mac.png' : 'http://gemii-1252311027.cosgz.myqcloud.com/main/mobile/fenfa_mac.png'}`}
                            alt="" className={`pc ${checkTool == 'left' ? 'icon_left' : 'icon_right'}`}/></LazyLoad>
                    </div>
                </div>
                <div className="recommand" id={'recommand'}>
                    <p>基于大数据算法挖掘群对话流{this.state.screenWidth > 750 ? "，" : <br/>}实现精准内容推荐</p>
                    <div className="blueline"></div>
                    {this.state.screenWidth > 750 ? <Animate1/> : <LazyLoad><img className="illustration"
                                                                                 src="http://gemii-1252311027.cosgz.myqcloud.com/main/mobile/pic_illustration.svg"
                                                                                 alt=""/></LazyLoad>}
                </div>
                <div className="advertising" id='advertising'>
                    <p>全面连接优质内容平台{this.state.screenWidth > 750 ? "，" : <br/>}对话流信息服务一体化</p>
                    <div className="blueline"></div>
                    <Animate2/>
                </div>
                <div id="brandsWrapper" style={{width: '100%', position: 'relative'}}>
                    <BrandsBox screenWidth={this.state.screenWidth}/>
                </div>
                <Footer/>
            </div>
        )
    }
}
