import React,{Component} from 'react'
import './index.css'
import promiseXHR from "../../../funStore/ServerFun";
import AuthProvider from "../../../funStore/AuthProvider";
import { API_PATH } from "../../../constants/OriginName";
import DataTable from './DataTable'
import SearchBox from './SearchBox'
import DownLoadModal from '../DownLoadModal'
import echarts from 'echarts'
import {userData} from '../mocaData'
import moment from 'moment'
import Loading from '../../shareComponent/Echartsloading'

const xTime = ['00:00','01:00','02:00','03:00','04:00','05:00','06:00','07:00','08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00','21:00','22:00','23:00']

export default class HomeMainScope extends Component {
    constructor(props) {
        super(props)
        this.state = {
            groupData: '',
            dateArr: [],
            downLoad:false,
            userId:'',
            params: {
                "groupList": [],
                "dateStart": "",
                "dateEnd": "",
            },
            msgDataRobotFlag: false,
            timeDataRobotFlag: false,
            msgDataLoading: true,
            userDataLoading: true,
            timeDataLoading: true
        }
    }

    componentDidMount() {
        //获取用户入群 退群数据
        let userId 
        if(this.props.userInfo.info.userinfo){
            userId = this.props.userInfo.info.userinfo.userId;
        }
        if (userId) {
            this.setState({
                userId: userId
            }, () => {
                this.getDailyReportData(userId);
                this.getMsgData(userId,{groupList:[],sign:false})
                this.getUserData(userId,{groupList:[],sign:false})
                this.getTimeData(userId,{groupList:[],sign:false})
            })
        }
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        // Store prevId in state so we can compare when props change.
        if (nextProps.userInfo.info.userinfo&&nextProps.userInfo.info.userinfo.userId !== prevState.userId) {
          return {
            userId: nextProps.userInfo.info.userinfo.userId
          }
        }
        // No state update necessary
        return null;
    }

    componentDidUpdate(prevProps,prevState){
        if(this.state.userId!==prevState.userId){
            this.getDailyReportData(this.state.userId)
            this.getMsgData(this.state.userId,{groupList:[],sign:false})
            this.getUserData(this.state.userId,{groupList:[],sign:false})
            this.getTimeData(this.state.userId,{groupList:[],sign:false})
        }
    }

    getDailyReportData = (id) => {
        // 获取每日租户群相关数据
        let url = `${API_PATH}/message-measure/authsec/dailyreportfast/new/${id}`
        AuthProvider.getAccessToken().then(resolve => {
            return promiseXHR(url, { type: 'Bearer', value: resolve }, null, 'get')
        }).then(response => {
            let result = JSON.parse(response);
            if (result.resultCode === '100') {
                this.setState({
                    groupData:result.resultContent
                })            
            }
        })
    }
    getMsgData = (id,params) => {
        // 获取每日租户下群消息数据，消息类型
        // {
        //     "groupList": [
        //       "string"
        //     ],
        //     "dateStart": "string",
        //     "dateEnd": "string",
        //     "sign": "string"
        //   }
        let url = `${API_PATH}/message-measure/authsec/dailyreportfast/msgDataType/${id}`
        AuthProvider.getAccessToken().then(resolve => {
            return promiseXHR(url, { type: 'Bearer', value: resolve }, params, 'post')
        }).then(response => {
            let result = JSON.parse(response);
            if (result.resultCode === '100') {
                this.setState({
                    msgDataLoading: false
                }) 
                this.drawMsgChart(result.resultContent.msg_type) 
                this.drawMsgTypeChart(result.resultContent.msg_type_sum)          
            }
        }).catch(err => {
            this.setState({
                msgDataLoading: false
            }) 
        })
    }

