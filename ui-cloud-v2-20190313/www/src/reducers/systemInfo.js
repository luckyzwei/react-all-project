import _ from 'lodash'

const initData = {
    infoList:[],
    unreadCount: 0
}

export default function systemInfo(state = initData, action) {
    switch (action.type) {
        case 'SYSINFO_SET_LIST':
            return {
                ...state,
                infoList: action.data
            }
        case 'SYSINFO_SET_COUNT':
            return {
                ...state,
                unreadCount: action.data
            }
        case 'SYSINFO_ADD':
            return {
                ...state,
                infoList: (action.data.concat(state.infoList)).slice(0,10),
                unreadCount: state.unreadCount+1
            }
        case 'SYSINFO_READ':
            return {
                ...state,
                unreadCount: 0
            }
        default:
            return state
    }
}