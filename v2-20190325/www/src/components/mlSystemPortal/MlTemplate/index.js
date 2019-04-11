import React, {Component} from 'react'
import ButtonBox from '../../shareComponent/ButtonBox'
import RangePicker from '../../shareComponent/RangePicker'
import Input from '../../shareComponent/Input'
import moment from 'moment'

import './index.css'

const Bgbox = ({data,playAudio,showImg,showH5,showDelModal}) => {
    return (
        <div className={'bg-box'} onClick={() => {showImg?showImg(data.sourceContent):showH5?showH5(data.linkHref):''}}>
            <p>{data.createDate.replace('T',' ')}</p>
            <p>{data.imUserNickname}</p>
            <em className='del-icon' onClick={(e) => {showDelModal(e,data.id);e.stopPropagation()}}></em>
            {/* {
                showImg?<em onClick={() => {showImg(data.sourceContent)}} className="show"></em>
                :''
            } */}
            {
                playAudio?<em onClick={() => {playAudio(data.sourceContent)}} className="play"></em>
                :''
            }
        </div>
    )
}

// export const Shell = ({data,selectItem,delItem,type,setSrc,batchControl,showDelModal,setSearchDate,searchMaterial,changeBatch}) => {
//     return (
//         <div className="content-box">
//             <div className="search-box">
//                 <div className="row">
//                     <span className="title">收录时间：</span>
//                     <RangePicker
//                         paramName={'searchDate'}
//                         styles={{ width: "300px", height: '36px', lineHeight: '36px' }}
//                         setDateParams={(e) => {
//                             setSearchDate('searchDate', e)
//                         }}
//                     />
//                 </div>
//                 <div className="row">
//                     <Input
//                         label={"发送人："}
//                         placeholder={'请输入'}
//                         paramsname={'searchName'}
//                         styles={{width: "200px"}}
//                         iptChangeParams={setSearchDate}
//                     />
//                 </div>
//                 <ButtonBox
//                     btnTxt={'搜索'}
//                     isCancel={false}
//                     btnStyle={{float: 'left'}}
//                     btnFunc={searchMaterial}
//                 />
//                 {
//                     batchControl?
//                     <div className="selectAll-box">
//                         <div className="selectAll">全选</div>
//                         <p>删除</p>
//                     </div>
//                     :
//                     <p className="batch-control" onClick={changeBatch}>批量操作</p>
//                 }
//             </div>
//             {data.map(v => (
//                 <div className="item-box" onClick={() => {delItem.some(item => v.sourceContent == item.sourceContent)?selectItem('','',''):selectItem('img',v,3)}}>
//                     <div className="time">{moment(v.createDate).format('YYYY年MM月DD日')}</div>
//                     <div className="flex-box">
//                     {
//                         type == 'img'?
//                         <ImgDom delItem={delItem} showDelModal={showDelModal} selectItem={selectItem} data={v} batchControl={batchControl}/>:''
//                     }
//                     {
//                         type == 'h5'?
//                         <H5Dom delItem={delItem} showDelModal={showDelModal} selectItem={selectItem} data={v} batchControl={batchControl}/>:''
//                     }
//                     {
//                         type == 'mpro'?
//                         <MProgramDom delItem={delItem} showDelModal={showDelModal} selectItem={selectItem} data={v} batchControl={batchControl}/>:''
//                     }
//                     {
//                         type == 'public'?
//                         <PublicDom delItem={delItem} showDelModal={showDelModal} selectItem={selectItem} data={v} batchControl={batchControl}/>:''
//                     }
//                     {
//                         type == 'voice'?
//                         <VoiceDom delItem={delItem} showDelModal={showDelModal} setSrc={setSrc} selectItem={selectItem} data={v} batchControl={batchControl}/>:''
//                     }
//                     </div>
//                 </div>
//             ))}
//         </div>
//     )
// }

const TimeDom = ({searchData,setSearchDate,searchMaterial}) => {
    return (
        <div className="search-box">
            <div className="row">
                <span className="title">收录时间：</span>
                <RangePicker
                    defaultValue={searchData.createDateStart?[moment(searchData.createDateStart),moment(searchData.createDateEnd)]:''}
                    paramName={'searchDate'}
                    styles={{ width: "300px", height: '36px', lineHeight: '36px' }}
                    setDateParams={(e) => {
                        setSearchDate('searchDate', e)
                    }}
                />
            </div>
            <div className="row">
                <Input
                    label={"发送人："}
                    placeholder={'请输入'}
                    value={searchData.imUserNickname?searchData.imUserNickname:''}
                    paramsname={'searchName'}
                    styles={{width: "200px"}}
                    iptChangeParams={setSearchDate}
                />
            </div>
            <ButtonBox
                btnTxt={'搜索'}
                isCancel={false}
                btnStyle={{float: 'left'}}
                btnFunc={searchMaterial}
            />
            {/* {
                batchControl?
                <div className="selectAll-box">
                    <div className="selectAll">全选</div>
                    <p>删除</p>
                </div>
                :
                <p className="batch-control" onClick={changeBatch}>批量操作</p>
            } */}
        </div>
    )
}

