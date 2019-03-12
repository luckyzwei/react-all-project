import React from 'react' 
import Item from './Item'
// lg: >750px;
// sm: <750px
const datas_lg = [
    {
        position: 'item',
        itemStyle: {
        },
        imgSrc: './images/group36.png',
        imgBoxStyle: {
            width:'100%'
        },
        title: '海量客群一站式部署',
        text:'开放一站式 SaaS 和私有 PaaS 平台\n轻松实现客群定制化托管运营\n按需支撑服务弹性扩展、伸缩\n引领企业步入 SaaS 智能销售新时代'
    },
    {
        position: 'item',
        itemStyle: {
        },
        imgSrc: './images/group37.png',
        imgBoxStyle: {
            width:'100%'
        },
        title: '云端大数据精准分析',
        text:'专精于客群数据深度挖掘\n实时感知客户需求\n生成多维「用户画像」，洞察客户成长周期\n精确定位客群热点，大幅提升销售效率'
    },
    {
        position: 'item',
        itemStyle: {
        },
        imgSrc: './images/group38.png',
        imgBoxStyle: {
            width:'100%'
        },
        title: '贴心机器人助手',
        text:'基于亿级语料深度学习\n借助 NLP 技术打造自然人机对话交互\n秒级响应智能问答\n缩减人工成本，提高响应效率'
    }
]
const datas_sm = [
    {
        position: 'item',
        itemStyle: {
            height:'422px',
            paddingTop: '50px',
            boxSizing: 'border-box'
        },
        imgSrc: './images/group36.png',
        imgBoxStyle: {
            width:'100%'
        },
        title: '海量客群一站式部署',
        text:'开放一站式 SaaS 和私有 PaaS 平台\n轻松实现客群定制化托管运营\n按需支撑服务弹性扩展、伸缩\n引领企业步入 SaaS 智能销售新时代'
    },
    {
        position: 'item',
        itemStyle: {
            height: '455px',
            background: '#FFFFFF',
            paddingTop: '75px',
            boxSizing: 'border-box'
        },
        imgSrc: './images/group37.png',
        imgBoxStyle: {
            width:'100%'
        },
        title: '云端大数据精准分析',
        text:'专精于客群数据深度挖掘\n实时感知客户需求\n生成多维「用户画像」，洞察客户成长周期\n精确定位客群热点，大幅提升销售效率'
    },
    {
        position: 'item',
        itemStyle: {
            height: '435px',
            paddingTop: '75px',
            boxSizing: 'border-box'
        },
        imgSrc: './images/group38.png',
        imgBoxStyle: {
            width:'100%'
        },
        title: '贴心机器人助手',
        text:'基于亿级语料深度学习\n借助 NLP 技术打造自然人机对话交互\n秒级响应智能问答\n缩减人工成本，提高响应效率'
    }
]

const ServiceBox = (props) => {
    let datas;
    if(props.screenWidth>750){
        datas = datas_lg
    }else {
        datas = datas_sm
    }
    return (
        <div className={'serviceBox'}>
            <p className={'title'}>全栈式客群解决方案</p>
            <p className={'text'}>适合各类企业客群应用场景</p>
            <div className="techBox">
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

export default ServiceBox;