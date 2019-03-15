import React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import SaasGIeditScope from '../components/SaasGIeditScope'
import * as TodoActions from '../actions'

const GIeditScope = ({userInfo,actions,match,naviMetaData}) => (
  <div style = {{height:'100%'}}>
    <SaasGIeditScope
      userInfo = {userInfo}
      actions={actions}
      match={match}
      naviMetaData={naviMetaData}
    />
  </div>
)

GIeditScope.propTypes = {
  userInfo:PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  userInfo: state.userInfo,
  naviMetaData: state.naviMetaData
})

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(TodoActions, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GIeditScope)
