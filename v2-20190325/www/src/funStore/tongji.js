import {store} from '../index'
import G_SDK from "G_SDK"

export const tongji = function(){
    let userId 
    try {
        // 防止还未取到
        userId = store.getState().userInfo.info.userinfo.userId
    } catch (error) {
        userId = ''
    }
    let ars = Array.from(arguments)
    let eventname = ars[0]
    let others = ars.slice(1)
    G_SDK.push(eventname,userId,...others)
}