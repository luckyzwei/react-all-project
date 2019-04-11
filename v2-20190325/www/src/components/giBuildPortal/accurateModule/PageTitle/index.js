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

export default class PageTitle extends Component {
    constructor() {
        super();
        this.state = {
            colorState: false
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
        if(k=='pageTitleTxt'){
            data.label = v
        }else if(k=='pageTitleSize'){
            // 设置标题文字大小
            css.fontSize = v+'px'
            data.css = JSON.stringify(css)
        }else{
             // 设置标题文字颜色
             css.color = v.hex
             data.css = JSON.stringify(css)
        }
        this.props.updateItem(data)
    }
    render() {
        let { colorState } = this.state;
        let { data,updateItem ,disabled} = this.props;
        let css = eval('('+data.css+')')
        return (
            <div className='PageTitle'>
                <div className="Pagetitle">页面标题：</div>
                <div className="PageContent">
                    <div className='row'>
                        <IptLimit
                            widths={{ width: '316px' }}
                            paramName={'pageTitleTxt'}
                            placeholder={'请输入标题名称'}
                            label={'页面标题：'}
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
                            paramName={'pageTitleSize'}
                            label={'标题大小：'}
                            limitState={false}
                            minNum={12}
                            value={isNaN(parseInt(css.fontSize))?0:parseInt(css.fontSize)}
                            widthsLa={{ width: '70px', textAlign: "right" }}
                            setparamsHandle={this.setparamsHandle}
                            disabled={disabled}
                        />
                    </div>
                    <div className="row" tabIndex={1} onFocus={this.selectColor} onBlur={this.hideColor} onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave}>
                        <div className="color-title"></div>
                        <div className='color-content'>
                            <span className='color-icon'></span>
                            标题颜色
                        </div>
                        {
                            colorState ? <ColorPicker
                                widths={{ top: '-300px', left: "160px" }}
                                handleColor={this.setparamsHandle}
                                paramName={'pageTitleColor'}
                                pageTitleColor={css.color}
                            /> : ''
                        }
                    </div>
                </div>
            </div>
        )
    }
}
