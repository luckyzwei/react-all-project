import React, { Component } from 'react'
export default class SearchBox extends Component {
  static propTypes = {
    // actions: PropTypes.object.isRequired
  }
  constructor(props){
    super(props)
    this.state = {
      moveIcon:true,
      focusInput:false
    }
  }

  componentDidMount(){

  }
  componentWillUnmount() {

  }
  componentDidUpdate() {
    // this.refs.input.value = this.props.inputValue===undefined?'':this.props.inputValue
  }
  focusEvent(){
    // this.refs.input.style.backgroundColor = this.props.focusColor
    this.setState({
      moveIcon:false,
      focusInput:true
    })
  }
  movingIcon(){
    // this.refs.input.style.backgroundColor = this.props.focusColor
    this.refs.input.focus()
    this.setState({
      moveIcon:false,
      focusInput:true
    })
  }
  blurEvent(){
    if(this.refs.input.value==''){
       this.setState({
         moveIcon:true,
         focusInput:false
       })
    }
    // this.refs.input.style.backgroundColor = this.props.blurColor
  }

  changeEvent(){
    const value = this.refs.input.value
    this.props.searchKey(value)
    this.props.changeKeyForMember(value)
  }
  searchChangeHandle(){
    const value = this.refs.input.value
    this.props.changeKeyForMember(value)
  }
  keyUpEvent (e) {
    const value = this.refs.input.value
    if(e.keyCode == 13){
      this.props.searchKey(value)
    }
  }

  componentDidMount(){
    this.props.searchKey('')
  }

  render() {
    const {type,inputValue} = this.props
    let {moveIcon,focusInput}=this.state;
    if(type == 'KEYUP'){
      return (
        <div className ={moveIcon&&inputValue==''?'searchWrapper ':'searchWrapper searchingIcon'} >
        <em className="searchInIcon" onClick={this.movingIcon.bind(this)}></em>
          <input autoComplete="off" id = 'searchInput' ref = 'input' type="text" placeholder="搜索"
          onFocus = {this.focusEvent.bind(this)}
          onBlur = {this.blurEvent.bind(this)}
          onKeyUp = {this.keyUpEvent.bind(this)}
          onChange = {this.searchChangeHandle.bind(this)}
           className={focusInput||inputValue!=''?"focusInput":"blurInput"}
           value = {this.props.inputValue===undefined?'':this.props.inputValue}
          />
        </div>
      )
    }else {
      return (
        <div className ={moveIcon&&inputValue==''?'searchWrapper ':'searchWrapper searchingIcon'}>
        <em className="searchInIcon" onClick={this.movingIcon.bind(this)}></em>
          <input autoComplete="off" id = 'searchInput' ref = 'input' type="text" placeholder="搜索"
          onFocus = {this.focusEvent.bind(this)}
          onBlur = {this.blurEvent.bind(this)}
          onChange = {this.changeEvent.bind(this)}
          className={focusInput||inputValue!=''?"focusInput":"blurInput"}
          value = {this.props.inputValue===undefined?'':this.props.inputValue}
          />
        </div>
      )
    }
  }
}
