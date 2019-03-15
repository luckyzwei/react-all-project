import { PULL_SINGLEMESGS_BYID,INSERT_SINGLEMESGS,INIT_SINGLEMESGLIST,APPEND_SINGLEMESGS,SOCKET_SINGLEMESGS,CHANGE_SLICE_SIN,CHANGE_NEWTIP_SIN} from '../constants/ActionTypes'

const initMsgFlow= {
  isNew:false,
  sliceBegin:0,
  pageInfo:{},
  singleId:'',
  msgFlow: [

  ]
}

export default function singleMesgData(state = initMsgFlow, action) {
  switch (action.type) {
    case PULL_SINGLEMESGS_BYID:
      return {
        ...state,
        pageInfo: action.pageInfo,
        singleId:  action.id,
        msgFlow: action.data.messages.reverse()
      }
    case INSERT_SINGLEMESGS:
      return {
        ...state,
        pageInfo: action.pageInfo,
        msgFlow: action.data.messages.reverse().concat(state.msgFlow)
      }
    case APPEND_SINGLEMESGS:
      return {
        ...state,
        pageInfo: action.pageInfo,
        msgFlow: state.msgFlow.concat(action.data.reverse())
      }
    case SOCKET_SINGLEMESGS:
      return {
        ...state,
        msgFlow: state.msgFlow.concat(action.data)
      }

    case INIT_SINGLEMESGLIST:
      return {
        isNew:false,
        singleId:'',
        msgFlow: [

        ]
      }

    case CHANGE_SLICE_SIN:
      return {
        ...state,
        sliceBegin:action.number,
      }

    case CHANGE_NEWTIP_SIN:
      return {
        ...state,
        isNew:action.status,
      }
    default:
     return state

  }

}
