import { SET_MONITORINFO} from '../constants/ActionTypes'

const initState= {
  monitorId : ''
}

export default function monitorInfo(state = initState, action) {
  switch (action.type) {
    case SET_MONITORINFO:
      return {
        monitorId: action.data
      }
    default:
     return state

  }

}
