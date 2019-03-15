import React,{Component} from 'react'
import $ from 'jquery'
import MsgTransform from './MsgTransform'
import ImgMsgBox from './ImgMsgBox'
import VideMsgBox from './VideoMsgBox'
// type=3:普通消息
// type=8:图片消息
// type=9:音频消息
// type=10:视频
// type=88:公众号名片

const playVoice = (audioSrc,ref) => {
    ref.nextSibling.style.color = '#8e97a0'
  if(ref.classList.contains('playing')){
      ref.classList.remove('playing');
      $('#voiceMsgPlayer').attr('src','')
      if(!ref.classList.contains('played')){
        ref.classList.add('played')
      }
  }else{
        $('#voiceMsgPlayer').get(0).onplay = () => {
            ref.className = 'playIcon played playing'
        }
        $('#voiceMsgPlayer').get(0).onended = () => {
            ref.className = 'playIcon played'
        }
        $('.playIcon').removeClass('playing')
        $('#voiceMsgPlayer').attr('src',audioSrc).get(0).play();
  }

}

const cDataParse = (str) => {
  if(str.includes('CDATA')){
    return str.substr(9,str.length-12)
  }else {
    return str
  }
}

const getTime = (time) => {
  const result = new Date(new Date(time+'Z').getTime() - 8*3600*1000)
  let year = result.getFullYear().toString()
  let month = (result.getMonth()+1).toString()
  let day = result.getDate().toString()
  let hours = (result.getHours()).toString()
  let minutes = result.getMinutes().toString()
  let seconds = result.getSeconds().toString()
  month = month.length == 1 ? '0'+month : month
  day = day.length == 1 ? '0'+day : day
  hours = hours.length == 1 ? '0'+hours : hours
  minutes = minutes.length == 1 ? '0'+minutes : minutes
  seconds = seconds.length == 1 ? '0'+seconds : seconds
  return year+'.'+month+'.'+day+' '+hours+':'+minutes+':'+seconds
}

