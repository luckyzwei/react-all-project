
import React, { Component } from 'react'
import './index.css'
import Input from "../../shareComponent/Input";
import SelectBox from "../../shareComponent/SelectBox";
import RangePicker from '../../shareComponent/RangePicker'

export default class TmheaderSearch extends Component {
    constructor() {
        super();
        this.state = {}
    }
    render() {
        let { } = this.state;
        let { searchParams, userArray } = this.props;
        let userAyy = [];//创建人name
        let userAy = [];//创建人id
        for (let i = 0; i < userArray.length; i++) {
            userAyy.push(userArray[i].name);
            userAy.push(userArray[i].id);
        }
        return (
            <div className='TmheaderSearch'>
                <div className="TmheaderSearch-line">
                    <div className="row">
                        <Input
                            label={'投放标题：'}
                            styles={{ width: "244px" }}
                            value={searchParams.title}
                            placeholder={'请输入标题'}
                            disabled={false}
                            paramsname={'mtTitle'}
                            iptChangeParams={this.props.handleSearchParams}
                        />
                    </div>
                    <div className="row">
                        <SelectBox
                            selectLabel={"投放状态："}
                            placeholder={"请选择"}
                            width={244}
                            selectOption={['未发送', '已发送', '草稿']}
                            paramName={'moduleState'}
                            paramaValue={[6, 2, 0]}
                            paramDefault={searchParams.status}
                            setparamsHandle={this.props.handleSearchParams}
                        />
                    </div>
                    <div className="row">
                        <span className="title">投放时间：</span>
                        <RangePicker
                            paramName={'tmTime'}
                            styles={{ width: "244px", height: '36px', lineHeight: '36px' }}
                            setDateParams={(e) => {
                                this.props.handleSearchParams('tmTime', e)
                            }}
                        />
                    </div>
                    <div className="row searchRow-line1">
                        <button className='TmheaderSearch-btn' onClick={this.props.comfirmParams}>搜索</button>
                    </div>
                </div>
                <div className="TmheaderSearch-line">
                    <div className="row">
                        <SelectBox
                            selectLabel={"创建人："}
                            placeholder={"请选择"}
                            width={244}
                            selectOption={userAyy}
                            paramName={'manState'}
                            paramaValue={userAy}
                            paramDefault={searchParams.man}
                            setparamsHandle={this.props.handleSearchParams}
                        />
                    </div>
                    <div className="row searchRow-line2">
                        <button className='TmheaderSearch-btn' onClick={this.props.comfirmParams}>搜索</button>
                    </div>
                </div>
            </div>
        )
    }
}
