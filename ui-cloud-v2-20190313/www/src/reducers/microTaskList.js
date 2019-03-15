import {MICROTASK_INIT,MICROTASK_PULL,MICROTASK_ADD,MICROTASK_SEND} from '../constants/ActionTypes'

const initMicroTaskList = {
    searchKey: '',
    currentPage: 0,
    totalPage: 1,
    taskList: []
}

export default function microTaskList(state = initMicroTaskList, action){
    switch (action.type) {
        case MICROTASK_INIT: 
            return {
                ...state,
                searchKey: '',
                currentPage: 0,
                totalPage: 1,
                taskList: []
            }

        case MICROTASK_PULL: 
            return {
                ...state,
                searchKey: action.searchKey,
                currentPage: action.data.pageInfo.currentPage,
                totalPage: action.data.pageInfo.totalPage,
                taskList: action.data.resultContent
            }

        case MICROTASK_ADD: 
            return {
                ...state,
                currentPage: action.data.pageInfo.currentPage,
                taskList: state.taskList.concat(action.data.resultContent)
            }

        case MICROTASK_SEND:
            return {
                ...state,
                taskList: state.taskList.map((item)=>
                    item.id === action.id ?
                    { ...item, status:action.status} : item
                )
            }
        default:
            return state
    }
}

