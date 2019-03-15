import React,{Component} from 'react'
import Table from 'antd/lib/table'
import 'antd/lib/table/style/css'
import './index.css'
import Tableloading from '../../shareComponent/TableLoading'
const statusMap = {
    '0':'未启动',
    '1':'建群中',
    '2':'成功',
    '4':'异常'
}

const typeMap = {
    '1':'新增托管',
    '2':'取消托管',
    '3':'手动建群',
    '4':'精准入群',
    '5':'快速入群',
    '6':'批量建群'
}

const statusClassMap = {
    '0':'status normal',
    '1':'status running',
    '2':'status success',
    '4':'status error'
}

export default class TableArea extends Component {
    constructor(props){
        super(props)
        this.state = {}
    }
    handleTableChange = (pagination, filters, sorter) => {
        if(sorter.order=='ascend'){
            // console.log('升序')
        }else{
            // console.log('降序')
        }
      }
    render(){
        const {dataSource,editHandle,downloadHandle,pageInfo,loading} = this.props
        const columns = [{
            title: '序号',
            dataIndex: 'sequence',
            key: 'sequence',
            render: (text, record) => (
                <span className="sequence">{pageInfo.currentPage*pageInfo.pageSize+1+record.ordersqu}</span>
              )
          },{
            title: '建群时间',
            dataIndex: 'createDate',
            key: 'createDate',
            // sorter: true,
            render: (text, record) => (
                <span className="time">{record.createDate?record.createDate.replace('T',' '):'-'}</span>
              )
          }, {
            title: '页面名称',
            dataIndex: 'name',
            key: 'name',
            // sorter: true,
            render: (text, record) => (
                <span className="time">{record.name}</span>
              )
          }, {
            title: '建群类型',
            dataIndex: 'type',
            key: 'type',
            render: (text, record) => (
                <span>{typeMap[record.type]}</span>
              )
          },  {
            title: '建群状态',
            dataIndex: 'status',
            key: 'status',
            render: (text, record) => (
                <span className={statusClassMap[record.status]}>
                    <span className="circle"></span>
                    {statusMap[record.status]}
                    {/* {
                        record.status==4
                        ?<span className="describetion" >
                            <i></i>
                            <span>{record.comment}</span>
                        </span>:''
                    } */}
                </span>
              )
          }, {
            title: '操作',
            key: 'action',
            render: (text, record) => (
                <div className="operate">
                    <span className="viewBtn" onClick={()=>{editHandle(record)}}>详情</span>
                    {(record.type==4||record.type==5)&&(record.status==2)?<span className="line"></span>:''}
                    {(record.type==4||record.type==5)&&(record.status==2)?<span className="downBtn" onClick={()=>{downloadHandle(record)}}>下载二维码</span>:''}
                </div>
            )
          }]
        return (
            <div className="historyTable">
                <Table 
                    rowKey={record => record.id} 
                    columns={columns} 
                    locale={{
                        emptyText: '暂无数据！'
                    }}
                    dataSource={dataSource} 
                    pagination={false}
                    onChange={this.handleTableChange}
                    loading={{
                        tip:"数据加载中...",
                        indicator:<Tableloading />,
                        spinning:loading
                    }}
                />
            </div>
        )
    }
}