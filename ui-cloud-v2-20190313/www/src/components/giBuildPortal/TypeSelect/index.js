import React,{Component} from 'react'
import './index.css'
import ButtonBox from '../../shareComponent/ButtonBox'
import AccuratePhonePreview from '../accurateModule/AccuratePhone/AccuratePhonePreview'
import FastPhonePreview from '../fastModule/PreviewBox/FasPhonePreview'
// import {mocaData} from './mocaData'
import LoadingAnimationS from '../../shareComponent/LoadingAnimationS';
import { API_PATH } from '../../../constants/OriginName';
import AuthProvider from '../../../funStore/AuthProvider';
import promiseXHR from '../../../funStore/ServerFun';
import SearchInput from '../../shareComponent/SearchInput'


//  buildFlag 新增 ADD 编辑 EDIT

export default class TypeSelect extends Component {
    constructor(props){
        super(props)
        this.state = {
            buildFlag: 'INIT',
            storeList: [],
            pageData: {},
            allData: []
        }
    }
    componentDidMount(){
        const url = `${API_PATH}/groupadmin-api/authsec/group/join/templates?_currentPage=0&_pageSize=-1`
        AuthProvider.getAccessToken()
        .then((resolve,reject)=>{
            return promiseXHR(url,{type:'Bearer',value:resolve},{type:null},'post')
        }).then(res => {
            const resData = JSON.parse(res)
            this.setState({
                storeList: resData.resultContent.map(v => ({key:v.name,value:v.id})),
                pageData: resData.resultContent[0]?resData.resultContent[0]:{},
                allData: resData.resultContent?resData.resultContent:[],
                buildFlag: resData.resultContent.length>0?'EDIT':'ADD'
            })
            this.props.selectEditTemplate(resData.resultContent[0])
        }).catch(err => {
            console.log(err)
        })
    }
    selectBuildType = (value) => {
        this.setState({
            buildFlag: value
        })
    }
    selectHandle = (selectValue) =>{
        let pageData = this.state.allData.find(v => v.id==selectValue.value)
        this.setState({pageData})
        this.props.selectEditTemplate(pageData)
    }
    render () {
        const {buildFlag,pageData,allData,storeList} = this.state
        const {selectType,actions} = this.props
        return (
            buildFlag==='INIT'
            ?<LoadingAnimationS/>
            :<div className="typeSelect">
                <div className="inner" style={{display: buildFlag=='ADD'?'block':'none'}}>
                    <div className="step2">
                        <div className="buildType">创建入群页面</div>
                        <div className="step2-item">
                            <img className="step2-image" src={process.env.PUBLIC_URL+"/images/icon/gi_build3.png"}/>
                            <p className="step2-text">你可以设置每个群的匹配规则，当用户选择不同选项时，被分配进入不同的群。</p>
                            <ButtonBox
                                btnTxt={"精准入群"}
                                btnStyle={{
                                    margin: '0 auto'
                                }}
                                btnFunc={() => {
                                    selectType('ACCURATE_BUILD')
                                }}
                            />
                        </div>
                        <div className="step2-item">
                            <img className="step2-image" src={process.env.PUBLIC_URL+"/images/icon/gi_build4.png"}/>
                            <p className="step2-text">用户不用填写任何信息，会被依次邀请进还没满员的群。</p>
                            <ButtonBox
                                btnTxt={"快速入群"}
                                styleName={"green"}
                                btnStyle={{
                                    margin: '0 auto'
                                }}
                                btnFunc={() => {
                                    selectType('FAST_BUILD')
                                }}
                            />
                        </div>
                        <div className="buttonBox">
                            <ButtonBox
                                btnTxt={"返回"}
                                isCancel={true}
                                btnStyle={{
                                    float:'right',
                                    margin: 0
                                }}
                                btnFunc={() => {
                                    allData.length==0?
                                    actions.goTo('/v2/GIScope')
                                    :this.selectBuildType('EDIT')
                                }}
                            />
                        </div>
                    </div>
                </div>
                <div className="inner-edit" style={{display: buildFlag=='EDIT'?'block':'none'}}>
                    <div className="typeselect-previewBox">
                        {
                            pageData.type
                            ?pageData.type==4
                                ?<FastPhonePreview pageData={pageData}/>
                                :<AccuratePhonePreview pageData={pageData}/>
                            :''
                        }
                        <div className="right">
                            <div className="row1">
                                <SearchInput 
                                    dataList={storeList}
                                    paramDefault={storeList[0]}
                                    selectHandle={this.selectHandle}
                                />
                                <div className="editBtn" onClick={()=>{selectType('TEMPLATE_EDIT')}}>
                                    <span className="icon-edit"></span>
                                    编辑页面
                                </div>
                            </div>
                            <div className="row2">
                                没有想要的入群页面？点击<span className="row2-build-txt" onClick={()=>{this.selectBuildType('ADD')}}>新建</span>一个吧
                            </div>
                            <div className="row3">
                                <ButtonBox
                                    btnTxt={"去建群"}
                                    isCancel={false}
                                    btnStyle={{
                                        float:'right',
                                        margin: 0
                                    }}
                                    btnFunc={() => {
                                        pageData.type==4?
                                        selectType('FAST_EDIT')
                                        :selectType('ACCURATE_EDIT')
                                    }}
                                />
                                <ButtonBox
                                    btnTxt={"返回"}
                                    isCancel={true}
                                    btnStyle={{
                                        float:'right'
                                    }}
                                    btnFunc={() => {
                                        actions.goTo('/v2/GIScope')
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}