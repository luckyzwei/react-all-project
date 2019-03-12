import React from 'react'
import Item from './Item'
import Cartoon from './Cartoon'
/*
lg: >1240px
mid: 750~1240px;
sm: <750px
*/
const datas_lg = [
    {
        position: 'item',
        itemStyle: {
            left:'50%',
            top:'35.8%'
        },
        imgSrc: './images/group27.png',
        imgBoxStyle: {
            height:'100%'
        },
        title: '互动直播',
        text:'在微信环境实现多群语音\n视频直播，群内活动数据反馈'
    },
    {
        position: 'item',
        itemStyle: {
            left:'69.8%',
            top:'35.8%'
        },
        imgSrc: './images/group30.png',
        imgBoxStyle: {
            height:'100%'
        },
        title: '知识卡片',
        text:'独创卡片，1个知识点浓缩\n成1张卡，社群用户最便捷\n的阅读、保存、分享形式'
    },
    {
        position: 'item',
        itemStyle: {
            left:'50%',
            top:'63.8%'
        },
        imgSrc: './images/group28.png',
        imgBoxStyle: {
            height:'100%'
        },
        title: '群内问答',
        text:'基于权威和自定义内容知库，\n在群内「说人话」的内容问答产品'
    },
    {
        position: 'item',
        itemStyle: {
            left:'69.8%',
            top:'63.8%'
        },
        imgSrc: './images/group31.png',
        imgBoxStyle: {
            height:'100%'
        },
        title: '销售话术',
        text:'整合品牌销售话术，并以\n大数据算法每日优化'
    }
]
const datas_mid = [
    {
        position: 'item',
        itemStyle: {
            left:'50%',
            top:'35.8%'
        },
        imgSrc: './images/group27.png',
        imgBoxStyle: {
            height:'100%'
        },
        title: '互动直播',
        text:'在微信环境实现多群语音\n视频直播，群内活动数据\n反馈'
    },
    {
        position: 'item',
        itemStyle: {
            left:'75%',
            top:'35.8%'
        },
        imgSrc: './images/group30.png',
        imgBoxStyle: {
            height:'100%'
        },
        title: '知识卡片',
        text:'独创卡片，1个知识点浓缩\n成1张卡，社群用户最便捷\n的阅读、保存、分享形式'
    },
    {
        position: 'item',
        itemStyle: {
            left:'50%',
            top:'63.8%'
        },
        imgSrc: './images/group28.png',
        imgBoxStyle: {
            height:'100%'
        },
        title: '群内问答',
        text:'基于权威和自定义内容知\n库，在群内「说人话」的\n内容问答产品'
    },
    {
        position: 'item',
        itemStyle: {
            left:'75%',
            top:'63.8%'
        },
        imgSrc: './images/group31.png',
        imgBoxStyle: {
            height:'100%'
        },
        title: '销售话术',
        text:'整合品牌销售话术，并以\n大数据算法每日优化'
    }
]
const datas_sm = [
    {
        position: 'item',
        itemStyle: {
            left:'8%',
            top:'35.8%'
        },
        imgSrc: './images/group27.png',
        imgBoxStyle: {
            height:'100%'
        },
        title: '互动直播',
        text:'在微信环境实现多群语音\n视频直播，群内活动数据\n反馈'
    },
    {
        position: 'item',
        itemStyle: {
            left:'57.33%',
            top:'35.8%'
        },
        imgSrc: './images/group30.png',
        imgBoxStyle: {
            height:'100%'
        },
        title: '知识卡片',
        text:'独创卡片，1个知识点浓\n缩成1张卡，社群用户最\n便捷的阅读、保存、分\n享形式'
    },
    {
        position: 'item',
        itemStyle: {
            left:'8%',
            top:'63.8%'
        },
        imgSrc: './images/group28.png',
        imgBoxStyle: {
            height:'100%'
        },
        title: '群内问答',
        text:'基于权威和自定义内容知\n库，在群内「说人话」\n的内容问答产品'
    },
    {
        position: 'item',
        itemStyle: {
            left:'57.33%',
            top:'63.8%'
        },
        imgSrc: './images/group31.png',
        imgBoxStyle: {
            height:'100%'
        },
        title: '销售话术',
        text:'整合品牌销售话术，并\n以大数据算法每日优化'
    }
]
const ProductBox = (props) => {
    let datas;
    if(props.screenWidth>1240){
        datas = datas_lg
    }else if(props.screenWidth>750&&props.screenWidth<1241){
        datas = datas_mid
    }else{
        datas = datas_sm
    }
    return (
        <div className="productBox">
            <div className="robotBox">
            {props.screenWidth <= 750 ?  <img src={'./images/4.png'} /> : <Cartoon />}
            </div>
            <p className="title">内容产品</p>
            <div className="descriptionBox">
               {datas.map((data)=>{
                    return (
                        <div className="itemWraper">
                            <Item data={data}/>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default ProductBox
