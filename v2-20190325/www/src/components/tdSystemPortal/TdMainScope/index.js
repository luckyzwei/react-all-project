import React,{Component} from 'react'
import './index.css'
import promiseXHR from "../../../funStore/ServerFun";
import AuthProvider from "../../../funStore/AuthProvider";
import { API_PATH } from "../../../constants/OriginName";
import echarts from 'echarts'
import moment from 'moment'
import DateRange from '../../shareComponent/RangePicker'
import TopLink from './TopLink'
import LinkChart from './LinkChart'
import DownLoadModal from './DownLoadModal'
import MtCDetail from '../../mtSystemPortal/MtCDetail'


const Empty = () => {
    return (
        <div className="emptyBox">
            <img className='icon-empty' src={`${process.env.PUBLIC_URL}/images/icon/cw_notask.png`} alt=""/>
            <p className='text-empty'>你选择的日期内没有产生投放点击，请重新选择日期区间。</p>
        </div>
    ) 
}

export default class TdMainScope extends Component {
    constructor(props){
        super(props)
        this.state = {
            downLoad: false,
            chartLoading: true,
            showDetail: false,
            taskId: '',
            sign: true, //true 按任务查 false 按群查
            paramsByTask: {
                "launchId": "",
                "dateStart": "",
                "dateEnd": ""
            },
            paramsByGroup: {
                "groupId": "",
                "dateStart": "",
                "dateEnd": ""
            },
            taskList:[],
            hasTask: true,
            topList:[]
        }
    }

    componentDidMount() {
        //获取用户入群 退群数据
        let tenantId
        if(this.props.userInfo.info.userinfo){
            tenantId = this.props.userInfo.info.userinfo.tenantId
        }
        if (tenantId) {
            this.setState({
                tenantId: tenantId
            }, () => {
                this.getTaskList(tenantId,{}).then(res => {
                    res = JSON.parse(res)
                    if(res.resultCode=='100'){
                        let {paramsByTask} = this.state
                        if(res.resultContent&&res.resultContent.length>0){
                            paramsByTask.launchId = res.resultContent[0].id
                            this.setState({
                                taskList: res.resultContent.map(v =>({key:v.title,value:v.id})),
                                hasTask: res.resultContent.length>0,
                                paramsByTask
                            })
                            this.getInitData(tenantId,{sign: true,launchId:res.resultContent[0].id})
                        }else{
                            throw '任务列表为空'
                        }
                    }else{
                        throw '获取任务列表失败'
                    }
                    
                }).catch(err => {
                    this.setState({
                        chartLoading: false,
                        hasTask: false
                    })
                })
            })
        }
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        // Store prevId in state so we can compare when props change.
        if (nextProps.userInfo.info.userinfo&&nextProps.userInfo.info.userinfo.tenantId !== prevState.tenantId) {
          return {
            tenantId: nextProps.userInfo.info.userinfo.tenantId
          }
        }
        // No state update necessary
        return null;
    }

    componentDidUpdate(prevProps,prevState){
        if(this.state.tenantId!==prevState.tenantId){
            this.getTaskList(this.state.tenantId,{}).then(res => {
                res = JSON.parse(res)
                if(res.resultCode=='100'){
                    let {paramsByTask} = this.state
                    if(res.resultContent&&res.resultContent.length>0){
                        paramsByTask.launchId = res.resultContent[0].taskId
                        this.setState({
                            taskList: res.resultContent.map(v =>({key:v.title,value:v.id})),
                            hasTask: res.resultContent.length>0,
                            paramsByTask
                        })
                        this.getInitData(this.state.tenantId,{sign: true,launchId:res.resultContent[0].id})
                    }else{
                        throw '任务列表为空'
                    }
                }else{
                    throw '获取任务列表失败'
                }
                
            }).catch(err => {
                this.setState({
                    chartLoading: false,
                    hasTask: false
                })
            })
        }
    }

    showExportAsExcel=()=>{
        this.setState({
            downLoad:true
        })
    }

    hideExportAsExcel=()=>{
        this.setState({
            downLoad:false
        })
    }

