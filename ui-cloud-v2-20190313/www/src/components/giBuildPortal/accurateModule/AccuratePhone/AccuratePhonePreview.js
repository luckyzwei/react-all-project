import React,{Component} from 'react'
import './index.css'
import {TextInputPreview,SelectInputPreview,PhoneInputPreview} from './unit'

const component = (item) => {
    if(item.code=='PHONE'){
        // 手机号码展示
        return <PhoneInputPreview item={item}/>
    }else{
        switch (item.type) {
            case 0: //文本输入框
                return <TextInputPreview item={item}/>
            case 1: //下拉框
                return <SelectInputPreview item={item}/>
            case 2: //日期,下拉框形式
                return <SelectInputPreview item={item}/>
            default:
                return <SelectInputPreview item={item}/>
        }
    }
  }

export default class AccuratePhonePreview extends Component {
    render(){
        let {pageData} = this.props
        let templateItems = pageData.template.templateItems
        let _DESCRIPTION = templateItems.find(v => v.code =='DESCRIPTION') //活动说明
        let _H5_FORM_TITLE = templateItems.find(v => v.code =='H5_FORM_TITLE') //标题
        let _SUBMIT = templateItems.find(v => v.code =='SUBMIT') //提交按钮
        let _TERMS = templateItems.find(v => v.code == 'TERMS') //协议
        templateItems = templateItems.filter(v => v.code !='DESCRIPTION'&&v.code !='H5_FORM_TITLE'&&v.code !='SUBMIT'&&v.code != 'TERMS')
        return (
            <div className="gi-accurate-step2-left" >
            <h1 className="gi-accurate-step2-left-title">入群页面</h1>
            <div className="gi-accurate-step2-left-content">
                <div className='contentBox' style={{background: `url(${pageData.backgroundPicUrl}) no-repeat center/cover`}}>
                    <div className='activityRule-row' >
                        {
                            //活动说明
                            _DESCRIPTION 
                            ?<div className="activityRule">
                                {_DESCRIPTION.label}>
                            </div> 
                            : ''
                        }
                    </div>
                    <div className="activityName-row">
                        {
                             //标题
                            _H5_FORM_TITLE
                            ?<div className="activityName" style={eval('('+_H5_FORM_TITLE.css+')')}>
                                {_H5_FORM_TITLE.label}
                            </div>
                            :''
                        }
                    </div>
                    <div className='contentHeader'>
                        {
                            templateItems.map((item, i) => (
                                component(item)
                            ))
                        }
                    </div>
                    <div className="row-agreement" >
                        {
                            //用户协议
                            _TERMS 
                            ?
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <span className='row-agreement-icon'></span>
                                {_TERMS.label}
                            </div>
                            : ''
                        }
                    </div>
                    {
                        // 提交按钮
                        _SUBMIT 
                        ?<div className="row-confirm">
                            <div className='confrim' style={eval('('+_SUBMIT.css+')')}>
                                {_SUBMIT.label}
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