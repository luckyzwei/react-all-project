import React, { Component } from 'react'
import './index.css'
import Input from '../../shareComponent/Input'

export default class SearchBox extends Component {

    render() {
        let { groupName, nickName } = this.props
        return (
            <div className="searchBox">
                <div className="row1">
                    <div className='wechatimg'></div>
                    <span>{groupName}</span>
                </div>
                <div className="row2">
                    <Input
                        label={'用户昵称：'}
                        value={nickName}
                        paramsname={'nickName'}
                        placeholder={'请输入'}
                        iptChangeParams={this.props.iptChangeParams}
                    />
                    <div className="searchBtn" onClick={this.props.confirmSearch}>搜索</div>
                </div>
                {/* <div className="backGI" onClick={() => this.props.actions.goTo('/v2/GIScope')}>返回</div> */}
            </div>
        )
    }
}