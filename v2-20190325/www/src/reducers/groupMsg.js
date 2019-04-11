import { GROUPLIST_PULL,GROUP_SELECTED,GROUP_RETURNED,FILTER_AREA} from '../constants/ActionTypes'

const initGroupMsg = [
    {
      roomID:'',
      roomName:'',
      groupAttr:'',
      area:'',
      city:'',
      tage:'',
      count:'',
      timestamp:'',
      flag:'null'
    }

]

export default function groupList(state = initGroupState, action) {
  switch (action.type) {
    case GROUPLIST_PULL:
      return action.data

    case GROUP_SELECTED:
      return state.map(group =>
        group.roomID === action.roomID?
        { ...group, flag: true } :
        group
      )

    case GROUP_RETURNED:
      return state.map(group =>
        group.roomID === action.roomID?
        { ...group, flag: false } :
        group
      )

    case FILTER_AREA:
    return state.filter(group =>
          group.area === action.area
    )
    default:
     return state

  }

}
