import {
    INIT_GROUP_GC,
    PULL_GROUP_GC,
    CHECK_GROUP_GC,
    UPDATE_INTRODUCE_GC,
    UPDATE_NAME_GC,
    ADD_GROUP_GC_TAG,
    DELETE_GROUP_GC_TAG,
    ADD_GROUP_GC_KEYWORD,
    DELETE_GROUP_GC_KEYWORD
} from '../constants/ActionTypes'

const initGcGroupList= {
    pageInfo: {
        currentPage: 0,
        pageSize: 20,
        totalPage: 1,
        totalRecords: 0
    },
    searchKey: '',
    targetGroup:{},
    checkedId:'',
    groupList:[]

}

export default function gcGroupList(state = initGcGroupList, action) {
  switch (action.type) {
    case INIT_GROUP_GC:
        return {
            ...state,
            searchKey: action.searchKey,
            pageInfo: action.pageInfo,
            groupList: action.data
        }

    case PULL_GROUP_GC:
        return {
            ...state,
            pageInfo: action.pageInfo,
            groupList: state.groupList.concat(action.data)
        }

    case CHECK_GROUP_GC:
        return {
            ...state,
            checkedId: action.id,
            targetGroup: action.data
        }
    case UPDATE_INTRODUCE_GC:
        return {
            ...state,
            targetGroup: {
                ...state.targetGroup,
                groupItem: {
                    ...state.targetGroup.groupItem,
                    introduce: action.introduce
                }
            }
        }

    case UPDATE_NAME_GC:
        return {
            ...state,
            targetGroup: {
                ...state.targetGroup,
                groupItem: {
                    ...state.targetGroup.groupItem,
                    name: action.name
                }
            }
        }
      case ADD_GROUP_GC_TAG:
          return {
              ...state,
              checkedId:action.id,
              targetGroup:{...state.targetGroup,
                  groupLabelProfiles:state.targetGroup.groupLabelProfiles.concat(action.data)}
          }
      case DELETE_GROUP_GC_TAG:
          return {
              ...state,
              checkedId:action.id,
              targetGroup:{...state.targetGroup,
                  groupLabelProfiles:state.targetGroup.groupLabelProfiles.filter(subItem => action.labelId != subItem.id)}
          }
      case ADD_GROUP_GC_KEYWORD:
          return {
              ...state,
              checkedId:action.id,
              targetGroup:{...state.targetGroup,
                  keywordSimpleItems:state.targetGroup.keywordSimpleItems.concat(action.data)}
          }
      case DELETE_GROUP_GC_KEYWORD:
          // console.log('run DELETE',action.labelId,state.targetGroup.keywordSimpleItems)
          return {
              ...state,
              checkedId:action.id,
              targetGroup:{...state.targetGroup,
                  keywordSimpleItems:state.targetGroup.keywordSimpleItems.filter(subItem => action.labelId != subItem.id)}
          }
    default:
     return state

  }

}
