import React, { Component } from 'react'

export default class ImgModal extends Component {
  constructor(props){
    super(props)
    this.state = {
        deg: 0
    }
    this.rotateClickHandle = this.rotateClickHandle.bind(this)
  }
  rotateClickHandle () {
    this.setState({
        deg: (this.state.deg+90)%360
    })
  }
  render() {
    let {deg} = this.state;
    let {src,closeClickHandle,canSend,sendHandle} = this.props;
    return (
        <div className='gm-imgModal'>
            <div className='insideBox'>
                <div className='imgBox' style={{transform:'rotate('+deg+'deg)'}}>
                    <img src={src} alt=''/>
                    {canSend&&<div className='sendBtn' onClick={sendHandle}>发送至当前群</div>}
                </div>
                <div className='closeBtn-box' onClick={closeClickHandle}>
                    <input type='button' className='closeBtn'/>
                </div>
            </div>
        </div>
    )
  }
}