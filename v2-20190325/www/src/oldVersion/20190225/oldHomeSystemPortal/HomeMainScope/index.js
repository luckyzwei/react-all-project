import React, { Component } from "react";
import promiseXHR from "../../../funStore/ServerFun";
import AuthProvider from "../../../funStore/AuthProvider";
import { API_PATH } from "../../../constants/OriginName";
import moment from 'moment';
import echarts from 'echarts'
import DataTable from './DataTable'
import AvgActiveTable from './AvgActiveTable'
import {Loading} from './Loading'
import HomeTab from './HomeTab'
import NavTip from '../NavTip'
import DownLoadModal from '../DownLoadModal'
import './index.css';

const msgDistXData = ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00']

const arrayReorzate = (data) => {
    let xData = [];
    let keys = data.map(v => Object.keys(v)[0])
    let values = data.map(v => Object.values(v)[0])
    keys.map(item => {
        xData.push(item.split('-')[1] + '.' + item.split('-')[2])
    })
    return [xData, values]
}
export default class Index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            navList:[
                {name:'昨日',value:0},
                {name:'近七日',value:7},
                // {name:'近1个月',value:30}
            ],
            tipsData: [],
            sysNewsData: [],
            numSliderFlag: false,
            groupData: '',
            avgActiveDegree: null,
            dateArr: [],
            artBody: {},
            previewFlag: false,
            downLoad:false,
            userId:'',
            myWeekMsg:0 //7天群消息数量
        }
    }

    componentDidMount() {
        //获取用户入群 退群数据
        let userId = this.props.userInfo.info.userinfo;
        if (userId) {
            userId = this.props.userInfo.info.userinfo.userId;
            this.setState({
                userId: userId
            }, () => {
                this.getInitData(userId);
            })
        }
    }

    componentWillReceiveProps(nextProps) {
        let userId = this.props.userInfo.info.userinfo;
        if (!userId && nextProps.userInfo.info.userinfo) {
            let userId = nextProps.userInfo.info.userinfo.userId;
            this.setState({
                userId: userId
            },()=>{
                this.getInitData(userId);
            })
            
        }
    }

    getInitData=(id)=> {
        const self = this;
        let url = API_PATH + '/message-measure/authsec/dailyreportfast/' + id;
        AuthProvider.getAccessToken().then(resolve => {
            return promiseXHR(url, { type: 'Bearer', value: resolve }, null, 'POST')
        }).then(response => {
            let result = JSON.parse(response);
            if (result.resultCode === '100') {
                let myWeekMsg = 0
                for(let i=0;i<result.resultContent.weekMsgCnt.length;i++){
                    myWeekMsg+=result.resultContent.weekMsgCnt[i][Object.keys(result.resultContent.weekMsgCnt[i])[0]]
                }
                self.setState({
                    groupData:result.resultContent,
                    dateArr: [result.resultContent.weekActiveDegree.map(v => Object.keys(v)[0])[0], result.resultContent.weekActiveDegree.map(v => Object.keys(v)[0]).pop()],
                    avgActiveDegree: result.resultContent.avgActiveDegree,
                    myWeekMsg: myWeekMsg
                });
                self.initCharts(result.resultContent);
            }

        });
    }

    initCharts = (data) => {
        for (let item in data) {
            if (data.hasOwnProperty(item)) {
                switch (item) {
                    // id,echartsType,text,legendData,yName,xAxisData,seriesData1,seriesData2,normalColor,shadowStyle
                    case 'weekMemCnt': //群成员
                        this.drawCharts('weekMemCnt', 'Bar1', '群成员', ['群内人数', '发言人数'], '',
                            arrayReorzate(data['weekMemCnt'])[0],
                            arrayReorzate(data['weekMemCnt'])[1], arrayReorzate(data['weekActiveCnt'])[1],
                            [{ color: '#58A7F8' }, { color: '#6AD298' }], 'rgba(88,167,248,.1)'
                        );
                        break;
                    case 'weekEnterCnt'://入群退群
                        // 删除退群人数
                        this.drawCharts('weekEnterCnt', 'Bar2', '新增人数 (每日)', ['新增人数'], '',
                            arrayReorzate(data['weekEnterCnt'])[0],
                            arrayReorzate(data['weekEnterCnt'])[1],[],
                            [{ color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{/*进群*/ offset: 0, color: '#85D8AA ' }, { offset: 1, color: '#6AD298' }]), }],
                            'rgba(133,216,170,.1)'
                        );
                        break;
                    case 'msgDist'://分时段对话量
                        this.drawCharts('msgDist', 'Line', '分时段会话量 (昨日)', [],
                            moment(data.date).format('MM-DD'),
                            msgDistXData, data['msgDist'], [], [], [], ''
                        );
                        break;
                    default:
                        break;
                }
            }
        }
    }
    drawCharts = (id, echartsType, text, legendData, yName, xAxisData, seriesData1, seriesData2, normalColor, shadowStyle) => {
        if(!document.getElementById(id)) return
        let myChart = echarts.init(document.getElementById(id));
        var option = {
            textStyle: { fontFamily: 'PingFang SC', fontWeight: 400, color: '#B5BDC6', fontSize: 12 },
            title: { text: text, textStyle: { color: '#485767', fontSize: 16, fontFamily: 'PingFang SC', fontWeight: 400, }, },
            tooltip: {
                // 坐标轴指示器，坐标轴触发有效// 默认为直线，可选为：'line' | 'shadow'
                axisPointer: { type: 'shadow', lineStyle: {}, shadowStyle: { color: shadowStyle } },
                trigger: 'axis',
                extraCssText: 'box-shadow: 0 1px 4px 0 rgba(36,36,36,0.15);padding:6px 16px',
                backgroundColor: 'rgba(72,87,103,1)',
                borderColor: '#485767',
                textStyle: { fontSize: 12, fontFamily: 'PingFang SC', color: '#FFFFFF', fontWeight: 500 },
                formatter: function (datas) {
                    if (echartsType == 'Bar1') {
                        var res = datas[0].name.split('.')[0] + '月' + datas[0].name.split('.')[1] + '日<br/>', val;
                        for (var i = 0, length = datas.length; i < length; i++) {
                            val = datas[i].value;
                            res += datas[i].marker + datas[i].seriesName + '：' + val + '<br/>';
                        }
                        return '<div class="echartsTooltip">' + res + '</div>';
                    }
                    else if (echartsType == 'Bar2') {
                        var res = datas[0].name.split('.')[0] + '月' + datas[0].name.split('.')[1] + '日<br/>', val, markerColor0, markerColor1;
                        for (var i = 0, length = datas.length; i < length; i++) {
                            val = datas[i].value;
                            markerColor0 = datas[i].color.colorStops[0].color, markerColor1 = datas[i].color.colorStops[1].color;
                            let marker = '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-image: linear-gradient(0deg,' + markerColor0 + ' 0%,' + markerColor1 + ' 100%);"></span>'
                            res += marker + datas[i].seriesName + '：' + Math.abs(val) + '<br/>';
                        }
                        return '<div class="echartsTooltip">' + res + '</div>';
                    }
                    else if (echartsType == 'Line') {
                        return '<div class="echartsTooltip tooltip-1">' + datas[0].data + '条</div>';
                    }
                },
                position: function (point, params, dom, rect, size) {
                    return echartsType === 'Line'
                        ? [point[0] - 30, point[1] - 50]
                        : [point[0] - 30, point[1] - 100]
                }
            },
            //['群内人数', '发言人数'],
            legend: { data: legendData, top: '1%', itemWidth: 10, itemHeight: 10, textStyle: { color: '#B5BDC6' }, },
            grid: { left: '1%', right: '1%', bottom: '6%', containLabel: true },
            toolbox: {//可视化的工具箱
                show: true,
                itemSize: 12,//工具栏 icon 的大小
                itemGap: 6, //工具栏 icon 每项之间的间隔
                showTitle:true,//是否在鼠标 hover 的时候显示每个工具 icon 的标题
                feature: {//自定义的工具名字，只能以 my 开头，例如下例中的 myTool1，myTool2
                    /* '辅助线开关'*/
                    mark: { show: true },
                    //缩放
                    dataZoom: { show: true, yAxisIndex: 'none', xAxisIndex: 0, },
                    // 数据视图工具
                    dataView: { show: true, readOnly: false, buttonColor: "#58A7F8", /*按钮颜色。*/ buttonTextColor: "#fff", /*按钮文本颜色。*/ },
                    //配置项还原。
                    restore: { show: true, title: '刷新', },
                    //保存图片
                    saveAsImage: { show: true, pixelRatio: 1, /*下载清晰*/ },
                    myTool1: {//自定义
                        show: true,
                        title: '下载',
                        icon: 'image://'+process.env.PUBLIC_URL+'/images/icon/save_excel.png',
                        onclick: () => {
                            let a = document.createElement('a');
                            a.href = this.state.groupData.url;
                            a.click();
                        }
                    },
                    brush: { type: 'rect' }
                }
            },
            xAxis: {
                type: 'category',
                data: xAxisData,
                offset: 15,//X 轴相对于默认位置的偏移
                axisLine: { lineStyle: { color: '#E9EBEE' } },
                /*网格*//*修改X轴线条样式*/
                splitLine: { show: false, lineStyle: { type: 'dashed', borderColor: '#E9EBEE' } },
                //刻度
                axisTick: { show: false },
                boundaryGap: true,
            },
            yAxis: {
                type: 'value',
                splitLine: { show: true, lineStyle: { type: 'dashed', borderColor: '#E9EBEE' } },
                axisLine: { lineStyle: { color: '#fff' } },
                name: yName,//y轴标题
                nameLocation: 'start',
                nameTextStyle: { padding: [34, 30, 0, 0], },
                nameGap: -11,
            },
            //缩放
            dataZoom: [{ type: 'inside', xAxisIndex: [0], filterMode: 'empty' }],
            series: [
                {
                    type: 'bar', //群内人数
                    stack: '总量',
                    barMaxWidth: '20px',
                    name: legendData[0],
                    data: seriesData1,
                    itemStyle: { normal: normalColor[0] },
                },
                {
                    type: 'bar', //发言人数
                    stack: '总量',
                    barMaxWidth: '20px',
                    name: legendData[1],
                    data: seriesData2,
                    itemStyle: { normal: normalColor[1] },
                },
            ]
        }

        if (echartsType === 'Line') {
            let seriesdata = {
                data: seriesData1,
                type: 'line',
                name: text,
                connectNulls: true,//是否连接空数据。
                color: '#58A7F8',
                areaStyle: {
                    color: {
                        type: 'linear',
                        x: 0, y: 0, x2: 0, y2: 1,
                        colorStops: [{ offset: 0.3, color: 'rgba(88,167,248,.6)' /* 0% 处的颜色*/ }, { offset: 1, color: 'rgba(88,167,248,.01)' /* 100% 处的颜色*/ }],
                        globalCoord: false // 缺省为 false
                    }
                },
                /*折线拐点标志的样式。*/
                itemStyle: { shadowColor: 'rgba(88,167,248,0.5)', shadowBlur: 10 },
            }
            option.series.splice(0, option.series.length);
            option.series.push(seriesdata);
            option.tooltip.axisPointer.type = 'line';
            option.series.reverse();
        }

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option)
        //自适应
        window.addEventListener("resize", function () {
            myChart.resize();
        });

    }

    changeNav=(value)=>{
        this.setState({
            groupData: '',
            avgActiveDegree:null,
            navIndex:value
        })
        this.getInitData(this.state.userId)
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

    render() {
        const { groupData,navIndex,myWeekMsg} = this.state
        return (
            <div className='h-container'>
                <div className="mainWrapper">
                    <div className='home-title'>
                        <NavTip navList={this.state.navList} changeNav={this.changeNav}/>
                        <div className='downloadBtn'>
                            <div onClick={this.showExportAsExcel}>
                                <span className='download-icon' />
                                导出数据
                            </div>
                        </div>
                    </div>
                    <div className="upperArea underArea-row1">
                        <DataTable groupData={groupData} navIndex={navIndex} myWeekMsg={myWeekMsg}/>
                        <AvgActiveTable avgActiveDegree={this.state.avgActiveDegree} navIndex={navIndex} weekAvgActiveDegree={groupData.fuckWeekActiveDegree}/>
                    </div>
                    <div className="upperArea underArea-row2">
                        <div className="rowecharts">
                            {
                                groupData ? <div id='msgDist' style={{height: "400px" }} />
                                    : <Loading/>
                            }

                        </div>
                        <div className='line'/>
                        <div className='rowhomeTab'>
                            {
                                groupData ? <HomeTab groupData={groupData} actions={this.props.actions}/>
                                    : <Loading/>
                            }
                        </div>

                    </div>
                    <div className='upperArea underArea-row3'>
                        <div className="rowecharts">
                            {
                                groupData ? <div id="weekMemCnt" style={{height: "314px" }} />
                                    : <Loading/>
                            }
                        </div>
                        <div className="rowecharts">
                            {
                                groupData ? <div id="weekEnterCnt" style={{height: "314px" }} />
                                    : <Loading/>
                            }
                        </div>
                    </div>
                    {
                        this.state.downLoad
                            ?<DownLoadModal
                                userInfo={this.props.userInfo}
                                dateValue={this.state.dateArr}
                                hideHandel={this.hideExportAsExcel}
                            />:null
                    }
                </div>
            </div>
        )
    }
}
// let resultData = {
//     "resultCode": "100",
//     "pageInfo": {},
//     "detailDescription": "success",
//     "resultContent": {
//         "weekMemCnt": [{ "2018-08-14": 88384.0 }, { "2018-08-15": 88547.0 }, { "2018-08-16": 88613.0 }, { "2018-08-17": 88744.0 }, { "2018-08-18": 88617.0 }, { "2018-08-19": 89021.0 }, { "2018-08-20": 89087.0 }, { "2018-08-21": 89749.0 }],
//         "weekGroupCnt": [{ "2018-08-14": 487 }, { "2018-08-15": 490 }, { "2018-08-16": 490 }, { "2018-08-17": 490 }, { "2018-08-18": 490 }, { "2018-08-19": 490 }, { "2018-08-20": 490 }, { "2018-08-21": 490 }],
//         "weekActiveDegree": [{ "2018-08-14": 3.75 }, { "2018-08-15": 4.29 }, { "2018-08-16": 5.92 }, { "2018-08-17": 5.79 }, { "2018-08-18": 5.62 }, { "2018-08-19": 4.73 }, { "2018-08-20": 5.44 }, { "2018-08-21": 4.33 }],
//         "weekMsgPax": [{ "2018-08-14": 0.27 }, { "2018-08-15": 0.28 }, { "2018-08-16": 0.33 }, { "2018-08-17": 0.25 }, { "2018-08-18": 0.36 }, { "2018-08-19": 0.24 }, { "2018-08-20": 0.27 }, { "2018-08-21": 0.25 }],
//         "memCnt": 89749.0,
//         "url": "https://cloud.gemii.cc/lizcloud/fs/noauth/media/5b7d0bc60c3b460088f5c75e?d",
//         "activeCnt": 3772.0,
//         "enterCnt": 255.0,
//         "avgActiveDegree": 4.33,
//         "leaveCnt": 203.0,
//         "weekLeaveCnt": [{ "2018-08-14": 176.0 }, { "2018-08-15": 232.0 }, { "2018-08-16": 187.0 }, { "2018-08-17": 127.0 }, { "2018-08-18": 157.0 }, { "2018-08-19": 138.0 }, { "2018-08-20": 224.0 }, { "2018-08-21": 203.0 }],
//         "weekActiveCnt": [{ "2018-08-14": 3438.0 }, { "2018-08-15": 3792.0 }, { "2018-08-16": 3386.0 }, { "2018-08-17": 3801.0 }, { "2018-08-18": 3402.0 }, { "2018-08-19": 3188.0 }, { "2018-08-20": 3226.0 }, { "2018-08-21": 3772.0 }],
//         "msgDist": [{ "2018-08-14": 50.63 }, { "2018-08-15": 53.99 }, { "2018-08-16": 46.54 }, { "2018-08-17": 50.76 }, { "2018-08-18": 44.52 }, { "2018-08-19": 42.11 }, { "2018-08-20": 41.2 }, { "2018-08-21": 45.02 }],
//         "groupCnt": 490,
//         "weekEnterCnt": [{ "2018-08-14": 302.0 }, { "2018-08-15": 396.0 }, { "2018-08-16": 258.0 }, { "2018-08-17": 277.0 }, { "2018-08-18": 557.0 }, { "2018-08-19": 385.0 }, { "2018-08-20": 275.0 }, { "2018-08-21": 255.0 }],
//         "date": "2018-08-21",
//         "msgCnt": 22061.0,
//         "avgMsgCnt": 45.02,
//         "weekMsgCnt": [{ "2018-08-14": 24658.0 }, { "2018-08-15": 26456.0 }, { "2018-08-16": 22804.0 }, { "2018-08-17": 24871.0 }, { "2018-08-18": 21813.0 }, { "2018-08-19": 20635.0 }, { "2018-08-20": 20187.0 }, { "2018-08-21": 22061.0 }]
//     }
// }