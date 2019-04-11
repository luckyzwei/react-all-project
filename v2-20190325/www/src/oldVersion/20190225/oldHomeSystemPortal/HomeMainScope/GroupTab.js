import React, { Component } from "react";
function mtStatus(str) {
    switch (str) {
        case 0:
            return "草稿"
        case 5:
            return "发送失败"
        case 6:
            return "未发送"
        default:
            return "已发送"
    }
}

function mtTime(str) {
    let date = new Date(str);
    let Y = date.getFullYear();
    let M = date.getMonth() + 1;
    let D = date.getDate();
    let h = date.getHours();
    let m = date.getMinutes();
    return [Y, M, D].map(formatNumber).join('-') + ' ' + [h, m].map(formatNumber).join(':')
}
function formatNumber(n) {
    n = n.toString()
    return n[1] ? n : '0' + n
}
export const WordTab =({data})=> {
    return (
        <ul className='word-tab'>
            {
                data.map((item,index)=>{
                    switch (index){
                        case 0:
                            return <li key={index}>
                                <span className='icon-rank icon_rank_0'/>
                                <span className='icon-name'>{item.name }({item.num})</span></li>
                        case 1:
                            return<li>
                                <span className='icon-rank icon_rank_1'/>
                                <span className='icon-name'>{item.name }({item.num})</span></li>
                        case 2:
                            return <li>
                                <span className='icon-rank icon_rank_2'/>
                                <span className='icon-name'>{item.name }({item.num})</span></li>
                        default:
                            return <li>
                                <span className='icon-img'>{index + 1}</span>
                                <span className='icon-name'>{item.name }({item.num})</span></li>
                    }
                })
            }
        </ul>
    )
}

export const ThrowTab =({data,actions})=> {
    data = data.slice(0,3)
    return (data.length > 0?
            <ul className='throw-tab'>
                {
                    data.map((v,i)=>{
                        return <li key={i} className="item">
                            <div className="statusBox">
                                <div className="time">
                                    <div className={`status ${v.status == 0 ? '' : v.status == 5 ? 'error' : v.status == 6 ? '' : 'success'}`}>
                                        {mtStatus(v.status)}
                                    </div>
                                    {mtTime(v.sendingTime)}
                                </div>
                                {
                                    (v.status!=0 && v.status!=6 && v.supportReport)
                                        ? <div className="count">
                                            <div className="icon-eye icon-home" />
                                            {v.clickNums}
                                        </div>:null
                                }

                            </div>
                            <div className="content">
                                {v.title}
                            </div>
                        </li>
                    })
                }


            </ul>:<div className='noData'>
                <div className="icon-noData-big" />
                {/* <div className="build" onClick={() => {actions.goTo('/v2/MTScope/build') }}>去创建一个</div> */}
                <p>还未投放内容哦～</p>
            </div>
    )
}
