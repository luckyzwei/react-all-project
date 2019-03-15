import React,{Component} from 'react'
import './index.css'
import SelectBox from '../../../shareComponent/SelectBox'
// import Tag from '../../../shareComponent/Tag'
import UploadFile from '../../../shareComponent/UploadFile'
import UploadBtn from '../../../shareComponent/UploadBtn'
import {textCountRange,sendEvent} from '../../../../funStore/CommonFun'
import { API_PATH } from '../../../../constants/OriginName'
import promiseXHR from '../../../../funStore/ServerFun'
import AuthProvider from '../../../../funStore/AuthProvider'

export default class EditModal extends Component {
    constructor(props){
        super(props)
        this.state = {
            params: Object.assign({},{
                "firstClass":null,
                "secondClass":null,
                "thirdClass":null,
                "knowledgeBasePicture": [],
                "userId": "",
                "knowledgeBaseLabel": [],
                "answer": "",
                "problem": ""
            },props.selectItem),
            level1Data: {
                option: [],
                value: []
            },
            level2Data: {
                option: [],
                value: []
            },
            level3Data: {
                option: [],
                value: []
            },
            submiting: false
        }
    }
    componentWillMount(){
        this.handleLevel1Data()
        // if(this.state.params.secondClass){
        //     let level2Data = categoryList.find(v => v.id==params.firstClass).thirdClass
        //     this.handleLevel2Data(level2Data)
        // }
        // if(this.state.params.thirdClass){
        //     let level2Data = categoryList.find(v => v.id==params.firstClass).thirdClass
        //     let level3Data = level2Data==null||level2Data.length==0?[]:level2Data.find(v => v.id==params.secondClass).thirdClass
        //     this.handleLevel3Data(level3Data)
        // }
    }
    handleLevel1Data=()=>{
        const {categoryList,selectCategory} = this.props
        let {params} = this.state
        let level1Data={
            option: [],
            value: []
        }
        categoryList.forEach(v => {
            if (v.className !== '未分类') {
                level1Data.option.push(v.className)
                level1Data.value.push(v.id)
            } 
        })
        selectCategory&&(params.firstClass = selectCategory)
        this.setState({level1Data,params})
    }
    // handleLevel2Data = (data) => {
    //     let level2Data={
    //         option: [],
    //         value: []
    //     }
    //     data&&data.forEach(v => {
    //         level2Data.option.push(v.className)
    //         level2Data.value.push(v.id)
    //     })
    //     this.setState({level2Data})
    // }
    // handleLevel3Data = (data) => {
    //     let level3Data={
    //         option: [],
    //         value: []
    //     }
    //     data&&data.forEach(v => {
    //         level3Data.option.push(v.className)
    //         level3Data.value.push(v.id)
    //     })
    //     this.setState({level3Data})
    // } 
    setparamsHandle=(k,v)=>{
        let params = this.state.params
        let {categoryList} = this.props
        params[k] = v
        // 对目录的处理
        // if(k=='firstClass'){
        //     params['secondClass']=null
        //     params['thirdClass']=null
        //     let level2Data = categoryList.find(v => v.id==params.firstClass).thirdClass
        //     this.handleLevel2Data(level2Data)
        //     this.handleLevel3Data([])
        // }
        // if(k=='secondClass'){
        //     params['thirdClass']=null
        //     let level2Data = categoryList.find(v => v.id==params.firstClass).thirdClass
        //     let level3Data = level2Data==null||level2Data.length==0?[]:level2Data.find(v => v.id==params.secondClass).thirdClass
        //     this.handleLevel3Data(level3Data)
        // }
        this.setState({params})
    }
    // addTag = (tag) => {
    //     let {params} = this.state
    //     params.knowledgeBaseLabel.push({
    //         labelName: tag
    //     })
    //     this.setState({params})
    // }
    // delTag = (index) => {
    //     let {params} = this.state
    //     params.knowledgeBaseLabel.splice(index,1)
    //     this.setState({params})
    // }
    problemInput = (e) => {
        // 问题输入
        let value = e.target.value
        if(textCountRange(value)<=20){
            this.setparamsHandle('problem',value)
        }
    }
    answerInput = (e) => {
        // 答案输入
        let value = e.target.value
        if(textCountRange(value)<=2000){
            this.setparamsHandle('answer',value)
        }
    }
    addImg = (res) => {
        // 新增图片
        let {params} = this.state
        params.knowledgeBasePicture.push({
            image:res.url
        })
        this.setState({params})
    }
    delImg = (index) => {
        // 删除图片
        let {params} = this.state
        params.knowledgeBasePicture.splice(index,1)
        this.setState({params})
    }
    submitData = () => {
        const {type,selectItem,userId} = this.props
        let {params,submiting} = this.state
        // console.log(params)
        if(!params.problem.replace(/(^\s*)|(\s*$)/g, "")){
            sendEvent('message', {txt: "请添加问题",code: 1004})
            return false
        }
        if(!params.answer.replace(/(^\s*)|(\s*$)/g, "")){
            sendEvent('message', {txt: "请添加答案",code: 1004})
            return false
        }
        if(submiting) return
        this.setState({
            submiting: true
        })
        params.userId = userId
        const url = type=='ADD'?`${API_PATH}/knowledge-base/authsec/knowledge`:`${API_PATH}/knowledge-base/authsec/knowledge/${selectItem.id}`
        AuthProvider.getAccessToken().then((resolve,reject)=>{
            return promiseXHR(url,{type:'Bearer',value:resolve},params,type=='ADD'?'POST':'PUT')
        }).then(res => {
            const resData = JSON.parse(res)
            if(resData.resultCode=='100'){
                this.setState({submiting: false})
                this.props.hideEditModal()
                if(type!=='ADD'){
                    this.props.updateList(resData.resultContent)
                }
                this.props.initCategory()
                this.props.repullList()
                sendEvent('message', {txt: type=='ADD'?"新增内容成功":"编辑内容成功",code: 1000})
            }else{
                throw '新增失败'
            }
        }).catch(err =>{
            this.setState({submiting: false})
            sendEvent('message', {txt: type=='ADD'?"新增内容失败":"编辑内容失败",code: 1004})
        })
    }
    render(){
        const {level1Data,level2Data,level3Data,params,submiting} = this.state
        const {type,hideEditModal,selectCategory,categoryList} = this.props
        return (
            <div className="modalWrapper">
                <div className="modalBox cw-editModal">
                    <div className="title">
                        {type=='ADD'?'新增内容':'编辑内容'}
                    </div>
                    <div className="editBox">
                        <div className="row row-middle">
                            <span className="label">目录：</span>
                            <SelectBox 
                                placeholder={'请选择目录'}
                                selectOption={level1Data.option}
                                paramName={'firstClass'}
                                paramaValue={level1Data.value}
                                setparamsHandle={this.setparamsHandle}
                                width='632px'
                                paramDefault={
                                    selectCategory?{
                                        name: categoryList.map(item => {
                                            return item.id == selectCategory ? item.className : ''
                                        }),
                                        id: selectCategory
                                    }:undefined
                                }
                                clear={params.firstClass===null}
                            />
                            {/* <SelectBox 
                                placeholder={'不选择'}
                                selectOption={level2Data.option}
                                paramName={'secondClass'}
                                paramaValue={level2Data.value}
                                setparamsHandle={this.setparamsHandle}
                                width='200px'
                                paramDefault={
                                    params.secondClass?{
                                        name: level2Data.option[level2Data.value.indexOf(params.secondClass)],
                                        id: params.secondClass
                                    }:undefined
                                }
                                clear={params.secondClass===null}
                            />
                            <SelectBox 
                                placeholder={'不选择'}
                                selectOption={level3Data.option}
                                paramName={'thirdClass'}
                                paramaValue={level3Data.value}
                                setparamsHandle={this.setparamsHandle}
                                width='200px'
                                paramDefault={
                                    params.thirdClass?{
                                        name: level3Data.option[level3Data.value.indexOf(params.thirdClass)],
                                        id: params.thirdClass
                                    }:undefined
                                }
                                clear={params.thirdClass===null}
                            /> */}
                        </div>
                        {/* <div className="row">
                            <span className="label">标签：</span>
                            <div className="tagBox">
                                <Tag
                                    text={'添加标签'}
                                    style={{
                                        background: '#E9F9F0',
                                        borderRadius: '12px',
                                        border:'0 none',
                                        fontFamily: 'PingFang SC',
                                        fontSize: '14px',
                                        color: '#69D398',
                                        lineHeight:'24px',
                                        height: '24px',
                                        marginBottom:'8px'
                                    }}
                                    limit={10}
                                    tags={params.knowledgeBaseLabel.map(v => v.labelName)}
                                    onAdd={this.addTag}
                                    onDel={this.delTag}
                                />
                                <div className="limit">{`${params.knowledgeBaseLabel.length}/10个`}</div>
                            </div>
                        </div> */}
                        <div className="row row-middle">
                            <span className="label">问题：</span>
                            <div className="questionBox">
                                <input type="text" placeholder="请输入问题" value={params.problem} onChange={this.problemInput}/>
                                <div className="limit">{`${parseInt(textCountRange(params.problem))}/20`}</div>
                            </div>
                        </div>
                        <div className="row">
                            <span className="label">答案：</span>
                            <div className="answerBox">
                                <textarea placeholder="请输入答案" value={params.answer} onChange={this.answerInput}/>
                                <div className="limit">{`${parseInt(textCountRange(params.answer))}/2000`}</div>
                            </div>
                        </div>
                        <div className="row" style={{paddingLeft:'44px'}}>
                            {
                                params.knowledgeBasePicture.map((v,i) => {
                                    return (
                                        <div className="imgPreview">
                                            <div className="img" style={{backgroundImage:`url(${v.image})`}}></div>
                                            <div className="delBtn" onClick={()=>{this.delImg(i)}}></div>
                                        </div>
                                    )
                                })
                            }{
                                params.knowledgeBasePicture.length<1?<UploadFile 
                                    onChange={this.addImg}
                                    onDelete={()=>{}}
                                    imgUrl={''}
                                    limitSize={4194304}
                                    text={'图片不超过1MB'}
                                    clear={true}
                                />:''
                            }
                        </div>
                    </div>
                    <div className="buttonArea">
                        <UploadBtn 
                            loading={submiting}
                            text={"提交"}
                            loadingText={"提交中"}
                            clickHandle={this.submitData}
                            propsStyle={{
                                width:'108px',
                                height:'36px',
                                float:'right',
                                marginRight:'28px'
                            }}
                        />
                    </div>
                    <div className="closeBtn" onClick={hideEditModal}></div>
                </div>
            </div>
        )
    }
}