import React, { Component } from 'react'
import './index.css'
import TypeSelect from '../TypeSelect'
import FastBuild from '../fastModule/FastBuild'
import AccurateBuild from '../accurateModule/AccurateBuild'
import EditTemplate from '../EditTemplate'
import FastEditBuild from '../fastEditModule/FastEditBuild'
import AccurateEditBuild from '../accurateEditModule/AccurateEditBuild'

/* ********
typeMap:
1 => 手动
2 => 批量
3 => 精准
4 => 快速
********* */

/* 
    viewType: 
    ADD 新增
    EDIT 编辑
*/

/**
 * pageType: ACCURATE_BUILD,ACCURATE_EDIT,FAST_BUILD,FAST_EDIT,SELECT
**/

export default class GIbuildMain extends Component {
    constructor(props){
        super(props)
        this.state = {
            pageType: 'SELECTMODAL',
            modalType: '',
            selectTemplateData: null,
            customize: false
        }
    }
    componentDidMount(){
        
    }
    selectType=(pageType, type)=>{
        // 选择建群类型,上一步，下一步操作
        this.setState({pageType,modalType: type?type:''})
        if(pageType==='SELECT'||pageType=='FAST_EDIT'||pageType==='SELECTMODAL'){
            this.props.setPromptFlagHandle(false)
        }else{
            this.props.setPromptFlagHandle(true)
        }
        
    }
    selectEditTemplate=(templateData)=>{
        // console.log(templateData)
        this.setState({
            selectTemplateData: templateData
        })
    }
    cancelBuild = (flag) => {
        this.selectType('SELECT')
        this.setState({customize: flag})
    }
    render() {
        const {selectTemplateData,customize,modalType} = this.state
        const {actions,setPromptFlagHandle} = this.props
        const {pageType} = this.state
        return (
            <div className="gi-build">
                {
                    // 页面选择
                    pageType==='SELECTMODAL'?
                    <div className="select-modal">
                        <p className="select-title">选择最适合你的建群场景</p>
                        <div className="modal-box">
                            <div className="modal-card" onClick={() => this.selectType('ACCURATE_BUILD','city')}>
                                <div className="modal-card-bg bg1">
                                    <p className="modal-type">按城市建群</p>
                                </div>
                                <em className="hover-bg-black"></em>
                                <div className="hover-bg">
                                    <p className="title">收集信息：</p>
                                    <ul className="items">
                                        <li className="item">城市</li>
                                    </ul>
                                    <p className="desc">建立一个选择城市的页面，用户选择城市后，将被分配到该城市微信群。</p>
                                </div>
                            </div>
                            <div className="modal-card" onClick={() => this.selectType('ACCURATE_BUILD','store')}>
                                <div className="modal-card-bg  bg2">
                                    <p className="modal-type">按门店建群</p>
                                </div>
                                <em className="hover-bg-black"></em>
                                <div className="hover-bg">
                                    <p className="title">收集信息：</p>
                                    <ul className="items">
                                        <li className="item">城市</li>
                                        <li className="item">门店</li>
                                    </ul>
                                    <p className="desc">建立一个选择城市和门店的页面，用户选择门店后，将被分配到该门店微信群。</p>
                                </div>
                            </div>
                            <div className="modal-card" onClick={() => this.selectType('ACCURATE_BUILD','dueDate')}>
                                <div className="modal-card-bg  bg3">
                                    <p className="modal-type">按月龄建群</p>
                                </div>
                                <em className="hover-bg-black"></em>
                                <div className="hover-bg">
                                    <p className="title">收集信息：</p>
                                    <ul className="items">
                                        <li className="item">城市</li>
                                        <li className="item">手机号</li>
                                        <li className="item">预产期/生日</li>
                                    </ul>
                                    <p className="desc">建立一个选择城市、预产期/生日、填写手机号的页面，用户提交信息后，将按照月龄段分配到对应的群。</p>
                                </div>
                            </div>
                            <div className="modal-card" onClick={() => this.selectType('FAST_BUILD')}>
                                <div className="modal-card-bg  bg4">
                                    <p className="modal-type">活码建群</p>
                                </div>
                                <em className="hover-bg-black"></em>
                                <div className="hover-bg only">
                                    <p className="desc">生成裂变二维码，用户扫码后按顺序进入微信群，突破传统裂变工具只能建立100人入群的限制。</p>
                                </div>
                            </div>
                            <div className="modal-card" onClick={()=>this.cancelBuild(false)}>
                                <div className="modal-card-bg  bg5">
                                    <p className="modal-type">现有建群页面</p>
                                </div>
                                <em className="hover-bg-black"></em>
                                <div className="hover-bg only">
                                    <p className="desc">选择已经建立的入群页面，可在该页面下继续建群。</p>
                                </div>
                            </div>
                            <div className="modal-card" onClick={()=>this.cancelBuild(true)}>
                                <div className="modal-card-bg  bg6">
                                    <p className="modal-type customize"><em></em>自定义建群</p>
                                </div>
                                <em className="hover-bg-black"></em>
                                <div className="hover-bg only">
                                    <p className="desc">按照您的个性化需求设置入群页面，以及用户的入群条件。</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    :""
                }
                {
                    // 页面选择
                    pageType==='SELECT'?<TypeSelect customize={customize} selectType={this.selectType} actions={actions} selectEditTemplate={this.selectEditTemplate}/>:""
                }
                {
                    // 精准新建
                    pageType==='ACCURATE_BUILD'?<AccurateBuild modalType={modalType} selectType={this.selectType} cancelBuild={this.cancelBuild} actions={actions} setPromptFlagHandle={setPromptFlagHandle}/>:''
                }
                {
                    // 快速新建
                    pageType==='FAST_BUILD'?<FastBuild selectType={this.selectType} cancelBuild={this.cancelBuild} actions={actions} setPromptFlagHandle={setPromptFlagHandle}/>:''
                }
                {
                    // 编辑页面
                    pageType==='TEMPLATE_EDIT'?<EditTemplate selectTemplateData={selectTemplateData} selectType={this.selectType}/>:''
                }
                {
                    // 根据已有页面精准入群
                    pageType==='ACCURATE_EDIT'?<AccurateEditBuild selectTemplateData={selectTemplateData} selectType={this.selectType} cancelBuild={this.cancelBuild} actions={actions} setPromptFlagHandle={setPromptFlagHandle}/>:''
                }
                {
                    // 根据已有页面快速入群
                    pageType==='FAST_EDIT'?<FastEditBuild selectTemplateData={selectTemplateData} selectType={this.selectType}/>:''
                }
            </div>
        )
    }
}