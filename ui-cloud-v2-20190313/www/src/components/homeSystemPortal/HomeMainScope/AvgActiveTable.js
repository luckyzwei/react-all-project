import React, { Component } from "react";
import Gauge from '../ChartPortal/Gauge';
import {Loading} from './Loading'
let titleData = [
    {
        text:'沉默',
        color:'#C0F6D7',
    },{
        text:'普通',
        color:'#91F0BC',
    }, {
        text:'活跃',
        color:'#97C8FB',
    },{
        text:'话唠',
        color:'#58A7F8',
    }
]
export default class AvgActiveTable extends Component {

    render() {
        const {avgActiveDegree,weekAvgActiveDegree,navIndex} = this.props;
        return (
            <div className="upperArea-right">

                <div className='gaugeEcharts'>
                    <div className="title">
                        群活跃度
                        <em className="icon">
                            <p className='bubble'>
                                群活跃度的计算公式为：活跃人数/群总人数。活跃人数为昨日/7天/14天说过话的总人数，并进行去重处理。
                            </p>
                        </em>
                    </div>
                    {
                        avgActiveDegree!=null?
                            <div className="gaugeBox">
                                <Gauge value={navIndex==7?weekAvgActiveDegree:avgActiveDegree}/>
                                <div className='gaugeDes'>
                                    <div className="numBox">
                                        <span className='num'>{navIndex==7?weekAvgActiveDegree:avgActiveDegree}</span> 分
                                    </div>
                                    <div>您的群活跃度分数</div>
                                    <div className='titleData'>
                                        {titleData.map((v,i)=>{return <span key={i}><em style={{background:v.color}}/>{v.text}</span>})}
                                    </div>
                                </div>
                            </div>
                            :<Loading/>
                    }
                </div>

            </div>
        )
    }
}
