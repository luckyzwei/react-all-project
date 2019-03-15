import React, { Component } from 'react'
import './index.css'

import ButtonBox from '../../shareComponent/ButtonBox'
import PageRule from '../../shareComponent/PageRule'
import ModalBox from '../../shareComponent/ModalBox'
import MtCDState from '../MtCDetail'

import { cancelGroupTask, deleteGroupTask } from '../../../funStore/FetchApi'
import { tongji } from '../../../funStore/tongji';

function return_(num) {
    if (num) {
        return num
    } else {
        return '-'
    }
}

function mtStatus(str) {
    switch (str) {
        case 0:
            return "草稿"
            break;
        case 6:
            return "未发送"
            break;
        default:
            return "已发送"
            break;
    }
}

function mtTime(str) {
    if (!str) {
        return ''
    }
    let date = new Date(str);
    let Y = date.getFullYear();
    let M = date.getMonth() + 1;
    let D = date.getDate();
    let h = date.getHours();
    let m = date.getMinutes();
    return [Y, M, D].map(formatNumber).join('-') + ' ' + [h, m].map(formatNumber).join(':')
}

function formatNumber(n) {
    n = n.toString()
    return n[1] ? n : '0' + n
}

const OperateUser = ({ id, closeModal, copyTask }) => {
    return (
        <span className="operate-box-more-s operate-box-more-put-user">
            <span className="operate-box-more-s-triangle"></span>
            <ul className="operate-box-more-s-ul">
                <li className="operate-box-more-s-ul-li" onClick={()=>{copyTask(id)}}>复制</li>
                {/*<li className="operate-box-more-s-ul-li" onClick={closeModal.bind(this, id)}>删除</li>*/}
            </ul>
        </span>
    )
}
const OperateUsers = ({ id, closeModal, copyTask ,editTask}) => {
    return (
        <span className="operate-box-more-s operate-box-more-put-user">
            <span className="operate-box-more-s-triangle"></span>
            <ul className="operate-box-more-s-ul">
                <li className="operate-box-more-s-ul-li" onClick={()=>{editTask(id)}}>编辑</li>
                <li className="operate-box-more-s-ul-li" onClick={()=>{copyTask(id)}}>复制</li>
                <li className="operate-box-more-s-ul-li" onClick={(e)=>{closeModal(id,e)}}>删除</li>
            </ul>
        </span>
    )
}

const OperateDraft = ({ id, closeModal, copyTask, editTask }) => {
    return (
        <span className="operate-box-more-s operate-box-more-put-user">
            <span className="operate-box-more-s-triangle"></span>
            <ul className="operate-box-more-s-ul">
                <li className="operate-box-more-s-ul-li" onClick={()=>{editTask(id)}}>编辑</li>
                <li className="operate-box-more-s-ul-li" onClick={()=>{copyTask(id)}}>复制</li>
                <li className="operate-box-more-s-ul-li" onClick={(e)=>{closeModal(id,e)}}>删除</li>
            </ul>
        </span>
    )
}
const OperatePutUn = ({ id, cancelModal, openMtdes }) => {
    return (
        <span className="operate-box-more-s operate-box-more-put-un">
            <span className="operate-box-more-s-triangle"></span>
            <ul className="operate-box-more-s-ul">
                <li className="operate-box-more-s-ul-li" onClick={openMtdes}>投放说明</li>
                <li className="operate-box-more-s-ul-li" onClick={()=>{cancelModal(id)}}>取消投放</li>
            </ul>
        </span>
    )
}
const OperatePutAn = ({ id, closeModal }) => {
    return (
        <span className="operate-box-more-s operate-box-more-put-an">
            <span className="operate-box-more-s-triangle"></span>
            <ul className="operate-box-more-s-ul">
                <li className="operate-box-more-s-ul-li" onClick={(e)=>{closeModal(id,e)}}>删除</li>
            </ul>
        </span>
    )
}
export default class MtTable extends Component {
    constructor() {
        super();
        this.state = {
            deleteShow: false,//删除弹框
            cancelShow: false,//取消弹框
            deleteId: [],//删除投放任务
            mtCDState: false, //投放任务详情弹框
            recommendState: false,//栗子推荐弹窗
            detailId: "",//投放任务详情
            cancelId: "",//取消投放任务
            modalStyle: {}
        }
        this.viewDetail = this.viewDetail.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.cancelModal = this.cancelModal.bind(this);
        this.deleteTask = this.deleteTask.bind(this);
        this.editTask = this.editTask.bind(this);
        this.copyTask = this.copyTask.bind(this);
        this.openMtdes = this.openMtdes.bind(this);
        this.cancelTask = this.cancelTask.bind(this);
    }

