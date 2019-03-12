/**
 * Created by jiayi.hu on 10/9/17.
 */
import React, {Component} from 'react'
import NaviBar from '../components/NaviBar'
import Footer from '../components/Footer'
import SlidersWraper from "../components/SlidersWraper";
import $ from 'jquery'
import LiziCloud from './LiziCloud'

const innerIcon1=[
    {
        iconXPosition:'93',
        text:'微信 9 亿用户，4 亿微信支付'
    },
    {
        iconXPosition:'275',
        text:'千亿级社群电商规模'
    },
    {
        iconXPosition:'457',
        text:'日增 700 万个社群'
    }
]
const innerIcon2=[
    {
        iconXPosition:'93',
        text:'轻松管理分销商'
    },
    {
        iconXPosition:'141',
        text:'便捷的订单管理'
    },
    {
        iconXPosition:'189',
        text:'丰富的营销玩法'
    },
    {
        iconXPosition:'237',
        text:'精准的数据分析'
    }
]
const innerIcon3=[
    {
        iconXPosition:'525',
        text:'一件代发'
    },
    {
        iconXPosition:'633',
        text:'供货价优势'
    },
    {
        iconXPosition:'741',
        text:'品牌影响力'
    },
    {
        iconXPosition:'849',
        text:'优质品牌代理商'
    },
    {
        iconXPosition:'957',
        text:'行业经验和历史'
    }
]
const innerIcon4=[
    {
        iconXPosition:'93',
        text:'注册账号'
    },
    {
        iconXPosition:'201',
        text:'提交资料'
    },
    {
        iconXPosition:'309',
        text:'通过审核'
    },
    {
        iconXPosition:'417',
        text:'发布商品'
    }
]
export default class YouLi extends Component {
    constructor(props){
        super(props)
        this.scrollEvent = this.scrollEvent.bind(this)
    }