class MsgBubble extends Component{
    shouldComponentUpdate(nextProps,nextState){
        if(nextProps.msgData.msgInfo.msgId==this.props.msgData.msgInfo.msgId){
            return false
        }else{
            return true
        }
    }
    render () {
        const {imMemIDs,msgData,src,action,selectMemberId,selectRoom,getMesgByMemebr,msgPicker,removeMsgPicker,insertMsgPicker,quickAnswerHandle,getUserInfoHandle,jumpIntoGroup,roomType,altMember,putStoreByMember} = this.props
        // console.log(msgData);
    let _ref;
    let maxNum = 2;
    const type = msgData.msgInfo.msgType
    const msgTime = getTime(msgData.msgInfo.msgTime)
    // const monitor = monitor
    const judagebyId = imMemIDs.find(item => item.imMemId == msgData.msgInfo.imMemId) == undefined ? true : false
    let voiceWidth=msgData.msgInfo.voiceTime*3.6+80
    const msgPicker_on = msgPicker!=undefined? msgPicker.pickState : false
    const checked = msgPicker!=undefined? msgPicker.pickered.includes(msgData) : false
    const msgCheck = () => {
      if(checked){
        removeMsgPicker(msgData.msgInfo.msgId)
      }else {
        insertMsgPicker({messages:msgData})
      }
    }

    // if(type == 11){
    //   $(msgData.msgInfo.content).find('title').eq(0).text()
    //   $(msgData.msgInfo.content).find('sourcedisplayname').text()
    //   $(msgData.msgInfo.content).find('weappiconurl').text()

    // }
    const _contentArray = msgData.msgInfo.content.split(' ')
    switch(type) {
        case 3 :
        const content = MsgTransform(msgData.msgInfo,msgData.keywordList)
        return (
          judagebyId ?
            <div className='friendMsgBubble' id={msgData.msgInfo.msgId}>
                {msgPicker_on? <div className = {checked?'pickedBox icon-gi':'pickBox icon-gi'} onClick = {msgCheck}></div> : ''}
                <div className='avatarBox' onClick={(e) => {
                    getUserInfoHandle&&getUserInfoHandle(e,msgData.memInfo.id,msgData.memInfo.iconPath)
                    {/* getMesgByMemebr&&getMesgByMemebr(msgData.memInfo.id)
                    selectMemberId&&selectMemberId(msgData.memInfo.id)
                    selectRoom&&selectRoom('MEMBER') */}
                }}>
                    <img src={msgData.memInfo.iconPath} alt=''/>
                </div>
                <div className='msgInfoBox'>
                    <span className='nickName' style = {{marginLeft:msgPicker_on? '10px':'0'}}>{msgData.memInfo.remarkName?msgData.memInfo.remarkName:msgData.memInfo.nickName}</span>
                    <span className='date'>{msgTime}</span>
                    {roomType=='GROUP'
                        ?<span className="alt" onClick={()=>{
                            altMember&&altMember(msgData.memInfo.id)
                            putStoreByMember&&putStoreByMember(msgData.memInfo.id)
                            }}>@Ta</span>:''}
                </div>
                <div className='friendMsgBox'>
                    <div className='msgBox'>
                     <pre dangerouslySetInnerHTML={{__html: content}} onClick={(e)=>{
                        quickAnswerHandle&&quickAnswerHandle(e)
                        jumpIntoGroup&&jumpIntoGroup(msgData.msgInfo.msgId)
                       }}/>
                    </div>
                </div>
            </div> :

            <div className='monitorMsgBubble' id={msgData.msgInfo.msgId}>
              {msgPicker_on? <div className = {checked?'pickedBox icon-gi':'pickBox icon-gi'} onClick = {msgCheck}></div> : ''}
                <div className='avatarBox'>
                    <img src={msgData.memInfo.iconPath} alt=''/>
                </div>
                <div className='msgInfoBox'>
                    <span className='nickName' style = {{marginLeft:msgPicker_on? '10px':'0'}}>{msgData.memInfo.remarkName?msgData.memInfo.remarkName:msgData.memInfo.nickName}</span>
                    <span className='date'>{msgTime}</span>
                </div>
                <div className='monitorMsgBox'>
                    <div className='msgBox'>
                     <pre dangerouslySetInnerHTML={{__html: content}} />
                    </div>
                </div>
            </div>
        )

        case 8 :
        // const _contentArray = msgData.msgInfo.content.split(' ')
        // var _contentArray = ['@xiaomi',msgData.msgInfo.content]
        const _isErrorForU = _contentArray[0].includes('@')
        return (
          judagebyId ?
          (
            _isErrorForU ?

            <div>
              <div className='friendMsgBubble' id={msgData.msgInfo.msgId}>
                  {msgPicker_on? <div className = {checked?'pickedBox iconBackground':'pickBox iconBackground'} onClick = {msgCheck}></div> : ''}
                  <div className='avatarBox' onClick={(e) => {
                      getUserInfoHandle&&getUserInfoHandle(e,msgData.memInfo.id,msgData.memInfo.iconPath)
                  }}>
                      <img src={msgData.memInfo.iconPath} alt=''/>
                  </div>
                  <div className='msgInfoBox'>
                      <span className='nickName' style = {{marginLeft:msgPicker_on? '10px':'0'}}>{msgData.memInfo.remarkName?msgData.memInfo.remarkName:msgData.memInfo.nickName}</span>
                      <span className='date'>{msgTime}</span>
                      {roomType=='GROUP'?<span className="alt" onClick={()=>{
                           altMember&&altMember(msgData.memInfo.id)
                           putStoreByMember&&putStoreByMember(msgData.memInfo.id)}}>@Ta</span>:''}
                  </div>
                  <div className='friendMsgBox'>
                      <div className='msgBox'>
                       <pre dangerouslySetInnerHTML={{__html: _contentArray[0]}} onClick={(e)=>{
                          quickAnswerHandle&&quickAnswerHandle(e)
                          jumpIntoGroup&&jumpIntoGroup(msgData.msgInfo.msgId)
                         }}/>
                      </div>
                  </div>
              </div>

              <div className='friendMsgBubble' id={msgData.msgInfo.msgId}>
                  <div className='avatarBox' onClick={(e) => {
                      getUserInfoHandle&&getUserInfoHandle(e,msgData.memInfo.id,msgData.memInfo.iconPath)
                  }}>
                      <img src={msgData.memInfo.iconPath} alt=''/>
                  </div>
                  <div className='msgInfoBox'>
                      <span className='nickName'>{msgData.memInfo.remarkName?msgData.memInfo.remarkName:msgData.memInfo.nickName}</span>
                      <span className='date'>{msgTime}</span>
                      {roomType=='GROUP'?<span className="alt" onClick={()=>{
                           altMember&&altMember(msgData.memInfo.id)
                           putStoreByMember&&putStoreByMember(msgData.memInfo.id)}}>@Ta</span>:''}
                      <ImgMsgBox src={_contentArray[1]} action={action.imgView}/>
                  </div>
              </div>
            </div>
            :
            <div className='friendMsgBubble' id={msgData.msgInfo.msgId}>
                <div className='avatarBox' onClick={(e) => {
                    getUserInfoHandle&&getUserInfoHandle(e,msgData.memInfo.id,msgData.memInfo.iconPath)
                    {/* getMesgByMemebr&&getMesgByMemebr(msgData.memInfo.id)
                    selectMemberId&&selectMemberId(msgData.memInfo.id)
                    selectRoom&&selectRoom('MEMBER') */}
                }}>
                    <img src={msgData.memInfo.iconPath} alt=''/>
                </div>
                <div className='msgInfoBox'>
                    <span className='nickName'>{msgData.memInfo.remarkName?msgData.memInfo.remarkName:msgData.memInfo.nickName}</span>
                    <span className='date'>{msgTime}</span>
                    {roomType=='GROUP'?<span className="alt" onClick={()=>{
                         altMember&&altMember(msgData.memInfo.id)
                         putStoreByMember&&putStoreByMember(msgData.memInfo.id)}}>@Ta</span>:''}
                    <ImgMsgBox src={msgData.msgInfo.content} action={action.imgView}/>
                </div>
            </div>
          )
            :
          (

            _isErrorForU ?

            <div>
              <div className='monitorMsgBubble' id={msgData.msgInfo.msgId}>
                {msgPicker_on? <div className = {checked?'pickedBox iconBackground':'pickBox iconBackground'} onClick = {msgCheck}></div> : ''}
                  <div className='avatarBox'>
                      <img src={msgData.memInfo.iconPath} alt=''/>
                  </div>
                  <div className='msgInfoBox'>
                      <span className='nickName' style = {{marginLeft:msgPicker_on? '10px':'0'}}>{msgData.memInfo.remarkName?msgData.memInfo.remarkName:msgData.memInfo.nickName}</span>
                      <span className='date'>{msgTime}</span>
                  </div>
                  <div className='monitorMsgBox'>
                      <div className='msgBox'>
                       <pre dangerouslySetInnerHTML={{__html: _contentArray[0]}} />
                      </div>
                  </div>
              </div>
              <div className='monitorMsgBubble' id={msgData.msgInfo.msgId}>
                 <div className='avatarBox'>
                     <img src={msgData.memInfo.iconPath} alt=''/>
                 </div>
                 <div className='msgInfoBox'>
                      <span className='nickName' style = {{marginLeft:msgPicker_on? '10px':'0'}}>{msgData.memInfo.remarkName?msgData.memInfo.remarkName:msgData.memInfo.nickName}</span>
                      <span className='date'>{msgTime}</span>
                  </div>
                  <ImgMsgBox src={_contentArray[1]} action={action.imgView}/>
             </div>
            </div>
            :
            <div className='monitorMsgBubble' id={msgData.msgInfo.msgId}>
               <div className='avatarBox'>
                   <img src={msgData.memInfo.iconPath} alt=''/>
               </div>
               <div className='msgInfoBox'>
                    <span className='nickName' style = {{marginLeft:msgPicker_on? '10px':'0'}}>{msgData.memInfo.remarkName?msgData.memInfo.remarkName:msgData.memInfo.nickName}</span>
                    <span className='date'>{msgTime}</span>
                </div>
                <ImgMsgBox src={msgData.msgInfo.content} action={action.imgView}/>
           </div>
         )
        )

        case 9 :
        return (
            judagebyId ?
            <div className='friendMsgBubble' id={msgData.msgInfo.msgId}>
                <div className='avatarBox' onClick={(e) => {
                    getUserInfoHandle&&getUserInfoHandle(e,msgData.memInfo.id,msgData.memInfo.iconPath)
                    {/* getMesgByMemebr&&getMesgByMemebr(msgData.memInfo.id)
                    selectMemberId&&selectMemberId(msgData.memInfo.id)
                    selectRoom&&selectRoom('MEMBER') */}
                }}>
                    <img src={msgData.memInfo.iconPath} alt=''/>
                </div>
                <div className='msgInfoBox'>
                    <span className='nickName'>{msgData.memInfo.remarkName?msgData.memInfo.remarkName:msgData.memInfo.nickName}</span>
                    <span className='date'>{msgTime}</span>
                    {roomType=='GROUP'?<span className="alt" onClick={()=>{
                         altMember&&altMember(msgData.memInfo.id)
                         putStoreByMember&&putStoreByMember(msgData.memInfo.id)}}>@Ta</span>:''}
                </div>
                <div className='audioMsgBox' style={{width:voiceWidth+'px'}} onClick={()=>{playVoice(msgData.msgInfo.content,_ref)}}>
                    <div ref={e => (_ref=e)} className='playIcon'></div>
                    <div className='audioPeriod'>{msgData.msgInfo.voiceTime+'"'}</div>
                </div>
            </div> :
            <div className='monitorMsgBubble' id={msgData.msgInfo.msgId}>
                <div className='avatarBox'>
                    <img src={msgData.memInfo.iconPath} alt=''/>
                </div>
                <div className='msgInfoBox'>
                    <span className='nickName' style = {{marginLeft:msgPicker_on? '10px':'0'}}>{msgData.memInfo.remarkName?msgData.memInfo.remarkName:msgData.memInfo.nickName}</span>
                    <span className='date'>{msgTime}</span>
                </div>
                <div className='audioMsgBox' style={{width:voiceWidth+'px'}} onClick={()=>{playVoice(msgData.msgInfo.content,_ref)}}>
                    <div ref={e => (_ref=e)} className='playIcon'></div>
                    <div className='audioPeriod'>{msgData.msgInfo.voiceTime+'"'}</div>
                </div>
            </div>
        )
        case 6: return (
            judagebyId?
            <div className='friendMsgBubble' id={msgData.msgInfo.msgId}>
                <div className='avatarBox' onClick={(e) => {
                    getUserInfoHandle&&getUserInfoHandle(e,msgData.memInfo.id,msgData.memInfo.iconPath)
                    {/* getMesgByMemebr&&getMesgByMemebr(msgData.memInfo.id)
                    selectMemberId&&selectMemberId(msgData.memInfo.id)
                    selectRoom&&selectRoom('MEMBER') */}
                }}>
                    <img src={msgData.memInfo.iconPath} alt=''/>
                </div>
                <div className='msgInfoBox'>
                    <span className='nickName'>{msgData.memInfo.remarkName?msgData.memInfo.remarkName:msgData.memInfo.nickName}</span>
                    <span className='date'>{msgTime}</span>
                    {roomType=='GROUP'?<span className="alt" onClick={()=>{
                         altMember&&altMember(msgData.memInfo.id)
                         putStoreByMember&&putStoreByMember(msgData.memInfo.id)}}>@Ta</span>:''}
                </div>
                <a className='microMsgBox' href={msgData.msgInfo.linkHref==''?'javascript:void(0)':msgData.msgInfo.linkHref} target='blank'>
                   <div className="microTitle">{msgData.msgInfo.linkTitle}</div>
                   <div className="microContent">
                       <div className="textBox">
                           {msgData.msgInfo.linkDesc}
                       </div>
                       <div className="imgBox">
                           <img src={msgData.msgInfo.content?msgData.msgInfo.content:process.env.PUBLIC_URL+"/images/icon/liziLogo.png"} alt=""/>
                       </div>
                   </div>
               </a>
            </div>:
            <div className='monitorMsgBubble' id={msgData.msgInfo.msgId}>
               <div className='avatarBox'>
                   <img src={msgData.memInfo.iconPath} alt=''/>
               </div>
               <div className='msgInfoBox'>
                    <span className='nickName' style = {{marginLeft:msgPicker_on? '10px':'0'}}>{msgData.memInfo.remarkName?msgData.memInfo.remarkName:msgData.memInfo.nickName}</span>
                    <span className='date'>{msgTime}</span>
                </div>
               <a className='microMsgBox' href={msgData.msgInfo.linkHref==''?'javascript:void(0)':msgData.msgInfo.linkHref} target='blank' style={{background:"#FFF"}}>
                   <div className="microTitle">{msgData.msgInfo.linkTitle}</div>
                   <div className="microContent">
                       <div className="textBox">
                           {msgData.msgInfo.linkDesc}
                       </div>
                       <div className="imgBox">
                        <img src={msgData.msgInfo.content?msgData.msgInfo.content:process.env.PUBLIC_URL+"/images/icon/liziLogo.png"} alt=""/>
                       </div>
                   </div>
               </a>
           </div>
        )

        case 33: return (
            judagebyId?
            <div className='friendMsgBubble' id={msgData.msgInfo.msgId}>
                <div className='avatarBox' onClick={(e) => {
                    getUserInfoHandle&&getUserInfoHandle(e,msgData.memInfo.id,msgData.memInfo.iconPath)
                    {/* getMesgByMemebr&&getMesgByMemebr(msgData.memInfo.id)
                    selectMemberId&&selectMemberId(msgData.memInfo.id)
                    selectRoom&&selectRoom('MEMBER') */}
                }}>
                    <img src={msgData.memInfo.iconPath} alt=''/>
                </div>
                <div className='msgInfoBox'>
                    <span className='nickName'>{msgData.memInfo.remarkName?msgData.memInfo.remarkName:msgData.memInfo.nickName}</span>
                    <span className='date'>{msgTime}</span>
                    {roomType=='GROUP'?<span className="alt" onClick={()=>{
                         altMember&&altMember(msgData.memInfo.id)
                         putStoreByMember&&putStoreByMember(msgData.memInfo.id)}}>@Ta</span>:''}
                </div>
                <a className='fileMsgBox' href={msgData.msgInfo.linkHref==''?'javascript:void(0)':msgData.msgInfo.linkHref} target='blank'>
                    <img src={process.env.PUBLIC_URL+"/images/icon/liziFile.png"} alt=""/>
                    <p className='fileName'>知识卡片_170303.zip</p>
                    <p className="fileSize">2.3MB</p>
                </a>
            </div>:
            <div className='monitorMsgBubble' id={msgData.msgInfo.msgId}>
                <div className='avatarBox'>
                    <img src={msgData.memInfo.iconPath} alt=''/>
                </div>
                <div className='msgInfoBox'>
                    <span className='nickName' style = {{marginLeft:msgPicker_on? '10px':'0'}}>{msgData.memInfo.remarkName?msgData.memInfo.remarkName:msgData.memInfo.nickName}</span>
                    <span className='date'>{msgTime}</span>
                </div>
                <a className='fileMsgBox' href={msgData.msgInfo.linkHref==''?'javascript:void(0)':msgData.msgInfo.linkHref} target='blank'>
                    <img src={process.env.PUBLIC_URL+"/images/icon/liziFile.png"} alt=""/>
                    <p className='fileName'>知识卡片_170303.zip</p>
                    <p className="fileSize">2.3MB</p>
                </a>
           </div>
        )

        case 11: return (
            msgData.msgInfo.content?
            judagebyId?
            <div className='friendMsgBubble' id={msgData.msgInfo.msgId}>
                <div className='avatarBox' onClick={(e) => {
                    getUserInfoHandle&&getUserInfoHandle(e,msgData.memInfo.id,msgData.memInfo.iconPath)
                    {/* getMesgByMemebr&&getMesgByMemebr(msgData.memInfo.id)
                    selectMemberId&&selectMemberId(msgData.memInfo.id)
                    selectRoom&&selectRoom('MEMBER') */}
                }}>
                    <img src={msgData.memInfo.iconPath} alt=''/>
                </div>
                <div className='msgInfoBox'>
                    <span className='nickName'>{msgData.memInfo.remarkName?msgData.memInfo.remarkName:msgData.memInfo.nickName}</span>
                    <span className='date'>{msgTime}</span>
                    {roomType=='GROUP'?<span className="alt" onClick={()=>{
                        altMember&&altMember(msgData.memInfo.id)
                        putStoreByMember&&putStoreByMember(msgData.memInfo.id)}}>@Ta</span>:''}
                </div>
                <div className='programMsgBox' >
                    <div className="programTitle">
                        <img src={$(msgData.msgInfo.content.replace(/^@\S*\s+/g,'')).find('weappiconurl').length>0?$(msgData.msgInfo.content.replace(/^@\S*\s+/g,'')).find('weappiconurl').html().split('[')[2].slice(0,-5):process.env.PUBLIC_URL+'/images/icon/wxapp_logo.png'} alt=""/>
                        <span>{$(msgData.msgInfo.content.replace(/^@\S*\s+/g,'')).find('sourcedisplayname').length>0?$(msgData.msgInfo.content.replace(/^@\S*\s+/g,'')).find('sourcedisplayname').text():''}</span>
                    </div>
                    <div className="title">{
                        cDataParse($(msgData.msgInfo.content.replace(/^@\S*\s+/g,'')).find('title').length>0?$(msgData.msgInfo.content.replace(/^@\S*\s+/g,'')).find('title').eq(0).text():'')
                        }</div>
                      <div className="programImg" style={{backgroundImage:`url(${msgData.msgInfo.linkHref?msgData.msgInfo.linkHref:process.env.PUBLIC_URL+'/images/icon/wxapp_img.png'})`}}></div>
                    <div className="line"></div>
                    <div className="programLogo">
                        <div className="img icon-gm"/>
                        小程序
                    </div>
                    <p className="tip">小程序只能在微信中打开</p>
                </div>
            </div>:
            <div className='monitorMsgBubble' id={msgData.msgInfo.msgId}>
               <div className='avatarBox'>
                   <img src={msgData.memInfo.iconPath} alt=''/>
               </div>
               <div className='msgInfoBox'>
                    <span className='nickName' style = {{marginLeft:msgPicker_on? '10px':'0'}}>{msgData.memInfo.remarkName?msgData.memInfo.remarkName:msgData.memInfo.nickName}</span>
                    <span className='date'>{msgTime}</span>
                </div>
               <div className='programMsgBox' >
                    <div className="programTitle">
                      <img src={$(msgData.msgInfo.content.replace(/^@\S*\s+/g,'')).find('weappiconurl').length>0?$(msgData.msgInfo.content.replace(/^@\S*\s+/g,'')).find('weappiconurl').html().split('[')[2].slice(0,-5):process.env.PUBLIC_URL+'/images/icon/wxapp_logo.png'} alt=""/>
                      <span>{$(msgData.msgInfo.content.replace(/^@\S*\s+/g,'')).find('sourcedisplayname').length>0?$(msgData.msgInfo.content.replace(/^@\S*\s+/g,'')).find('sourcedisplayname').text():''}</span>
                    </div>
                      <div className="title">{  cDataParse($(msgData.msgInfo.content.replace(/^@\S*\s+/g,'')).find('title').length>0?$(msgData.msgInfo.content.replace(/^@\S*\s+/g,'')).find('title').eq(0).text():'')}</div>
                    <div className="programImg" style={{backgroundImage:`url(${msgData.msgInfo.linkHref?msgData.msgInfo.linkHref:process.env.PUBLIC_URL+'/images/icon/wxapp_img.png'})`}}></div>
                    <div className="line"></div>
                    <div className="programLogo">
                        <div className="img icon-gm"></div>
                        小程序
                    </div>
                    <p className="tip">小程序只能在微信中打开</p>
                </div>
           </div>:''
        )

        case 10 :
          // const _contentArray = msgData.msgInfo.content.split(' ')
          // const _content = MsgTransform(msgData.msgInfo,msgData.keywordList)
          return (
            judagebyId ?
              <div className='friendMsgBubble' id={msgData.msgInfo.msgId}>
                  {msgPicker_on? <div className = {checked?'pickedBox iconBackground':'pickBox iconBackground'} onClick = {msgCheck}></div> : ''}
                  <div className='avatarBox' onClick={(e) => {
                      getUserInfoHandle&&getUserInfoHandle(e,msgData.memInfo.id,msgData.memInfo.iconPath)
                      {/* getMesgByMemebr&&getMesgByMemebr(msgData.memInfo.id)
                      selectMemberId&&selectMemberId(msgData.memInfo.id)
                      selectRoom&&selectRoom('MEMBER') */}
                  }}>
                      <img src={msgData.memInfo.iconPath} alt=''/>
                  </div>
                  <div className='msgInfoBox'>
                      <span className='nickName'>{msgData.memInfo.remarkName?msgData.memInfo.remarkName:msgData.memInfo.nickName}</span>
                      <span className='date'>{msgTime}</span>
                      {roomType=='GROUP'?<span className="alt" onClick={()=>{
                           altMember&&altMember(msgData.memInfo.id)
                           putStoreByMember&&putStoreByMember(msgData.memInfo.id)}}>@Ta</span>:''}
                      <VideMsgBox
                        src={msgData.msgInfo.linkHref}
                        img={msgData.msgInfo.content}
                        action={action.videoView}
                        />
                  </div>
              </div> :

              <div className='monitorMsgBubble' id={msgData.msgInfo.msgId}>
                {msgPicker_on? <div className = {checked?'pickedBox iconBackground':'pickBox iconBackground'} onClick = {msgCheck}></div> : ''}
                  <div className='avatarBox'>
                      <img src={msgData.memInfo.iconPath} alt=''/>
                  </div>
                  <div className='msgInfoBox'>
                      <span className='nickName'>{msgData.memInfo.remarkName?msgData.memInfo.remarkName:msgData.memInfo.nickName}</span>
                      <span className='date'>{msgTime}</span>
                      <VideMsgBox
                        src={msgData.msgInfo.linkHref}
                        img={msgData.msgInfo.content}
                        action={action.videoView}
                        />
                  </div>
              </div>
          )
        default: 
            return (
                judagebyId ?
                <div className='friendMsgBubble' id={msgData.msgInfo.msgId}>
                    {msgPicker_on? <div className = {checked?'pickedBox iconBackground':'pickBox iconBackground'} onClick = {msgCheck}></div> : ''}
                    <div className='avatarBox' onClick={(e) => {
                        getUserInfoHandle&&getUserInfoHandle(e,msgData.memInfo.id,msgData.memInfo.iconPath)
                    }}>
                        <img src={msgData.memInfo.iconPath} alt=''/>
                    </div>
                    <div className='msgInfoBox'>
                        <span className='nickName' style = {{marginLeft:msgPicker_on? '10px':'0'}}>{msgData.memInfo.remarkName?msgData.memInfo.remarkName:msgData.memInfo.nickName}</span>
                        <span className='date'>{msgTime}</span>
                        {roomType=='GROUP'
                            ?<span className="alt" onClick={()=>{
                                altMember&&altMember(msgData.memInfo.id)
                                putStoreByMember&&putStoreByMember(msgData.memInfo.id)}}>@Ta</span>:''}
                    </div>
                    <div className='friendMsgBox'>
                        <div className='msgBox' style={{color: "#B5BDC6"}}>
                            <span className="icon-alert"></span>暂时不支持展示此类消息
                        </div>
                    </div>
                </div> :
                <div className='monitorMsgBubble' id={msgData.msgInfo.msgId}>
                    {msgPicker_on? <div className = {checked?'pickedBox iconBackground':'pickBox iconBackground'} onClick = {msgCheck}></div> : ''}
                    <div className='avatarBox'>
                        <img src={msgData.memInfo.iconPath} alt=''/>
                    </div>
                    <div className='msgInfoBox'>
                        <span className='nickName' style = {{marginLeft:msgPicker_on? '10px':'0'}}>{msgData.memInfo.remarkName?msgData.memInfo.remarkName:msgData.memInfo.nickName}</span>
                        <span className='date'>{msgTime}</span>
                    </div>
                    <div className='monitorMsgBox'>
                        <div className='msgBox' style={{color: "#B5BDC6"}}>
                            <span className="icon-alert"></span>暂时不支持展示此类消息
                        </div>
                    </div>
                </div>
            )

            case 88 :
            return (
                judagebyId ?
                <div className='friendMsgBubble' id={msgData.msgInfo.msgId}>
                    {msgPicker_on? <div className = {checked?'pickedBox icon-gi':'pickBox icon-gi'} onClick = {msgCheck}></div> : ''}
                    <div className='avatarBox' onClick={(e) => {
                        getUserInfoHandle&&getUserInfoHandle(e,msgData.memInfo.id,msgData.memInfo.iconPath)
                        {/* getMesgByMemebr&&getMesgByMemebr(msgData.memInfo.id)
                        selectMemberId&&selectMemberId(msgData.memInfo.id)
                        selectRoom&&selectRoom('MEMBER') */}
                    }}>
                        <img src={msgData.memInfo.iconPath} alt=''/>
                    </div>
                    <div className='msgInfoBox'>
                        <span className='nickName' style = {{marginLeft:msgPicker_on? '10px':'0'}}>{msgData.memInfo.remarkName?msgData.memInfo.remarkName:msgData.memInfo.nickName}</span>
                        <span className='date'>{msgTime}</span>
                        {roomType=='GROUP'
                            ?<span className="alt" onClick={()=>{
                                altMember&&altMember(msgData.memInfo.id)
                                putStoreByMember&&putStoreByMember(msgData.memInfo.id)
                                }}>@Ta</span>:''}
                    </div>
                    <div className='friendMsgBox publicBox-big'>
                        <div className='publicBox'>
                            <div className="public-title">
                                <img className='public-pic' src="" alt=""/>
                                <p className='public-name'>爱奇艺VIP</p>
                            </div>
                            <p className='public-btmname'>公众号名片</p>
                            {/* <pre dangerouslySetInnerHTML={{__html: content}} onClick={(e)=>{
                            quickAnswerHandle&&quickAnswerHandle(e)
                            jumpIntoGroup&&jumpIntoGroup(msgData.msgInfo.msgId)
                            }}/> */}
                        </div>
                    </div>
                </div> :

                <div className='monitorMsgBubble' id={msgData.msgInfo.msgId}>
                    {msgPicker_on? <div className = {checked?'pickedBox icon-gi':'pickBox icon-gi'} onClick = {msgCheck}></div> : ''}
                    <div className='avatarBox'>
                        <img src={msgData.memInfo.iconPath} alt=''/>
                    </div>
                    <div className='msgInfoBox'>
                        <span className='nickName' style = {{marginLeft:msgPicker_on? '10px':'0'}}>{msgData.memInfo.remarkName?msgData.memInfo.remarkName:msgData.memInfo.nickName}</span>
                        <span className='date'>{msgTime}</span>
                    </div>
                    <div className='monitorMsgBox'>
                        <div className='publicBox'>
                            <div className="public-title">
                                <img className='public-pic' src="" alt=""/>
                                <p className='public-name'>爱奇艺VIP</p>
                            </div>
                            <p className='public-btmname'>公众号名片</p>
                        </div>
                    </div>
                </div>
            )
        }
    }
}


