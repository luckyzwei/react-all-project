/**
 * Created by jiayi.hu on 5/26/17.
 * 废弃代码
 */

import React, { Component } from 'react'

export default class BubbleGroupItem extends Component {
    render(){
        return(
            <div className="bubbleGroupItem">
                <div className="bubbleGroupItem-field-leftButton">
                    <div className = 'button button-groupInfo'>群信息</div>
                </div>
                <div className="bubbleGroupItem-field-rightButton">
                    <div className = 'button button-groupData'>群数据</div>
                </div>
            </div>
        )
    }
}
