import React from 'react'
import {LoadingSVG}  from '../LoadingAnimationS'

const Tableloading = () => {
    return (
        <div style={{width:'50px',height:'50px',position: 'absolute',top: '50%',left: '50%',transform: 'translate(-50%, -100%)'}}>
            <LoadingSVG />
        </div>
    )
}

export default Tableloading