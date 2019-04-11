/**
 * Created by jiayi.hu on 5/26/17.
 * 废弃代码
 */

import React, {Component} from 'react'
import PropTypes from 'prop-types'
export default class TagBox extends Component {
    static propTypes = {
        onDeleteTag:PropTypes.func
    }
    constructor(props){
        super(props)
        // console.log(props)
    }
    handleDelete(){
        this.props.onDeleteTag(this.props.labelId)
    }
    render(){
        const {tagName,id,addFlag} = this.props
        return (
            <div className='tagBox' id={id}>
                <div className='tagBox-field-name'>
                    <a>{tagName}</a>
                </div>
                <div className='tagBox-field-close icon-background'
                     onClick={this.handleDelete.bind(this)}
                     style={{display:(addFlag=='none'?'none':'inline-block')}}>
                </div>
            </div>
        )
    }
}
