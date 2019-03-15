import React, { Component } from 'react'
import './index.css'
import Input from "../../shareComponent/Input";
import SelectBox from "../../shareComponent/SelectBox";

export default class GtSeacrhBox extends Component {
    constructor() {
        super();
        this.state = {}
    }
    render() {
        const {getTemplate} = this.props
        return (
            <div className='GtheaderSearch'>
                <div className="TmheaderSearch-line">
                    <div className="row">
                        <Input
                            label={'页面名称：'}
                            styles={{ width: "300px" }}
                            // value={searchParams.title}
                            placeholder={'请输入'}
                            disabled={false}
                            paramsname={'name'}
                            iptChangeParams={this.props.handleSearchParams}
                        />
                    </div>
                    <div className="row">
                        <SelectBox
                            selectLabel={"建群类型："}
                            placeholder={"请选择"}
                            width={200}
                            selectOption={['精准入群', '快速入群']}
                            paramName={'type'}
                            paramaValue={[5, 4]}
                            // paramDefault={searchParams.status}
                            setparamsHandle={this.props.handleSearchParams}
                        />
                    </div>
                    <div className="row searchRow-line1">
                        <button className='TmheaderSearch-btn' onClick={()=>getTemplate(false)}>搜索</button>
                    </div>
                </div>
            </div>
        )
    }
}
