import React, { Component } from 'react'
import PropTypes from 'prop-types'
import MonitorStatus from './MonitorStatus'
/* global location */
/* eslint no-restricted-globals: ["off", "location"] */
export default class SaasNeedOwn extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired
  }

  componentDidMount(){
    document.title = '未购买 | 栗子云'

  }
  componentWillUnmount() {

  }

  goPrice(){
    location.href = location.origin + '/marketPortal/price?type=1'
  }

  render() {
    const {actions,userInfo,naviMetaData} = this.props
    // console.log(naviMetaData);

    const result = naviMetaData.naviList.reduce((pre,cur) => (
      pre.concat(
        cur.children!=null ? [{code:cur.code,name:cur.name}].concat(
          cur.children.map(v => ({code:v.code,name:v.name}))
        )
        : {code:cur.code,name:cur.name}
      )
    ),[])

    const findedCode = result.find(v => location.search.includes(v.code))
    const desc = findedCode==undefined ? '' : findedCode.name

    return (
      <div style ={{height:'100%'}}>
        <div className='gc-headBox'>
            <MonitorStatus logout = {() => {actions.goTo('/v2/login')}} turnOffws = {actions.turnOffws} userInfo={userInfo}/>
        </div>

        <div className = 'needownWrapper'>
          <div className = 'showBj'>

          </div>
          <div className = 'desc'>
            {`您还未购买「 ${desc} 」功能，现在就去购买体验吧!`}
          </div>
          <div className = 'butt' onClick = {this.goPrice}>
            立即购买
          </div>
        </div>

      </div>
    )
  }
}
