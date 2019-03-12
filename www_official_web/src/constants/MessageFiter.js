dataFilter: function (data,type) {

     // var currentTime = new Date(data.CreateTime*1000).toLocaleTimeString('chinese',{hour12:false})
     var currentTime = data.CreateTime;
     var _reg = new RegExp('\\[(.+?)\\]',"g");
     var matchArray = data.Content.match(_reg);//筛选qqemojj表情
     var str = data.Content;
     var contentItem;
     var imgType = false;
     var message_content = '';
     str = str.replace(/\n\n\n/gi,'');
     // str = str.replace("<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>",'');//解决word copy产生空格问题
     // str = str.replace("<br/><br/><br/><br/><br/><br/><br/><br/>",'');//解决note copy产生空格问题

     // window.debugger(str);
     str = str.replace(/↵/g,"<br>");//过滤换行标签
     str = str.replace(/_web/g,'');//过滤换行标签
     // str = str.replace("<br/><br/><br/>",'');
     // alert(kewords)
     //过滤关键字
     if(data.MsgType !=47&&data.MsgType !=3){
     for(var k = 0;k <kewords.length;k++){
         str = str.replace(kewords[k],"<b style='color: #f36565'>"+kewords[k]+"</b>")
     }
     }
     // alert(data.MsgType);
     //过滤type类型
     if(data.MsgType==47){
         str = '<img class="type47" src="'+str+'" style="display:none" onload="addEventlisten.imgLoading($(this))">'
         imgType = true;
     }
     if(data.MsgType==49){
         str = '<a href='+str+' target="_Blank">'+str+'</a>'
     }
     if(data.MsgType==3){
         str = '<img class="type3" src="http://nfs.gemii.cc/'+str+'" onerror="addEventlisten.detailFunction.reSetImgUrl(this,this.src,15)" onclick="addEventlisten.changeImgSize($(this))" style="display:none" onload="addEventlisten.imgLoading($(this))">'
         imgType = true;
     }
     if(data.MsgType==34){

         str = '<audio src="http://nfs.gemii.cc/'+str+'" controls="controls">' +
             'Your browser does not support the audio element'+
             '</audio>'
     }

     // this.msgTypeFilter(str)
     //如果有qqemojj表情则开始过滤
     if(matchArray!=null){
         var index;
         for (var i = 0;i < matchArray.length;i++){
             if(qqEmoji_array.indexOf(matchArray[i])==-1&&qqEmoji_array_chinese.indexOf(matchArray[i])!=-1){
                 index = (qqEmoji_array_chinese.indexOf(matchArray[i]));
             }else if(qqEmoji_array_chinese.indexOf(matchArray[i])==-1&&qqEmoji_array.indexOf(matchArray[i])!=-1){
                 index = (qqEmoji_array.indexOf(matchArray[i]));
             }
             window.debugger("index"+index)
             if(index==undefined){
                 str = str .replace(matchArray[i],'&nbsp;'+matchArray[i]+'&nbsp;');
             }else {
                 str = str .replace(matchArray[i],'<img class="qqemoji'+' '+"qqemoji"+index+'"  src="images/spacer.png">');
             }
         }
     }

     if(data.MsgType==10002){

         if(type=='front'){
             $(".content_wrap").prepend('<div class="messageItem" id="'+data.MsgId+'">' +
                 ' <div class="message_head" id="'+currentTime+'" style="display: none">' +
                 '<div class="enterGroup" id="'+data.RoomID+'" style="display: none"></div>' +
                 '</div>'+
                 '<div class="drawBack">'+data.UserNickName+'&nbsp;&nbsp;&nbsp;撤回了一条消息</div>' +
                 '</div>');
         }else {
             $(".content_wrap").append('<div class="messageItem" id="'+data.MsgId+'">' +
                 ' <div class="message_head" id="'+currentTime+'" style="display: none">' +
                 '<div class="enterGroup" id="'+data.RoomID+'" style="display: none"></div>' +
                 '</div>'+
                 '<div class="drawBack">'+data.UserNickName+'&nbsp;&nbsp;&nbsp;撤回了一条消息</div>' +
                 '</div>');
         }
     }else if(data.MsgType==10000){
         if(type=='front'){
             $(".content_wrap").prepend('<div class="messageItem" id="'+data.MsgId+'">' +
                 ' <div class="message_head" id="'+currentTime+'" style="display: none">' +
                 '<div class="enterGroup" id="'+data.RoomID+'" style="display: none"></div>' +
                 '</div>'+
                 '<div class="drawBack">'+data.Content+'</div>' +
                 '</div>');
         }else {
             $(".content_wrap").append('<div class="messageItem" id="'+data.MsgId+'">' +
                 ' <div class="message_head" id="'+currentTime+'" style="display: none">' +
                 '<div class="enterGroup" id="'+data.RoomID+'" style="display: none"></div>' +
                 '</div>'+
                 '<div class="drawBack">'+data.Content+'</div>' +
                 '</div>');
         }
     }else {

         if(type=='front'){
             //判断是否点击'点击入群'
             var clickIcon = '';
             window.debugger(data.click);
             if(data.click==1){
                 clickIcon = '<div class="enterGroup" style="visibility: '+dataModel.visibleType+'; color: rgba(0,0,0,0.4)" id="'+data.RoomID+'"' +
                     'onclick="addEventlisten.detailFunction.enterGroupByroomID($(this))">点击入群</div>'
             }else {
                 clickIcon = '<div class="enterGroup" style="visibility: '+dataModel.visibleType+';" id="'+data.RoomID+'"' +
                     'onclick="addEventlisten.detailFunction.enterGroupByroomID($(this))">点击入群</div>'
             }

             if(imgType){
                 message_content = '<div class="message_content"><div class="m-load2" style="margin:0 auto;"><div class="line"><div></div><div></div><div></div><div></div><div></div><div></div></div><div class="circlebg"></div></div>';
             }else {

                 if(dataModel.userType=='1'){
                     message_content = '<div class="message_content" style="cursor: pointer" onclick="addEventlisten.detailFunction.questionOrAnswer($(this))">';
                 }else {
                     message_content = '<div class="message_content">';
                 }
                 // message_content = '<div class="message_content" onclick="addEventlisten.detailFunction.questionOrAnswer($(this))">'; for inner
             };
             //开始向dom添加元素加工
             $(".content_wrap").prepend('<div class="messageItem" id="'+data.MsgId+'">'
                 +'<div class="message_inner">'
                 +'<img class="mes_profile" src="http://nfs.gemii.cc/users/'+data.MemberID +'.jpg" alt="">'
                 +' <div class="contentBox">'
                 +' <div class="message_head" id="'+currentTime+'">'
                 +'<div class="memberInfo">['+addEventlisten.detailFunction.ToGB2312(data.UserNickName)+']&nbsp;'+currentTime+'</div>'
                 +clickIcon
                 +'</div>'
                 +message_content+str
                 +'</div>'
                 +'</div>'
                 +'</div>'
                 +'</div>')
         }else {
             //判断是否点击'点击入群'
             var clickIcon = '';

             if(data.click==1){
                 clickIcon = '<div class="enterGroup" style="visibility: '+dataModel.visibleType+'; color: rgba(0,0,0,0.4)" id="'+data.RoomID+'"' +
                     'onclick="addEventlisten.detailFunction.enterGroupByroomID($(this))">点击入群</div>'
             }else {
                 clickIcon = '<div class="enterGroup" style="visibility: '+dataModel.visibleType+';" id="'+data.RoomID+'"' +
                     'onclick="addEventlisten.detailFunction.enterGroupByroomID($(this))">点击入群</div>'
             }

             if(imgType){
                 message_content = '<div class="message_content"><div class="m-load2" style="margin:0 auto;"><div class="line"><div></div><div></div><div></div><div></div><div></div><div></div></div><div class="circlebg"></div></div>';
             }else {
                 if(dataModel.userType=='1'){
                     message_content = '<div class="message_content" style="cursor: pointer" onclick="addEventlisten.detailFunction.questionOrAnswer($(this))">';
                 }else {
                     message_content = '<div class="message_content">';
                 }
                 // message_content = '<div class="message_content" onclick="addEventlisten.detailFunction.questionOrAnswer($(this))">'; for inner
             };
             //开始向dom添加元素加工
             $(".content_wrap").append('<div class="messageItem" id="'+data.MsgId+'">'
                 +'<div class="message_inner">'
                 +'<img class="mes_profile" src="http://nfs.gemii.cc/users/'+data.MemberID +'.jpg" alt="">'
                 +' <div class="contentBox">'
                 +' <div class="message_head" id="'+currentTime+'">'
                 +'<div class="memberInfo">['+addEventlisten.detailFunction.ToGB2312(data.UserNickName)+']&nbsp;'+currentTime+'</div>'
                 +clickIcon
                 +'</div>'
                 +message_content+str
                 +'</div>'
                 +'</div>'
                 +'</div>'
                 +'</div>')
         }

     }

     //对指定元素赋予表情
     if(matchArray!=null){
         for (var i = 0;i < matchArray.length;i++){
             var index;
             if(qqEmoji_array.indexOf(matchArray[i])==-1||qqEmoji_array.indexOf(matchArray[i])==undefined){
                 index = (qqEmoji_array_chinese.indexOf(matchArray[i]));
             }else if(qqEmoji_array_chinese.indexOf(matchArray[i])==-1||qqEmoji_array_chinese.indexOf(matchArray[i])==undefined){
                 index = (qqEmoji_array.indexOf(matchArray[i]));
             }

             if(index<=14&&index>=0){
                 $(".qqemoji"+index).css("backgroundPosition",-(3+index*25)+'px'+' '+-2+'px');
             }
             else if(index<=29&&index>=15){
                 $(".qqemoji"+index).css("backgroundPosition",-(1.5+(index-15)*25)+'px'+' '+-27+'px');
             }
             else if(index<=44&&index>=30){
                 $(".qqemoji"+index).css("backgroundPosition",-(3+(index-30)*25)+'px'+' '+-52+'px');
             }
             else if(index<=59&&index>=45){
                 $(".qqemoji"+index).css("backgroundPosition",-(3+(index-45)*25)+'px'+' '+-77+'px');
             }
             else if(index<=74&&index>=60){
                 $(".qqemoji"+index).css("backgroundPosition",-(3+(index-60)*25)+'px'+' '+-102+'px');
             }
             else if(index<=89&&index>=75){
                 $(".qqemoji"+index).css("backgroundPosition",-(3+(index-75)*25)+'px'+' '+-127+'px');
             }
             else{
                 $(".qqemoji"+index).css("backgroundPosition",-(3+(index-90)*25)+'px'+' '+-152+'px');
             }
         }
     }

 }
