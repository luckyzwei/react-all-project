import React, { Component } from 'react'
export default class GroupSearch extends Component {
  constructor(props){
    super(props)
    this.changeEvent = this.changeEvent.bind(this)
  }

  componentDidMount(){

  }
  componentWillUnmount() {

  }
  changeEvent(){
    const value = this.refs.groupSearch_input.value
    this.props.onChange(value)
  }
  render() {
    let {userList} = this.props
    return (
        <div className = 'searchWrapper' >
            <input id = 'searchInput' type='text' placeholder='搜索'
              ref = 'groupSearch_input'
              onChange = {this.changeEvent}
            />
            <em className="searchInIcon"></em>
        </div>
    )
  }
}
