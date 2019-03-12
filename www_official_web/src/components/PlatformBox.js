import React from 'react' 
import Item from './Item'
const datas_lg = [
    {
        position: 'item',
        itemStyle: {
            left: '17.4%',
            top: '29.5%'
        },
        imgSrc: './images/sass01.png',
        imgBoxStyle: {
            height:'100%'
        },
        title: '用户聚合',
        text:'门店、公众号、社群、APP\n多渠道连接'
    },
    {
        position: 'item',
        itemStyle: {
            left: '56.9%',
            top: '29.5%'
        },
        imgSrc: './images/sass02.png',
        imgBoxStyle: {
            height:'83.33%'
        },
        title: '客群监测',
        text:'全天候客群态势监测，智能\n感知多种用户交流场景'
    },
    {
        position: 'item',
        itemStyle: {
            left: '17.4%',
            top: '64.7%'
        },
        imgSrc: './images/sass03.png',
        imgBoxStyle: {
            height:'90%'
        },
        title: '内容库',
        text:'同行业专家与领先品牌共建行业知识库\n利用大数据优化销售话术'
    },
    {
        position: 'item',
        itemStyle: {
            left: '56.9%',
            top: '64.7%'
        },
        imgSrc: './images/sass04.png',
        imgBoxStyle: {
            height:'100%'
        },
        title: '智能投放',
        text:'人工智能对话引擎+\n商品活动个性化推荐引擎驱动'
    }
]
const datas_sm = [
    {
        position: 'item',
        itemStyle: {
            left: '0%',
            top: '25.2%'
        },
        imgSrc: './images/sass01_2x.png',
        imgBoxStyle: {
            height:'100%'
        },
        title: '用户聚合',
        text:' 门店、公众号、社群、\nAPP多渠道连接'
    },
    {
        position: 'item',
        itemStyle: {
            left: '50%',
            top: '25.2%'
        },
        imgSrc: './images/sass02_2x.png',
        imgBoxStyle: {
            height:'83.33%'
        },
        title: '客群监测',
        text:'  全天候客群态势监测，\n智能感知多种用户交流场景'
    },
    {
        position: 'item',
        itemStyle: {
            left: '0%',
            top: '58%'
        },
        imgSrc: './images/sass03_2x.png',
        imgBoxStyle: {
            height:'90%'
        },
        title: '内容库',
        text:'同行业专家与领先品牌\n共建行业知识库利用\n大数据优化销售话术'
    },
    {
        position: 'item',
        itemStyle: {
            left: '50%',
            top: '58%'
        },
        imgSrc: './images/sass04_2x.png',
        imgBoxStyle: {
            height:'100%'
        },
        title: '智能投放',
        text:'人工智能对话引擎+\n商品活动个性化推荐\n引擎驱动'
    }
]
const datas_mid = [
    {
        position: 'item',
        itemStyle: {
            left: '10%',
            top: '29.6%'
        },
        imgSrc: './images/sass01.png',
        imgBoxStyle: {
            height:'100%'
        },
        title: '用户聚合',
        text:'门店、公众号、社群、\nAPP多渠道连接'
    },
    {
        position: 'item',
        itemStyle: {
            left: '50%',
            top: '29.5%'
        },
        imgSrc: './images/sass02.png',
        imgBoxStyle: {
            height:'83.33%'
        },
        title: '客群监测',
        text:'全天候客群态势监测，\n智能感知多种用户交流场景'
    },
    {
        position: 'item',
        itemStyle: {
            left: '10%',
            top: '64.7%'
        },
        imgSrc: './images/sass03.png',
        imgBoxStyle: {
            height:'90%'
        },
        title: '内容库',
        text:'同行业专家与领先品\n牌共建行业知识库利\n用大数据优化销售话术'
    },
    {
        position: 'item',
        itemStyle: {
            left: '50%',
            top: '64.7%'
        },
        imgSrc: './images/sass04.png',
        imgBoxStyle: {
            height:'100%'
        },
        title: '智能投放',
        text:'人工智能对话引擎+\n商品活动个性化推荐\n引擎驱动'
    }
]
// mid margin-left:137px
const PlatformBox = (props) => {
    let datas;
    if(props.screenWidth>1140){
        datas = datas_lg
    }else if(props.screenWidth<1141&&props.screenWidth>750){
        datas = datas_mid
    }else{
        datas = datas_sm
    }
    return (
        <div className="platformBox">
            <p className="title">智能客群 SaaS 平台</p>
            {datas.map((data)=>{
                return <Item data={data}/>
            })}
        </div>
    )
}

export default PlatformBox