export const ImgDom = ({data,showImg,delItem,batchControl,showDelModal,searchData,changeBatch,setSearchDate,searchMaterial}) => {
    return (
        <React.Fragment>
            <TimeDom 
                searchData={searchData} 
                changeBatch={changeBatch}
                setSearchDate={setSearchDate}
                searchMaterial={searchMaterial}
                />
            {
                data.length?
                data.map(value => {
                    return (
                    <React.Fragment>
                        {
                            value.data.length>0?
                            <React.Fragment>
                            <div className="time">{moment(value.createDate).format('YYYY年MM月DD日')}</div>
                            <div className="flex-box">
                                {value.data.length>0&&value.data.map(v => (
                                    <div className="item img-box">
                                        <img src={v.sourceContent} alt=""/>
                                        {
                                            batchControl?
                                                <em className={delItem.some(item => v.sourceContent == item.sourceContent)?"active select":"select"}></em>
                                            :
                                            <Bgbox showDelModal={showDelModal} data={v} showImg={showImg}/>
                                        }
                                    </div>
                                ))}
                            </div>
                            </React.Fragment>
                        :''
                    }
                    </React.Fragment>)
                })
                :
                <div className="noData"><p>还没有内容哦</p></div>
            }
        </React.Fragment>
    )
}

export const H5Dom = ({data,selectItem,delItem,batchControl,showDelModal,searchData,changeBatch,setSearchDate,searchMaterial,showH5}) => {
    return (
        <React.Fragment>
            <TimeDom 
                searchData={searchData} 
                changeBatch={changeBatch}
                setSearchDate={setSearchDate}
                searchMaterial={searchMaterial}
                />
            {
                data.length?
                data.map(value => {
                return (
                    <React.Fragment>
                    {
                        value.data.length>0?
                        <React.Fragment>
                        <div className="time">{moment(value.createDate).format('YYYY年MM月DD日')}</div>
                        <div className="flex-box">
                            {value.data.length>0&&value.data.map(v => (
                                <div className="item H5-box" 
                                // onClick={() => {
                                //     delItem.some(item => v.sourceContent == item.sourceContent)?selectItem('','',''):selectItem('H5',v,1)
                                // }}
                                >
                                    <div className="title">{v.linkTitle}</div>
                                    <div className="item-content-box">
                                        <div className="cont-txt">{v.linkDesc}</div>
                                        <img src={v.sourceContent} className="cont-img"/>
                                    </div>
                                    {
                                        batchControl?
                                            <em className={delItem.some(item => v.sourceContent == item.sourceContent)?"active select":"select"}></em>
                                        :
                                        <Bgbox showDelModal={showDelModal} showH5={showH5} data={v}/>
                                    }
                                </div>
                            ))}
                        </div>
                        </React.Fragment>
                        :''
                    }
                    </React.Fragment>
                )
            })
            :
            <div className="noData"><p>还没有内容哦</p></div>
            }
        </React.Fragment>
    )
}