    viewDetail(id) {
        // console.log(e)
        id&&tongji('Lzc_QunTouFang_XiangQing')
        this.setState({
            mtCDState: !this.state.mtCDState,
            detailId: id
        });

    }

    // 取消投放弹框
    cancelModal(id) {
        // console.log(id)
        if (id) {
            this.setState({
                cancelShow: true,
                cancelId: id
            })
        } else {
            this.setState({
                cancelShow: false
            })
        }
    }

    // 取消投放
    cancelTask() {
        let data = {
            id: this.state.cancelId
        }
        tongji('Lzc_QunTouFang_QuXiao')
        cancelGroupTask(data).then(res => {
            res = JSON.parse(res);
            if (res.resultCode == '100') {
                let { getTmUnEmptyList, pageInfo, searchParams } = this.props;
                searchParams = { ...searchParams, ...pageInfo };
                getTmUnEmptyList(searchParams);
            } else {
                // console.log(res.detailDescription)
            }
            this.cancelModal()
        }).catch(req => {
            this.cancelModal()
            console.log(req)
        })
    }

    showModal = (id, e) => {
        if (typeof id == 'string') {
            id = [id]
        }
        console.log(e.clientX)
        let modalStyle = {}
        modalStyle.left = e.clientX+'px'
        modalStyle.top = e.clientY+'px'
        this.setState({
            modalStyle,
            deleteShow: true,
            deleteId: id
        })
    }
    //删除弹框
    closeModal(id,e) {
        this.setState({
            deleteShow: false
        })
    }

    //删除任务
    deleteTask() {
        // console.log(this.state.deleteId)
        tongji('Lzc_QunTouFang_ShanChu')
        let data = {
            ids: this.state.deleteId
        }
        deleteGroupTask(data).then(res => {
            res = JSON.parse(res);
            if (res.resultCode == '100') {
                let { getTmUnEmptyList, pageInfo, searchParams } = this.props;
                searchParams = { ...searchParams, ...pageInfo };
                getTmUnEmptyList(searchParams);
            } else {
                // console.log(res.detailDescription)
            }
            this.closeModal()
        }).catch(req => {
            this.closeModal()
            console.log(req)
        })
    }

    //编辑任务
    editTask(id) {
        // console.log(id);
        tongji('Lzc_QunTouFang_BianJi')
        this.props.actions.goTo('/v2/MTScope/build/' + id + '/edit')
    }

    // 复制任务
    copyTask(id) {
        // console.log("复制");
        tongji('Lzc_QunTouFang_FuZhi')
        this.props.actions.goTo('/v2/MTScope/build/' + id + '/copy')
    }

    // 投放说明
    openMtdes() {
        tongji('Lzc_QunTouFang_TouFangShuoMing')
        this.setState({
            recommendState: !this.state.recommendState
        })
    }

