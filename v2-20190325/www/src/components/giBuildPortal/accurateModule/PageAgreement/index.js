/**
 * 创建时间:2018-08-30 17:01:24
 * 作者：sufei  Xerath
 * 邮箱：fei.su@gemii.cc
 * 版本号：1.0
 * @版权所有
 **/
import React, { Component } from 'react'
import './index.css'
import IptLimit from "../../../shareComponent/IptLimit";
import TextareaBox from "../../../shareComponent/TextareaBox";
export default class PageAgreement extends Component {
    constructor(props){
        super(props)
    }
    setparamsHandle = (k,v)=>{
        let data = this.props.data
        if(k=='agreementName'){
            data.label = v
        }else{
            data.defaultValue = v
        }
        this.props.updateItem(data)
    }
    render(){
        let { data,updateItem ,disabled} = this.props;
        // console.log(data,'******')
        return (
            <div className='PageAgreement'>
                <div className="Pagetitle">协议条款：</div>
                <div className="PageContent">
                    <div className='row'>
                        <IptLimit
                            widths={{ width: '316px' }}
                            paramName={'agreementName'}
                            placeholder={'请输入文字'}
                            label={'显示文字：'}
                            value={data.label}
                            maxLength={20}
                            limitState={false}
                            widthsLa={{ width: '70px', textAlign: "right" }}
                            setparamsHandle={this.setparamsHandle}
                            disabled={disabled}
                        />
                    </div>
                    <div className='row'>
                        <TextareaBox
                            widths={{ width: '416px', height: "207px" }}
                            widthss={{ width: '416px', height: "175px" }}
                            paramName={'agreementDescription'}
                            placeholder={'请输入文字'}
                            label={'条款明细：'}
                            value={data.defaultValue?data.defaultValue:''}
                            maxLength={2000}
                            widthsLa={{ width: '70px', textAlign: "right" }}
                            setparamsHandle={this.setparamsHandle}
                            disabled={disabled}
                        />
                    </div>
                </div>
            </div>
        )
    }
}