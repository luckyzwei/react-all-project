import React, { Component } from 'react'
import PropTypes from 'prop-types'
import LoadingAnimationS from './shareComponent/LoadingAnimationS'
import GuideBox from './shareComponent/GuideBox'
import PageLoading from './shareComponent/PageLoading'
import promiseXHR from '../funStore/ServerFun'
import AuthProvider from '../funStore/AuthProvider'
import {API_PATH} from '../constants/OriginName'
export default class SaasInitScope extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired
  }
  state={
    view: 99,
    naviMetaData: {},
    actions: {},
    userInfo: {
      info:{
        immemId:'',
        userinfo:{}
      }
    },
    prop: false,
    flag: false
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.naviMetaData.naviList.length>0) {
        if(this.state.userInfo.info.userinfo.initFlag===undefined&&nextProps.userInfo.info.userinfo.initFlag===0){
          this.setState({
            naviMetaData: nextProps.naviMetaData,
            actions: nextProps.actions,
            userInfo: nextProps.userInfo,
            prop: true,
            view: 1
          })
        }else if(this.state.userInfo.info.userinfo.initFlag===undefined&&nextProps.userInfo.info.userinfo.initFlag===1){
          // nextProps.actions.goTo(nextProps.naviMetaData.naviList[0].target)
          nextProps.actions.goTo('/v2/home')
        }
    }
  }

  componentDidUpdate (nextProp, nextState) {
    const {naviMetaData,actions} = this.state 
    if(this.state.prop && this.state.flag){
      // actions.goTo(naviMetaData.naviList[0].target)  
      this.updateLoginFlag()
      actions.goTo('/v2/GIScope')    
    }
  }

  updateLoginFlag(){
    const url = API_PATH+'/basis-api/authsec/usermgmt/updateUserInitFlag'
    AuthProvider.getAccessToken()
    .then((resolve,reject)=>{
        return promiseXHR(url,{type:'Bearer',value:resolve},null,'PUT')
    })
  }

  changeView = (view) => {
    if (view == 99) {
      this.setState({view: 99,flag: true})
    } else {
      this.setState({
        view: 99
      })
      setTimeout(() => {
        this.setState({
          view
        })
      }, 500)
    }
  }

  render() {
    return (
      <div style ={{height:'100%'}}>
        {
          this.state.view==1?
          <GuideBox 
                bigBg={`${process.env.PUBLIC_URL}/images/bj/falseHome.png`}
                loadImg={`${process.env.PUBLIC_URL}/images/bj/falseGI.jpg`}
                title={'欢迎使用栗子云'}
                content={'首页将会展示你的群数据状态，让我们先去看一下栗子云有哪些功能吧。'}
                btnTxt={'下一步'}
                btnFunc={() => {this.changeView(2)}}/>
                :this.state.view==2?
                <GuideBox 
                bigBg={`${process.env.PUBLIC_URL}/images/bj/falseGI.jpg`}
                loadImg={`${process.env.PUBLIC_URL}/images/bj/falseGB.jpg`}
                title={'更方便管理你的微信群'}
                content={'所有的群都将在这里进行展示与管理，你可以修改群名、设置入群欢迎语等。'}
                btnTxt={'下一步'}
                btnFunc={() => {this.changeView(3)}}/> 
                :this.state.view==3?
                <GuideBox 
                bigBg={`${process.env.PUBLIC_URL}/images/bj/falseGB.jpg`}
                loadImg={`${process.env.PUBLIC_URL}/images/bj/falseGM.jpg`}
                title={'使用栗子云直接建群'}
                content={'在新建群模块，你可以选择建群方式并设定入群的规则。'}
                btnTxt={'下一步'}
                btnFunc={() => {this.changeView(4)}}/> 
                :this.state.view==4?
                <GuideBox 
                bigBg={`${process.env.PUBLIC_URL}/images/bj/falseGM.jpg`}
                loadImg={`${process.env.PUBLIC_URL}/images/bj/falseMT.png`}
                title={'更便捷的发送、接收微信群消息'}
                content={'你可以随时查看和回复微信群的聊天，和群内用户进行互动，不错过任何一条消息。'}
                btnTxt={'下一步'}
                btnFunc={() => {this.changeView(5)}}/> 
                :this.state.view==5?
                <GuideBox 
                bigBg={`${process.env.PUBLIC_URL}/images/bj/falseMT.png`}
                loadImg={`${process.env.PUBLIC_URL}/images/bj/falseMM.png`}
                title={'轻松添加投放素材'}
                content={'在这里添加你要投放的素材，我们支持文字、图片、链接、小程序等格式的投放内容。'}
                btnTxt={'下一步'}
                btnFunc={() => {this.changeView(6)}}/> 
                :this.state.view==6?
                <GuideBox 
                bigBg={`${process.env.PUBLIC_URL}/images/bj/falseMM.png`}
                loadImg={`${process.env.PUBLIC_URL}/images/bj/falseCW.png`}
                title={'发条朋友圈'}
                content={'你可以编辑发送小助手的朋友圈，让朋友圈成为另一个信息展示平台。'}
                btnTxt={'下一步'}
                btnFunc={() => {this.changeView(7)}}/> 
                :this.state.view==7?
                <GuideBox 
                bigBg={`${process.env.PUBLIC_URL}/images/bj/falseCW.png`}
                loadImg={`${process.env.PUBLIC_URL}/images/bj/falseHW.png`}
                title={'编辑属于你自己的内容库'}
                content={'撰写属于你的专属FAQ，回答用户问题更快速便捷。'}
                btnTxt={'下一步'}
                btnFunc={() => {this.changeView(8)}}/> 
                :this.state.view==8?
                <GuideBox 
                bigBg={`${process.env.PUBLIC_URL}/images/bj/falseHW.png`}
                loadImg={`${process.env.PUBLIC_URL}/images/bj/falseSys.png`}
                title={'高频词'}
                content={'在这里你可以查看群内出现的高频词汇，看看大家都在聊什么。'}
                btnTxt={'下一步'}
                btnFunc={() => {this.changeView(9)}}/> 
                :this.state.view==9?
                <GuideBox 
                bigBg={`${process.env.PUBLIC_URL}/images/bj/falseSys.png`}
                title={'更灵活管理、设置你的账户'}
                content={'你可以设置子账号以及各个账号的权限，栗子云的主要功能就介绍到这里，快去体验一下吧。'}
                btnTxt={'我知道了'}
                btnFunc={() => {this.changeView(99)}}/>
                :
                <PageLoading/>
        }
        
      </div>
    )
  }
}
