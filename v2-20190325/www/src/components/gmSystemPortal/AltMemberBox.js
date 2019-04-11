import React, { Component } from 'react'
import classNames from 'classnames'
import UserSearch from './UserSearch'
import MemberItem from './MemberItem'
import $ from 'jquery'
import {tongji} from '../../funStore/tongji'
const selectedFilter = (allMember) => {
  let temp = [];
  allMember.forEach((member)=>{
    if(member.selectedDisplay){
      temp.push(member);
    }
  })
  return temp
}
export default class AltMemberBox extends Component {
  constructor(props){
    super(props)
  }

  state = {
    searchKey:''
  }
  componentDidMount () {
    $('.altBtn').get(0).addEventListener('click',function(e){
      e.preventDefault();
      e.stopPropagation();
      e.cancelBubble = true;
      tongji('Lzc_QunXiaoXi_@Yonghu')
      $('.gm-box-altMember').show()
      $('.userBubble').hide()
      setTimeout(function(){
         $('.gm-box-altMember').css({marginBottom:"0px",opacity:1},300);
      },20)
      $('.faceBox').css({marginTop:"50px",opacity:0},300);
      $('.gm-box-groupSend').css({marginBottom:"-50px",opacity:0},300);
      setTimeout(function(){
        $('.faceBox').hide()
        $('.gm-box-groupSend').hide()
      },280)
    })
  }
  componentWillUnmount () {
  }
  changeEvent(value){
    this.setState({
      searchKey:value
    })
  }
  render() {
    const {memberList,altMember,putStoreByMember,altAll} = this.props
    const  unAltAllClass = classNames({
      unselected: true,
      'icon-gi': true
    })
    const altAllClass = classNames({
      unselected: true,
      'icon-gi': true,
      selected: true,
    })
    const searchKey = this.state.searchKey
    const searchKey_rest = searchKey.substring(1, searchKey.length).toString()
    let dataList = []
    if(searchKey.substring(0, 1).toString() == "\uff03"||searchKey.substring(0, 1).toString() == "\u0023"){
      dataList = memberList.listData.filter(item =>
        item.labelList.length!=0&&item.labelList.find(t => t.name.includes(searchKey_rest))
      )
    }else {
      dataList = searchKey != '' ? memberList.listData.filter(item =>
        item.nickName!=null&&item.nickName.includes(searchKey)
      ) : memberList.listData
    }
   const storeData = memberList.listData.filter(item =>
       item.putStore === true
   )
   const selectData =  memberList.listData.filter(item =>
    item.altSelected === true
   )
   const altAllState =  memberList.altAll
   const selectDataString = altAllState ? '@所有人' : selectData.map(item => item.nickName).join('，')

    return (
      <div className="animation gm-icon">
        <div className="toolBtn altBtn icon-gm">
          <div className="userBubble" style={{display:selectDataString==''?'none':'block'}}>
            <div>{selectDataString}</div>
          </div>
          <div className = 'gm-box-altMember '>
            <UserSearch
              userList={dataList}
              onChange = {this.changeEvent.bind(this)}
              altType = {memberList.altAll === false}
              putStoreByMember = {putStoreByMember}
              />
            <ul className='memberBox'>
                {/* <li>
                    <div className='altAll'>
                        <div className={memberList.altAll === true ? altAllClass : unAltAllClass} onMouseUp = {()=>{
                          altAll()
                        }}></div>
                        <span>@所有人</span>
                    </div>
                </li> */}
                {
                    dataList.map((member)=>{

                        return <MemberItem type = 'ALT'
                        selectEvent = {(id) => {
                          altMember(id)
                        }}
                        member={member} />
                    })
                }
            </ul>
          </div>
          <div className="icon-text">@用户</div>
        </div>
        </div>
    )
  }
}
