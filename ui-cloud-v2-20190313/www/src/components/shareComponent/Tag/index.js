import React,{Component} from 'react'
import Tag from 'antd/lib/tag'
import Input from 'antd/lib/input'
import Tooltip from 'antd/lib/tooltip'
import Icon from 'antd/lib/icon'
import 'antd/lib/tag/style/css'
import 'antd/lib/input/style/css'
import 'antd/lib/tooltip/style/css'
import 'antd/lib/icon/style/css'

import './index.css'
import {textCountIndex} from '../../../funStore/CommonFun'

class EditableTagGroup extends React.Component {
  state = {
    tags: [],
    inputVisible: false,
    inputValue: '',
  };

  componentDidMount(){
    const tags = this.props.tags
    this.setState({tags})
  }
  componentWillReceiveProps(nextProps){
    if(this.props.tags.length!=nextProps.tags.length||this.props.options!=nextProps.options){
      this.setState({tags:nextProps.tags})
    }
  }

  handleClose = (removedTag) => {
    const tags = this.state.tags.filter(tag => tag !== removedTag);
    const index = this.state.tags.indexOf(removedTag)
    this.setState({ tags });
    this.props.onDel(index)
  }

  showInput = () => {
    this.setState({ inputVisible: true }, () => this.input.focus());
  }

  handleInputChange = (e) => {
    this.setState({ inputValue: e.target.value });
  }

  handleInputConfirm = () => {
    let {limit,textLimit} = this.props
    const state = this.state;
    const inputValue = state.inputValue;
    let tags = state.tags;
    if(tags.length==limit||inputValue.trim()===''){
      this.setState({
        inputVisible: false,
        inputValue: ''
      })
      return
    } 
    if (inputValue && tags.indexOf(inputValue) === -1) {
      tags = [...tags, inputValue.slice(0,textCountIndex(inputValue,textLimit))];
      this.props.onAdd(inputValue.slice(0,textCountIndex(inputValue,textLimit)))
    }
    this.setState({
      // tags,
      inputVisible: false,
      inputValue: '',
    });
    
  }

  saveInputRef = input => this.input = input

  render() {
    const { tags, inputVisible, inputValue } = this.state;
    const {text,style,btnStyle,inputStyle,isCheck,checkItems} = this.props
    return (
      <div>
        {tags.map((tag, index) => {
          const isLongTag = tag.length > 20;
          const tagElem = (
            <Tag key={tag} closable afterClose={() => this.handleClose(tag)} style={Object.assign({},style,isCheck&&checkItems.includes(tag)?{color: '#FF99A5',background: '#fff1f1'}:null)} >
              {isLongTag ? `${tag.slice(0, 20)}...` : tag}
            </Tag>
          );
          return isLongTag ? <Tooltip title={tag} key={tag}>{tagElem}</Tooltip> : tagElem;
        })}
        {inputVisible && (
          <Input
            ref={this.saveInputRef}
            type="text"
            size="small"
            style={Object.assign({},{ width: 78 },inputStyle)}
            value={inputValue}
            onChange={this.handleInputChange}
            onBlur={this.handleInputConfirm}
            onPressEnter={this.handleInputConfirm}
          />
        )}
        {!inputVisible && (
          <Tag
            onClick={this.showInput}
            style={btnStyle?btnStyle:{ 
                background: '#F7F8F9',
                borderRadius: '10px',
                border:'0 none',
                fontFamily: 'PingFang SC',
                fontSize: '14px',
                color: '#B5BDC6',
                lineHeight:'20px',
                height: '20px',
                fontWeight:400,
                verticalAlign: 'top'
            }}
          >
            <Icon type="plus" />{text}
          </Tag>
        )}
      </div>
    );
  }
}

EditableTagGroup.defaultProps={
  textLimit: 6
}

export default EditableTagGroup