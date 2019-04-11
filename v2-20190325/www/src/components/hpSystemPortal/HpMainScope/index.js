import React, { Component } from 'react'
import HelpCenter from '../helpCenter'
import './index.css'

export default class SaasHPScope extends Component {
  constructor(props){
    super(props)
  }

  componentDidMount(){
    document.title = '帮助中心 | 栗子云'
  }
  componentWillUnmount() {
  }

  render() {
    return (
      <div style ={{height:'100%'}}>
            <div className='hp-headBox'>
                <div className='hp-headBox-bg'>
                  <div className="hp-head-logo"></div>
                  <div className="hp-head-title">
                      <p>你好，感谢使用栗子云</p>
                      <p>我们为你提供丰富、详尽的使用指南</p>
                  </div>
                </div>
                {/* <div className="hp-head-img"></div> */}
            </div>
            <HelpCenter/>
      </div>
    )
  }
}
