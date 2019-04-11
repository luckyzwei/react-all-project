import React, { Component, PropTypes } from 'react'
import { push, replace } from 'react-router-redux'
import promiseXHR from '../../funStore/ServerFun'
import AuthProvider from '../../funStore/AuthProvider'
import {API_PATH} from '../../constants/OriginName'
import {tongji} from '../../funStore/tongji'



export default class LogOffRobot extends Component {
    constructor(props){
        super(props)
        this.state={

        }
        this.sureLogOff=this.sureLogOff.bind(this)
    }
    sureLogOff(){
        const {groupId,groupName} = this.props;
        tongji('Lzc_ZhiNengZuShou_ZhuXiaoQun')
        const url = API_PATH + '/groupadmin-api/authsec/groupadmin/robot/group/'+groupId+'/cancel?groupName='+groupName;
        AuthProvider.getAccessToken()
            .then((resolve,reject)=>{
                return promiseXHR(url,{type:'Bearer',value:resolve},null,'GET')
            })
            .then((res)=>{
                if(JSON.parse(res).resultCode==100){
                    this.props.refreshALL();
                    this.props.hideLogOff()
                }
            })
    }
    render(){
        // console.log(this.props)
        return(
            <div style={{height:document.body.clientHeight, width:document.body.clientWidth}} className="logOffMask">
                <div className="logOffRobot">
                    <p>确定要将<span>{this.props.groupName}</span>注销吗？</p>
                    <button onClick={()=>{this.props.hideLogOff()}}>我再想想</button>
                    <a
                        href="javascript:;"
                        onClick={this.sureLogOff}
                    >是的</a>
                    <span
                        className="icon-set close-delete"
                        onClick={()=>{this.props.hideLogOff()}}
                    ></span>
                </div>
            </div>
        )
    }
}
