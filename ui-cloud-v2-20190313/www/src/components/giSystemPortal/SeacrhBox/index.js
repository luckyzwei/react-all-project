import React,{Component} from 'react'
import './index.css'
import SelectBox from '../../shareComponent/SelectBox'
import SearchFuzzy from '../../shareComponent/searchFuzzy'
import {API_PATH} from '../../../constants/OriginName'
import SearchInput from '../../shareComponent/SearchInput';
import AuthProvider from '../../../funStore/AuthProvider';
import promiseXHR from '../../../funStore/ServerFun';


export default class SearchBox extends Component {
    constructor(props){
        super(props)
        this.state = {
            labelName: '',
            loginName: '',
            params: {
                "labelId": "",
                "monitorId": "",
                "name": "",
            },
            adminList:[],
            tagList:[]
        }
    }
    componentDidMount(){
        this.getAdminList();//获取群标签
        this.getTagList();//获取群管理员
    }
    getAdminList=()=>{
        const url = `${API_PATH}/groupadmin-api/authsec/groupadmin/tenant/monitors`
        AuthProvider.getAccessToken().then((reslove,reject)=> {
            return promiseXHR(url ,{type:'Bearer',value:reslove},{
                loginName:''
            },'post')
        }).then(res => {
            const resData = JSON.parse(res)
            if(resData.resultCode==100){
                this.setState({
                    adminList: resData.resultContent.map(v => ({key:v.loginName,value:v.id}))
                })
            }
        })
    }
    getTagList=()=>{
        const url = `${API_PATH}/groupadmin-api/authsec/groupadmin/tenant/labelNames?labelName=`
        AuthProvider.getAccessToken().then((reslove,reject)=> {
            return promiseXHR(url ,{type:'Bearer',value:reslove},null,'get')
        }).then(res => {
            const resData = JSON.parse(res)
            if(resData.resultCode==100){
                this.setState({
                    tagList: resData.resultContent.map(v => ({key:v.labelName,value:v.labelId}))
                })
            }
        })
    }
    shouldComponentUpdate(nextProps,nextState){
        if(Object.is(this.state,nextState)){
            return false
        }else{
            return true
        }
    }
    handleAutoComParamas=(name, id, paramasValue,type)=>{
        // 模糊搜索
        // console.log(name, id, paramasValue,type)
        let {params} = this.state
        params[paramasValue] = id
        if(paramasValue=='labelId'){
            this.setState({
                labelName: name,
                params
            })
        }else{
            this.setState({
                loginName: name,
                params
            })
        }
    }
    setparamsHandle=(name,value)=>{
        let {params} = this.state
        params[name] = value
        this.setState({params})
    }
    selectAdminHandle = (v) => {
        let {params} = this.state
        params.monitorId = v.value
        this.setState({params})
    }
    selectTagHandle=(v)=>{
        let {params} = this.state
        params.labelId = v.value
        this.setState({params})
    }
    searchHandle = () => {
         const {params} = this.state
         this.props.searchRequest(params)
    }
    render(){
        const {labelName,loginName,adminList,tagList} = this.state
        return (
            <div className="searchBox" style={{height:'83px'}}>
                <div className="left" >
                    <div className="row1">
                        <div className="selectWrappers" tabIndex="1">
                            <div className="selectLabel">群名称：</div>
                            <input type="text" className="selectBoxs self" placeholder="请输入" onChange={(e)=>{this.setparamsHandle('name',e.target.value)}}/>
                        </div>
                    </div>
                    <div className="row2">
                        <SearchInput 
                            dataList={adminList}
                            label={'群管理员：'}
                            selectHandle={this.selectAdminHandle}
                            inputStyle={{
                                width:'200px'
                            }}
                            deleteFlag={true}
                        />
                    </div>
                    <div className="row3">
                        <SearchInput 
                            dataList={tagList}
                            label={'群标签：'}
                            selectHandle={this.selectTagHandle}
                            inputStyle={{
                                width:'200px'
                            }}
                            deleteFlag={true}
                        />
                    </div>
                    <div className="searchBtn" onClick={this.searchHandle}>搜索</div>
                </div>
            </div>
        )
    }
}