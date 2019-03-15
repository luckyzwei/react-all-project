import React, { Component } from "react";
import PropTypes from 'prop-types'
import $ from "jquery";
import RegisterForm from '../registerComponents/RegisterForm'
import '../LoginScope/index.css'
/* global location */
/* eslint no-restricted-globals: ["off", "location"] */

export default class LoginScope extends Component {
    static propTypes = {
        actions: PropTypes.object.isRequired
    }

    constructor(props) {
        super(props)
        this.resizeEvent = this.resizeEvent.bind(this)
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
        document.title = '注册页 | 栗子云'
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
        // <div dangerouslySetInnerHTML = {{__html:a}}></div>
        const { viewController, childController } = this.state
        const { location, actions } = this.props
        return (
            <div>
                <div className="saas-registerContainer saas-loginContainer"
                    style={{ width: containerWidth, height: containerHeight, overflow: 'auto' }}>
                    <div className='headNav'>
                        <div className='modal'></div>
                        <div className='cell-innerBox'>
                            <div className='logoHead' onClick={() => {
                                this.forwordTo('/marketPortal/home?redirect=v2')
                            }}></div>
                        </div>
                    </div>
                    <div className="formBox">
                        <RegisterForm childController={'CHILD_REGISTER'}
                            handleChildChange={this.childChange.bind(this)}
                            goLogin={() => {
                                actions.goTo('/v2/login')
                            }}
                            actions={actions}
                            location={location}
                        />
                    </div>
                    <div className='footerNav' style={{ position: 'relative' }}>
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
                            <div className='rightItem'>沪 ICP 备 16026551 号-1</div>
                            <div className='copyrightBox'>Copyright &copy; 2018Gemii</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
