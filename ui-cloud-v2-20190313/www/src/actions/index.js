import * as types from '../constants/ActionTypes'
import { push } from 'react-router-redux'
export const pullGroupList = (data) => ({type: types.GROUPLIST_PULL, data })
export const pullMemberList = (data) => ({type: types.MEMBERLIST_INSERT, data})
export const initNavData = (data) =>  ({type: types.NAVILIST_INIT, data})
export const initGroupList = () => ({type: types.GROUP_INIT})
export const initMemberList = () => ({type: types.MEMBERLIST_INIT})
export const addUnreadMsg = (id,lastMsgTime) => ({type: types.ADD_UNREADMSG, id,lastMsgTime})

export const reduceUnreadMsg = (id,count) => ({type: types.REDUCE_UNREADMSG, id, count})
export const reduceNormalUnreadMsg = (id,count) => ({type: types.REDUCE_NORMALUNREADMSG, id})
export const reduceAllKeyword = (id) => ({type: types.REDUCE_ALL_UNKEYWORD, id})
export const addNomalUnreadMsg = (id,lastMsgTime) => ({type: types.ADD_NORMALUNREADMSG, id,lastMsgTime})


export const addMemberUnreadMsg = (id,lastMsgTime) => ({type: types.ADD_MEMBER_UNREADMSG, id,lastMsgTime})
export const selectChatId = (id,count) => ({type: types.SELECT_GROUP, id,count})

export const selectMemberId = (id) => ({type: types.SELECT_MEMBER, id})
export const removeMember = (id) => ({type: types.REMOVE_MEMBER,id})
export const pullMesgById = (roomType, id, data,pageInfo) => ({type: types.PULLMESGS_BYID, roomType, id, data,pageInfo})
export const insertMesg = (data,pageInfo) => ({type: types.INSERTMESGS, data,pageInfo})
export const appendMesg = (data,pageInfo) => ({type: types.INSERTMESGS_DESC, data,pageInfo})
export const initMsgList = () => ({type: types.INIT_MESGLIST})
export const socketMsg = (data) => ({type: types.SOCKETMESG, data})
export const appenMsg = (data) => ({type: types.APPENDMESGS, data})
export const socketSingleMsg = (data) => ({type: types.SOCKET_SINGLEMESGS, data})
export const appenSingleMsg = (data) => ({type: types.APPEND_SINGLEMESGS, data})
export const pullSingleMesgById = (id, data,pageInfo) => ({type: types.PULL_SINGLEMESGS_BYID, id, data,pageInfo})
export const pullKeywordsMsg = (data,pageInfo) => ({type: types.PULL_KEYWORDSMESGS,data,pageInfo})

export const insertSingleMesg = (data,pageInfo) => ({type: types.INSERT_SINGLEMESGS, data,pageInfo})
export const insertKeywordsMsg = (data,pageInfo) => ({type: types.INSERT_KEYWORDSMESGS, data,pageInfo})

export const appenKeywordsMsg = (data) => ({type: types.APPEND_KEYWORDSMESGS, data})

export const socketKeywordsMsg = (data) => ({type: types.SOCKET_KEYWORDSMESGS, data})

export const initKeywordsMsgList = () => ({type: types.INIT_KEYWORDSESGLIST})
export const initSingleMsgList = () => ({type: types.INIT_SINGLEMESGLIST})


export const changeSlice = (number) => ({type: types.CHANGE_SLICE, number})
export const changeNewTip = (status) => ({type: types.CHANGE_NEWTIP, status})

export const memberSlice = (number) => ({type: types.CHANGE_SLICE_MEMBER, number})

export const changeSliceSin = (number) => ({type: types.CHANGE_SLICE_SIN, number})
export const changeNewTipSin = (status) => ({type: types.CHANGE_NEWTIP_SIN, status})

export const changeSliceKey = (number) => ({type: types.CHANGE_SLICE_KEYWORD, number})
export const changeNewTipKey = (status) => ({type: types.CHANGE_NEWTIP_KEYWORD, status})

export const searchKeyInGroup = (key) => ({type: types.GROUPLIST_SEARCH, key})
export const searchKeyInMember = (key) => ({type: types.MEMBERLIST_SEARCH, key})

