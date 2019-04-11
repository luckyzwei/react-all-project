import React, { Component } from 'react'
import './index.css'

import ButtonBox from '../../shareComponent/ButtonBox'
import PageRule from '../../shareComponent/PageRule'
import ModalBox from '../../shareComponent/ModalBox'
import MtCDState from '../MtCDetail'
import MmPhone from '../MtPhone'

import { delMoment,getMoment } from '../../../funStore/MomentApi'
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
        case 'txt':
            return "文字"
            break;
        case 'pic':
            return "图片"
            break;
        case 'picTxt':
            return "图文"
            break;
        case 'link':
        case 'linkTxt':
            return "H5链接"
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
// const OperateUsers = ({ id, closeModal, copyTask ,editTask}) => {
//     return (
//         <span className="operate-box-more-s operate-box-more-put-user">
//             <span className="operate-box-more-s-triangle"></span>
//             <ul className="operate-box-more-s-ul">
//                 <li className="operate-box-more-s-ul-li" onClick={()=>{editTask(id)}}>编辑</li>
//                 <li className="operate-box-more-s-ul-li" onClick={()=>{copyTask(id)}}>复制</li>
//                 <li className="operate-box-more-s-ul-li" onClick={()=>{closeModal(id)}}>删除</li>
//             </ul>
//         </span>
//     )
// }

