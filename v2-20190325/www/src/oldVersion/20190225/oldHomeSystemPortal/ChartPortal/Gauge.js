import React,{Component} from 'react'
import echarts from 'echarts'
import './echarts.css'

const Name=(num)=>{
    switch (parseInt(num/20)){
        case 0: return '沉默';
        case 1: return '普通';
        case 2: return '活跃';
        case 3: return '话唠';
        case 4: return '传说';
        default:return '';
    }
}
export default class groupHealth extends Component{
    constructor(props){
        super(props)
    }

    componentDidMount() {
        /**
         * 在这里去调用生成图表的方法是因为，在组件加载后生成
         * dom节点，这个时候canvas才能根据id去绘制图表
         * 在这里去写了一个setTimeout修改了其中的一些数据，来
         * 测试图表的刷新，是否刷新了，后期大家可能是定期去某
         * 接口中获取数据，方法同理
         */
        this.initPie()
    }
    componentDidUpdate() {
        this.initPie()
    }

    initPie() {
        if(!document.getElementById('Gauge')) return
        let echartsWarp= document.getElementById('Gauge');
        let myChart = echarts.init(echartsWarp);
        let option = {
            backgroundColor:'#fff',
            title:{
                textStyle: {
                    color: '#485767',
                    fontSize: 16,
                    fontFamily:'PingFang SC',
                },
            },
            tooltip : {
                show:false,
                // formatter: "{a} <br/>{b} : {c}%"
            },
            toolbox: {//可视化工具箱
                show : false,
            },
            series: [
                {
                    name: '群活跃度',
                    type: 'gauge',
                    radius:'70%',
                    center: ['50%', '50%'],//仪表盘位置 默认全局居中[50%，50%] 左右，上下
                    title:{
                        color:'#485767',
                        fontSize:14,
                        fontFamily:'PingFang SC',
                        offsetCenter:[0,'90%'],
                         // offsetCenter:['180%','-30%']//偏移距离 // x, y，单位px 1440
                    },
                    detail: {
                        formatter:function (value) {
                            return ''
                        },
                        color: '#485767',
                        fontSize:16,
                        fontFamily:'PingFang SC',
                        // offsetCenter:[0,'120%'],
                        // offsetCenter:['180%','5%'] //偏移距离 1440
                    },
                    data: [
                        {
                            value:this.props.value,
                            name: Name(this.props.value),
                        }
                    ],
                    // splitNumber:5,// 分割段数，默认为5
                    axisLine:{
                        show:false,
                        lineStyle:{
                            color:[[0.2, '#BAF5D4'],[0.4, '#91F0BC'],[0.8, '#97c8fb'],[1, '#58A7F8']],
                            width:12,//仪表盘的轴线宽度修改
                        },

                    },
                    splitLine:{// 分隔线
                        show:false,
                    },
                    axisTick:{//刻度样式。// 坐标轴小标记
                        // show:false,
                        length :12,        // 属性length控制线长
                        lineStyle: {       // 属性lineStyle控制线条样式
                            color: 'auto',
                            width:0.8
                        },
                        splitNumber:2

                    },
                    axisLabel:{//刻度标签。
                        //0-2、2.01-4、4.01-8、8.01-10
                        //潜水 冒泡 活跃 话唠 传说
                        formatter:function(v){
                            switch (v+''){
                                case '0': return '';
                                case '20': return '';
                                case '40': return '';
                                case '80': return '';
                                case '100': return '';
                                default:return '';
                            }

                        },
                        distance : -16, //文字离表盘的距离
                        color:'#b5bdc6',
                        fontFamily:'PingFang SC',
                        fontWeight:400,
                        fontSize:10,
                    },
                    pointer:{//仪表盘指针。
                        length:'70%',
                        width:5
                    },
                    itemStyle:{//仪表盘指针样式。
                        color:'#58A7F8',
                        shadowColor: 'rgba(88,167,248, 0.5)',
                        shadowBlur: 10
                    },

                }
            ]
        }
        myChart.setOption(option, true);

    }


    render(){
        return (<div id='Gauge' style={{width:'180px', height:'280px'}}/>)

    }
}
