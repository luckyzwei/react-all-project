import React, { Component } from "react";
import PropTypes from 'prop-types'
import $ from "jquery";
import LoginForm from "../loginComponents/LoginForm";
import RegisterForm from '../registerComponents/RegisterForm'
import './index.css'
/* global location */
/* eslint no-restricted-globals: ["off", "location"] */
export default class LoginScope extends Component {
    static propTypes = {
        actions: PropTypes.object.isRequired
    }

    constructor(props) {
        super(props)
        this.resizeEvent = this.resizeEvent.bind(this)
        this.childChange = this.childChange.bind(this)
        this.goLogin = this.goLogin.bind(this)
        this.goRegister = this.goRegister.bind(this)
        this.goRetrieve = this.goRetrieve.bind(this)
    }

    state = {
        screenWidth: document.documentElement.clientWidth,
        screenHeight: document.documentElement.clientHeight,
        viewController: 'LOGIN_FORM',
        childController: 'CHILD_REGISTER',
        loginName: ''
    }


    resizeEvent() {
        {
            this.setState({
                screenWidth: document.documentElement.clientWidth,
                screenHeight: document.documentElement.clientHeight
            })
        }
    }

    componentDidMount() {
        document.title = '登录页 | 栗子云'
        $('.saas-container').css('overflow-y', 'auto')
        $(window).get(0).addEventListener('resize', this.resizeEvent)
    }
    componentWillUnmount() {
        $(window).get(0).removeEventListener('resize', this.resizeEvent)

    }

    goRegister() {
        this.setState({
            viewController: 'REGISTER_FORM',
            childController: 'CHILD_REGISTER'
        })
    }
    goRetrieve() {
        this.setState({
            viewController: 'REGISTER_FORM',
            childController: 'CHILD_VERIFY'
        })
    }
    childChange(child) {
        this.setState({
            viewController: 'REGISTER_FORM',
            childController: child
        })
    }
    goLogin() {
        this.setState({
            viewController: 'LOGIN_FORM',
            childController: 'CHILD_REGISTER',
        })
    }
    forwordTo(name) {
        location.href = location.origin + name
    }
    render() {
        const containerWidth = this.state.screenWidth
        const containerHeight = this.state.screenHeight
        const { viewController, childController } = this.state
        const { location, naviMetaData, actions} = this.props
        let viewScope = null
        switch (viewController) {
            case 'REGISTER_FORM':
                viewScope =
                    <div className="saas-registerContainer"
                        style={{ width: containerWidth, height: containerHeight }}>
                        <div className="formBox">
                            <RegisterForm childController={childController}
                                handleChildChange={this.childChange}
                                goLogin={this.goLogin}
                                location={location}
                            />
                        </div>
                    </div>
                break
            case 'LOGIN_FORM':
                viewScope =
                    <div className="saas-loginContainer" style={{
                        width: containerWidth,
                        height: 700
                    }}>
                        <div className='wallImageWrapper'>
                            <div className='headNav'>
                                <div className='cell-innerBox'>
                                    <div className='logoHead' onClick={() => {
                                        this.forwordTo('/marketPortal/home?redirect=v2')
                                    }}></div>
                                </div>
                            </div>
                            <div className="modal"></div>
                            <div className='cell-innerBox'>
                                <div className='textBox'>
                                    <div className='h-font'>更高效智能的社群营销 SaaS 平台</div>
                                    <div className='l-font'>社群营销，从栗子云开始</div>
                                </div>
                                <div className='formBox'>
                                    <LoginForm actions={actions}
                                        goRegister={this.goRegister}
                                        goRetrieve={this.goRetrieve}
                                        naviMetaData={naviMetaData}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='footerNav'>
                            <div className='cell-innerBox'>
                                <div className='innerItem'
                                    onClick={() => {
                                        this.forwordTo('/marketPortal/product?redirect=v2')
                                    }}
                                >产品</div>
                                <div className='innerItem'
                                    onClick={() => {
                                        this.forwordTo('/marketPortal/solution?redirect=v2')
                                    }}
                                >解决方案</div>
                                <div className='innerItem'
                                    onClick={() => {
                                        this.forwordTo('/marketPortal/marketing?redirect=v2')
                                    }}>案例</div>
                                <div className='innerItem'
                                    onClick={() => {
                                        this.forwordTo('/marketPortal/price?redirect=v2')
                                    }}>购买</div>
                                <div className='innerItem'
                                    onClick={() => {
                                        window.location.href = 'http://www.gemii.cc'
                                    }}>关于Gemii</div>
                                <div className='rightItem'><a href='http://www.miitbeian.gov.cn' target='blank' style={{color: '#344658'}}>沪 ICP 备 16026551 号</a></div>
                                <div className='copyrightBox'>Copyright &copy; 2018Gemii</div>
                            </div>
                        </div>
                    </div>
                break
        }
        return (
            <div>
                {viewScope}
            </div>
        )
    }
}
