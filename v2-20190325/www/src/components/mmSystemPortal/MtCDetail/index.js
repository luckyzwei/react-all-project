/**
 * 创建时间:2018-09-08 15:56:29
 * 作者：sufei  Xerath
 * 邮箱：fei.su@gemii.cc
 * 版本号：1.0
 * @版权所有
 **/
import React, {Component} from 'react'
import './index.css'

import ButtonBox from '../../shareComponent/ButtonBox';

import {getGroupTask, getExport} from '../../../funStore/FetchApi'
import {formatDate} from '../../../funStore/CommonFun'
import MtPhone from '../../mtBuildPortal/MtPhone';

import Modal from '../../shareComponent/Modal'

import AuthProvider from '../../../funStore/AuthProvider'
import promiseXHR from '../../../funStore/ServerFun';
import {API_PATH} from '../../../constants/OriginName'
import {tongji} from '../../../funStore/tongji'

export default class MtCDetail extends Component {
    constructor() {
        super();
        this.state = {
            list: [],
            lists: [],
            successList: [],
            failList: [],
            otherList: [],
            paramsValue: [],
            paramsData: {},
            sendRecords: [],
            changeValue: 0
        }
        this.downloadDetail = this.downloadDetail.bind(this)
        this.changeNav = this.changeNav.bind(this)
    }

    downloadDetail() {
        let {paramsData} = this.state;
        let id = paramsData.id
        tongji('Lzc_QunTouFang_DaoChuJieGuo')
        getExport(id).then(res => {
            res = JSON.parse(res);
            if (res.resultCode === "100") {
                // console.log('下载成功')
                window.location = res.resultContent;
            } else {
                // console.log(res.detailDescription)
            }
            this.props.viewDetail()
        }).catch(req => {
            console.log(req)
        })
    }

    changeNav(e) {
        let {lists} = this.state;
        let list = []
        this.setState({
            changeValue: parseInt(e.target.getAttribute('value'))
        })
        if (parseInt(e.target.getAttribute('value')) === 2) {
            for (let i = 0; i < lists.length; i++) {
                if (lists[i].status == 2) {
                    list.push(lists[i])
                }
            }
        }
        if (parseInt(e.target.getAttribute('value')) === 0) {
            list = [...lists];
        }
        if (parseInt(e.target.getAttribute('value')) === 5) {
            for (let i = 0; i < lists.length; i++) {
                if (lists[i].status == 5) {
                    list.push(lists[i])
                }
            }
        }
        if (parseInt(e.target.getAttribute('value')) === 1) {
            for (let i = 0; i < lists.length; i++) {
                if (lists[i].status != 2 && lists[i].status != 5) {
                    list.push(lists[i])
                }
            }
        }
        this.setState({
            list
        })

    }

    componentDidMount() {
        let data = {
            force: true,
            id: this.props.detailId
        }
        getGroupTask(data).then(res => {
            res = JSON.parse(res);
            if (res.resultCode === '100') {
                // console.log(res)
                res.resultContent.sendingTime = formatDate(res.resultContent.sendingTime);
                let wexx = res.resultContent.items.find(item => item.type == 2);
                this.setState({
                    paramsValue: res.resultContent.items,
                    paramsData: res.resultContent,
                    list: res.resultContent.excBatchInfos[0].excBatchDetail,
                    lists: res.resultContent.excBatchInfos[0].excBatchDetail,
                    successList: res.resultContent.excBatchInfos[0].excBatchDetail.filter((item) => item.status==2),
                    failList: res.resultContent.excBatchInfos[0].excBatchDetail.filter((item) => item.status==5),
                    otherList: res.resultContent.excBatchInfos[0].excBatchDetail.filter((item) => item.status!==5&&item.status!==2)
                }, () => {
                    if (wexx) {
                        // console.log(wexx);
                        const _url = API_PATH + '/taskadminapi/authsec/resolve/base64?fileId=' + wexx.files.find(item => item.fileType === 'text').fileId;
                        AuthProvider.getAccessToken().then(token => {
                            return promiseXHR(_url, {type: 'bearer', value: token}, {}, "GET");
                        }).then(result => {
                            result = JSON.parse(result);
                            let parser = new DOMParser()
                            let xmlDoc = parser.parseFromString(result.resultContent, "text/xml")
                            let logoSrc = xmlDoc ? xmlDoc.querySelectorAll('weappiconurl') : []
                            let logoSrcs = logoSrc[0] ? logoSrc[0].innerHTML.replace('<![CDATA[', '').replace(']]>', '') : ''
                            let logoTitle = xmlDoc ? xmlDoc.querySelectorAll('sourcedisplayname') : []
                            let logoTitles = logoTitle[0] ? logoTitle[0].innerHTML.replace('<![CDATA[', '').replace(']]>', '') : ''
                            let title = xmlDoc ? xmlDoc.querySelectorAll('appmsg>title') : []
                            let titles = title[0] ? title[0].innerHTML : '预览小程序标题'
                            wexx.wexx = logoTitles;

                            wexx.logSrc = logoSrcs;
                            for (let i = 0; i < res.resultContent.items.length; i++) {
                                if (res.resultContent.items[i].type == 2) {
                                    res.resultContent.items[i] = wexx;
                                }
                            }
                            this.setState({
                                confirmData: res.resultContent,
                                paramsValue: res.resultContent.items
                            })
                        }).catch(req => {
                            console.log(req);
                        })

                    }
                })
            } else {
                // console.log(res.detailDescription)
            }
        }).catch(req => {
            console.log(req)
        })
    }

