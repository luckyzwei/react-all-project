import React,{Component} from 'react'
import './index.css'
import {Loading} from './Loading'

export default class UploadBtn extends Component {
    render(){
        const {loading,text,loadingText,clickHandle,propsStyle} = this.props
        return (
            <div className={loading?"public-uploadBtn loading":"public-uploadBtn"} onClick={clickHandle} style={propsStyle}>
                {loading?<Loading />:''}
                <span>{loading?loadingText:text}</span>    
            </div>
        )
    }
}