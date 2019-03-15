import React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import LoginScope from '../components/LoginScope'
import * as TodoActions from '../actions'


const Login = ({userInfo,actions,naviMetaData,location}) => (
  <div>
    <LoginScope userInfo = {userInfo} actions={actions} location={location.search} naviMetaData = {naviMetaData}/>
  </div>
)

Login.propTypes = {
  actions: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  userInfo: state.userInfo,
  naviMetaData:state.naviMetaData
})

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(TodoActions, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)
