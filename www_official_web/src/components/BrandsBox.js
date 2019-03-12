import React,{Component} from 'react'
import LazyLoad from 'react-lazyload';
// lg: >750px;
// sm: <750px
const datas_sm = [
    {
        src:'./images/main/mobile/logo_a.png',
    },
    {
        src:'./images/main/mobile/logo_b.png',
    },
    {
        src:'./images/main/mobile/logo_c.png',
    },
    {
        src:'./images/main/mobile/logo_d.png',
    },
    {
        src:'./images/main/mobile/logo_e.png',
    },
    {
        src:'./images/main/mobile/logo_f.png',
    },
    {
        src:'./images/main/mobile/logo_g.png',
    },
    {
        src:'./images/main/mobile/logo_h.png',
    },
    {
        src:'./images/main/mobile/logo_i.png',
    },
    {
        src:'./images/main/mobile/logo_j.png',
    },
    {
        src:'./images/main/mobile/logo_k.png',
    },
    {
        src:'./images/main/mobile/logo_l.png',
    },
    {
        src:'./images/main/mobile/logo_m.png',
    },
    {
        src:'./images/main/mobile/logo_n.png',
    },
    {
        src:'./images/main/mobile/logo_o.png',
    },
    {
        src:'./images/main/mobile/logo_p.png',
    },
    {
        src:'./images/main/mobile/logo_q.png',
    },
    {
        src:'./images/main/mobile/logo_r.png',
    },
    {
        src:'./images/main/mobile/logo_s.png',
    },
    {
        src:'./images/main/mobile/logo_t.png',
    },
    {
        src:'./images/main/mobile/logo_u.png',
    },
    {
        src:'./images/main/mobile/logo_v.png',
    },
    {
        src:'./images/main/mobile/logo_w.png',
    },
    {
        src:'./images/main/mobile/logo_x.png',
    },
    {
        src:'./images/main/mobile/logo_y.png',
    },
    {
        src:'./images/main/mobile/logo_z.png',
    },
    {
        src:'./images/main/mobile/logo_z1.png',
    },
    {
        src:'./images/main/mobile/logo_z2.png',
    },
]

const datas_lg = [
    {
        src:'./images/main/pc/logo_a.png',
    },
    {
        src:'./images/main/pc/logo_b.png',
    },
    {
        src:'./images/main/pc/logo_c.png',
    },
    {
        src:'./images/main/pc/logo_d.png',
    },
    {
        src:'./images/main/pc/logo_e.png',
    },
    {
        src:'./images/main/pc/logo_f.png',
    },
    {
        src:'./images/main/pc/logo_g.png',
    },
    {
        src:'./images/main/pc/logo_h.png',
    },
    {
        src:'./images/main/pc/logo_i.png',
    },
    {
        src:'./images/main/pc/logo_j.png',
    },
    {
        src:'./images/main/pc/logo_k.png',
    },
    {
        src:'./images/main/pc/logo_l.png',
    },
    {
        src:'./images/main/pc/logo_m.png',
    },
    {
        src:'./images/main/pc/logo_n.png',
    },
    {
        src:'./images/main/pc/logo_o.png',
    },
    {
        src:'./images/main/pc/logo_p.png',
    },
    {
        src:'./images/main/pc/logo_q.png',
    },
    {
        src:'./images/main/pc/logo_r.png',
    },
    {
        src:'./images/main/pc/logo_s.png',
    },
    {
        src:'./images/main/pc/logo_t.png',
    },
    {
        src:'./images/main/pc/logo_u.png',
    },
    {
        src:'./images/main/pc/logo_v.png',
    },
    {
        src:'./images/main/pc/logo_w.png',
    },
    {
        src:'./images/main/pc/logo_x.png',
    },
    {
        src:'./images/main/pc/logo_y.png',
    },
    {
        src:'./images/main/pc/logo_z.png',
    },
    {
        src:'./images/main/pc/logo_z1.png',
    },
    {
        src:'./images/main/pc/logo_z2.png',
    },


]
const BrandsBox = (props) => {
    let datas;
    if(props.screenWidth>750){
        datas = datas_lg
    }else{
        datas = datas_sm
    }
    return (
        <div className="brandsBox">
            <p className="title">{`${props.screenWidth > 750 ? '全商业生态合作 资源交互提升用户价值' : '全商业生态合作'}`}</p>
            {props.screenWidth > 750 ? '' : <p className="title">资源交互提升用户价值</p>}
            <div className="blueline"></div>
            {/*<p className="title">&nbsp;全商业生态合作 资源交互提升用户价值</p>*/}
            <div className="logosBox">
                {datas.map((data,index)=>{
                    return (<div className="logo" key={index}>
                        <LazyLoad><img src={data.src} alt=""/></LazyLoad>
                    </div>)
                })}
            </div>
        </div>
    )
}
export default BrandsBox