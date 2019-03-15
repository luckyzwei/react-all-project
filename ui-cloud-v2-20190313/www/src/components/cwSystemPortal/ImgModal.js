import React, { Component, PropTypes } from 'react'

export default class ImgModal extends Component {
  constructor(props){
    super(props)
    this.state = {
        deg: 0
    }
  }

  render() {
    let {deg} = this.state;
    let {src,closeClickHandle} = this.props;
    return (
        <div className='gm-imgModal' onClick={closeClickHandle}>
            <div className='insideBox'>
            <div className='imgBox' >
                <img src={src} alt='' className="imgModal"/>
            </div>

                <div className='closeBtn-box'>
                    <input type='button' className='closeBtn' onClick={closeClickHandle}/>
                </div>
            </div>
        </div>
    )
  }
}