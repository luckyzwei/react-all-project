const initState= {
  webSocket:'',
  closeState:true
}

export default function socketState(state = initState, action) {
  switch (action.type) {
    case 'TURN_OFF_STATE':
      return {
        webSocket:'',
        closeState: false
      }
    case 'SET_SOCKET':
    return {
      closeState:true,
      webSocket: action.socket
    }

    default:
     return state

  }

}
