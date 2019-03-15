import React, { Component, PropTypes } from 'react'
import promiseXHR from '../../funStore/ServerFun'
import {API_PATH} from '../../constants/OriginName'
import SelectBox from '../shareComponent/SelectBox'
import _ from 'lodash'
const transformTime = (time) => {
  const result = new Date(time)
  let year = result.getFullYear().toString()
  let month = (result.getMonth()+1).toString()
  let day = result.getDate().toString()
  let hours = result.getHours().toString()
  let minutes = result.getMinutes().toString()
  let seconds = result.getSeconds().toString()
  month = month.length == 1 ? '0'+month : month
  day = day.length == 1 ? '0'+day : day
  hours = hours.length == 1 ? '0'+hours : hours
  minutes = minutes.length == 1 ? '0'+minutes : minutes
  seconds = seconds.length == 1 ? '0'+seconds : seconds
  return [year,month,day,hours,minutes,seconds]
}
export default class MsgPickerForm extends Component {

  constructor(props){
    super(props)
    this.checkData = this.checkData.bind(this)
  }

  state = {
    showForm:false,
    contentTitle:'',
    contentTitleNum:100,
    behaviorType:'',
    contentType:'',
    leader:'',
    verify:[]
  }

  showForm(){
    this.setState({
      showForm:true
    })
  }
  hideForm(){
    this.setState({
      showForm:false
    })
  }

  changeContentTitle(e){
    const num = 100 - e.target.value.length
    if(num>=0){
      if(this.state.verify.includes('TITLE')){
        this.setState({
          contentTitle:e.target.value,
          contentTitleNum:num,
          verify:this.state.verify.filter(item => item!='TITLE')
        })
      }else {
        this.setState({
          contentTitle:e.target.value,
          contentTitleNum:num
        })
      }
    }
  }

  selectBeHaviorType(name,value){
    if(this.state.verify.includes('BEHAVIOR_TYPE')){
      this.setState({
        behaviorType:value,
        verify:this.state.verify.filter(item => item!='BEHAVIOR_TYPE')
      })
    }else {
      this.setState({
        behaviorType:value
      })
    }
  }

  selectContenType(name,value){
    if(this.state.verify.includes('CONTENT_TYPE')){
      this.setState({
        contentType:value,
        verify:this.state.verify.filter(item => item!='CONTENT_TYPE')
      })
    }else {
      this.setState({
        contentType:value
      })
    }
  }

  selectLeader(name,value){
    if(this.state.verify.includes('LEADER')){
      this.setState({
        leader:value,
        verify:this.state.verify.filter(item => item!='LEADER')
      })
    }else {
      this.setState({
        leader:value
      })
    }
  }

  checkData(){
    const {contentTitle,behaviorType,contentType,leader} = this.state
    let result = []
    if(contentTitle==''){
      result.push('TITLE')
    }else if (behaviorType=='') {
      result.push('BEHAVIOR_TYPE')
    }else if (contentType=='') {
      result.push('CONTENT_TYPE')
    }else if (leader=='') {
      result.push('LEADER')
    }
    if(result.length>0){
      this.setState({
        verify:result
      })
      return false
    }else {
      return true
    }
  }

