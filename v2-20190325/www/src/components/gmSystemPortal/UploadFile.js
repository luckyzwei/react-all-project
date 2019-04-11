import react from 'react'
import $ from 'jquery'
const  UploadFile = () => {


  const varifyBeforeLoad = () => {
    if(format.includes(finalName.toLowerCase())){
        if(size<5242880){
            var array = [];
            if(queueMsgService.selectedGroup.type ==3){
                var roomId = queueMsgService.selectedGroup.content ;
                array.push(roomId);
                queueMsgService.fileStreamUpload(array,$("#upload")[0].files[0],2);
            }else if(queueMsgService.selectedGroup.type ==0){
                $("#selectGroupList .groupItem").each(function (i) {
                    if($("#selectGroupList .groupItem").eq(i).css('display')!='none')
                        array.push($("#selectGroupList .groupItem").eq(i).attr('id'));
                })
                queueMsgService.fileStreamUpload(array,$("#upload")[0].files[0],2);
            }
            $("#upload").val('')
        }else {
            alert("文件大小超出限制!");
        }
    }
  }

  const uploadFile = () => {
    var formData = new FormData();
    var mid = dataModel.userInfo.main.id;
    formData.append('file',value);
    formData.append('RoomIDs',roomIDs);
    formData.append('type',type);
    formData.append('mID',mid);

    // alert(JSON.stringify({'file':value,'RoomIDs':roomIDs,'type':type,'mID':mid}));
    $.ajax({
        url: dataModel.url.sendMsg,
        type: 'POST',
        cache: false,
        data: formData,
        processData: false,
        contentType: false
    }).done(function(res) {

    }).fail(function(res) {

    })
  }
  return(
      <div className="toolBtn uploadBtn">
        <input id="upload" type="file" multiple="multiple" />
      </div>
  )
}
