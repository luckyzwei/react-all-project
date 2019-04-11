import React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import SaasMsgScope from '../components/SaasMsgScope'
import * as TodoActions from '../actions'

const CWScope = ({userInfo,actions}) => (
  <div style = {{height:'100%'}}>
    <SaasMsgScope
      userInfo = {userInfo}
      actions={actions}
    />
  </div>
)

CWScope.propTypes = {
  userInfo:PropTypes.object.isRequired,
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
)(CWScope)
