/**
 * Created by jiayi.hu on 10/14/17.
 */
import React, {Component} from 'react'
import NaviBar from '../components/NaviBar'
import Footer from '../components/Footer'
import SlidersWraper from "../components/SlidersWraper";

const innerText1 = [
    {
        iconXPosition:'45',
        iconPhoneXPosition:'77',
        text:'邀请好友入群'
    },
    {
        iconXPosition:'215',
        iconPhoneXPosition:'257',
        text:'群内分享商品链接'
    },
    {
        iconXPosition:'385',
        iconPhoneXPosition:'437',
        text:'商品成交'
    },
    {
        iconXPosition:'555',
        iconPhoneXPosition:'617',
        text:'获得销售提成'
    }
]
const innerText2 = [
    {
        iconXPosition:'45',
        text:'无需开店'
    },
    {
        iconXPosition:'173',
        text:'一键转发商品'
    },
    {
        iconXPosition:'301',
        text:'零门槛零压货'
    }
]
const innerText3 = [
    {
        iconXPosition:'429',
        iconPhoneXPosition:'78',
        text:'注册帐号'
    },
    {
        iconXPosition:'557',
        iconPhoneXPosition:'246',
        text:'通过审核'
    },
    {
        iconXPosition:'685',
        iconPhoneXPosition:'414',
        text:'转发商品'
    }
]
const innerText4 = [
    {
        iconXPosition:'45',
        text:'App Store'
    },
    {
        iconXPosition:'107',
        text:'Android'
    },
    {
        iconXPosition:'169',
        text:'扫码下载'
    }
]
export default class Recruit extends Component {
    constructor(){
        super()
        this.scrollEvent = this.scrollEvent.bind(this)
    }
    state = {
        screenWidth: document.documentElement.clientWidth,
        screenHeight:document.documentElement.clientHeight,
        naviState:'transparent',
    }
    componentDidMount(){
        document.body.scrollTop = 0
        document.documentElement.scrollTop = 0
        window.debugger(document.documentElement.scrollTop||document.body.scrollTop)
        window.addEventListener('scroll', this.scrollEvent);
        window.onresize = () => {
            this.setState({
                screenWidth: document.documentElement.clientWidth, //移动距离
                screenHeight:document.documentElement.clientHeight
            })
        }
    }
    componentWillUnmount() {
        window.removeEventListener('scroll', this.scrollEvent)
    }

