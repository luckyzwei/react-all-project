
import React, { Component } from 'react'
import '../../giBuildPortal/SaveSuccess/index.css'

export default class SaveSuccess extends Component {
    constructor() {
        super();
        this.state = {
            s: ''
        }
        // this.couuntDown = this.couuntDown.bind(this);
    }
    componentWillUnmount() { }
    render() {
        let { s } = this.state;
        return (
            <div className='SaveSuccess'>
                <div className="SaveSuccess-content">
                    <img src={process.env.PUBLIC_URL+'/images/icon/success.png'} alt='' className="SaveSuccess-content-img" />
                    <div className="SaveSuccess-content-text">保存成功，请前往微信托管页面查看操作进度</div>
                </div>
            </div>
        )
    }
}
