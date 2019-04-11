import React,{Component,PropTypes} from 'react'
import promiseXHR from '../../../funStore/ServerFun'
import AuthProvider from '../../../funStore/AuthProvider'
import {API_PATH} from '../../../constants/OriginName'


const CardItemOffline = ({loginHandle,item={}}) => {
    return (
        <div className="card cardItem">
            <div className="detailBox">
                <div className="avatar">
                    <img src={item.headImage} alt=""/>
                    <span>{item.wechatName?item.wechatName:'未命名'}</span>
                </div>
                <div className="statusBox">
                    <div className="groupCount error">
                        <span>已托管：</span>
                        <span>{item.hostedGroups?item.hostedGroups:0}个群</span>
                    </div>
                    <div className="statusText offline">
                        离线
                        <div className="hoverBox">
                            掉线时间
                            <br/>
                            {item.lastLogoutDate?item.lastLogoutDate.slice(0,16).replace('T',' ').replace(/-/g,'/'):'-'}
                        </div>
                    </div>
                    <div style={{width:'100%'}}>
                        <div className="loginBtn" onClick={loginHandle}>登录账号</div>
                    </div>
                </div>
            </div>
            <div className="footer">
                <div className="left"></div>
                <div className="operateArea">
                    <div className="more" style={{cursor: 'not-allowed'}}>
                        <div className="hoverBox">更多操作</div>
                    </div>
                    {/* <div className="refresh" style={{cursor: 'not-allowed'}}>
                        <div className="hoverBox">刷新</div>
                    </div> */}
                </div>
            </div>
        </div>
    )
}

