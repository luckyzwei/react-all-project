import React, {Component} from 'react'
import './index.css'

import {Keywords} from "../../../giSystemPortal/EditModule/unit";
import Radio from "../../../shareComponent/Radio";
import ButtonBox from "../../../shareComponent/ButtonBox";
import {sendEvent} from "../../../../funStore/CommonFun";
import AuthProvider from '../../../../funStore/AuthProvider';
import promiseXHR from '../../../../funStore/ServerFun';
import {API_PATH} from "../../../../constants/OriginName";

export default class Step1 extends Component {
    constructor() {
        super();
        this.state = {
            keywordSimpleItems: [],
            checkItems: [],
            params: {
                title: '',
                groupItems: [],
                ruleMatchType: 1,//2触发条件
                kwMatchType: 1,//0 匹配模式
                status: 1,
                kwRuleActions: [
                    {
                        kwRemoveAction: {
                            type: 0,//1,3 踢人
                        },
                        type: 1,//3 踢人、回复
                    },
                    {
                        kwAutoRespAction: {
                            responseType: 1,//3回复模式
                        },
                        type: 1
                    }
                ]

            }
        }
        this.changeIpt = this.changeIpt.bind(this);
        this.setTemplateHandle = this.setTemplateHandle.bind(this);
    }

    changeIpt(e) {
        let {params} = this.state;
        params.title = e.target.value;
        this.setState({params});
    }

    addTag = (k, v) => {
        let keywordSimpleItems = this.state.keywordSimpleItems
        if (keywordSimpleItems) {
            keywordSimpleItems.push({
                "name": v
            })
        } else {
            keywordSimpleItems = [{
                "name": v,
            }]
        }
        this.setState({keywordSimpleItems})
    }

    setTemplateHandle(k, v) {
        // console.log(k, v);
        let {params} = this.state;
        switch (k) {
            case 'condition':
                params.ruleMatchType = v;
                break;
            case 'hacking':
                if (params.kwRuleActions[0].kwRemoveAction) {
                    params.kwRuleActions[0].kwRemoveAction.type = v;
                    params.kwRuleActions[0].type = 3
                } else {
                    params.kwRuleActions[1].kwRemoveAction.type = v;
                    params.kwRuleActions[1].type = 3
                }
                break;
            case 'match':
                params.kwMatchType = v;
                break;
            case 'reply':
                if (params.kwRuleActions[1].kwAutoRespAction) {
                    params.kwRuleActions[1].kwAutoRespAction.responseType = v;
                    params.kwRuleActions[1].type = 1;
                } else {
                    params.kwRuleActions[0].kwAutoRespAction.responseType = v;
                    params.kwRuleActions[0].type = 1;
                }
                break
        }
        this.setState({
            params
        })
    }

    delTag = (k, i) => {
        let keywordSimpleItems = this.state.keywordSimpleItems;
        keywordSimpleItems.splice(i, 1);
        this.setState({keywordSimpleItems})
    }

    componentDidMount() {
        // console.log('添加新规则', this.props.confirmData);
        this.setState({
            keywordSimpleItems: this.props.confirmData.keywordProfiles,
            params: this.props.confirmData
        })
    }

    componentWillReceiveProps(nextProps) {
        // console.log('添加新规则', nextProps.confirmData);
        this.setState({
            keywordSimpleItems: nextProps.confirmData.keywordProfiles,
            params: nextProps.confirmData
        })

    }

    componentWillUnmount() {
    }

    nextStep = () =>{
        const {params,keywordSimpleItems} = this.state
        const {changeStep,saveKeywordData,viewId} = this.props
        if(params.keywordProfiles.length == 0) {
            sendEvent('message', {txt: '请先添加关键词', code: 1003, timer: 3000})
            return false
        }
        let checkParams = keywordSimpleItems.map(v => v.name)
        const url = `${API_PATH}/groupadmin-api/authsec/groupadmin/keywordmgmt/tenant/keyword/check${viewId?'?ruleId='+viewId:''}`
        AuthProvider.getAccessToken().then(token => {
            return promiseXHR(url, {type: 'bearer', value: token}, checkParams, "post")
        }).then(res => {
            const resData = JSON.parse(res)
            if(resData.resultCode==100){
                this.setState({
                    checkItems: []
                })
                params.keywordProfiles = keywordSimpleItems
                saveKeywordData(params)
                changeStep('STEP2')
            }else if(resData.resultCode==101){
                sendEvent('message', {txt: '存在重复关键词，请删除', code: 1004, timer: 3000})
                this.setState({
                    checkItems: resData.resultContent
                })
            }
        })
    }

