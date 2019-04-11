import React, { Component, PropTypes } from 'react'
import $ from 'jquery'
import GroupSearch from './GroupSearch'
import MemberItem from './MemberItem'
import {tongji} from '../../funStore/tongji'
export default class GroupSendBox extends Component {
  constructor(props){
    super(props)
    this.groupMsgCrumbClick = this.groupMsgCrumbClick.bind(this)
    this.changeSelectAllTab = this.changeSelectAllTab.bind(this)
    this.cancelAllTab = this.cancelAllTab.bind(this)
  }

  state = {
    searchKey:'',
    allTab:false
  }
  componentDidMount(){
    $('.groupSendbtn').get(0).addEventListener('click',function(e){
      e.preventDefault();
      e.stopPropagation();
      e.cancelBubble = true;
      if(e.target.className == 'confirmBtn' ) return;
      tongji('Lzc_QunXiaoXi_QunFa')
      $('.gm-box-groupSend').show()
      setTimeout(function(){
         $('.gm-box-groupSend').css({marginBottom:"0px",opacity:1},300);
      },20)
      $('.faceBox').css({marginTop:"50px",opacity:0},300);
      $('.gm-box-altMember').css({marginBottom:"-50px",opacity:0},300);
      setTimeout(function(){
        $('.faceBox').hide()
        $('.gm-box-altMember').hide()
        // $('.userListBox').hide()
      },280)
    })
  }
  componentWillUnmount() {
  }
  changeEvent(value){
    this.setState({
      searchKey:value
    })
  }

  changeSelectAllTab(){
      this.setState({
        allTab : !this.state.allTab
      })
    }

  cancelAllTab(){
    this.setState({
      allTab : false
    })
  }
  groupMsgCrumbClick(e){
    e.preventDefault();
    e.stopPropagation();
    this.props.initGroupList()
    this.props.initMemberList()
    this.props.pullMesgById('GROUPMSG','',{messages:[]},{})
    this.props.selectRoom('GROUPMSG')
    $('.gm-box-groupSend').css({marginBottom:"-50px",opacity:1},300);
    setTimeout(function(){
      $('.gm-box-groupSend').hide()
    },280)
  }
  render() {
    const {groupList,selectGroup,selectAllGroup,cancelAllGroup} = this.props
    const searchKey = this.state.searchKey
    const searchKey_rest = searchKey.substring(1, searchKey.length).toString()
    let dataList = []
    if(searchKey.substring(0, 1).toString() == "\uff03"||searchKey.substring(0, 1).toString() == "\u0023"){
      dataList = groupList.listData.filter(item =>
        item.labelList.length!=0&&item.labelList.find(t => t.name.includes(searchKey_rest))
      )
    }else {
      dataList = searchKey != '' ? groupList.listData.filter(item =>
        item.nickName!=null&&item.nickName.includes(searchKey)
      ) : groupList.listData
    }
    const allTab = this.state.allTab
    return (
      <div className="animation gm-icon">
      <div className="toolBtn groupSendbtn icon-gm">
        <div className = 'gm-box-groupSend'>
            <GroupSearch onChange = {this.changeEvent.bind(this)} />
            <div className='groupListBox'>
                <ul>
                    <li>
                        <div className='allGroup'>
                            <div className={!allTab ? 'unselected icon-gi' : 'unselected icon-gi selected'} onMouseUp = {() => {
                              if(!allTab){
                                selectAllGroup()
                              }else {
                                cancelAllGroup()
                              }
                              this.changeSelectAllTab()

                            }}></div>
                            <span>所有群</span>
                        </div>
                    </li>
                    {dataList.map((group,index)=>{
                        return <MemberItem
                        key = {index}
                        member={group}
                        selectEvent = {(id,type) => {
                          if(type){
                            this.cancelAllTab()
                          }
                          selectGroup(id)
                        }}
                        />
                    })}
                </ul>
            </div>
             <div className="confirmBtn" onMouseUp={(e)=>{this.groupMsgCrumbClick(e)}}>确定</div>
        </div>
        <div className="icon-text">群发</div>
      </div>
      </div>
    )
  }
}