const OperateDraft = ({ id, closeModal, copyTask, editTask }) => {
    return (
        <span className="operate-box-more-s operate-box-more-put-user">
            <span className="operate-box-more-s-triangle"></span>
            <ul className="operate-box-more-s-ul">
                <li className="operate-box-more-s-ul-li" onClick={()=>{editTask(id)}}>编辑</li>
                {/* <li className="operate-box-more-s-ul-li" onClick={()=>{copyTask(id)}}>复制</li>
                <li className="operate-box-more-s-ul-li" onClick={()=>{closeModal(id)}}>删除</li> */}
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
            showphone: false,
            paramsImg: {status:false,url:[]},
            paramsTxt: '',
            paramsLink: {status:false},
            modalStyle: {}
        }
        this.viewDetail = this.viewDetail.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.cancelModal = this.cancelModal.bind(this);
        this.deleteTask = this.deleteTask.bind(this);
        this.editTask = this.editTask.bind(this);
        this.copyTask = this.copyTask.bind(this);
        this.openMtdes = this.openMtdes.bind(this);
        // this.cancelTask = this.cancelTask.bind(this);
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
    // cancelTask() {
    //     let data = {
    //         id: this.state.cancelId
    //     }
    //     tongji('Lzc_QunTouFang_QuXiao')
    //     delMoment(data).then(res => {
    //         res = JSON.parse(res);
    //         if (res.resultCode == '100') {
    //             let { getTmUnEmptyList, pageInfo, searchParams } = this.props;
    //             searchParams = { ...searchParams, ...pageInfo };
    //             getTmUnEmptyList(searchParams);
    //         } else {
    //             // console.log(res.detailDescription)
    //         }
    //         this.cancelModal()
    //     }).catch(req => {
    //         this.cancelModal()
    //         // console.log(req)
    //     })
    // }

    //删除弹框
    showModal = (id,e) => {
        let modalStyle = {}
        modalStyle.left = e.clientX+'px'
        modalStyle.top = e.clientY+'px'
        this.setState({
            modalStyle,
            deleteShow: true,
            deleteId: id
        })
    }
    closeModal(id,e) {
        this.setState({
            deleteShow: false
        })
    }

    //删除任务
    deleteTask() {
        // console.log(this.state.deleteId)
        tongji('Lzc_QunTouFang_ShanChu')
        let id = this.state.deleteId
        delMoment(id).then(res => {
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
        this.props.actions.goTo('/v2/MMScope/build/' + id + '/edit')
    }

    // 复制任务
    copyTask(id) {
        // console.log("复制");
        tongji('Lzc_QunTouFang_FuZhi')
        this.props.actions.goTo('/v2/MMScope/build/' + id + '/copy')
    }

    // 投放说明
    openMtdes() {
        tongji('Lzc_QunTouFang_TouFangShuoMing')
        this.setState({
            recommendState: !this.state.recommendState
        })
    }

    showphone = (id) => {
        getMoment(id).then(res => {
            res = JSON.parse(res)
            if (res.resultCode == '100') {
                let {paramsTxt,paramsImg,paramsLink} = this.state
                // res.resultContent.sendingTime = formatDate(res.resultContent.sendingTime);
                res.resultContent.items.map(item => {
                    if (item.type == 0) {
                        paramsTxt = item.content
                    }
                    if (item.type == 3) {
                        paramsImg.status = true
                        paramsImg.url.push(item.content)
                    }
                    if (item.type == 1) {
                        paramsLink.status = true
                        paramsLink.img = {}
                        paramsLink.img.url = item.content
                        paramsLink.title = item.title
                        paramsLink.url = item.uri
                    }
                })
                this.setState({
                    paramsTxt,paramsImg,paramsLink,showphone: true
                })
            }
        })
    }

    closeMmPhoneModal = () => {
        this.setState({
            paramsImg: {status:false,url:[]},
            paramsTxt: '',
            paramsLink: {status:false},
            showphone: false
        })
    }

    render() {
        let { deleteShow, mtCDState, cancelShow, recommendState, detailId, deleteId, paramsTxt,paramsImg,paramsLink,showphone,modalStyle} = this.state;
        let {
            mtListData, pageInfo, searchParams,
            getTmUnEmptyList, checkedMTContent,
            checkedAll, checkAllStatus, selectId, actions
        } = this.props;
        return (
            <div className='MmTable'>
                {
                    showphone?
                    <div className='showphone-modal'>
                        <MmPhone closeModal={this.closeMmPhoneModal} paramsTxt={paramsTxt} paramsImg={paramsImg} paramsLink={paramsLink}/>
                    </div>
                    :''
                }
                <div className="MtTable-create">
                    <ButtonBox
                        btnTxt={'发朋友圈'}
                        isCancel={false}
                        btnFunc={() => {
                            tongji('Lzc_QunTouFang_XinZeng')
                            actions.goTo('/v2/MMScope/build')
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
                            <th className="MtTable-table-th MtTable-table-th-type">发送类型</th>
                            <th className="MtTable-table-th MtTable-table-th-time">发送时间</th>
                            <th className="MtTable-table-th MtTable-table-th-state">发送状态</th>
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
                                        <td className="MtTable-table-tbody-td MtTable-table-tbody-title">{item.title}</td>
                                        <td className="MtTable-table-tbody-td">{mtStatus(item.itemGroup)}</td>
                                        <td className="MtTable-table-tbody-td">{mtTime(item.sendingTime)}</td>
                                        <td className="MtTable-table-tbody-td">{item.status==2?'已发送':item.status==1?'发送中':'未发送'}</td>
                                        <td className="MtTable-table-tbody-td">
                                            <span className="operate-box">
                                                {
                                                    item.status==2||item.status==1?  
                                                    <div style={{display: 'flex'}}>
                                                        <OperateUser copyTask={this.copyTask} id={item.id} closeModal={this.closeModal}/>
                                                        <span className="operate-box-line">|</span>
                                                        <span className="operate-box-detail" onClick={()=>this.showphone(item.id)}>详情</span>
                                                    </div>
                                                    :
                                                    <OperateDraft closeModal={this.closeModal}
                                                        editTask={this.editTask}
                                                        copyTask={this.copyTask} id={item.id} />
                                                }
                                                {
                                                    item.status==2||item.status==1?    
                                                    "":
                                                    <span className="operate-box-line">|</span>
                                                }
                                                {
                                                    item.status==2||item.status==1?
                                                    "":
                                                    <span className="operate-box-more">
                                                            <OperatePutAn closeModal={this.showModal}
                                                                copyTask={this.copyTask} id={item.id} />
                                                    </span>
                                                }
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
                {/* <ModalBox
                    modalStatus={cancelShow} //控制显示隐藏状态
                    modalStyle={{}}//修改样式，默认最小高度220px，宽度420px
                    modalName={'sufei'} //弹出框的名称，多个的话以示区别
                    closeModalFunc={this.cancelModal} //关闭弹出框函数
                    confirmFunc={this.cancelTask} //弹出框确定函数，处理主逻辑
                    modalTxt={'确定要取消当前任务吗'} //弹出框的文本信息
                    confirmTxt={"确定"}//确定按钮的文本
                /> */}
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
