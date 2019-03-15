import React,{Component} from 'react'
import $ from 'jquery'
import promiseXHR from '../../funStore/ServerFun'
import AuthProvider from '../../funStore/AuthProvider'
import SearchBox from './SearchBox'
import MemberList from './MemberList'
import MicroTaskWrapper from './MicroTaskWrapper'
import KnowledgeBase from './KnowledgeBase'
import {API_PATH} from '../../constants/OriginName'
import SearchBoxForCW from './SearchBoxForCW'
import SearchBoxForMT from './SearchBoxForMT'

function FormatDate (strTime) {
    var date = new Date(strTime)
    var month = ((date.getMonth()+1)<10)? '0'+(date.getMonth()+1) : (date.getMonth()+1)
    var day = (date.getDate()<10)? '0'+date.getDate() : date.getDate()
    var hours = (date.getHours()<10) ? '0'+date.getHours() : date.getHours()
    var minutes = (date.getMinutes()<10) ? '0'+date.getMinutes() : date.getMinutes()
    var seconds = (date.getSeconds()%10>=0) ? '0'+date.getSeconds() : date.getSeconds()
    return date.getFullYear()+''+month+''+day
}

class MemberListTab extends Component {
    constructor(props){
        super(props)
    }

    componentDidMount(){
        $('.memberList').get(0).addEventListener('scroll',this.props.removeTagBox)
    }

    render(){
        const {
            actions,
            keyForMember,
            changeKeyForMember,
            memberList,
            tagEdit,
            groupId,
            searchKey,
            selectRoom,
            setIdForLabel,
            selectRoomType,
            groupCode
        } = this.props
        return (
            <div className='gm-memberWrapper'>
                <SearchBox focusColor = '#F8F8F9'  blurColor = '#F8F8F9' searchKey = {actions.searchKeyInMember} inputValue={keyForMember} changeKeyForMember={changeKeyForMember}/>
                <MemberList memberList = {memberList}
                tagEdit = {tagEdit}
                groupId = {groupId}
                selectMemberId = {actions.selectMemberId}
                searchKey = {searchKey}
                selectRoom = {selectRoom}
                pullSingleMesgById = {actions.pullSingleMesgById}
                setIdForLabel = {setIdForLabel}
                selectRoomType={selectRoomType}
                groupCode={groupCode}
                />
            </div>
        )
    }
}

