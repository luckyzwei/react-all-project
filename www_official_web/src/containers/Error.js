import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import ErrorScope from '../components/ErrorScope'
import * as TodoActions from '../actions'

const Error = ({paramSave,actions}) => (
  <div style={{height:'100%'}}>
    <ErrorScope />
  </div>
)

export default connect(

)(Error)
