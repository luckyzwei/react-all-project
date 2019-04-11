import React,{Component} from 'react'

import UploadFile from '../../shareComponent/UploadFile'
import { sendEvent } from '../../../funStore/CommonFun'

import TextContent from './textContent'

export class Authorization extends Component {
    constructor() {
        super();
        this.state = {
            flag: false
        }
    }
        
    changeFlag = () => {
        this.setState({flag: !this.state.flag})
    }

    render () {
        let {flag} = this.state
        return (
            <div className="authorization">
                <div onClick={this.changeFlag} className={flag?'control-box active':'control-box'}><em></em><p>{flag?'开':'关'}</p></div>
                <p>用户授权</p>
            </div>
        )
    }
}
// export const EditText = ({ paramsname, setparamshandler, value, placeholder, editStatus }) => {
//     return (
//         <div className="EditText">
//             <textarea
//                 maxLength='300'
//                 autoFocus
//                 className='EditText-textarea'
//                 placeholder={placeholder}
//                 value={value.content}
//                 onChange={setparamshandler.bind(this, paramsname, editStatus)}
//             ></textarea>
//             <div className="EditText-num-icon">
//                 <div className="EditText-icon"></div>
//                 <div className="EditText-num">{value.content ? value.content.length : 0}/300</div>
//             </div>
//         </div>
//     )
// }

