import React,{Component} from 'react'
import promiseXHR from '../../funStore/ServerFun'
import AuthProvider from '../../funStore/AuthProvider'
import {API_PATH} from '../../constants/OriginName'
import LoadingAnimationS from '../shareComponent/LoadingAnimationS';

export default class Overview extends Component {
    constructor(props){
        super(props)
        this.state = {
            loading: props.overviewData===null?true:false,
            data: props.overviewData
        }
    }
    componentDidMount(){
        const {data,loading} = this.state
        const {overviewData,setOverviewData} = this.props
        if(overviewData===null){
            const url=API_PATH + '/groupadmin-api/authsec/groupadmin/robot/active/group/info';
            AuthProvider.getAccessToken()
                .then((resolve,reject)=>{
                    return promiseXHR(url,{type:'Bearer',value:resolve},null,'GET')
                })
                .then((res)=>{
                    const resData=JSON.parse(res);
                    if(resData.resultCode=='100'){
                        this.setState({
                            data:resData.resultContent,
                            loading: false
                        })
                        setOverviewData(resData.resultContent)
                    }
                })
        }
    }
    render(){
        const {loading,data} = this.state 
        const {changeView,overviewData,setOverviewData} =this.props
        return (
            <div className='rm-overview'>
                {loading?<LoadingAnimationS />:''}
                <div className="dataRow">
                    <div className="groupNum">
                        <div className="item">
                            <div className="name">今日可导入群(个)</div>
                            <div className="num">{data&&data.dayActiveNum?data.dayActiveNum:0}</div>
                        </div>
                        <div className="line"></div>
                        <div className="item">
                            <div className="name">总计可导入群(个)</div>
                            <div className="num">{data&&data.totalActiveNum?data.totalActiveNum:0}</div>
                        </div>
                    </div>
                    <div className="robotNum">
                        <div className="item">
                            <div className="name">小助手数量(个)</div>
                            <div className="num">{data&&data.robotNum?data.robotNum:0}</div>
                        </div>
                        <div className="item">
                            <div className="robotListBtn" onClick={()=>{changeView('ROBOTLIST')}}>小助手列表</div>
                        </div>
                    </div>
                </div>
                <div className="detatilBox">
                    <div className="title">微信扫码导入群</div>
                    <div className="codeBox">
                        <div className="qrBox">
                            <img className='qr' src={data?data.qrCode:''} alt=""/>
                        </div>
                        <div className="validate">验证码：<span style={{color:'#58A7F8',fontSize: '24px'}}>{data&&data.valCode?data.valCode:'******'}</span></div>
                    </div>
                    <div className="stepBox">
                        <div className="stepBoxTitle">如何导入群：</div>
                        <div className='steps'>
                            <div className="step">
                                <span className='stepNum'>1</span>
                                扫码获取小助手二维码
                            </div>
                            <div className="stepArrow">></div>
                            <div className="step">
                                <span className='stepNum'>2</span>
                                添加小助手为好友
                            </div>
                            <div className="stepArrow">></div>
                            <div className="step">
                                <span className='stepNum'>3</span>
                                发送当前页面的验证码给小助手
                            </div>
                            <div className="stepArrow">></div>
                            <div className="step">
                                <span className='stepNum'>4</span>
                                将小助手拉入微信群内即可
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}