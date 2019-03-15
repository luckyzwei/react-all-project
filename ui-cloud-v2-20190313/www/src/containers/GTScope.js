import React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import SaasGTScope from '../components/SaasGTScope'
import * as TodoActions from '../actions'

const RMScope = ({actions,userInfo,naviMetaData}) => (
    <div style = {{height:'100%'}}>
        <SaasGTScope
            userInfo={userInfo}
            actions={actions}
            naviMetaData={naviMetaData}
        />
    </div>
)

RMScope.propTypes = {
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
)(RMScope)
