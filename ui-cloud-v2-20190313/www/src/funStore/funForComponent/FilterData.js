import {QQFACE_TEXT} from '../../constants/MapData'
export const dataTransform = (data) => {
  var _reg = new RegExp('\\[(.+?)\\]',"g")
  var matchArray = data.match(_reg)//筛选qqemojj表情
  var str = data
   str = str.replace(/\n\n\n/gi,'')
   str = str.replace(/\n/gi,'<br>')
   str = str.replace(/↵/g,"<br>")//过滤换行标签
   str = str.replace(/_web/g,'')//过滤换行标签
   if(matchArray!=null){
            var index
            for (let i = 0;i < matchArray.length;i++){
                if(QQFACE_TEXT.qqEmoji_array.indexOf(matchArray[i])==-1&&QQFACE_TEXT.qqEmoji_array_chinese.indexOf(matchArray[i])!=-1){
                    index = (QQFACE_TEXT.qqEmoji_array_chinese.indexOf(matchArray[i]));
                }else if(QQFACE_TEXT.qqEmoji_array_chinese.indexOf(matchArray[i])==-1&&QQFACE_TEXT.qqEmoji_array.indexOf(matchArray[i])!=-1){
                    index = (QQFACE_TEXT.qqEmoji_array.indexOf(matchArray[i]));
                }
                if(index==undefined){
                    str = str .replace(matchArray[i],'&nbsp;'+matchArray[i]+'&nbsp;');
                }else {
                    str = str .replace(matchArray[i],'<img class="qqemoji  qqemoji'+index+'" name="'+index+'" src="'+process.env.PUBLIC_URL+'/images/icon/spacer.png" />');
                }
            }

        }

    return str

}

// y-m-d h:m
export const getFormatTime = (time) => {
  const result = new Date(time)
  let year = result.getFullYear().toString()
  let month = (result.getMonth()+1).toString()
  let day = result.getDate().toString()
  let hours = result.getHours().toString()
  let minutes = result.getMinutes().toString()
  let seconds = result.getSeconds().toString()
  month = month.length == 1 ? '0'+month : month
  day = day.length == 1 ? '0'+day : day
  hours = hours.length == 1 ? '0'+hours : hours
  minutes = minutes.length == 1 ? '0'+minutes : minutes
  seconds = seconds.length == 1 ? '0'+seconds : seconds
  return year+'-'+month+'-'+day+' '+hours+':'+minutes
}
