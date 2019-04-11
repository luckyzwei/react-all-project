import React from 'react'

export const TextInput = ({item,clickHandle,checkStatus}) => {
    return (
    <div className={checkStatus?"shape-control shape-control-select":"shape-control"} style={{marginBottom: '16px'}}>
        <div className="row ab-row" onClick={()=>{clickHandle(item)}}>
            <div className='row-content'>
                {item.label}
            </div>
        </div> 
        <div className="shape-control-rect shape-control-rect-left-top"></div>
        <div className="shape-control-rect shape-control-rect-top"></div>
        <div className="shape-control-rect shape-control-rect-right-top"></div>
        <div className="shape-control-rect shape-control-rect-right"></div>
        <div className="shape-control-rect shape-control-rect-right-bottom"></div>
        <div className="shape-control-rect shape-control-rect-bottom"></div>
        <div className="shape-control-rect shape-control-rect-left-bottom"></div>
        <div className="shape-control-rect shape-control-rect-left"></div>
    </div>
    )
}

export const SelectInput = ({item,clickHandle,checkStatus}) => {
    return (
        <div className={checkStatus?"shape-control shape-control-select":"shape-control"} style={{marginBottom: '16px'}}>
            <div className="row ab-row" onClick={()=>{clickHandle(item)}}>
                <div className='row-content'>
                    {item.label}
                    <span className='row-content-icom'></span>
                </div>
            </div> 
            <div className="shape-control-rect shape-control-rect-left-top"></div>
            <div className="shape-control-rect shape-control-rect-top"></div>
            <div className="shape-control-rect shape-control-rect-right-top"></div>
            <div className="shape-control-rect shape-control-rect-right"></div>
            <div className="shape-control-rect shape-control-rect-right-bottom"></div>
            <div className="shape-control-rect shape-control-rect-bottom"></div>
            <div className="shape-control-rect shape-control-rect-left-bottom"></div>
            <div className="shape-control-rect shape-control-rect-left"></div>
        </div>
    )
}

export const PhoneInput = ({item,clickHandle,checkStatus}) => {
    return (
    <div className={checkStatus?"shape-control shape-control-select":"shape-control"} style={{marginBottom: '16px'}}>
        <div className='phone-row' onClick={()=>{clickHandle(item)}}>
            <div className="row" style={{marginBottom:item.mandatory?'16px':'0'}}>
                <div className='row-content' >{item.label}</div>
            </div>
            {
                item.mandatory ?
                    <div className="row row-code"  >
                        <div className='row-content-code' >验证码</div>
                        <div className='row-content-line'></div>
                        <div className='row-content-get'>获取验证码</div>
                    </div> : ''
            }
        </div>
        <div className="shape-control-rect shape-control-rect-left-top"></div>
        <div className="shape-control-rect shape-control-rect-top"></div>
        <div className="shape-control-rect shape-control-rect-right-top"></div>
        <div className="shape-control-rect shape-control-rect-right"></div>
        <div className="shape-control-rect shape-control-rect-right-bottom"></div>
        <div className="shape-control-rect shape-control-rect-bottom"></div>
        <div className="shape-control-rect shape-control-rect-left-bottom"></div>
        <div className="shape-control-rect shape-control-rect-left"></div>
    </div>
    )
}

export const TextInputPreview = ({item}) => {
    return (
        <div className="row ab-row" style={{marginBottom: '16px'}}>
            <div className='row-content'>
                {item.label}
            </div>
        </div> 
    )
}

export const SelectInputPreview = ({item}) => {
    return (
        <div className="row ab-row" style={{marginBottom: '16px'}}>
            <div className='row-content'>
                {item.label}
                <span className='row-content-icom'></span>
            </div>
        </div> 
    )
}

export const PhoneInputPreview = ({item}) => {
    return (
        <div className='phone-row' style={{marginBottom: '16px'}}>
            <div className="row" style={{marginBottom:item.mandatory?'16px':'0'}}>
                <div className='row-content' >{item.label}</div>
            </div>
            {
                item.mandatory ?
                    <div className="row row-code"  >
                        <div className='row-content-code' >验证码</div>
                        <div className='row-content-line'></div>
                        <div className='row-content-get'>获取验证码</div>
                    </div> : ''
            }
        </div>
    )
}
