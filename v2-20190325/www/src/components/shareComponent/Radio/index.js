import React, { Component } from 'react'
import Radio from 'antd/lib/radio';
import 'antd/lib/radio/style/css'
import './index.css'

export default class MyRadio extends Component {

    state = {
        value: 0
    }

    onChange = (e) => {
        this.setState({
            value: e.target.value,
        });
        this.props.onChange(this.props.paramName, e.target.value)
    }

    render() {
        const { sourceData, value, disabled,styles,styless } = this.props
        return (
            <Radio.Group onChange={this.onChange} value={value} className='myRadio' style={styles}  disabled={disabled}>
                {
                    sourceData.map((v, i) => <Radio style={styless} key={i} value={v.value} disabled={v.disabled}>{v.name}</Radio>)
                }
            </Radio.Group>
        );
    }
}