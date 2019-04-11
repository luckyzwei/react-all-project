import React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import SaasGIbuildScope from '../components/SaasGIbuildScope'
import * as TodoActions from '../actions'

const GIbuildScope = ({userInfo,actions,match,naviMetaData}) => (
  <div style = {{height:'100%'}}>
    <SaasGIbuildScope
      userInfo = {userInfo}
      actions={actions}
      match={match}
      naviMetaData={naviMetaData}
    />
  </div>
)

GIbuildScope.propTypes = {
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
)(GIbuildScope)