// const MsgBubble = ({imMemIDs,msgData,src,action,selectMemberId,selectRoom,getMesgByMemebr,msgPicker,removeMsgPicker,insertMsgPicker,quickAnswerHandle,getUserInfoHandle,jumpIntoGroup,roomType,altMember,putStoreByMember}) => {

//   // console.log(msgData);
//     let _ref;
//     let maxNum = 2;
//     const type = msgData.msgInfo.msgType
//     const msgTime = getTime(msgData.msgInfo.msgTime)
//     // const monitor = monitor
//     const judagebyId = imMemIDs.find(item => item.imMemId == msgData.msgInfo.imMemId) == undefined ? true : false
//     let voiceWidth=msgData.msgInfo.voiceTime*3.6+80
//     const msgPicker_on = msgPicker!=undefined? msgPicker.pickState : false
//     const checked = msgPicker!=undefined? msgPicker.pickered.includes(msgData) : false
//     const msgCheck = () => {
//       if(checked){
//         removeMsgPicker(msgData.msgInfo.msgId)
//       }else {
//         insertMsgPicker({messages:msgData})
//       }
//     }

//     // if(type == 11){
//     //   $(msgData.msgInfo.content).find('title').eq(0).text()
//     //   $(msgData.msgInfo.content).find('sourcedisplayname').text()
//     //   $(msgData.msgInfo.content).find('weappiconurl').text()

