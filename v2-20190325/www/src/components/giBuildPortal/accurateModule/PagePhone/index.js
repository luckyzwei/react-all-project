/**
 * 创建时间:2018-08-30 14:11:07
 * 作者：sufei  Xerath
 * 邮箱：fei.su@gemii.cc
 * 版本号：1.0
 * @版权所有
 **/
import React, { Component } from 'react'
import './index.css'

import IptLimit from "../../../shareComponent/IptLimit";

import Radio from '../../../shareComponent/Radio';

export default class PagePhone extends Component {
    constructor() {
        super();
        this.state = {}
    }
    setparamsHandle=(k,v)=> {
        const data  = this.props.data
        if(k=='phoneCodeNeed'){
            data.mandatory = v
        }else if(k=='phoneOnlyNeed'){
            data.mandatory = v
        }else if(k=='phoneTextNeed'){
            data.label = v
        }

        this.props.updateItem(data)
    }
    render() {
        let { data ,disabled} = this.props;
        return (
            <div className='PagePhone'>
                <div className="Pagetitle">手机号码：</div>
                <div className="PageContent">
                    <div className='row'>
                        <IptLimit
                            widths={{ width: '316px' }}
                            paramName={'phoneTextNeed'}
                            placeholder={'请输入文字'}
                            label={'显示文字：'}
                            value={data.label}
                            maxLength={10}
                            limitState={false}
                            widthsLa={{ width: '70px', textAlign: "right" }}
                            setparamsHandle={this.setparamsHandle}
                            disabled={disabled}
                        />
                        {/* <div className="statusCheck">
                            <span className={data.mandatory=='1'?"icon-check checked":"icon-check"} style={{cursor:disabled?'not-allowed':''}} onClick={()=>{!disabled&&this.setparamsHandle('phoneOnlyNeed',data.mandatory=='1'?0:1)}}></span>
                            必填
                        </div> */}
                    </div>
                    {/* <div className="row">
                        <div className="phone-content-title">必填：</div>
                        <Radio
                            paramName={'phoneOnlyNeed'}
                            value={data.mandatory}
                            sourceData={[{ name: '是', value: 1 }, { name: '否', value: 0 }]}
                            onChange={this.setparamsHandle}
                            disabled={disabled}
                        />
                    </div> */}
                    <div className="row">
                        <div className="phone-content-title">短信验证：</div>
                        <Radio
                            paramName={'phoneCodeNeed'}
                            value={data.mandatory?parseInt(data.mandatory):0}
                            sourceData={[{ name: '是', value: 1 }, { name: '否', value: 0 }]}
                            onChange={this.setparamsHandle}
                            disabled={disabled}
                        />
                    </div>
                </div>
            </div>
        )
    }
}
