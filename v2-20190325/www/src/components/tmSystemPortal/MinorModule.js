import React, {Component} from "react";
import ResetPassword from "./ResetPassword";
import MtGroup from './MtGroup'
import TmEditTitle from './TmEditTitle'
import AuthProvider from "../../funStore/AuthProvider";
import {API_PATH} from "../../constants/OriginName";
import promiseXHR from "../../funStore/ServerFun";
import {sendEvent} from "../../funStore/CommonFun";
// "loginName":"test",
// "phone":"18492299222",
// "email":"18491212@qq.com",
// "type":2, //已去掉
// "roleIds":[
//     "43f08f7a-f260-438f-be49-c209e496a97b"
// ],
// "status":1,
// "password":"123456",
// "groupIds":[
//     "862d0788-9b00-4054-96be-79079a8ae175"
// ]
let echoInfoVerify = {
    'email': /^([a-zA-Z0-9-_.])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/,
    'phone': /^1[3|4|5|7|8][0-9]\d{8}$/,
    'password': /^(\w){6,16}$/
}
export default class MinorModule extends Component {
    constructor() {
        super()
        this.state = {
            echoItem:{},
            viewController: '',
            modalViewController:'',
            saveGroupStatus:false,
            repeatGroupId:[],//已有的群 重复群
            resetPsw:false
        }
    }

    //获取详情信息
    componentWillMount() {
        let { echoId } = this.props
        if(echoId==null){
            this.setState({
                echoItem:{
                    type:'',
                    loginName: '',
                    phone: '',
                    email: '',
                    status: '',
                    password: '',
                    roleIds:[],
                    groupIds:[]
                }
            })
            return
        }
        const url = API_PATH + '/basis-api/authsec/usermgmt/' + echoId
        AuthProvider.getAccessToken()
            .then((resolve, reject) => {
                return promiseXHR(url, { type: 'Bearer', value: resolve }, null, 'GET')
            })
            .then((res) => {
                const resData = JSON.parse(res)
                if (resData.resultCode == 100) {
                    let content = resData.resultContent
                    this.setState({
                        echoItem: {
                            ...content,
                            roleIds: resData.resultContent.roleItems.length != 0 ? [resData.resultContent.roleItems[0].id] : [-1],
                            groupIds: resData.resultContent.groupItems.map((item, i) => (item.id)),
                        },
                    })
                }
            })

    }

    handleEditechoIitem=(name, value)=>{
        const {echoItem} =this.state
        echoItem[name] =value
        this.setState({echoItem})
    }

    setMoreSelectParama=(index, selectTitle, name, value)=>{
        const {echoItem} =this.state
        if(name=='roleIds'){ //用户角色
            echoItem.roleIds=[value]
            if(selectTitle=='企业管理员角色'){  //'管理员:2','班长:3'
                echoItem.type=2
            }else{
                echoItem.type=3
            }

        }else{
            echoItem[name] =value
        }
        this.setState({echoItem})
    }

    handleSave=(groupArr)=>{
        const {echoId} =this.props
        const {echoItem} =this.state

        if(!this.handleVerify()) return

        echoItem.groupIds=groupArr.length>0?groupArr.map(v=>v.id):echoItem.groupIds
        this.setState({
            echoItem
        })
        // console.log(echoItem,'echoItem===')

        const url = API_PATH + '/basis-api/authsec/usermgmt'
        const promiseType = echoId == null ? 'POST' : 'PUT'
        AuthProvider.getAccessToken().then((resolve, reject)=> {
            return promiseXHR(url, {type: 'Bearer', value: resolve}, this.state.echoItem, promiseType)
        }).then((res)=> {
                // console.log(JSON.parse(res))
                const resData = JSON.parse(res)
                switch (resData.resultCode){
                    case '02504017':
                        sendEvent('message', {txt: "用户名已存在", code: 1003, timer: 2000})
                        break
                    case '02504024':
                        sendEvent('message', {txt: "手机号已存在", code: 1003, timer: 2000})
                        break
                    case 100:
                    case '100':
                        sendEvent('message', {txt: echoId == null ? '新增成功' : '编辑成功', code: 1000, timer: 2000})
                        this.props.goHome()
                        break
                    default:
                        sendEvent('message', {txt:  echoId == null ? '新增失败' : '编辑失败', code: 1003, timer: 2000})
                        break
                }
            })
    }

    handleVerify=()=>{
        const {echoItem} =this.state
        let flag=true
        if(echoItem.loginName==''||echoItem.loginName==undefined){
            flag=false
            sendEvent('message', {txt: "请输入群用户名称", code: 1003, timer: 2000})
            return
        }
        if(echoItem.phone==''||echoItem.phone==undefined||!echoInfoVerify['phone'].test(echoItem.phone)){
            flag=false
            sendEvent('message', {txt: "请输入正确的手机号码", code: 1003, timer: 2000})
            return
        }

        // if(echoItem.email!=''&&!echoInfoVerify['email'].test(echoItem.email)){
        //     flag=false
        //     sendEvent('message', {txt: "请输入正确的邮箱地址", code: 1003, timer: 2000})
        //     return
        // }

        if(echoItem.status==''||echoItem.status==undefined){
            flag=false
            sendEvent('message', {txt: "请选择用户状态", code: 1003, timer: 2000})
            return
        }
        if(this.props.echoId==null){
            if(echoItem.password==''||echoItem.password==undefined||!echoInfoVerify['password'].test(echoItem.password)){
                flag=false
                sendEvent('message', {txt: "密码至少六位数", code: 1003, timer: 2000})
                return
            }
        }

        if(echoItem.roleIds==undefined||echoItem.roleIds.length==0){
            flag=false
            sendEvent('message', {txt: "请选择用户角色", code: 1003, timer: 2000})
            return
        }
        return flag
    }

    handleResetpsw=(state)=>{
         this.setState({
             resetPsw:state
         })

    }
    render() {
        const {selectDataEdit,goHome,echoId} = this.props
        const {echoItem,saveGroupStatus,resetPsw} =this.state
        return (
            <div className='tm-listContent'>
                <div className='tm-editWrapper'>
                    <div className="editTitle">{echoId!=null?'编辑用户':'新增用户'}</div>
                    <TmEditTitle
                        echoId={echoId}
                        echoItem={echoItem}
                        selectDataEdit={selectDataEdit}
                        handleEditechoIitem={this.handleEditechoIitem}
                        setMoreSelectParama={this.setMoreSelectParama}
                        showResetpsw={()=>this.handleResetpsw(true)}
                    />
                    <div className="manageGroupBox">
                        <div className="MtBuildMain-content">
                        <MtGroup
                            echoItem={echoItem}
                            groupIdArray={echoItem.groupIds?echoItem.groupIds:[]}
                            saveGroupStatus={saveGroupStatus}
                            changeStep={goHome}
                            saveGroupId={this.handleSave}
                            handleVerify={this.handleVerify}
                            // repeatGroupId={repeatGroupId}
                        />
                        </div>
                    </div>
                    {
                        resetPsw&&echoId!=null? <ResetPassword
                            hideResetpsw={()=>this.handleResetpsw(false)}
                            echoId={echoId}/>:null
                    }

                </div>
            </div>
        )
    }
}