    getInitData=(tenantId,params)=>{
        // {
        //     "launchId": "string",
        //     "groupId": "string",
        //     "sign": true,
        //     "dateStart": "string",
        //     "dateEnd": "string"
        //   }
        let url =`${API_PATH}/message-measure/authsec/dailyreportfast/launchData/${tenantId}`
        AuthProvider.getAccessToken().then(resolve => {
            return promiseXHR(url, { type: 'Bearer', value: resolve }, params, 'POST')
        }).then(response => {
            const resData = JSON.parse(response)
            let data = resData.resultContent
            if(resData.resultCode==100){
                this.setState({
                    chartLoading: false,
                    topList: data.topList,
                    pvSum: data.pvSum,
                    pvClickRateSum: data.pvClickRateSum,
                    uvClickRateSum: data.uvClickRateSum,
                    uvSum: data.uvSum,
                    currentGroupId: params.groupId,
                    currentLaunchId: params.launchId
                })
                this.drawChart(data.clickRateNum)
            }
        })
    }

    getTaskList = (tenantId,params) => {
        let url =`${API_PATH}/message-measure/authsec/dailyreportfast/launchList/${tenantId}`
        return AuthProvider.getAccessToken().then(resolve => {
            return promiseXHR(url, { type: 'Bearer', value: resolve }, params, 'POST')
        })
    }