  sendMsgList(){
    const {contentTitle,behaviorType,contentType,leader} = this.state
    const {userInfo,groupId,msgPicker} = this.props
    if(this.checkData()){
      const self = this
      const nowTime = new Date()
      const formData = {
        session_leader:userInfo.info.userinfo.userId,
        leader_behavior_type:behaviorType,
        corpus_type:contentType,
        submitter:leader,
        group_id:groupId,
        tenant_id:userInfo.info.userinfo.tenantId,
        timestamp:transformTime(nowTime)[0]+'-'+transformTime(nowTime)[1]+'-'+transformTime(nowTime)[2]+' '+transformTime(nowTime)[3]+':'+transformTime(nowTime)[4]+':'+transformTime(nowTime)[5],
        session_topic:contentTitle,
        content:msgPicker.pickered.map(item => ({timestamp:transformTime(item.msgInfo.msgTime)[0]+'-'+transformTime(item.msgInfo.msgTime)[1]+'-'+transformTime(item.msgInfo.msgTime)[2]+' '+transformTime(item.msgInfo.msgTime)[3]+':'+transformTime(item.msgInfo.msgTime)[4]+':'+transformTime(item.msgInfo.msgTime)[5],user_id:item.msgInfo.imMemId,msg:item.msgInfo.content}))
      }


          const url = API_PATH+'/conversation-api/noauth/conversation/'
          promiseXHR(url,null,formData,'POST')
          .then(res => {
            const data = JSON.parse(res)
            if(data.resultCode==201){
              self.hideForm()
            }else {
              alert('提交失败')
            }
          })

      // console.log(formData);
    }

  }

  render(){
    const {msgPicker,actions} = this.props
    const {showForm,contentTitleNum,verify} = this.state
    const groupMember = msgPicker.pickered.map(item => ({name:item.memInfo.nickName,id:item.memInfo.id}))
    const groupMember_name = _.uniq(groupMember.map(item => item.name))
    const groupMember_id = _.uniq(groupMember.map(item => item.id))
    const changeContentTitle = this.changeContentTitle.bind(this)
    return(
      <div className = 'gm-msgPickerWrapper'>
        <div className = 'innerBox'>
          <div className = 'confirmButton' onClick = {this.showForm.bind(this)}>确定</div>
          <div className = 'cancelButton' onClick = {() => {actions.turnOffPicker()}}>取消</div>
        </div>
        <div className = 'formWrapper' style = {{display:showForm? 'block':'none'}}>
          <div className = 'formBox'>
            <div className = 'formTitle'>语料信息</div>
            <div className = 'contentTitle'>
              <label>语料主题：</label>
              <textarea id = 'contentTitle_name' placeholder = '请输入主题'
                maxLength = '100'
                style = {{border:verify.includes('TITLE')?'1px solid red':''}}
                onChange = {(e) => {
                  changeContentTitle(e)
                }}>
              </textarea>
              <div className = 'fontMonitor'>{'您还有'+contentTitleNum+'个字可以输入'}</div>
            </div>
            <div className = 'controlBox'>
              <SelectBox
                  selectLabel={'行为类型：'}
                  selectOption={['发现话题','面对质疑','发起话题','加入话题','转移话题','经验分享','闲聊']}
                  paramName={'behaviorType'}
                  paramaValue={[1,5,2,3,4,6,7]}
                  setparamsHandle={this.selectBeHaviorType.bind(this)}
                  width='177px'
                  verify = {verify.includes('BEHAVIOR_TYPE')}
              />
              <SelectBox
                  selectLabel={'语料类型：'}
                  selectOption={['安抚','科普','导购','安抚->科普','安抚->导购','科普->安抚','科普->导购','导购->安抚','导购->科普','安抚->科普->导购','安抚->导购->科普','科普->安抚->导购','科普->导购->安抚','导购->安抚->科普','导购->科普->安抚','专业性','商业性','真实性']}
                  paramName={'contentType'}
                  paramaValue={[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18]}
                  setparamsHandle={this.selectContenType.bind(this)}
                  width='177px'
                  verify = {verify.includes('CONTENT_TYPE')}
              />
              <SelectBox
                  selectLabel={'主导人：'}
                  selectOption={groupMember_name}
                  paramName={'contentType'}
                  paramaValue={groupMember_id}
                  setparamsHandle={this.selectLeader.bind(this)}
                  width='177px'
                  verify = {verify.includes('LEADER')}
              />
            </div>
            <div className = 'buttonBox'>
              <div className = 'submitButton' onClick = {this.sendMsgList.bind(this)}>提交</div>
              <div className = 'cancelButton' onClick = {this.hideForm.bind(this)}>取消</div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
