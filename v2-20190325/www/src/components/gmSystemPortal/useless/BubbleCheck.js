/**
 * Created by jiayi.hu on 5/27/17.
 * 废弃代码
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import promiseXHR from '../../funStore/ServerFun'
import AuthProvider from '../../funStore/AuthProvider'
import {API_PATH} from '../../constants/OriginName'
export default class BubbleCheck extends Component {
    static propTypes = {
        labelid: PropTypes.any,
        style: PropTypes.any,
        onCancel: PropTypes.func,
        onSure: PropTypes.func
    }
    static defaultProps = {
        style:''
    }
    handleDeleteCancel(){
        if(this.props.onCancel){
            this.props.onCancel()
        }
    }
    handleDeleteSure(){
        const {type,id,labelid,groupId,deleteGroupTag,deleteMemberTag,removeMember,featureType,setIdForLabel,removeTagBox} = this.props
        this.props.onCancel()
        if(featureType == 'REMOVEUSER'){
            // 删除用户
            const url = API_PATH+'/groupadmin-api/authsec/groupadmin/group/'+groupId+'/member/'+id
            AuthProvider.getAccessToken()
                .then((resolve, reject) => {
                    promiseXHR(url, {
                            type: 'Bearer',
                            value: resolve
                        }, null, 'DELETE')
                        .then((res) => {
                            let data = JSON.parse(res)
                            if (data.resultCode == 100) {
                                removeMember(id)
                                removeTagBox()
                            }
                        })
                })
            return
        }
        if(type == 'GROUP'){
            const url = API_PATH+'/groupadmin-api/authsec/groupadmin/group/'+id+'/label/'+labelid
            AuthProvider.getAccessToken()
                .then((resolve, reject) => {
                    promiseXHR(url, {
                            type: 'Bearer',
                            value: resolve
                        }, null, 'DELETE')
                        .then((res) => {
                            let data = JSON.parse(res)
                            if (data.resultCode == 100) {
                                deleteGroupTag(id, labelid)
                            }
                        })
                })
        }else if(type == 'USER'){
            const url = API_PATH+'/groupadmin-api/authsec/groupadmin/group/'+groupId+'/member/'+id+'/label/'+labelid
            AuthProvider.getAccessToken()
                .then((resolve, reject) => {
                    promiseXHR(url, {
                            type: 'Bearer',
                            value: resolve
                        }, null, 'DELETE')
                        .then((res) => {
                            let data = JSON.parse(res)
                            if (data.resultCode == 100) {
                                deleteMemberTag(id, labelid)
                            }
                        })
                })
        }
    }
    render(){
        let context;
        switch(this.props.featureType){
            case 'EMOJI': context='标签含有非法字符！';break;
            case 'REMOVEUSER': context = '是否移除该用户？';break;
            default: context='确定删除此标签吗？'
        }
        return(
            <div className="checkWrapper" style={{display:this.props.style}}>
                <div className="checkBox">
                    <div className="check-field-state">
                        {context}
                    </div>
                    <div className="check-field-leftButton">
                        <div className = 'button' onClick={this.handleDeleteCancel.bind(this)}>
                            取消</div>
                    </div>
                    <div className="check-field-rightButton">
                        <div className = 'button'
                            onClick={this.handleDeleteSure.bind(this)}>
                            确定</div>
                    </div>
                </div>
            </div>
        )
    }
}
