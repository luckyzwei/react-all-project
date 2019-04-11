import React , { Component }from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as TodoActions from '../actions'
/* global location */
/* eslint no-restricted-globals: ["off", "location"] */
/* eslint-disable */
class LoginAgain extends Component{
    constructor(props){
        super(props)
        this.loginAgain = this.loginAgain.bind(this)
    }
    loginAgain(){
      this.props.actions.goTo('/v2/login?redirect=v2/InitScope')
    }
    render(){
        return(
            <div className="login-again" >
                <div className="goBackLogin">
                    <div className="login-again-icon">
                    </div>
                    <p>您的账号已在其他电脑登录！</p>
                    <span
                        className="click-login"
                        onClick={this.loginAgain}
                    >点击重新登录</span>
                </div>
            </div>
        )
    }
}

LoginAgain.propTypes = {
  todos: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  todos: state.todos
})

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(TodoActions, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginAgain)
