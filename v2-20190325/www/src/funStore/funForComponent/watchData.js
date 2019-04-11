// byteCounting for textArea and some inputs like that while texting
export const textCountRange = (str,maxN) => {
  let countf = str.replace(/[^\x00-\xff]/g,"oo").length/2;
  return {count:parseInt(countf),max:maxN}
//   maxN - countf > 0 ?
//   {count:parseInt(countf),max:maxN}
//   :{count:maxN,max:maxN}
}

// 获取图片大小
export const getImageSize = (file,callback) => {
    let reader=new FileReader()
    reader.onload=function (e) {
        let data=e.target.result//读取的结果
        let image=new Image()
        image.onload=() => {
            let width=image.width,
                height=image.height;
            callback(width,height)
        };
        image.src=data
    };
    reader.readAsDataURL(file);
}
