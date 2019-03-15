import React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import SaasKWScope from '../components/SaasKWScope'
import * as TodoActions from '../actions'

const CWScope = ({userInfo,actions,naviMetaData}) => (
  <div style = {{height:'100%'}}>
    <SaasKWScope
      userInfo = {userInfo}
      actions={actions}
      naviMetaData={naviMetaData}
    />
  </div>
)

CWScope.propTypes = {
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
)(CWScope)
