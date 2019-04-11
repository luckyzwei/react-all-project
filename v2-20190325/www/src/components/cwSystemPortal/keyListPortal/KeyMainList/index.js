/**
 * 创建时间:2018-10-08 15:05:49
 * 作者：sufei  Xerath
 * 邮箱：fei.su@gemii.cc
 * 版本号：1.0
 * @版权所有
 **/
import React, {Component} from 'react'
import './index.css'
import KeyCard from "../KeyCard";
import PageRule from "../../../shareComponent/PageRule";
import {getKeyWordsNum, getKeyWordsList} from "../../../../funStore/FetchApi";
import {sendEvent} from "../../../../funStore/CommonFun";
import ButtonBox from '../../../shareComponent/ButtonBox'
import TipBubble from '../../../shareComponent/TipBubble'
import LoadingAnimationS from '../../../shareComponent/LoadingAnimationS'
import {GUIDE_TEXT} from '../../../../constants/ConstantData'
export default class KeyMainList extends Component {
    constructor() {
        super();
        this.state = {
            load: true,
            pageInfo: {
                "currentPage": 0,
                "totalPage": 1,
                "pageSize": 20,
                "totalRecords": 1
            },
            KeyWordNum: {
                dayCount: 0,
                dayMembers: 0,
                dayRemove: 0,
                weekCount: 0,
                weekMembers: 0
            },
            searchParams: {},
            keyListData: [],
            guideFlag: false
        }
        this.KeyWordsNum = this.KeyWordsNum.bind(this);
        this.KeyWordsList = this.KeyWordsList.bind(this);
    }

    KeyWordsNum() {
        getKeyWordsNum().then(res => {
            res = JSON.parse(res);
            if (res.resultCode === '100') {
                this.setState({
                    KeyWordNum: res.resultContent
                })
            } else {
                sendEvent('message', {txt: "服务器错误", code: 1004})
            }
        }).catch(req => {
            // console.log(req)
        })
    }

    KeyWordsList(params) {
        this.setState({load: true})
        return getKeyWordsList(params).then(res => {
            res = JSON.parse(res);
            if (res.resultCode === '100') {
                this.setState({
                    keyListData: res.resultContent,
                    pageInfo: res.pageInfo,
                    load: false
                })
                return res.resultContent
            } else {
                this.setState({
                    load: false
                })
                sendEvent('message', {txt: '服务器错误', code: 1004, timer: 3000})
            }
        }).catch(req => {
            // console.log(req)
        });
    }

    componentDidMount() {
        let _this = this;
        _this.KeyWordsNum();
        let params = {
            pageSize: 20,
            currentPage: 0
        }
        _this.KeyWordsList(params).then(res => {
            this.setState({
                guideFlag: res&&res.length==0
            })
        })

        window.addEventListener('updatekeywordlist',this.updatekeywordlist)
    }

    componentWillUnmount() {
        window.removeEventListener('updatekeywordlist', this.updatekeywordlist)
    }
    updatekeywordlist = () => {
        let params = {
            pageSize: this.state.pageInfo.pageSize,
            currentPage: this.state.pageInfo.currentPage
        };
        this.KeyWordsList(params)
    }
    render() {
        let {pageInfo, searchParams, KeyWordNum, keyListData, load,guideFlag} = this.state;
        let {changeView} = this.props;
        return (
            load?
            <LoadingAnimationS/>
            :
            <div className='keyListPortal'>
                <div className="keyListPortal-header">
                    <div className="keyListPortal-header-left">
                        <div className="keyListPortal-header-item">
                            <span className='title'>今日触发次数</span>
                            <span className='number'>{Number(KeyWordNum.dayCount).toLocaleString('arab')}</span>
                        </div>
                        <div className="keyListPortal-header-line"></div>
                        <div className="keyListPortal-header-item">
                            <span className='title'>今日触发人数</span>
                            <span className='number'>{Number(KeyWordNum.dayMembers).toLocaleString('arab')}</span>
                        </div>
                        {/* <div className="keyListPortal-header-line"></div>
                        <div className="keyListPortal-header-item">
                            <span className='title' style={{color: '#B5BDC6'}}>今日踢出人数</span>
                            <span className='number' style={{color: '#FF99A5'}}>{Number(KeyWordNum.dayRemove).toLocaleString('arab')}</span>
                            <span className='number' style={{color: '#B5BDC6',fontSize:'18px'}}>功能待开放</span>
                        </div> */}
                    </div>
                    <div className="keyListPortal-header-right">
                        <div className="keyListPortal-header-item">
                            <span className='title'>本周触发次数</span>
                            <span className='number'>{Number(KeyWordNum.weekCount).toLocaleString('arab')}</span>
                        </div>
                        <div className="keyListPortal-header-line"></div>
                        <div className="keyListPortal-header-item">
                            <span className='title'>本周触发人数</span>
                            <span className='number'>{Number(KeyWordNum.weekMembers).toLocaleString('arab')}</span>
                        </div>
                    </div>

                </div>
                {
                    keyListData.length!==0
                    ?
                    <div className='keyListPortal-list-main'>
                        <div className="historyTable">
                            <div className="guideButton">
                                <ButtonBox btnTxt={'新增关键词'} btnStyle={{position:'relative',zIndex:'2'}}
                                    btnFunc={() => {
                                        changeView('KEYADD', null)
                                    }}/>
                                {guideFlag?<div className="wave-square"></div>:''}
                                {guideFlag?<TipBubble tipData ={GUIDE_TEXT.KW_BUILD} styles={{left:'0px',top:'56px'}}/>:''}
                            </div>
                            <KeyCard
                                changeView={changeView}
                                keyListData={keyListData}
                                load={load}
                            />
                        </div>
                    </div>
                    :
                    <div className='keyListPortal-list-main none'>
                        <div className="ht-img"></div>
                        <p>没有找到关键词哦，现在去添加吧～</p>
                        <div className="guideButton">
                            <ButtonBox btnTxt={'新增关键词'} btnStyle={{position:'relative',zIndex:'2'}}
                                btnFunc={() => {
                                    changeView('KEYADD', null)
                                }}/>
                            {guideFlag?<div className="wave-square"></div>:''}
                            {guideFlag?<TipBubble tipData ={GUIDE_TEXT.KW_BUILD} styles={{left:'0px',top:'56px'}}/>:''}
                        </div>
                    </div>
                }
                {
                    keyListData.length!==0
                    ?
                    <div className="KeyListPortal-footer">
                        <PageRule
                            pageInfo={pageInfo}
                            searchParams={searchParams}
                            handlersearchData={this.KeyWordsList}
                        />
                    </div>
                    :''
                }
            </div>
        )
    }
}
