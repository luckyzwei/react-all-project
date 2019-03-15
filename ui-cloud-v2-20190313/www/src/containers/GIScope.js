import React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import SaasGIScope from '../components/SaasGIScope'
import * as TodoActions from '../actions'

const GIScope = ({userInfo,actions,naviMetaData}) => (
  <div style = {{height:'100%'}}>
    <SaasGIScope
      userInfo = {userInfo}
      actions={actions}
      naviMetaData={naviMetaData}
    />
  </div>
)

GIScope.propTypes = {
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
)(GIScope)
