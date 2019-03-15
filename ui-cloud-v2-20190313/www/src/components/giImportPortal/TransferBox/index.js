import React,{Component} from 'react'
import './index.css'
import { sendEvent } from '../../../funStore/CommonFun';

const LeftHeader = ({checkAll1,checkAllHandle,refreshHandle}) => {
    return (
        <div className="leftHeader">
            <div>未选群</div>
            <div>
                <span className='refresh' onClick={refreshHandle}>刷新</span>
                <span className={checkAll1?"icon-check checked":"icon-check"} onClick={()=>{checkAllHandle(1)}}></span>
                <span>全选</span>
            </div>
        </div>
    )
}


const RightHeader = ({checkAll2,checkAllHandle}) => {
    return (
        <div className="rightHeader">
            <div>托管群</div>
            <div>
                <span className={checkAll2?"icon-check checked":"icon-check"} onClick={()=>{checkAllHandle(2)}}></span>
                <span>全选</span>
            </div>
        </div>
    )
}

const Item = ({data,singleCheck}) => {
    return (
        <div className={data.status!=2?"item item-disable":"item"} onClick={(e)=>{data.status!=2&&singleCheck(e,data)}}>
            <div className="content">
                <span className="groupName">
                    {data.name}
                {
                    data.status==2
                        ?<span className="unhosted">已托管</span>
                        :data.masterType==1
                            ?<span className="master">群主</span>
                            :''
                }
                </span>
                {
                    data.status!=2?<span className={data.checked?"icon-check checked":"icon-check"}></span>:''
                }    
            </div>
        </div>
    )
}

export default class TransferBox extends Component {
    constructor(props){
        super(props)
        this.state = {
            blockFlag: false
        }
    }
    singleCheck =(e,data)=>{
        this.props.singleCheck(e,data)
    }
    refreshHandle=()=>{
        if(this.state.blockFlag) return
        this.setState({blockFlag: true})
        this.props.requestGroupList().then(res => {
            sendEvent('message', {txt: '刷新群列表成功', code: 1000})
            this.setState({blockFlag: false})
        })
    }
    render(){
        const {checkAll1,checkAll2,sourceData,checkAllHandle,transferHandle}=  this.props
        return (
            <div className="public-transferBox">
                <div className="left">
                    <div className="header">
                        <LeftHeader checkAll1={checkAll1} checkAllHandle={checkAllHandle} refreshHandle={this.refreshHandle}/>
                    </div>
                    <div className="list">
                        {
                            sourceData.filter(v => v.checkStatus==1).map(v => {
                                return <Item data={v} singleCheck={this.singleCheck}/>
                            })
                        } 
                    </div>
                </div>
                <div className="center">
                    <div className="goLeft" onClick={()=>{transferHandle(2,1)}}></div>
                    <div className="goRight" onClick={()=>{transferHandle(1,2)}}></div>
                </div>
                <div className="right">
                    <div className="header">
                        <RightHeader checkAll2={checkAll2} checkAllHandle={checkAllHandle}/>
                    </div>
                    <div className="list">
                        {
                            sourceData.filter(v => v.checkStatus==2).map(v => {
                                return <Item data={v} singleCheck={this.singleCheck}/>
                            })
                        } 
                    </div>
                </div>
            </div>
        )
    }
}