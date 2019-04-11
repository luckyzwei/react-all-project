import React,{Component} from 'react'
import Table from 'antd/lib/table'
import 'antd/lib/table/style/css'
import './index.css'
import Tableloading from '../../shareComponent/TableLoading'
import PageRule from '../../shareComponent/PageRule'
import TipBubble from '../../shareComponent/TipBubble'
import {GUIDE_TEXT} from '../../../constants/ConstantData'
import {tongji} from '../../../funStore/tongji'
import AuthProvider from "../../../funStore/AuthProvider";
import promiseXHR from "../../../funStore/ServerFun";
import {sendEvent} from "../../../funStore/CommonFun";
import {API_PATH} from "../../../constants/OriginName";

export default class GroupTable extends Component {
    constructor(props){
        super(props)
        this.state ={
            columns: [{
                title: '序号',
                dataIndex: 'seqNo',
                key: 'seqNo'
              },{
                title: '群名称',
                dataIndex: 'name',
                key: 'name',
                render: name => <span className='groupName'>
                        {name}
                        </span>
              },{
                  title: '群人数',
                  dataIndex: 'memberCount',
                  key: 'memberCount',
              },{
                title: '人数上限',
                dataIndex: 'memberLimitCount',
                key: 'memberLimitCount',
            },{
                title: '新增人数',
                dataIndex: 'joinPeopleNumber',
                key: 'joinPeopleNumber',
            },{
                title: '群二维码',
                dataIndex: 'groupCode',
                key: 'groupCode',
                render: (groupCode,record) => record.memberCount<100?
                <div className='groupCode' tabIndex='0' onFocus={()=>{this.changeQRcodeShow(record)}} onBlur={()=>{this.changeQRcodeShow()}}>
                    <div className="previewBox" style={{display: this.state.qrcodeShow&&this.state.selectGroup.id==record.id?'block':'none'}}>
                        {
                            record.qrCode
                            ?<img src={record.qrCode}/>
                            :<div className='altTxt'>暂无二维码<br/>点击下方按钮刷新</div>
                        }
                        <p className="previewBox-refresh" onClick={()=>{this.refreshQRcode(record)}}>刷新二维码</p>
                    </div>
                </div>
                :'-',
            },{
                title: '操作',
                dataIndex: 'matchStatus',
                key: 'matchStatus',
                render: (matchStatus,record) => <span className='operate'>
                    <span className={record.matchStatus!=1?'checking':'setting'} onClick={()=>{this.goToMember(record.id,record.name,record.matchStatus,record.groupCode)}}>{record.matchStatus!=1?'查看群员':'设置群主'}</span>
                    <span className="line"></span>
                    <span className='edit' onClick={()=>{record.sourceType!=3&&props.goEditHandle(record.id)}}>编辑</span>
                </span>
            }],
            qrcodeShow: false,
            selectedRowKeys: [],
            selectGroup:{}
        }
    }
    goToMember = (id,name,matchStatus,groupCode) => {
        this.props.actions.goTo('/v2/GIScope/member/'+id+'/'+name+'/'+matchStatus+'/'+groupCode)
        tongji('Lzc_QunGuanLi_ChaKanChengYuan')
    }
    changeQRcodeShow = (selectGroup) => {
        this.setState({
            qrcodeShow: !this.state.qrcodeShow,
            selectGroup
        })
    }
    refreshQRcode = (group) => {
        let url = API_PATH + '/groupadmin-api/authsec/groupmgmt/group/qrcode/refresh?groupId='+group.id+'&isRefresh=true'
        AuthProvider.getAccessToken().then((resolve,reject) => {
            return promiseXHR(url,{type:'Bearer',value:resolve},null,'get')
        }).then(res => {
            let resData = JSON.parse(res)
            if(resData.resultCode=='100'){
                let data = this.props.data.map(v => ({
                    ...v,
                    qrCode: v.id==group.id?resData.resultContent:v.qrCode
                }))
                this.props.updateGroupList(data)
                sendEvent('message', {txt: '刷新成功', code: 1000})
            }
        }).catch(err => {
            sendEvent('message', {txt: '刷新失败', code: 1004})
        })
    }
    onSelectChange = (selectedRowKeys) => {
        // console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    }
    goToBuild = () => {
        tongji('Lzc_QunGuanLi_DaoRuQun')
        this.props.actions.goTo('/v2/RMScope')
    }
    batchHandle =() =>{
        const {selectedRowKeys} = this.state
        if(selectedRowKeys.length==0){
            sendEvent('message', {txt: '请先选择要批量编辑的群！', code: 1003})
            return
        }
        this.setState({
            selectedRowKeys: []
        })
        this.props.tableBatchHandle(selectedRowKeys)
    }
    render(){
        const {columns,selectedRowKeys} = this.state
        const {data,goEditHandle,actions,loading,pageInfo,handlersearchData,guideFlag,downloadHandle,updateGroupList} = this.props
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
          };
        return (
            <div className='groupTableWrapper'>
                <div className="groupTable">
                    <div className="operateArea">
                        <div className="import" onClick={this.goToBuild}>
                            <span style={{position:'relative',zIndex:2}}>导入群</span>
                            {guideFlag?<div className="wave-square"></div>:''}
                            {guideFlag?<TipBubble tipData ={GUIDE_TEXT.GI_IMPORT} styles={{left:0,top:'56px'}}/>:''}
                        </div>
                        <div className="more">
                            <span className="operate" onClick={this.batchHandle}>批量设置</span>
                            <span className="line"></span>
                            <div className="operate" onClick={downloadHandle}>导出群信息</div>
                        </div>
                    </div>
                    <Table 
                        rowSelection={rowSelection} 
                        columns={columns} 
                        dataSource={data} 
                        rowKey={record => record.id}
                        locale={{
                            emptyText: '暂无数据！'
                        }}
                        pagination={false}
                        loading={{
                            tip:"数据加载中...",
                            indicator:<Tableloading />,
                            spinning:loading
                        }}
                    />
                    <div className="pageFooter">
                        <PageRule 
                            pageInfo={pageInfo}
                            handlersearchData={handlersearchData}
                        />
                    </div>
                </div>
            </div>
        )
    }
}