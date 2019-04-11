import React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as TodoActions from '../actions'

const Error = ({ paramSave, actions }) => (
  <div style={{ height: '100%' }}>
    hello world!
  </div>
)

export default connect(

)(Error)
