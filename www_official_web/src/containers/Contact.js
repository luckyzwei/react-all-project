import React, {Component} from 'react'
import NaviBar from '../components/NaviBar'
import Footer from '../components/Footer'
import $ from 'jquery'

class Contact extends Component {
    constructor(props){
        super(props)
        $('body').scrollTop(0)
    }
    state = {
        screenWidth: document.documentElement.clientWidth,
        naviState:'white'
    }

    render () {
        return <div id="contactWrapper">
            <NaviBar state = {this.state.naviState} device = {this.state.screenWidth <= 750 ? 'phone' : 'pc'} current=''/>
            <div className="contactBox">
                <h3 className="title">联系我们</h3>
                <div className="telBox">
                    <p>电话联系</p>
                    <p>021-66615889</p>
                </div>
                <div className="emailBox">
                    <p>零售部邮箱</p>
                    <p>seller@gemii.cc</p>
                    <p>品牌营销部邮箱</p>
                    <p>gq@gemii.cc</p>
                </div>
                <div className="addressBox">
                    <p>公司地址</p>
                    <p>上海市静安区灵石路 718 号 B1 北楼 402 室</p>
                </div>
            </div>
            <Footer />
        </div>
    }
}

export default Contact