export const EditText = ({ paramsname, setparamshandler, value, placeholder, editStatus }) => {
    return <TextContent
        paramsname={paramsname}
        content={value.content}
        onChange={(e) => {
            setparamshandler(paramsname, editStatus, e)
        }}
    />
}
export const EditImg = ({ paramsname, setparamshandler, editStatus, value }) => {
    return (
        <div className="EditImg">
            {/* <Authorization/> */}
            <UploadFile
                onChange={(res) => {
                    setparamshandler(paramsname, editStatus, res)
                }}
                onDelete={(res) => {
                    setparamshandler(paramsname, editStatus, {})
                }}
                limitSize={4194304}
                limitFormat = {["jpg","png","jpeg","gif"]}
                propsStyle={{ width: "206px", height: '206px', background: '#F7F8F9', borderRadius: '4px', border: "none" }}
                imgUrl={value.files ? value.files.find(item => item.fileType === 'image').filePath : ''}
                text={'上传图片'}
            />
            <div className='EditImg-text'>图片不超过1MB</div>
        </div>
    )
}
export const EditPublic = ({ paramsname, setparamshandler, editStatus, value }) => {
    return (
        <div className="EditPublic">
            {/* <Authorization/> */}
            <div className="item public-box">
                <div className="item-content-box">
                    <img src={value.uri} className="item-icon"/>
                    <p>{value.title}</p>
                </div>
                <p className="btm-txt">公众号名片</p>
            </div>
        </div>
    )
}
export const EditVoice = ({ paramsname, setparamshandler, editStatus, value }) => {
    return (
        <div className="EditVoice">
            {/* <Authorization/> */}
            <div className="item voice-box">
                <div className="item-content-box">
                    <em></em>{value.files[0].type}"
                </div>
            </div>
        </div>
    )
}
export const EditLink = ({ paramsname, setparamshandler, value, editStatus }) => {
    return (
        <div className="EditLink">
            {/* <Authorization/> */}
            <div className="EditLink-title EditLink-row">
                <input type='text' maxLength='30' value={value.title} placeholder="请输入链接标题" onChange={(e) => {
                    setparamshandler('paramsLinkTitle', editStatus, e.target.value)
                }} />
            </div>
            <div className="EditLink-content EditLink-row">
                <input type='text' maxLength='100' value={value.content} placeholder="请输入描述文字" onChange={(e) => {
                    setparamshandler('paramsLinkContent', editStatus, e.target.value)
                }} />
            </div>
            <div className="EditLink-content EditLink-row">
                <input type='text' value={value.uri} placeholder="http://" onChange={(e) => {
                    setparamshandler('paramsLinklink', editStatus, e.target.value)
                }} />
            </div>
            <div className="EditLink-img">
                <UploadFile
                    onChange={(res) => {
                        setparamshandler(paramsname, editStatus, res)
                    }}
                    onDelete={(res) => {
                        setparamshandler(paramsname, editStatus, {})
                    }}
                    limitSize={4194304}
                    propsStyle={{ width: "142px", height: '142px', background: '#F7F8F9', borderRadius: '4px', border: "none" }}
                    imgUrl={value.files ? value.files.find(item => item.fileType === 'image').filePath : ''}
                    text={'上传图片'}
                />
                <div className='EditLink-text'>图片不超过1MB</div>
            </div>
        </div>
    )
}
// export const EditSLink = ({ paramsname, setparamshandler, value, editStatus }) => {
//     return (
//         <div className="EditSLink">
//             <div className="EditSLink-line" onClick={() => {
//                 sendEvent('slinkcontent', false)
//             }}>
//                 <span className="EditSLink-line-label">编辑封面</span>
//                 <div className="EditSLink-line-content">
//                     <div className="EditSLink-title EditSLink-row">
//                         <input maxLength='30' value={value.title} placeholder="请输入链接标题" onChange={(e) => {
//                             setparamshandler('paramsSLinkTitle', editStatus, e.target.value)
//                         }} />
//                     </div>
//                     <div className="EditSLink-content EditSLink-row">
//                         <input maxLength='100' value={value.content} placeholder="请输入描述文字" onChange={(e) => {
//                             setparamshandler('paramsSLinkDescription', editStatus, e.target.value)
//                         }} />
//                     </div>
//                     <div className="EditSLink-img">
//                         <UploadFile
//                             onChange={(res) => {
//                                 setparamshandler(paramsname, editStatus, res)
//                             }}
//                             onDelete={(res) => {
//                                 setparamshandler(paramsname, editStatus, {})
//                             }}
//                             limitSize={4194304}
//                             propsStyle={{ width: "142px", height: '142px', background: '#F7F8F9', borderRadius: '4px', border: "none" }}
//                             imgUrl={value.files ? value.files.find(item => item.fileType === 'image').filePath : ''}
//                             text={'上传图片'}
//                         />
//                         <div className='EditSLink-text'>图片不超过1MB</div>
//                     </div>
//                 </div>
//             </div>
//             <div className="EditSLink-line" onClick={() => {
//                 sendEvent('slinkcontent', true)
//             }}>
//                 <span className="EditSLink-line-label">编辑内文</span>
//                 <div className="EditSLink-line-content-box">
//                     <div className="EditSLink-line-content-box-txt">
//                         {
//                             value.files && value.files.find(item => item.fileType === 'text').fileContent.map((item, index) => {
//                                 if (item.type == 'txt') {
//                                     return (
//                                         <textarea
//                                             value={item.value}
//                                             key={index}
//                                             placeholder="请输入文字"
//                                             className='EditSLink-line-content-box-txt-area'
//                                             onChange={(e) => {
//                                                 setparamshandler('paramsSLinkTxt', index, e.target.value)
//                                             }}
//                                         ></textarea>
//                                     )
//                                 }
//                             })
//                         }
//                         {/* <div className="EditSLink-line-content-box-add" onClick={() => {
//                             setparamshandler('paramsSLinkTxtAdd')
//                         }}>+ 添加文本</div> */}
//                     </div>
//                     <div className="EditSLink-line-content-box-img">
//                         {
//                             value.files && value.files.find(item => item.fileType === 'text').fileContent.map((item, index) => {
//                                 if (item.type == 'img') {
//                                     return (
//                                         <UploadFile
//                                             key={index}
//                                             onChange={(res) => {
//                                                 setparamshandler('paramsSLinkTxt', index, res.url)
//                                             }}
//                                             onDelete={(res) => {
//                                                 setparamshandler('paramsSLinkTxt', index, '')
//                                             }}
//                                             limitSize={4194304}
//                                             propsStyle={{ width: "182px", height: '182px', background: '#F7F8F9', borderRadius: '4px', border: "none", marginBottom: '14.5px' }}
//                                             imgUrl={item.value}
//                                             text={'上传图片 图片不超过1M'}
//                                         />
//                                     )
//                                 }
//                             })
//                         }
//                         {/* <div className="EditSLink-line-content-box-add" onClick={() => {
//                             setparamshandler('paramsSLinkImgAdd')
//                         }}>+ 添加图片</div> */}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }
export const EditWexx = ({ paramsname, setparamshandler, value, editStatus, uploadXmlfile }) => {
    return (
        <div className="EditWexx">
            {/* <Authorization/> */}
            {
                value.files && !value.files.find(item => item.fileType === 'text').filePath
                    ?
                    <div className="EditWexx-uploadwexx-create" onClick={uploadXmlfile}>
                        <span className="icon"></span>
                        <span>上传小程序描述文件</span>
                    </div>
                    :
                    <div className="EditWexx-uploadwexx-edit">
                        <div className="EditWexx-title EditWexx-row">
                            <input maxLength='30' value={value.title || value.content} placeholder="请输入小程序标题" onChange={(e) => {
                                setparamshandler('paramsWexxTitle', editStatus, e.target.value)
                            }} />
                        </div>
                        <div className="EditWexx-content EditWexx-row">
                            <input value={value.uri} placeholder="pages/index/index.html" onChange={(e) => {
                                setparamshandler('paramsWexxlink', editStatus, e.target.value)
                            }} />
                        </div>
                        <div className="EditWexx-img">
                            <UploadFile
                                onChange={(res) => {
                                    setparamshandler(paramsname, editStatus, res)
                                }}
                                onDelete={(res) => {
                                    setparamshandler(paramsname, editStatus, {})
                                }}
                                limitSize={4194304}
                                propsStyle={{ width: "142px", height: '142px', background: '#F7F8F9', borderRadius: '4px', border: "none" }}
                                imgUrl={value.files ? value.files.find(item => item.fileType === 'image').filePath : ''}
                                text={'上传图片'}
                            />
                            <div className='EditWexx-text'>图片不超过1MB</div>
                        </div>
                    </div>
            }
        </div>
    )
}
export const EditSpace = ({txt}) => {
    return (
        <div className="EditSpace">
            {txt}
        </div>
    )
}