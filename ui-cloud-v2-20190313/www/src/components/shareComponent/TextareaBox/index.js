
import React, { Component } from 'react'
import './index.css'

export default class textareaBox extends Component {
    constructor() {
        super();
        this.state = {
            iptNum: 0
        }
        this.iptChange = this.iptChange.bind(this);
    }
    iptChange(e) {
        this.setState({
            iptNum: e.target.value.length
        });
        this.props.setparamsHandle(this.props.paramName, e.target.value || null);
    }
    componentDidMount() {
        this.setState({
            iptNum: this.props.value.length
        })
    }
    render() {
        let { iptNum } = this.state;
        let { label, widthsLa, widths, placeholder, value, maxLength, widthss ,disabled} = this.props;
        return (
            <div className='textareaBox'>
                <div className="title" style={widthsLa}>{label}</div>
                <div className={disabled?"content disabled":"content"} style={widths}>
                    <textarea maxLength={maxLength} className="textareaBox-ipt" style={widthss} value={value} onChange={this.iptChange} placeholder={placeholder} disabled={disabled}></textarea>
                    <div className="num">{iptNum}/{maxLength}</div>
                </div>
            </div>
        )
    }
}
