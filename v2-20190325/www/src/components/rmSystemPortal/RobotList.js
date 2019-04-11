import React, { Component } from 'react'
import promiseXHR from '../../funStore/ServerFun'
import AuthProvider from '../../funStore/AuthProvider'
import {API_PATH} from '../../constants/OriginName'
import SelectBox from '../shareComponent/SelectBox'
import QRCodeMask from './QRCodeMask'
import HowImprotgroup from './HowImprotgroup'
import PageRule from '../shareComponent/PageRule'
import {tongji} from '../../funStore/tongji'
import LoadingAnimationS from '../shareComponent/LoadingAnimationS';
import {sendEvent} from "../../funStore/CommonFun";

export default class RobotList extends Component {
    constructor(props){
        super(props)
        this.state={
            robotMsg:{
                pageInfo:{
                    currentPage: 0,
                    pageSize: 20,
                    totalRecords: 1
                }
            },
            robotMsgLoad: true,
            selectData:{
                selectLabel:'助手状态：',
                selectOption:[
                    '正常',
                    '已满',
                    '封号(等待替换)',
                ],
                paramaName:'status',
                paramaValue:[1,2,3],
            },
            searchParamas:{status:null,name:'',imCode:''},
            showMask:false,
            robotCode:'',
            qrCode:'',
            groupLeaveNum:'',
            robotStatus:'',
            importGroupNum1:0,
            importGroupNum2:0,
            showHowImprotgroup:false
        }
        this.setParamasHandle=this.setParamasHandle.bind(this)
        this.showMaskHandle=this.showMaskHandle.bind(this)
        this.refreshALL=this.refreshALL.bind(this)
        this.getInitData=this.getInitData.bind(this)
        this.changeInitData=this.changeInitData.bind(this)
        this.getImportGroup=this.getImportGroup.bind(this)
        this.search = this.search.bind(this)
    }
    componentWillMount(){
        this.getInitData(0)
    }
    componentDidMount(){
        this.getImportGroup(0);
        this.getImportGroup(1);
    }
    getImportGroup(num){
        let {importGroupNum} = this.state;
        let url=API_PATH+'/marketplaceui/authsec/marketplace/tenant/resource/freecount?_resourceType='+num;
        AuthProvider.getAccessToken()
            .then((resolve,reject)=>{
                return promiseXHR(url,{type:'Bearer',value:resolve},null,'GET')
            })
            .then(res=>{
                if (num==0){
                    this.setState({
                        importGroupNum1:JSON.parse(res).resultContent
                    })
                }else if(num==1){
                    this.setState({
                        importGroupNum2:JSON.parse(res).resultContent
                    })
                }
            })
    }
    changeRBCode(value){
      this.setState({
        searchParamas:{
          ...this.state.searchParamas,
          imCode:value
        }
      })
    }

