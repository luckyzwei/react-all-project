import React, { Component } from 'react'
import './index.css'
import {tongji} from '../../../funStore/tongji'

export class GtCard extends Component {
    constructor() {
        super();
        this.state = {
        }
    }
    goEditPage = () => {
        const {data,actions} = this.props
        actions.goTo(`/v2/GIScope/edit/${data.id}/page`)
    }
    goEditRule = () => {
        const {data,actions} = this.props
        actions.goTo(`/v2/GIScope/edit/${data.id}/rule`)
    }
    render() {
        const {data,showQRcode,actions} = this.props
        let bgurl = data.backgroundPicUrl?data.backgroundPicUrl:'http://saas-1252311027.cossh.myqcloud.com/cloud/images/bg/phongbg.png'
        let _DESCRIPTION = data.template.templateItems.find(v => v.code == 'DESCRIPTION') //活动说明
        let _H5_FORM_TITLE = data.template.templateItems.find(v => v.code == 'H5_FORM_TITLE') //标题
        return (
            <div className="GtItem">
                <div className="gtitem-bg-dom" style={{background: 'url('+bgurl+') 0 0/cover no-repeat'}}>
                    {
                       _DESCRIPTION?
                        <div className="gtitem-dom-rule">{_DESCRIPTION.label}></div>
                        :''
                    }
                    {
                        _H5_FORM_TITLE?
                            <div className="gtitem-dom-title" style={eval('('+_H5_FORM_TITLE.css+')')}>{_H5_FORM_TITLE.label}</div>
                        :''
                    }
                    <div className="gtitem-dom-select-box">
                    {
                        data.template.templateItems.map(v => {
                            return v.type != 7&&v.type != 13&&v.type != 14&&v.type != 15&&<div className="gtitem-dom-select">{v.name}{v.type == 0?'':<span>﹀</span>}</div>
                        })
                    }                    
                    </div>
                    <div className="gtitem-bg-shadow">
                        <div className="gtitem-dom-type">精准入群</div>
                    </div>
                </div>
                <div className="gtitem-title">{data.name}</div>
                <div className="gtitem-control-box">
                    <div className="gtitem-rule control-item" onClick={this.goEditRule}>
                        <em></em>
                        <span>修改规则</span>
                    </div>
                    <div className="gtitem-line"></div>
                    <div className="gtitem-edit control-item" onClick={this.goEditPage}>
                        <em></em>
                        <span>编辑</span>
                    </div>
                    <div className="gtitem-line"></div>
                    <div className="gtitem-qrcode control-item" onClick={() => showQRcode(data.id,data.name)}>
                        <em></em>
                        <span>二维码</span>
                    </div>
                </div>
            </div>
        )
    }
}

export class GtCardFast extends Component {
    constructor() {
        super();
        this.state = {
        }
    }
    goEditPage = () => {
        const {data,actions} = this.props
        actions.goTo(`/v2/GIScope/edit/${data.id}/page`)
    }
    render() {
        const {data,showQRcode,actions} = this.props
        let H5_PAGE_TITLE = data.template.templateItems.find(v => v.code == 'H5_PAGE_TITLE') //标题
        let H5_GROUP_DESCRIBE = data.template.templateItems.find(v => v.code == 'H5_GROUP_DESCRIBE') //群介绍
        let bgurl = data.backgroundPicUrl?data.backgroundPicUrl:'http://saas-1252311027.cossh.myqcloud.com/cloud/images/bg/phongbg.png'
        return (
            <div className="GtItem">
                <div className="gtitem-bg-dom" style={{background: 'url('+bgurl+') 0 0/cover no-repeat'}}>
                    <div className="gtitem-bg-shadow">
                        {
                            H5_PAGE_TITLE?
                            <div className="gtitem-dom-title" style={eval('('+H5_PAGE_TITLE.css+')')}>{H5_PAGE_TITLE.label}</div>
                            :''
                        }
                        <div className="gtitem-dom-introduction-box">
                            <span className="gtitem-dom-introduction-title">群介绍</span>
                        {
                            H5_GROUP_DESCRIBE?
                                <div className="gtitem-dom-introduction" style={eval('('+H5_GROUP_DESCRIBE.css+')')}>{H5_GROUP_DESCRIBE.label}</div>
                            :''
                        }                    
                        </div>
                        <div className="gtitem-dom-type fast">快速入群</div>
                    </div>
                </div>
                <div className="gtitem-title">{data.name}</div>
                <div className="gtitem-control-box">
                    <div className="gtitem-edit control-item" onClick={this.goEditPage}>
                        <em></em>
                        <span>编辑</span>
                    </div>
                    <div className="gtitem-line"></div>
                    <div className="gtitem-qrcode control-item" onClick={() => showQRcode(data.id,data.name)}>
                        <em></em>
                        <span>二维码</span>
                    </div>
                </div>
            </div>
        )
    }
}