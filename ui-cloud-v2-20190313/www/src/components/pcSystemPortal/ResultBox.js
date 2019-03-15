import React,{Component,PropTypes} from 'react'

const ResultBox = ({status,display}) => {
    const result ={
        success:'图片上传成功',
        fail: '图片上传失败'
    }
    return (
            <div className="statusBox" style={{display:display}}>
                <div className="innerBox">
                    {
                        status=="success"?
                        <img src={process.env.PUBLIC_URL+"/images/icon/uploadSuccess.png"} alt=""/>:
                        <img src={process.env.PUBLIC_URL+"/images/icon/uploadFail.png"} alt=""/>
                    }
                    <p className="statusText">{result[status]}</p>
                </div>
            </div>
    )
}

export default ResultBox