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
            <div className='MmheaderSearch'>
                <div className="TmheaderSearch-line">
                    <div className="row">
                        <Input
                            label={'标题：'}
                            styles={{ width: "300px" }}
                            value={searchParams.title}
                            placeholder={'请输入'}
                            disabled={false}
                            paramsname={'mtTitle'}
                            iptChangeParams={this.props.handleSearchParams}
                        />
                    </div>
                    <div className="row">
                        <SelectBox
                            selectLabel={"发送类型："}
                            placeholder={"请选择"}
                            width={200}
                            selectOption={['文字', '图片', 'H5链接', '图文', 'H5链接/文字']}
                            paramName={'itemGroup'}
                            paramaValue={['txt', 'pic', 'link', 'picTxt', 'linkTxt']}
                            paramDefault={searchParams.itemGroup}
                            setparamsHandle={this.props.handleSearchParams}
                        />
                    </div>
                    <div className="row">
                        <SelectBox
                            selectLabel={"发送状态："}
                            placeholder={"请选择"}
                            width={200}
                            selectOption={['未发送', '已发送', '发送中']}
                            paramName={'moduleState'}
                            paramaValue={[6,2,1]}
                            paramDefault={searchParams.status}
                            setparamsHandle={this.props.handleSearchParams}
                        />
                    </div>
                    <div className="row">
                        <button className='TmheaderSearch-btn' onClick={this.props.comfirmParams}>搜索</button>
                    </div>
                </div>
            </div>
        )
    }
}
