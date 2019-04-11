import React, { Component } from 'react'
import './index.css'

import MtheaderSearch from '../MtheaderSearch';
import MtTable from '../MtTable';
import {tongji} from '../../../funStore/tongji'

export default class MmUnEmptyList extends Component {
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
                <div className="MmUnEmptyList-content">
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
