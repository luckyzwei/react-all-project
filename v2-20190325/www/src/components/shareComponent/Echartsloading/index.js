import React from 'react'
import './index.css'

const Loading =()=>{
    return <div className='echartsLoad'>
        <img className='icon-echartsLoad' src={process.env.PUBLIC_URL+'/images/icon/loading.svg'}/>
    </div>
}

export default Loading