//     // }
//     const _contentArray = msgData.msgInfo.content.split(' ')
//     switch(type) {
//         case 3 :
//         const content = MsgTransform(msgData.msgInfo,msgData.keywordList)
//         return (
//           judagebyId ?
//             <div className='friendMsgBubble' id={msgData.msgInfo.msgId}>
//                 {msgPicker_on? <div className = {checked?'pickedBox icon-gi':'pickBox icon-gi'} onClick = {msgCheck}></div> : ''}
//                 <div className='avatarBox' onClick={(e) => {
//                     getUserInfoHandle&&getUserInfoHandle(e,msgData.memInfo.id,msgData.memInfo.iconPath)
//                     {/* getMesgByMemebr&&getMesgByMemebr(msgData.memInfo.id)
//                     selectMemberId&&selectMemberId(msgData.memInfo.id)
//                     selectRoom&&selectRoom('MEMBER') */}
//                 }}>
//                     <img src={msgData.memInfo.iconPath} alt=''/>
//                 </div>
//                 <div className='msgInfoBox'>
//                     <span className='nickName' style = {{marginLeft:msgPicker_on? '10px':'0'}}>{msgData.memInfo.remarkName?msgData.memInfo.remarkName:msgData.memInfo.nickName}</span>
//                     <span className='date'>{msgTime}</span>
//                     {roomType=='GROUP'
//                         ?<span className="alt" onClick={()=>{
//                             altMember&&altMember(msgData.memInfo.id)
//                             putStoreByMember&&putStoreByMember(msgData.memInfo.id)
//                             }}>@Ta</span>:''}
//                 </div>
//                 <div className='friendMsgBox'>
//                     <div className='msgBox'>
//                      <pre dangerouslySetInnerHTML={{__html: content}} onClick={(e)=>{
//                         quickAnswerHandle&&quickAnswerHandle(e)
//                         jumpIntoGroup&&jumpIntoGroup(msgData.msgInfo.msgId)
//                        }}/>
//                     </div>
//                 </div>
//             </div> :

