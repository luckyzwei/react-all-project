import { MEMBERLIST_INIT,SELECT_MEMBER,REMOVE_MEMBER,MEMBERLIST_INSERT,ALT_MEMBER,
  PUT_STORE_MEMBER,ALT_ALL,ADD_MEMBER_TAG,DELETE_MEMBER_TAG,
  ADD_MEMBER_UNREADMSG,SET_READ,CHANGE_SLICE_MEMBER,ALT_INIT} from '../constants/ActionTypes'

const initMemberList= {
  altAll: false,
  sliceBegin:0,
  chatMemberId:'',
  listData:[
        // {
        //   iconPath:'',
        //   id:'',
        //   lastMsgTime:'',
        //   nickName:'',
        //   keywordMsgCount:'',
        //   altSelected: false
        // }
  ]
}

export default function memberList(state = initMemberList, action) {
  switch (action.type) {
    case MEMBERLIST_INIT:
      return {
        ...state,
        chatMemberId:'',
        sliceBegin:0,
        listData:[

        ]
      }
    case 'MEMBERLIST_REFRESH':
      return {
        altAll: false,
        sliceBegin:0,
        chatMemberId:'',
        listData: action.data
      }

    case MEMBERLIST_INSERT:
      return {
      ...state,
      listData: state.listData.concat(action.data)
    }

    case ADD_MEMBER_UNREADMSG:
    return {
      ...state,
      listData : state.listData.map((item)=>
        item.id === action.id ?
        { ...item, keywordMsgCount: item.keywordMsgCount + 1 ,lastMsgTime: action.lastMsgTime} : item
      )
    }

    case SELECT_MEMBER:
    return {
      ...state,
      chatMemberId:action.id,
      listData : state.listData.map((item)=>
        item.id === action.id ?
        { ...item, keywordMsgCount: 0 } : item
      )
    }

    case REMOVE_MEMBER:
    return {
      ...state,
      chatMemberId: '',
      listData: state.listData.filter((item) => action.id != item.id)
    }

    case ALT_MEMBER:
    let unSelect = state.listData.filter(v => !v.altSelected)
    let altAll = unSelect.length==1&&unSelect[0].id==action.id
    return {
    ...state,
    altAll : altAll,
    listData : state.listData.map((item)=>
       item.id === action.id ?
       { ...item, altSelected : !item.altSelected } : item
     )
    }

    case ALT_ALL:
    return {
    ...state,
    altAll : !state.altAll,
    listData : state.listData.map((item)=>(
       { ...item, altSelected : !state.altAll  }
      )
     )
    }

    case ALT_INIT:
    return {
    ...state,
    altAll : false,
    listData : state.listData.map((item)=>(
       { ...item, altSelected : false  }
      )
     )
    }
    case PUT_STORE_MEMBER:
    return {
    ...state,
    listData : state.listData.map((item)=>
       item.id === action.id ?
       { ...item, putStore : true, altSelected : true } : item
     )
    }

    case ADD_MEMBER_TAG:
    return {
    ...state,
    listData : state.listData.map((item)=>
       item.id === action.id ?
       { ...item, labelList:item.labelList.concat(action.data)} : item
     )
    }

    case DELETE_MEMBER_TAG:
    return {
    ...state,
    listData : state.listData.map((item)=>
       item.id === action.id ?
       { ...item, labelList:item.labelList.filter(subItem => action.labelId != subItem.labelId)} : item
     )
    }

    case SET_READ:
    return {
      ...state,
      listData : state.listData.map((item)=>
        item.id === action.id ?
        { ...item, keywordMsgCount: 0 } : item
      )
    }

    case CHANGE_SLICE_MEMBER:
    return {
      ...state,
      sliceBegin:action.number,
    }

    default:
     return state

  }

}
