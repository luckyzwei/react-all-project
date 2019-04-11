/**
 * 创建时间:2018-08-30 10:32:46
 * 作者：sufei  Xerath
 * 邮箱：fei.su@gemii.cc
 * 版本号：1.0
 * @版权所有
 **/
import React, { Component } from 'react'
import './index.css'

import IptLimit from "../../../shareComponent/IptLimit";
import IptNum from "../../../shareComponent/IptNum";
import ColorPicker from "../../../shareComponent/RcolorPicker";

export default class PageButton extends Component {
    constructor() {
        super();
        this.state = {
            colorState: false,
            block: false
        }
        this.selectColor = this.selectColor.bind(this);
    }
    selectColor() {
        const {disabled}= this.props
        if(disabled) return
        this.setState({
            colorState: true
        })
    }
    hideColor=() =>{
        if(this.state.block) return
        this.setState({
            colorState: false
        })
    }
    mouseEnter = () => {
        this.setState({
            block: true
        })
    }
    mouseLeave = () =>{
        this.setState({
            block: false
        })
    }
    setparamsHandle=(k,v)=>{
        let data = this.props.data
        let css = eval('('+data.css+')')
        if(k=='pageButtonTxt'){
            // 设置按钮文字
            data.label = v
        }else if(k=='pageButtonSize'){
            // 设置按钮文字大小
            css.fontSize = v+'px'
            data.css = JSON.stringify(css)
        }else{
            // 设置按钮文字颜色
            css.backgroundColor = v.hex
            data.css = JSON.stringify(css)
        }
        this.props.updateItem(data)
    }
    render() {
        let { colorState } = this.state;
        let { data,disabled } = this.props
        let css = eval('('+data.css+')')
        return (
            <div className='PageButton'>
                <div className="Pagetitle">提交按钮：</div>
                <div className="PageContent">
                    <div className='row'>
                        <IptLimit
                            widths={{ width: '316px' }}
                            paramName={'pageButtonTxt'}
                            placeholder={'请输入文字'}
                            label={'显示文字：'}
                            maxLength={10}
                            value={data.label}
                            limitState={false}
                            widthsLa={{ width: '70px', textAlign: "right" }}
                            setparamsHandle={this.setparamsHandle}
                            disabled={disabled}
                        />
                    </div>
                    <div className="row">
                        <IptNum
                            widths={{ width: '316px' }}
                            paramName={'pageButtonSize'}
                            label={'字体大小：'}
                            limitState={false}
                            minNum={12}
                            value={isNaN(parseInt(css.fontSize))?'':parseInt(css.fontSize)}
                            widthsLa={{ width: '70px', textAlign: "right" }}
                            setparamsHandle={this.setparamsHandle}
                            disabled={disabled}
                        />
                    </div>
                    <div className="row" tabIndex='1' onFocus={this.selectColor} onBlur={this.hideColor} onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave}>
                        <div className="color-title"></div>
                        <div className='color-content'>
                            <span className='color-icon'></span>
                            按钮颜色
                        </div>
                        {
                            colorState ? <ColorPicker
                                widths={{ top: '-300px', left: "160px" }}
                                handleColor={this.setparamsHandle}
                                paramName={'pageButttonColor'}
                                pageTitleColor={css.backgroundColor}
                            /> : ''
                        }
                    </div>
                </div>
            </div>
        )
    }
}
