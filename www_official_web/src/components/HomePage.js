import React, {Component, PropTypes} from "react";
import SlidersWraper from "./SlidersWraper";
import NaviBar from "./NaviBar";
import {InfoForPhone} from "./ServiceItem";
import InnerWraper from "./InnerWraper";
import IntroduceBox from "./IntroduceBox";
import PlatformBox from "./PlatformBox";
import ProductBox from "./ProductBox";
import ServiceBox from "./ServiceBox";
import BrandsBox from "./BrandsBox";
import Footer from "./Footer";
import {animationDatas} from "../constants/DataModel";
import CartoonWrapper from "./CartoonWrapper";
const dataModel = [
    {
        itemStyle: {
            paddingTop: '50px',
            fontFamily: 'PingFangSC-Light'
        },
        background: 'white',
        imgSrc: './images/group1.png',
        title: '高效便捷的客群管理工具',
        desc: ' 便捷的 24 小时顾客社群自动化管理与服务平台    智能 AI 与人工对话无缝衔接， 提高顾客响应效率 高效管理比例，顾客服务覆盖可超 1：10,000 人'
    },
    {
        itemStyle: {
            paddingTop: '50px',
            fontFamily: 'PingFangSC-Light'
        },
        background: '#F8F8F8',
        imgSrc: './images/group2.png',
        title: '您随身携带的销售百科全书',
        desc: '自定义行业和产品知识库，人工智能辅助问答服务  分享同行业权威专家知识库，共享话术并实时      学习 API 连接第三方工具和内容平台'
    },
    {
        itemStyle: {
            paddingTop: '50px',
            fontFamily: 'PingFangSC-Light'
        },
        background: 'white',
        imgSrc: './images/group3.png',
        title: '贴心的顾客个性化服务',
        desc: '为每一位销售人员装备 Mini 个性化推荐引擎连接线上线下用户洞察,提供专属顾客服务多场景触发 Push ，决不放过任何销售机会'
    }
]
const list = [
    {src: '#', imgSrc: './images/wraper1.png'},
    {src: '#', imgSrc: './images/wraper2.png'},
    {src: '#', imgSrc: './images/wraper3.png'}
]

const innerWraper = (device, textArr, textArrPhone) => device == 'phone' ?
    [<InnerWraper text={textArrPhone[0].text} style={textArrPhone[0].style}/>,
        <InnerWraper text={textArrPhone[1].text} style={textArrPhone[1].style}/>,
        <InnerWraper text={textArrPhone[2].text} style={textArrPhone[2].style}/>,
        <InnerWraper text={textArrPhone[3].text} style={textArrPhone[3].style}/>] :
    [<InnerWraper text={textArr[0].text} style={textArr[0].style}/>,
        <InnerWraper text={textArr[1].text} style={textArr[1].style}/>,
        <InnerWraper text={textArr[2].text} style={textArr[2].style}/>,
        <InnerWraper text={textArr[3].text} style={textArr[3].style}/>]

const innerCartoon = animationDatas.map((item) =>
    <CartoonWrapper imgUrls={item.imgArr}
                    animation={item.animation}
                    title={item.title}
                    canvasBoxStyle={item.canvasBoxStyle}
                    text={item.text}/>
)

const textDown = [

    {
        text: '平台从消费者碎片化的语句中，还原出了用户的真实需求，并能够为用户生成个性化内容和产品推荐，我们销售人员的工作效率和业绩都实现了极大的提升',

        style: {
            width: '65.28%',
            lineHeight: '40px',
            fontSize: '26px',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%,-50%)',
            fontFamily: 'PingFangSC-Thin'
        }
    },
    {
        text: '平台提供了强大的行业知识库，加入了我们长期积累的内容和经验之后，员工可以借助人工智能迅速解答消费者的各类专业问题',

        style: {
            width: '65.28%',
            lineHeight: '40px',
            fontSize: '26px',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%,-50%)',
            fontFamily: 'PingFangSC-Thin'
        }
    },
    {
        text: '我们首次体验到人工智能问答的实际应用，即便同时面对上千位消费者，门店导购也能够第一时间响应和理解客户需求，并显著提高了导购的沟通技巧和话术',

        style: {
            width: '65.28%',
            lineHeight: '40px',
            fontSize: '26px',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%,-50%)',
            fontFamily: 'PingFangSC-Thin'
        }
    },
    {
        text: '我们首次体验到人工智能问答的实际应用，即便同时面对上千位消费者，门店导购也能够第一时间响应和理解客户需求，并显著提高了导购的沟通技巧和话术',

        style: {
            width: '65.28%',
            lineHeight: '40px',
            fontSize: '26px',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%,-50%)',
            fontFamily: 'PingFangSC-Thin'
        }
    }
]

const textDownPhone = [

    {
        text: '平台从消费者碎片化的语句中，还原出了用户的真实需求，并能够为用户生成个性化内容和产品推荐，我们销售人员的工作效率和业绩都实现了极大的提升',

        style: {
            width: '80%',
            lineHeight: '24px',
            fontSize: '13px',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%,-50%)',
            fontFamily: 'PingFangSC-Thin'
        }
    },
    {
        text: '平台提供了强大的行业知识库，加入了我们长期积累的内容和经验之后，员工可以借助人工智能迅速解答消费者的各类专业问题',

        style: {
            width: '80%',
            lineHeight: '24px',
            fontSize: '13px',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%,-50%)',
            fontFamily: 'PingFangSC-Thin'
        }
    },
    {
        text: '我们首次体验到人工智能问答的实际应用，即便同时面对上千位消费者，门店导购也能够第一时间响应和理解客户需求，并显著提高了导购的沟通技巧和话术',

        style: {
            width: '80%',
            lineHeight: '24px',
            fontSize: '13px',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%,-50%)',
            fontFamily: 'PingFangSC-Thin'
        }
    },
    {
        text: '我们首次体验到人工智能问答的实际应用，即便同时面对上千位消费者，门店导购也能够第一时间响应和理解客户需求，并显著提高了导购的沟通技巧和话术',

        style: {
            width: '80%',
            lineHeight: '24px',
            fontSize: '13px',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%,-50%)',
            fontFamily: 'PingFangSC-Thin'
        }
    },
]

