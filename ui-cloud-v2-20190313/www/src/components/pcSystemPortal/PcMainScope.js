import React, { Component, PropTypes } from 'react'
import BasicInformation from './BasicInformation'
import { tongji } from '../../funStore/tongji';

export default class PcMainScope extends Component {
    constructor(props){
        super(props)
        this.goTo = this.goTo.bind(this)
        this.showPopHandle = this.showPopHandle.bind(this)
        this.hidePopHandle = this.hidePopHandle.bind(this)
        this.getUserInfo = this.getUserInfo.bind(this)
        this.switchBlock = this.switchBlock.bind(this)
        this.state = {
            viewScope: 'BASICINFO',
            popController: {
                show: false,
                type: '',
                userInfo: null
            },
            detail:'',
            remarkId:0,
            buttonBlock: false
        }
    }
    switchBlock(){
        this.setState({
            buttonBlock:true
        })
        setTimeout(()=>{
            this.setState({
                buttonBlock:false
            })
        },500)
    }
    goTo(name){
        this.setState({
            viewScope: name
        })
    }
    showPopHandle(type){
        switch (type) {
            case 'AVATAR':
                tongji('Lzc_YongHuGuanLi_TouXiang')
                break;
            case 'PHONE':
                tongji('Lzc_YongHuGuanLi_ShouJi')
                break;
            case 'EMAIL':
                tongji('Lzc_YongHuGuanLi_YouXiang')
                break;
            case 'PASSWORD':
                tongji('Lzc_YongHuGuanLi_Mima')
                break;
            default:
                break;
        }
        this.setState({
            popController: {
                show: true,
                type: type
            }
        })
    }
    hidePopHandle(){
        this.setState({
            popController: {
                show: false,
                type: ''
            }
        })
    }
    getUserInfo(data){
        this.setState({
            userInfo: data
        })
    }
    render(){
        const {viewScope,popController,buttonBlock} = this.state
        const {actions,userInfo} = this.props
        return(
            <div className='jm-container' style={{background:'#F8F8F9',height:'100%'}}>
                <BasicInformation
                    viewScope={viewScope} 
                    goTo={this.goTo}
                    popController={popController}
                    showPopHandle={this.showPopHandle}
                    hidePopHandle={this.hidePopHandle}
                    getUserInfo={this.getUserInfo}
                    buttonBlock={buttonBlock}
                    switchBlock={this.switchBlock}
                />
            </div>
        )
    }
}
