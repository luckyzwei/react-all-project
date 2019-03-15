import React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import SaasMMbuildScope from '../components/SaasMMbuildScope'
import * as TodoActions from '../actions'

const MTbuildScope = ({ userInfo, actions, match, history,naviMetaData }) => (
    <div style={{ height: '100%' }}>
        <SaasMMbuildScope
            userInfo={userInfo}
            actions={actions}
            match={match}
            history={history}
            naviMetaData={naviMetaData}
        />
    </div>
)

MTbuildScope.propTypes = {
    userInfo: PropTypes.object.isRequired,
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
)(MTbuildScope)