    drawChart = (clickRateNum) => {
        // xData x轴
        // yData1 群总人数
        // yData2 活跃人数
        let xData = []
        let yData1 = []
        let yData2 = []
        clickRateNum.forEach(v => {
            xData.push(moment(v.staDate).format('MM/DD'))
            yData1.push(v.pvNum)
            yData2.push(v.uvNum)
        })
        let chartDom = document.getElementById('chartBox')
        if(!chartDom) return
        let myChart = echarts.init(chartDom);
        let option = {
            title: {
                textStyle: {
                    color: '#344658',
                    fontWeight: 400,
                    fontFamily: 'PingFang SC',
                    fontSize: 16,
                }
            },
            legend: {
                data: [{
                    name:'链接点击数(pv)',
                    icon:'rect'
                },{
                    name:'用户点击数(uv)',
                    icon:'rect'
                }],
                top: '1%',
                right: '180',
                itemWidth: 10,
                itemHeight: 10,
                itemGap: 18,
                textStyle: {
                    color: '#B5BDC6'
                }
            },
            xAxis: {
                type: 'category',
                data: xData,
                offset: 15,//X 轴相对于默认位置的偏移
                axisLine: {
                    lineStyle: {
                        color: '#B5BDC6'
                    }
                },
                splitLine: { show: false},
                axisTick: { show: false },
                boundaryGap: true,
            },
            yAxis: {
                type: 'value',
                axisTick: { show: false },
                splitLine: {
                    lineStyle: {
                        type: 'dashed',
                        borderColor: '#E9EBEE'
                    }
                },
                axisLine:{
                    show: false,
                    lineStyle: {
                        color: '#B5BDC6'
                    }
                }
            },
            tooltip: {
                axisPointer: {
                    type: 'line',
                    lineStyle: {
                        color: '#B5BDC6',
                        type: 'dashed'
                    }
                },
                trigger: 'axis',
                extraCssText: 'box-shadow: 0 1px 4px 0 rgba(36,36,36,0.15);padding:6px 16px',
                backgroundColor: '#485767',
                borderColor: '#485767',
                textStyle: {
                    fontSize: 12,
                    fontFamily: 'PingFang SC',
                    color: '#FFFFFF',
                    fontWeight: 400
                },
                formatter: function (datas) {
                    let index = datas[0].dataIndex
                    return `<div class='echartsTooltip'>
                                <div class='tooltip-1'>${clickRateNum[index].staDate.replace(/-/g,'/')}</div>
                                <div class='tooltip-1'>链接点击数量：${clickRateNum[index].pvNum}</div>
                                <div class='tooltip-1'>用户点击数量：${clickRateNum[index].uvNum}</div>
                            </div>`
                },
                position: function (point, params, dom, rect, size) {
                    return [point[0] - 35, point[1] - 75]
                }
            },
            grid: { left: '1%', right: '1%', bottom: '6%', containLabel: true },
            toolbox: { //可视化的工具箱
                show: true,
                itemSize: 12, //工具栏 icon 的大小
                itemGap: 6, //工具栏 icon 每项之间的间隔
                showTitle: true, //是否在鼠标 hover 的时候显示每个工具 icon 的标题
                right:30,
                feature: { //自定义的工具名字，只能以 my 开头，例如下例中的 myTool1，myTool2
                    /* '辅助线开关'*/
                    mark: {
                        show: true
                    },
                    //缩放
                    dataZoom: {
                        show: true,
                        yAxisIndex: 'none',
                        xAxisIndex: 0,
                    },
                    // 数据视图工具
                    dataView: {
                        show: true,
                        readOnly: false,
                        buttonColor: "#58A7F8",/*按钮颜色。*/ 
                        buttonTextColor: "#fff",/*按钮文本颜色。*/
                    },
                    //配置项还原。
                    restore: {
                        show: true,
                        title: '刷新',
                    },
                    //保存图片
                    saveAsImage: {
                        show: true,
                        pixelRatio: 1,/*下载清晰*/
                    },
                    brush: {
                        type: 'rect'
                    }
                }
            },
            series: [{
                name:'链接点击数(pv)',
                data: yData1,
                type: 'line',
                lineStyle: {
                    color: '#58A7F8',
                    width: 4
                },
                itemStyle: {
                    color: '#58A7F8',
                    shadowColor: 'rgba(88,167,248,0.5)',
                    shadowBlur: 10
                },
            },{
                name:'用户点击数(uv)',
                data: yData2,
                type: 'line',
                lineStyle: {
                    color: '#85D8AA',
                    width: 4
                },
                itemStyle: {
                    color: '#85D8AA',
                    shadowColor: 'rgba(133,216,170,0.5)',
                    shadowBlur: 10
                },
            }]
        };
        myChart.setOption(option);
        window.addEventListener("resize", function () {
            myChart.resize();
        });
    }
    viewDetail = (taskId) => {
        this.setState({
            taskId,
            showDetail: !this.state.showDetail
        })
    }
    tabClickHandle = (newSign) => {
        const {sign,paramsByTask,paramsByGroup,tenantId} = this.state
        if(sign==newSign){
            return
        }else{
            // update sign
            this.setState({sign:newSign,chartLoading:true})
            let params = {}
            params.sign = newSign
            if (newSign) {
                if(paramsByTask.launchId){
                    params.launchId = paramsByTask.launchId
                }
                if(paramsByTask.dateStart){
                    params.dateStart = paramsByTask.dateStart
                    params.dateEnd = paramsByTask.dateEnd
                }
            }else{
                if(paramsByGroup.groupId){
                    params.groupId = paramsByGroup.groupId
                }
                if(paramsByGroup.dateStart){
                    params.dateStart = paramsByGroup.dateStart
                    params.dateEnd = paramsByGroup.dateEnd
                }
            }
            this.getInitData(tenantId,params)
        }
    }
    dateSelectHandle = (dateArr) => {
        const {sign,paramsByGroup,paramsByTask,tenantId} = this.state
        // update date by sign
        if(sign){
            if(dateArr[0]!=''){
                paramsByTask.dateStart = dateArr[0]
                paramsByTask.dateEnd = dateArr[1]
            }
            this.setState({chartLoading:true,hasTask:true})
        }else{
            if(dateArr[0]!=''){
                paramsByGroup.dateStart = dateArr[0]
                paramsByGroup.dateEnd = dateArr[1]
            }
            this.setState({chartLoading:true,hasTask:true})
        }
        // query new data
        let params = {}
        params.sign = sign
        if(dateArr[0]!=''){
            params.dateStart = dateArr[0]
            params.dateEnd = dateArr[1]
        }
        this.getTaskList(tenantId,dateArr[0]==''?{}:{
            "dateStart": dateArr[0],
            "dateEnd": dateArr[1]
        }).then(res => {
            res = JSON.parse(res)
            if(res.resultCode=='100'){
                if(res.resultContent&&res.resultContent.length>0){
                    paramsByTask.launchId = res.resultContent[0].id
                    this.setState({
                        taskList: res.resultContent.map(v =>({key:v.title,value:v.id})),
                        hasTask: res.resultContent.length>0,
                        paramsByTask
                    })
                    this.getInitData(tenantId,{...params,launchId:res.resultContent[0].id})
                }else{
                    throw '任务列表为空'
                }
            }else{
                throw '获取任务列表失败'
            }
            
        }).catch(err => {
            this.setState({
                chartLoading: false,
                hasTask: false
            })
        })
    }
    searchByTask = (launchId) =>{
        let {sign,paramsByTask,tenantId,currentLaunchId} = this.state
        if(currentLaunchId==launchId){
            return
        }
        paramsByTask.launchId = launchId
        this.setState({paramsByTask,chartLoading:true})
        let params = {
            sign,
            launchId
        }
        if(paramsByTask.dateStart){
            params.dateStart = paramsByTask.dateStart
            params.dateEnd = paramsByTask.dateEnd
        }
        this.getInitData(tenantId,params)
    }
    searchByGroup = (groupId) => {
        let {sign,paramsByGroup,tenantId,currentGroupId} = this.state
        if(currentGroupId==groupId){
            // return
        }
        paramsByGroup.groupId = groupId
        this.setState({paramsByGroup,chartLoading:true})
        let params = {
            sign,
            groupId
        }
        if(paramsByGroup.dateStart){
            params.dateStart = paramsByGroup.dateStart
            params.dateEnd = paramsByGroup.dateEnd
        }
        this.getInitData(tenantId,params)
    }
    render(){
        const {downLoad,showDetail,taskId,sign,paramsByTask,paramsByGroup,pvSum,pvClickRateSum,uvClickRateSum,uvSum,chartLoading,topList,hasTask,taskList,currentGroupId,currentLaunchId} = this.state
        const {userInfo} = this.props
        return (
            <div className='td-container'>
                {/* <div className="tabBox">
                    <span className={sign?'tabName active':'tabName'} onClick={()=>{this.tabClickHandle(true)}}>按任务查询</span>
                    <span className="line"></span>
                    <span className={!sign?'tabName active':'tabName'} onClick={()=>{this.tabClickHandle(false)}}>按群查询</span>
                </div> */}
                <div className="operateBox">
                    <div className='downloadBtn' onClick={this.showExportAsExcel}>
                        <span className='download-icon' />
                        下载数据
                    </div>
                    <div className="dateBox">
                        <div className="label">日期：</div>
                            <DateRange 
                                key={'task'}
                                defaultValue={paramsByTask.dateStart?[moment(paramsByTask.dateStart),moment(paramsByTask.dateEnd)]:undefined}
                                disabledDate={(current)=>{return  current > new Date(new Date().getTime()- 1 * 24 * 60 * 60 * 1000) }}
                                setDateParams={this.dateSelectHandle}
                            />
                        {/* {
                            sign
                            ?<DateRange 
                                key={'task'}
                                defaultValue={paramsByTask.dateStart?[moment(paramsByTask.dateStart),moment(paramsByTask.dateEnd)]:undefined}
                                disabledDate={(current)=>{return  current > new Date(new Date().getTime()- 1 * 24 * 60 * 60 * 1000) }}
                                setDateParams={this.dateSelectHandle}
                            />
                            :<DateRange 
                                key={'group'}
                                defaultValue={paramsByGroup.dateStart?[moment(paramsByGroup.dateStart),moment(paramsByGroup.dateEnd)]:undefined}
                                disabledDate={(current)=>{return  current > new Date(new Date().getTime()- 1 * 24 * 60 * 60 * 1000) }}
                                setDateParams={this.dateSelectHandle}
                            />
                        } */}
                    </div>
                </div>
                <TopLink topList={topList} viewDetail={this.viewDetail} chartLoading={chartLoading} hasTask={hasTask}/>
                <LinkChart 
                    chartLoading={chartLoading}
                    sign={sign} 
                    pvSum={pvSum}
                    pvClickRateSum={pvClickRateSum}
                    uvClickRateSum={uvClickRateSum}
                    uvSum={uvSum}
                    paramsByTask={paramsByTask}
                    paramsByGroup={paramsByGroup}
                    hasTask={hasTask}
                    taskList={taskList}
                    searchByGroup={this.searchByGroup}
                    searchByTask={this.searchByTask}
                    currentLaunchId={currentLaunchId}
                />
                {!hasTask?<Empty />:''}
                {
                    downLoad
                    ?<DownLoadModal
                        userInfo={userInfo}
                        hideHandel={this.hideExportAsExcel}
                    />:null
                }
                {
                    showDetail?<MtCDetail detailId={taskId} viewDetail={this.viewDetail} />:''
                }
            </div>
        )
    }
}