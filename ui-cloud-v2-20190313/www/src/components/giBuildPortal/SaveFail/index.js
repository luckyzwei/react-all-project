import React, { Component } from 'react'
import './index.css'

import ButtonBox from '../../shareComponent/ButtonBox'


export const SaveFail= ({cancelBuild,nextStep}) => {
    return (
        <div className='SaveFail'>
            <div className="SaveFail-content" style={{top:'40%'}}>
                <img src={process.env.PUBLIC_URL+"/images/icon/fail.png"} alt="" className="SaveFail-content-img" />
                <div className="SaveFail-content-text">保存失败，请返回重新保存或取消创建</div>
                <div className="SaveFail-content-btnbox">
                    <ButtonBox
                        btnTxt={'取消'}
                        isCancel={true}
                        btnFunc={cancelBuild}
                    />
                    <ButtonBox
                        btnTxt={'返回'}
                        isCancel={false}
                        btnFunc={()=>{nextStep(false)}}
                    />
                </div>
            </div>
        </div>
    )
}