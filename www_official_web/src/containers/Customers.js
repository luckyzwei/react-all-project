import React, {Component} from 'react'
import NaviBar from '../components/NaviBar'
import Footer from '../components/Footer'
import $ from 'jquery'
const customers_lg = [
    {
        grayImg:'./images/customer1.png',
        colorImg: './images/customer1-color.png',
        imgStyle: {
            height: '33px'
        }
    },
    {
        grayImg:'./images/customer2.png',
        colorImg: './images/customer2-color.png',
        imgStyle: {
            height: '79px'
        }
    },
    {
        grayImg:'./images/customer3.png',
        colorImg: './images/customer3-color.png',
        imgStyle: {
            height: '31px'
        }
    },
    {
        grayImg:'./images/customer4.png',
        colorImg: './images/customer4-color.png',
        imgStyle: {
            height: '48px'
        }
    },
    {
        grayImg:'./images/customer5.png',
        colorImg: './images/customer5-color.png',
        imgStyle: {
            height: '60px'
        }
    },
    {
        grayImg:'./images/customer6.png',
        colorImg: './images/customer6-color.png',
        imgStyle: {
            height: '64px'
        }
    },
    {
        grayImg:'./images/customer7.png',
        colorImg: './images/customer7-color.png',
        imgStyle: {
            height: '79px'
        }
    },
    {
        grayImg:'./images/customer8.png',
        colorImg: './images/customer8-color.png',
        imgStyle: {
            height: '74px'
        }
    },
    {
        grayImg:'./images/customer9.png',
        colorImg: './images/customer9-color.png',
        imgStyle: {
            height: '48px'
        }
    },
    {
        grayImg:'./images/customer10.png',
        colorImg: './images/customer10-color.png',
        imgStyle: {
            height: '62px'
        }
    },
    {
        grayImg:'./images/customer11.png',
        colorImg: './images/customer11-color.png',
        imgStyle: {
            height: '64px'
        }
    },
    {
        grayImg:'./images/customer12.png',
        colorImg: './images/customer12-color.png',
        imgStyle: {
            height:'53px'
        }
    },
    {
        grayImg:'./images/customer13.png',
        colorImg: './images/customer13-color.png',
        imgStyle: {
            height: '72px'
        }
    },
    {
        grayImg:'./images/customer14.png',
        colorImg: './images/customer14-color.png',
        imgStyle: {
            height: '45px'
        }
    },
    {
        grayImg:'./images/customer15.png',
        colorImg: './images/customer15-color.png',
        imgStyle: {
            height: '75px'
        }
    },
    {
        grayImg:'./images/customer16.png',
        colorImg: './images/customer16-color.png',
        imgStyle: {
            height: '58px'
        }
    },
    {
        grayImg:'./images/customer17.png',
        colorImg: './images/customer17-color.png',
        imgStyle: {
            height: '75px'
        }
    },
    {
        grayImg:'./images/customer18.png',
        colorImg: './images/customer18-color.png',
        imgStyle: {
            height: '80px'
        }
    },
]
const customers_sm = [
    {
        grayImg:'./images/customer1.png',
        colorImg: './images/customer1-color.png',
        imgStyle: {
            height: '22px'
        }
    },
    {
        grayImg:'./images/customer2.png',
        colorImg: './images/customer2-color.png',
        imgStyle: {
            height: '52.3px'
        }
    },
    {
        grayImg:'./images/customer3.png',
        colorImg: './images/customer3-color.png',
        imgStyle: {
            height: '20px'
        }
    },
    {
        grayImg:'./images/customer4.png',
        colorImg: './images/customer4-color.png',
        imgStyle: {
            height: '38px'
        }
    },
    {
        grayImg:'./images/customer5.png',
        colorImg: './images/customer5-color.png',
        imgStyle: {
            height: '40px'
        }
    },
    {
        grayImg:'./images/customer6.png',
        colorImg: './images/customer6-color.png',
        imgStyle: {
            height: '43px'
        }
    },
    {
        grayImg:'./images/customer7.png',
        colorImg: './images/customer7-color.png',
        imgStyle: {
            height: '49px'
        }
    },
    {
        grayImg:'./images/customer8.png',
        colorImg: './images/customer8-color.png',
        imgStyle: {
            height: '44px'
        }
    },
    {
        grayImg:'./images/customer9.png',
        colorImg: './images/customer9-color.png',
        imgStyle: {
            height: '28px'
        }
    },
    {
        grayImg:'./images/customer10.png',
        colorImg: './images/customer10-color.png',
        imgStyle: {
            height: '42px'
        }
    },
    {
        grayImg:'./images/customer11.png',
        colorImg: './images/customer11-color.png',
        imgStyle: {
            height: '48px'
        }
    },
    {
        grayImg:'./images/customer12.png',
        colorImg: './images/customer12-color.png',
        imgStyle: {
            height:'43px'
        }
    },
    {
        grayImg:'./images/customer13.png',
        colorImg: './images/customer13-color.png',
        imgStyle: {
            height: '48px'
        }
    },
    {
        grayImg:'./images/customer14.png',
        colorImg: './images/customer14-color.png',
        imgStyle: {
            height: '30px'
        }
    },
    {
        grayImg:'./images/customer15.png',
        colorImg: './images/customer15-color.png',
        imgStyle: {
            height: '42px'
        }
    },
    {
        grayImg:'./images/customer16.png',
        colorImg: './images/customer16-color.png',
        imgStyle: {
            height: '40px'
        }
    },
    {
        grayImg:'./images/customer17.png',
        colorImg: './images/customer17-color.png',
        imgStyle: {
            height: '42px'
        }
    },
    {
        grayImg:'./images/customer18.png',
        colorImg: './images/customer18-color.png',
        imgStyle: {
            height: '50px'
        }
    },
]

