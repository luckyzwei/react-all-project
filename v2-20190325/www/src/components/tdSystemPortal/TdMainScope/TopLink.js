import React,{Component} from 'react'
import { toThousands } from "../../../funStore/CommonFun";
import Loading from '../../shareComponent/Echartsloading'

const TopLink = ({topList,viewDetail,chartLoading,hasTask}) => {
    return (
        <div className='topLinkBox' style={{display:hasTask?'block':'none'}}>
            <div className="title">点击最高的链接 TOP3</div>
            <div className="linkBox">
                {
                    topList.map(v => {
                        return (
                            <div className="link" key={v.launchId} onClick={()=>{viewDetail(v.launchId)}}>
                                <div className="content">
                                    <div className="icon-top"></div>
                                    <div className="time">{v.sendingTime.slice(0,-3)}</div>
                                    <div className="linkTitle">{v.title}</div>
                                </div>
                                <div className="line"></div>
                                <div className="countBox">
                                    <div className="pv">
                                        <div className="clickCount">链接点击数(pv)</div>
                                        <div className="num">{toThousands(v.pvSum)}</div>
                                    </div>
                                    <div className="countLine"></div>
                                    <div className="uv">
                                        <div className="clickCount">用户点击数(uv)</div>
                                        <div className="num">{toThousands(v.uvSum)}</div>
                                    </div>
                                </div>
                                <div className="detail">查看详情</div>
                            </div>
                        )
                    })
                }                
                <div className="link" style={{display:topList.length<2?'block':'none',opacity:0}}></div>
                <div className="link" style={{display:topList.length<3?'block':'none',opacity:0}}></div>
            </div>
            {chartLoading?<Loading />:''}
        </div>
    )
}

export default TopLink