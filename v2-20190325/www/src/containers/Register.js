import React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import RegistScope from '../components/RegistScope'
import * as TodoActions from '../actions'


const Register = ({userInfo,actions,location}) => (
  <div>
    <RegistScope userInfo = {userInfo} actions={actions} location={location.search} />
  </div>
)

Register.propTypes = {
  actions: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  userInfo: state.userInfo
})

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(TodoActions, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register)
