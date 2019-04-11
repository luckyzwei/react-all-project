import React , { Component }from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as TodoActions from '../actions'
import SaasNeedAuth from '../components/SaasNeedAuth'
/* global location */
/* eslint no-restricted-globals: ["off", "location"] */
class NeedAuthority extends Component{
    render(){
      const {actions,userInfo,naviMetaData} = this.props
        return(
            <SaasNeedAuth
              actions = {actions}
              userInfo={userInfo}
              naviMetaData = {naviMetaData}
              />
        )
    }
}

NeedAuthority.propTypes = {
  actions: PropTypes.object.isRequired
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
)(NeedAuthority)
