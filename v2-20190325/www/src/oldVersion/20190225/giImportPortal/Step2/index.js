import React,{Component} from 'react'
import './index.css'
import AidCard from '../../giBuildPortal/manualModule/AidCard'
import ButtonBox from '../../shareComponent/ButtonBox'
import ModalBox from '../../shareComponent/ModalBox'
import {sendEvent} from '../../../funStore/CommonFun'

export default class RobotModal extends Component {
    constructor(props){
        super(props)
        this.state = {
            modalStatus: false
        }
    }
    selectRobot = (data) => {
        // console.log(data)
        const {params,setparamsHandle} = this.props
        if(data.status){
            setparamsHandle('addRobotRole',params.addRobotRole+data.name)
        }else{
            setparamsHandle('addRobotRole',params.addRobotRole.replace(data.name,''))
        }
    }
    prevHandle=()=>{
        this.props.prevStep()
    }
    nextHandle=()=>{
        const {params,nextStep} = this.props
        if(params.addRobotRole==''){
            sendEvent('message', {txt: '请先选择入群助手', code: 1004})
        }else{
            nextStep()
        }
    }
    render(){
        const {modalStatus} = this.state
        const {headImage,wechatName,nextStep,prevStep,params} = this.props
        return (
            <div className="robotModal">  
                <div className="wechatname pageSize">
                    <img src={headImage} alt=""/>
                    <span>{wechatName}</span>
                </div>
                <div className="robotBox pageSize">
                    <div className="inner">
                        <div className="label">选择群助手：</div>
                        <AidCard
                            AidName={"A"}
                            AidStatus={params.addRobotRole.includes('A')}
                            AidClass={"service"}
                            AidFunc={this.selectRobot}
                        />
                        <AidCard
                            AidName={"C"}
                            AidStatus={params.addRobotRole.includes('C')}
                            AidClass={"holding"}
                            AidFunc={this.selectRobot}
                        />
                        <AidCard
                            AidName={"B"}
                            AidStatus={params.addRobotRole.includes('B')}
                            AidClass={"putting"}
                            AidFunc={this.selectRobot}
                        />
                        <div className="buttonArea">
                            <ButtonBox 
                                btnTxt={'上一步'}
                                isCancel={true}
                                btnStyle={{
                                    width:'108px',
                                    height:'36px',
                                    float:'left',
                                    marginLeft:'362px'
                                }}
                                btnFunc={this.prevHandle}
                            />
                            <ButtonBox 
                                btnTxt={'下一步'}
                                isCancel={false}
                                btnStyle={{
                                    width:'108px',
                                    height:'36px',
                                    float:'left',
                                    marginLeft:'30px'
                                }}
                                btnFunc={this.nextHandle}
                            />
                        </div>
                    </div>
                </div>
                <ModalBox 
                    modalStatus={modalStatus} //控制显示隐藏状态
                    modalStyle={{}}//修改样式，默认最小高度220px，宽度420px
                    closeModalFunc={this.closeModal} //关闭弹出框函数
                    confirmFunc={this.confirmModal} //弹出框确定函数，处理主逻辑
                    modalTxt={'退出当前页面后将丢失所有编辑的内容哦~'} //弹出框的文本信息
                    cancelTxt={'我再想想'}//取消按钮的文本
                    confirmTxt={"知道了"}//确定按钮的文本
                />
            </div>
        )
    }
}