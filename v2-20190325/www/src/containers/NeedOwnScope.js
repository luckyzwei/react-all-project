import React , { Component }from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as TodoActions from '../actions'
import SaasNeedOwn from '../components/SaasNeedOwn'
/* global location */
/* eslint no-restricted-globals: ["off", "location"] */
class NeedOwnScope extends Component{
    render(){
      const {actions,userInfo,naviMetaData} = this.props
        return(
            <SaasNeedOwn
              actions = {actions}
              userInfo={userInfo}
              naviMetaData = {naviMetaData}
              />
        )
    }
}

NeedOwnScope.propTypes = {
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
)(NeedOwnScope)
