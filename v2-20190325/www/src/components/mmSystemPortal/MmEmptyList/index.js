import React, { Component } from 'react'
import './index.css'
import ButtonBox from '../../shareComponent/ButtonBox';
import {GUIDE_TEXT}  from '../../../constants/ConstantData'
import TipBubble from '../../../components/shareComponent/TipBubble'

export default class MmEmptyList extends Component {
    render() {
        let {actions} = this.props;
        return (
            <div className='MmEmptyList'>
                <div className="TmEmptyList-content">
                    <div className="TmEmptyList-content-title">
                        朋友圈内容支持以下素材类型
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
                    </div>
                    {/* <div className="TmEmptyList-content-text">
                        <p className="TmEmptyList-content-text-item">朋友圈任务的创建流程：编辑需要投放的素材投放</p>
                        <p className="TmEmptyList-content-text-item">你可以根据自己的需求投放文字、图片、H5链接哦～</p>
                    </div> */}
                    <div className="TmEmptyList-content-create">
                    <div className='guideButton'>
                        <ButtonBox
                                btnTxt={'发朋友圈'}
                                isCancel={false}
                                btnStyle={{
                                    position: 'relative',
                                    zIndex: 2
                                }}
                                btnFunc={()=>{
                                    actions.goTo('/v2/MMScope/build?flag=new')
                                }}
                            />
                        <div className="wave-square"></div>
                        <TipBubble tipData ={GUIDE_TEXT.MM_BUILD} styles={{left:'0',top:'56px'}}/>
                    </div>
                    </div>
                </div>
            </div>
        )
    }
}
