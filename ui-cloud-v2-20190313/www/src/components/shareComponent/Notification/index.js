import React from 'react'
import {notification} from 'antd'
import 'antd/lib/notification/style/css'
import './index.css'

export const ErrorIcon= ()=>{
    return (
        <svg width="18px" height="18px" viewBox="0 0 18 18" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <g id="系统消息推送" transform="translate(-728.000000, -465.000000)">
                    <g id="分组-13-copy-4" transform="translate(705.000000, 446.000000)">
                        <g id="Group-34" transform="translate(20.000000, 16.000000)">
                            <circle id="Oval-14" stroke="#F64040" fillRule="nonzero" cx="12" cy="12" r="8"></circle>
                            <path d="M11.4230113,7 L12.6320113,7 L12.4240113,13.786 L11.6180113,13.786 L11.4230113,7 Z M12.0001554,14.735 C12.2211554,14.735 12.4161554,14.8 12.5721554,14.956 C12.7151554,15.099 12.7931554,15.281 12.7931554,15.502 C12.7931554,15.736 12.7151554,15.918 12.5721554,16.061 C12.4161554,16.204 12.2211554,16.282 12.0001554,16.282 C11.7791554,16.282 11.5971554,16.204 11.4411554,16.061 C11.2851554,15.905 11.2201554,15.723 11.2201554,15.502 C11.2201554,15.281 11.2851554,15.099 11.4411554,14.956 C11.5971554,14.8 11.7791554,14.735 12.0001554,14.735 Z" id="！" fill="#F64040"></path>
                        </g>
                    </g>
                </g>
            </g>
        </svg>
    )
}

export const InfoIcon = () => {
    return (
        <svg width="18px" height="18px" viewBox="0 0 18 18" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <g id="系统消息推送" transform="translate(-827.000000, -187.000000)" fillRule="nonzero">
                    <g id="分组-20-copy" transform="translate(824.000000, 184.000000)">
                        <g id="Group-34" stroke="#288BF2">
                            <circle id="Oval-14" cx="12" cy="12" r="8"></circle>
                            <path d="M9.5099389,12.5 C9.5099389,15.2614237 11.7485152,17.5 14.5099389,17.5" id="路径" strokeLinecap="round" transform="translate(12.009939, 15.000000) rotate(-45.000000) translate(-12.009939, -15.000000) "></path>
                        </g>
                        <circle id="椭圆形" fill="#288BF2" cx="8" cy="10" r="1"></circle>
                        <circle id="椭圆形-copy-4" fill="#288BF2" cx="16" cy="10" r="1"></circle>
                    </g>
                </g>
            </g>
        </svg>
    )
}

const info = (config) => {
    notification.open({
        key: config.batchId,
        message: config.title,
        description: config.content,
        duration: config.duration?config.duration:0,
        icon: <InfoIcon />,
        className: 'Public-notification'
        })
}

const error = (config) =>{
    notification.open({
        key: config.batchId,
        message: config.title,
        description: config.content,
        duration: config.duration?config.duration:0,
        icon: <ErrorIcon />,
        className: 'Public-notification'
    })
}

export default {
    info,
    error
}