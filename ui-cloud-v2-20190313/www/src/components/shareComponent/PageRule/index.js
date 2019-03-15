import React, { Component } from 'react'
import { LocaleProvider } from 'antd'
import Pagination from 'antd/lib/pagination'
import zhCN from 'antd/lib/locale-provider/zh_CN'
import 'antd/lib/pagination/style/css'
import './index.css'

export default class PageRule extends Component {
    onChange = (page, pageSize) => {
        // console.log(page)
        let { searchParams } = this.props;
        searchParams = {
            pageSize: pageSize,
            currentPage: page - 1,
            ...searchParams
        }
        this.props.handlersearchData(searchParams)
    }
    onShowSizeChange = (current, pageSize) => {
        // console.log(current, pageSize);
        let { searchParams } = this.props;
        searchParams = {
            pageSize: pageSize,
            currentPage: current - 1,
            ...searchParams
        }
        this.props.handlersearchData(searchParams)
    }
    render() {
        let { pageInfo } = this.props;
        return (
            <LocaleProvider locale={zhCN}>
                <Pagination
                    showSizeChanger
                    defaultPageSize={pageInfo.pageSize}
                    pageSizeOptions={['20', '50', '100']}
                    onChange={this.onChange}
                    onShowSizeChange={this.onShowSizeChange}
                    current={pageInfo.currentPage+1}
                    total={pageInfo.totalRecords}
                />
            </LocaleProvider>
        )
    }
}
