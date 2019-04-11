import React,{Component,PropTypes} from 'react'

const statusData = {
    default:{
        text:''
    },
    DELETE_ALL:{
        text:'您确定删除所有选中的用户吗?'
    },
    DELETE_SINGLE:{
        text:'您确定移除此用户吗？'
    }
}
export default class TipBox extends Component {
    render(){
        const {status,showTipBox,cancelTipBox,confirmTipBox} = this.props
        return (
            <div className='tipWrapper' style={{display:showTipBox?'block':'none'}}>
                <div className="tipBox">
                    <p>{statusData[status].text}</p>
                    <div className="confirmBtn" onClick={confirmTipBox}>删除</div>
                    <div className="closeBtn icon-set" onClick={cancelTipBox}></div>
                </div>
            </div>
        )
    }
}
