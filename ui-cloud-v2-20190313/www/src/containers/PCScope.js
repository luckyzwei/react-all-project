import React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import SaasPCScope from '../components/SaasPCScope'
import * as TodoActions from '../actions'


const PCScope = ({actions,userInfo,naviMetaData}) => (
  <div style = {{height:'100%'}}>
    <SaasPCScope
      actions={actions}
      userInfo={userInfo}
      naviMetaData={naviMetaData}
    />
  </div>
)

PCScope.propTypes = {
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
)(PCScope)