//             <div className='monitorMsgBubble' id={msgData.msgInfo.msgId}>
//               {msgPicker_on? <div className = {checked?'pickedBox icon-gi':'pickBox icon-gi'} onClick = {msgCheck}></div> : ''}
//                 <div className='avatarBox'>
//                     <img src={msgData.memInfo.iconPath} alt=''/>
//                 </div>
//                 <div className='msgInfoBox'>
//                     <span className='nickName' style = {{marginLeft:msgPicker_on? '10px':'0'}}>{msgData.memInfo.remarkName?msgData.memInfo.remarkName:msgData.memInfo.nickName}</span>
//                     <span className='date'>{msgTime}</span>
//                 </div>
//                 <div className='monitorMsgBox'>
//                     <div className='msgBox'>
//                      <pre dangerouslySetInnerHTML={{__html: content}} />
//                     </div>
//                 </div>
//             </div>
//         )

//         case 8 :
//         // const _contentArray = msgData.msgInfo.content.split(' ')
//         // var _contentArray = ['@xiaomi',msgData.msgInfo.content]
//         const _isErrorForU = _contentArray[0].includes('@')
//         return (
//           judagebyId ?
//           (
//             _isErrorForU ?

//             <div>
//               <div className='friendMsgBubble' id={msgData.msgInfo.msgId}>
//                   {msgPicker_on? <div className = {checked?'pickedBox iconBackground':'pickBox iconBackground'} onClick = {msgCheck}></div> : ''}
//                   <div className='avatarBox' onClick={(e) => {
//                       getUserInfoHandle&&getUserInfoHandle(e,msgData.memInfo.id,msgData.memInfo.iconPath)
//                   }}>
//                       <img src={msgData.memInfo.iconPath} alt=''/>
//                   </div>
//                   <div className='msgInfoBox'>
//                       <span className='nickName' style = {{marginLeft:msgPicker_on? '10px':'0'}}>{msgData.memInfo.remarkName?msgData.memInfo.remarkName:msgData.memInfo.nickName}</span>
//                       <span className='date'>{msgTime}</span>
//                       {roomType=='GROUP'?<span className="alt" onClick={()=>{
//                            altMember&&altMember(msgData.memInfo.id)
//                            putStoreByMember&&putStoreByMember(msgData.memInfo.id)}}>@Ta</span>:''}
//                   </div>
//                   <div className='friendMsgBox'>
//                       <div className='msgBox'>
//                        <pre dangerouslySetInnerHTML={{__html: _contentArray[0]}} onClick={(e)=>{
//                           quickAnswerHandle&&quickAnswerHandle(e)
//                           jumpIntoGroup&&jumpIntoGroup(msgData.msgInfo.msgId)
//                          }}/>
//                       </div>
//                   </div>
//               </div>

