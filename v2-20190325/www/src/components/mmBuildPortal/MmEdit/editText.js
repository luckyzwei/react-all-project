import React from 'react'

import UploadFile from '../../shareComponent/UploadFile'
import { sendEvent } from '../../../funStore/CommonFun'

import TextContent from './textContent'

export const EditText = ({ paramsname, paramsTxt, setparamshandler, placeholder, editStatus }) => {
    return <TextContent
        paramsname={paramsname}
        content={paramsTxt}
        onChange={(e) => {
            setparamshandler(paramsname, editStatus, e)
        }}
    />
}
export const EditImg = ({ paramsname, paramsValue, setparamshandler, editStatus, value, delImg, paramsImg }) => {
    return (
        <div className="EditImg">
            {
                paramsImg.status ?
                paramsImg.url.map((v,i) => {
                    return (
                        <div className="imgPreview">
                            <div className="img" style={{backgroundImage:`url(${v.url?v.url:v})`}}></div>
                            <div className="delBtn" onClick={()=>{delImg(i)}}></div>
                        </div>
                    )
                })
                :''
            }
            {
                !paramsImg.status || paramsImg.url.length < 9 ?
                <UploadFile
                    onChange={(res) => {
                        // console.log(paramsname,'paramsname')
                        // console.log(editStatus,'editStatus')
                        // console.log(res,'res')
                        setparamshandler(paramsname, editStatus, res)
                    }}
                    onDelete={(res) => {
                        setparamshandler(paramsname, editStatus, {})
                    }}
                    limitSize={4194304}
                    propsStyle={{ width: "142px", height: '142px', background: '#F7F8F9', borderRadius: '2px', border: "none" }}
                    imgUrl={''}
                    clear={true}
                    text={'上传图片'}
                />
                :''
            }
            {/* <div className='EditImg-text'>图片不超过400KB</div> */}
        </div>
    )
}
export const EditLink = ({ paramsname, setparamshandler, value, editStatus, paramsLink}) => {
    return (
        <div className="EditLink">
            <div className="EditLink-title EditLink-row">
                <input type='text' maxLength='100' value={paramsLink.title} placeholder="请输入链接标题" onChange={(e) => {
                    setparamshandler('paramsLinkTitle', editStatus, e.target.value)
                }} />
            </div>
            <div className="EditLink-content EditLink-row">
                <input type='text' value={paramsLink.url} placeholder="http://" onChange={(e) => {
                    setparamshandler('paramsLinklink', editStatus, e.target.value)
                }} />
            </div>
            <div className="EditLink-img">
                <UploadFile
                    onChange={(res) => {
                        setparamshandler('paramslinkImg', editStatus, res)
                    }}
                    onDelete={(res) => {
                        setparamshandler('paramslinkImg', editStatus, {})
                    }}
                    limitSize={4194304}
                    propsStyle={{ width: "142px", height: '142px', background: '#F7F8F9', borderRadius: '4px', border: "none" }}
                    imgUrl={paramsLink.img ? paramsLink.img.url : ''}
                    text={'上传图片'}
                />
                <div className='EditLink-text'>图片不超过1MB</div>
            </div>
        </div>
    )
}
export const EditSpace = () => {
    return (
        <div className="EditSpace">
            点击左上角“+”,开始编辑你的朋友圈内容吧～
        </div>
    )
}