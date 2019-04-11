import React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import SaasMLScope from '../components/SaasMLScope'
import * as TodoActions from '../actions'

const MLScope = ({ userInfo, actions ,naviMetaData}) => (
    <div style={{ height: '100%' }}>
        <SaasMLScope
            userInfo={userInfo}
            actions={actions}
            naviMetaData={naviMetaData}
        />
    </div>
)

MLScope.propTypes = {
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
)(MLScope)