//               <div className='friendMsgBubble' id={msgData.msgInfo.msgId}>
//                   <div className='avatarBox' onClick={(e) => {
//                       getUserInfoHandle&&getUserInfoHandle(e,msgData.memInfo.id,msgData.memInfo.iconPath)
//                   }}>
//                       <img src={msgData.memInfo.iconPath} alt=''/>
//                   </div>
//                   <div className='msgInfoBox'>
//                       <span className='nickName'>{msgData.memInfo.remarkName?msgData.memInfo.remarkName:msgData.memInfo.nickName}</span>
//                       <span className='date'>{msgTime}</span>
//                       {roomType=='GROUP'?<span className="alt" onClick={()=>{
//                            altMember&&altMember(msgData.memInfo.id)
//                            putStoreByMember&&putStoreByMember(msgData.memInfo.id)}}>@Ta</span>:''}
//                       <ImgMsgBox src={_contentArray[1]} action={action.imgView}/>
//                   </div>
//               </div>
//             </div>
//             :
//             <div className='friendMsgBubble' id={msgData.msgInfo.msgId}>
//                 <div className='avatarBox' onClick={(e) => {
//                     getUserInfoHandle&&getUserInfoHandle(e,msgData.memInfo.id,msgData.memInfo.iconPath)
//                     {/* getMesgByMemebr&&getMesgByMemebr(msgData.memInfo.id)
//                     selectMemberId&&selectMemberId(msgData.memInfo.id)
//                     selectRoom&&selectRoom('MEMBER') */}
//                 }}>
//                     <img src={msgData.memInfo.iconPath} alt=''/>
//                 </div>
//                 <div className='msgInfoBox'>
//                     <span className='nickName'>{msgData.memInfo.remarkName?msgData.memInfo.remarkName:msgData.memInfo.nickName}</span>
//                     <span className='date'>{msgTime}</span>
//                     {roomType=='GROUP'?<span className="alt" onClick={()=>{
//                          altMember&&altMember(msgData.memInfo.id)
//                          putStoreByMember&&putStoreByMember(msgData.memInfo.id)}}>@Ta</span>:''}
//                     <ImgMsgBox src={msgData.msgInfo.content} action={action.imgView}/>
//                 </div>
//             </div>
//           )
//             :
//           (

//             _isErrorForU ?

//             <div>
//               <div className='monitorMsgBubble' id={msgData.msgInfo.msgId}>
//                 {msgPicker_on? <div className = {checked?'pickedBox iconBackground':'pickBox iconBackground'} onClick = {msgCheck}></div> : ''}
//                   <div className='avatarBox'>
//                       <img src={msgData.memInfo.iconPath} alt=''/>
//                   </div>
//                   <div className='msgInfoBox'>
//                       <span className='nickName' style = {{marginLeft:msgPicker_on? '10px':'0'}}>{msgData.memInfo.remarkName?msgData.memInfo.remarkName:msgData.memInfo.nickName}</span>
//                       <span className='date'>{msgTime}</span>
//                   </div>
//                   <div className='monitorMsgBox'>
//                       <div className='msgBox'>
//                        <pre dangerouslySetInnerHTML={{__html: _contentArray[0]}} />
//                       </div>
//                   </div>
//               </div>
//               <div className='monitorMsgBubble' id={msgData.msgInfo.msgId}>
//                  <div className='avatarBox'>
//                      <img src={msgData.memInfo.iconPath} alt=''/>
//                  </div>
//                  <div className='msgInfoBox'>
//                       <span className='nickName' style = {{marginLeft:msgPicker_on? '10px':'0'}}>{msgData.memInfo.remarkName?msgData.memInfo.remarkName:msgData.memInfo.nickName}</span>
//                       <span className='date'>{msgTime}</span>
//                   </div>
//                   <ImgMsgBox src={_contentArray[1]} action={action.imgView}/>
//              </div>
//             </div>
//             :
//             <div className='monitorMsgBubble' id={msgData.msgInfo.msgId}>
//                <div className='avatarBox'>
//                    <img src={msgData.memInfo.iconPath} alt=''/>
//                </div>
//                <div className='msgInfoBox'>
//                     <span className='nickName' style = {{marginLeft:msgPicker_on? '10px':'0'}}>{msgData.memInfo.remarkName?msgData.memInfo.remarkName:msgData.memInfo.nickName}</span>
//                     <span className='date'>{msgTime}</span>
//                 </div>
//                 <ImgMsgBox src={msgData.msgInfo.content} action={action.imgView}/>
//            </div>
//          )
//         )

