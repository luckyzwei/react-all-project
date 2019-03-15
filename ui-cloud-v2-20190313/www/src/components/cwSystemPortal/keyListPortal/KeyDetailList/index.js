import React, {Component} from 'react'
import './index.css'
import RangePicker from "../../../shareComponent/RangePicker";
import ButtonBox from "../../../shareComponent/ButtonBox";
// import PageRule from "../../../shareComponent/PageRule";
import DetailModule from "../DetailModule";
import {getKeyWordDetail} from "../../../../funStore/FetchApi";
import {result_, sendEvent} from "../../../../funStore/CommonFun";
import { tongji } from '../../../../funStore/tongji';


export default class KeyDetailList extends Component {
    constructor() {
        super();
        this.state = {
            searchParams: {
                startTime:null,
                endTime:null
            },
            id: '',
            recordId: '',//关键词记录id
            recordState: false,
            detailList:[]
        }
        this.getList = this.getList.bind(this);
        this.getTime = this.getTime.bind(this);
        this.CloseRecord = this.CloseRecord.bind(this);
        this.confirmSearch = this.confirmSearch.bind(this);
    }
    CloseRecord(id,keywordName){
        tongji('Lzc_GuanJianCi_XIangQing_ChaKanJiLu')
        this.setState({
            recordState:!this.state.recordState
        })
        if(id){
            this.setState({
                recordId:id,
                keywordName
            })
        }
    }
    confirmSearch(){
        tongji('Lzc_GuanJianCi_XIangQing_SouSuo')
        let params = {
            id:this.state.id,
            ...this.state.searchParams
        }
        this.getList(params)
    }
    getTime(value) {
        // console.log(value);
        let {searchParams} = this.state;
        let startTimes = new Date(value[0] + ' 00:00:00').getTime();
        let endTimes = new Date(value[1] + ' 23:59:59').getTime();
        searchParams.startTime = startTimes || null;
        searchParams.endTime = endTimes || null;
        // console.log(searchParams);
        this.setState({searchParams})
    }

    getList(params) {
        getKeyWordDetail(params).then(res=>{
            res= JSON.parse(res);
            if(res.resultCode === '100'){
                this.setState({
                    detailList:res.resultContent,
                })
            }else{
                sendEvent('message',{txt:res.detailDescription,code:1004})
            }
        }).catch(req=>{
            // console.log(req)
        })
    }

    componentDidMount() {
        // console.log(this.props.viewId);
        let params = {
            id:this.props.viewId,
            ...this.state.searchParams
        }
        this.setState({
            id:this.props.viewId
        })
        this.getList(params)
    }

    componentWillUnmount() {
    }

    render() {
        let {recordState, recordId,detailList} = this.state;
        let {changeView} = this.props;
        return (
            <div className='KeyDetailList'>
                <div className="keyDetailPortal-top">
                    <div className="keyDetailPortal-top-left">
                        {/* <div className='keyDetailPortal-top-left-title'>关键词详情：</div> */}
                        <RangePicker

                            styles={{height: '38px', lineHeight: '38px'}}
                            setDateParams={(e) => {
                                this.getTime(e)
                            }}
                        />
                        <div className="btn" onClick={this.confirmSearch}>搜索</div>
                    </div>
                    {/* <ButtonBox
                        btnTxt={'返回'}
                        isCancel={true}
                        btnFunc={() => {
                            changeView('KEYMAINLIST')
                        }}
                    /> */}
                </div>
                <div className="KeyDetailList-table">
                    <table cellPadding="0" cellSpacing="0" className='KeyDetailList-table-main'>
                        <thead className='table-main-thead'>
                        <tr className='table-main-tr'>
                            <th className='table-main-tr-td'>序号</th>
                            <th className='table-main-tr-td'>关键词名称</th>
                            <th className='table-main-tr-td'>触发次数</th>
                            <th className='table-main-tr-td'>触发人数</th>
                            <th className='table-main-tr-td'>踢人次数<span style={{color:'#FF99A5'}}>（功能待开发）</span></th>
                            <th className='table-main-tr-td'>操作</th>
                        </tr>
                        </thead>
                        <tbody className='table-main-tbody'>
                        {
                            detailList.map((item,index)=>{
                                return(
                                    <tr key={index} className='table-main-tr'>
                                        <td className='table-main-tr-td'>{index+1}</td>
                                        <td className='table-main-tr-td'>{item.keywordName}</td>
                                        <td className='table-main-tr-td'>{result_(item.triggerCount)}</td>
                                        <td className='table-main-tr-td'>{result_(item.triggerMember)}</td>
                                        <td className='table-main-tr-td'>{result_(item.removeCount)}</td>
                                        <td className='table-main-tr-td'>
                                            <span className='td-btn' onClick={this.CloseRecord.bind(this,item.keywordId,item.keywordName)}>查看记录</span>
                                        </td>
                                    </tr>
                                )

                            })
                        }
                        </tbody>
                    </table>
                </div>
                <span className='backBtn' onClick={() => {
                    changeView('KEYMAINLIST')
                }}>返回</span>
                {
                    recordState
                        ?
                        <DetailModule
                            recordId={recordId}
                            CloseRecord={this.CloseRecord}
                        />
                        :
                        ''
                }
            </div>
        )
    }
}
