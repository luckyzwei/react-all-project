import React, { Component } from 'react'
import classNames from 'classnames'
export default class UserSearch extends Component {
  constructor(props){
    super(props)
    this.state = {
        listShow: false
    }
    this.focusHandle = this.focusHandle.bind(this)
    this.blurHandle = this.blurHandle.bind(this)
  }

  componentDidMount(){

  }
  componentWillUnmount() {

  }
  focusHandle () {
    this.setState({
        listShow: true
    })
  }
  blurHandle () {
    this.setState({
        listShow: false
    })
  }
  changeEvent(){
    const value = this.refs.memberSearch_input.value
    this.props.onChange(value)
  }

  render() {
    let {listShow} = this.state;
    let {userList,onChange,putStoreByMember,altType} = this.props
    let inputClass = classNames({
        'focused': listShow
    })
    return (
        <div className = 'searchWrapper' >
            <input id = 'searchInput' ref = 'memberSearch_input'
            className={inputClass} type='text'
            placeholder='搜索用户名' onMouseUp={this.focusHandle}
            onChange = {this.changeEvent.bind(this)}/>
            <em className="searchInIcon"></em>
            {/* <div className='userListBox'  style={{display:listShow ?'block':'none'}}>
                <ul>
                    {userList.map((user,id)=>{
                        return <li key = {'li'+id} id = {user.id}
                         onMouseUp = {(e)=>{
                           if(altType){
                              putStoreByMember(user.id)
                           }
                         }}
                         style = {{
                           color:(user.putStore === true|| altType === false)? '#B5BDC6' : 'black'
                       }}
                        >
                            <span><img src={user.iconPath} alt=""/></span>
                            <span>{user.nickName}</span>
                        </li>
                    })}
                </ul>
            </div> */}
        </div>
    )
  }
}
