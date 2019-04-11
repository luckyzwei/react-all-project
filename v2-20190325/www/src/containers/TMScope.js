import React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import SaasTMScope from '../components/SaasTMScope'
import * as TodoActions from '../actions'

const TMScope = ({actions,userInfo,naviMetaData}) => (
    <SaasTMScope
        actions={actions}
        userInfo={userInfo}
        naviMetaData={naviMetaData}
    />
)

TMScope.propTypes = {
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
)(TMScope)
