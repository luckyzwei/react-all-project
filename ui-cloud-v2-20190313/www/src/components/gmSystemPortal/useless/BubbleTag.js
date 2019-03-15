/**
 * Created by jiayi.hu on 5/26/17.
 * 废弃代码
 */

import React, { Component } from 'react'
import promiseXHR from '../../funStore/ServerFun'
import AuthProvider from '../../funStore/AuthProvider'
import $ from 'jquery'
import TagList from './TagList'
import TagInput from './TagInput'
import BubbleCheck from './BubbleCheck'
import {API_PATH} from '../../constants/OriginName'
export default class BubbleTag extends Component {
    static propTypes = {

    }
    constructor(props){
        super(props)
        this.state = {
            labelid:'',
            inputFlag:'none'
        }
    }
    handleSubmitTag(id,tagName){
        const reg = /\ud83c[\udf00-\udfff]|\ud83d[\udc00-\ude4f]|\ud83d[\ude80-\udeff]/g
        if(reg.test(tagName)) this.filterEmojiHandle();
        tagName = tagName.replace(reg,'')
        if(tagName == '') return
        const actions = this.props.actions
        if(this.props.type=='GROUP'){
            const url = API_PATH+'/groupadmin-api/authsec/groupadmin/group/'+id+'/label'
            AuthProvider.getAccessToken()
            .then((resolve,reject)=>{
            promiseXHR(url,{type:'Bearer',value:resolve},{'name':tagName},'POST')
            .then((res) =>{
                let data = JSON.parse(res)
                if(data.resultCode==100){
                    actions.addGroupTag(id,[data.resultContent])
                }
            })
            })
        }else if(this.props.type == 'USER'){
            const url = API_PATH+'/groupadmin-api//authsec/groupadmin/group/'+this.props.groupId+'/member/'+id+'/label'
            AuthProvider.getAccessToken()
            .then((resolve,reject)=>{
            promiseXHR(url,{type:'Bearer',value:resolve},{'name':tagName},'POST')
            .then((res) =>{
                let data = JSON.parse(res)
                if(data.resultCode==100){
                    actions.addMemberTag(id,[data.resultContent])
                }
            })
            })
        }
    }
    handleDeleteTag(labelid) {
        this.setState({
            labelid:labelid
        })
        this.props.showFlagHandle('block')
    }
    handleCancel(){
        this.props.showFlagHandle('none')
        this.props.featureTypeHandle('')
    }
    handleSure(){
        this.props.showFlagHandle('none')
        this.props.featureTypeHandle('')
    }
    handleAddInput(){
        this.setState({
            inputFlag:'block'
        })
    }
    handleAddCancel(){
        this.setState({
            inputFlag: 'none'
        })
    }
    filterEmojiHandle () {
        this.props.showFlagHandle('block')
        this.props.featureTypeHandle('EMOJI')
    }
    render(){
        let {inputFlag,labelid} = this.state
        let {id,type,groupList,memberList,groupId,actions,featureType,showFlag,removeTagBox} = this.props
        let labelList
        if(type=='GROUP'){
            labelList = groupList.listData.find((item)=>item.id==id).labelList
        }else if(type=='USER'){
            labelList = memberList.listData.find((item)=>item.id==id)?memberList.listData.find((item)=>item.id==id).labelList:[]
        }
        let tagInput = inputFlag=='block'?
            <TagInput
                onSubmit={this.handleSubmitTag.bind(this)}
                handleAddCancel={this.handleAddCancel.bind(this)}
                id={id}
                labelList={labelList}
            />:null
        return(
            <div className='TagWrapper'>
                <BubbleCheck
                             id={id}
                             labelid={labelid}
                             groupId={groupId}
                             style={showFlag}
                             onCancel={this.handleCancel.bind(this)}
                             onSure={this.handleSure.bind(this)}
                             type={type}
                             deleteGroupTag={actions.deleteGroupTag}
                             deleteMemberTag={actions.deleteMemberTag}
                             removeMember={actions.removeMember}
                             featureType={featureType}
                             removeTagBox={removeTagBox}
                             actions={actions}/>
                <TagList tagName={labelList}
                         onDelete={this.handleDeleteTag.bind(this)}
                         onAdd={this.handleAddInput.bind(this)}
                         addFlag={inputFlag}
                         type={type}
                         />
                {tagInput}
            </div>
        )
    }
}
