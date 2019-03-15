import React, { Component, PropTypes } from 'react'
import $ from 'jquery'
import SelectBox from "../../shareComponent/SelectBox";
import './index.css'
import promiseXHR from '../../../funStore/ServerFun'
import { API_PATH } from '../../../constants/OriginName';
import AuthProvider from '../../../funStore/AuthProvider'
import echarts from 'echarts'
import 'echarts-wordcloud'
import {tongji} from '../../../funStore/tongji'
import LoadingAnimationS from '../../shareComponent/LoadingAnimationS'
// import ButtonBox from '../../shareComponent/ButtonBox'

const dateHandle = (date) => {
    let newDateArr = date.split('-')
    newDateArr[1].length == 1&&(date = newDateArr[0]+'-0'+newDateArr[1]+"-"+newDateArr[2])
    newDateArr[2].length == 1&&(date = newDateArr[0]+'-'+newDateArr[1]+"-0"+newDateArr[2])
    newDateArr[1].length == 1&&newDateArr[2].length == 1&&(date = newDateArr[0]+'-0'+newDateArr[1]+"-0"+newDateArr[2])
    return date
}

export default class HotWord extends Component {
    constructor(props) {
        super(props)
        this.state = {
            groupList: [],
            oldgroupList: [],
            oldhotwordList: [],
            hotwordList: [],
            colorList: ['#B5BDC6', '#F8B779', '#85D8AA', '#58A7F8', '#B4D4F4', '#FF99A5', '#6AD298'],
            loading: true
        }
    }
    componentDidMount () {
        //储存热词 修改颜色和字号
        // let {colorList, oldhotwordList} = this.state
        // let size = 60000
        // var arr = []
        // oldhotwordList = oldhotwordList.map((v,i) => {
        //     arr.push({
        //         name: v,
        //         value: Math.sqrt(size)
        //     })
        //     size-=50
        // })
        // let chart = echarts.init(document.getElementById('wordList'))
        // let option = {
        //     series: [ {
        //         type: 'wordCloud',
        //         sizeRange: [12, 50],
        //         rotationRange: [0, 0],
        //         rotationStep: 45,
        //         gridSize: 8,
        //         shape: 'ellipticity',
        //         width: 800,
        //         height: 400,
        //         drawOutOfBound: false,
        //         textStyle: {
        //             normal: {
        //                 color: function () {
        //                     return colorList[Math.floor(Math.random()*7)]
        //                 }
        //             },
        //             emphasis: {
        //                 color: 'red'
        //             }
        //         },
        //         data: arr.sort(function (a, b) {
        //             return b.value  - a.value;
        //         })
        //     } ]
        // }
        // chart.setOption(option)
        // window.onresize = function () {
        //     chart.resize()
        // }
        //发送请求获取所有群列表并存储
        const url = `${API_PATH}/groupadmin-api/authsec/groupadmin/tenant/groups`
        this.setState({
            loading: true
        })
        AuthProvider.getAccessToken()
        .then((resolve,reject)=>{
            return promiseXHR(url, {type:'Bearer',value:resolve}, {_page: 0, _size: 50}, 'post')
        }).then(res => {
            const resData = JSON.parse(res)
            let groupList = resData.resultContent.map((item) => ({
                    ...item,
                    select: true
                }
            ))
            this.setState({groupList: groupList, oldgroupList: groupList})
        }).then(() =>{
            //发送请求获取100热词
            const url2 = `${API_PATH}/group-wordcloud/authsec/wordcloud/get_word_cloud`
            let newDate = new Date().toLocaleDateString().replace(/\//g, '-')
            let oldDate = new Date(new Date().getTime() - 1000*60*60*24*90).toLocaleDateString().replace(/\//g, '-')
            newDate = dateHandle(newDate)
            oldDate = dateHandle(oldDate)
            let LizID = this.state.groupList.map((v) => {
                return v.id
            })
            AuthProvider.getAccessToken()
            .then((resolve,reject)=>{
                return promiseXHR(url2, {type:'Bearer',value:resolve}, {Day: [oldDate, newDate], LizID: LizID}, 'post')
            }).then(res => {
                res = JSON.parse(res)
                if (res.resultCode == 100) {
                    // console.log(111)
                    let oldhotwordList = res.resultContent
                    let {colorList} = this.state
                    let size = 60000
                    oldhotwordList.map((v,i) => {
                        oldhotwordList[i].name = v.Word
                        oldhotwordList[i].value = Math.sqrt(size)
                        size-=50
                    })
                    let hotwordList = oldhotwordList.slice(0, 100)
                    this.setState({
                        oldhotwordList: oldhotwordList,
                        hotwordList: hotwordList,
                        loading: false
                    })
                    // 初始化词云并配置
                    // var arr = []
                    // oldhotwordList = oldhotwordList.map((v,i) => {
                    //     arr.push({
                    //         name: v,
                    //         value: Math.sqrt(size)
                    //     })
                    //     size-=50
                    // })
                    let chart = echarts.init(document.getElementById('wordList'))
                    let option = {
                        series: [ {
                            type: 'wordCloud',
                            sizeRange: [12, 50],
                            rotationRange: [0, 0],
                            rotationStep: 45,
                            gridSize: 8,
                            shape: 'ellipticity',
                            width: 800,
                            height: 400,
                            drawOutOfBound: false,
                            textStyle: {
                                normal: {
                                    color: function () {
                                        return colorList[Math.floor(Math.random()*7)]
                                    }
                                },
                                emphasis: {
                                    color: 'red'
                                }
                            },
                            data: hotwordList.sort(function (a, b) {
                                return b.value  - a.value;
                            })
                        } ]
                    }
                    chart.setOption(option)
                    window.onresize = function () {
                        chart.resize()
                    }
                }
            }).catch(err =>{
                console.log(err)
                this.setState({
                    loading: false
                })
            }) 
        })

        //绑定阻止冒泡事件和隐藏列表事件
        $('body')[0].addEventListener('click', this.listHide)
        $('.input-box')[0].addEventListener('click', this.stop)

        //绑定滚轮事件
        const times = [28, 55, 98, 172, 249, 377]
        this.refs.scroll.addEventListener("mousewheel", (e) => {
            let delta = (e.wheelDelta && (e.wheelDelta > 0 ? 1 : -1)) ||
            (e.detail && (e.detail > 0 ? -1 : 1));
            if (delta > 0) {
                // 向上滚
                let selectHeight = this.refs.selectTime.offsetHeight
                let proportion = selectHeight
                // let proportion = selectHeight/388
                times.push(proportion)
                times.sort((a, b) => a - b)
                let index = times.indexOf(proportion)
                let result = times[index + 2]
                times.splice(index, 1)
                this.refs.selectTime.style.height = result + 'px'
                this.setState({time: times.indexOf(result)})
            } else if (delta < 0) {
                // 向下滚
                let selectHeight = this.refs.selectTime.offsetHeight
                let proportion = selectHeight
                times.push(proportion)
                times.sort((a, b) => a - b)
                let index = times.indexOf(proportion)
                let result = times[index - 1]
                times.splice(index, 1)
                this.refs.selectTime.style.height = result + 'px'
                this.setState({time: times.indexOf(result)})
            }
                e.stopPropagation()
        })
    }
    componentWillUnmount(){
        $('body')[0].removeEventListener('click', this.listHide)
    }

    changeTime (e) {
        //拿到距离顶部距离和轴高度 定义刻度位置数组
        const times = [28, 55, 98, 172, 249, 377]
        let height = this.refs.selectTime.offsetHeight
        let startY = e.pageY
        $(document).mousemove((e) => {
            //拿到鼠标位置 改变选中轴高度 判断两端锁定
            let pageY = startY - e.pageY
            let selectHeight = height + pageY
            if(selectHeight > 388) {
                selectHeight = 388
            } else if (selectHeight < 10) {
                selectHeight = 10
            }
            this.refs.selectTime.style.height = selectHeight + 'px'
            if (selectHeight >= 377) {
                this.setState({time: 5})
            } else if (selectHeight >= 249) {
                this.setState({time: 4})
            } else if (selectHeight >= 172) {
                this.setState({time: 3})
            } else if (selectHeight >= 98) {
                this.setState({time: 2})
            } else if (selectHeight >= 55) {
                this.setState({time: 1})
            } else if (selectHeight >= 28) {
                this.setState({time: 0})
            } else {
                this.setState({time: -1})
            }
        })

        $(document).mouseup((e) => {
            //拿到鼠标位置 计算位置比例 避免重复绑定事件
            let selectHeight = this.refs.selectTime.offsetHeight
            let proportion = selectHeight
            $(document).off()
            //计算离位置最近点 自动改变
            times.push(proportion)
            times.sort((a, b) => a - b)
            let index = times.indexOf(proportion)
            switch (index) {
                case 0:
                    var result = times[1]
                    break;
                case times.length - 1:
                    var result = times[times.length-2]
                    break;
                default:
                    var result = proportion - times[index - 1] < times[index + 1] - proportion ? times[index - 1]:times[index + 1]
            }
            times.splice(index, 1)
            this.refs.selectTime.style.height = result + 'px'
            this.searchHotword()
            this.setState({time: times.indexOf(result)})
        })
        
    }
    listShow () {
        $('.group-list').show()
    }
    listHide () {
        $('.group-list').hide()
    }
    stop (e) {
        e.stopPropagation()
    }
    filterGroup (e) {
        var oldgroupList =this.state.oldgroupList
        let searchWrod = this.refs.searchInput.value
        oldgroupList = oldgroupList.filter((item) => {
            return item.name.indexOf(searchWrod) != -1
        })
        this.setState({
            groupList: oldgroupList,
            allTab: oldgroupList.every((v) => v.select)
        })
    }
    selectGroup (item, index) {
        let {groupList,oldgroupList} = this.state
        groupList = groupList.map((v) => {
            return v.id == item.id ?{
                ...v,
                select: !item.select
            }:v
        })
        oldgroupList = oldgroupList.map((v) => {
            return v.id == item.id ?{
                ...v,
                select: !item.select
            }:v
        })
        this.setState({
            groupList: groupList,
            oldgroupList: oldgroupList,
            allTab: groupList.every((v) => v.select)
        })
    }
    selectAll () {
        let {groupList,allTab,oldgroupList} = this.state
        groupList = groupList.map((v) => ({
            ...v,
            select: !allTab
        }))
        groupList.forEach((v) => {
            oldgroupList = oldgroupList.map((item) => {
                if(item.id == v.id) {
                    item.select = v.select
                }
                return item
            })
        })
        this.setState({
            groupList: groupList,
            allTab: !allTab,
            oldgroupList: oldgroupList
        })
    }
    searchHotword =() =>{
        let {groupList} = this.state
        tongji('Lzc_GaoPinCi_ChaXun')
        let LizID = groupList.filter((v) => v.select).map((v) => v.id)
        const url2 = `${API_PATH}/group-wordcloud/authsec/wordcloud/get_word_cloud`
        let newDate = new Date().toLocaleDateString().replace(/\//g, '-')
        let time = this.refs.selectTime.offsetHeight
        switch (time) {
            case 28:
                time = 7
                break;
            case 55:
                time = 14
                break;
            case 98:
                time = 30
                break;
            case 172:
                time = 90
                break;
            case 249:
                time = 180
                break;
            case 377:
                time = 365
                break;
        }
        let oldDate = new Date(new Date().getTime() - 1000*60*60*24*time).toLocaleDateString().replace(/\//g, '-')
        // console.log({Day: [oldDate, newDate], LizID: LizID})
        newDate = dateHandle(newDate)
        oldDate = dateHandle(oldDate)
        this.setState({
            loading: true
        })
        AuthProvider.getAccessToken()
        .then((resolve,reject)=>{
            return promiseXHR(url2, {type:'Bearer',value:resolve}, {Day: [oldDate, newDate], LizID: LizID}, 'post')
        }).then(res => {
            let oldhotwordList = JSON.parse(res).resultContent
            let {colorList} = this.state
            let size = 60000
            oldhotwordList.map((v,i) => {
                oldhotwordList[i].name = v.Word
                oldhotwordList[i].value = Math.sqrt(size)
                size-=50
            })
            let hotwordList = oldhotwordList.slice(0, 100)
            this.setState({
                oldhotwordList: oldhotwordList,
                hotwordList: hotwordList,
                loading: false
            })
            // 初始化词云并配置
            let chart = echarts.init(document.getElementById('wordList'))
            let option = {
                series: [ {
                    type: 'wordCloud',
                    sizeRange: [12, 50],
                    rotationRange: [0, 0],
                    rotationStep: 45,
                    gridSize: 8,
                    shape: 'ellipticity',
                    width: 800,
                    height: 400,
                    drawOutOfBound: false,
                    textStyle: {
                        normal: {
                            color: function () {
                                return colorList[Math.floor(Math.random()*7)]
                            }
                        },
                        emphasis: {
                            color: 'red'
                        }
                    },
                    data: hotwordList.sort(function (a, b) {
                        return b.value  - a.value;
                    })
                } ]
            }
            chart.setOption(option)
            window.onresize = function () {
                chart.resize()
            }
        }).catch(err =>{
            this.setState({
                loading: false
            })
        })
    }
    render () {
        let {allTab, hotwordList, time,loading} = this.state 
        return (
            <div className="hw-container">
                <div className="HwheaderSearch">
                    <div className="row">
                        <SelectBox
                            width={116}
                            selectOption={['Top 50', 'Top 100']}
                            paramName={'num'}
                            paramaValue={[50, 100]}
                            paramDefault={{
                                // id: 1,
                                name: '热词数量'
                            }}
                            setparamsHandle={(k,num)=>{this.setState({
                                hotwordList: this.state.oldhotwordList.slice(0, num),
                                num: num
                            })}}
                        />
                    </div>
                    <div className="row input-box">
                        <input ref="searchInput" onInput={(e) => {this.filterGroup(e)}} onMouseDown={() => {this.listShow()}} type="text" placeholder="选择或输入群名称" />
                        {/* <button onMouseDown={(e) => {this.filterGroup(e)}}></button> */}
                        <ul className="group-list">
                            <li>
                                <div className="group-list-row allSelect" onMouseDown={() => {this.selectAll()}}>
                                    <div className={allTab ? 'unselected selected' : 'unselected'}></div>
                                    <span>全选</span>
                                </div>
                            </li>
                            {
                                this.state.groupList.map((item, index) => {
                                    return (
                                        <li key={item.id}>
                                            <div className="group-list-item" onMouseDown={() => {this.selectGroup(item, index)}}>
                                                <div className={item.select ? 'unselected selected' : 'unselected'} id={item.id}></div>
                                                <span>{item.name}</span>
                                            </div>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                    <div className="row searchRow-line2">
                        <button className='HwSearch-btn' onClick={this.searchHotword}>搜索</button>
                    </div>
                    {/* <ButtonBox btnTxt={'返回'} isCancel={true}
                               btnFunc={() => {this.props.changeView(null)}}/> */}
                </div>
                <div ref="HwContent" className="HwContent">
                    <div className="content-box">
                        <div ref="wordList" id="wordList" className="word-list" style={{display: loading?'none':'block'}}>
                            {/* {
                                hotwordList.map((v) => {
                                    return (
                                        <span style={{marginRight: 20, color: v.color, fontSize: v.size}}>{v.name}</span>
                                    )
                                })
                            } */}
                        </div>
                        {
                            hotwordList&&hotwordList.length>0?
                            null:
                            <div className="hw-noDataBox" style={{display: loading?'none':'block'}}>
                                <div className="hw-noData"></div>
                                <p>没有找到高频词汇哦~</p>
                            </div>
                        }
                        {
                            loading?<LoadingAnimationS />:''
                        }
                        <div ref="scroll" className="scroll" onMouseLeave={() => {this.refs.HwContent.style.cssText = 'overflow: auto;'}} onMouseEnter={() => {this.refs.HwContent.style.cssText = 'overflow: hidden;'}}>
                            <div ref="timeLine" className="time-line">
                                <div ref="selectTime" className="select-time">
                                    <div className="select-time-line">
                                        <div onMouseDown={(e) => {this.changeTime(e)}} className="big-circle">
                                            <div className="small-circle"></div>
                                        </div>
                                        {/* <p>-</p>
                                        <p>-</p>
                                        <p>-</p>
                                        <p>-</p>
                                        <p>-</p>
                                        <p>-</p> */}
                                    </div>
                                </div>
                                <p>近1年</p>
                                <p>近6月</p>
                                <p>近3月</p>
                                <p>近1月</p>
                                <p>近14天</p>
                                <p>近7天</p>
                                <p className={time>=5?'active':''}>-</p>
                                <p className={time>=4?'active':''}>-</p>
                                <p className={time>=3?'active':''}>-</p>
                                <p className={time>=2?'active':''}>-</p>
                                <p className={time>=1?'active':''}>-</p>
                                <p className={time>=0?'active':''}>-</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}