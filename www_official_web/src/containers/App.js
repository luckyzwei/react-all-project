import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import HomePage from '../components/NewHomePage'
import * as TodoActions from '../actions'

const App = ({actions}) => (
  <div>
    <HomePage actions={actions} />
  </div>
)

App.propTypes = {
  actions: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(TodoActions, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
