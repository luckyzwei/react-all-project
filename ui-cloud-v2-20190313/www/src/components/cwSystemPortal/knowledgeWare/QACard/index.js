import React,{Component} from 'react'
import './index.css'
import ModalBox from '../../../shareComponent/ModalBox'
import {tongji} from '../../../../funStore/tongji'

export default class QACard extends Component {
    constructor(props){
        super(props)
        this.state = {
            operateFlag: false,
            isExpand:false,
            modalFlag: false,
            modalStyle: {}
        }
    }
    focusHandle=()=>{
        this.setState({
            operateFlag: true
        })
    }
    blurHandle = () =>{
        this.setState({
            operateFlag: false
        })
    }
    editHandle = (item) => {
        this.refs.operate.blur()
        this.props.showEditModal(item)
    }
    openHandle = (item) => {
        this.refs.operate.blur()
        this.props.changeStatusHandle(item.status==1?2:1,item.id)
    }
    deleteHandle = (e) => {
        this.refs.operate.blur()
        this.showModal(e)
    }
    expandHandle = () => {
        let {item} = this.props 
        if(!this.state.isExpand && (item.answer.length>111 || item.knowledgeBasePicture.length>0)) {
            this.setState({
                isExpand: true
            })
        }
    }
    expandHandleFalse = (e) => {
        if(this.state.isExpand){
            e.stopPropagation()
            this.setState({
                isExpand: false
            })
        }
    }
    showModal = (e)=>{
        let modalStyle = {}
        modalStyle.left = e.clientX+'px'
        modalStyle.top = e.clientY+'px'
        this.setState({
            modalFlag: true,
            modalStyle: modalStyle
        })
    }
    closeModal=()=>{
        this.setState({
            modalFlag: false
        })
    }
    render(){
        const {operateFlag,isExpand,modalFlag,modalStyle} = this.state
        const {item,categoryList,checkQAcard} = this.props
        let category
        // console.log(item)
        // console.log(categoryList)
        if(item.firstClass&&!item.secondClass&&!item.thirdClass){
            category = categoryList.find(v => v.id==item.firstClass).className
        }
        // if(item.firstClass&&item.secondClass&&!item.thirdClass){
        //     let firstClass = categoryList.find(v => v.id==item.firstClass)
        //     let secondClass = firstClass.thirdClass.find(v => v.id==item.secondClass)
        //     category = firstClass.className+'/'+secondClass.className
        // }
        // if(item.firstClass&&item.secondClass&&item.thirdClass){
        //     let firstClass = categoryList.find(v => v.id==item.firstClass)
        //     let secondClass = firstClass.thirdClass.find(v => v.id==item.secondClass)
        //     let thirdClass = secondClass.thirdClass.find(v => v.id==item.thirdClass)
        //     category = firstClass.className+'/'+secondClass.className+'/'+thirdClass.className
        // }
        return (
            <div className={isExpand?'cw-qacard':'cw-qacard hover'} onClick={this.expandHandle} >
                {/* <div className="left">
                    <div className={item.select?"checkBox checked":'checkBox'} onClick={()=>{checkQAcard(item.id)}}></div>
                </div> */}
                <div className="right">
                    <div className="header">
                        <div className="question">Q：{item.problem}</div>
                        <div className="other">
                            <div className="time">{item.createDate.replace('T',' ')}</div>
                            <div ref="operate" className="operate" tabIndex='1' onClick={(e) => e.stopPropagation()} onFocus={this.focusHandle} onBlur={this.blurHandle}>
                                {
                                    operateFlag
                                    ?<div className="operateItem">
                                        <div className="edit" onClick={()=>{this.editHandle(item)}}>编辑</div>
                                        {/* <div className="open" onClick={()=>{this.openHandle(item)}}>{item.status==1?'停用':'启用'}</div> */}
                                        <div className="delete" onClick={this.deleteHandle}>删除</div>
                                    </div>
                                    :''
                                }
                            </div>
                        </div>
                    </div>
                    {/* <div className="labelList">
                        {
                            item.knowledgeBaseLabel.slice(0,5).map(v=>{
                                return <span className="label" key={v.id}>{v.labelName}</span>
                            })
                        }
                        {item.knowledgeBaseLabel.length>5?' 等':''}
                    </div> */}
                    <div className="answerBox">A：
                        {isExpand?item.answer:item.answer.length>111?item.answer.slice(0,111)+'...':item.answer}
                        {/* <span className={isExpand?'all':'two'}>A：{item.answer}</span> */}
                        {item.answer.length>111||item.knowledgeBasePicture.length>0?<span onClick={this.expandHandleFalse} className="expandBtn">{isExpand?'（收起）':'（展开）'}</span>:''}
                        {isExpand?
                            item.knowledgeBasePicture.map(v=>{
                                return <img key={v.id} src={v.image} alt=""/>
                            }) 
                        :''}
                    </div>
                    <div className="footer">{category?category:'未分类'}</div>
                </div>
                <ModalBox
                    modalStatus={modalFlag} //控制显示隐藏状态
                    modalStyle={modalStyle}//修改样式，默认最小高度220px，宽度420px
                    modalName={'sufei'} //弹出框的名称，多个的话以示区别
                    closeModalFunc={this.closeModal} //关闭弹出框函数
                    confirmFunc={()=>{this.props.changeStatusHandle(3,item.id)}} //弹出框确定函数，处理主逻辑
                    modalTxt={'确定要删除这条内容吗'} //弹出框的文本信息
                    confirmTxt={"删除"}//确定按钮的文本
                    isDelete={true}
                />
            </div>
        )
    }
}