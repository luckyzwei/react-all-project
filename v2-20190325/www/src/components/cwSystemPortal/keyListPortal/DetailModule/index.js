/**
 * 创建时间:2018-10-08 10:36:16
 * 作者：sufei  Xerath
 * 邮箱：fei.su@gemii.cc
 * 版本号：1.0
 * @版权所有
 **/
import React, {Component} from 'react'
import './index.css'
import {seeKeywordRecord} from "../../../../funStore/FetchApi";
import {sendEvent} from "../../../../funStore/CommonFun";
import { tongji } from '../../../../funStore/tongji';

export default class DetailModule extends Component {
    constructor() {
        super();
        this.state = {
            recordList: [],
            recordListArr: [],
            iptText: ''
        }
        this.changeIpt = this.changeIpt.bind(this)
        this.confirmSearch = this.confirmSearch.bind(this)
    }

    changeIpt(e) {
        this.setState({
            iptText: e.target.value
        })
    }

    confirmSearch() {
        let {recordListArr, iptText} = this.state;
        let listData = [];
        for (let i = 0; i < recordListArr.length; i++) {
            if (recordListArr[i].content.indexOf(iptText) > -1) {
                listData.push(recordListArr[i])
            }
        }
        this.setState({
            recordList: listData
        })
    }

    componentDidMount() {
        let {recordId, keywordName} = this.props;
        let params = {
            id: recordId,
            currentPage: 0,
            pageSize: 150
        };
        seeKeywordRecord(params).then(res => {
            res = JSON.parse(res);
            if (res.resultCode === '100') {
                let lists = res.resultContent.map(item => {
                    item.groupIcon = `${process.env.PUBLIC_URL}/images/group/group${parseInt(Math.random() * 10)}.png`;
                    let oSpan = `<span style="color:rgb(78,152,246)">${keywordName}</span>`;
                    item.content.replace(new RegExp(keywordName, 'gm'), oSpan)
                    return item
                });
                this.setState({
                    recordList: lists,
                    recordListArr: lists
                })
            } else {
                sendEvent('message', {txt: res.detailDescription, code: 1004})
            }
        }).catch(req => {
            console.log(req)
        })
    }

    componentWillUnmount() {
    }

    render() {
        let {recordList} = this.state;
        let {CloseRecord} = this.props;
        return (
            <div className='DetailModule'>
                <div className="DetailModule-content">
                    <div className="DetailModule-content-close" onClick={CloseRecord.bind(this, null)}></div>
                    <div className="DetailModule-content-search">
                        <input type="text" placeholder='输入您要搜索的群聊信息' className='serach' onChange={this.changeIpt}/>
                        <span className='serach-icon' onClick={this.confirmSearch}>
                              <span className='serach-icon-icon'></span>
                          </span>
                    </div>
                    {
                        recordList&&recordList.length>0?
                        <div className="DetailModule-content-text">
                            {
                            recordList.map((item, index) => {
                                return (
                                    <div key={index} className="DetailModule-content-text-item">
                                        <div className="DetailModule-content-text-item-title">
                                            <img src={item.groupIcon} className='DetailModule-content-text-item-img'/>
                                            <span
                                                className='DetailModule-content-text-item-text'>{item.groupName}</span>
                                        </div>
                                        <div className="DetailModule-content-text-item-content">
                                            {item.imMemName}：<span
                                            dangerouslySetInnerHTML={{__html: item.content}}></span>
                                        </div>
                                    </div>
                                )
                            })
                            }
                        </div>
                        :
                        <div className="DetailModule-content-text">    
                            <div className="none"></div>
                            <p className="noneTxt">群内还没有人触发关键词哦~</p>
                        </div>
                    }
                    
                </div>

            </div>
        )
    }
}
