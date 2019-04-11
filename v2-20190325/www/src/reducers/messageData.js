import { PULLMESGS_BYID,INSERTMESGS,INSERTMESGS_DESC,INIT_MESGLIST,APPENDMESGS,SOCKETMESG,CHANGE_SLICE,CHANGE_NEWTIP} from '../constants/ActionTypes'
import _ from 'lodash'
const initMsgFlow= {
  isNew:false,
  sliceBegin:0,
  pageInfo : {},
  roomType : '',
  roomId:'',
  msgFlow: [
  ]
}

export default function messageData(state = initMsgFlow, action) {
  switch (action.type) {
    case PULLMESGS_BYID:
      return {
        ...state,
        pageInfo : action.pageInfo,
        roomType : action.roomType,
        roomId:  action.id,
        msgFlow: action.data.messages.reverse()
      }
    case INSERTMESGS:
      return {
        ...state,
        pageInfo: action.pageInfo,
        msgFlow: _.uniqBy(action.data.messages.reverse().concat(state.msgFlow),'msgInfo.msgId')
      }

    case INSERTMESGS_DESC:
      return {
        ...state,
        pageInfo: action.pageInfo,
        msgFlow: _.uniqBy(state.msgFlow.concat(action.data.messages.reverse()),'msgInfo.msgId')
      }
    case APPENDMESGS:
      return {
        ...state,
        pageInfo: action.pageInfo,
        msgFlow: state.msgFlow.concat(action.data.messages.reverse())
      }
    case SOCKETMESG:
      return {
        ...state,
        msgFlow: _.uniqBy(state.msgFlow.concat(action.data),'msgInfo.msgId')
      }
    case INIT_MESGLIST:
      return {
        isNew:false,
        sliceBegin:0,
        pageInfo : {},
        roomType : '',
        roomId:'',
        msgFlow: [

        ]
      }
    case CHANGE_SLICE:
    return {
      ...state,
      sliceBegin:action.number,
    }

    case CHANGE_NEWTIP:
    return {
      ...state,
      isNew:action.status,
    }
    default:
     return state

  }

}
