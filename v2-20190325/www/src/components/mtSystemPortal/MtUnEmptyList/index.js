/**
 * 创建时间:2018-09-07 10:57:42
 * 作者：sufei  Xerath
 * 邮箱：fei.su@gemii.cc
 * 版本号：1.0
 * @版权所有
 **/
import React, { Component } from 'react'
import './index.css'

import MtheaderSearch from '../MtheaderSearch';
import MtTable from '../MtTable';
import {tongji} from '../../../funStore/tongji'

export default class TmUnEmptyList extends Component {
    constructor() {
        super();
        this.comfirmParams = this.comfirmParams.bind(this);
    }
    comfirmParams() {
        let { searchParams } = this.props;
        searchParams = { pageSize: 20, currentPage: 0, ...searchParams };
        this.props.getTmUnEmptyList(searchParams);
        tongji('Lzc_QunTouFang_SouSuo')
    }
    render() {
        let { searchParams, mtListData, pageInfo,
            getTmUnEmptyList,
            checkedMTContent, checkedAll, checkAllStatus, selectId, actions, userArray } = this.props;

        return (
            <div className='TmUnEmptyList'>
                <MtheaderSearch
                    searchParams={searchParams}
                    userArray={userArray}
                    handleSearchParams={this.props.handleSearchParams}
                    comfirmParams={this.comfirmParams}
                />
                <div className="TmUnEmptyList-content">
                    <MtTable
                        actions={actions}
                        searchParams={searchParams}
                        mtListData={mtListData}
                        pageInfo={pageInfo}
                        selectId={selectId}
                        checkedAll={checkedAll}
                        checkAllStatus={checkAllStatus}
                        checkedMTContent={checkedMTContent}
                        getTmUnEmptyList={getTmUnEmptyList}
                    />
                </div>
            </div>
        )
    }
}
