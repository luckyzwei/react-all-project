import React,{Component} from 'react'
import UploadBtn from '../../../shareComponent/UploadBtn'
import {textCountRange} from '../../../../funStore/CommonFun'
import {Nickname,Groupname,MemberCount,Welcome,PicText,Admin,GroupInform,Keyword,GroupLabel,CommonRadio} from '../../../giSystemPortal/EditModule/unit'

export default class Step5 extends Component {
    render(){
        const {params,setGroupEditInfo,setWelcomeMsgResp,addTag,delTag,submiting,updateInfo,viewType} = this.props
        // console.log(params,'*******')
        return (
            <div className="gi-manual-step3">
                <div className="stepTitle">
                    <span className='done'>{viewType!='ADD'?'1.选择入群页面':'1.创建入群页面'}</span>
                    <span className='done' style={{margin:'0 12px'}}>></span>
                    <span className='done'>2.建立入群规则</span>
                    <span className='done' style={{margin:'0 12px'}}>></span>
                    <span className='done'>3.填写群信息</span>
                </div>
                <div className="inner" style={{minHeight:'calc(100% - 57px)'}}>
                    <div className="public-edit content clearfix">
                        <div className="left">
                            <Groupname 
                                value = {params.groupEditInfo.name}
                                length = {textCountRange(params.groupEditInfo.name)}
                                paramName = {'name'}
                                setparamsHandle = {setGroupEditInfo}
                            />
                            {/* <Nickname 
                                value = {params.groupEditInfo.serviceRobotName}
                                length = {textCountRange(params.groupEditInfo.serviceRobotName)}
                                paramName = {'serviceRobotName'}
                                setparamsHandle = {setGroupEditInfo}
                            /> */}
                            <MemberCount 
                                value = {params.groupEditInfo.memThreshold}
                                paramName = {'memThreshold'}
                                setparamsHandle = {setGroupEditInfo}
                            />
                            {/* <CommonRadio 
                                options={{
                                    label:'群用户私拉：'
                                }}
                                sourceData={[{name:'允许',value:1},{name:'禁止',value:0}]}
                                paramName={'protectFlag'}
                                value={params.groupEditInfo.protectFlag}
                                setparamsHandle={setGroupEditInfo}
                            /> */}
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
                            {/* <Keyword 
                                keywordSimpleItems={params.groupEditInfo.keywordNames}
                                paramName={'keywordNames'}
                                addTag={addTag}
                                delTag={delTag}
                            /> */}
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
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}