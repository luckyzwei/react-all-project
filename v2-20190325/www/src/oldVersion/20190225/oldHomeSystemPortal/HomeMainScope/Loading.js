import React from 'react'

export const Loading =()=>{
    return <div className='echartsLoad'>
        <img src={process.env.PUBLIC_URL+'/images/icon/loading.svg'}/>
    </div>
}