const CardItemError = ({loginHandle,item={}}) => {
    return (
        <div className="card cardItem">
            <div className="detailBox">
                <div className="avatar">
                    <img src={item.headImage} alt=""/>
                    <span>{item.wechatName?item.wechatName:'未命名'}</span>
                </div>
                <div className="statusBox">
                    <div className="groupCount error">
                        <span>已托管：</span>
                        <span>{item.hostedGroups?item.hostedGroups:0}个群</span>
                    </div>
                    <div className="statusText error">
                        异常
                        <div className="hoverBox">
                            异常原因
                            <br/>
                            账号被封，请尽快尝试解封后重新上线
                        </div>
                    </div>
                    <div style={{width:'100%'}}>
                        <div className="loginBtn" onClick={loginHandle}>登录账号</div>
                    </div>
                </div>
            </div>
            <div className="footer">
                <div className="left"></div>
                <div className="operateArea">
                    <div className="more" style={{cursor: 'not-allowed'}}>
                        <div className="hoverBox">更多操作</div>
                    </div>
                    <div className="refresh" style={{cursor: 'not-allowed'}}>
                        <div className="hoverBox">刷新</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const countTime = (time) =>{
    let current = new Date().getTime()
    let last = new Date(time).getTime()
    return parseInt((current-last)/(24*3600*1000))
}

const CardItemOnline = ({
        item={},
        isOperating,
        showMore,
        showMoreHandle,
        hideMoreHandle,
        accountSetHandle,
        barrierHandle,
        unbarrierHandle,
        refreshHandle,
        changeView,
        showProcessModal,
        actions,
        refreshFlag
    }) => {
    return (
        <div className="card cardItem">
            <div className="detailBox">
                <div className="avatar">
                    <img src={item.headImage} alt=""/>
                    <span>{item.wechatName?item.wechatName:'未命名'}</span>
                </div>
                <div className="statusBox">
                    <div className="groupCount">
                        <span>已托管：</span>
                        <span>{item.hostedGroups?item.hostedGroups:0}个群</span>
                    </div>
                    <div className="statusText">
                        在线
                        <div className="hoverBox">
                            上线时间
                            <br/>
                            {item.lastLoginDate?item.lastLoginDate.slice(0,16).replace('T',' ').replace(/-/g,'/'):'-'}
                            <br/>
                            已在线{item.lastLoginDate?countTime(item.lastLoginDate):0}天
                        </div>
                    </div>
                </div>  
            </div>
            <div className="footer">
                <div className="left">
                    <span className="import" onClick={()=>{actions.goTo('/v2/GIScope/import/'+item.id)}}>导入群</span>
                    <span className="view" onClick={()=>{showProcessModal(item)}}>查看进度</span>
                </div>
                <div className="operateArea">
                    <div className="more" tabIndex='1'
                        onMouseEnter={barrierHandle}
                        onMouseLeave={unbarrierHandle}
                        onFocus={showMoreHandle}
                        onBlur={hideMoreHandle}
                    >
                        <div className="hoverBox">更多操作</div>
                        <div className="item" style={{display:showMore?'block':'none'}}>
                            <div className='set' tabIndex='2' onClick={()=>{accountSetHandle(item)}}>账号设置</div>
                            {
                            item.hostedGroups&&item.hostedGroups>0 ?
                                <div className='cancel' tabIndex='2'  onClick={()=>{changeView(item)}}>
                                取消托管
                                </div>
                                : ''
                            }
                        </div>
                    </div>
                    <div className="refresh" onClick={()=>{isOperating&&refreshHandle(item.id)}}>
                        <div className="hoverBox">刷新</div>
                    </div>
                </div>
            </div>
            <div className="refreshBox" style={{display:refreshFlag?'block':'none'}}>
                <img className='refreshBox-img' src={`${process.env.PUBLIC_URL}/images/icon/loading.svg`} alt=""/>
            </div>
        </div>
    )
}



export default class CardItem extends Component {
    constructor(props){
        super(props)
        this.state = {
            showMore: false,
            barrier: false,
            refreshFlag: false
        }
        this.showMoreHandle = this.showMoreHandle.bind(this)
        this.hideMoreHandle = this.hideMoreHandle.bind(this)
        this.barrierHandle = this.barrierHandle.bind(this)
        this.unbarrierHandle = this.unbarrierHandle.bind(this)
        this.accountSetHandle = this.accountSetHandle.bind(this)
        this.cancelManageHandle = this.cancelManageHandle.bind(this)
        this.loginHandle = this.loginHandle.bind(this)
        this.refreshHandle = this.refreshHandle.bind(this)
    }
    showMoreHandle(){
        this.setState({
            showMore: true
        })
    }   
    hideMoreHandle(){
        if(!this.state.barrier){
            this.setState({
                showMore: false
            })
        }
    }
    barrierHandle(){
        this.setState({barrier: true})
    }
    unbarrierHandle(){
        this.setState({barrier: false})
    }
    accountSetHandle(item){
        this.props.showModal('avatarSetFlag',item)
        this.setState({showMore: false})
    }
    cancelManageHandle(item){
        // 暂时不用
        this.props.showModal('cancelFlag',item)
        this.setState({showMore: false})
    }
    refreshHandle(id){
        // 刷新状态
        this.setState({
            refreshFlag:true 
        })
        const url = `${API_PATH}/groupadmin-api/authsec/robothost/account/${id}`
        AuthProvider.getAccessToken()
        .then((resolve,reject)=>{
            return promiseXHR(url,{type:'Bearer',value:resolve},null,'GET')})
        .then((res) =>{
            const resData = JSON.parse(res)
            this.props.updateListData(resData.resultContent)
            this.setState({
                refreshFlag:false 
            })
        })
    }

    loginHandle(){
        this.props.showLoginModal('LOGIN')
    }

    render(){
        const {showMore,refreshFlag} = this.state
        const {item,showModal,showLoginModal,updateListData,showProcessModal,actions} = this.props
        return (
            item.status==1?
            <CardItemOnline 
                item={item}
                isOperating={item.operationGroups>0}
                showMore={showMore}
                showMoreHandle={this.showMoreHandle}
                hideMoreHandle={this.hideMoreHandle}
                accountSetHandle={this.accountSetHandle}
                barrierHandle={this.barrierHandle}
                unbarrierHandle={this.unbarrierHandle}
                refreshHandle={this.refreshHandle}
                changeView={this.cancelManageHandle}
                showProcessModal={showProcessModal}
                actions={actions}
                refreshFlag={refreshFlag}
            />
            :item.status==5?
            <CardItemOffline 
                item={item}
                loginHandle={this.loginHandle}
            />
            :
            <CardItemError 
                item={item}
                loginHandle={this.loginHandle}
            />
        )
    }
}