const orgs_lg =[
    {
        grayImg:'./images/org1.png',
        colorImg: './images/org1-color.png',
        imgStyle: {
            height: '43.5px'
        }
    },
    {
        grayImg:'./images/org2.png',
        colorImg: './images/org2-color.png',
        imgStyle: {
            height: '54px'
        }
    },
    {
        grayImg:'./images/org3.png',
        colorImg: './images/org3-color.png',
        imgStyle: {
            height: '80px'
        }
    }
]
const orgs_sm =[
    {
        grayImg:'./images/org1.png',
        colorImg: './images/org1-color.png',
        imgStyle: {
            height: '27px'
        }
    },
    {
        grayImg:'./images/org2.png',
        colorImg: './images/org2-color.png',
        imgStyle: {
            height: '36px'
        }
    },
    {
        grayImg:'./images/org3.png',
        colorImg: './images/org3-color.png',
        imgStyle: {
            height: '45px'
        }
    }
]
class Customer extends Component  {
    constructor(props){
        super(props);
        this.state ={
            hover: false
        }
    }
    mouseoverHandle () {
        this.setState({
            hover: true,
            clsName: 'animated fadeIn'
        })
    }
    mouseoutHandle () {
        this.setState({
            hover: false,
            clsName: ''
        })
    }
    render (){
        return (
            <div className="customer">
                <div style={{width:'100%',height:'100%'}} onMouseOver={this.mouseoverHandle.bind(this)} onMouseOut={this.mouseoutHandle.bind(this)}>
                    <img className={this.state.clsName} src={this.state.hover?this.props.colorSrc:this.props.src} style={this.props.imgStyle} />
                </div>
            </div>
        )
    }
}

class About extends Component {
    constructor(props){
    super(props)
    this.scrollEvent = this.scrollEvent.bind(this)
    // $('body').scrollTop(0)
  }

  state = {
    screenWidth: document.documentElement.clientWidth,
      screenHeight:document.documentElement.clientHeight,
    naviState:'transparent',
  }

  componentWillMount(){
      window.location.href ='https://ad.gemii.cc'
  }

  componentDidMount(){
      document.body.scrollTop = 0
      document.documentElement.scrollTop = 0
    window.addEventListener('scroll', this.scrollEvent);
    window.onresize = () => {
      this.setState({
        screenWidth: document.documentElement.clientWidth, //移动距离
          screenHeight:document.documentElement.clientHeight,
      })
    }

  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.scrollEvent)
  }

  scrollEvent(e){
    // window.debugger(document.body.scrollTop);
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

    render () {
        let customers,orgs;
        if(this.state.screenWidth<=750){
            customers = customers_sm;
            orgs = orgs_sm;
        }else {
            customers = customers_lg;
            orgs = orgs_lg;
        }
        return (
            <div id="customerWrapper">
                <NaviBar state = {this.state.naviState} device = {this.state.screenWidth <= 750 ? 'phone' : 'pc'} current='customers'/>
                <div className="banner" style={{height:this.state.screenHeight}}>
                    <div style={{position:'absolute',left:'0',top:'0',width:'100%',height:'100%',background:'rgba(0,0,0,.15)'}}></div>
                    <p>生态合作共建，指引智能未来</p>
                </div>
                <div className="partners">
                    <div className="customersBox clearfix">
                        <div className="title">合作伙伴</div>
                        {customers.map((customer)=>{
                            return <Customer src={customer.colorImg} imgStyle={customer.imgStyle} colorSrc={customer.colorImg}/>
                        })}
                    </div>
                    <div className="customersBox clearfix">
                        <div className="title">合作机构</div>
                        {orgs.map((customer)=>{
                            return <Customer src={customer.colorImg} imgStyle={customer.imgStyle} colorSrc={customer.colorImg}/>
                        })}
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}

export default About
