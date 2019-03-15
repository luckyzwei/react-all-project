import React from 'react'
import ButtonBox from '../shareComponent/ButtonBox'

//账户状态 1 正常 2 租户有群但是账户没群 3 租户没有群

const BgFlowBox = ({selectRoomType,dragObject,distance,oldDistance,actions,accountStatus}) => {
    let cssHeight = dragObject!=null ? distance+oldDistance+240 : oldDistance+240
    return (
        <div className='bgFlowBox'
        style={Object.assign({},{display:selectRoomType=='GROUP'||selectRoomType=='MEMBER'||selectRoomType=='GROUPMSG'||selectRoomType=='KEYWORDS'?'none':'block'},{height: 'calc(100% - '+cssHeight+'px)'},{opacity:accountStatus==0?0:1})}
        >
        {
            accountStatus==3 ?
            <div className="innerBox">
                <img src={process.env.PUBLIC_URL+"/images/icon/gm_nogroup.png"} alt=""/>
                <p>你一个群都没有呢，去导入或者新建一个群，<br/>去体验群消息强大的管理功能吧！</p>
                <div className="btnBox">
                    <ButtonBox
                        btnTxt={'新建群'}
                        styleName={'noBg'}
                        btnStyle={{marginRight: '30px'}}
                        btnFunc={() => actions.goTo('/v2/GIScope')}
                    />
                    <ButtonBox
                        btnTxt={'导入群'}
                        styleName={'confirm'}
                        btnFunc={() => actions.goTo('/v2/RMScope')}
                    />
                </div>
            </div>
            :
            <div className="innerBox">
                <img src={process.env.PUBLIC_URL+"/images/icon/gm_nogroup.png"} alt=""/>
                <p>你的账号还没有绑定群，<br/>请联系管理员帮你绑定需要管理的群吧。</p>
            </div>
        }
        </div>
    )
}

export default BgFlowBox
