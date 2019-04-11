import React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import SaasHome from '../components/SaasHome'
import * as TodoActions from '../actions'

const Home = ({userInfo,naviMetaData,actions}) => (
  <div style = {{height:'100%'}}>
    <SaasHome  userInfo={userInfo} actions={actions} naviMetaData = {naviMetaData}/>
  </div>
)

Home.propTypes = {
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
)(Home)