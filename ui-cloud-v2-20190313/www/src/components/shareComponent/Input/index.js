import React, { Component } from 'react'
import './index.css'

export default class Input extends Component {
    constructor() {
        super();
        this.changeIpt = this.changeIpt.bind(this);
    }
    changeIpt(e) {
        this.props.iptChangeParams(this.props.paramsname, e.target.value)
    }
    render() {
        const { label, placeholder, disabled, value, styles } = this.props
        return (
            <div className="public-input">
                <div className="label">{label}</div>
                <input className="input" style={styles} type="text" value={value} placeholder={placeholder} disabled={disabled} onChange={this.changeIpt} />
            </div>
        )
    }
}