const textUp = [
    {
        text: '千亿级微社群零售平台',

        style: {width: 'auto', lineHeight: '55px'}
    },
    {
        text: '高效客群管理工具，定制服务智能化',
        style: {width: 'auto', lineHeight: '55px'}
    },
    {
        text: '销售顾问的智能助手',

        style: {width: 'auto', lineHeight: '55px'}
    },
    // {text : '专业智能的行业知识库和销售话术提供',
    //
    // style : {width:'auto',lineHeight:'55px'}},
    {
        text: '专业型垂直母婴商城导购',

        style: {width: 'auto', lineHeight: '55px'}
    }
]
const textUpPhone = [
    {
        text: '千亿级微社群零售平台',

        style: {width: '210px', fontSize: '36px', lineHeight: '45px'}
    },
    {
        text: '高效客群管理工具，定制服务智能化',

        style: {width: 'auto', fontSize: '36px', lineHeight: '45px'}
    },
    {
        text: '销售顾问的智能助手',

        // style : {width:'200px',fontSize:'36px',lineHeight:'45px'}},
        // {text : '专业智能的  行业知识库和  销售话术提供',
        style: {width: '200px', fontSize: '36px', lineHeight: '45px'}
    },
    {
        text: '专业型垂直母婴商城导购',

        style: {width: '210px', fontSize: '36px', lineHeight: '45px'}
    }
]
export default class HomePage extends Component {
    static propTypes = {
        actions: PropTypes.object.isRequired
    }

    constructor(props) {
        super(props)
        this.scrollEvent = this.scrollEvent.bind(this)
        // $('body').scrollTop(0)
    }

    state = {
        screenWidth: document.documentElement.clientWidth,
        naviState: 'transparent',
        screenHeight: document.documentElement.clientHeight
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
        if (scrollTop > 630) {
            this.setState({
                naviState: 'white'
            })
        } else {
            this.setState({
                naviState: 'transparent'
            })
        }
    }

    render() {
        const wallimgList = ['wallimg0', 'wallimg1', 'wallimg2', 'wallimg3']
        const downWallimglist = ['downWallimg0', 'downWallimg1', 'downWallimg2']
        window.debugger('naviState', this.state.naviState);
        const device = this.state.screenWidth <= 750 ? 'phone' : 'pc'
        return (
            <div id="container">
                <NaviBar state={this.state.naviState} device={device} current='/'/>
                <div id="section" style={{width: '100%', height: this.state.screenHeight}}>
                    <div id="section-slide-wrapper"
                         style={{width: '100%', height: this.state.screenHeight, position: 'absolute'}}>
                        <SlidersWraper screenWidth={this.state.screenWidth}
                                       type='textImg'
                                       wraperList={wallimgList}
                                       innerWraper={innerWraper(device, textUp, textUpPhone)}
                                       typeStyle='line'
                                       style='grey'
                                       withButton={true}
                                       sliderNum={4}/>
                    </div>
                </div>
                <div id="section" style={{width: '100%', height: device == 'phone' ? '155px' : '300px'}}>
                    <IntroduceBox device={device}/>
                </div>
                {
                    device == 'phone' ?
                        <div id="section" style={{width: '100%', height: '1350px'}}>
                            <InfoForPhone model={dataModel}/>
                        </div> :
                        <div id="section" style={{width: '100%', height: '510px',background:'white'}}>
                            <div id="section-slide-wrapper"
                                 style={{width: '100%', height: '510px', position: 'absolute'}}>
                                <SlidersWraper screenWidth={this.state.screenWidth}
                                               type='cartoon'
                                               wraperList={wallimgList}
                                               innerWraper={innerCartoon}
                                               typeStyle='circle'
                                               style='blue'
                                               withButton={false}
                                               sliderNum={3}/>
                            </div>
                        </div>
                }
                <div id="section4" style={{width: '100%', position: 'relative', background: '#F8F8F8'}}>
                    <PlatformBox screenWidth={this.state.screenWidth}/>
                </div>
                <div id="section5" style={{width: '100%', position: 'relative'}}>
                    <ProductBox screenWidth={this.state.screenWidth}/>
                </div>
                <div id="section" style={{width: '100%', height: '400px'}}>
                    <div id="section-slide-wrapper" style={{width: '100%', height: '400px', position: 'absolute'}}>
                        <SlidersWraper screenWidth={this.state.screenWidth}
                                       type='textImg'
                                       wraperList={downWallimglist}
                                       innerWraper={innerWraper(device, textDown, textDownPhone)}
                                       withButton={false}
                                       typeStyle='circle'
                                       style='grey'
                                       sliderNum={3}/>
                    </div>
                </div>
                <div id="section7" style={{width: '100%', position: 'relative'}}>
                    <ServiceBox screenWidth={this.state.screenWidth}/>
                </div>
                <div id="brandsWrapper" style={{width: '100%', position: 'relative'}}>
                    <BrandsBox screenWidth={this.state.screenWidth}/>
                </div>
                <Footer />
            </div>
        )
    }
}
