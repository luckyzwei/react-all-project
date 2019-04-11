import React,{Component} from 'react'
import './index.css'
import ButtonBox from '../../shareComponent/ButtonBox'


export const Nodata = ({showLoginModal}) => {
    return (
        <div className="nodata">
            <div className="icon-nodata"></div>
            <p className="text">还没有托管任何账号哦</p>
            <ButtonBox 
                btnTxt={'新增托管'}
                isCancel={false}
                btnStyle={{
                    width:'108px',
                    height:'36px',
                    margin:'50px auto'
                }}
                btnFunc={()=>{showLoginModal('ADD')}}
            />
        </div>
    )
}