import { GROUPLIST_SEARCH,MEMBERLIST_SEARCH} from '../constants/ActionTypes'

const initSearchState= {
  searchType : {
    group : false,
    member:false
  },
  key: {
    groupKey:'',
    memberKey:''
  }
}

export default function searchKey(state = initSearchState, action) {
  switch (action.type) {
    case GROUPLIST_SEARCH:
      return {
        searchType : {
          group : true,
          member:false
        },
        key:{
          ...state.key,
          groupKey: action.key
        }
      }

    case MEMBERLIST_SEARCH:
      return {
        searchType : {
          group : false,
          member:true
        },
        key: {
          ...state.key,
          memberKey: action.key
        }
      }


    default:
     return state

  }

}
