
import React, { Component } from 'react'
import './index.css'

import { SketchPicker } from "react-color";

export default class RcolorPicker extends Component {
    constructor() {
        super();
        this.state = {
        }
        this.handleChangeComplete = this.handleChangeComplete.bind(this);
    }
    handleChangeComplete(color) {
        this.props.handleColor(this.props.paramName, color)
    }
    render() {
        let { pageTitleColor, widths } = this.props;
        return (
            <div className='RcolorPicker' style={widths}>
                <SketchPicker
                    color={pageTitleColor}
                    onChangeComplete={this.handleChangeComplete}
                />
            </div>
        )
    }
}
