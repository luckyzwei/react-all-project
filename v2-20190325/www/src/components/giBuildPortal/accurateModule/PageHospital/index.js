/**
 * 创建时间:2018-08-30 14:58:01
 * 作者：sufei  Xerath
 * 邮箱：fei.su@gemii.cc
 * 版本号：1.0
 * @版权所有
 **/
import React, { Component } from 'react'
import './index.css'

import IptLimit from "../../../shareComponent/IptLimit";

import Radio from '../../../shareComponent/Radio';

import TreeBox from "../../../shareComponent/TreeBox";

export default class PageHospital extends Component {
    constructor() {
        super();
        this.state = {}
    }
    setparamsHandle=(k,v)=> {
        
    }
    render() {
        let { } = this.state;
        let {data } = this.props;
        return (
            <div className='PageHospital'>
                <div className="Pagetitle">医院设置：</div>
                <div className="PageContent">
                    <div className='row'>
                        <IptLimit
                            widths={{ width: '316px' }}
                            paramName={'hospitalName'}
                            placeholder={'请输入文字'}
                            label={'显示文字：'}
                            value={data.label}
                            maxLength={10}
                            limitState={false}
                            widthsLa={{ width: '70px', textAlign: "right" }}
                            setparamsHandle={this.setparamsHandle}
                        />
                        <div className="statusCheck">
                            <span className={data.mandatory=='1'?"icon-check checked":"icon-check"} onClick={()=>{this.setparamsHandle('hospitalOnlyNeed',data.mandatory=='1'?0:1)}}></span>
                            必填
                        </div>
                    </div>
                    {/* <div className="row">
                        <div className="phone-content-title">必填：</div>
                        <Radio
                            paramName={'hospitalOnlyNeed'}
                            value={data.mandatory}
                            sourceData={[{ name: '是', value: '0' }, { name: '否', value: '1' }]}
                            onChange={this.setparamsHandle}
                        />
                    </div> */}
                    <div className="row list">
                        <div className="phone-content-title">医院列表：</div>
                        <TreeBox
                            selectName={'选择医院'}
                            paramName={'hospitalList'}
                            setparamsHandle={this.setparamsHandle}
                            paramValue={data.list}
                        />
                    </div>
                </div>
            </div>
        )
    }
}
