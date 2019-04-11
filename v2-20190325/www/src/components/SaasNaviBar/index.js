import React, { Component } from 'react'
import PropTypes from 'prop-types'; // ES6
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as TodoActions from '../../actions'
import _ from 'lodash'
import {tongji} from '../../funStore/tongji'
import './index.css'
/* global location */
/* eslint no-restricted-globals: ["off", "location"] */
const userData = {
    avatar: process.env.PUBLIC_URL+'/images/知识库界面一 copy 19.png',
    username: '班长名字'
}

const navClassName = {
    TMScope: 'tmScope',
    GMScope: 'gmScope',
    WOScope: 'woScope',
    GCScope: 'gaScope',
    GAScope: 'aiScope',
    CWScope: 'cwScope',
    MTScope: 'mtScope',
    GIScope: 'gaScope',
    ECScope: 'ecScope',
    QRScope: 'qrScope',
    RMScope: 'rmScope',
    SysScope: 'sysScope',
    Home: 'gdScope',
    HWScope: 'hwScope',
    GBScope: 'gibuild',
    MMScope: 'mmScope'
}

class Avatar extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className='nav-avtarBox'>
                <div className='icon-home nav-avatar'
                >
                </div>
            </div>
        )
    }
}

function eventname(path){
    switch (path) {
        case '/v2/Home':
            return 'QunZhuangTai'   
        case '/v2/GIScope':
            return 'QunGuanLi'   
        case '/v2/RMScope':
            return 'ZhiNengZuShou'  
        case '/v2/GIScope/HostScope':
            return 'ZhangHaoTuoGuan'  
        case '/v2/GMScope':
            return 'QunXiaoXi'  
        case '/v2/MTScope':
            return 'QunTouFang'  
        case '/v2/CWScope':
            return 'ZhiNengYingDa'  
        case '/v2/HWScope':
            return 'GaoPinCiHui'  
        case '/v2/ARScope':
            return 'GuanJianCi'  
        case '/v2/SysScope':
            return 'XiTongSheZhi'  
        case '/v2/PCScope':
            return 'YongHuGuanLi'   
        case '/v2/TMScope/UCScope':
            return 'YongHuQuanXian'   
        default:
            return 'other'
    }
}

const MenuItem = ({ menuText, path, code, currentPath, fatherPath, foldEnable, isChild, showKids, unfoldFile, setUnfoldFile, time }) => {
    return (
        <div>
            <div className={(location.href.includes(code)) ? 'nav-item nav-item-active' : 'nav-item nav-item-unactive'}
                style={isChild ? showKids ? { height: '50px', transition: `all ${time} ease-in-out` } : {
                    height: '0px',
                    transition: `all ${time} ease-in-out`
                } : {}}
            >
                <div className='nav-icon'></div>
                <div className='nav-textBox' style={isChild ? {} : {}}>
                    <span>{menuText}</span>
                    {code=='TDScope'||code=='GDScope'||code=='MLScope'?<div className='newMenu'>new</div>:''}
                </div>
                {foldEnable ?
                    <div className={unfoldFile == path ? ' arrowDown' : ' arrowUp'}
                        onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            e.cancelBubble = true
                            setUnfoldFile(unfoldFile != path ? path : null)
                        }}></div>
                    : ''
                }
            </div>
        </div>
    )
}
MenuItem.propTypes = {
    menuText: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    currentPath: PropTypes.string.isRequired
}

const Tunnel = ({ path, naviList }) => {
    const indexOfList = (path, list) => {
        var index = -1
        for (var i = 0; i < list.length; i++) {
            if (path.includes(list[i].code)) {
                index = i
            }
        }
        return index
    }

    const resultIndex = indexOfList(path, naviList)
    const top = resultIndex * 50 + 46
    return (
        <div className='navBarTunnelBox'>
            <div className='swiperBoard'
                style={{ display: resultIndex == (-1) ? 'none' : 'block', marginTop: top + 'px' }}>
                <div className='lightBar'></div>
            </div>
        </div>
    )
}

class SaasNaviBar extends Component {
    static propTypes = {
        actions: PropTypes.object.isRequired
    }

    constructor(props) {
        super(props)
        this.state = {
            isExtend: false,
            currentPath: this.props.location + location.search,
            fatherPath: '',
            stateBoxShow: false,
            monitorState: true,
            unfoldFile: null,
            fetched: false,
            noBuy: null
        }
        this.clickExtendHandle = this.clickExtendHandle.bind(this)
        this.clickHandle = this.clickHandle.bind(this)
        this.changeWorkStateHandle = this.changeWorkStateHandle.bind(this)
        this.blurHandle = this.blurHandle.bind(this)
        this.setUnfoldFile = this.setUnfoldFile.bind(this)
        this.setNoBuyCode = this.setNoBuyCode.bind(this)
    }

    componentDidMount() {

    }

    setNoBuyCode(code) {
        this.setState({
            noBuy: code
        })
    }