const HandleInnerBox = ({
        currentId,
        memberList,
        groupId,
        actions,
        tagEdit,
        searchKey,
        selectRoom,
        setIdForLabel,
        microTaskList,
        cwList,
        keyForMember,
        changeKeyForMember,
        hotTip,
        changeHotTip,
        hotTipIcon,
        taskTip,
        changeTaskTip,
        groupList,
        userInfo,
        removeTagBox,
        selectRoomType,
        socket
    }) => {
    const searchKeyForTask = (value) => {
                         // changeTaskTip();
        let url = API_PATH+'/taskadminapi/authsec/v2/group/task'
        const params = {
            "currentPage": 0,
            "groupId": groupId,
            "pageSize": 20,
            "keySearch":value
          }
        AuthProvider.getAccessToken()
            .then((resolve, reject) => {
                promiseXHR(url, {
                        type: 'Bearer',
                        value: resolve
                    }, params, 'POST')
                    .then((res) => {
                        const data = JSON.parse(res)
                        // console.log(data)
                        actions.pullMicroTask(value,data)
                        $('.rightBox').scrollTop(0)
                        changeTaskTip();
                    })
            })
    }

    const scrollForTask = (callback) => {
        if(microTaskList.currentPage == microTaskList.totalPage-1){
            setTimeout(()=>{
              callback()
            },1500)
            return
        }
        let url = API_PATH+'/taskadminapi/authsec/v2/group/task'
        const params = {
            "currentPage": microTaskList.currentPage+1,
            "groupId": groupId,
            "pageSize": 20,
            "keySearch":microTaskList.searchKey
          }
         setTimeout(()=>{
             AuthProvider.getAccessToken()
            .then((resolve, reject) => {
                promiseXHR(url, {
                        type: 'Bearer',
                        value: resolve
                    }, params, 'POST')
                    .then((res) => {
                        callback&&callback()
                        const data = JSON.parse(res)
                        // console.log(data)
                        actions.addMicroTask(data)
                    })
            })
         },1000)
    }

    const queryNewCwList = (pageInfo,content) => {
        if(pageInfo.totalPage!==undefined&&pageInfo.currentPage+1>=pageInfo.totalPage){
            return {
                pageInfo: pageInfo,
                resultContent:[]
            }
        }
        if(pageInfo.totalPage!==undefined&&pageInfo.currentPage+1<pageInfo.totalPage){
            // 滚动加载
            pageInfo.currentPage +=1
        }
        const url = API_PATH+"/knowledge-base/authsec/knowledgelistmsg?_currentPage="+pageInfo.currentPage+"&_pageSize="+pageInfo.pageSize
        let params = {
            content: content
        }
        return AuthProvider.getAccessToken()
            .then((resolve, reject) => {
                return promiseXHR(url, {
                        type: 'Bearer',
                        value: resolve
                    }, params, 'POST')
            }).then((res) => {
                return JSON.parse(res)
            })
    }

    // const queryOldCwList = (page_info,content) => {
    //     if((page_info.total_page!==undefined&&page_info.current_page+1>=page_info.total_page)||content.trim()==''){
    //         return {
    //             page_info: page_info,
    //             resultContent:[]
    //         }
    //     }
    //     if(content.trim()==''){
    //         return {
    //             page_info: page_info,
    //             resultContent:[]
    //         }
    //     }
    //     if(page_info.total_page!==undefined&&page_info.current_page+1<page_info.total_page){
    //         // 滚动加载
    //         page_info.current_page +=1
    //     }
        // const url = API_PATH + "/content-api/noauth/content/knowledge/query/"
        // let user_id = groupList.targetGroup.robotGroupMemList==undefined||groupList.targetGroup.robotGroupMemList[0]==undefined
        //                 ?userInfo.info.userinfo.userId
        //                 :groupList.targetGroup.robotGroupMemList[0].imMemId
        // const timestamp = parseInt(new Date().getTime()/1000)
        // let paramas = {
        //     "birthday": "",
        //     "current_page": page_info.current_page,
        //     "knowledge_type": ["Q&A 问答", "知识卡"],
        //     "lib_name": ["栗子知识库", "惠氏知识库", "段涛知识库","好奇知识库"],
        //     "page_size": page_info.page_size,
        //     "question": content,
        //     "timestamp": timestamp,
        //     "user_id": user_id
        // }
        // return AuthProvider.getAccessToken()
        //     .then((resolve, reject) => {
        //         return promiseXHR(url, {
        //                 type: 'Bearer',
        //                 value: resolve
        //             }, paramas, 'POST')
        //     }).then((res) => {
        //         return JSON.parse(res)
        //     })
    // }

    const initKW = () =>{
        const url = API_PATH+"/knowledge-base/authsec/knowledgelistmsg?_currentPage=0&_pageSize=20"
        let paramas = {
            content: ''
        }
        AuthProvider.getAccessToken()
            .then((resolve, reject) => {
                promiseXHR(url, {
                        type: 'Bearer',
                        value: resolve
                    }, paramas, 'POST')
                    .then((res) => {
                        const data = JSON.parse(res)
                        actions.pullHotCwList(data)
                        $('.gm-kmBaseWrapper').scrollTop(0)
                        changeHotTip()
                    })
            })
    }
    const searchKeyForKW = (value) => {
        // 防止出现空搜索
        queryNewCwList({currentPage:0,pageSize:20},value).then((oldCwList)=>{
            oldCwList.resultContent = oldCwList.resultContent.map(v => ({
                ...v,
                publicFlag: true
            }))
            let data = {}
            // data.pageInfo = newCwList.pageInfo
            data.page_info = oldCwList.page_info
            data.resultContent = oldCwList.resultContent
            actions.pullCwList(value,data)
            $('.gm-kmBaseWrapper').scrollTop(0)
            changeHotTip();
        })
        // AuthProvider.getAccessToken()
        //     .then((resolve, reject) => {
        //         promiseXHR(url, {
        //                 type: 'Bearer',
        //                 value: resolve
        //             }, paramas, 'POST')
        //             .then((res) => {
        //                 const data = JSON.parse(res)
        //                 actions.pullCwList(value,data)
        //                 $('.gm-kmBaseWrapper').scrollTop(0)
        //                 changeHotTip();
        //             })
        //     })
    }
    const scrollForKW = (callback) => {
        if(cwList.pageInfo.currentPage == cwList.pageInfo.totalPage-1&&cwList.page_info.currentPage==cwList.page_info.totalPage-1){
            setTimeout(()=>{
              callback()
            },1500)
            return
        }
        // let url = `${API_PATH}/articlemgmt/authsec/knowledgelistmsg?_currentPage=${cwList.pageInfo.currentPage+1}&_pageSize=20`
        // let paramas = {
        //     "content": cwList.searchKey,
        // }
        setTimeout(()=>{
            Promise.all([queryNewCwList(cwList.pageInfo,cwList.searchKey)]).then(([newCwList])=>{
                // oldCwList.resultContent = oldCwList.resultContent.map(v => ({
                //     ...v,
                //     publicFlag: true
                // }))
                let data = {}
                data.pageInfo = newCwList.pageInfo
                // data.page_info = oldCwList.page_info
                data.resultContent = newCwList.resultContent
                callback&&callback()
                actions.addCwList(data)
            })
            //  AuthProvider.getAccessToken()
            // .then((resolve, reject) => {
            //     promiseXHR(url, {
            //             type: 'Bearer',
            //             value: resolve
            //         }, paramas, 'POST')
            //         .then((res) => {
            //             callback&&callback()
            //             const data = JSON.parse(res)
            //             actions.addCwList(data)
            //         })
            // })
         },1000)
    }
    return (
        <div className="gm-memberWrapper-outer">
        {
            currentId==0?
            <MemberListTab
                actions={actions}
                keyForMember={keyForMember}
                changeKeyForMember={changeKeyForMember}
                memberList={memberList}
                tagEdit={tagEdit}
                groupId={groupId}
                searchKey={searchKey}
                selectRoom={selectRoom}
                setIdForLabel={setIdForLabel}
                removeTagBox={removeTagBox}
                selectRoomType={selectRoomType}
                groupCode={groupList.targetGroup.code}
            />
            :currentId==1?<div className='gm-memberWrapper'>
                <SearchBoxForCW  focusColor = '#F8F8F9'  blurColor = '#F8F8F9' searchKey = {searchKeyForKW} inputValue={cwList.searchKey}/>
                <KnowledgeBase  cwList={cwList} scrollEvent={scrollForKW} hotTip={hotTip} changeHotTip={changeHotTip} hotTipIcon={hotTipIcon} groupList={groupList} initKW={initKW} userInfo={userInfo} memberList={memberList} selectRoomType={selectRoomType} socket={socket}/>
            </div>
            :currentId==2?<div className='gm-memberWrapper'>
                <SearchBoxForMT focusColor = '#F8F8F9'  blurColor = '#F8F8F9' searchKey = {searchKeyForTask} inputValue={microTaskList.searchKey}/>
                <MicroTaskWrapper scrollEvent={scrollForTask} microTaskList={microTaskList} actions={actions} taskTip={taskTip} changeTaskTip={changeTaskTip} groupId={groupId}/>
            </div>
            :''
        }
        </div>
    )
}

export default HandleInnerBox
