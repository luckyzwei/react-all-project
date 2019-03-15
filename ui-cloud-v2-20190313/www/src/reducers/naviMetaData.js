import { NAVILIST_INIT} from '../constants/ActionTypes'

const initNaviList= {
  naviList:[],
  flatNaviList: null
}

export default function naviMetaData(state = initNaviList, action) {
  switch (action.type) {
    case NAVILIST_INIT:
      return {
        ...state,
        naviList: action.data,
        flatNaviList: action.data.reduce((pre,cur) => (
          pre.concat(
            cur.children!=null ? [{code:cur.code,name:cur.name,target:cur.target}].concat(
              cur.children.map(v => ({code:v.code,name:v.name,target:cur.target}))
            )
            : {code:cur.code,name:cur.name,target:cur.target}
          )
        ),[])
      }

    default:
     return state

  }

}
