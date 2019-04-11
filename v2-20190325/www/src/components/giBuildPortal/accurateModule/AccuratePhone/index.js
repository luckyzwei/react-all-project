/**
 * 创建时间:2018-08-31 11:26:02
 * 作者：sufei  Xerath
 * 邮箱：fei.su@gemii.cc
 * 版本号：1.0
 * @版权所有
 **/
import React, { Component } from 'react'
import './index.css'
import TemplateSort from './TemplateSort'

export default class AccuratePhone extends Component {
    constructor() {
        super();
        this.state = {
             
        }
    }
    render() {

        let {params,sortItemHandle,selectEditItem,selectItem} = this.props
        let templateItems = params.template.templateItems
        let templateId = params.template.id
        let _DESCRIPTION = templateItems.find(v => v.code =='DESCRIPTION') //活动说明
        let _H5_FORM_TITLE = templateItems.find(v => v.code =='H5_FORM_TITLE') //标题
        let _SUBMIT = templateItems.find(v => v.code =='SUBMIT') //提交按钮
        let _TERMS = templateItems.find(v => v.code == 'TERMS') //协议
        return (
            < div className="gi-accurate-step2-left" >
                <h1 className="gi-accurate-step2-left-title">页面预览</h1>
                <div className="gi-accurate-step2-left-content">
                    <div className='contentBox' style={{background: `url(${params.backgroundPicUrl}) no-repeat center/cover`}}>
                        <div className='contentBg'></div>
                        <div className='activityRule-row' >
                            {
                                //活动说明
                                _DESCRIPTION 
                                ?<div className={selectItem.code=='DESCRIPTION'?"shape-control shape-control-select":"shape-control"}>
                                    <div className="activityRule" onClick={()=>{selectEditItem(_DESCRIPTION)}}>
                                        {_DESCRIPTION.label}>
                                    </div> 
                                    <div className="shape-control-rect shape-control-rect-left-top"></div>
                                    <div className="shape-control-rect shape-control-rect-top"></div>
                                    <div className="shape-control-rect shape-control-rect-right-top"></div>
                                    <div className="shape-control-rect shape-control-rect-right"></div>
                                    <div className="shape-control-rect shape-control-rect-right-bottom"></div>
                                    <div className="shape-control-rect shape-control-rect-bottom"></div>
                                    <div className="shape-control-rect shape-control-rect-left-bottom"></div>
                                    <div className="shape-control-rect shape-control-rect-left"></div>
                                </div>  
                                : ''
                            }
                        </div>
                        <div className="activityName-row">
                            {
                                 //标题
                                _H5_FORM_TITLE
                                ?<div className={selectItem.code=='H5_FORM_TITLE'?"shape-control shape-control-select":"shape-control"}>
                                    <div className="activityName" style={eval('('+_H5_FORM_TITLE.css+')')} onClick={()=>{selectEditItem(_H5_FORM_TITLE)}}>
                                        {_H5_FORM_TITLE.label}
                                    </div>
                                    <div className="shape-control-rect shape-control-rect-left-top"></div>
                                    <div className="shape-control-rect shape-control-rect-top"></div>
                                    <div className="shape-control-rect shape-control-rect-right-top"></div>
                                    <div className="shape-control-rect shape-control-rect-right"></div>
                                    <div className="shape-control-rect shape-control-rect-right-bottom"></div>
                                    <div className="shape-control-rect shape-control-rect-bottom"></div>
                                    <div className="shape-control-rect shape-control-rect-left-bottom"></div>
                                    <div className="shape-control-rect shape-control-rect-left"></div>
                                </div>  
                                :''
                            }
                        </div>
                        <TemplateSort templateId={templateId} templateItems={templateItems} clickHandle={(item)=>{selectEditItem(item)}} sortItemHandle={sortItemHandle} selectItem={selectItem}/>
                        <div className="row-agreement" >
                            {
                                //用户协议
                                _TERMS 
                                ?<div className={selectItem.code=='TERMS'?"shape-control shape-control-select":"shape-control"}>
                                    <div style={{ display: 'flex', alignItems: 'center' }} onClick={()=>{selectEditItem(_TERMS)}}>
                                        <span className='row-agreement-icon'></span>
                                        {_TERMS.label}
                                    </div>
                                    <div className="shape-control-rect shape-control-rect-left-top"></div>
                                    <div className="shape-control-rect shape-control-rect-top"></div>
                                    <div className="shape-control-rect shape-control-rect-right-top"></div>
                                    <div className="shape-control-rect shape-control-rect-right"></div>
                                    <div className="shape-control-rect shape-control-rect-right-bottom"></div>
                                    <div className="shape-control-rect shape-control-rect-bottom"></div>
                                    <div className="shape-control-rect shape-control-rect-left-bottom"></div>
                                    <div className="shape-control-rect shape-control-rect-left"></div>
                                </div>  
                                : ''
                            }
                        </div>
                        {
                            // 提交按钮
                            _SUBMIT 
                            ?<div className="row-confirm" onClick={()=>{selectEditItem(_SUBMIT)}}>
                                <div className={selectItem.code=='SUBMIT'?"shape-control shape-control-select":"shape-control"}>
                                    <div className='confrim' style={eval('('+_SUBMIT.css+')')}>
                                        {_SUBMIT.label}
                                    </div>
                                    <div className="shape-control-rect shape-control-rect-left-top"></div>
                                    <div className="shape-control-rect shape-control-rect-top"></div>
                                    <div className="shape-control-rect shape-control-rect-right-top"></div>
                                    <div className="shape-control-rect shape-control-rect-right"></div>
                                    <div className="shape-control-rect shape-control-rect-right-bottom"></div>
                                    <div className="shape-control-rect shape-control-rect-bottom"></div>
                                    <div className="shape-control-rect shape-control-rect-left-bottom"></div>
                                    <div className="shape-control-rect shape-control-rect-left"></div>
                                </div>  
                            </div> 
                            : ""
                        }
                    </div>
                </div>
            </div >
        )
    }
}