export const MProgramDom = ({data,selectItem,delItem,batchControl,showDelModal,searchData,changeBatch,setSearchDate,searchMaterial}) => {
    return (
        <React.Fragment>
            <TimeDom 
                searchData={searchData} 
                changeBatch={changeBatch}
                setSearchDate={setSearchDate}
                searchMaterial={searchMaterial}
                />
            {
                data.length?
                data.map(value => {
                return (
                    <React.Fragment>
                    {
                        value.data.length>0?
                        <React.Fragment>
                        <div className="time">{moment(value.createDate).format('YYYY年MM月DD日')}</div>
                        <div className="flex-box">
                            {value.data.length>0&&value.data.map(v => (
                                <div className="item mpro-box" 
                                // onClick={() => {
                                //     delItem.some(item => v.sourceContent == item.sourceContent)?selectItem('','',''):selectItem('mpro',v,2)
                                // }}
                                >
                                    <div className="item-content-box">
                                        <div className="title-box">
                                            <img src={v.linkDesc} className="item-icon"/>
                                            <p>{v.sourceContent.match(/<sourcedisplayname>(\S*)<\/sourcedisplayname>/)[1]}</p>
                                        </div>
                                        <div className="content-txt">{v.sourceContent.match(/<title>(\S*?)<\/title>/)[1]}</div>
                                        <img className="content-img" src={v.linkHref?v.linkHref:(process.env.PUBLIC_URL+'/images/icon/wxapp_img.png')}/>
                                    </div>
                                    <div className="btm-cont">
                                        <em className="icon"></em>
                                        <p>小程序</p>
                                    </div>
                                    {
                                        batchControl?
                                            <em className={delItem.some(item => v.sourceContent == item.sourceContent)?"active select":"select"}></em>
                                        :
                                        <Bgbox showDelModal={showDelModal} data={v}/>
                                    }
                                </div>
                            ))}
                        </div>
                        </React.Fragment>
                        :''
                    }
                    </React.Fragment>
                )
            })
            :
            <div className="noData"><p>还没有内容哦</p></div>
            }
        </React.Fragment>
    )
}
export const PublicDom = ({data,selectItem,delItem,batchControl,showDelModal,searchData,changeBatch,setSearchDate,searchMaterial}) => {
    return (
        <React.Fragment>
            <TimeDom 
                searchData={searchData} 
                changeBatch={changeBatch}
                setSearchDate={setSearchDate}
                searchMaterial={searchMaterial}
                />
            {
                data.length?
                data.map(value => {
                return (
                    <React.Fragment>
                    {
                        value.data.length>0?
                        <React.Fragment>
                        <div className="time">{moment(value.createDate).format('YYYY年MM月DD日')}</div>
                        <div className="flex-box">
                            {value.data.length>0&&value.data.map(v => (
                                <div className="item public-box" 
                                // onClick={() => {
                                //     delItem.some(item => v.sourceContent == item.sourceContent)?selectItem('','',''):selectItem('public',v,4)
                                // }}
                                >
                                    <div className="item-content-box">
                                        <img src={v.linkHref} className="item-icon"/>
                                        <p>{v.linkDesc}</p>
                                    </div>
                                    <p className="btm-txt">公众号名片</p>
                                    {
                                        batchControl?
                                            <em className={delItem.some(item => v.sourceContent == item.sourceContent)?"active select":"select"}></em>
                                        :
                                        <Bgbox showDelModal={showDelModal} data={v}/>
                                    }
                                </div>
                            ))}
                        </div>
                        </React.Fragment>
                        :''
                    }
                    </React.Fragment>
                )
            })
            :
            <div className="noData"><p>还没有内容哦</p></div>
            }
        </React.Fragment>
    )
}
export const VoiceDom = ({data,selectItem,delItem,batchControl,showDelModal,searchData,changeBatch,setSearchDate,searchMaterial,setSrc}) => {
    return (
        <React.Fragment>
            <TimeDom 
                searchData={searchData} 
                changeBatch={changeBatch}
                setSearchDate={setSearchDate}
                searchMaterial={searchMaterial}
                />
            {
                data.length?
                data.map(value => {
                return (
                    <React.Fragment>
                    {
                        value.data.length>0?
                        <React.Fragment>
                        <div className="time">{moment(value.createDate).format('YYYY年MM月DD日')}</div>
                        <div className="flex-box">
                        {value.data.length>0&&value.data.map(v => (
                            <div className="item voice-box" 
                            // onClick={() => {
                            //     delItem.some(item => v.sourceContent == item.sourceContent)?selectItem('','',''):selectItem('voice',v,5)
                            // }}
                            >
                                <img src={v.imUserAvatar?v.imUserAvatar:(process.env.PUBLIC_URL+"/images/icon/head-icon.png")} className="head-icon"/>
                                <div className="item-content-box">
                                    <div className="name">{v.imUserNickname}</div>
                                    <div className="item-content">
                                        <em></em>{v.voiceTime}"
                                    </div>
                                </div>
                                {
                                    batchControl?
                                        <em className={delItem.some(item => v.sourceContent == item.sourceContent)?"active select":"select"}></em>
                                    :
                                    <Bgbox showDelModal={showDelModal} voice={true} playAudio={setSrc} data={v}/>
                                }
                            </div>
                        ))}
                        </div>
                        </React.Fragment>
                        :''
                    }
                    </React.Fragment>
                )
            })
            :
            <div className="noData"><p>还没有内容哦</p></div>
            }
        </React.Fragment>
    )
}