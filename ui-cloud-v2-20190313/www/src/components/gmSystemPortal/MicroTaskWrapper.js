import React, { Component } from 'react'
import $ from 'jquery'
import _ from 'lodash'
import MicroTaskBox from './MicroTaskBox'

const LoadingAnimation  = () => {
  return(
        <div className="loadingBox">
            <div className="loadingGif">
                <img src={`${process.env.PUBLIC_URL}/images/icon/loading.svg`} alt=""/>
            </div>
            <div className="loadingText">加载中...</div>
        </div>
    )
}

const mapToArray = (obj) => {
    let arr = []
    for(let k in obj){
        arr.push({
            groupNo: k,
            item: obj[k]
        })
    }
    return arr
}

class MicroTaskWrapper extends Component{
    constructor(props){
        super(props)
        this.state={
            currentId: 0,
            loading: false
        }
        this.msgFreshCallBack = this.msgFreshCallBack.bind(this)
    }

    msgFreshCallBack () {
        this.setState({
            loading: false
        })
        // this.refs.fresh.style.display = 'none';
        $('.fresh').css('display','none')
        this.refs.rightBox.scrollTop = this.refs.rightBox.scrollTop-50;
    }

    setStateAsync(state) {
        return new Promise((resolve) => {
        this.setState(state, resolve)
        });
    }
    scrollHandle () {
        let {rightBox,fresh} = this.refs;
        let scrollTop = rightBox.scrollTop;
        let scrollHeight = rightBox.scrollHeight;
        let clientHeight = rightBox.offsetHeight;
        if(!this.state.loading){
            if(scrollTop==scrollHeight-clientHeight){
                // 上拉刷新...
                // console.log('请求数据啦')
                this.setStateAsync({
                    loading: true
                })
                .then((resolve)=>{
                    // console.log(this.state.loading)
                    // fresh.style.display = 'block'
                    $('.fresh').css('display','block')
                    this.props.scrollEvent(this.msgFreshCallBack)
                })
            }
        }
    }

    extendClickHandle (id) {
        this.setState({
            currentId: id
        })
    }
    render () {
        // status 0--初始化 2--已发送  3--发送失败
        // type 0--普通图文活动  1--图文链接活动
        //  "ttaskPicItems": [
        //                         {
        //                         "createDate": 1497665699000,
        //                         "creatorId": "7ca3489e-1d9d-4ea4-ad66-565310f1f37a",
        //                         "picId": "1",
        //                         "picPath": "http://p2.wmpic.me/article/2017/04/05/1491360811_KGDMrHbN_215x185.jpg",
        //                         "status": 0,
        //                         "updateDate": 1497665699000
        //                     }
        //                 ]
        // updateDate: '更新时间'
        let {currentId} = this.state;
        let {microTaskList,actions,taskTip,groupId} = this.props
        let taskList = microTaskList.taskList
        // console.log(taskList)
        return (
            <div className="rightBox" ref='rightBox' onScroll={this.scrollHandle.bind(this)}>
                {taskList.map((data,id)=>{
                    return data.status==0||data.status==3?null
                            :<MicroTaskBox
                                key={id}
                                id={id}
                                extendClickHandle={this.extendClickHandle.bind(this,id)}
                                currentId={currentId}
                                task={data}
                            />
                })}
                {
                    groupId
                    ?microTaskList.taskList.length>0?
                    <div className='fresh' ref='fresh' style={{display:'none',padding:'10px 0',textAlign:'center',fontSize:'26px'}}>
                        <LoadingAnimation />
                    </div>:
                    <div className="emptyTask">
                        <div className="img" style={{background:`url(${process.env.PUBLIC_URL}/images/icon/cw_notask.png) 0 0/120px no-repeat`}}></div>
                        <p>还没有投放信息哦<br/>快去创建投放吧</p>
                    </div>
                    :<div className="emptyTask">
                        <div className="img" style={{background:`url(${process.env.PUBLIC_URL}/images/icon/cw_notask.png) 0 0/120px no-repeat`}}></div>
                        <p>点击群，查看群投放吧</p>
                    </div>
                }
            </div>
        )
    }
}
export default MicroTaskWrapper
