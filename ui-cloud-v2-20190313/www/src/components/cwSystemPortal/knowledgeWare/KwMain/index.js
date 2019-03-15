import React,{Component} from 'react'
import './index.css'
import SearchBox from '../SearchBox'
import Category from '../Category'
import KnowledgeBase from '../KnowledgeBase';
import EditModule from '../EditModal'
import AuthProvider from '../../../../funStore/AuthProvider'
import promiseXHR from '../../../../funStore/ServerFun'
import {tongji} from '../../../../funStore/tongji'
import {API_PATH} from '../../../../constants/OriginName'
import {textCountIndex,sendEvent} from '../../../../funStore/CommonFun'

const statusMap = {
    1:'启用',
    2:'停用',
    3:'删除'
}

export default class KwMain extends Component {
    constructor(props){
        super(props)
        this.state = {
            editFlag: false,
            selectItem: null,
            selectCategory: '',
            pageInfo: {
                currentPage: 0,
                pageSize: 20,
                totalRecords: 0
            },
            kwlist:[],
            checkAll: false,
            checkNum: 0,
            searchParams: {
                "all": null,
                "userId": "",
                "type":0,
                "content": "",
                "labelName": "",
                "firstClass": null,
                "secondClass": null,
                "thirdClass": null
            },
            categoryList: [],
            guideFlag: false,
            kwlistLoad: true,
            allSelect: true
        }
    }
    showEditModal = (data) => {
        data?tongji('Lzc_NeiRongKu_edit'):tongji('Lzc_NeiRongKu_add')
        this.setState({
            editFlag: true,
            selectItem: data
        })
    }
    hideEditModal = () => {
        this.setState({
            editFlag: false,
            selectItem: null
        })
    }
    setparamsHandle= (k,v) => {
        let {searchParams} = this.state
        searchParams[k] = v
        this.setState({searchParams})
    }
    getListByItem = (categoryInfo,initFlag,all) => {
        // 根据目录搜索内容
        if (all == 0) {
            this.setState({
                allSelect: true
            })
        } else {
            this.setState({
                allSelect: false
            })
        }
        const {userId} = this.props
        let searchParams = {
            "all": all,
            "userId": "",
            "type":0,
            "content": "",
            "labelName": "",
            "firstClass": null,
            // "secondClass": null,
            // "thirdClass": null
        }
        // if(categoryInfo.type==1){
            searchParams.firstClass = categoryInfo.selectId
        // }
        // categoryInfo.currentId&&(searchParams.firstClass = categoryInfo.currentId)
        // if(categoryInfo.type==2){
        //     searchParams.firstClass = categoryInfo.parentId
        //     searchParams.secondClass = categoryInfo.selectId
        // }
        // if(categoryInfo.type==3){
        //     searchParams.firstClass = categoryInfo.grandparentId
        //     searchParams.secondClass = categoryInfo.parentId
        //     searchParams.thirdClass = categoryInfo.selectId
        // }
        searchParams.userId = userId
        this.setState({
            selectCategory: categoryInfo.selectId,
            searchParams
        },()=>{
            this.requestList({
                currentPage: 0,
                pageSize: this.state.pageInfo.pageSize
            },searchParams,initFlag)
            // .then(res => {
            //     this.setState({
            //         guideFlag: initFlag&&res&&res.length==0
            //     })
            // })
        })
    }
    searchList = () => {
        // 高阶查询内容
        tongji('Lzc_NeiRongKu_SouSuo')
        let {searchParams,selectCategory} = this.state
        const {userId} = this.props
        searchParams.all = searchParams.all == 1 ? 1 : null
        searchParams.classId = selectCategory
        searchParams.userId = userId
        // console.log(searchParams)
        this.requestList({
            currentPage: 0,
            pageSize: this.state.pageInfo.pageSize
        },searchParams,'post')
    }
    getPageList = (page) => {
        // 分页查询内容
        let {searchParams,selectCategory} = this.state
        const {userId} = this.props
        searchParams.classId = selectCategory
        searchParams.userId = userId
        this.requestList({
            currentPage: page.currentPage,
            pageSize: page.pageSize
        },searchParams)
    }
    requestList = (pageInfo,searchParams,type) => {
        this.setState({kwlistLoad: true})
        // 请求内容库列表
        if(searchParams.content===''){
            searchParams.content=null
        }
        if(searchParams.labelName===''){
            searchParams.labelName=null
        }
        const url = `${API_PATH}/knowledge-base/authsec/knowledgelist?_currentPage=${pageInfo.currentPage}&_pageSize=${pageInfo.pageSize}`
        return AuthProvider.getAccessToken().then((resolve,reject)=>{
            return promiseXHR(url,{type:'Bearer',value:resolve},searchParams,'post')
        }).then(res => {
            const resData = JSON.parse(res)
            if(resData.resultCode=='100'){
                this.setState({
                    kwlist: resData.resultContent?resData.resultContent.map(v => ({...v,select:false})):[],
                    pageInfo: resData.pageInfo,
                    checkNum: 0,
                    kwlistLoad: false
                })
                return resData.resultContent
            } else {
                this.setState({kwlistLoad: false})
            }
        }).catch(err =>{
            sendEvent('message', {txt: "获取内容失败",code: 1004})
            this.setState({kwlistLoad: false})
        })
    }
    repullList = () => {
        // 重新拉取页面
        const {pageInfo,searchParams} = this.state
        this.initCategory(true)
        this.requestList({
            currentPage: 0,
            pageSize: pageInfo.pageSize
        },searchParams)
    }
    updateList = (data)=>{
        // 更新页面
        let {kwlist} = this.state
        kwlist = kwlist.map(v => {
            return v.id==data.id?data:v
        })
        this.setState({kwlist})
    }
    setCategoryList = (data, flag, length, count) => {
        // console.log(data)
        // 获取目录数据
        if(flag || (length == 1 && count == 0)) {
            this.setState({
                categoryList: data,
                kwlistLoad: false,
                guideFlag: true
            })
        } else {
            this.setState({
                categoryList: data
            })
        }
    }
    checkQAcard = (id) => {
        // 单选
        let {kwlist} = this.state
        kwlist = kwlist.map(v =>{
            return v.id==id?{
                ...v,
                select: !v.select
            }:v
        })
        this.setState({
            kwlist,
            checkAll: kwlist.every(v => v.select),
            checkNum:  kwlist.filter(v => v.select).length
        })
    }
    checkAllQAcard = () => {
        // 全选
        let {kwlist,checkAll} = this.state
        kwlist = kwlist.map(v =>{
            return {
                ...v,
                select: !checkAll
            }
        })
        this.setState({
            kwlist,
            checkAll: !checkAll,
            checkNum: !checkAll?kwlist.length:0
        })
    }
    changeStatusHandle=(status,id) => {
        status==3?tongji('Lzc_NeiRongKu_ShanChu'):''
        // 启用，停用，删除
        let {kwlist} = this.state
        const {userId} = this.props
        let params = {
            status: status,
            userId: userId,
            ids:[]
        }
        if(id){
            // 单个操作
            params.ids.push(id)
        }else{
            let ids = kwlist.filter(v => v.select).map(v => v.id)
            params.ids = ids
        }
        const url = `${API_PATH}/knowledge-base/authsec/knowledgedel`
        AuthProvider.getAccessToken().then((resolve,reject)=>{
            return promiseXHR(url,{type:'Bearer',value:resolve},params,'PUT')
        }).then(res => {
            const resData = JSON.parse(res)
            if(resData.resultCode=='100'){
                if(status!=3){
                    this.setState({
                        kwlist: kwlist.map(v => {
                            return params.ids.find(id => id==v.id)?{
                                ...v,
                                status: status
                            }:v
                        })
                    })
                    sendEvent('message', {txt: statusMap[status]+"成功",code: 1000})
                }else{
                    // 删除操作重新拉取列表
                    const {pageInfo,searchParams} = this.state
                    this.initCategory(true)
                    this.requestList(pageInfo,searchParams)
                    sendEvent('message', {txt: statusMap[status]+"成功",code: 1000})
                }
            }
        })
    }
    initCategory=(flag)=>{
        const url = `${API_PATH}/knowledge-base/authsec/class`
        AuthProvider.getAccessToken().then((resolve,reject)=>{
            return promiseXHR(url,{type:'Bearer',value:resolve},null,'GET')
        }).then(res => {
            const resData = JSON.parse(res)
            // console.log(resData)
            if(resData.resultCode=='100'){
                if (!flag) {
                    this.getListByItem({
                        type:1,
                        selectId: null,
                        parentId: null,
                        grandparentId: null
                    },true,0)
                }
                resData.resultContent&&this.setCategoryList(resData.resultContent, flag, resData.resultContent.length,resData.resultContent[0].noTypeCount)
            }
        })
    }
    render(){
        const {editFlag,selectItem,selectCategory,kwlist,pageInfo,searchParams,categoryList,checkAll,checkNum,guideFlag,kwlistLoad,allSelect,noSelect} = this.state
        const {userId,changeView} = this.props
        return (
            <div className="cw-kwMain">
                <SearchBox 
                    searchParams={searchParams}
                    setparamsHandle={this.setparamsHandle}
                    searchList={this.searchList}
                    changeView={changeView}
                    guideFlag={guideFlag}
                />
                <div className="content">
                    <div className="scrollBox">
                        <Category allSelect={allSelect} initCategory={this.initCategory} categoryList={categoryList} userId={userId} getListByItem={this.getListByItem} selectCategory={selectCategory} setCategoryList={this.setCategoryList} data={categoryList}/>
                        <KnowledgeBase 
                            data={kwlist}
                            kwlistLoad={kwlistLoad}
                            pageInfo={pageInfo} 
                            repullList={this.repullList}
                            searchParams={searchParams}
                            getPageList={this.getPageList} 
                            // checkAll={checkAll} 
                            // checkNum={checkNum} 
                            userId={userId}
                            categoryList={categoryList} 
                            showEditModal={this.showEditModal}
                            checkQAcard={this.checkQAcard}
                            // checkAllQAcard={this.checkAllQAcard}
                            changeStatusHandle={this.changeStatusHandle}
                            guideFlag={guideFlag}
                        />
                    </div>
                </div>
                {
                    editFlag
                    ?<EditModule 
                        type={selectItem?'EDIT':'ADD'}
                        selectItem={selectItem}
                        hideEditModal={this.hideEditModal}
                        categoryList={categoryList}
                        userId={userId}
                        searchParams={searchParams}
                        selectCategory={selectCategory}
                        repullList={this.repullList}
                        updateList={this.updateList}
                        initCategory={this.initCategory}
                    />
                    :''
                }
            </div>
        )
    }
}