    render() {
        let { deleteShow, mtCDState, cancelShow, recommendState, detailId, deleteId, modalStyle } = this.state;
        let {
            mtListData, pageInfo, searchParams,
            getTmUnEmptyList, checkedMTContent,
            checkedAll, checkAllStatus, selectId, actions
        } = this.props;
        return (
            <div className='MtTable'>
                <div className="MtTable-create">
                    <ButtonBox
                        btnTxt={'新增投放'}
                        isCancel={false}
                        btnFunc={() => {
                            tongji('Lzc_QunTouFang_XinZeng')
                            actions.goTo('/v2/MTScope/build')
                        }}
                    />
                    {/*{*/}
                    {/*mtListData.length && mtListData.find(item=>item.isSelect && item.isSelect===true) && mtListData.find(item=>item.isSelect && item.isSelect===true).isSelect?*/}

                    {/*<div className="MtTable-delete" onClick={this.closeModal.bind(this, selectId)}>*/}
                    {/*<span className="MtTable-delete-icon"></span>*/}
                    {/*删除*/}
                    {/*</div>*/}
                    {/*: ''*/}
                    {/*}*/}
                </div>
                <table className="MtTable-table" cellPadding="0" cellSpacing="0">

                    <thead className="MtTable-table-thead">
                        <tr className="MtTable-table-tr">
                            {/*<th className="MtTable-table-th MtTable-table-th-select">*/}
                            {/*<span*/}
                            {/*onClick={checkedAll}*/}
                            {/*className={checkAllStatus ? "MtTable-table-select-all MtTable-table-select MtTable-table-select-active" : "MtTable-table-select-all MtTable-table-select"}*/}
                            {/*></span>*/}
                            {/*</th>*/}
                            <th className="MtTable-table-th MtTable-table-th-num">序号</th>
                            <th className="MtTable-table-th MtTable-table-th-title">标题</th>
                            <th className="MtTable-table-th MtTable-table-th-state">状态</th>
                            <th className="MtTable-table-th MtTable-table-th-time">投放时间</th>
                            <th className="MtTable-table-th MtTable-table-th-link">链接点击数</th>
                            <th className="MtTable-table-th MtTable-table-th-men">创建人</th>
                            <th className="MtTable-table-th MtTable-table-th-tips">操作</th>
                        </tr>
                    </thead>
                    <tbody className="MtTable-table-tbody">
                        {
                            mtListData&&mtListData.length!==0?
                            mtListData.map((item, index) => {
                                return (
                                    <tr className="MtTable-table-tbody-tr" key={index}>
                                        {/*<td className="MtTable-table-tbody-td MtTable-table-tbody-td-select">*/}
                                        {/*<span*/}
                                        {/*onClick={checkedMTContent.bind(this, item.id)}*/}
                                        {/*className={item.isSelect ? "MtTable-table-select MtTable-table-select-active" : "MtTable-table-select"}*/}
                                        {/*></span>*/}
                                        {/*</td>*/}
                                        <td className="MtTable-table-tbody-td">{index + 1}</td>
                                        <td className="MtTable-table-tbody-td">
                                            <span className="MtTable-table-tbody-td-content">
                                                {
                                                    item.sysRecommend ?
                                                        <span
                                                            className={item.status == 4 ? "MtTable-table-tbody-td-un":"MtTable-table-tbody-td-an"}>栗子推荐</span>
                                                        : ''
                                                }
                                                <span className="MtTable-table-tbody-td-text">{item.title}</span>
                                            </span>
                                        </td>
                                        <td className="MtTable-table-tbody-td">{mtStatus(item.status)}</td>
                                        <td className="MtTable-table-tbody-td">{mtTime(item.sendingTime)}</td>
                                        <td className="MtTable-table-tbody-td">{return_(item.allClickNum)}</td>
                                        <td className="MtTable-table-tbody-td">{item.loginName}</td>
                                        <td className="MtTable-table-tbody-td">
                                            <span className="operate-box">
                                                <span className="operate-box-detail"
                                                    onClick={()=>{this.viewDetail(item.id)}}>详情</span>
                                                <span className="operate-box-line">|</span>
                                                <span className="operate-box-more">
                                                    {
                                                        !item.sysRecommend
                                                            ?
                                                            (item.status == 0
                                                                ?
                                                                <OperateDraft closeModal={this.showModal}
                                                                    editTask={this.editTask}
                                                                    copyTask={this.copyTask} id={item.id} />
                                                                : (item.status == 6
                                                                    ? <OperateUsers closeModal={this.showModal}
                                                                        editTask={this.editTask}
                                                                        copyTask={this.copyTask}
                                                                        id={item.id} />
                                                                    :
                                                                    <OperateUser closeModal={this.showModal}
                                                                        copyTask={this.copyTask} id={item.id} />))
                                                            :
                                                            (item.status == 6
                                                                ?
                                                                <OperatePutUn select={item.isSelect}
                                                                    openMtdes={this.openMtdes}
                                                                    cancelModal={this.cancelModal}
                                                                    id={item.id} />
                                                                :
                                                                <OperatePutAn closeModal={this.showModal}
                                                                    id={item.id} />)

                                                    }
                                                </span>
                                            </span>
                                        </td>
                                    </tr>
                                )
                            })
                            :''
                            // <div className='mt-noneBox'>
                            //     <div className='mt-none'></div>
                            //     <p className='mt-noneText'>没有找到内容~</p>
                            // </div>
                        }
                    </tbody>
                    <tfoot className="MtTable-table-tfoot">
                        <tr className="MtTable-table-tfoot-tr">
                            <td className="MtTable-table-tfoot-tr-td" colSpan='7'>
                            {
                                mtListData&&mtListData.length!==0?
                                <span className="MtTable-table-tfoot-tr-td-span">
                                    <PageRule
                                        pageInfo={pageInfo}
                                        searchParams={searchParams}
                                        handlersearchData={getTmUnEmptyList}
                                    />
                                </span>
                                :''
                            }
                            </td>
                        </tr>
                    </tfoot>

                </table>
                {
                    mtListData&&mtListData.length!==0?'':
                    <div className='mt-noneBox'>
                        <div className='mt-none'></div>
                        <p className='mt-noneText'>没有找到内容~</p>
                    </div>
                }
                <ModalBox
                    modalStatus={deleteShow} //控制显示隐藏状态
                    modalStyle={modalStyle}//修改样式，默认最小高度220px，宽度420px
                    modalName={'sufei'} //弹出框的名称，多个的话以示区别
                    closeModalFunc={this.closeModal} //关闭弹出框函数
                    confirmFunc={this.deleteTask} //弹出框确定函数，处理主逻辑
                    modalTxt={'确定要删除当前任务吗'} //弹出框的文本信息
                    confirmTxt={"删除"}//确定按钮的文本
                />
                <ModalBox
                    modalStyle={modalStyle}
                    modalStatus={cancelShow} //控制显示隐藏状态
                    modalName={'sufei'} //弹出框的名称，多个的话以示区别
                    closeModalFunc={this.cancelModal} //关闭弹出框函数
                    confirmFunc={this.cancelTask} //弹出框确定函数，处理主逻辑
                    modalTxt={'确定要取消当前任务吗'} //弹出框的文本信息
                    confirmTxt={"确定"}//确定按钮的文本
                />
                {
                    mtCDState ? <MtCDState detailId={detailId} viewDetail={this.viewDetail} /> : ''
                }
                {
                    recommendState ? <div className="recommend-box">
                        <div className="recommend-box-content">
                            <div className="recommend-box-content-title">栗子推荐</div>
                            <div className="recommend-box-content-text">
                                <p className="text-item">1.栗子推荐会为您提供干货推荐，知识卡片，热门新闻等。</p>
                                <p className="text-item">2.部分投放会根据点击量将为您带来广告收益，可用来抵扣工具使用费用。</p>
                                <p className="text-item">3.栗子推荐默认直接投放，可在操作内取消投放。</p>
                            </div>
                            <div className="recommend-btn">
                                <ButtonBox
                                    btnTxt={'知道了'}
                                    isCancel={false}
                                    btnFunc={() => {
                                        this.openMtdes()
                                    }}
                                />
                            </div>
                        </div>
                    </div> : ''
                }
            </div>
        )
    }
}
