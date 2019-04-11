import React,{Component} from 'react'
import './index.css'
import SearchInput from '../../shareComponent/SearchInput'
import { toThousands } from "../../../funStore/CommonFun"
import Loading from '../../shareComponent/Echartsloading'

const Header1 = ({taskList,searchByTask,currentLaunchId}) => {
    return (
        <div className="header">
            <div className="title">链接点击量统计</div>
            <SearchInput 
                dataList={taskList}
                label={"任务："}
                placeholder={'选择任务'}
                selectHandle={(v)=>{searchByTask(v.value)}}
                deleteFlag={true}
                inputStyle={{
                    width: '300px',
                    marginRight:'22px'
                }}
                paramDefault={taskList.length>0?taskList.find(v => v.value==currentLaunchId):undefined}
            />
        </div>
    )
}

const Header2 = ({searchByGroup}) => {
    return (
        <div className="header">
            <div className="title">链接点击量统计</div>
            <SearchInput 
                dataList={[]}
                label={"微信群："}
                placeholder={'选择群'}
                selectHandle={(v)=>{searchByGroup(v.value)}}
                allFlag={{
                    key: '全部群',
                    value: null
                }}
                deleteFlag={true}
                inputStyle={{
                    width: '300px',
                    marginRight:'22px'
                }}
            />
        </div>
    )
}

export default class LinkChart extends Component {
    render(){
        const {chartLoading,sign,pvSum,pvClickRateSum,uvClickRateSum,uvSum,hasTask,taskList,searchByGroup,searchByTask,currentLaunchId} = this.props
        return (
            <div className='linkChartBox'  style={{display:hasTask?'block':'none'}}>
                {sign?<Header1 key={chartLoading} taskList={taskList} searchByTask={searchByTask} currentLaunchId={currentLaunchId}/>:<Header2 searchByGroup={searchByGroup}/>}
                <div className="dataBox">
                    <div className="numBox">
                        <div className="numBoxItem">
                            <div className="item">
                                <div className="numName">链接点击数(pv)</div>
                                <div className="num" style={{color:'#58A7F8'}}>{toThousands(pvSum)}</div>
                            </div>
                            <div className="item">
                                <div className="numName">链接点击率</div>
                                <div className="num" style={{color:'#58A7F8'}}>{pvClickRateSum}%</div>
                            </div>
                        </div>
                        <div className="numBoxLine"></div>
                        <div className="numBoxItem">
                            <div className="item">
                                <div className="numName">用户点击数(uv)</div>
                                <div className="num" style={{color:'#6AD298'}}>{toThousands(uvSum)}</div>
                            </div>
                            <div className="item">
                                <div className="numName">用户点击率</div>
                                <div className="num" style={{color:'#6AD298'}}>{uvClickRateSum}%</div>
                            </div>
                        </div>
                    </div>
                    <div id="chartBox"></div>
                </div>
                {chartLoading?<Loading />:''}
            </div>
        )
    }
}