//         case 9 :
//         return (
//             judagebyId ?
//             <div className='friendMsgBubble' id={msgData.msgInfo.msgId}>
//                 <div className='avatarBox' onClick={(e) => {
//                     getUserInfoHandle&&getUserInfoHandle(e,msgData.memInfo.id,msgData.memInfo.iconPath)
//                     {/* getMesgByMemebr&&getMesgByMemebr(msgData.memInfo.id)
//                     selectMemberId&&selectMemberId(msgData.memInfo.id)
//                     selectRoom&&selectRoom('MEMBER') */}
//                 }}>
//                     <img src={msgData.memInfo.iconPath} alt=''/>
//                 </div>
//                 <div className='msgInfoBox'>
//                     <span className='nickName'>{msgData.memInfo.remarkName?msgData.memInfo.remarkName:msgData.memInfo.nickName}</span>
//                     <span className='date'>{msgTime}</span>
//                     {roomType=='GROUP'?<span className="alt" onClick={()=>{
//                          altMember&&altMember(msgData.memInfo.id)
//                          putStoreByMember&&putStoreByMember(msgData.memInfo.id)}}>@Ta</span>:''}
//                 </div>
//                 <div className='audioMsgBox' style={{width:voiceWidth+'px'}} onClick={()=>{playVoice(msgData.msgInfo.content,_ref)}}>
//                     <div ref={e => (_ref=e)} className='playIcon'></div>
//                     <div className='audioPeriod'>{msgData.msgInfo.voiceTime+'"'}</div>
//                 </div>
//             </div> :
//             <div className='monitorMsgBubble' id={msgData.msgInfo.msgId}>
//                 <div className='avatarBox'>
//                     <img src={msgData.memInfo.iconPath} alt=''/>
//                 </div>
//                 <div className='msgInfoBox'>
//                     <span className='nickName' style = {{marginLeft:msgPicker_on? '10px':'0'}}>{msgData.memInfo.remarkName?msgData.memInfo.remarkName:msgData.memInfo.nickName}</span>
//                     <span className='date'>{msgTime}</span>
//                 </div>
//                 <div className='audioMsgBox' style={{width:voiceWidth+'px'}} onClick={()=>{playVoice(msgData.msgInfo.content,_ref)}}>
//                     <div ref={e => (_ref=e)} className='playIcon'></div>
//                     <div className='audioPeriod'>{msgData.msgInfo.voiceTime+'"'}</div>
//                 </div>
//             </div>
//         )
//         case 6: return (
//             judagebyId?
//             <div className='friendMsgBubble' id={msgData.msgInfo.msgId}>
//                 <div className='avatarBox' onClick={(e) => {
//                     getUserInfoHandle&&getUserInfoHandle(e,msgData.memInfo.id,msgData.memInfo.iconPath)
//                     {/* getMesgByMemebr&&getMesgByMemebr(msgData.memInfo.id)
//                     selectMemberId&&selectMemberId(msgData.memInfo.id)
//                     selectRoom&&selectRoom('MEMBER') */}
//                 }}>
//                     <img src={msgData.memInfo.iconPath} alt=''/>
//                 </div>
//                 <div className='msgInfoBox'>
//                     <span className='nickName'>{msgData.memInfo.remarkName?msgData.memInfo.remarkName:msgData.memInfo.nickName}</span>
//                     <span className='date'>{msgTime}</span>
//                     {roomType=='GROUP'?<span className="alt" onClick={()=>{
//                          altMember&&altMember(msgData.memInfo.id)
//                          putStoreByMember&&putStoreByMember(msgData.memInfo.id)}}>@Ta</span>:''}
//                 </div>
//                 <a className='microMsgBox' href={msgData.msgInfo.linkHref==''?'javascript:void(0)':msgData.msgInfo.linkHref} target='blank'>
//                    <div className="microTitle">{msgData.msgInfo.linkTitle}</div>
//                    <div className="microContent">
//                        <div className="textBox">
//                            {msgData.msgInfo.linkDesc}
//                        </div>
//                        <div className="imgBox">
//                            <img src={msgData.msgInfo.content?msgData.msgInfo.content:process.env.PUBLIC_URL+"/images/icon/liziLogo.png"} alt=""/>
//                        </div>
//                    </div>
//                </a>
//             </div>:
//             <div className='monitorMsgBubble' id={msgData.msgInfo.msgId}>
//                <div className='avatarBox'>
//                    <img src={msgData.memInfo.iconPath} alt=''/>
//                </div>
//                <div className='msgInfoBox'>
//                     <span className='nickName' style = {{marginLeft:msgPicker_on? '10px':'0'}}>{msgData.memInfo.remarkName?msgData.memInfo.remarkName:msgData.memInfo.nickName}</span>
//                     <span className='date'>{msgTime}</span>
//                 </div>
//                <a className='microMsgBox' href={msgData.msgInfo.linkHref==''?'javascript:void(0)':msgData.msgInfo.linkHref} target='blank' style={{background:"#FFF"}}>
//                    <div className="microTitle">{msgData.msgInfo.linkTitle}</div>
//                    <div className="microContent">
//                        <div className="textBox">
//                            {msgData.msgInfo.linkDesc}
//                        </div>
//                        <div className="imgBox">
//                         <img src={msgData.msgInfo.content?msgData.msgInfo.content:process.env.PUBLIC_URL+"/images/icon/liziLogo.png"} alt=""/>
//                        </div>
//                    </div>
//                </a>
//            </div>
//         )

//         case 33: return (
//             judagebyId?
//             <div className='friendMsgBubble' id={msgData.msgInfo.msgId}>
//                 <div className='avatarBox' onClick={(e) => {
//                     getUserInfoHandle&&getUserInfoHandle(e,msgData.memInfo.id,msgData.memInfo.iconPath)
//                     {/* getMesgByMemebr&&getMesgByMemebr(msgData.memInfo.id)
//                     selectMemberId&&selectMemberId(msgData.memInfo.id)
//                     selectRoom&&selectRoom('MEMBER') */}
//                 }}>
//                     <img src={msgData.memInfo.iconPath} alt=''/>
//                 </div>
//                 <div className='msgInfoBox'>
//                     <span className='nickName'>{msgData.memInfo.remarkName?msgData.memInfo.remarkName:msgData.memInfo.nickName}</span>
//                     <span className='date'>{msgTime}</span>
//                     {roomType=='GROUP'?<span className="alt" onClick={()=>{
//                          altMember&&altMember(msgData.memInfo.id)
//                          putStoreByMember&&putStoreByMember(msgData.memInfo.id)}}>@Ta</span>:''}
//                 </div>
//                 <a className='fileMsgBox' href={msgData.msgInfo.linkHref==''?'javascript:void(0)':msgData.msgInfo.linkHref} target='blank'>
//                     <img src={process.env.PUBLIC_URL+"/images/icon/liziFile.png"} alt=""/>
//                     <p className='fileName'>知识卡片_170303.zip</p>
//                     <p className="fileSize">2.3MB</p>
//                 </a>
//             </div>:
//             <div className='monitorMsgBubble' id={msgData.msgInfo.msgId}>
//                 <div className='avatarBox'>
//                     <img src={msgData.memInfo.iconPath} alt=''/>
//                 </div>
//                 <div className='msgInfoBox'>
//                     <span className='nickName' style = {{marginLeft:msgPicker_on? '10px':'0'}}>{msgData.memInfo.remarkName?msgData.memInfo.remarkName:msgData.memInfo.nickName}</span>
//                     <span className='date'>{msgTime}</span>
//                 </div>
//                 <a className='fileMsgBox' href={msgData.msgInfo.linkHref==''?'javascript:void(0)':msgData.msgInfo.linkHref} target='blank'>
//                     <img src={process.env.PUBLIC_URL+"/images/icon/liziFile.png"} alt=""/>
//                     <p className='fileName'>知识卡片_170303.zip</p>
//                     <p className="fileSize">2.3MB</p>
//                 </a>
//            </div>
//         )

