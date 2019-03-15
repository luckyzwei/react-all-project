import $ from 'jquery'
import {store} from '../index'
import { push, replace } from 'react-router-redux'
import promiseXHR from './ServerFun'
import {ORIGIN_NAME,API_PATH} from '../constants/OriginName'
import { Base64 } from 'js-base64'
class AuthProvider {
  constructor() {

  }
  onLogin({username,password,imageCode,sessionKey}){
    const self = this
    const url = API_PATH+'/uaa/oauth/token' 
    // => 原获取token地址，test和pro
    /**********新接口测试*********/
    // const url = API_PATH+'/ooauth-server/oauth/token'
    /**********新接口测试*********/
    const param = imageCode?'&imageCode='+imageCode+'&sessionKey='+sessionKey:''
    return promiseXHR(url,{type:'Basic',value:null},'grant_type=password&username='+username+'&password='+password+param,'POST')
            .then((res) => {
              const data = eval("("+ res +")")
              self.saveTokens(data.access_token,data.refresh_token,data.expires_in)
              return data
            }).catch((reject) => {
              return 'error'
            })
  }

  setWait(){
    let exp = new Date();
    exp.setTime(exp.getTime() + 1000*5)
    document.cookie = 'access_token' + "="+ escape ('wait')+ ";expires=" + exp.toGMTString()+";path=/";
  }

  saveTokens(access_token,refresh_token,expires_in){
    let exp = new Date();
    exp.setTime(exp.getTime() + expires_in*1000-30000)
    document.cookie = 'access_token' + "="+ escape (access_token) + ";expires=" + exp.toGMTString()+";path=/";
    document.cookie = 'refresh_token' + "="+ escape (refresh_token)+";path=/"
  }

  encodeClientId(){
      if(this.getCookie('webclient_id')==null){
        var webclient_id = Base64.encode('lizClient'+Math.random().toString())
        this.saveWebClienId(webclient_id)
      }
  }

  saveWebClienId(webclient_id){
    let exp = new Date();
    exp.setTime(exp.getTime() + 1000*60*60*24*365)
    document.cookie = 'webclient_id' + "="+ escape (webclient_id) + ";expires=" + exp.toGMTString()+";path=/";
  }

  onRefreshToken() {
   const refreshToken = this.getCookie('refresh_token')
   // const url = API_PATH+'/uaa/oauth/token' => 原获取token地址，test和pro
    /**********新接口测试*********/
    const url = API_PATH+'/uaa/oauth/token'
    /**********新接口测试*********/
   this.setWait()
   return  promiseXHR(url,{type:'Basic',value:null},'grant_type=refresh_token&refresh_token='+refreshToken,'POST')
           .then(res => {
             const data = eval("("+ res +")")
            if(data.access_token!=undefined){
             this.saveTokens(data.access_token,data.refresh_token,data.expires_in)
            }
             return data.access_token
           }).catch(res => {
             this.deleteCookie('access_token')
             this.deleteCookie('refresh_token')
             this.deleteCookie('webclient_id')
             store.dispatch(
               push('/v2/login')
             )
           })
 }

   getCookie(key) {
          var aCookie = document.cookie.split("; ");
          // console.log(aCookie);
          for (var i=0; i < aCookie.length; i++)
          {
              var aCrumb = aCookie[i].split("=");
              if (key == aCrumb[0])
                  return unescape(aCrumb[1]);
          }
          return null;
    }

    getAccessToken(){
      if(!this.getCookie('access_token')){
        return  this.onRefreshToken()
      }else if (this.getCookie('access_token')=='wait'){
        return new Promise((resolve,reject) => {
          setTimeout(()=>{
            this.getAccessToken().then(res => {
              resolve(res)
            })
          },1900)
        })
      }else {
        return new Promise((resolve,reject) => {
          resolve(this.getCookie('access_token'))
        })
      }
    }

    deleteCookie(name){
          var exp = new Date();
          exp.setTime(exp.getTime() - 1);
          var cval=this.getCookie(name);
          if(cval!=null)
          document.cookie= name + "="+cval+";expires="+exp.toGMTString();
    }
}

export default new AuthProvider()
