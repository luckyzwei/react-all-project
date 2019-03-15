import React, { Component } from 'react'
import $ from 'jquery'
import {QQFACE_TEXT} from '../../constants/MapData'
import {tongji} from '../../funStore/tongji'
 function cursorMoveEnd(obj){
           obj.focus();
           let len = obj.innerHTML.length;
           if (document.selection) {
               var sel = document.selection.createRange();
               sel.moveStart('character',len);
               sel.collapse();
               sel.select();
           }
           else{                                                 /* IE11 特殊处理 */
               var sel = window.getSelection();
               var range = document.createRange();
               range.selectNodeContents(obj);
               range.collapse(false);
               sel.removeAllRanges();
               sel.addRange(range);
           }
}
export default class FaceForQQ extends Component {
  constructor(props){
    super(props)
  }
  componentDidMount(){
    $('.faceBox').get(0).addEventListener('click',function(e){
      e.preventDefault();
      e.stopPropagation();
      e.cancelBubble = true;
    })
    $('.emojiBtn').get(0).addEventListener('click',function(e){
      e.preventDefault();
      e.stopPropagation();
      e.cancelBubble = true;
      tongji('Lzc_QunXiaoXi_BiaoQing')
      const obj = $("#msg_context")[0];
      cursorMoveEnd(obj);
      $('.faceBox').show()
      setTimeout(function(){
         $('.faceBox').css({marginTop:"0px",opacity:1},300);
      },20)
      $('.gm-box-groupSend').css({marginBottom:"-50px",opacity:0},300);
      setTimeout(function(){
        $('.gm-box-groupSend').hide()
      },280)
      $('.gm-box-altMember').css({marginBottom:"-50px",opacity:0},300);
      setTimeout(function(){
        $('.gm-box-altMember').hide()
      },280)
    })
    $(".qq_face .faceStle").each(function (i) {
            $(".qq_face>.faceStle").eq(i).get(0).addEventListener("click",function (e) {
                e.preventDefault();
                $("#msg_context").focus();
                document.execCommand("insertHtml",false,'<img class="qqemoji'+' '+"qqemoji"+i+'" text="'+QQFACE_TEXT.qqEmoji_array[i]+'" src="'+process.env.PUBLIC_URL+'/images/icon/spacer.png">');
            })

    })
  }
  render(){
    return (
      <div className='animation gm-icon'>
    <div className="toolBtn emojiBtn icon-gm" ref = 'butt' >
        <div className='faceBox' ref = 'faceBox'>
          <div className="exp_cont">
            <div className="qq_face">
            <a className="faceStle qqface0"><img src="#" style={{opacity: '0',width: '28px',height: '28px'}} /></a>
             <a className="faceStle qqface1"><img src="#" style={{opacity: '0',width: '28px',height: '28px'}} /></a>
             <a className="faceStle qqface2"><img src="#" style={{opacity: '0',width: '28px',height: '28px'}} /></a>
             <a className="faceStle qqface3"><img src="#" style={{opacity: '0',width: '28px',height: '28px'}} /></a>
             <a className="faceStle qqface4"><img src="#" style={{opacity: '0',width: '28px',height: '28px'}} /></a>
             <a className="faceStle qqface5"><img src="#" style={{opacity: '0',width: '28px',height: '28px'}} /></a>
             <a className="faceStle qqface6"><img src="#" style={{opacity: '0',width: '28px',height: '28px'}} /></a>
             <a className="faceStle qqface7"><img src="#" style={{opacity: '0',width: '28px',height: '28px'}} /></a>
             <a className="faceStle qqface8"><img src="#" style={{opacity: '0',width: '28px',height: '28px'}} /></a>
             <a className="faceStle qqface9"><img src="#" style={{opacity: '0',width: '28px',height: '28px'}} /></a>
             <a className="faceStle qqface10"><img src="#" style={{opacity: '0',width: '28px',height: '28px'}} /></a>
             <a className="faceStle qqface11"><img src="#" style={{opacity: '0',width: '28px',height: '28px'}} /></a>
             <a className="faceStle qqface12"><img src="#" style={{opacity: '0',width: '28px',height: '28px'}} /></a>
             <a className="faceStle qqface13"><img src="#" style={{opacity: '0',width: '28px',height: '28px'}} /></a>
             <a className="faceStle qqface14"><img src="#" style={{opacity: '0',width: '28px',height: '28px'}} /></a>
             <a className="faceStle qqface15"><img src="#" style={{opacity: '0',width: '28px',height: '28px'}} /></a>
             <a className="faceStle qqface16"><img src="#" style={{opacity: '0',width: '28px',height: '28px'}} /></a>
             <a className="faceStle qqface17"><img src="#" style={{opacity: '0',width: '28px',height: '28px'}} /></a>
             <a className="faceStle qqface18"><img src="#" style={{opacity: '0',width: '28px',height: '28px'}} /></a>
             <a className="faceStle qqface19"><img src="#" style={{opacity: '0',width: '28px',height: '28px'}} /></a>
             <a className="faceStle qqface20"><img src="#" style={{opacity: '0',width: '28px',height: '28px'}} /></a>
             <a className="faceStle qqface21"><img src="#" style={{opacity: '0',width: '28px',height: '28px'}} /></a>
             <a className="faceStle qqface22"><img src="#" style={{opacity: '0',width: '28px',height: '28px'}} /></a>
             <a className="faceStle qqface23"><img src="#" style={{opacity: '0',width: '28px',height: '28px'}} /></a>
             <a className="faceStle qqface24"><img src="#" style={{opacity: '0',width: '28px',height: '28px'}} /></a>
             <a className="faceStle qqface25"><img src="#" style={{opacity: '0',width: '28px',height: '28px'}} /></a>
             <a className="faceStle qqface26"><img src="#" style={{opacity: '0',width: '28px',height: '28px'}} /></a>
             <a className="faceStle qqface27"><img src="#" style={{opacity: '0',width: '28px',height: '28px'}} /></a>
             <a className="faceStle qqface28"><img src="#" style={{opacity: '0',width: '28px',height: '28px'}} /></a>
             <a className="faceStle qqface29"><img src="#" style={{opacity: '0',width: '28px',height: '28px'}} /></a>
             <a className="faceStle qqface30"><img src="#" style={{opacity: '0',width: '28px',height: '28px'}} /></a>
             <a className="faceStle qqface31"><img src="#" style={{opacity: '0',width: '28px',height: '28px'}} /></a>
             <a className="faceStle qqface32"><img src="#" style={{opacity: '0',width: '28px',height: '28px'}} /></a>
             <a className="faceStle qqface33"><img src="#" style={{opacity: '0',width: '28px',height: '28px'}} /></a>
             <a className="faceStle qqface34"><img src="#" style={{opacity: '0',width: '28px',height: '28px'}} /></a>
             <a className="faceStle qqface35"><img src="#" style={{opacity: '0',width: '28px',height: '28px'}} /></a>
             <a className="faceStle qqface36"><img src="#" style={{opacity: '0',width: '28px',height: '28px'}} /></a>
             <a className="faceStle qqface37"><img src="#" style={{opacity: '0',width: '28px',height: '28px'}} /></a>
             <a className="faceStle qqface38"><img src="#" style={{opacity: '0',width: '28px',height: '28px'}} /></a>
             <a className="faceStle qqface39"><img src="#" style={{opacity: '0',width: '28px',height: '28px'}} /></a>
             <a className="faceStle qqface40"><img src="#" style={{opacity: '0',width: '28px',height: '28px'}} /></a>
             <a className="faceStle qqface41"><img src="#" style={{opacity: '0',width: '28px',height: '28px'}} /></a>
             <a className="faceStle qqface42"><img src="#" style={{opacity: '0',width: '28px',height: '28px'}} /></a>
             <a className="faceStle qqface43"><img src="#" style={{opacity: '0',width: '28px',height: '28px'}} /></a>
             <a className="faceStle qqface44"><img src="#" style={{opacity: '0',width: '28px',height: '28px'}} /></a>
             <a className="faceStle qqface45"><img src="#" style={{opacity: '0',width: '28px',height: '28px'}} /></a>
             <a className="faceStle qqface46"><img src="#" style={{opacity: '0',width: '28px',height: '28px'}} /></a>
             <a className="faceStle qqface47"><img src="#" style={{opacity: '0',width: '28px',height: '28px'}} /></a>
             <a className="faceStle qqface48"><img src="#" style={{opacity: '0',width: '28px',height: '28px'}} /></a>
             <a className="faceStle qqface49"><img src="#" style={{opacity: '0',width: '28px',height: '28px'}} /></a>
             <a className="faceStle qqface50"><img src="#" style={{opacity: '0',width: '28px',height: '28px'}} /></a>
             <a className="faceStle qqface51"><img src="#" style={{opacity: '0',width: '28px',height: '28px'}} /></a>
             <a className="faceStle qqface52"><img src="#" style={{opacity: '0',width: '28px',height: '28px'}} /></a>
             <a className="faceStle qqface53"><img src="#" style={{opacity: '0',width: '28px',height: '28px'}} /></a>
             <a className="faceStle qqface54"><img src="#" style={{opacity: '0',width: '28px',height: '28px'}} /></a>
             <a className="faceStle qqface55"><img src="#" style={{opacity: '0',width: '28px',height: '28px'}} /></a>
             <a className="faceStle qqface56"><img src="#" style={{opacity: '0',width: '28px',height: '28px'}} /></a>
             <a className="faceStle qqface57"><img src="#" style={{opacity: '0',width: '28px',height: '28px'}} /></a>
             <a className="faceStle qqface58"><img src="#" style={{opacity: '0',width: '28px',height: '28px'}} /></a>
             <a className="faceStle qqface59"><img src="#" style={{opacity: '0',width: '28px',height: '28px'}} /></a>
             <a className="faceStle qqface60"><img src="#" style={{opacity: '0',width: '28px',height: '28px'}} /></a>
             <a className="faceStle qqface61"><img src="#" style={{opacity: '0',width: '28px',height: '28px'}} /></a>
             <a className="faceStle qqface62"><img src="#" style={{opacity: '0',width: '28px',height: '28px'}} /></a>
             <a className="faceStle qqface63"><img src="#" style={{opacity: '0',width: '28px',height: '28px'}} /></a>
             <a className="faceStle qqface64"><img src="#" style={{opacity: '0',width: '28px',height: '28px'}} /></a>
             <a className="faceStle qqface65"><img src="#" style={{opacity: '0',width: '28px',height: '28px'}} /></a>
             <a className="faceStle qqface66"><img src="#" style={{opacity: '0',width: '28px',height: '28px'}} /></a>
             <a className="faceStle qqface67"><img src="#" style={{opacity: '0',width: '28px',height: '28px'}} /></a>
             <a className="faceStle qqface68"><img src="#" style={{opacity: '0',width: '28px',height: '28px'}} /></a>
             <a className="faceStle qqface69"><img src="#" style={{opacity: '0',width: '28px',height: '28px'}} /></a>
             <a className="faceStle qqface70"><img src="#" style={{opacity: '0',width: '28px',height: '28px'}} /></a>
             <a className="faceStle qqface71"><img src="#" style={{opacity: '0',width: '28px',height: '28px'}} /></a>
             <a className="faceStle qqface72"><img src="#" style={{opacity: '0',width: '28px',height: '28px'}} /></a>
             <a className="faceStle qqface73"><img src="#" style={{opacity: '0',width: '28px',height: '28px'}} /></a>
             <a className="faceStle qqface74"><img src="#" style={{opacity: '0',width: '28px',height: '28px'}} /></a>
             <a className="faceStle qqface75"><img src="#" style={{opacity: '0',width: '28px',height: '28px'}} /></a>
             <a className="faceStle qqface76"><img src="#" style={{opacity: '0',width: '28px',height: '28px'}} /></a>
             <a className="faceStle qqface77"><img src="#" style={{opacity: '0',width: '28px',height: '28px'}} /></a>
             <a className="faceStle qqface78"><img src="#" style={{opacity: '0',width: '28px',height: '28px'}} /></a>
             <a className="faceStle qqface79"><img src="#" style={{opacity: '0',width: '28px',height: '28px'}} /></a>
             <a className="faceStle qqface80"><img src="#" style={{opacity: '0',width: '28px',height: '28px'}} /></a>
             <a className="faceStle qqface81"><img src="#" style={{opacity: '0',width: '28px',height: '28px'}} /></a>
             <a className="faceStle qqface82"><img src="#" style={{opacity: '0',width: '28px',height: '28px'}} /></a>
             <a className="faceStle qqface83"><img src="#" style={{opacity: '0',width: '28px',height: '28px'}} /></a>
             <a className="faceStle qqface84"><img src="#" style={{opacity: '0',width: '28px',height: '28px'}} /></a>
             <a className="faceStle qqface85"><img src="#" style={{opacity: '0',width: '28px',height: '28px'}} /></a>
             <a className="faceStle qqface86"><img src="#" style={{opacity: '0',width: '28px',height: '28px'}} /></a>
             <a className="faceStle qqface87"><img src="#" style={{opacity: '0',width: '28px',height: '28px'}} /></a>
             <a className="faceStle qqface88"><img src="#" style={{opacity: '0',width: '28px',height: '28px'}} /></a>
             <a className="faceStle qqface89"><img src="#" style={{opacity: '0',width: '28px',height: '28px'}} /></a>
             <a className="faceStle qqface90"><img src="#" style={{opacity: '0',width: '28px',height: '28px'}} /></a>
             <a className="faceStle qqface91"><img src="#" style={{opacity: '0',width: '28px',height: '28px'}} /></a>
             <a className="faceStle qqface92"><img src="#" style={{opacity: '0',width: '28px',height: '28px'}} /></a>
             <a className="faceStle qqface93"><img src="#" style={{opacity: '0',width: '28px',height: '28px'}} /></a>
             <a className="faceStle qqface94"><img src="#" style={{opacity: '0',width: '28px',height: '28px'}} /></a>
             <a className="faceStle qqface95"><img src="#" style={{opacity: '0',width: '28px',height: '28px'}} /></a>
             <a className="faceStle qqface96"><img src="#" style={{opacity: '0',width: '28px',height: '28px'}} /></a>
             <a className="faceStle qqface97"><img src="#" style={{opacity: '0',width: '28px',height: '28px'}} /></a>
             <a className="faceStle qqface98"><img src="#" style={{opacity: '0',width: '28px',height: '28px'}} /></a>
             <a className="faceStle qqface99"><img src="#" style={{opacity: '0',width: '28px',height: '28px'}} /></a>
             <a className="faceStle qqface100"><img src="#" style={{opacity: '0',width: '28px',height: '28px'}} /></a>
             <a className="faceStle qqface101"><img src="#" style={{opacity: '0',width: '28px',height: '28px'}} /></a>
             <a className="faceStle qqface102"><img src="#" style={{opacity: '0',width: '28px',height: '28px'}} /></a>
             <a className="faceStle qqface103"><img src="#" style={{opacity: '0',width: '28px',height: '28px'}} /></a>
             <a className="faceStle qqface104"><img src="#" style={{opacity: '0',width: '28px',height: '28px'}} /></a>
            </div>
          </div>
        </div>
        <div className="icon-text">表情</div>
      </div>
      </div>
    )
  }
}