    componentWillReceiveProps(nextProps) {
        if (!this.state.fetched) {
            const { naviMetaData } = nextProps
            if (naviMetaData.naviList.length != 0) {
                const hasChildren = naviMetaData.naviList.filter(item => item.children != null)
                const targetMenu = hasChildren.find(item =>
                    item.children.find(v =>
                        v.target == this.props.location))
                if (targetMenu != undefined) {
                    if ((targetMenu.orderSeq + targetMenu.children.length) > 7) {
                        this.refs.navContainer.scrollTop = 400
                    }
                    this.setUnfoldFile(targetMenu.target)
                }
                this.setState({
                    fetched: true
                })
            }

        }
    }

    componentWillUnmount() {

    }

    setUnfoldFile(name) {
        this.setState({
            unfoldFile: name
        })
    }

    clickExtendHandle() {
        // this.setState({
        //   isExtend: !this.state.isExtend
        // })
        // // this.props.extendType(this.state.isExtend)
        // this.props.actions.extendChange()
    }

    clickHandle() {
        this.setState({
            stateBoxShow: !this.state.stateBoxShow
        })
    }

    blurHandle() {
        this.setState({
            stateBoxShow: false
        })
    }

    changeWorkStateHandle() {
        this.setState({
            monitorState: !this.state.monitorState
        })
    }

    stateChangeHandle() {
        this.setState({
            workState: !this.state.workState
        })
    }

    //跳转路由事件，根据meta所指向的router进行传参数
    goToRouter=(path) =>{
        this.setState({
            currentPath: path
        })
        this.props.actions.goTo(path)
        tongji(`Lzc_${eventname(path)}_enter`)
    }
    render() {
        const { naviMetaData, userInfo, actions } = this.props
        let { isExtend, currentPath, monitorState, fatherPath, unfoldFile } = this.state;
        const naviList = _.flatMapDeep(naviMetaData.naviList, item => item.children != null && item.target == unfoldFile ? [item, item.children] : item)
        return (
            <div className={isExtend ? 'navBarWrapper navBarWrapper-extend' : 'navBarWrapper'} ref='navContainer'>
                <Avatar
                    imgSrc={userData.avatar}
                    userName={userData.username}
                    isExtend={this.state.isExtend}
                    stateBoxShow={this.state.stateBoxShow}
                    clickHandle={this.clickHandle}
                    changeWorkStateHandle={this.changeWorkStateHandle}
                    monitorState={monitorState}
                    blurHandle={this.blurHandle}
                    actions={actions}
                />
                <Tunnel
                    path={location.href}
                    naviList={naviList} />
                <div className='navBarBox'>
                    <div className={isExtend ? 'nav-arrowBox navBarBox-active' : 'nav-arrowBox '} onClick={this.clickExtendHandle}>
                        <div className="nav-arrow icon-home" style={{ visibility: 'hidden' }}></div>
                    </div>
                    <ul>
                        {naviMetaData.naviList.map((navItem, id) =>
                            <div>
                                <li className={navClassName[navItem.code]}
                                    key={id + Math.random()}
                                    onClick={
                                        (e) => {
                                            this.setUnfoldFile(navItem.target)
                                            this.goToRouter(navItem.target,navItem.name)
                                        }}>
                                    <MenuItem
                                        menuText={navItem.name}
                                        path={navItem.target}
                                        code={navItem.code}
                                        currentPath={currentPath}
                                        fatherPath={fatherPath}
                                        foldEnable={navItem.children != null}
                                        unfoldFile={unfoldFile}
                                        setUnfoldFile={this.setUnfoldFile}
                                        time={'0.3s'}
                                    />
                                </li>
                                {navItem.children != null ?
                                    <ul style={Object.assign({ overflow: 'hidden' },
                                        { height: '0px', transition: `all 0.3s ease-in-out` }, navItem.target == unfoldFile ? {
                                            transition:
                                                `all 0.3s ease-in-out`, height: navItem.children.length * 50 + 'px'
                                        } : {})}>
                                        {navItem.children.map((childrenItem, index) =>
                                            <li className={navClassName[childrenItem.code]}
                                                key={index}
                                                onClick={
                                                    (e) => {
                                                        this.goToRouter(childrenItem.target,childrenItem.name)
                                                    }}>
                                                <MenuItem
                                                    showKids={unfoldFile == navItem.target}
                                                    isChild={true}
                                                    code={childrenItem.code}
                                                    menuText={childrenItem.name}
                                                    path={childrenItem.target}
                                                    currentPath={currentPath}
                                                    fatherPath={fatherPath}
                                                    unfoldFile={unfoldFile}
                                                    setUnfoldFile={this.setUnfoldFile}
                                                    time={navItem.target == unfoldFile ? `${0.3 / navItem.children.length}s` : '1s'}
                                                />
                                            </li>
                                        )}
                                    </ul>
                                    : ''}
                            </div>
                        )}
                    </ul>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    userInfo: state.userInfo,
    extendState: state.extendState,
    naviMetaData: state.naviMetaData
})
const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(TodoActions, dispatch)
})
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SaasNaviBar)
