/**
 * Created by jiayi.hu on 5/26/17.
 * 废弃代码
 */

import React,{Component} from 'react'
import PropTypes from 'prop-types'
import TagBox from './TagBox'

export default class TagList extends Component {
    static propTypes = {
        onDelete:PropTypes.func,
        onAdd: PropTypes.func
    }
    handleAddTag(){
        if(this.props.onAdd){
            this.props.onAdd()
        }
    }
    render() {
        const {addFlag,tagName,type,onDelete} = this.props
        // console.log(tagName)
        return (
            <div className='tagList'>
                {tagName.map((item, i) =>
                    <TagBox
                        key={i}
                        tagName={item.name}
                        labelId={item.labelId}
                        addFlag={addFlag}
                        onDeleteTag={onDelete}
                    />
                )}
                <div className="list-field-button" style={{display:(addFlag=='block'?'none':'inline-block')}}>
                    <button onClick={this.handleAddTag.bind(this)}>+</button>
                </div>
            </div>
        )
    }
}
