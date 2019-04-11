import {LAUCH_PICKER,INSER_MSG_PICKER,TURN_OFF_PICKER,REMOVE_MSG_PICKER} from '../constants/ActionTypes'

const initData= {
  pickState:false,
  pickered:[]
}

export default function msgPicker(state = initData, action) {
  switch (action.type) {
    case LAUCH_PICKER:
      return {
        pickState:true,
        pickered:[]
      }
    case INSER_MSG_PICKER:
      return {
        ...state,
        pickered: state.pickered.concat(action.data.messages)
      }
    case REMOVE_MSG_PICKER:
      return {
        ...state,
        pickered: state.pickered.filter(item => item.msgInfo.msgId!=action.msgId)
      }
    case TURN_OFF_PICKER:
      return {
        pickState:false,
        pickered:[]
      }
    default:
     return state

  }

}
