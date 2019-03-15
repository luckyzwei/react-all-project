import React, { Component, PropTypes } from 'react'

 const PageLoading = () => {
    return(
        <div className="LoadingAnimation loadingMoving" style = {{background:'white',width:'100%'}}>
            <div className="loadBox" style = {{top:'40%'}}>
                <img src={`${process.env.PUBLIC_URL}/images/icon/liziloading.gif`} alt="" style={{width:'120px',height:'120px',display:'block',margin:'0 auto'}}/>
                <div className="loadText" style={{color: "#58a7f8",fontSize: "14px",textAlign: "center",marginTop: "0px"}}>页面跳转中...</div>
            </div>
        </div>
    )
}
export default PageLoading
