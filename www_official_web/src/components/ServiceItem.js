import React, {Component} from 'react'



// const datamodel = [
//   {
//     itemStyle:{
//       left:'50%',
//       top:'60%',
//     },
//     imgSrc: './images/group1.png',
//     title:'高效便捷的客群管理工具',
//     desc:'便捷的 24 小时顾客社群自动化管理与服务平台智能 AI 与人工对话无缝衔接，提高顾客响应效率高效管理比例，顾客服务覆盖可超 1：10,000 人'
//   },
//   {
//     itemStyle:{
//       left:'50%',
//       top:'60%',
//     },
//     imgSrc: './images/group2.png',
//     title:'您随身携带的销售百科全书',
//     desc:'自定义行业和产品知识库，人工智能辅助问答服务分享同行业权威专家知识库，共享话术并实时学习 API 连接第三方工具和内容平台'
//   },
//   {
//     itemStyle:{
//       left:'50%',
//       top:'60%',
//     },
//     imgSrc: './images/group3.png',
//     title:'贴心的顾客个性化服务',
//     desc:'为每一位销售人员装备 Mini 个性化推荐引擎连接线上线下用户洞察，提供专属顾客服务多场景触发 Push ，决不放过任何销售机会'
//   }
// ]

export const  ServiceItem  =  ({itemStyle,imgSrc,imgStyle,title,desc}) => {
        return (
            <div style = {itemStyle} >
                <div className="imgBox" >
                    <img src={imgSrc} alt="" style = {{width:'100%'}} />
                </div>
                <div className="textBox">
                    <h3>{title}</h3>
                    <pre>{desc}</pre>
                </div>
            </div>
        )
}

export const InfoForPhone = ({model}) => {
  return (
    <div style = {{width:'100%',height:'100%'}}>
      {
        model.map((item) =>
        <div style = {{width:'100%',height:'450px',background:item.background,padding:'0 20px',boxSizing:'border-box'}}>
            <ServiceItem
            itemStyle = {item.itemStyle}
            imgSrc = {item.imgSrc}
            title = {item.title}
            desc = {item.desc} />
        </div>
      )}
    </div>
  )
}
