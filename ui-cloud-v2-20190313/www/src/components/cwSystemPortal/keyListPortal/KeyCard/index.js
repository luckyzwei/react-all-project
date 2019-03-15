import React, {Component} from 'react'
import './index.css'
import {formatYear, sendEvent, formatDate} from "../../../../funStore/CommonFun";
import {onOffRule} from "../../../../funStore/FetchApi";
import {tongji} from "../../../../funStore/tongji";
import Table from 'antd/lib/table'
import 'antd/lib/table/style/css'
import Tableloading from '../../../shareComponent/TableLoading'

export default class KeyCard extends Component {
    constructor() {
        super();
        this.state = {}
        this.onOffKeyRule = this.onOffKeyRule.bind(this);
    }

    onOffKeyRule(id, status) {
        status == 1 ?tongji('Lzc_GuanJianCi_QiYong'):tongji('Lzc_GuanJianCi_JinYong')
        let parmas = {
            id, status
        }
        onOffRule(parmas).then(res => {
            res = JSON.parse(res);
            if (res.resultCode === '100') {
                sendEvent('message', {txt: status == 1 ? '启用关键词成功' : '禁用关键词成功', code: 1000});
                sendEvent('updatekeywordlist');
            } else {
                sendEvent('message', {txt: status == 1 ? '启用关键词失败' : '禁用关键词失败', code: 1004})
            }
        }).catch(res => {
            sendEvent('message', {txt: '网络异常，请稍后尝试', code: 1004})
        })
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    render() {
        let {} = this.state;
        let {changeView, paramsData, keyListData, load} = this.props;
        const columns = [{
            title: '关键词标题',
            dataIndex: 'title',
            key: 'title',
            render: (text, record) => (
                <span className="kw-title">
                {
                    record.status === 2?
                    <span className="kw-title-status">停用</span>
                    :null
                }
                {record.title}
                </span>
              )
          },{
            title: '最新触发时间',
            dataIndex: 'createDate',
            key: 'createDate',
            render: (text, record) => (
                <span className="time">{record.createDate.replace('T', ' ')}</span>
              )
          }, {
            title: '触发次数',
            dataIndex: 'dayCount',
            key: 'dayCount',
            render: (text, record) => (
                <span>{record.dayCount}</span>
              )
          }, {
            title: '触发条件',
            dataIndex: 'matchType',
            key: 'matchType',
            render: (text, record) => (
                <p className="act-odds">{record.matchType ? "精准匹配" : "模糊匹配"}</p>
              )
          }, {
            title: '触发动作',
            dataIndex: 'typeMap',
            key: 'typeMap',
            render: (text, record) => (
                <div>
                    <span className="act-action-resp">{record.typeMap && record.typeMap.response == 1 ? '全部回复' : '随机回复'}</span>
                    <span className={record.typeMap.remove == 0?'':"act-action"}>{record.typeMap.remove == 0?'':'踢人'}</span>
                </div>
              )
          }, {
            title: '操作',
            dataIndex: 'ruleId',
            key: 'action',
            render: (text, record) => (
                <div className="operate">
                    <span className="viewBtn" onClick={()=>{changeView('KEYDETAILLIST', record.ruleId)}}>详情</span>
                    <span className="line"></span>
                    <div className="downBtn">···
                        <div className="update">
                            {
                                record.status === 2
                                    ?
                                    <p
                                        onClick={this.onOffKeyRule.bind(this, record.ruleId, 1)}>
                                        启用
                                    </p>
                                    :
                                    <p
                                        onClick={this.onOffKeyRule.bind(this, record.ruleId, 2)}>
                                        禁用
                                    </p>
                            }
                            <p onClick={() => {
                                changeView('KEYADD', record.ruleId)
                            }}>编辑</p>
                        </div>
                    </div>
                    
                </div>
            )
          }]
        return (
            <div className='KeyCard'>
                <Table 
                rowKey={record => record.id} 
                columns={columns} 
                dataSource={keyListData} 
                pagination={false}
                loading={{
                    spinning: load,
                    indicator: <Tableloading/>,
                    tip: '数据加载中...'
                }}
                />
            </div>
        )
    }
}
