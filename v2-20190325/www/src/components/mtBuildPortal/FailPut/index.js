/**
 * 创建时间:2018-09-17 16:45:28
 * 作者：sufei  Xerath
 * 邮箱：fei.su@gemii.cc
 * 版本号：1.0
 * @版权所有
 **/
import React, { Component } from 'react'
import './index.css'
import ButtonBox from '../../shareComponent/ButtonBox'

export default class SuccessPut extends Component {
    render() {
        let { actions, changeStep } = this.props;
        return (
            <div className='FailPut'>
                <div className="SaveFail-content">
                    <img src={process.env.PUBLIC_URL+"/images/icon/fail.png"} alt="" className="SaveFail-content-img" />
                    <div className="SaveFail-content-text">投放失败，请再次创建投放任务或取消投放</div>
                    <div className="SaveFail-content-btnbox">
                        <ButtonBox
                            btnTxt={'取消'}
                            isCancel={true}
                            btnFunc={() => {
                                actions.goTo('/v2/MTScope')
                            }}
                        />
                        <ButtonBox
                            btnTxt={'去创建'}
                            isCancel={false}
                            btnFunc={() => {
                                sessionStorage.setItem('noaddnavitem', 1);
                                changeStep('EDITTEXT')
                            }}
                        />
                    </div>
                </div>
            </div>
        )
    }
}