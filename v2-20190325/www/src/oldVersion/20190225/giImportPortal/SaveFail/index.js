/**
 * 创建时间:2018-09-06 17:14:43
 * 作者：sufei  Xerath
 * 邮箱：fei.su@gemii.cc
 * 版本号：1.0
 * @版权所有
 **/
import React, { Component } from 'react'
import '../../giBuildPortal/SaveFail/index.css'

import ButtonBox from '../../shareComponent/ButtonBox'


export const SaveFail= ({cancelBuild,updateInfo}) => {
    return (
        <div className='SaveFail'>
            <div className="SaveFail-content">
                <img src={process.env.PUBLIC_URL+"/images/icon/fail.png"} alt="" className="SaveFail-content-img" />
                <div className="SaveFail-content-text">保存失败，请再次保存或取消创建</div>
                <div className="SaveFail-content-btnbox">
                    <ButtonBox
                        btnTxt={'取消'}
                        isCancel={true}
                        btnFunc={cancelBuild}
                    />
                    <ButtonBox
                        btnTxt={'保存'}
                        isCancel={false}
                        btnFunc={updateInfo}
                    />
                </div>
            </div>
        </div>
    )
}