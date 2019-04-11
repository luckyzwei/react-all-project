/**
 * 创建时间:2018-08-31 15:53:00
 * 作者：sufei  Xerath
 * 邮箱：fei.su@gemii.cc
 * 版本号：1.0
 * @版权所有
 **/
import React, { Component } from 'react'
import './index.css'
import IptLimit from "../../../shareComponent/IptLimit";

import Radio from '../../../shareComponent/Radio';

import RangePicker from "../../../shareComponent/RangePicker";
import moment from 'moment';


export default class PageTime extends Component {
    constructor() {
        super();
        this.state = {
            cachTime: [null,null]
        }
        this.setDateParams = this.setDateParams.bind(this);
    }
    setDateParams(e) {
        this.setparamsHandle('timeArray', e)
    }
    setparamsHandle = (k,v) => {
        let data = this.props.data
        if(k=='timeName'){
            data.label = v
        }else if(k=='mandatory'){
            data.mandatory = v
        }else if(k=='timeNeed'){
            data.myTimelimit = v
            if(v==0){
                data.minValue = null
                data.maxValue = null
            }else{
                data.minValue = this.state.cachTime[0]
                data.maxValue = this.state.cachTime[1]
            }
        }else{
            data.minValue = v[0]
            data.maxValue = v[1]
            this.setState({
                cachTime: v
            })
        }
        this.props.updateItem(data)
    }
    render() {
        let { } = this.state;
        let { data,updateItem,disabled } = this.props;
        return (
            <div className='PageTime'>
                <div className="Pagetitle">时间范围：</div>
                <div className="PageContent">
                    <div className='row'>
                        <IptLimit
                            widths={{ width: '316px' }}
                            paramName={'timeName'}
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
                    {/* <div className="row">
                        <div className="phone-content-title">限制时间：</div>
                        <Radio
                            paramName={'timeNeed'}
                            value={data.myTimelimit!==undefined?data.myTimelimit:data.maxValue?1:0}
                            sourceData={[{ name: '是', value: 1}, { name: '否', value: 0 }]}
                            onChange={this.setparamsHandle}
                            disabled={disabled}
                        />
                    </div>
                    {
                        data.myTimelimit||data.maxValue ?
                            <div className="row">
                                <div className="phone-content-title">时间区间：</div>
                                <RangePicker
                                    defaultValue={[moment(data.minValue?data.minValue:new Date()),moment(data.maxValue?data.maxValue:new Date())]}
                                    setDateParams={this.setDateParams}
                                    disabled={disabled}
                                />
                            </div>
                            : ""
                    } */}
                </div>
            </div>
        )
    }
}