    getUserData = (id,params) => {
        // 获取每日租户下群消息数据，消息类型
        // {
        //     "groupList": [
        //       "string"
        //     ],
        //     "dateStart": "string",
        //     "dateEnd": "string",
        //     "sign": "string"
        //   }
        let url = `${API_PATH}/message-measure/authsec/dailyreportfast/memData/${id}`
        AuthProvider.getAccessToken().then(resolve => {
            return promiseXHR(url, { type: 'Bearer', value: resolve }, params, 'post')
        }).then(response => {
            let result = JSON.parse(response);
            // let result = userData
            if (result.resultCode === '100') {
                this.setState({
                    userDataLoading: false
                })
                this.drawUserChart(result.resultContent)
                // this.drawUserChart([{"staDate":"2019-04-02","memCnt":427397,"activeCnt":7722},{"staDate":"2019-04-03","memCnt":427348,"activeCnt":7482},{"staDate":"2019-04-04","memCnt":427152,"activeCnt":7956},{"staDate":"2019-04-05","memCnt":427061,"activeCnt":7688},{"staDate":"2019-04-06","memCnt":427025,"activeCnt":7499},{"staDate":"2019-04-07","memCnt":427174,"activeCnt":7320},{"staDate":"2019-04-08","memCnt":427265,"activeCnt":6762}])
            }
        }).catch(err => {
            this.setState({
                userDataLoading: false
            })
        })
    }

