import { GROUP_INIT,GROUPLIST_PULL,SELECT_GROUP,SEND_GROUP,
  UNSEND_GROUP,SEND_ALL,CANCEL_ALL,ADD_GROUP_TAG,DELETE_GROUP_TAG,UNSELECT_GROUP,
ADD_UNREADMSG,REDUCE_UNREADMSG,REDUCE_ALL_UNKEYWORD,ADD_NORMALUNREADMSG,REDUCE_NORMALUNREADMSG} from '../constants/ActionTypes'

const initGroupList= {
  targetGroup:{
    iconPath:'',
    id:'',
    lastMsgTime:'',
    nickName:'',
    unreadMsgCount:0,
    unreadKeywordMsgCount:0,
    robotGroupMemList:[],
    altSelected: false
  },
  chatGroupId:'',
  listData:[
  ]
}

export default function groupList(state = initGroupList, action) {
  switch (action.type) {
    case GROUPLIST_PULL:
      return {
      ...state,
      listData: action.data
    }

    case GROUP_INIT:
      return {
        ...state,
        chatGroupId:''
      }

    case SELECT_GROUP:
    return {
      targetGroup:state.listData.find(item => item.id === action.id),
      chatGroupId:action.id,
      listData : state.listData.map((item)=>
        item.id === action.id ?
        { ...item, unreadMsgCount:0, unreadKeywordMsgCount: (item.unreadKeywordMsgCount - action.count)>=0?(item.unreadKeywordMsgCount - action.count):0 } : item
      )
    }

    case REDUCE_UNREADMSG:
    return {
      ...state,
      listData : state.listData.map((item)=>
        item.id === action.id ?
        { ...item, unreadKeywordMsgCount: (item.unreadKeywordMsgCount - action.count)>=0?(item.unreadKeywordMsgCount - action.count):0 } : item
      )
    }

    case ADD_UNREADMSG:
    return {
      ...state,
      listData : state.listData.map((item)=>
        item.id === action.id ?
        { ...item, unreadKeywordMsgCount: item.unreadKeywordMsgCount + 1,unreadMsgCount: item.unreadMsgCount + 1,lastMsgTime:action.lastMsgTime} : item
      )
    }


    case REDUCE_NORMALUNREADMSG:
    return {
      ...state,
      listData : state.listData.map((item)=>
        item.id === action.id ?
        { ...item, unreadMsgCount: 0} : item
      )
    }

    case REDUCE_ALL_UNKEYWORD:
    return {
      ...state,
      listData : state.listData.map((item)=>
        item.id === action.id ?
        { ...item, unreadKeywordMsgCount: 0} : item
      )
    }

    case ADD_NORMALUNREADMSG:
    return {
      ...state,
      listData : state.listData.map((item)=>
        item.id === action.id ?
        { ...item, unreadMsgCount: item.unreadMsgCount + 1,lastMsgTime:action.lastMsgTime} : item
      )
    }

    case UNSELECT_GROUP:
    return {
      ...state,
      targetGroup:{
        iconPath:'',
        id:'',
        lastMsgTime:'',
        nickName:'',
        unreadMsgCount:0,
        unreadKeywordMsgCount:0,
        altSelected: false,
        robotGroupMemList:[]
      },
      chatGroupId:''
    }

   case SEND_GROUP:
   return {
   ...state,
   listData : state.listData.map((item)=>
      item.id === action.id ?
      { ...item, altSelected : !item.altSelected } : item
    )
   }

   case SEND_ALL:
   return {
   ...state,
   listData : state.listData.map((item) => (
     { ...item, altSelected : true})
    )
   }

   case CANCEL_ALL:
   return {
   ...state,
   listData : state.listData.map((item) => (
     { ...item, altSelected : false })
    )
   }

   case ADD_GROUP_TAG:
   return {
   ...state,
   listData : state.listData.map((item)=>
      item.id === action.id ?
      { ...item, labelList:item.labelList.concat(action.data)} : item
    )
   }

   case DELETE_GROUP_TAG:
   return {
   ...state,
   listData : state.listData.map((item)=>
      item.id === action.id ?
      { ...item, labelList:item.labelList.filter(subItem => action.labelId != subItem.labelId)} : item
    )
   }
    default:
     return state

  }

}
