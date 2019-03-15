import React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import SaasGIhistoryScope from '../components/SaasGIhistoryScope'
import * as TodoActions from '../actions'

const GIhistoryScope = ({userInfo,actions,match,naviMetaData}) => (
  <div style = {{height:'100%'}}>
    <SaasGIhistoryScope
      userInfo = {userInfo}
      actions={actions}
      match={match}
      naviMetaData={naviMetaData}
    />
  </div>
)

GIhistoryScope.propTypes = {
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
)(GIhistoryScope)
