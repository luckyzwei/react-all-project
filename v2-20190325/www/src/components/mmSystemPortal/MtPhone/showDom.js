import React from 'react';
import {QQFACE_TEXT} from '../../../constants/MapData'
import * as wd from '../../../funStore/funForComponent/watchData'


const dataTransform = (data) => {
    var _reg = new RegExp('\\[(.+?)\\]', "g")
    var matchArray = data.match(_reg)//筛选qqemojj表情
    var str = data
    str = str.replace(/\n\n\n/gi, '')
    str = str.replace(/\n/gi, '<br>')
    str = str.replace(/↵/g, "<br>")//过滤换行标签
    str = str.replace(/_web/g, '')//过滤换行标签
    if (matchArray != null) {
        var index
        for (let i = 0; i < matchArray.length; i++) {
            if (QQFACE_TEXT.qqEmoji_array.indexOf(matchArray[i]) == -1 && QQFACE_TEXT.qqEmoji_array_chinese.indexOf(matchArray[i]) != -1) {
                index = (QQFACE_TEXT.qqEmoji_array_chinese.indexOf(matchArray[i]));
            } else if (QQFACE_TEXT.qqEmoji_array_chinese.indexOf(matchArray[i]) == -1 && QQFACE_TEXT.qqEmoji_array.indexOf(matchArray[i]) != -1) {
                index = (QQFACE_TEXT.qqEmoji_array.indexOf(matchArray[i]));
            }
            if (index == undefined) {
                str = str.replace(matchArray[i], '&nbsp;' + matchArray[i] + '&nbsp;');
            } else {
                str = str.replace(matchArray[i], '<img class="qqemoji  qqemoji' + index + '" name="' + index + '" src="'+process.env.PUBLIC_URL+'/images/icon/spacer.png" />');
            }
        }
    }
    return str
}

export const TextDom = ({item}) => {
    return (
        <div className='Dom-item-content'>
            <span dangerouslySetInnerHTML={{__html: dataTransform(item)}}></span>
        </div>
    )
}

export const ImgDom = ({item, ImgH}) => {
    return (
        <div className="Dom-item ImgDom">
            <span className='Dom-item-icon'></span>
            <img src={item.files[0].filePath?item.files.find(item => item.fileType === 'image').filePath: process.env.PUBLIC_URL+'/images/icon/default.png'} style={{height: ImgH}}
                 className='Dom-item-ImgDom'/>
        </div>
    )
}

export const LinkDom = ({item}) => {
    return (
        <div className="Dom-item LinkDom">
            <span className='Dom-item-icon'></span>
            <div className='Dom-item-LinkDom'>
                <div className="Dom-item-content-trg"></div>
                <div className="Dom-item-LinkDom-title">{item.title}</div>
                <div className="Dom-item-LinkDom-box">
                    <span className="Dom-item-LinkDom-content">{item.content}</span>
                    <img src={item.files[0].filePath?item.files.find(item => item.fileType === 'image').filePath: process.env.PUBLIC_URL+'/images/icon/default.png'}
                         className="Dom-item-LinkDom-img"/>
                </div>
            </div>
        </div>
    )
}