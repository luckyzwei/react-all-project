import {CWLIST_PULL,CWLIST_ADD,CWLIST_HOT} from '../constants/ActionTypes'

const initCwList = {
    searchKey: '',
    pageInfo:{
        "currentPage": 0,
        "totalPage": 1,
        "pageSize": 10
    },
    page_info:{
        "currentPage": 0,
        "totalPage": 1,
        "pageSize": 10
    },
    itemList: [],
    hotList: []
}

export default function cwList(state = initCwList, action){
    switch (action.type) {
        case CWLIST_HOT: 
            return {
                ...state,
                itemList: action.data.resultContent
            }
        case CWLIST_PULL: 
            return {
                ...state,
                searchKey: action.searchKey,
                pageInfo: action.data.pageInfo,
                page_info: action.data.page_info,
                itemList: action.data.resultContent
            }

        case CWLIST_ADD: 
            return {
                ...state,
                pageInfo: action.data.pageInfo,
                page_info: action.data.page_info,
                itemList: state.itemList.concat(action.data.resultContent)
            }

        default:
            return state
    }
}