    render() {
        let {list, successList, failList, otherList, paramsValue, paramsData, sendRecords, changeValue} = this.state;
        let {viewDetail, detailId} = this.props;
        // console.log(list)
        return (
            <div className='MtCDetail'>
                <div className="MtCDetail-content">
                    <div className="MtCDetail-content-close" onClick={viewDetail}></div>
                    <div className="MtCDetail-content-header">
                        {paramsData.title}
                    </div>
                    <div className="MtCDetail-content-box">
                        <div className="MtCDetail-content-box-left">
                            <MtPhone
                                paramsValue={paramsValue}
                            />
                        </div>
                        <div className="MtCDetail-content-box-right">
                            <div className="MtCDetail-content-box-right-time">
                                投放时间：{paramsData.sendingTime ? paramsData.sendingTime[0] + "  " + paramsData.sendingTime[1] : ''}
                            </div>
                            <div className="MtCDetail-content-box-right-nav" onClick={this.changeNav}>
                                <span
                                    className={changeValue === 0 ? "MtCDetail-content-box-right-nav-item active" : "MtCDetail-content-box-right-nav-item"}
                                    value='0'>全部({list.length})</span>
                                <span
                                    className={changeValue === 2 ? "MtCDetail-content-box-right-nav-item active" : "MtCDetail-content-box-right-nav-item"}
                                    value='2'>成功({successList.length})</span>
                                <span
                                    className={changeValue === 5 ? "MtCDetail-content-box-right-nav-item active" : "MtCDetail-content-box-right-nav-item"}
                                    value='5'>失败({failList.length})</span>
                                <span
                                    className={changeValue === 1 ? "MtCDetail-content-box-right-nav-item active" : "MtCDetail-content-box-right-nav-item"}
                                    value='1'>未发送({otherList.length})</span>
                            </div>
                            <div className="MtCDetail-content-box-right-list">
                                <div className="list-head">
                                    <span>投放的群</span>
                                    <span>链接点击数</span>
                                    <span>状态</span>
                                </div>
                                <div className="list-body">
                                {
                                    list.map((item, index) => {
                                        return (
                                            <aside className="list-item" key={index}>
                                                <span className="list-item-num">{item.groupName}</span>
                                                <span className="list-item-name">{item.allClickNum?item.allClickNum:'-'}</span>
                                                {
                                                    item.status != 2 && item.status != 5 ? <span
                                                        className="list-item-status list-item-status-un">未发送</span> : ''
                                                }
                                                {
                                                    item.status == 2 ? <span
                                                        className="list-item-status list-item-status-an">已发送</span> : ''
                                                }
                                                {
                                                    item.status == 5 ?
                                                        <span className="list-item-status list-item-status-er">
                                                        失败
                                                        <span className='er-module-box'>
                                                            <span className="er-module" ref="ermodule">
                                                                失败原因：
                                                                <span className="er-module-txt">{
                                                                    item.sendRecords.map(items => {
                                                                        return items.resultCode === 0?'':<span style={{dispaly: "block"}}>{items.resultDetail}</span>
                                                                    })
                                                                }</span>
                                                                <span className="er-module-triangle"></span>
                                                            </span>
                                                        </span>

                                                    </span>
                                                        : ''
                                                }
                                            </aside>
                                        )
                                    })
                                }
                                </div>
                            </div>
                            <div className="MtCDetail-content-box-right-btn">
                                {/* <ButtonBox
                                    btnTxt={'重新投放'}
                                    styleName={'white'}
                                    // btnFunc={this.downloadDetail}
                                /> */}
                                <ButtonBox
                                    btnTxt={'导出结果'}
                                    isCancel={false}
                                    btnFunc={this.downloadDetail}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
