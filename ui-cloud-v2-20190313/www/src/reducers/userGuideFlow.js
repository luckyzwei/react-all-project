import { TASKFLOW_SET,SET_TASKFLOW_USERINFO,SET_FLOWSEGEMNET} from '../constants/ActionTypes'

const initData= {
  userInfo:{
    processIntanceId:null,
    userId:null
  },
  taskList: 'DONE',
  flowSegment:null
}

export default function userGuideFlow(state = initData, action) {
  switch (action.type) {
    case TASKFLOW_SET:
      return {
        ...state,
        taskList: action.data
      }
    case SET_TASKFLOW_USERINFO:
      return {
        ...state,
        userInfo:{
          processIntanceId:action.processIntanceId,
          userId:action.userId
        }
      }
    case SET_FLOWSEGEMNET:
      return {
        ...state,
        flowSegment:action.seg
      }
    default:
     return state

  }

}
