/**
 * Created by jiayi.hu on 5/26/17.
 */

import React, {Component} from 'react'
// import BubbleTag from './BubbleTag'
// import BubbleGroupItem from './BubbleGroupItem'
// import BubbleUserItem from './BubbleUserItem'
// import BubbleCheck from './BubbleCheck'
import promiseXHR from '../../funStore/ServerFun'
import AuthProvider from '../../funStore/AuthProvider'
import {API_PATH} from '../../constants/OriginName'

import Tag from '../shareComponent/Tag'


export default class ListBubble extends Component {
    constructor(props) {
        super(props)
        this.state = {
            // featureType :'',
            // showFlag: 'none'
            initTags: [],
            tags:[]
        }
        this.handleSubmitTag = this.handleSubmitTag.bind(this)
        this.deleteTagHandle = this.deleteTagHandle.bind(this)
    }
    componentWillMount(){
        const {groupList,id} = this.props
        let initTags = groupList.listData.find((item)=>item.id==id).labelList
        let tags = initTags.map(v => v.name)
        this.setState({
            initTags,tags
        })
    }
    handleSubmitTag(id,tagName){
        const reg = /\ud83c[\udf00-\udfff]|\ud83d[\udc00-\ude4f]|\ud83d[\ude80-\udeff]/g
        if(reg.test(tagName)) this.filterEmojiHandle();
        tagName = tagName.replace(reg,'')
        if(tagName == '') return
        const actions = this.props.actions
        const initTags = this.state.initTags
        const tags = this.state.tags
        if(this.props.type=='GROUP'){
            const url = API_PATH+'/groupadmin-api/authsec/groupadmin/group/'+id+'/label'
            AuthProvider.getAccessToken()
            .then((resolve,reject)=>{
            promiseXHR(url,{type:'Bearer',value:resolve},{'name':tagName},'POST')
            .then((res) =>{
                let data = JSON.parse(res)
                if(data.resultCode==100){
                    actions.addGroupTag(id,[data.resultContent])
                    initTags.push(data.resultContent)
                    tags.push(data.resultContent.name)
                    this.setState({initTags,tags})
                }
            })
            })
        }
    }
    deleteTagHandle(index){
        const {id,actions} = this.props
        let {initTags,tags} = this.state
        let labelid = initTags[index].id
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
                    actions.deleteGroupTag(id, labelid)
                    initTags = initTags.filter((v,i)=> index!=i)
                    tags = tags.filter((v,i)=> index!=i)
                    this.setState({initTags,tags})
                }
            })
        })
    }
    onAdd = (tag) => {
        const {id} = this.props
        this.handleSubmitTag(id,tag)
    }
    // moduleJudge() {
    //     switch (this.props.type) {
    //         case 'GROUP' :
    //             return (
    //                 <BubbleGroupItem />
    //             )
    //         case 'USER':
    //             return (
    //                 <BubbleUserItem
    //                     socket = {this.props.socket.state.socket}
    //                     groupList= {this.props.groupList}
    //                     featureTypeHandle = {this.featureTypeHandle.bind(this)}
    //                     showFlagHandle = {this.showFlagHandle.bind(this)}
    //                     groupId={this.props.groupId}
    //                     memberId={this.props.id}
    //                     setRead={this.props.actions.setRead}
    //                     removeTagBox = {this.props.removeTagBox}
    //                 />
    //             )
    //     }
    // }
    // featureTypeHandle (type) {
    //     this.setState({
    //         featureType : type
    //     })
    // }
    // showFlagHandle (state) {
    //     this.setState({
    //         showFlag: state
    //     })
    // }
    render() {
        const {initTags,tags} = this.state
        const {groupList,memberList,type,id,targetPositionX,targetPositionY,groupId,actions,tagEdit,removeTagBox} = this.props
        return (
            <div className="gm-bubble-container" style = {{left:targetPositionX,top:targetPositionY}} >
                {/* <BubbleTag  id={id}
                            type={type}
                            groupList={groupList}
                            memberList={memberList}
                            groupId={groupId}
                            actions={actions}
                            tagEdit={tagEdit}
                            showFlag={this.state.showFlag}
                            showFlagHandle={this.showFlagHandle.bind(this)}
                            featureType = {this.state.featureType}
                            featureTypeHandle = {this.featureTypeHandle.bind(this)}
                            removeTagBox = {removeTagBox}
                        /> */}
                {/* {this.moduleJudge()} */}
                <div className="tagTitle">群标签</div>
                <div className="tagBox">
                    <Tag
                        text={'添加标签'}
                        style={{
                            background: '#FFFFFF',
                            borderRadius: '12px',
                            border:'0 none',
                            fontFamily: 'PingFang SC',
                            fontSize: '14px',
                            color: '#485767',
                            lineHeight:'24px',
                            height: '24px',
                            marginBottom:'8px'
                        }}
                        btnStyle={{
                            background: '#FFFFFF',
                            borderRadius: '12px',
                            border:'0 none',
                            fontFamily: 'PingFang SC',
                            fontSize: '14px',
                            color: '#B5BDC6',
                            lineHeight:'24px',
                            height: '24px',
                            marginBottom:'8px'
                        }}
                        limit={10}
                        tags={tags}
                        onAdd={this.onAdd}
                        onDel={this.deleteTagHandle}
                    />
                </div>
            </div>
        )
    }
}
