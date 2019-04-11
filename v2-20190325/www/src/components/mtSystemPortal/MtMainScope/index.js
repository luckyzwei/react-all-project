/**
 * 创建时间:2018-09-07 10:50:42
 * 作者：sufei  Xerath
 * 邮箱：fei.su@gemii.cc
 * 版本号：1.0
 * @版权所有
 **/
import React, {Component} from 'react'
import './index.css'

import MtEmptyList from '../MtEmptyList'
import MtUnEmptyList from '../MtUnEmptyList'

import {getGroupTaskList, getTenementUser} from '../../../funStore/FetchApi'
import LoadingAnimationS from '../../shareComponent/LoadingAnimationS'
import {sendEvent} from "../../../funStore/CommonFun";

export default class TmMainScope extends Component {
    constructor() {
        super();
        this.state = {
            // isEmptyList: true,
            searchParams: {
                title: '',
                status: null,
                beginTime: null,
                endTime: null,
                userId: null,
                sortOrders: [
                    {
                        sortDir: "DESC",
                        sortName: 'topFlag'
                    }, {
                        sortDir: "DESC",
                        sortName: 'sendingTime'
                    }
                ]
            },
            pageInfo: {
                "currentPage": 0,
                "totalPage": 1,
                "pageSize": 20,
                "totalRecords": 1
            },
            mtListData: [],
            userArray: [],//创建人
            checkAllStatus: false,
            mtStatus: false,
            spaceListData: false
        }
        this.handleSearchParams = this.handleSearchParams.bind(this);//修改参数
        this.getTmUnEmptyList = this.getTmUnEmptyList.bind(this);//获取投放列表
        this.checkedMTContent = this.checkedMTContent.bind(this);
        this.checkedAll = this.checkedAll.bind(this);
    }

    handleSearchParams(parname, parvalue) {
        let {searchParams} = this.state;
        switch (parname) {
            case "mtTitle":
                searchParams.title = parvalue
                break;
            case "moduleState":
                searchParams.status = parvalue
                break;
            case "tmTime":
                searchParams.beginTime = new Date(parvalue[0] + ' 00:00:00').getTime();
                searchParams.endTime = new Date(parvalue[1] + ' 23:59:59').getTime()
                break;
            case "manState":
                searchParams.userId = parvalue
                break;

            default:
                break;
        }
        this.setState({searchParams})
    }

    getTmUnEmptyList(params) {
        getGroupTaskList(params).then(res => {
            this.setState({
                mtStatus: true
            })
            res = JSON.parse(res);
            // console.log(res)
            if (res.resultCode == "100") {
                this.setState({
                    mtListData: res.resultContent,
                    pageInfo: res.pageInfo,
                    spaceListData: !(res.resultContent.length === 0 && !params.title && !params.status && !params.beginTime && !params.userId)
                })
            } else {
                // console.log(res.detailDescription)
            }
        }).catch(req => {
            // console.log(req)
        })
    }

    checkedMTContent(id) {
        let {mtListData, selectId, checkAllStatus} = this.state;
        selectId = selectId || [];
        // console.log(selectId)
        let index = selectId.indexOf(id);
        if (index > -1) {
            selectId.splice(index, 1)
        } else {
            selectId.push(id)
        }
        if (selectId.length == mtListData.length) {
            checkAllStatus = true;
        } else {
            checkAllStatus = false;
        }
        mtListData.find(item => item.id == id).isSelect = !mtListData.find(item => item.id == id).isSelect;
        // console.log(selectId);
        this.setState({
            mtListData,
            checkAllStatus,
            selectId
        })
    }


    checkedAll() {
        let {checkAllStatus, mtListData, selectId} = this.state;
        if (checkAllStatus) {
            checkAllStatus = false;
            selectId = [];
            mtListData = mtListData.map(item => {
                item.isSelect = false;
                return item
            })
        } else {
            checkAllStatus = true;
            selectId = mtListData.map(item => item.id)
            mtListData = mtListData.map(item => {
                item.isSelect = true;
                return item
            })
        }
        // console.log(selectId)
        this.setState({
            checkAllStatus, mtListData, selectId
        })
    }

    componentDidMount() {
        if (window.location.href.indexOf('/v2/CWScope') > -1) {
            this.props.actions.goTo('/v2/CWScope?type=keyword')
        }
        let data = {
            sortOrders: [
                {
                    sortDir: "DESC",
                    sortName: 'topFlag'
                }, {
                    sortDir: "DESC",
                    sortName: 'sendingTime'
                }
            ],
            ...this.state.pageInfo
        }
        this.getTmUnEmptyList(data)
        getTenementUser().then(res => {
            res = JSON.parse(res)
            // console.log(res);
            if (res.resultCode === '100') {
                this.setState({
                    userArray: res.resultContent
                })
            } else {
                // console.log(res.detailDescription)
            }
        }).catch(req => {
            console.log(req)
        })
    }

    render() {
        let {mtListData, pageInfo, searchParams, checkAllStatus, selectId, userArray, mtStatus, spaceListData} = this.state;
        let {actions} = this.props;
        return (

            <div className='TmMainScope'>
                {
                    !mtStatus ?
                        <LoadingAnimationS/>
                        :
                        (spaceListData ?
                            <MtUnEmptyList
                                actions={actions}
                                mtListData={mtListData}
                                pageInfo={pageInfo}
                                searchParams={searchParams}
                                selectId={selectId}
                                checkedAll={this.checkedAll}
                                checkAllStatus={checkAllStatus}
                                checkedMTContent={this.checkedMTContent}
                                handleSearchParams={this.handleSearchParams}
                                getTmUnEmptyList={this.getTmUnEmptyList}
                                userArray={userArray}
                            />
                            : <MtEmptyList
                                actions={actions}
                            />)

                }
            </div>
        )
    }
}
