import React, { Component, PropTypes } from 'react'
import { Link, browserHistory } from 'react-router'
// import {BASENAME} from '../constants/ConstantData'
import $ from 'jquery'

const ErrorStyle = {
  margin: '80px auto',
  width:'500px',
  height:'400px',
  background:'transparent',
  fontSize:'36px',
  textAlign:'center',
}
export default class ErrorScope extends Component {

  componentDidMount(){

  }
  render(){
        // alert(JSON.stringify(this.props))
    return (
      <div className="login_container" style={{padding: 0,overflowY:'hidden'}}>
            <div style={ErrorStyle}>
              <h3 style={{color:'red'}}>404</h3>
              <h3>这个页面刷不出来啦～</h3>
              <img src="images/cry.png" style={{width:'180px',height:'180px'}}/>
            </div>
      </div>
    )
  }
}
