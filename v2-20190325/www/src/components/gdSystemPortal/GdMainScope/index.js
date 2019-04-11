import React,{Component} from 'react'
import './index.css'
import echarts from 'echarts'
import SearchInput from '../../shareComponent/SearchInput'
import DateRange from '../../shareComponent/RangePicker'
import Empty from './Empty'
import promiseXHR from "../../../funStore/ServerFun";
import AuthProvider from "../../../funStore/AuthProvider";
import { API_PATH } from "../../../constants/OriginName";
import Loading from '../../shareComponent/Echartsloading'

export default class GdMainScope extends Component {
    constructor(props){
        super(props)
        this.state={
            tenantId:'',
            funnelChartLoading: true,
            storeList:[],
            hasGroup: true,
            hasData: true,
            searchParams: {
                "templateId": "",
                "dateStart": "",
                "dateEnd": ""
            } 
        }
    }
    componentDidMount() {
        //获取用户入群 退群数据
        this.getTemplateData()
        let tenantId
        if(this.props.userInfo.info.userinfo){
            tenantId = this.props.userInfo.info.userinfo.tenantId
        }
        if (tenantId) {
            this.setState({
                tenantId: tenantId
            }, () => {
               this.getInitData(tenantId,{})
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
            this.getInitData(this.state.tenantId,{})
        }
    }
    getInitData = (tenantId,params) => {
        // {
        //     "templateId": "string",
        //     "dateStart": "string",
        //     "dateEnd": "string"
        //  }
        let url =`${API_PATH}/message-measure/authsec/dailyreportfast/joinGroupData/${tenantId}`
        AuthProvider.getAccessToken().then(resolve => {
            return promiseXHR(url, { type: 'Bearer', value: resolve }, params, 'POST')
        }).then(response => {
            const resData = JSON.parse(response)
            // let resData = {"resultCode":"100","detailDescription":"","resultContent":{"joinGroupData":[],"joinGroupDataSum":{"scanSum":0,"submitSum":0,"matchSuccessSum":0,"addRobotFriendSum":0,"sendCodeSum":0,"sendUserLinkSum":0,"enterGroupSum":0}},"pageInfo":{}}
            // if(params.dateStart=="2019-04-01"){
            //     resData = {
            //         "resultCode": "100",
            //         "detailDescription": "",
            //         "resultContent": {
            //           "joinGroupData": [
            //             {
            //               "scanSum": 3,
            //               "submitSum": 3,
            //               "matchSuccessSum": 3,
            //               "addRobotFriendSum": 1,
            //               "sendCodeSum": 1,
            //               "sendUserLinkSum": 1,
            //               "enterGroupSum": 1,
            //               "createDate": "2019-03-12"
            //             },
            //             {
            //               "scanSum": 1,
            //               "submitSum": 1,
            //               "matchSuccessSum": 1,
            //               "addRobotFriendSum": 1,
            //               "sendCodeSum": 1,
            //               "sendUserLinkSum": 1,
            //               "enterGroupSum": 1,
            //               "createDate": "2019-03-13"
            //             }
            //           ],
            //           "joinGroupDataSum": {
            //             "scanSum": 4,
            //             "submitSum": 4,
            //             "matchSuccessSum": 4,
            //             "addRobotFriendSum": 2,
            //             "sendCodeSum": 2,
            //             "sendUserLinkSum": 2,
            //             "enterGroupSum": 2
            //           }
            //         },
            //         "pageInfo": {}
            //     }
            // }
            if(resData.resultCode==100){
                this.setState({
                    funnelChartLoading: false,
                    hasData: resData.resultContent.joinGroupData.length>0
                })
                if(resData.resultContent.joinGroupData.length>0){
                    this.drawFunnelChart(resData.resultContent.joinGroupDataSum)
                    this.drawJoinChart(resData.resultContent.joinGroupData)
                }
            }
        })
    }
    getTemplateData = () => {
        const url = `${API_PATH}/groupadmin-api/authsec/group/join/templates?_currentPage=0&_pageSize=-1`
        AuthProvider.getAccessToken()
        .then((resolve,reject)=>{
            return promiseXHR(url,{type:'Bearer',value:resolve},{type:null},'post')
        }).then(res => {
            const resData = JSON.parse(res)
            this.setState({
                storeList: resData.resultContent.map(v => ({key:v.name,value:v.template.id})),
                hasGroup: resData.resultContent.length>0
            })
        }).catch(err => {
            console.log(err)
        })
    }
    drawFunnelChart=(funnelData)=>{
        let allCount = funnelData.scanSum?funnelData.scanSum:1
        let data = [
            {value: funnelData.scanSum, name: '扫码人数'},
            {value: funnelData.submitSum, name: '提交信息人数'},
            {value: funnelData.addRobotFriendSum, name: '加小助手人数'},
            {value: funnelData.sendUserLinkSum, name: '收到群邀请人数'},
            {value: funnelData.enterGroupSum, name: '入群人数'}
        ]
        let chartDom = document.getElementById('funnelChart')
        if(!chartDom) return
        let myChart = echarts.init(chartDom)
        let option = {
            title: {
                text: '入群数据',
                textStyle: {
                    color: '#344658',
                    fontSize: '16',
                    fontWeight: '400',
                    fontFamily: "PingFang SC"
                }
            },
            tooltip: {
                trigger: 'item',
                formatter: function (datas) {
                    return `<div class='echartsTooltip'>
                                <div class='tooltip-1'>${datas.name}</div>
                                <div class='tooltip-1'>占比：${Math.round(datas.value*10000/allCount)/100}%</div>
                            </div>`
                },
                position: function (point, params, dom, rect, size) {
                    return [point[0] - 30, point[1] - 65]
                }
            },
            legend: {
                data: ['扫码人数','提交信息人数','加小助手人数','收到群邀请人数','入群人数'],
                left: '48',
                top: '126',
                orient: 'vertical',
                itemWidth: 12,
                itemHeight: 12,
                selectedMode: false,
                textStyle: {
                    color:'#B5BDC6',
                    fontWeight: 400,
                    fontFamily: "PingFang SC"
                },
                itemGap: 20
            },
            calculable: true,
            series: [
                {
                    name:'入群数据漏斗',
                    type:'funnel',
                    left: '20%',
                    top: 80,
                    width: '50%',
                    minSize: '0%',
                    maxSize: '100%',
                    sort: 'descending',
                    label: {
                        show: true,
                        position: 'right',
                        formatter: "{a|{b}：} {b|{c}}{a|人}",
                        rich: {
                            a:{
                                fontFamily: "PingFang SC",
                                fontWeight: '400',
                                fontSize: '14',
                                color: '#344658'
                            },
                            b:{
                                fontFamily: "PingFang SC",
                                fontWeight: 500,
                                fontSize: 24,
                                color: '#58A7F8'
                            }
                        }
                    },
                    labelLine: {
                        length: 100,
                        lineStyle: {
                            width: 1,
                            type: 'solid',
                            color: '#DADEE2'
                        },
                        offsetX: 20,
                    },
                    itemStyle: {
                        borderWidth: 0
                    },
                    emphasis: {
                        label: {
                            fontSize: 20
                        }
                    },
                    data: data,
                    color:['rgba(88,167,248,.4)','rgba(88,167,248,.7)', 'rgb(88,167,248)', '#288BF2', '#6AD298']
                }
            ]
        };
        myChart.setOption(option);
        window.addEventListener("resize", function () {
            myChart.resize();
        });
    }
    drawJoinChart = (joinData) => {
        let timeData = [],scanSumData=[],submitSumData=[],addRobotFriendSumData=[],sendUserLinkSumData=[],enterGroupSumData=[]
        joinData.forEach(v => {
            timeData.push(v.createDate)
            scanSumData.push(v.scanSum)
            submitSumData.push(v.submitSum)
            addRobotFriendSumData.push(v.addRobotFriendSum)
            sendUserLinkSumData.push(v.sendUserLinkSum)
            enterGroupSumData.push(v.enterGroupSum)
        })
        // 群消息数据
        let chartDom = document.getElementById('joinChart')
        if(!chartDom) return
        let myChart = echarts.init(chartDom);
        let option = {
            title: {
                text: '入群变化趋势',
                textStyle: {
                    color: '#344658',
                    fontWeight: 400,
                    fontFamily: 'PingFang SC',
                    fontSize: 16,
                }
            },
            legend: {
                data: [{
                    name:'扫码',
                    icon:'rect'
                },{
                    name:'提交',
                    icon:'rect'
                },{
                    name:'加好友',
                    icon:'rect'
                },{
                    name:'收到邀请',
                    icon:'rect'
                },{
                    name:'入群',
                    icon:'rect'
                }],
                top: '1%',
                right: '150',
                itemWidth: 10,
                itemHeight: 10,
                textStyle: {
                    color: '#B5BDC6'
                }
            },
            xAxis: {
                type: 'category',
                data: timeData,
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
                    const index = datas[0].dataIndex
                    return `<div class='echartsTooltip echartsTooltip1'>
                                <div class='tooltip-1'>${joinData[index].createDate}</div>
                                <div class='tooltip-1'>扫码人数：${joinData[index].scanSum}人</div>
                                <div class='tooltip-1'>提交信息人数：${joinData[index].submitSum}人</div>
                                <div class='tooltip-1'>加小组手人数${joinData[index].addRobotFriendSum}人</div>
                                <div class='tooltip-1'>收到群邀请人数：${joinData[index].sendUserLinkSum}人</div>
                                <div class='tooltip-1'>入群人数：${joinData[index].enterGroupSum}人</div>
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
                    brush: {
                        type: 'rect'
                    }
                }
            },
            series: [{
                name:'扫码',
                data: scanSumData,
                type: 'line',
                lineStyle: {
                    color: '#BCDCFC',
                    width: 4
                },
                itemStyle: {
                    color: '#BCDCFC',
                    shadowColor: 'rgba(188,220,252,0.5)',
                    shadowBlur: 10
                },
                areaStyle: {
                    opacity: 0.5
                }
            },{
                name:'提交',
                data: submitSumData,
                type: 'line',
                lineStyle: {
                    color: '#8AC2FA',
                    width: 4
                },
                itemStyle: {
                    color: '#8AC2FA',
                    shadowColor: 'rgba(138,194,250,0.5)',
                    shadowBlur: 10
                },
                areaStyle: {
                    opacity: 0.5
                }
            },{
                name:'加好友',
                data: addRobotFriendSumData,
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
                areaStyle: {
                    opacity: 0.5
                }
            },{
                name:'收到邀请',
                data: sendUserLinkSumData,
                type: 'line',
                lineStyle: {
                    color: '#288BF2 ',
                    width: 4
                },
                itemStyle: {
                    color: '#288BF2 ',
                    shadowColor: 'rgba(40,139,242,0.5)',
                    shadowBlur: 10
                },
                areaStyle: {
                    opacity: 0.5
                }
            },{
                name:'入群',
                data: enterGroupSumData,
                type: 'line',
                lineStyle: {
                    color: '#6AD298',
                    width: 4
                },
                itemStyle: {
                    color: '#6AD298',
                    shadowColor: 'rgba(106,210,152,0.5)',
                    shadowBlur: 10
                },
                areaStyle: {
                    opacity: 0.5
                }
            }]
        };
        myChart.setOption(option);
        window.addEventListener("resize", function () {
            myChart.resize();
        });
    }
    selectTemplate = (v) => {
        let {searchParams} = this.state
        searchParams.templateId = v.value
        this.setState({searchParams})
    }
    selectDate = (v)=> {
        let {searchParams} = this.state
        searchParams.dateStart = v[0]
        searchParams.dateEnd = v[1]
        this.setState({searchParams})
    }
    searchHandle = () => {
        const {tenantId,searchParams,funnelChartLoading} = this.state
        const {templateId,dateStart,dateEnd} = searchParams
        if(!funnelChartLoading){
            this.setState({funnelChartLoading: true,hasData:true})
        }
        let params = {}
        if (templateId!=''&&templateId!=null) {
            params.templateId = templateId
        }
        if(dateStart!=''&&dateStart!=null){
            params.dateStart = dateStart
            params.dateEnd = dateEnd
        }
        this.getInitData(tenantId,params)
    }
    render(){
        const {funnelChartLoading,storeList,hasGroup,hasData} = this.state
        const {actions} = this.props
        return (
            <div className="gd-container">
                <div className="searchBox">
                    <SearchInput 
                        dataList={storeList}
                        label={"入群页面："}
                        placeholder={'选择入群页面'}
                        selectHandle={this.selectTemplate}
                        allFlag={{
                            key: '所有页面',
                            value: null
                        }}
                        deleteFlag={true}
                        inputStyle={{
                            width: '300px'
                        }}
                    />
                    <div className="dateBox">
                        <div className="dateLabel">日期：</div>
                        <DateRange 
                            disabledDate={(current)=>{return  current > new Date(new Date().getTime()- 1 * 24 * 60 * 60 * 1000) }}
                            setDateParams={this.selectDate}
                        />
                    </div>
                    <div className="searchBtn" onClick={this.searchHandle}>搜索</div>
                </div>
                <div className="chartWrapper" style={{display: hasGroup&&hasData||funnelChartLoading?'block':'none'}}>
                    <div id="funnelChart" className="funnelChart"></div>
                    {
                        funnelChartLoading?<Loading />:''
                    }
                </div>
                <div className="chartWrapper" style={{display: hasGroup&&hasData||funnelChartLoading?'block':'none'}}>
                    <div id="joinChart" className="joinChart"></div>
                    {
                        funnelChartLoading?<Loading />:''
                    }
                </div>
                {!hasGroup||!hasData?<Empty actions={actions} hasGroup={hasGroup} hasData={hasData}/>:''}
            </div>
        )
    }
}