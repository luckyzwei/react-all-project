import React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import SaasInitScope from '../components/SaasInitScope'
import * as TodoActions from '../actions'

const InitScope = ({userInfo,naviMetaData,actions}) => (
  <div style = {{height:'100%'}}>
    <SaasInitScope  userInfo={userInfo} actions={actions} naviMetaData = {naviMetaData}/>
  </div>
)

InitScope.propTypes = {
  userInfo: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  naviMetaData:PropTypes.object.isRequired
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
)(InitScope)