    scrollEvent(e){
        let scrollTop = document.body.scrollTop||document.documentElement.scrollTop
        if(scrollTop > 630){
            this.setState({
                naviState:'white'
            })
        } else {
            this.setState({
                naviState:'transparent'
            })
        }
    }
    render(){
        const {screenWidth} = this.state
        const device = screenWidth>750?'pc':'phone'
        const WallImgListPhone = ['WallImgList0', 'WallImgList1','WallImgList2']
        return(
            <div id="recruitWrapper">
                <NaviBar state = {this.state.naviState} device = {this.state.screenWidth <= 750 ? 'phone' : 'pc'} current='recruit'/>
                <div className="banner" style={{height:this.state.screenHeight}}>
                    <div style={{position:'absolute',left:'0',top:'0',width:'100%',height:'100%',background:'rgba(0,0,0,.15)'}}></div>
                    <div className="inner">
                        {
                           device=='phone'?
                               <p>加入「有栗」，<br/>中国领先的社群电商</p>:
                               <p>加入「有栗」—— 中国领先的社群电商</p>
                        }
                        <p style={{display:device=='phone'?'none':'block'}}>边逛边卖，轻松有利！</p>
                        <a href="http://a.app.qq.com/o/simple.jsp?pkgname=com.wdwd.gemii" style={{textDecoration:'none'}}>立即下载 App</a>
                    </div>
                </div>
                <div className="partners">
                    <div className="innerBox1">
                        <p>加入有栗，聚集福利</p>
                        <ul>
                            {
                                innerText1.map((item,i)=>(
                                    <li style={{display:'inline-block',position:'relative'}}>
                                        <dl>
                                            {
                                                device=='phone'?
                                                    <dt style={{width:'60px',
                                                                height:'60px',
                                                                background:'url(../images/recruitIconStore/join'+parseInt(i+1)+'.png)no-repeat',
                                                                backgroundSize:'cover'}}></dt>:
                                                    <dt className="iconGround"
                                                        style={{width:'150px',
                                                                height:'150px',
                                                                backgroundPosition:'-'+item.iconXPosition+'px -52px'}}></dt>
                                            }
                                            <dt>{item.text}</dt>
                                        </dl>
                                        {
                                            i!==innerText1.length-1?<dl><dt><a className="iconGround"></a></dt></dl>:<dl></dl>
                                        }
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                    <div className="innerBox2">
                        <p>
                            <p>有栗提供</p>
                            {
                                device=='phone'?
                                    <p>自建培训及客服体系，<br/>全方位提供经营指导和售后保障</p>:
                                    <p>自建培训及客服体系，全方位提供经营指导和售后保障</p>
                            }
                        </p>
                        {
                            device=='phone'?
                                <div style={{height:'520px',position:'relative',marginTop:'75px'}}>
                                    <SlidersWraper screenWidth={screenWidth}
                                                   type='recruitOffer'
                                                   wraperList={WallImgListPhone}
                                                   innerWraper={{textMainMember:innerText2, device: device}}
                                                   withButton={false}
                                                   typeStyle='circle'
                                                   style='red'
                                                   sliderNum={3}/>
                                </div>:
                                <ul>
                                    {
                                        innerText2.map((item,i)=>(
                                            <dl style={{background:'url(../images/bg'+parseInt(i+1)+'.png)no-repeat',height:'400px',backgroundSize:'cover'}}>
                                                <dt>
                                                    <em className="iconGround"
                                                        style={{width:'108px',height:'108px',backgroundPosition:'-'+item.iconXPosition+'px -239px',marginTop:'116px',display:'inline-block'}}></em>
                                                </dt>
                                                <dt>{item.text}</dt>
                                                <dt></dt>
                                            </dl>
                                        ))
                                    }
                                </ul>

                        }
                    </div>
                    <div className="innerBox3">
                        <p>成为「有栗」合伙人流程</p>
                        <ul>
                            {
                                innerText3.map((item,i)=>(
                                    <li style={{display:'inline-block',position:'relative'}}>
                                        <dl>
                                            <dt className="iconGround"
                                                style={{width:device=='phone'?'108px':'108px',
                                                        height:device=='phone'?'108px':'108px',
                                                        backgroundPosition:device=='phone'?'-'+item.iconPhoneXPosition+'px -288px':'-'+item.iconXPosition+'px -239px'}}></dt>
                                            <dt>{item.text}</dt>
                                        </dl>
                                            {
                                                i!==innerText3.length-1?<dl><dt><a></a></dt></dl>:<dl></dl>
                                            }
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                    {
                        device=='phone'?
                            <div className="innerBox4" style={{height:screenWidth*1334/750}}>
                                <a href="http://a.app.qq.com/o/simple.jsp?pkgname=com.wdwd.gemii" style={{textDecoration : 'none',color : 'white'}}>立即下载</a>
                            </div>:
                            <div className="innerBox4">
                                <p>
                                    <p>下载有栗App</p>
                                    <p>点击按钮或扫描二维码，立即下载App体验吧</p>
                                </p>
                                <ul>
                                    {
                                        innerText4.map((item,i)=>(
                                        i==innerText4.length-1?
                                        <dl>
                                            <dt>
                                                <em className="iconGround"
                                                    style={{width:'46px',
                                                        height:'46px',
                                                        backgroundPosition:'-'+item.iconXPosition+'px -384px',
                                                        float:'left',
                                                        marginLeft:'30px'}}></em>
                                                {item.text}
                                            </dt>
                                            <dt><img src="../images/appQrcode.jpeg" width='200px' height='200px'/></dt>
                                            </dl> :
                                        <dl>
                                            <dt><a href="http://a.app.qq.com/o/simple.jsp?pkgname=com.wdwd.gemii" style={{textDecoration : 'none',color : 'white'}}>
                                                <em className="iconGround"
                                                    style={{width:'46px',
                                                        height:'46px',
                                                        backgroundPosition:'-'+item.iconXPosition+'px -384px',
                                                        float:'left',
                                                        marginLeft:'30px'}}></em>
                                                {item.text}
                                                </a>
                                            </dt>
                                            </dl>
                                        ))
                                    }
                                </ul>
                            </div>

                    }
                </div>
                <Footer />
            </div>
        )
    }
}
