
import React, { Component } from 'react'
import './index.css'
import ButtonBox from '../../shareComponent/ButtonBox';
import {GUIDE_TEXT}  from '../../../constants/ConstantData'
import TipBubble from '../../../components/shareComponent/TipBubble'

export default class TmEmptyList extends Component {
    render() {
        let {actions} = this.props;
        return (
            <div className='TmEmptyList'>
                <div className="TmEmptyList-content">
                    <div className="TmEmptyList-content-title">
                        我们支持以下素材类型
                    </div>
                    <div className="TmEmptyList-content-details">
                        <aside className="TmEmptyList-content-details-text TmEmptyList-content-details-item">
                            <span className="img"></span>
                            <span className="title">文字</span>
                        </aside>
                        <aside className="TmEmptyList-content-details-img TmEmptyList-content-details-item">
                            <span className="img"></span>
                            <span className="title">图片</span>
                        </aside>
                        <aside className="TmEmptyList-content-details-h5 TmEmptyList-content-details-item">
                            <span className="img"></span>
                            <span className="title">H5链接</span>
                        </aside>
                        {/* <aside className="TmEmptyList-content-details-link TmEmptyList-content-details-item">
                            <span className="title">自定义链接</span>
                            <span className="img"></span>
                        </aside> */}
                        <aside className="TmEmptyList-content-details-wx TmEmptyList-content-details-item">
                            <span className="img"></span>
                            <span className="title">小程序</span>
                        </aside>
                        {/* <div className="TmEmptyList-content-details-line-x TmEmptyList-content-details-line TmEmptyList-content-details-line-x-1"></div>
                        <div className="TmEmptyList-content-details-line-x TmEmptyList-content-details-line TmEmptyList-content-details-line-x-2"></div>
                        <div className="TmEmptyList-content-details-line-y TmEmptyList-content-details-line TmEmptyList-content-details-line-y-1"></div>
                        <div className="TmEmptyList-content-details-line-y TmEmptyList-content-details-line TmEmptyList-content-details-line-y-2"></div> */}
                    </div>
                    <div className="TmEmptyList-content-text">
                        <p className="TmEmptyList-content-text-item">群投放任务的创建流程：编辑需要投放的素材并选择投放的目标群</p>
                        <p className="TmEmptyList-content-text-item">你可以根据自己的需求投放文字、图片、H5链接、小程序哦～</p>
                    </div>
                    <div className="TmEmptyList-content-create">
                    <div className='guideButton'>
                        <ButtonBox
                                btnTxt={'去创建'}
                                isCancel={false}
                                btnStyle={{
                                    position: 'relative',
                                    zIndex: 2
                                }}
                                btnFunc={()=>{
                                    actions.goTo('/v2/MTScope/build?flag=new')
                                }}
                            />
                        <div className="wave-square"></div>
                        <TipBubble tipData ={GUIDE_TEXT.MT_BUILD} styles={{left:'0',top:'56px'}}/>
                    </div>
                    </div>
                </div>
            </div>
        )
    }
}
