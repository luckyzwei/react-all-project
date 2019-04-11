/**
 * 创建时间:2018-08-31 16:16:59
 * 作者：sufei  Xerath
 * 邮箱：fei.su@gemii.cc
 * 版本号：1.0
 * @版权所有
 **/
import React, { Component } from 'react'
import './index.css'
import IptLimit from "../../../shareComponent/IptLimit";

import Radio from '../../../shareComponent/Radio';
export default class PageSelfIpt extends Component {
    constructor() {
        super();
        this.state = {}
    }
    setparamsHandle = (k,v) => {
        const data = this.props.data
        if(k=='selfIptName'){
            data.label = v
        }else if(k=='mandatory'){
            data.mandatory = v
        }
        this.props.updateItem(data)
    }
    render() {
        let { } = this.state;
        let { data,updateItem ,disabled} = this.props;
        return (
            <div className='PageSelfIpt'>
                <div className="Pagetitle">自定义输入框：</div>
                <div className="PageContent">
                    <div className='row'>
                        <IptLimit
                            widths={{ width: '316px' }}
                            paramName={'selfIptName'}
                            placeholder={'请输入文字'}
                            label={'显示文字：'}
                            value={data.label}
                            maxLength={10}
                            limitState={false}
                            widthsLa={{ width: '70px', textAlign: "right" }}
                            setparamsHandle={this.setparamsHandle}
                            disabled={disabled}
                        />
                        <div className="statusCheck">
                            <span className={data.mandatory=='1'?"icon-check checked":"icon-check"} style={{cursor:disabled?'not-allowed':''}} onClick={()=>{!disabled&&this.setparamsHandle('mandatory',data.mandatory=='1'?0:1)}}></span>
                            必填
                        </div>
                    </div>
                    {/* <div className="row">
                        <div className="phone-content-title">必填：</div>
                        <Radio
                            paramName={'mandatory'}
                            value={data.mandatory}
                            sourceData={[{ name: '是', value: 1 }, { name: '否', value: 0 }]}
                            onChange={this.setparamsHandle}
                            disabled={disabled}
                        />
                    </div> */}
                </div>
            </div>
        )
    }
}
