import React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import SaasGDScope from '../components/SaasGDScope'
import * as TodoActions from '../actions'

const GDScope = ({userInfo,actions,naviMetaData}) => (
  <div style = {{height:'100%'}}>
    <SaasGDScope
      userInfo = {userInfo}
      actions={actions}
      naviMetaData={naviMetaData}
    />
  </div>
)

GDScope.propTypes = {
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
)(GDScope)