    changeRBName(value){
      this.setState({
        searchParamas:{
          ...this.state.searchParamas,
          name:value
        }
      })
    }
    getInitData(page){
        this.setState({
            robotMsgLoad:true
        })
        let searchParamas = this.state.searchParamas
        let pageInfo = this.state.robotMsg.pageInfo
        const url=API_PATH + '/groupadmin-api/authsec/groupadmin/tenant/robot';
        AuthProvider.getAccessToken()
            .then((resolve,reject)=>{
            return promiseXHR(url+'?_page='+page+'&_size='+pageInfo.pageSize,{type:'Bearer',value:resolve},searchParamas,'POST')
            })
            .then((res)=>{
                const data = JSON.parse(res);
                // console.log(data)
                if(data.resultCode=='100'){
                    this.setState({
                        robotMsg:data,
                        robotMsgLoad:false
                    })
                }else{
                    sendEvent('message', {txt: '获取小助手失败', code: 1004, timer: 3000})
                    // throw '查询小助手失败'
                }
            }).catch(err =>{
                console.log(err)
                this.setState({
                    robotMsgLoad:false
                })
            })

    }
    changeInitData(value){
        this.setState({
            robotMsg:value
        })
    }
    setParamasHandle(name, value) {
        // console.log(name,value)
        let searchParamas = this.state.searchParamas
        searchParamas[name] = value
        this.setState({
            searchParamas:searchParamas
        })
    }
    showMaskHandle(status,value,qrCode,groupLeaveNum,robotStatus){
        status&&tongji('Lzc_ZhiNengZuShou_ErWeiMa')
        this.setState({
            showMask:status,
            robotCode:value,
            qrCode:qrCode,
            groupLeaveNum:groupLeaveNum,
            robotStatus:robotStatus
        })
    }
    goGroupList(code,qrCode,robotId,robotNickName,robotStatus,groupLeaveNum,h5Url){
        tongji('Lzc_ZhiNengZuShou_QunLieBiao')
        this.props.getQRCode(code,qrCode,robotId,robotNickName,robotStatus,groupLeaveNum,h5Url)
        this.props.changeView('GROUPLIST')
    }
    search(){
        tongji('Lzc_ZhiNengZuShou_SouSuo')
        this.getInitData(0)
    }
    refreshALL(){
        const {robotMsg} =this.state;
        let currentPage=robotMsg.pageInfo.currentPage;
        tongji('Lzc_ZhiNengZuShou_ShuaXinRobot')
        this.getInitData(currentPage)
    }
    pageRequest=(pageInfo)=>{
        let searchParamas = this.state.searchParamas
        const url=API_PATH + '/groupadmin-api/authsec/groupadmin/tenant/robot';
        AuthProvider.getAccessToken()
            .then((resolve,reject)=>{
            return promiseXHR(url+'?_page='+pageInfo.currentPage+'&_size='+pageInfo.pageSize,{type:'Bearer',value:resolve},searchParamas,'POST')
            })
            .then((res)=>{
                const data = JSON.parse(res);
                if(data.resultCode=='100'){
                    this.setState({
                        robotMsg: data,
                        robotMsgLoad: false
                    })
                }else{
                    throw '查询小助手失败'
                }
            }).catch(err =>{
                console.log(err)
                this.setState({
                    robotMsgLoad:false
                })
            })
    }
    changeShowHow=()=> {
        this.setState({showHowImprotgroup: !this.state.showHowImprotgroup})
    }
    render(){
        const {selectData,showMask,robotMsg,groupLeaveNum,robotStatus,searchParamas,importGroupNum1,importGroupNum2,robotMsgLoad,showHowImprotgroup} = this.state;
        const {changeView} = this.props
        const changeRBCode = this.changeRBCode.bind(this)
        const changeRBName = this.changeRBName.bind(this)
        // console.log(robotMsg)
        let importGroupNum=parseInt(importGroupNum1)+parseInt(importGroupNum2)
        let url=API_PATH + '/groupadmin-api/authsec/groupadmin/tenant/robot';
        return(
            <div className="robotList">
                <div className="robotSearch">
                    <SelectBox
                        selectLabel={selectData.selectLabel}
                        placeholder={"请选择"}
                        width={200}
                        selectOption={selectData.selectOption}
                        paramName={selectData.paramaName}
                        paramaValue={selectData.paramaValue}
                        setparamsHandle = {this.setParamasHandle}
                        all = {true}
                    />
                    <div className='selectWrapper'>
                        <div className='selectLabel'>助手昵称：</div>
                        <input className='titleInput' type='text'
                          ref = 'searchRName'
                          placeholder='请输入'
                          style = {{color:'#485767'}}
                          onChange = {(e)=>{
                            changeRBName(e.target.value)
                          }}
                          />
                    </div>
                    <div className='selectWrapper'>
                        <div className='selectLabel'>助手编号：</div>
                        <input className='titleInput' type='text'
                          ref = 'searchRCode'
                          placeholder='请输入'
                          style = {{color:'#485767'}}
                          onChange = {(e)=>{
                            changeRBCode(e.target.value)
                          }}
                          />
                    </div>
                    <a href="javascript:;" className="searchButton" onClick={this.search}>搜索</a>
                </div>
                <div>
                    <div className="robotTableList">
                        <div className="operation">
                            <p className="rmMsg">助手共计：<span>{robotMsg.pageInfo?robotMsg.pageInfo.totalRecords:''}</span> 个</p>
                            {/* <p className="importGroupNum">还可导入：<span>{importGroupNum}</span> 个群</p> */}
                            <span className="refreshAll" onClick={this.refreshALL}>
                                <em className="icon-gi"></em>
                                刷新
                            </span>
                            <span className="refreshAll how" onClick={() => {
                                this.setState({showHowImprotgroup: true})
                            }}>
                                如何导入一个群？
                            </span>

                        </div>

                        <div className="robotTable">
                            <table>
                                <thead>
                                <tr>
                                    <th >序号</th>
                                    <th >助手昵称</th>
                                    <th >助手编号</th>
                                    <th >状态</th>
                                    <th >已激活群</th>
                                    <th >剩余额度</th>
                                    <th >操作</th>
                                </tr>
                                </thead>
                                {robotMsgLoad ?
                                    <div className="loadBox">
                                        <LoadingAnimationS/>
                                    </div>
                                    :
                                <tbody>
                                {
                                    robotMsg.resultContent ?
                                        robotMsg.resultContent.map((item,index)=>{
                                        return (
                                            <tr key={index}>
                                                <td>{index+1}</td>
                                                <td>{item.robotItem.name}</td>
                                                <td>{item.robotItem.imCode==undefined?'--':item.robotItem.imCode}</td>
                                                <td className="robotStatus" >
                                                    {
                                                        item.robotItem.status==3 ?
                                                            <div style={{display:'inline-block',position:'relative',color:'#F75A5A'}}>
                                                                <em className="icon-home"></em>
                                                                封号(等待替换)
                                                                <span className="describetion">
                                                                    <i></i>
                                                                    <span>当前助手被封号，请手动关闭所有所在群的群主验证功能，等待自动替换助手</span>
                                                                </span>
                                                            </div>
                                                            :(item.robotItem.status==2||item.groupLeaveNum==0)?'满群':item.robotItem.status==1 ?'正常':''
                                                    }
                                                </td>
                                                {/* <td onClick={this.showMaskHandle.bind(this,true,item.robotItem.code,item.robotItem.qrCode,item.groupLeaveNum,item.robotItem.status)}>点击查看</td> */}
                                                <td>{item.successCount}</td>
                                                <td>{item.groupLeaveNum}</td>
                                                <td>{item.groupLeaveNum==0?null:<span><span onClick={this.showMaskHandle.bind(this,true,item.robotItem.code,item.robotItem.qrCode,item.groupLeaveNum,item.robotItem.status)}>二维码</span> <em></em></span> }<span onClick={this.goGroupList.bind(this,item.robotItem.code,item.robotItem.qrCode,item.robotItem.id,item.robotItem.name,item.robotItem.status,item.groupLeaveNum,item.robotItem.h5Url||false)}>群列表</span></td>
                                            </tr>
                                        )
                                        })
                                        :null
                                }
                                </tbody>
                                }
                            </table>
                            <div className="pageFooter" style={{display: 'flex',justifyContent: 'center',marginTop: '50px'}}>
                                {
                                    robotMsg.pageInfo&&robotMsg.pageInfo.totalPage>0 ?
                                        <PageRule
                                            pageInfo={robotMsg.pageInfo}
                                            handlersearchData={this.pageRequest}/>
                                        :''
                                }
                            </div>
                        </div>
                    </div>
                    <div className="page-backBtn" onClick={()=>{changeView('OVERVIEW')}} style={{margin:'24px 0 0 0'}}>返回</div>
                </div>
                {showMask && groupLeaveNum!=0 && robotStatus!=3
                    ?<QRCodeMask
                        showMask={showMask}
                        showMaskHandle={
                          // 关闭初始化条件，使其模态框关闭
                          this.showMaskHandle.bind(this,
                          false,
                          '',
                          '',
                          '',
                          '')
                        }
                        robotCode={this.state.robotCode}
                        qrCode={this.state.qrCode}
                    />
                    :''}
                {showHowImprotgroup?<HowImprotgroup
                    changeShowHow = {this.changeShowHow}
                />:''}
            </div>
        )
    }
}
