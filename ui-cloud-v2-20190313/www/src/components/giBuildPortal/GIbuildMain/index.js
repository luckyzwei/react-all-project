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
            pageType: 'SELECT',
            selectTemplateData: null
        }
    }
    componentDidMount(){
        
    }
    selectType=(pageType)=>{
        // 选择建群类型,上一步，下一步操作
        this.setState({pageType})
        if(pageType==='SELECT'||pageType=='FAST_EDIT'){
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
    cancelBuild = () => {
        this.selectType('SELECT')
    }
    render() {
        const {selectTemplateData} = this.state
        const {actions,setPromptFlagHandle} = this.props
        const {pageType} = this.state
        return (
            <div className="gi-build">
                {
                    // 页面选择
                    pageType==='SELECT'?<TypeSelect selectType={this.selectType} actions={actions} selectEditTemplate={this.selectEditTemplate}/>:""
                }
                {
                    // 精准新建
                    pageType==='ACCURATE_BUILD'?<AccurateBuild selectType={this.selectType} cancelBuild={this.cancelBuild} actions={actions} setPromptFlagHandle={setPromptFlagHandle}/>:''
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