export const selectSendGroup = (id) => ({type: types.SEND_GROUP, id})
export const unSelectGroup = () => ({type: types.UNSELECT_GROUP})
export const selectAllGroup = () => ({type: types.SEND_ALL})
export const cancelAllGroup = () => ({type: types.CANCEL_ALL})
export const unselectSendGroup = () => ({type: types.UNSEND_GROUP})
export const putStoreByMember = (id) => ({type: types.PUT_STORE_MEMBER, id})
export const altMember = (id) => ({type: types.ALT_MEMBER, id})
export const altAll = () => ({type: types.ALT_ALL})
export const altInit = () => ({type: types.ALT_INIT})
export const extendChange = () => ({type: 'CHANGE'})
export const setRead = (id) => ({type: types.SET_READ, id})

export const addGroupTag = (id,data) => ({type: types.ADD_GROUP_TAG, id, data})
export const addMemberTag = (id,data) => ({type: types.ADD_MEMBER_TAG, id, data})
export const deleteGroupTag = (id,labelId) => ({type: types.DELETE_GROUP_TAG,id, labelId})
export const deleteMemberTag = (id,labelId) => ({type: types.DELETE_MEMBER_TAG,id, labelId})

export const initUserInfo = (data) => ({type: types.USERINFO_INIT ,data})
export const goTo = (name) => (push(name))

export const initMicroTask = () => ({type: types.MICROTASK_INIT})
export const pullMicroTask = (searchKey,data) => ({type: types.MICROTASK_PULL,searchKey,data})
export const addMicroTask = (data) => ({type: types.MICROTASK_ADD,data})
export const sendMicroTask = (id,status) => ({type: types.MICROTASK_SEND,id,status})

export const pullCwList = (searchKey,data) => ({type: types.CWLIST_PULL,searchKey,data})
export const addCwList = (data) => ({type: types.CWLIST_ADD,data})
export const pullHotCwList = (data) => ({type:types.CWLIST_HOT,data})

// export const initAdminTask = (searchParamas,pageInfo,taskList) => ({type:types.ADMIN_MICROTASK_INIT,searchParamas,pageInfo,taskList})
// export const pullAdminTask = (pageInfo,taskList) => ({type:types.ADMIN_MICROTASK_PULL,pageInfo,taskList})
// export const checkAdminTask = (id,checkAll) => ({type:types.ADMIN_MICROTASK_CHECK,id,checkAll})
// export const checkAllAdminTask = () => ({type:types.ADMIN_MICROTASK_CHECKALL})
// export const delAdminTask = (pageInfo,taskList) => ({type:types.ADMIN_MICROTASK_DELETE,pageInfo,taskList})
// export const batchDelAdminTask = (pageInfo,taskList) => ({type:types.ADMIN_MICROTASK_BATCHDELETE,pageInfo,taskList})

export const turnOffws = () => ({type:types.TURN_OFF_STATE})
// export const setTaskFlow = (data) => ({type:types.TASKFLOW_SET, data})
// export const setTaskUserInfo = (processIntanceId,userId) => ({type:types.SET_TASKFLOW_USERINFO, processIntanceId,userId})

// export const setTaskSegment = (seg) => ({type:types.SET_FLOWSEGEMNET, seg})
//
// export const initGcGroup = (pageInfo,data,searchKey='') => ({type: types.INIT_GROUP_GC,pageInfo,data,searchKey})
// export const pullGcGroup = (pageInfo,data) => ({type: types.PULL_GROUP_GC,pageInfo,data})
// export const checkGcGroup = (id,data) => ({type:types.CHECK_GROUP_GC,id,data})

// export const updateGroupName = (name) => ({type:types.UPDATE_NAME_GC,name})
// export const updateIntroduce = (introduce) => ({type:types.UPDATE_INTRODUCE_GC,introduce})

// export const addGroupGcTag = (id,data) => ({type:types.ADD_GROUP_GC_TAG,id,data})
// export const deleteGroupGcTag = (id,labelId) => ({type:types.DELETE_GROUP_GC_TAG,id,labelId})
// export const addGroupGcKeyword = (id,data) => ({type:types.ADD_GROUP_GC_KEYWORD,id,data})
// export const deleteGroupGcKeyword = (id,labelId) => ({type:types.DELETE_GROUP_GC_KEYWORD,id,labelId})

export const lauchPicker = () => ({type:types.LAUCH_PICKER})
export const turnOffPicker = () => ({type:types.TURN_OFF_PICKER})
export const insertMsgPicker = (data) => ({type:types.INSER_MSG_PICKER, data})
export const  removeMsgPicker = (msgId) => ({type:types.REMOVE_MSG_PICKER, msgId})

export const connectSocket = (socket) => ({type: 'SET_SOCKET', socket})

// 系统消息actions

export const sysInfoRead = () => ({type:'SYSINFO_READ'})
