/**
 * Created by jiayi.hu on 9/13/17.
 */
import React, { Component, PropTypes } from 'react'
import MainMemberBox from './MainMemberBox'

export default class MainMemberWrapper extends Component {
    constructor(){
        super()
    }
    render(){
        const {textItem,actions} = this.props
        window.debugger(textItem)
        return(
            <div style={{height:'100%',position:'relative',textAlign:'-webkit-center'}}>
                {
                    textItem.map((item,i)=>(
                        <MainMemberBox item={item}
                                       actions={actions}/>
                    ))
                }
            </div>
        )
    }
}