//         case 11: return (
//             msgData.msgInfo.content?
//             judagebyId?
//             <div className='friendMsgBubble' id={msgData.msgInfo.msgId}>
//                 <div className='avatarBox' onClick={(e) => {
//                     getUserInfoHandle&&getUserInfoHandle(e,msgData.memInfo.id,msgData.memInfo.iconPath)
//                     {/* getMesgByMemebr&&getMesgByMemebr(msgData.memInfo.id)
//                     selectMemberId&&selectMemberId(msgData.memInfo.id)
//                     selectRoom&&selectRoom('MEMBER') */}
//                 }}>
//                     <img src={msgData.memInfo.iconPath} alt=''/>
//                 </div>
//                 <div className='msgInfoBox'>
//                     <span className='nickName'>{msgData.memInfo.remarkName?msgData.memInfo.remarkName:msgData.memInfo.nickName}</span>
//                     <span className='date'>{msgTime}</span>
//                     {roomType=='GROUP'?<span className="alt" onClick={()=>{
//                         altMember&&altMember(msgData.memInfo.id)
//                         putStoreByMember&&putStoreByMember(msgData.memInfo.id)}}>@Ta</span>:''}
//                 </div>
//                 <div className='programMsgBox' >
//                     <div className="programTitle">
//                         <img src={$(msgData.msgInfo.content.replace(/^@\S*\s+/g,'')).find('weappiconurl').length>0?$(msgData.msgInfo.content.replace(/^@\S*\s+/g,'')).find('weappiconurl').html().split('[')[2].slice(0,-5):process.env.PUBLIC_URL+'/images/icon/wxapp_logo.png'} alt=""/>
//                         <span>{$(msgData.msgInfo.content.replace(/^@\S*\s+/g,'')).find('sourcedisplayname').length>0?$(msgData.msgInfo.content.replace(/^@\S*\s+/g,'')).find('sourcedisplayname').text():''}</span>
//                     </div>
//                     <div className="title">{
//                         cDataParse($(msgData.msgInfo.content.replace(/^@\S*\s+/g,'')).find('title').length>0?$(msgData.msgInfo.content.replace(/^@\S*\s+/g,'')).find('title').eq(0).text():'')
//                         }</div>
//                       <div className="programImg" style={{backgroundImage:`url(${msgData.msgInfo.linkHref?msgData.msgInfo.linkHref:process.env.PUBLIC_URL+'/images/icon/wxapp_img.png'})`}}></div>
//                     <div className="line"></div>
//                     <div className="programLogo">
//                         <div className="img icon-gm"/>
//                         小程序
//                     </div>
//                     <p className="tip">小程序只能在微信中打开</p>
//                 </div>
//             </div>:
//             <div className='monitorMsgBubble' id={msgData.msgInfo.msgId}>
//                <div className='avatarBox'>
//                    <img src={msgData.memInfo.iconPath} alt=''/>
//                </div>
//                <div className='msgInfoBox'>
//                     <span className='nickName' style = {{marginLeft:msgPicker_on? '10px':'0'}}>{msgData.memInfo.remarkName?msgData.memInfo.remarkName:msgData.memInfo.nickName}</span>
//                     <span className='date'>{msgTime}</span>
//                 </div>
//                <div className='programMsgBox' >
//                     <div className="programTitle">
//                       <img src={$(msgData.msgInfo.content.replace(/^@\S*\s+/g,'')).find('weappiconurl').length>0?$(msgData.msgInfo.content.replace(/^@\S*\s+/g,'')).find('weappiconurl').html().split('[')[2].slice(0,-5):process.env.PUBLIC_URL+'/images/icon/wxapp_logo.png'} alt=""/>
//                       <span>{$(msgData.msgInfo.content.replace(/^@\S*\s+/g,'')).find('sourcedisplayname').length>0?$(msgData.msgInfo.content.replace(/^@\S*\s+/g,'')).find('sourcedisplayname').text():''}</span>
//                     </div>
//                       <div className="title">{  cDataParse($(msgData.msgInfo.content.replace(/^@\S*\s+/g,'')).find('title').length>0?$(msgData.msgInfo.content.replace(/^@\S*\s+/g,'')).find('title').eq(0).text():'')}</div>
//                     <div className="programImg" style={{backgroundImage:`url(${msgData.msgInfo.linkHref?msgData.msgInfo.linkHref:process.env.PUBLIC_URL+'/images/icon/wxapp_img.png'})`}}></div>
//                     <div className="line"></div>
//                     <div className="programLogo">
//                         <div className="img icon-gm"></div>
//                         小程序
//                     </div>
//                     <p className="tip">小程序只能在微信中打开</p>
//                 </div>
//            </div>:''
//         )

//         case 10 :
//           // const _contentArray = msgData.msgInfo.content.split(' ')
//           // const _content = MsgTransform(msgData.msgInfo,msgData.keywordList)
//           return (
//             judagebyId ?
//               <div className='friendMsgBubble' id={msgData.msgInfo.msgId}>
//                   {msgPicker_on? <div className = {checked?'pickedBox iconBackground':'pickBox iconBackground'} onClick = {msgCheck}></div> : ''}
//                   <div className='avatarBox' onClick={(e) => {
//                       getUserInfoHandle&&getUserInfoHandle(e,msgData.memInfo.id,msgData.memInfo.iconPath)
//                       {/* getMesgByMemebr&&getMesgByMemebr(msgData.memInfo.id)
//                       selectMemberId&&selectMemberId(msgData.memInfo.id)
//                       selectRoom&&selectRoom('MEMBER') */}
//                   }}>
//                       <img src={msgData.memInfo.iconPath} alt=''/>
//                   </div>
//                   <div className='msgInfoBox'>
//                       <span className='nickName'>{msgData.memInfo.remarkName?msgData.memInfo.remarkName:msgData.memInfo.nickName}</span>
//                       <span className='date'>{msgTime}</span>
//                       {roomType=='GROUP'?<span className="alt" onClick={()=>{
//                            altMember&&altMember(msgData.memInfo.id)
//                            putStoreByMember&&putStoreByMember(msgData.memInfo.id)}}>@Ta</span>:''}
//                       <VideMsgBox
//                         src={msgData.msgInfo.content}
//                         action={action.videoView}
//                         />
//                   </div>
//               </div> :

//               <div className='monitorMsgBubble' id={msgData.msgInfo.msgId}>
//                 {msgPicker_on? <div className = {checked?'pickedBox iconBackground':'pickBox iconBackground'} onClick = {msgCheck}></div> : ''}
//                   <div className='avatarBox'>
//                       <img src={msgData.memInfo.iconPath} alt=''/>
//                   </div>
//                   <div className='msgInfoBox'>
//                       <span className='nickName'>{msgData.memInfo.remarkName?msgData.memInfo.remarkName:msgData.memInfo.nickName}</span>
//                       <span className='date'>{msgTime}</span>
//                       <VideMsgBox
//                         src={msgData.msgInfo.content}
//                         action={action.videoView}
//                         />
//                   </div>
//               </div>
//           )
//         default: 
//             return (
//                 judagebyId ?
//                 <div className='friendMsgBubble' id={msgData.msgInfo.msgId}>
//                     {msgPicker_on? <div className = {checked?'pickedBox iconBackground':'pickBox iconBackground'} onClick = {msgCheck}></div> : ''}
//                     <div className='avatarBox' onClick={(e) => {
//                         getUserInfoHandle&&getUserInfoHandle(e,msgData.memInfo.id,msgData.memInfo.iconPath)
//                     }}>
//                         <img src={msgData.memInfo.iconPath} alt=''/>
//                     </div>
//                     <div className='msgInfoBox'>
//                         <span className='nickName' style = {{marginLeft:msgPicker_on? '10px':'0'}}>{msgData.memInfo.remarkName?msgData.memInfo.remarkName:msgData.memInfo.nickName}</span>
//                         <span className='date'>{msgTime}</span>
//                         {roomType=='GROUP'
//                             ?<span className="alt" onClick={()=>{
//                                 altMember&&altMember(msgData.memInfo.id)
//                                 putStoreByMember&&putStoreByMember(msgData.memInfo.id)}}>@Ta</span>:''}
//                     </div>
//                     <div className='friendMsgBox'>
//                         <div className='msgBox' style={{color: "#B5BDC6"}}>
//                             <span className="icon-alert"></span>暂时不支持展示此类消息
//                         </div>
//                     </div>
//                 </div> :
//                 <div className='monitorMsgBubble' id={msgData.msgInfo.msgId}>
//                     {msgPicker_on? <div className = {checked?'pickedBox iconBackground':'pickBox iconBackground'} onClick = {msgCheck}></div> : ''}
//                     <div className='avatarBox'>
//                         <img src={msgData.memInfo.iconPath} alt=''/>
//                     </div>
//                     <div className='msgInfoBox'>
//                         <span className='nickName' style = {{marginLeft:msgPicker_on? '10px':'0'}}>{msgData.memInfo.remarkName?msgData.memInfo.remarkName:msgData.memInfo.nickName}</span>
//                         <span className='date'>{msgTime}</span>
//                     </div>
//                     <div className='monitorMsgBox'>
//                         <div className='msgBox' style={{color: "#B5BDC6"}}>
//                             <span className="icon-alert"></span>暂时不支持展示此类消息
//                         </div>
//                     </div>
//                 </div>
//             )
//     }
// }
export default MsgBubble
