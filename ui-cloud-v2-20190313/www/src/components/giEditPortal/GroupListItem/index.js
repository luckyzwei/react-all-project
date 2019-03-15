/**
 * 创建时间:2018-08-24 10:48:05
 * 作者：sufei  Xerath
 * 版本号：1.0
 **/
import React, { Component } from 'react'
import './index.css'

const statusMap = {
    '0':'未启动',
    '1':'执行中',
    '2':'执行成功',
    '4':'执行异常'
}

export default class GroupListItem extends Component {
    constructor() {
        super();
        this.state = {}
    }
    shouldComponentUpdate(){
        return false
    }
    render() {
        let { group,checkGroupHandle} = this.props;
        return (
            <div className='GroupListItem' onClick={()=>{checkGroupHandle(group)}}>
                <div className='GroupListItemLeft'>
                    <img src={`${process.env.PUBLIC_URL}/images/group/group${parseInt(10*Math.random())}.png`} alt=""/>
                    <span>{group.taskItem.name}</span>
                </div>
                <div className={group.taskItem.status == 2
                    ? "GroupListItemRight success" :
                    (group.taskItem.status == 4 ? "GroupListItemRight error" :
                        (group.taskItem.status == 1 ? "GroupListItemRight underway" :
                            (group.taskItem.status == 0 ? "GroupListItemRight unstart" : '')))}
                >
                    {
                        group.taskItem.status == 2
                            ? "成功" :
                            (group.taskItem.status == 4 ? "失败" :
                                (group.taskItem.status == 1 ? "进行中" :
                                    (group.taskItem.status == 0 ? "未启动" : '其他')))
                    }
                </div>
            </div>
        )
    }
}
