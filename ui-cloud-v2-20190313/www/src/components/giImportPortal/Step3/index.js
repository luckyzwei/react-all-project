import React,{Component} from 'react'
import './index.css'
import TransferBox from '../TransferBox'
import ButtonBox from '../../shareComponent/ButtonBox'
import {sendEvent} from '../../../funStore/CommonFun'

export default class RobotModal extends Component {
    constructor(props){
        super(props)
        this.state = {
            checkAll1: false,//左侧全选框标志
            checkAll2: false,//右侧全选框标志
            groups: props.groups,
            option: 0, //0 是全部 1是群主 2是非群主
        }
    }
    checkAllHandle =(checkStatus)=>{
        // 全选,根据checkstatus来判断是左侧或右侧
        let {checkAll1,checkAll2,groups} = this.state
        if(checkStatus==1){
            checkAll1 = !checkAll1
            groups = groups.map(v =>{
                return v.checkStatus==checkStatus&&v.status==1?{
                    ...v,
                    checked: checkAll1
                }:v
            })
        }else{
            checkAll2 = !checkAll2
            groups = groups.map(v =>{
                return v.checkStatus==checkStatus&&v.status==1?{
                    ...v,
                    checked: checkAll2
                }:v
            })
        }
        this.setState({groups,checkAll1,checkAll2})
    }
    singleCheck=(e,data) => {
        // 点击单个选择，根据checkstatus来判断是左侧或右侧
        // console.log(data)
        let {groups} = this.state
        let checkStatus = data.checkStatus
        let checkAll1 = false
        let checkAll2 = false
        // 单选
        groups = groups.map(v => {
            return v.id==data.id?{
                ...v,
                checked: !v.checked
            }:v
        })
        
        if(checkStatus==1){
            // 点击左边的选择框
            let leftGroups = groups.filter(v => v.checkStatus==1&&v.status==1)
            let select = leftGroups.filter(v => v.checked)
            if(select.length==leftGroups.length){
                checkAll1=true
            }
        }else{
            // 点击右边的选择框
            let rightGroups = groups.filter(v => v.checkStatus==2&&v.status==1)
            let select = rightGroups.filter(v => v.checked)
            if(select.length==rightGroups.length){
                checkAll2=true
            }
        }
        this.setState({groups,checkAll1,checkAll2})
    }

    transferHandle= (status,nexStatus) => {
        // 移动
        let {groups} = this.state
        let checkAll1 = false
        let checkAll2 = false
        groups = groups.map(v => {
            return v.checkStatus==status&&v.checked?{
                ...v,
                checkStatus: nexStatus,
                checked: false
            }:v
        })
        this.setState({groups,checkAll1,checkAll2})
    }

    nextStep = () =>{
        const {nextStep,updateGroups} = this.props
        // 校验选择群数量
        const {groups} = this.state
        let checkNum = groups.filter(v => v.checkStatus==2).length
        if(checkNum>0){
            // 记录更新后的群列表，下一步
            updateGroups(groups)
            nextStep()
        }else{
            sendEvent('message', {txt: '请先选择群', code: 1002})
        }
    }

    filterHandle=(option)=>{
        this.setState({option})
    }

    render(){
        const {checkAll1,checkAll2,groups,option} = this.state
        const {wechatName,headImage,requestGroupList} = this.props
        const showgroups = option==0?groups:option==1?groups.filter(v => v.masterType==1):groups.filter(v => v.masterType!=1)
        // console.log(groups)
        return (
            <div className="robotModal">  
                <div className="wechatname pageSize">
                    <img src={headImage} alt=""/>
                    <span>{wechatName}</span>
                </div>
                <div className="groupBox">
                    <div className="inner">
                        <div className="tab">
                            <span className={option==0?"active":''} onClick={()=>{this.filterHandle(0)}}>全部</span>
                            <span className={option==1?"active":''} onClick={()=>{this.filterHandle(1)}}>群主</span>
                            <span className={option==2?"active":''} onClick={()=>{this.filterHandle(2)}}>非群主</span>
                        </div>
                        <TransferBox 
                            checkAll1={checkAll1} 
                            checkAll2={checkAll2} 
                            sourceData={showgroups} 
                            checkAllHandle={this.checkAllHandle}
                            singleCheck={this.singleCheck}
                            transferHandle={this.transferHandle}
                            requestGroupList={requestGroupList}
                        />
                        <div className="buttonArea">
                            <ButtonBox 
                                btnTxt={'下一步'}
                                isCancel={false}
                                btnStyle={{
                                    width:'108px',
                                    height:'36px',
                                    float:'right',
                                    marginLeft:'30px'
                                }}
                                btnFunc={this.nextStep}
                            />
                            {/* <ButtonBox 
                                btnTxt={'上一步'}
                                isCancel={true}
                                btnStyle={{
                                    width:'108px',
                                    height:'36px',
                                    float:'right'
                                }}
                                btnFunc={this.nextStep}
                            /> */}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}