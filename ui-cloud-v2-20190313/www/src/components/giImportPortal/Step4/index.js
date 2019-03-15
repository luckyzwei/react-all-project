import React,{Component} from 'react'
import './index.css'
import UploadBtn from '../../shareComponent/UploadBtn'
import {textCountRange} from '../../../funStore/CommonFun'
import {Nickname,Groupname,MemberCount,Welcome,PicText,Admin,GroupInform,Keyword,GroupLabel,CommonRadio} from '../../giSystemPortal/EditModule/unit'
import ButtonBox from '../../shareComponent/ButtonBox'

export default class Step3 extends Component {
    render(){
        const {params,setGroupEditInfo,setWelcomeMsgResp,addTag,delTag,submiting,updateInfo} = this.props
        return (
            <div className="gi-manual-step3">
            <div className="inner">
                <div className="public-edit content clearfix">
                    <div className="left">
                        <Nickname 
                            value = {params.groupEditInfo.serviceRobotName}
                            length = {textCountRange(params.groupEditInfo.serviceRobotName)}
                            paramName = {'serviceRobotName'}
                            setparamsHandle = {setGroupEditInfo}
                        />
                        <MemberCount 
                            value = {params.groupEditInfo.memThreshold}
                            paramName = {'memThreshold'}
                            setparamsHandle = {setGroupEditInfo}
                        />
                        <CommonRadio 
                            options={{
                                label:'群邀请确认：'
                            }}
                            sourceData={[{name:'启用',value:1},{name:'禁止',value:0}]}
                            paramName={'protectFlag'}
                            value={params.groupEditInfo.protectFlag}
                            setparamsHandle={setGroupEditInfo}
                        />
                        <Welcome 
                            value={params.groupEditInfo.welcomeMsgFlag}
                            defaultValue = {params.groupEditInfo.welcomeMsgFlag}
                            setparamsHandle={setGroupEditInfo}
                            welcomeMsgInterval={params.groupEditInfo.welcomeMsgInterval}
                            setWelcomeMsgResp={setGroupEditInfo}
                        />
                        {
                            params.groupEditInfo.welcomeMsgFlag==1
                            ?<PicText  
                                welcomeMsgResp={{welcomeMsgReq:params.groupEditInfo.welcomeMsgReq}}
                                length={textCountRange(params.groupEditInfo.welcomeMsgReq.items[0].content)}
                                setparamsHandle={setWelcomeMsgResp}
                            />
                            :''
                        }
                    </div>
                    <div className="right">
                        <Admin 
                            monitors={params.groupEditInfo.monitorSimpInfos}
                            paramName = {'monitorSimpInfos'}
                            setparamsHandle={setGroupEditInfo}
                        />
                        <GroupInform
                            value={params.groupEditInfo.introduce}
                            paramName={'introduce'}
                            length={textCountRange(params.groupEditInfo.introduce)}
                            setparamsHandle={setGroupEditInfo}
                        />
                        <Keyword 
                            keywordSimpleItems={params.groupEditInfo.keywordNames}
                            paramName={'keywordNames'}
                            addTag={addTag}
                            delTag={delTag}
                        />
                        <GroupLabel 
                            groupLabelProfiles={params.groupEditInfo.groupLabelNames}
                            paramName={'groupLabelNames'}
                            addTag={addTag}
                            delTag={delTag}
                        />
                        <div className="buttonArea">
                            <UploadBtn 
                                loading={submiting}
                                text={"保存"}
                                loadingText={"保存中"}
                                clickHandle={updateInfo}
                                propsStyle={{
                                    width:'108px',
                                    height:'36px',
                                    float:'right',
                                    fontWeight:400,
                                    marginRight:'50px'
                                }}
                            />
                            <ButtonBox 
                                btnTxt={'上一步'}
                                isCancel={true}
                                btnStyle={{
                                    float:'right'
                                }}
                                btnFunc={this.props.prevStep}
                            />
                        </div>
                    </div>
                </div>
            </div>
            </div>
        )
    }
}