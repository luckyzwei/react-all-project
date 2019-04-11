import React,{Component} from 'react'
import TipBubble from '../../shareComponent/TipBubble'
import {GUIDE_TEXT} from '../../../constants/ConstantData'

const Empty = ({actions,hasGroup,hasData}) => {
    return (
        <div className="emptyBox">
            <img className='icon-empty' src={`${process.env.PUBLIC_URL}/images/icon/gd-noData.png`} alt=""/>
            {
                !hasGroup
                ?<p className='text-empty'>还没有入群页面，快去新建一个吧~</p>
                :!hasData?<p className='text-empty'>当前查询没有数据，请重新选择时间段查询数据~</p>:''
            }
            {
                !hasGroup
                ?<div className="btn-empty" onClick={()=>{actions.goTo('/v2/GIScope')}}>
                    <span>去新建</span>
                    <div className="wave-square"></div>
                    <TipBubble tipData ={GUIDE_TEXT.GI_BUILD} styles={{left:0,top:'56px'}}/>
                </div>
                :''
            }
        </div>
    ) 
}

export default Empty