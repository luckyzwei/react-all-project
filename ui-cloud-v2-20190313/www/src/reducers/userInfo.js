import { USERINFO_INIT} from '../constants/ActionTypes'

const initUserInfo= {
  info: {}
}

export default function userInfo(state = initUserInfo, action) {
  switch (action.type) {
    case USERINFO_INIT:
      return {
        info: action.data
      }

    default:
     return state

  }

}
