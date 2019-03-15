import React, { Component } from "react";
import {ThrowTab,WordTab} from './GroupTab'
import {getHomePageTask} from "../../../funStore/FetchApi"
import {tongji} from '../../../funStore/tongji'
let wordData=[
    {
        name:'1上海预产期4月份',
        num:120
    },
    {
        name:'2上海宝山区惠氏母婴群预产期4月份',
        num:120
    },
    {
        name:'3上海宝山区惠氏母婴群预产期4月份',
        num:120
    },{
        name:'3上海宝山区惠氏母婴群预产期4月份',
        num:120
    },
    {
        name:'上海宝山区惠氏母婴群预产期4月份',
        num:120
    },
    {
        name:'上海宝山区惠氏母婴群预产期4月份',
        num:120
    },
    {
        name:'上海宝山区惠氏母婴群预产期4月份',
        num:120
    },
    {
        name:'上海宝山区惠氏母婴群预产期4月份',
        num:120
    },
    {
        name:'上海宝山区惠氏母婴群预产期4月份',
        num:120
    },
    {
        name:'宝山区惠氏母婴群预产期4月份',
        num:120
    },
    {
        name:'上海宝山区惠氏母婴群预产期4月份',
        num:120
    },
    {
        name:'上海宝山区惠氏母婴群预产期4月份',
        num:120
    }



]
export default class HomeTab extends Component {
    constructor(props){
        super(props)
        this.state={
            viewType:1,//0 会话榜 1:群投放
            groupThrow:[],//群投放

        }

    }

    componentDidMount() {
        getHomePageTask().then(res => {
            res = JSON.parse(res);
            if (res.resultCode === "100") {
                this.setState({
                    groupThrow: res.resultContent
                })
            } else {

            }
        }).catch(req => {
        })


    }


    changeNav=(nextType)=>{
        this.setState({
            viewType:nextType
        })
        nextType==0?tongji('Lzc_QunZhuangTai_HuiHuaBang'):tongji('Lzc_QunZhuangTai_QunTouFang')
    }

    render() {
        const {viewType,groupThrow} =this.state
        const {groupData,actions} = this.props
        return (
            <div className="rowhome-tab">
                <div className="navibar">
                    <div className="navi">
                        {/* <div className={`item ${viewType==0?'active':''}`} onClick={()=>this.changeNav(0)}>会话榜</div>
                        <span className='line'/> */}
                        <div className={`item ${viewType==1?'active':''}`} onClick={()=>this.changeNav(1)}>群投放</div>
                        <div className={`item ${viewType==1?'more':''}`} onClick={()=>actions.goTo('/v2/MTScope')}>更多></div>
                    </div>
                    {/* <div className="bar" style={{left:viewType==1?'0px':'0'}}/> */}
                </div>
                <div className='data-list'>
                    {
                        // viewType==0
                        //     ?
                        //     <WordTab data={wordData}/>:
                            <ThrowTab data={groupThrow} actions={this.props.actions}/>
                    }

                </div>
            </div>
        )
    }
}
