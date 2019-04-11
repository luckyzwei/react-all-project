/**
 * 创建时间:2018-08-23 12:46:20
 * 作者：sufei  Xerath
 * 版本号：1.0
 **/
import React, { Component } from 'react'
import './index.css'

import ButtonBox from '../ButtonBox';

export default class ModalBox extends Component {
    constructor() {
        super();
        this.state = {};
        this.confirmModal = this.confirmModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    transitonFlag = true
    confirmFunc=()=> {
        if(this.transitonFlag){
            this.transitonFlag = false
            this.props.confirmFunc()
        }
    }
    closeModalFunc=()=>{
        if(this.transitonFlag){
            this.transitonFlag = false
            this.props.closeModalFunc()
        }
    }


    confirmModal(e) {
        const {modalStyle} = this.props
        const modalBox = document.querySelectorAll('.ModalBox-animate')[0]
        const modalBoxContent = document.querySelectorAll('.ModalBoxContent-animate')[0]
        modalBoxContent.addEventListener('transitionend',this.confirmFunc)
        modalBox.style.opacity = 0
        modalBoxContent.style.cssText = `top: ${modalStyle.top};left: ${modalStyle.left};transform: translate(-50%,-50%) scale(0);`
    }

    closeModal(e) {
        const {modalStyle} = this.props
        const modalBox = document.querySelectorAll('.ModalBox-animate')[0]
        const modalBoxContent = document.querySelectorAll('.ModalBoxContent-animate')[0]
        modalBoxContent.addEventListener('transitionend',this.closeModalFunc)
        modalBox.style.opacity = 0
        modalBoxContent.style.cssText = `top: ${modalStyle.top};left: ${modalStyle.left};transform: translate(-50%,-50%) scale(0);`
    }

    componentDidMount() {
        const modalBox = document.querySelectorAll('.ModalBox-animate')[0]
        const modalBoxContent = document.querySelectorAll('.ModalBoxContent-animate')[0]
        if(modalBoxContent){
            setTimeout(() => {
                modalBox.style.opacity = 1
                modalBoxContent.style.cssText = 'top: 50%;left: 50%;transform: translate(-50%,-50%) scale(1);'
            }, 50);
        }
    }
    componentDidUpdate(prevProps,prevState){
        if(this.props.modalStatus&&!prevProps.modalStatus){
            const modalBox = document.querySelectorAll('.ModalBox-animate')[0]
            const modalBoxContent = document.querySelectorAll('.ModalBoxContent-animate')[0]
            if(modalBoxContent){
                setTimeout(() => {
                    modalBox.style.opacity = 1
                    modalBoxContent.style.cssText = 'top: 50%;left: 50%;transform: translate(-50%,-50%) scale(1);'
                }, 50);
            }
        }
    }

    shouldComponentUpdate(nextProps,nextState){
        if(this.props.modalStatus&&!nextProps.modalStatus){
            const modalBoxContent = document.querySelectorAll('.ModalBoxContent-animate')[0]
            if(modalBoxContent){
                this.transitonFlag = true
                modalBoxContent.removeEventListener('transitionend',this.confirmFunc)
                modalBoxContent.removeEventListener('transitionend',this.closeModalFunc)
            }
        }
        return true
    }

    componentWillUnmount() {
        const modalBoxContent = document.querySelectorAll('.ModalBoxContent-animate')[0]
        if(modalBoxContent){
            modalBoxContent.removeEventListener('transitionend',this.confirmFunc)
            modalBoxContent.removeEventListener('transitionend',this.closeModalFunc)
        }
    }

    render() {
        let { modalStatus, modalStyle, modalTxt, cancelTxt, confirmTxt,isDelete ,btnStyle} = this.props;
        let oDiv = modalStatus ?
            <div className='ModalBox ModalBox-animate' onClick={(e) => {e.stopPropagation()}}>
                <div className="ModalBoxContent ModalBoxContent-animate" style={modalStyle}>
                    <div className="closeModalBox" onClick={this.closeModal}></div>
                    <div className="ModalBoxTxt" dangerouslySetInnerHTML={{__html:modalTxt}}></div>
                    <div className="ModalBoxBtn">
                        {
                            cancelTxt ?
                                <ButtonBox
                                    btnTxt={cancelTxt}
                                    isCancel={true}
                                    btnFunc={this.closeModal}
                                />
                                :
                                ""
                        }
                        {
                            confirmTxt ?
                                <ButtonBox
                                    btnTxt={confirmTxt}
                                    isCancel={false} 
                                    btnStyle={btnStyle}
                                    btnFunc={this.confirmModal}
                                    isDelete={isDelete}
                                />
                                : ''
                        }
                    </div>
                </div>
            </div>
            :
            '';
        return (oDiv)
    }
}

/**
 * <ModalBox
 * modalStatus={modalStatus} //控制显示隐藏状态
 * modalStyle={{}}//修改样式，默认最小高度220px，宽度420px
 * modalName={'sufei'} //弹出框的名称，多个的话以示区别
 * closeModalFunc={this.closeModal} //关闭弹出框函数
 * confirmFunc={this.confirmModal} //弹出框确定函数，处理主逻辑
 * modalTxt={'退出当前页面后将丢失所有编辑的内容哦退出当前页面后将丢失所有编辑的内容哦'} //弹出框的文本信息
 * cancelTxt={'我再想想'}//取消按钮的文本
 * confirmTxt={"知道了"}//确定按钮的文本
 * />
 */
