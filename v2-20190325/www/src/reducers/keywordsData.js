import { PULL_KEYWORDSMESGS,INSERT_KEYWORDSMESGS,INIT_KEYWORDSESGLIST,APPEND_KEYWORDSMESGS,SOCKET_KEYWORDSMESGS,CHANGE_SLICE_KEYWORD,CHANGE_NEWTIP_KEYWORD} from '../constants/ActionTypes'

const initMsgFlow= {
  isNew:false,
  sliceBegin:0,
  pageInfo:{},
  keyword:false,
  msgFlow: [

  ]
}

export default function keywordsData(state = initMsgFlow, action) {
  switch (action.type) {
    case PULL_KEYWORDSMESGS:
      return {
        ...state,
        pageInfo: action.pageInfo,
        keyword:  true,
        msgFlow: action.data.reverse()
      }
    case INSERT_KEYWORDSMESGS:
      return {
        ...state,
        pageInfo: action.pageInfo,
        msgFlow: action.data.reverse().concat(state.msgFlow)
      }
    case APPEND_KEYWORDSMESGS:
      return {
        ...state,
        pageInfo: action.pageInfo,
        msgFlow: state.msgFlow.concat(action.data.reverse())
      }
    case SOCKET_KEYWORDSMESGS:
      return {
        ...state,
        msgFlow: state.msgFlow.concat(action.data)
      }

    case INIT_KEYWORDSESGLIST:
      return {
        sliceBegin:0,
        isNew:false,
        keyword:false,
        msgFlow: [

        ]
      }

    case CHANGE_SLICE_KEYWORD:
      return {
        ...state,
        sliceBegin:action.number,
      }

    case CHANGE_NEWTIP_KEYWORD:
      return {
        ...state,
        isNew:action.status,
      }
    default:
     return state

  }

}
