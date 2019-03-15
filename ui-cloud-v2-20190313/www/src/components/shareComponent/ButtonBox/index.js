/**
 * 创建时间:2018-08-23 14:53:39
 * 作者：sufei  Xerath
 * 版本号：1.0
 **/
import React, {Component} from 'react'
import './index.css'

export default class ButtonBox extends Component {
    constructor() {
        super();
        this.btnFunction = this.btnFunction.bind(this);
    }
    btnFunction(e){
        this.props.btnFunc(e);
    }
    render() {
        let {btnTxt, isCancel,btnStyle,isDelete, styleName} = this.props;
        return (
            <div
                className={styleName ? `ButtonBox ${styleName}`: isCancel ? 'ButtonBox cancel' : isDelete?'ButtonBox delete':'ButtonBox confirm'}
                onClick={this.btnFunction}
                style={btnStyle}
            >
                {btnTxt}
            </div>
        )
    }
}

/**
 * <ButtonBox
 * btnTxt={cancelTxt} //按钮文本
 * btnStyle={{}} //按钮样式 默认108*36
 * isCancel={true} //是否是取消类型的按钮 true是 false不是
 * btnFunc={this.closeModal} //按钮触发函数
 * isDelete={true} //是否删除按钮
 * />
 */