    render() {
        let {keywordSimpleItems, params,checkItems} = this.state;
        let {changeView, changeStep} = this.props;
        return (
            <div className='Step1'>
                {/* <div className="Step1-title">
                    第一步：新增关键词
                </div> */}
                <div className="stepTitle">
                    <span className='done'>1.新增关键词</span>
                    <span className='todo' style={{margin:'0 12px'}}>></span>
                    <span className='todo'>2.编辑自动回复素材</span>
                    <span className='todo' style={{margin:'0 12px'}}>></span>
                    <span className='todo'>3.选择生效目标群</span>
                </div>
                <div className='Step1-content'>
                    <div className="Step1-content-row">
                        <input className='Step1-content-row-ipt' value={params.title} type='text' placeholder='输入关键词标题'
                               onChange={this.changeIpt}/>
                    </div>
                    <div className="Step1-content-row">
                        <Keywords
                            keywordSimpleItems={keywordSimpleItems}
                            paramName={'keywordSimpleItems'}
                            addTag={this.addTag}
                            delTag={this.delTag}
                            isCheck={true}
                            checkItems={checkItems}
                        />
                    </div>
                    <div className="Step1-content-radio">
                        <div className="Step1-content-radio-item">
                            <div className="title">触发关键词条件：</div>
                            <Radio
                                paramName={'condition'}
                                value={params.ruleMatchType}
                                sourceData={[{name: '随时可以触发', value: 2}, {name: '仅在@助手时触发', value: 1}]}
                                onChange={this.setTemplateHandle}
                                styles={{display: "flex", flexDirection: "column", alignItems: 'flex-start'}}
                                styless={{marginBottom: '8px'}}
                            />
                        </div>
                        {/* <div className="Step1-content-radio-item">
                            <div className="title">触发关键词踢人：</div> */}
                            {/* <Radio
                                paramName={'hacking'}
                                value={params.kwRuleActions[0].kwRemoveAction ? params.kwRuleActions[0].kwRemoveAction.type : params.kwRuleActions[1].kwRemoveAction.type}
                                sourceData={[{name: '不踢人', value: 0}, {name: '踢出发言人', value: 3}, {
                                    name: '踢出发言中@的用户',
                                    value: 1
                                }]}
                                onChange={this.setTemplateHandle}
                                styles={{display: "flex", flexDirection: "column", alignItems: 'flex-start'}}
                                styless={{marginBottom: '8px'}}
                            />
                            <div className='Step1-content-radio-item-tips'>仅限群助手为群主时可用</div> */}
                            {/* <Radio
                                paramName={'hacking'}
                                value={params.kwRuleActions[0].kwRemoveAction ? params.kwRuleActions[0].kwRemoveAction.type : params.kwRuleActions[1].kwRemoveAction.type}
                                sourceData={[{name: '不踢人', value: 0}]}
                                onChange={this.setTemplateHandle}
                                styles={{display: "flex", flexDirection: "column", alignItems: 'flex-start'}}
                                styless={{marginBottom: '8px'}}
                            />
                        </div> */}
                        <div className="Step1-content-radio-item">
                            <div className="title">匹配模式：</div>
                            <Radio
                                paramName={'match'}
                                value={params.kwMatchType}
                                sourceData={[{name: '精准匹配', value: 1}, {
                                    name: '模糊匹配',
                                    value: 0
                                }]}
                                onChange={this.setTemplateHandle}
                                styles={{display: "flex", flexDirection: "column", alignItems: 'flex-start'}}
                                styless={{marginBottom: '8px'}}
                            />
                        </div>
                        <div className="Step1-content-radio-item">
                            <div className="title">触发关键词回复：</div>
                            <Radio
                                paramName={'reply'}
                                value={params.kwRuleActions[1].kwAutoRespAction ? params.kwRuleActions[1].kwAutoRespAction.responseType : params.kwRuleActions[0].kwAutoRespAction.responseType}
                                sourceData={[{name: '随机回复一条素材', value: 2}, {name: '回复全部素材', value: 1}]}
                                onChange={this.setTemplateHandle}
                                styles={{display: "flex", flexDirection: "column", alignItems: 'flex-start'}}
                                styless={{marginBottom: '8px'}}
                            />
                        </div>
                    </div>
                    <div className="Step1-footer">
                        <ButtonBox
                            btnTxt={"上一步"}
                            isCancel={true}
                            btnFunc={() => {
                                changeView('KEYMAINLIST')
                            }}
                        />
                        <ButtonBox
                            btnTxt={"下一步"}
                            isCancel={false}
                            btnFunc={this.nextStep}
                        />
                    </div>
                </div>
            </div>
        )
    }
}
