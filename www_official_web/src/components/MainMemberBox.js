/**
 * Created by jiayi.hu on 9/14/17.
 */
import React, { Component, PropTypes } from 'react'

export default class MainMemberBox extends Component {
    constructor(){
        super()
        this.state = {
            imgSrc:'blackImgSrc'
        }
    }
    handleImgColor(){
        this.setState({
            imgSrc:'colorImgSrc',
        })
        this.props.actions.stopSlider()
    }
    handleImgBlack(){
        this.setState({
            imgSrc:'blackImgSrc'
        })
        this.props.actions.goSlider()
    }
    render(){
        const {item} = this.props
        const {imgSrc} = this.state
        return(
            <div className="memberBox"
                 onMouseEnter={this.handleImgColor.bind(this)}
                 onMouseLeave={this.handleImgBlack.bind(this)}>
                <div className="innerBox">
                    <em></em>
                    <div className="memberImg"
                         style={{backgroundImage:'url('+item[imgSrc]+')'}}></div>
                    <div className="memberName">{item.name}</div>
                    <div className="memberIntroduce">
                        {
                            item.text.map((val,j)=>(
                                <span>{val}</span>
                            ))
                        }
                    </div>
                </div>
            </div>
        )
    }
}