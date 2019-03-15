import React, { Component } from 'react'
export default class SearchBoxForCW extends Component {
  constructor(props){
    super(props)
    this.state = {
      moveIcon:true,
      focusInput:false,
      searchKey: ''
    }
  }
  componentDidMount(){
      this.setState({
          searchKey: this.props.inputValue
      })
  }
  componentDidUpdate(prevProps,prevState){
      if(prevProps.inputValue!=this.props.inputValue){
        this.setState({
            searchKey: this.props.inputValue
        })
      }
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
    this.setState({
        searchKey: this.props.inputValue
    })
    // this.refs.input.style.backgroundColor = this.props.blurColor
  }
  searchChangeHandle(){
    const value = this.refs.input.value
    this.setState({
        searchKey: value
    })
  }
  keyUpEvent (e) {
    const value = this.refs.input.value
    if(e.keyCode == 13){
      this.props.searchKey(value)
    }
  }

  render() {
    const {inputValue} = this.props
    let {moveIcon,focusInput,searchKey}=this.state;
    return (
    <div className ={moveIcon&&inputValue==''?'searchWrapper ':'searchWrapper searchingIcon'} >
    <em className="searchInIcon" onClick={this.movingIcon.bind(this)}></em>
        <input autocomplete="off" id = 'searchInput' ref = 'input' type="text" placeholder="搜索"
        onFocus = {this.focusEvent.bind(this)}
        onBlur = {this.blurEvent.bind(this)}
        onKeyUp = {this.keyUpEvent.bind(this)}
        onChange = {this.searchChangeHandle.bind(this)}
        className={focusInput||inputValue!=''?"focusInput":"blurInput"}
        value = {this.state.searchKey}
        />
    </div>
    )
  }
}