    state = {
        screenWidth: document.documentElement.clientWidth,
        screenHeight:document.documentElement.clientHeight,
        naviState:'transparent',
        transferBtn:false
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
    handleScrollTop(){
        $(document.body).animate({scrollTop:document.documentElement.clientHeight},'slow')
        $(document.documentElement).animate({scrollTop:document.documentElement.clientHeight},'slow')
    }
    transferStart(){
        window.debugger('start')
        this.setState({
            transferBtn:true
        })
    }
    transferEnd(){
        window.debugger('end')
        this.setState({
            transferBtn:false
        })
    }
    goLink(){
        window.location.href = 'http://jingli.ent.maimaias.cn/broker/1K6X1/source/18YE4'
    }
    render () {
        window.debugger(document.documentElement.scrollTop||document.body.scrollTop)
        const {screenWidth,screenHeight,transferBtn} = this.state
        const device = screenWidth>750?'pc':'phone'
        const WallImgListPhone = ['WallImgList0', 'WallImgList1','WallImgList2','WallImgList3','WallImgList4']
        return (
            <div id="youliWrapper">
                <NaviBar state = {this.state.naviState} device = {this.state.screenWidth <= 750 ? 'phone' : 'pc'} current='youli'/>
                <div className="banner" style={{height:this.state.screenHeight}}>
                    <div style={{position:'absolute',left:'0',top:'0',width:'100%',height:'100%',background:'rgba(0,0,0,.15)'}}></div>
                    <div className="inner">
                    <p>千亿级微社群零售平台</p>
                    <p style={{display:device=='phone'?'none':'block'}}>便捷后台管理系统，供销购分销一体化</p>
                        <a onClick={this.handleScrollTop.bind(this)}>了解详情</a>
                        </div>
                </div>
                <div className="partners">
                    <div className="innerBox1">
                        <p>大市场大流量</p>
                        <ul>
                        {
                            innerIcon1.map((item,i)=>(
                                <dl>
                                    {
                                        device=='phone'?
                                        <dt style={{width:'179px',height:'179px',background:'url(../images/recruitIconStore/group'+parseInt(i+1)+'.png)no-repeat',backgroundSize:'cover'}}></dt>:
                                        <dt className="iconGround"
                                            style={{width:'182px',height:'182px',backgroundPosition:'-'+item.iconXPosition+'px -78px'}}></dt>
                                    }
                                    <dt>{item.text}</dt>
                                </dl>
                            ))
                        }
                        </ul>
                    </div>
                    <div className="innerBox2" style={{height:device=='phone'?screenWidth*1334/750:'760px'}}>
                       <p>供销购分销系统管理一体化</p>
                        <div className="iconGround" style={{width:'690px',height:'456px',backgroundPosition:'-93px -457px',marginTop:'26px',display:device=='phone'?'none':'inline-block'}}></div>
                        <div className="rightArea">
                            {
                                innerIcon2.map((item,i)=>(
                                    <dl style={{display:'table',margin:'8px 0'}}>
                                        <dt className="iconGround"
                                            style={{width:'48px',height:'48px',backgroundPosition:'-'+item.iconXPosition+'px -368px'}}></dt>
                                        <dt>{item.text}</dt>
                                    </dl>
                                ))
                            }
                        </div>
                    </div>
                    <div className="innerBox3">
                       <p>「有栗」招商标准</p>
                        {
                            device=='phone'?
                                <div style={{height:'520px',position:'relative'}}>
                                    <SlidersWraper screenWidth={screenWidth}
                                                   type='youLiRule'
                                                   wraperList={WallImgListPhone}
                                                   innerWraper={{textMainMember:innerIcon3, device: device}}
                                                   withButton={false}
                                                   typeStyle='circle'
                                                   style='red'
                                                   sliderNum={5}/>
                                </div>:
                                <ul>
                                    {
                                        innerIcon3.map((item,i)=>(
                                            <dl style={{background:'url(../images/Artboard'+parseInt(i+1)+'.png)no-repeat'}}>
                                                <dt>
                                                    <em className="iconGround"
                                                        style={{width:'108px',height:'108px',backgroundPosition:'-'+item.iconXPosition+'px -260px',marginTop:'116px',display:'inline-block'}}></em>
                                                </dt>
                                                <dt>{item.text}</dt>
                                                <dt></dt>
                                            </dl>
                                        ))
                                    }
                                </ul>

                        }
                    </div>
                    <div className="innerBox4">
                       <p>入驻流程</p>
                        <ul>
                            {
                                innerIcon4.map((item,i)=>(
                                   <li style={{display:'inline-block',position:'relative'}}>
                                    <dl>
                                        <dt className="iconGround"
                                            style={{width:'108px',height:'108px',backgroundPosition:'-'+item.iconXPosition+'px -260px'}}></dt>
                                        <dt>{item.text}</dt>
                                    </dl>
                                       {
                                           i!==innerIcon4.length-1?<dl><dt><a></a></dt></dl>:<dl></dl>
                                       }
                                   </li>
                                ))
                            }
                        </ul>
                    </div>
                    {/*<div className="innerBox5">*/}
                         {/*<p>立即申请入驻体验吧！</p>*/}
                        {/*{*/}
                            {/*device == 'phone'?*/}
                                {/*<div className='enterBtn'*/}
                                     {/*onClick={this.goLink.bind(this)}>*/}
                                     {/*我要申请入驻*/}
                                {/*</div>:*/}
                                {/*<div className={transferBtn?'enterBtn hover':'enterBtn'}*/}
                                     {/*onMouseEnter={this.transferStart.bind(this)}*/}
                                     {/*onMouseLeave={this.transferEnd.bind(this)}*/}
                                     {/*onClick={this.goLink.bind(this)}>*/}
                                     {/*我要申请入驻*/}
                                {/*</div>*/}
                        {/*}*/}
                    {/*</div>*/}
                </div>
                <Footer />
            </div>
        )
    }
}
