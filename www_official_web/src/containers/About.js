import React, {Component} from 'react'
import NaviBar from '../components/NaviBar'
import Footer from '../components/Footer'
import $ from 'jquery'

const getTop = (Dom) => {
    var top = 0;
    while(Dom.parentNode!==null){
        top += Dom.offsetTop;
        Dom = Dom.parentNode;
    }
    return top;
}

class HistoryBox extends Component {
    componentWillReceiveProps () {
        if(this.props.scrollTop>getTop(this.refs.item)-this.props.winHeight){
            this.refs.item.style.opacity = '1';
        }
    }
    render () {
        return (
            <div className="historyBox" ref="item">
                <div className="time">{this.props.time}</div>
                <pre className="event">{this.props.event}</pre>
            </div>
        )
    }
}

class About extends Component {
    constructor(props){
        super(props)
        this.scrollEvent = this.scrollEvent.bind(this)
        $('body').scrollTop(0)
    }
    state = {
        screenWidth: document.documentElement.clientWidth,
        naviState:'transparent',
        scrollTop:0,
        winHeight:0,
        lineTop: 0
    }
    componentDidMount(){
        var winHeight = document.documentElement.clientHeight;
        var scrollTop = document.body.scrollTop;
        this.setState({
            winHeight: winHeight,
            scrollTop: scrollTop,
            lineTop: getTop(this.refs.lineBox)
        });
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

    scrollEvent(e){
        // window.debugger(document.body.scrollTop);
        // window.debugger(this.refs.lineBox)
        var lineTop = this.state.lineTop;
        var winHeight = this.state.winHeight;
        var scrollTop = document.body.scrollTop;
        if(scrollTop>lineTop-winHeight){
            this.refs.lineBox.className='lineBox animate'
        }
        this.setState({
            scrollTop: scrollTop
        }) ;

        if(document.body.scrollTop > 630){
        this.setState({
            naviState:'white'
        })
        } else {
        this.setState({
            naviState:'transparent'
        })
        }
    }
    render () {
        var data = [
            {time:'2016.03',event:'公司成立\n上海景栗信息科技有限公司'},
            {time:'2016.06',event:'「栗子妈妈」公众号上线\n母婴「星空联盟」成立'},
            {time:'2016.09',event:'同卫计委、预防医学会建立战略合作\n全国范围建立妈妈微社群\n20w 用户覆盖强运营驱动'},
            {time:'2016.11',event:'「栗子云」平台进入研发\n社群覆盖近百万用户'},
            {time:'2017.02',event:'「栗子妈妈俱乐部」上线\n社群运营中心启动'},
            {time:'2017.03',event:'同妇女发展基金会合作\n同一线专家和品牌开始内容知识库共建'},
            {time:'2017.06',event:'「栗子妈妈」公众号超 10w\n加速人工智能需求分析\n实现 90% 需求识别'}
        ]
        var {scrollTop,winHeight} = this.state;
        return (
                <div id="aboutWrapper" style={{width:'100%'}}>
                    <NaviBar state = {this.state.naviState} device = {this.state.screenWidth <= 750 ? 'phone' : 'pc'} current='about'/>
                    <div className="bannerBox" style={{position:'relative'}}>
                        <div style={{position:'absolute',left:'0',top:'0',width:'100%',height:'100%',background:'rgba(0,0,0,.15)'}}></div>
                        <p>成长的路上&nbsp;&nbsp;我们携手前行</p>
                    </div>
                    <div className="developBox">
                        <div style={{position:'absolute',left:'0',top:'0',width:'100%',height:'100%',background:'rgba(0,0,0,.15)'}}></div>
                        <p className="title">发展历程</p>
                        <div className="lineBox" ref='lineBox'>
                            <div className="line"></div>
                            <div className="outerPoint">
                                <div className="innerPoint"></div>
                            </div>
                            <div className="outerPoint">
                                <div className="innerPoint"></div>
                            </div>
                            <div className="outerPoint">
                                <div className="innerPoint"></div>
                            </div>
                            <div className="outerPoint">
                                <div className="innerPoint"></div>
                            </div>
                            <div className="outerPoint">
                                <div className="innerPoint"></div>
                            </div>
                            <div className="outerPoint">
                                <div className="innerPoint"></div>
                            </div>
                            <div className="outerPoint">
                                <div className="innerPoint"></div>
                            </div>
                        </div>
                        <div className="developHistory" >
                            {
                                data.map((val,id) => {
                                   return <HistoryBox key={id} time={val.time} event={val.event} scrollTop={scrollTop} winHeight={winHeight}/>
                                })
                            }
                        </div>
                    </div>
                    <Footer />
                </div>
        )
    }
}

export default About
