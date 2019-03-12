import React from 'react'

const IntroduceBox = ({device}) => {
    return (
        <div style = {{width:'100%',height:'100%',
        background: device == 'phone' ? 'white' : '#F8F8F8',
        textAlign:'center',
        paddingTop:device == 'phone' ? '75px' : '110px' ,
        fontSize:'20px',
        lineHeight:device == 'phone' ? '35px' : '40px' }} >
            打造「零售超级战士」<br/>
            赋能销售顾问，数字化升级线下零售
        </div>
    )
}

export default IntroduceBox
