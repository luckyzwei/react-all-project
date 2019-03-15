import React,{Component} from 'react'
import './index.css'
import QACard from '../QACard'
import PageRule from '../../../shareComponent/PageRule'
import ButtonBox from '../../../shareComponent/ButtonBox'
import TipBubble from '../../../shareComponent/TipBubble'
import {GUIDE_TEXT} from '../../../../constants/ConstantData'
import BatchModal from '../BatchModal'
import LoadingAnimationS from '../../../shareComponent/LoadingAnimationS';
import {tongji} from '../../../../funStore/tongji'

export default class KnowledgeBase extends Component {
    constructor(props){
        super(props)
        this.state = {
            batchFlag: false
        }
    }
    showBatchModal = () => {
        tongji('Lzc_NeiRongKu_PiLiangDaoRu')
        this.setState({
            batchFlag: !this.state.batchFlag
        })
    }
    render(){
        const {batchFlag} = this.state
        let {data,repullList,pageInfo,searchParams,getPageList,categoryList,showEditModal,checkQAcard,changeStatusHandle,guideFlag,userId,kwlistLoad} = this.props
        return (
            kwlistLoad?
            <div className="cw-knowledgeBase load">
                <LoadingAnimationS/>
            </div>
            :
            ((data&&data.length!==0)||(categoryList&&categoryList.length>1)
            ?
            <div className="cw-knowledgeBase">
                <div className="toolBar">
                    {/* <div className="left">
                        <span className={checkAll?"checkAll checked":"checkAll"} onClick={checkAllQAcard}></span>
                        <span>已选中{checkNum}条</span>
                    </div> */}
                    <div className='some-import' onClick={this.showBatchModal}>批量导入</div>
                    {
                        data&&data.length!==0?
                            <div className='guideButton'>
                                <ButtonBox btnTxt={'新增内容'} isCancel={false}
                                    btnStyle={{position:'relative',zIndex:'2'}}
                                    btnFunc={()=>{showEditModal(null)}}/>
                            </div>
                            :''
                    }
                    {/* {
                        checkNum>0?<div className="right">
                            <span onClick={()=>{changeStatusHandle(1)}}>启用</span>
                            <span onClick={()=>{changeStatusHandle(2)}}>停用</span>
                        </div>:''
                    } */}
                </div>
                {
                    data&&data.length!==0?
                    <div className="linebar"></div>
                    :''
                }
                {
                    data.map(v=>{
                        return <QACard 
                                    key={v.id} 
                                    item={v} 
                                    categoryList={categoryList} 
                                    showEditModal={showEditModal}
                                    checkQAcard={checkQAcard}
                                    changeStatusHandle={changeStatusHandle}
                                />
                    })
                }
                {
                    data&&data.length==0?<div className="noData1">
                        <img src={process.env.PUBLIC_URL+"/images/icon/cw_noData1.png"} alt=""/>
                        <p>没有找到相关内容，现在去增加内容吧～</p>
                        <div className='guideButton'>
                            <ButtonBox btnTxt={'新增内容'} isCancel={false}
                                btnStyle={{position:'relative',zIndex:'2'}}
                                btnFunc={()=>{showEditModal(null)}}/>
                        </div>
                    </div>:''
                }
                {
                    data&&data.length>0?<div className="pageFooter">
                        <PageRule 
                            pageInfo={pageInfo}
                            handlersearchData={(page)=>{getPageList(page)}}
                        />
                    </div>:''
                }
                {batchFlag?<BatchModal repullList={repullList} searchParams={searchParams} pageInfo={pageInfo} onCancel={this.showBatchModal} userId={userId}/>:''}
            </div> 
            :
            <div className="cw-knowledgeBase noData">
                <div className="toolBar">
                    {/* <div className="left">
                        <span className={checkAll?"checkAll checked":"checkAll"} onClick={checkAllQAcard}></span>
                        <span>已选中{checkNum}条</span>
                    </div> */}
                    <div className='some-import' onClick={this.showBatchModal}>批量导入</div>
                    {/* {
                        checkNum>0?<div className="right">
                            <span onClick={()=>{changeStatusHandle(1)}}>启用</span>
                            <span onClick={()=>{changeStatusHandle(2)}}>停用</span>
                        </div>:''
                    } */}
                </div>
                <img className="noDataImg" src={process.env.PUBLIC_URL+"/images/icon/cw_noData.png"} />
                <p>内容库还没有类目哦，快去添加吧～</p>
                <div className='guideButton'>
                    <ButtonBox btnTxt={'新增内容'} isCancel={false}
                        btnStyle={{position:'relative',zIndex:'2'}}
                        btnFunc={()=>{showEditModal(null)}}/>
                    {guideFlag?<div className="wave-square"></div>:''}
                    {guideFlag?<TipBubble tipData ={GUIDE_TEXT.CW_BUILD} styles={{left:'-200px',top:'56px'}}/>:''}
                </div>
                {batchFlag?<BatchModal onCancel={this.showBatchModal} userId={userId}/>:''}
            </div>
            )
        )
    }
}