    getTimeData = (id,params) => {
        // 获取每日租户下分时消息数
        // {
        //     "groupList": [
        //       "string"
        //     ],
        //     "dateStart": "string",
        //     "dateEnd": "string",
        //     "sign": "string"
        //   }
        let url = `${API_PATH}/message-measure/authsec/dailyreportfast/msgData/${id}`
        AuthProvider.getAccessToken().then(resolve => {
            return promiseXHR(url, { type: 'Bearer', value: resolve }, params, 'post')
        }).then(response => {
            let result = JSON.parse(response);
            if (result.resultCode === '100') {
                this.setState({
                    timeDataLoading: false
                })   
                this.drawTimeChart(result.resultContent)        
            }
        }).catch(err => {
            this.setState({
                timeDataLoading: false
            })   
        })
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

    drawMsgTypeChart = (msgTypeData) => {
        let data = [{
                name: '文本',
                value: msgTypeData.textCnt,
            },
            {
                name: '图片',
                value: msgTypeData.photoCnt,
            },
            {
                name: '链接',
                value: msgTypeData.urlCnt,
            },
            {
                name: '小程序',
                value: msgTypeData.orderCnt,
            },
            {
                name: '其它',
                value: msgTypeData.sulplusCnt,
            }
        ]
        let all = msgTypeData.msgCnt>0?msgTypeData.msgCnt:1
        // 群消息类型占比
        let chartDom = document.getElementById('messageTypeData')
        if(!chartDom) return
        let myChart = echarts.init(chartDom);
        let option = { 
            legend: {
                x : 'center',
                y : 'bottom',
                width: '90%',
                padding: [10, 0, 40,0],
                itemGap: 20,
                itemWidth: 10,
                itemHeight: 10,
                data:['文本','图片','链接','小程序','其它'],
                formatter: function (name) {
                    let item = data.find(v => v.name==name)
                    return `${name} ${Math.round(item.value/all*10000)/100}%`
                }
            },
            // calculable : true,
            series: [
                {
                    name:'访问来源',
                    type:'pie',
                    center: ['50%', '35%'],
                    radius: ['30%', '50%'],
                    avoidLabelOverlap: false,
                    label: {
                        normal: {
                            show: false,
                            position: 'center',
                        },
                        emphasis: {
                            show: true,
                            // textStyle: {
                            //     fontSize: '30',
                            //     fontWeight: 'bold'
                            // }
                            formatter: '{c|{c}}\n{b|{b}}',
                            rich: {
                                c: {
                                    fontSize: 22,
                                    lineHeight: 28,
                                    color: '#344658'
                                },
                                b:{
                                    fontSize: 12,
                                    color: '#B5BDC6',
                                }
                            }
                        },
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data:data,
                    animation: true
                }
            ],
            color: ['#288BF2','#85D8AA', '#FF99A5', '#F8B779', '#DADEE2']
        };        
        myChart.setOption(option);
        window.addEventListener("resize", function () {
            myChart.resize();
        });
    }

    drawMsgChart = (msgData) => {
        // xData x轴
        // yData 消息数
        // 判断是day还是hour来做x轴
        let isDay = true
        if(new Date(msgData[msgData.length-1].staDate)-new Date(msgData[0].staDate)<2*24*3600*1000){
            isDay = false
        }
        let xData = []
        let yData = []
        msgData.forEach((v,i) => {
            xData.push(moment(v.staDate).format('MM/DD')+(isDay?'':' '+xTime[i%24]))
            yData.push(v.msgCnt)
        })
        let chartDom = document.getElementById('messageCountData')
        if(!chartDom) return
        let myChart = echarts.init(chartDom);
        let option = {
            title: {
                text: '消息数据',
                textStyle: {
                    color: '#344658',
                    fontWeight: 400,
                    fontFamily: 'PingFang SC',
                    fontSize: 16,
                }
            },
            legend: {
                data: [{
                    name:'消息数据量',
                    icon:'rect'
                }],
                top: '1%',
                right: '180',
                itemWidth: 10,
                itemHeight: 10,
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
                                <div class='tooltip-1'>${msgData[index].staDate.replace(/-/g,'/')} ${isDay?'':xTime[index%24]}</div>
                                <div class='tooltip-1'>总计：${msgData[index].msgCnt}</div>
                                <div class='tooltip-1'>文本：${msgData[index].textCnt}</div>
                                <div class='tooltip-1'>图片：${msgData[index].photoCnt}</div>
                                <div class='tooltip-1'>小程序：${msgData[index].orderCnt}</div>
                                <div class='tooltip-1'>链接：${msgData[index].urlCnt}</div>
                                <div class='tooltip-1'>其它：${msgData[index].sulplusCnt}</div>
                            </div>`
                },
                position: function (point, params, dom, rect, size) {
                    return [point[0] - 35, point[1] - 150]
                }
            },
            grid: { left: '1%', right: '1%', bottom: '6%', containLabel: true },
            toolbox: { //可视化的工具箱
                show: true,
                itemSize: 12, //工具栏 icon 的大小
                itemGap: 6, //工具栏 icon 每项之间的间隔
                showTitle: true, //是否在鼠标 hover 的时候显示每个工具 icon 的标题
                right: 30,
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
                        buttonColor: "#58A7F8",
                        /*按钮颜色。*/ buttonTextColor: "#fff",
                        /*按钮文本颜色。*/
                    },
                    //配置项还原。
                    restore: {
                        show: true,
                        title: '刷新',
                    },
                    //保存图片
                    saveAsImage: {
                        show: true,
                        pixelRatio: 1,
                        /*下载清晰*/
                    },
                    // myTool1: { //自定义
                    //     show: true,
                    //     title: '下载',
                    //     icon: 'image://' + process.env.PUBLIC_URL + '/images/icon/save_excel.png',
                    //     onclick: () => {
                    //         let a = document.createElement('a');
                    //         a.href = '';
                    //         a.click();
                    //     }
                    // },
                    brush: {
                        type: 'rect'
                    }
                }
            },
            series: [{
                name:'消息数据量',
                data: yData,
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
            }]
        };
        myChart.setOption(option);
        window.addEventListener("resize", function () {
            myChart.resize();
        });
    }

    drawUserChart = (userChartData) => {
        // xData x轴
        // yData1 群总人数
        // yData2 活跃人数
        let xData = []
        let yData1 = []
        let yData2 = []
        let sumMax = 5, actMax=5,sumMin=999999999999,actMin=999999999999
        userChartData.forEach(v => {
            xData.push(moment(v.staDate).format('MM/DD'))
            yData1.push(v.memCnt)
            yData2.push(v.activeCnt)
            if(v.memCnt>sumMax){
                sumMax=v.memCnt+100
            }
            if(v.activeCnt>actMax){
                actMax=v.activeCnt+Math.pow(10,String(v.activeCnt).length-1)
            }
            if(v.memCnt<sumMin){
                sumMin=v.memCnt-100
            }
            if(v.activeCnt<actMin){
                actMin=v.activeCnt-Math.pow(10,String(v.activeCnt).length-1)
            }
        })
        sumMin = sumMin<0?0:sumMin
        actMin = actMin<0?0:actMin
        let chartDom = document.getElementById('userCountData')
        if(!chartDom) return
        let myChart = echarts.init(chartDom);
        let option = {
            title: {
                text: '用户数据',
                textStyle: {
                    color: '#344658',
                    fontWeight: 400,
                    fontFamily: 'PingFang SC',
                    fontSize: 16,
                }
            },
            legend: {
                data: [{
                    name:'群总人数',
                    icon:'rect'
                },{
                    name:'活跃人数',
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
            yAxis: [{
                name: '群总人数',
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
                },
                min: sumMin,
                max: sumMax,
                interval: Math.ceil((sumMax-sumMin)/5)
            },{
                name: '活跃人数',
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
                },
                min: actMin,
                max: actMax,
                interval: Math.ceil((actMax-actMin)/5)
            }],
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
                                <div class='tooltip-1'>${userChartData[index].staDate.replace(/-/g,'/')}</div>
                                <div class='tooltip-1'>活跃用户数量：${userChartData[index].activeCnt}</div>
                                <div class='tooltip-1'>用户数量：${userChartData[index].memCnt}</div>
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
                name:'群总人数',
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
                name:'活跃人数',
                data: yData2,
                type: 'line',
                yAxisIndex:1,
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

    drawTimeChart = (timeData) => {
        // xData x轴
        // yData 消息数
        let xData = xTime
        let yData = timeData
        let chartDom = document.getElementById('timeMessageCountData')
        if(!chartDom) return
        let myChart = echarts.init(chartDom);
        let option = {
            title: {
                text: '分时消息分布  03/03-03/09',
                textStyle: {
                    color: '#344658',
                    fontWeight: 400,
                    fontFamily: 'PingFang SC',
                    fontSize: 16,
                }
            },
            legend: {
                data: [{
                    name:'平均消息数',
                    icon:'rect'
                }],
                top: '1%',
                right: '180',
                itemWidth: 10,
                itemHeight: 10,
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
                                <div class='tooltip-1'>${xData[index]} - ${index==0?'00:59':xData[index].replace('00','59')}</div>
                                <div class='tooltip-1'>平均消息数：${yData[index]}</div>
                            </div>`
                },
                position: function (point, params, dom, rect, size) {
                    return [point[0] - 35, point[1] - 60]
                }
            },
            grid: { left: '1%', right: '1%', bottom: '6%', containLabel: true },
            toolbox: { //可视化的工具箱
                show: true,
                itemSize: 12, //工具栏 icon 的大小
                itemGap: 6, //工具栏 icon 每项之间的间隔
                showTitle: true, //是否在鼠标 hover 的时候显示每个工具 icon 的标题
                right: 30,
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
                        buttonColor: "#58A7F8",
                        /*按钮颜色。*/ buttonTextColor: "#fff",
                        /*按钮文本颜色。*/
                    },
                    //配置项还原。
                    restore: {
                        show: true,
                        title: '刷新',
                    },
                    //保存图片
                    saveAsImage: {
                        show: true,
                        pixelRatio: 1,
                        /*下载清晰*/
                    },
                    brush: {
                        type: 'rect'
                    }
                }
            },
            series: [{
                name:'平均消息数',
                data: yData,
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
            }]
        };
        myChart.setOption(option);
        window.addEventListener("resize", function () {
            myChart.resize();
        });
    }

    selectDate=(dateArr)=>{
        const {params} = this.state
        params.dateStart = dateArr[0]
        params.dateEnd = dateArr[1]
        this.setState({params})
    }
    selectGroup=(v)=>{
        const {params} = this.state
        if(v.value==null||v.value==''){
            params.groupList = []
        }else{
            params.groupList = [v.value]
        }
        this.setState({params})
    }
    switchRobotFlag=(k)=>{
        let {userId,msgDataLoading,timeDataLoading} = this.state
        const {groupList,dateStart,dateEnd} = this.state.params
        let params = {}
        params.groupList= groupList
        if(dateStart!=''){
            params.dateStart = dateStart
            params.dateEnd = dateEnd
        }
        let robotFlag = {}
        robotFlag[k] = !this.state[k]
        this.setState(robotFlag)
        
        if(k=='msgDataRobotFlag'){
            if(!msgDataLoading){
                this.setState({
                    ...robotFlag,
                    msgDataLoading: true
                })
                this.getMsgData(userId,{...params,sign:robotFlag[k]})
            }
        }
        if(k=='timeDataRobotFlag'){
            if(!timeDataLoading){
                this.setState({
                    ...robotFlag,
                    timeDataLoading: true
                })
                this.getTimeData(userId,{...params,sign:robotFlag[k]})
            }
        }

    }
    searchHandle=()=>{
        const { userId,msgDataRobotFlag,timeDataRobotFlag,msgDataLoading,userDataLoading,timeDataLoading} = this.state
        const {groupList,dateStart,dateEnd} = this.state.params
        let params = {}
        params.groupList= groupList
        if(dateStart!=''){
            params.dateStart = dateStart
            params.dateEnd = dateEnd
        }
        if(!msgDataLoading){
            this.setState({
                msgDataLoading: true
            })
            this.getMsgData(userId,{...params,sign:msgDataRobotFlag})
        }
        if(!userDataLoading){
            this.setState({
                userDataLoading: true
            })
            this.getUserData(userId,{...params,sign:false})
        }
        if(!timeDataLoading){
            this.setState({
                timeDataLoading: true
            })
            this.getTimeData(userId,{...params,sign:timeDataRobotFlag})
        }
    }
    render(){
        const { groupData,downLoad,dateArr,msgDataRobotFlag,timeDataRobotFlag, msgDataLoading,userDataLoading,timeDataLoading} = this.state
        const { userInfo } = this.props
        return (
            <div className='h-container'>
                <div className="h-row" style={{marginBottom:'36px'}}>
                    <DataTable groupData={groupData}/>
                </div>
                <div className="h-row" style={{marginBottom:'12px'}}>
                    <SearchBox 
                        showExportAsExcel={this.showExportAsExcel}
                        selectDate={this.selectDate}
                        selectGroup={this.selectGroup}
                        searchHandle={this.searchHandle}
                    />
                </div>
                <div className="h-row chart-row" style={{marginBottom:'24px'}}>
                    <div className="h-row-left messageCountData">
                        <div id="messageCountData"></div>
                        <div className="switchBox" onClick={()=>{this.switchRobotFlag('msgDataRobotFlag')}}>
                            <div className={`checkBox ${msgDataRobotFlag?'checked':''}`}></div>
                            包含群主&小助手发言
                        </div>
                        {msgDataLoading?<Loading />:''}
                    </div>
                    <div className="h-row-right messageTypeData">
                        <div className="h-row-messageType" style={{paddingRight:'24px'}}>
                            <div className="title">消息类型占比</div>
                            <div id="messageTypeData"></div>
                        </div>
                        {msgDataLoading?<Loading />:''}
                    </div>
                </div>
                <div className="h-row chart-row" style={{marginBottom:'24px',padding:'24px'}}>
                    <div id="userCountData"></div>
                    {userDataLoading?<Loading />:''}
                </div>
                <div className="h-row chart-row" style={{padding:'24px'}}>
                    <div id="timeMessageCountData"></div>
                    <div className="switchBox" style={{left: '260px'}} onClick={()=>{this.switchRobotFlag('timeDataRobotFlag')}}>
                        <div className={`checkBox ${timeDataRobotFlag?'checked':''}`}></div>
                        包含群主&小助手发言
                    </div>
                    {timeDataLoading?<Loading />:''}
                </div>
                {
                    downLoad
                    ?<DownLoadModal
                        userInfo={userInfo}
                        dateValue={dateArr}
                        hideHandel={this.hideExportAsExcel}
                    />:null
                }
            </div>
        )
    }
}