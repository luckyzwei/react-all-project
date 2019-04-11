import React,{Component} from 'react'
import ButtonBox from '../../shareComponent/ButtonBox'
import {API_PATH} from '../../../constants/OriginName'
import AuthProvider from '../../../funStore/AuthProvider'
import promiseXHR from '../../../funStore/ServerFun'
import {sendEvent} from '../../../funStore/CommonFun'

export default class AddModal extends Component {
    constructor(props){
        super(props)
        let groupName = []
        for(let i=0;i<10;i++){
            groupName.push(props.initGroupName+(props.initGroupIndex+i))
        }
        this.state ={
            num: undefined,
            isInvaild: false,
            groupName:groupName
        }
    }
    numIpt = (e)=>{
        this.setState({
            num: parseInt(e.target.value),
            isInvaild: parseInt(e.target.value)<1||parseInt(e.target.value)>10?true:false
        })
    }
    confirmHandle=()=>{
        const {num,groupName} = this.state
        const {templateData} = this.props
        let url = `${API_PATH}/groupadmin-api/authsec/robothost/quick/add/create/group?taskName=${templateData.name}&joinGroupTemplateId=${templateData.id}`
        AuthProvider.getAccessToken().then((reslove,reject)=> {
            return promiseXHR(url ,{type:'Bearer',value:reslove},groupName.slice(0,num),'post')
        }).then(res => {
            if(JSON.parse(res).resultCode=='100'){
                sendEvent('message', {txt: "开始新建群，请稍候~",code: 1000})
                this.props.refresh(num)
                this.props.closeModal()
            }
        }).catch(err=> {
            sendEvent('message', {txt: err?err:"新建群失败，请稍候重新尝试~",code: 1004})
        })
    }
    render(){
        const {num,isInvaild,groupName} = this.state
        const {closeModal,initGroupIndex,initGroupName} = this.props
        return (
            <div className="modalWrapper">
                <div className="modalBox addBox">
                    <div className="addBox-title">新增群</div>
                    <div className="addBox-content">
                        <div className="row" style={{margin:0}}>
                            <div className='label'>群数量：</div>
                            <div className="inputBox">
                                <input className='numberIpt' type="number" value={num} onChange={this.numIpt} />
                                <span className='unit'>个</span>
                            </div>
                            <div className="errTip" style={{opacity:isInvaild?1:0}}>
                                群数量范围为1~10个
                            </div>
                        </div>
                        <div className="row">
                            <div className="label">群名称：</div>
                            <div className="nameList">
                                {
                                    !isInvaild&&num
                                    ?groupName.slice(0,num).map((v,i) => {
                                        return (
                                            <div className="groupName" key={i}>{v}</div>
                                        )
                                    })
                                    :'空'
                                }
                            </div>
                        </div>
                        <ButtonBox
                            btnTxt={"确定"}
                            isCancel={false}
                            btnStyle={{
                                marginTop: '20px',
                                float: 'right'
                            }}
                            btnFunc={this.confirmHandle}
                        />
                    </div>
                    <div className="closeBtn" onClick={closeModal}></div>
                </div>
            </div>
        )
    }
}