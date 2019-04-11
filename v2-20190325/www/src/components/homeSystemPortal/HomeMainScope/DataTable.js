import React, { Component} from "react";
import { toThousands } from "../../../funStore/CommonFun";
export default class DataTable extends Component {

    render() {
        const {groupData} = this.props;
        const numSlider = (endNum) => {
            const numArr = endNum >= 2 ? [endNum - 2, endNum - 1, endNum] : [endNum, endNum, endNum]
            return numArr.map((item, i) => (
                <li key={i}>{toThousands(item)}</li>
            ))
        }
        const groupSliderFlag = groupData.groupCnt === undefined || groupData.groupCnt === null
        const memSliderFlag = groupData.memCnt === undefined || groupData.memCnt === null
        const acMemSliderFlag = groupData.activeCnt === undefined || groupData.activeCnt === null
        const joMemSliderFlag = groupData.msgCnt === undefined || groupData.msgCnt === null
        return (
            <React.Fragment>
                <div className="upperAreaBox">
                    <div className='upperItem left'>
                        <em className='iconItem groupnum-icon'/>
                        <div className='dt-data'>
                            <div className='ulList' style={{height: '45px', overflow: 'hidden'}}>
                                <ul
                                    style={{
                                        transform: !groupSliderFlag && groupData.groupCnt >= 2 ? 'translate3d(0,-90px,0)' : 'none',
                                        transition: !groupSliderFlag && groupData.groupCnt >= 2 ? 'all 2s ease-in-out' : 'none'
                                    }}>
                                    {groupSliderFlag ? '--' : numSlider(groupData.groupCnt)}
                                </ul>
                            </div>
                            <p className='title'>总群数</p>
                            <div className='addWord'>新增群数<span className='num'>{groupData.newGroupCnt?toThousands(groupData.newGroupCnt):0}</span><em className={groupData.newGroupCnt>=0?'numIcon upicon':'numIcon downicon'}/></div>
                        </div>
                    </div>
                    <div className='center-line'/>
                    <div className='upperItem right'>
                        <em className='iconItem peoplenum-icon'/>
                        <div className='dt-data'>
                            <div className='ulList' style={{height: '45px', overflow: 'hidden'}}>
                                <ul style={{
                                    transform: !memSliderFlag && groupData.memCnt >= 2 ? 'translate3d(0,-90px,0)' : 'none',
                                    transition: !memSliderFlag && groupData.memCnt >= 2 ? 'all 2s ease-in-out' : 'none'
                                }}>
                                    {memSliderFlag ? '--' : numSlider(groupData.memCnt)}
                                </ul>
                            </div>
                            <p className='title'>总用户数</p>
                            <div className='addWord'>
                                <div className='addWord' style={{marginRight:'25px'}}>入群<span className='num'>{groupData.enterCnt ? toThousands(groupData.enterCnt) : 0}</span><em className={groupData.enterCnt>=0?'numIcon upicon':'numIcon downicon'}/></div>
                                <div className='addWord'>退群<span className='num'>{groupData.leaveCnt ? toThousands(groupData.leaveCnt) : 0}</span><em className={groupData.leaveCnt>=0?'numIcon upicon':'numIcon downicon'}/></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="upperAreaBox">
                    <div className='upperItem left'>
                        <em className='iconItem messagenum-icon'/>
                        <div className='dt-data'>
                            <div className='ulList' style={{height: '45px', overflow: 'hidden'}}>
                                <ul style={{
                                        transform: !joMemSliderFlag && groupData.msgCnt >= 2 ? 'translate3d(0,-90px,0)' : 'none',
                                        transition: !joMemSliderFlag && groupData.msgCnt >= 2 ? 'all 2s ease-in-out' : 'none'
                                }}>
                                    {joMemSliderFlag ? '--' : numSlider(groupData.msgCnt)}
                                </ul>
                            </div>
                            <p className='title'>群消息数</p>
                            <div className='addWord'>
                                群均消息数
                                <em className='num'>{groupData.avgMsgCnt ? toThousands(Math.round(groupData.avgMsgCnt)) : 0}</em>
                            </div>
                        </div>
                    </div>
                    <div className='center-line'/>
                    <div className='upperItem right'>
                        <em className='iconItem saynum-icon'/>
                        <div className='dt-data'>
                            <div className='ulList' style={{height: '45px', overflow: 'hidden'}}>
                                <ul style={{
                                        transform: !acMemSliderFlag && groupData.activeCnt >= 2 ? 'translate3d(0,-90px,0)' : 'none',
                                        transition: !acMemSliderFlag && groupData.activeCnt >= 2 ? 'all 2s ease-in-out' : 'none'
                                    }}>
                                    {acMemSliderFlag ? '--' : numSlider(groupData.activeCnt)}
                                </ul>
                            </div>
                            <p className='title'>发言人数</p>
                            <div className='addWord'>
                                群均发言人数<em className='num'>{groupData.avgMemCnt?toThousands(Math.round(groupData.avgMemCnt)):0}</em>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
