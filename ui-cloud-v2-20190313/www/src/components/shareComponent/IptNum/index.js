
import React, { Component } from 'react'
import './index.css'

export default class IptNum extends Component {
    constructor() {
        super();
        this.state = {
            num: ''
        }
        this.iptChange = this.iptChange.bind(this);
        this.numUp = this.numUp.bind(this);
        this.numDown = this.numDown.bind(this);
    }
    iptChange(e) {
        if (!isNaN(Number(e.target.value))) {
            this.setState({
                num: e.target.value
            })
            this.props.setparamsHandle(this.props.paramName, Number(e.target.value))
        }
    }
    numUp() {
        if (this.state.num > (this.props.minNum || 0)) {
            this.setState({
                num: --this.state.num || ''
            }, () => {
                this.props.setparamsHandle(this.props.paramName, this.state.num)
            })
        }
    }
    numDown() {
        this.setState({
            num: ++this.state.num
        }, () => {
            this.props.setparamsHandle(this.props.paramName, this.state.num)
        })
    }
    componentWillMount() {
        this.setState({
            num: this.props.value
        })

    }
    render() {
        let { num } = this.state;
        let { widths, placeholder, label, widthsLa, limitState, value ,disabled} = this.props
        return (
            <div className='IptNum'>
                <div className="title" style={widthsLa}>
                    {
                        limitState ? <span className="resTxt">*</span> : ''
                    }
                    {label}
                </div>
                <div className={disabled?"content disabled":"content"} style={widths}>
                    <input className="input" type="text" maxLength='10' value={num} placeholder={placeholder} onChange={this.iptChange} disabled={disabled}/>
                    <div className="handle">
                        <span className="handleUp" onClick={this.numDown}></span>
                        <span className="handleDown" onClick={this.numUp}></span>
                    </div>
                </div>
            </div>

        )
    }
}
