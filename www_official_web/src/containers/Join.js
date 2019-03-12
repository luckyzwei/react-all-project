/**
 * Created by jiayi.hu on 7/24/17.
 */
import React, {Component, PropTypes} from 'react'
import {Link} from 'react-router-dom'
import JobBox from '../components/JobBox'
import NaviBar from '../components/NaviBar'
import Footer from '../components/Footer'
import $ from 'jquery'

class Join extends Component{
    constructor(props){
        super(props)
        this.scrollEvent = this.scrollEvent.bind(this)
        $('body').scrollTop(0)
    }

    state = {
        screenWidth: document.documentElement.clientWidth,
        screenHeight:document.documentElement.clientHeight,
        naviState:'transparent',
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
    render() {
        const {naviState,screenWidth} = this.state
        return (
            <div id="JoinWrapper">
                <NaviBar state={naviState}
                         device={screenWidth <= 750 ? 'phone' : 'pc'}
                         current='join'/>
                <div className="joinBanner"
                     style={{background:(screenWidth<=750?'url(./images/join_bg_phone.jpg) no-repeat center':'url(./images/join_bg_mid.jpg) no-repeat center'),height:this.state.screenHeight}}
                     >
                    <div className="banner-field-state">
                        <p>有趣的灵魂&nbsp;&nbsp;总会相遇</p>
                    </div>
                </div>
                <div className="joinRecruit">
                    <div className="recruit-field-state">加入我们</div>
                    <a href="mailto:recruitment@gemii.cc"
                       className="recruit-field-email">
                        相遇传送门：recruitment@gemii.cc
                    </a>
                    <div>
                        <JobBox device={screenWidth}/>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}

export default Join
