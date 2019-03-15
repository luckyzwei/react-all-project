import React,{Component} from 'react'
// import AuthProvider from '../../funStore/AuthProvider'
// import promiseXHR from '../../funStore/ServerFun'
// import {API_PATH} from '../../constants/OriginName'
class  ListItem extends Component {
  clickEvent = () => {
    const {id,onClick} = this.props
    onClick&&onClick(id)
  }
  controlEvent = (e) => {
    e.preventDefault()
    e.stopPropagation()
    e.cancelBubble = true
    const {id,control} = this.props
    control&&control(id)
    // const url = API_PATH+'/groupadmin-api/authsec/groupadmin/group/'+id+'/labels'
    // AuthProvider.getAccessToken()
    // .then((resolve,reject)=>{
    //   promiseXHR(url,{type:'Bearer',value:resolve},null,'GET')
    // })
  }
  render() {
    const {id,number,keywordNumber,iconPath,name,type,time,selectId,onClick,control,selectRoomType,flag,level} = this.props
    const length = number/10
    return (
      <div className = 'itemBox'
        style = {{background : selectId === id ? '#F0F1F3' : '#FFFFFF' }}
        id = {id}
        onClick={this.clickEvent}
      >
          <li>
            <div className = 'keywordNumber' style = {{ display : keywordNumber === 0 ? 'none':'block'}}>
              <span style = {{ width : (length >= 10 ? '25px' : '18px')  }} >{ length >= 100 ? '...' : keywordNumber }</span>
            </div>
            <div className = 'profile' >
              <img src = {iconPath?iconPath:`${process.env.PUBLIC_URL+"/images/icon/imgFail.png"}`}/>
            </div>
            <div className = 'name' >
              <span title={name}>
                {name}
                {flag=='MEMBER'?<span className="icon-gm icon-level"></span>:''}
                {flag=='MEMBER'?<span className="level">{level}</span>:''}
              </span>
              {number>0?
                <span style = {{marginTop:'3px',color:'#999DA6'}}>
                  {'['+number+'条] 未读消息'}
                </span>
                : ''}
              {
                type==1?
                <span className="identity">
                  <span className="master">群主</span>
                </span>
                :''
              }
              {
                type==3?
                <span className="identity">
                  <span className="master">群助手</span>
                </span>
                :''
              }
              {
                type==4?
                <span className="identity">
                  <span className="master">群主</span>
                  <span className="master">群助手</span>
                </span>
                :''
              }
            </div>
            <div className = 'handle'>
              <div className = 'time'>{time}</div>
              {flag=='MEMBER'&&selectRoomType!='GROUP'?'':<div className = 'control icon-cw' onClick = {this.controlEvent}><div className="icon-text">编辑</div></div>}
            </div>
          </li>
        </div>
    )
  }
}

export default ListItem
