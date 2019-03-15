import {
    ADMIN_MICROTASK_INIT,
    ADMIN_MICROTASK_PULL,
    ADMIN_MICROTASK_CHECK,
    ADMIN_MICROTASK_CHECKALL,
    ADMIN_MICROTASK_DELETE,
    ADMIN_MICROTASK_BATCHDELETE
} from '../constants/ActionTypes'

const initMicroTaskList = {
    checkAll: false,
    searchParamas:{},
    pageInfo: {
        currentPage: 0,
        pageSize: 0,
        totalPage: 0,
        totalRecords: 0
    },
    taskList: []
}

export default function adminTaskList(state = initMicroTaskList, action){
    switch (action.type) {
        case ADMIN_MICROTASK_INIT:
            return {
                ...state,
                searchParamas: action.searchParamas,
                pageInfo: action.pageInfo,
                taskList: action.taskList
            }

        case ADMIN_MICROTASK_PULL:
            return {
                ...state,
                pageInfo: action.pageInfo,
                taskList: action.taskList
            }

        case ADMIN_MICROTASK_CHECK:
            return {
                ...state,
                checkAll: action.checkAll,
                taskList: state.taskList.map((item)=>
                            item.id === action.id ?
                            { ...item, checked: !item.checked } : item
                        )
            }
        
        case ADMIN_MICROTASK_CHECKALL:
            return {
                ...state,
                checkAll: !state.checkAll,
                taskList: state.taskList.map((item)=>{
                            return { ...item, checked: !state.checkAll }
                        })
            }
        
        case ADMIN_MICROTASK_DELETE:
            return {
                ...state,
                pageInfo: action.pageInfo,
                taskList: action.taskList
            }

        case ADMIN_MICROTASK_BATCHDELETE:
            return {
                ...state,
                checkAll:false,
                pageInfo: action.pageInfo,
                taskList: action.taskList
            }

        default:
            return state
    }
}
