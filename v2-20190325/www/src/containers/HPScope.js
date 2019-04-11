import React from 'react'
import { connect } from 'react-redux'
import SaasHPScope from '../components/hpSystemPortal/HpMainScope'

const HPScope = () => (
  <div style = {{height:'100%',width:'100%'}}>
    <SaasHPScope/>
  </div>
)
export default connect()(HPScope)
