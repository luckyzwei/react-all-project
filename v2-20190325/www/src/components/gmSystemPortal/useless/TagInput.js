/**
 * Created by jiayi.hu on 5/26/17.
 * 废弃代码
 */

import React,{Component} from 'react'
import PropTypes from 'prop-types'

export default class TagInput extends Component {
    static propTypes  = {
        onSubmit:PropTypes.func
    }
    constructor(props){
        super(props)
        this.state = {
            tagName:''
        }
    }
    componentDidMount(){

    }
    componentWillUnmount(){

    }
    handleButtonStatus(event){
        this.setState ({
            tagName:event.target.value
        })
    }
    handleSubmit(e){
        const tagLength = this.state.tagName.length
        if(e.keyCode == 13&&tagLength>0&&tagLength<11&&this.state.tagName.replace(/(^\s*)|(\s*$)/g,'').length>0){
            if(this.props.labelList.length>=6){
                alert('超过6个了');
                return
            }
            if(this.props.onSubmit){
                this.props.onSubmit(this.props.id,this.state.tagName)
            }
            this.setState({
                tagName:''
            })
        }
    }
    render(){
        // console.log(this.state.tagName)
        return(
            <div className='tagInput'>
                <div className='tagInput-field-input'>
                    <input
                        value={this.state.tagName}
                        placeholder='回车新增标签'
                        onChange={this.handleButtonStatus.bind(this)}
                        autoFocus={true}
                        onKeyUp={this.handleSubmit.bind(this)}
                        style={{color:this.state.tagName.length>10?'#F75A5A':''}}
                    />
                </div>
                <div className='tagInput-field-button'>
                    <button style={{color:"#B5BDC6",border: "1px solid #B5BDC6"}}
                            onClick={this.props.handleAddCancel}>
                        取消
                    </button>
                </div>
            </div>
        )
    }
}
