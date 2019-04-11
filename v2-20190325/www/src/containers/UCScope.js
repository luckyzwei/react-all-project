import React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import SaasUCScope from '../components/SaasUCScope'
import * as TodoActions from '../actions'

const UCScope = ({actions,userInfo,naviMetaData}) => (
    <div style = {{height:'100%'}}>
        <SaasUCScope
            userInfo={userInfo}
            actions={actions}
            naviMetaData={naviMetaData}
        />
    </div>
)

UCScope.propTypes = {
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
)(UCScope)
