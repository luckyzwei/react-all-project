import React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import SaasGMScope from '../components/SaasGMScope'
import * as TodoActions from '../actions'

const GMScope = ({socketState,userInfo,extendState,groupList,memberList,searchKey,messageData,singleMesgData,keywordsData,actions,microTaskList,msgPicker,cwList,naviMetaData}) => (
  <div style = {{height:'100%'}}>
    <SaasGMScope socketState = {socketState}
    extendState = {extendState}
    userInfo = {userInfo}
    groupList = {groupList}
    memberList = {memberList}
    messageData = {messageData}
    singleMesgData = {singleMesgData}
    keywordsData = {keywordsData}
    searchKey = {searchKey}
    actions={actions}
    microTaskList = {microTaskList}
    cwList = {cwList}
    msgPicker = {msgPicker}
    naviMetaData={naviMetaData}
    />
  </div>
)

GMScope.propTypes = {
  socketState: PropTypes.object.isRequired,
  userInfo:PropTypes.object.isRequired,
  groupList: PropTypes.object.isRequired,
  memberList:PropTypes.object.isRequired,
  messageData:PropTypes.object.isRequired,
  singleMesgData:PropTypes.object.isRequired,
  keywordsData:PropTypes.object.isRequired,
  searchKey:PropTypes.object.isRequired,
  msgPicker:PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  socketState:state.socketState,
  userInfo:state.userInfo,
  extendState:state.extendState,
  groupList: state.groupList,
  searchKey: state.searchKey,
  memberList: state.memberList,
  messageData:state.messageData,
  singleMesgData:state.singleMesgData,
  keywordsData:state.keywordsData,
  microTaskList: state.microTaskList,
  cwList: state.cwList,
  msgPicker: state.msgPicker,
  naviMetaData: state.naviMetaData
})

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(TodoActions, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GMScope)
