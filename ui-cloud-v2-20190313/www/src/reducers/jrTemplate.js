// 废弃
import {
    JRLIST_INIT
} from '../constants/ActionTypes'

const initData = {
    checkAll: false,
    searchParamas:{},
    pageInfo: {
        currentPage: 0,
        pageSize: 0,
        totalPage: 1,
        totalRecords: 0
    },
    dataList: []
}

export default function jrDataList(state = initData, action){
    switch (action.type) {
        case JRLIST_INIT:
            return {
                ...state,
                searchParamas: action.searchParamas,
                pageInfo: action.pageInfo,
                dataList: action.jrList
            }

        default:
            return state
    }
}
