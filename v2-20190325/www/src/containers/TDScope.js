import React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import SaasTDScope from '../components/SaasTDScope'
import * as TodoActions from '../actions'

const TDScope = ({userInfo,actions,naviMetaData}) => (
  <div style = {{height:'100%'}}>
    <SaasTDScope
      userInfo = {userInfo}
      actions={actions}
      naviMetaData={naviMetaData}
    />
  </div>
)

TDScope.propTypes = {
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
)(TDScope)