import React, {Component} from 'react'
import './index.css'

export default class HelpContent extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        const {data} = this.props
        return ( 
            <div className='hp-content'>
                {
                    data.introduction?
                    <div className="Introduction" dangerouslySetInnerHTML = {{ __html:data.introduction}}></div>
                    :''    
                }
                {
                    data.title||data.where?
                    <div className="hp-cont-title">
                    {
                        data.title?
                        <em dangerouslySetInnerHTML = {{ __html:data.title}}></em>
                        :''
                    }
                    {
                        data.where?
                        <p dangerouslySetInnerHTML = {{ __html:data.where}}></p>
                        :''
                    }
                    </div>
                    :''
                }
                {
                    data.step.map(v => (
                        <div className='hp-cont-step'>
                            <div className='hp-cont-txt'>
                                <p dangerouslySetInnerHTML = {{ __html:v.title}}></p>
                            </div>
                            {
                                v.imgUrl ? 
                                <img src={v.imgUrl} alt="" className="hp-cont-img"/>
                                :''
                            }
                        </div>
                    ))
                }
                {
                    data.remark?
                    <p style={{color: '#F75A5A',margin: '-40px 0 40px'}}>*若编辑未完成，可先选择保存草稿，草稿状态下的任务可以在列表内选择二次编辑。</p>
                    :''
                }
                </div>
        )
    }
}