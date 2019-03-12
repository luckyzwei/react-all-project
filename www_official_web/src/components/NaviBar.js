import React, {Component, PropTypes} from "react";
import {Link} from "react-router-dom";

const Menu = ({style, current}) => {
    return (
        <div style={{width: '60%', height: '73px', float: 'right'}}>
            <ul className="navList" style={{width: '100%', height: '73px', listStyle: 'none', color: style.color}}>
                {/*<li><Link to='/join' style={{*/}
                {/*textDecoration: 'none',*/}
                {/*color: style.color,*/}
                {/*fontFamily: current === 'join' ? 'PingFangSC-Regular' : 'PingFangSC-Light'*/}
                {/*}}*/}
                {/*>加入我们</Link></li>*/}
                <li>
                    <Link to='/about' style={{
                        textDecoration: 'none',
                        color: style.color,
                        fontFamily: current === 'about' ? 'PingFangSC-Regular' : 'PingFangSC-Light'
                    }}>关于我们</Link>
                </li>
                <li>
                    <Link to='/content' style={{
                        textDecoration: 'none',
                        color: style.color,
                        fontFamily: current === 'about' ? 'PingFangSC-Regular' : 'PingFangSC-Light'
                    }}>内容分发</Link>
                </li>
                {/*<li style={{*/}
                {/*textAlign: 'left',*/}
                {/*width: '65px',*/}
                {/*textDecoration: 'none',*/}
                {/*color: style.color,*/}
                {/*fontFamily: (current === 'youli' || current === 'recruit') ? 'PingFangSC-Regular' : 'PingFangSC-Light',*/}
                {/*cursor: 'pointer',*/}

                {/*}}>有栗平台*/}
                {/*<em style={{*/}
                {/*width: '10px',*/}
                {/*height: '6px',*/}
                {/*float: 'right',*/}
                {/*marginTop: '33px',*/}
                {/*background: 'url(' + style.arrowImg + ') 0% 0% / cover no-repeat'*/}
                {/*}}></em>*/}
                {/*<div className="branchBubble">*/}
                {/*<li><Link to='/youli'*/}
                {/*className={current == 'youli' ? 'choose' : 'unChoose'}*/}
                {/*style={{*/}
                {/*textDecoration: 'none',*/}
                {/*fontFamily: current === 'youli' ? 'PingFangSC-Regular' : 'PingFangSC-Light',*/}
                {/*}}>供应商入驻</Link></li>*/}
                {/*<li><Link to='/recruit'*/}
                {/*className={current == 'recruit' ? 'choose' : 'unChoose'}*/}
                {/*style={{*/}
                {/*textDecoration: 'none',*/}
                {/*fontFamily: current === 'recruit' ? 'PingFangSC-Regular' : 'PingFangSC-Light',*/}
                {/*}}>招募合伙人</Link></li>*/}
                {/*</div>*/}
                {/*</li>*/}
                <li><Link to='/lizicloud' style={{
                    textDecoration: 'none',
                    color: style.color,
                    fontFamily: current === 'lizicloud' ? 'PingFangSC-Regular' : 'PingFangSC-Light'
                }}>栗子云</Link></li>
                <li><Link to='/' style={{
                    textDecoration: 'none',
                    color: style.color,
                    fontFamily: current === '/' ? 'PingFangSC-Regular' : 'PingFangSC-Light'
                }}>首页</Link></li>
            </ul>
        </div>
    )
}

export class MenuForPhone extends Component {
    constructor(props) {
        super(props)
    }

    state = {
        display: 'none',
        height: '0px',
        itemHeight: '0px',
        childDisplay: false,
        opacity: '0'
    }

    tagClick() {
        const self = this
        this.setState({
            display: 'block',
            height: document.documentElement.clientHeight,
            opacity: '1'
        })
        setTimeout(function () {
            self.setState({
                itemHeight: '60px'
            })
        }, 100)
    }

    closeClick() {
        const self = this
        this.setState({
            height: '0px',
            itemHeight: '0px',
            opacity: '0',
            childDisplay: false
        })
        setTimeout(function () {
            self.setState({
                display: 'none',
            })
        }, 500)
    }

    handleChild() {
        this.setState({
            childDisplay: !this.state.childDisplay,
        })
    }

    render() {
        const style = this.props.style
        const {childDisplay, opacity} = this.state
        return (
            <div>
                <div style={{width: '30px', height: '30px', float: 'right', marginTop: '15px', marginRight: '10px'}}
                     onClick={this.tagClick.bind(this)}>
                    <div style={{width: '100%', height: '3px', marginTop: '6px', backgroundColor: (style == 'white') ? style : '#2D9EFA'}}/>
                    <div style={{width: '100%', height: '3px', marginTop: '6px', backgroundColor: (style == 'white') ? style : '#2D9EFA'}}/>
                    <div style={{width: '100%', height: '3px', marginTop: '6px', backgroundColor: (style == 'white') ? style : '#2D9EFA'}}/>
                </div>
                <div style={{
                    width: '100%', height: this.state.height, position: 'absolute',
                    zIndex: '4000',
                    background: '#2D9EFA',
                    transition: 'all .4s'
                }}>
                    <div style={{display: this.state.display, height: '100%', overflow: 'hidden'}}>
                        <div style={{width: '160px', height: '15%', float: 'left'}}>
                            <img src={this.props.img} alt=""
                                 style={{width: '106px', height: '29px', marginTop: '20px', marginLeft: '20px'}}/>
                        </div>
                        <div style={{width: '40px', height: '15%', float: 'right'}}
                             onClick={this.closeClick.bind(this)}>
                            <div style={{width: '79%', height: '50%', marginTop: '75%'}}>
                                <div style={{width: '30px', height: '3px', transform: 'rotate(45deg)', background: 'white', position: 'absolute'}}/>
                                <div style={{width: '30px', height: '3px', transform: 'rotate(-45deg)', background: 'white', position: 'absolute'
                                }}/>
                            </div>
                        </div>
                        <div className="navListForPhone">
                            <ul className="navListInner">
                                <li style={{height: this.state.itemHeight, transition: 'all .4s'}}>
                                    <Link to='/' style={{
                                        textDecoration: 'none',
                                        color: 'white',
                                        opacity: opacity,
                                        transition: 'all .4s'
                                    }}>首页</Link></li>
                                <li style={{height: this.state.itemHeight, transition: 'all .4s'}}>
                                    <Link to='/lizicloud'
                                          style={{
                                              textDecoration: 'none',
                                              color: 'white',
                                              opacity: opacity,
                                              transition: 'all .4s'
                                          }}>栗子云</Link>
                                </li>
                                {/*<li style={{*/}
                                {/*height: this.state.itemHeight,*/}
                                {/*transition: childDisplay ? 'none' : 'all .4s',*/}
                                {/*color: 'white',*/}
                                {/*opacity: opacity*/}
                                {/*}}*/}
                                {/*onClick={this.handleChild.bind(this)}>*/}
                                {/*<a style={{*/}
                                {/*width: '100%',*/}
                                {/*height: '100%',*/}
                                {/*display: 'block',*/}
                                {/*background: childDisplay ? 'rgba(145, 211, 252, 0.4)' : 'none'*/}
                                {/*}}>有栗</a>*/}
                                {/*<ul className="childListForPhone"*/}
                                {/*style={{display: childDisplay ? 'block' : 'none'}}>*/}
                                {/*<li style={{height: this.state.itemHeight, transition: 'all .4s'}}><Link*/}
                                {/*to='/youli' style={{*/}
                                {/*textDecoration: 'none',*/}
                                {/*color: 'white',*/}
                                {/*opacity: opacity,*/}
                                {/*transition: 'all .4s'*/}
                                {/*}}>供应商入驻</Link></li>*/}
                                {/*<li style={{height: this.state.itemHeight, transition: 'all .4s'}}><Link*/}
                                {/*to='/recruit' style={{*/}
                                {/*textDecoration: 'none',*/}
                                {/*color: 'white',*/}
                                {/*opacity: opacity,*/}
                                {/*transition: 'all .4s'*/}
                                {/*}}>招募合伙人</Link></li>*/}
                                {/*</ul>*/}
                                {/*</li>*/}
                                <li style={{height: this.state.itemHeight, transition: 'all .4s'}}>
                                    <Link to='/content'
                                          style={{
                                              textDecoration: 'none',
                                              color: 'white',
                                              opacity: opacity,
                                              transition: 'all .4s'
                                          }}>内容分发</Link>
                                </li>
                                <li style={{height: this.state.itemHeight, transition: 'all .4s'}}><Link to='/about'
                                                                                                         style={{
                                                                                                             textDecoration: 'none',
                                                                                                             color: 'white',
                                                                                                             opacity: opacity,
                                                                                                             transition: 'all .4s'
                                                                                                         }}>关于我们</Link>
                                </li>
                                {/*<li style={{height: this.state.itemHeight, transition: 'all .4s'}}><Link to='/join'*/}
                                {/*style={{*/}
                                {/*textDecoration: 'none',*/}
                                {/*color: 'white',*/}
                                {/*opacity: opacity,*/}
                                {/*transition: 'all .4s'*/}
                                {/*}}>加入我们</Link>*/}
                                {/*</li>*/}
                                {/*<li style={{height: this.state.itemHeight, transition: 'all .4s'}}><Link to='/contact'*/}
                                {/*style={{*/}
                                {/*textDecoration: 'none',*/}
                                {/*color: 'white',*/}
                                {/*opacity: opacity,*/}
                                {/*transition: 'all .4s'*/}
                                {/*}}>联系我们</Link>*/}
                                {/*</li>*/}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const NaviBar = ({device, state, current}) => {
    window.debugger(device, state.current)
    const style = {
        origin: {
            background: 'transparent',
            img: './images/logo1.png',
            // btImg:'./images/goBack.png',
            btImg_phone: './images/goBack_phone.png',
            color: 'white',
            arrowImg: '../images/arrowStore/arrowWhite.png'
        },
        changed: {
            background: 'white',
            img: './images/logo2.png',
            // btImg:'./images/goBacks.png',
            btImg_phone: './images/goBack_phones.png',
            color: 'black',
            arrowImg: '../images/arrowStore/arrowBlack.png'
        }

    }
    const handleStyle = state === 'transparent' ? style.origin : style.changed
    const showImg = current == 'join' ? device == 'pc' ? handleStyle.img : handleStyle.btImg_phone : handleStyle.img
    const isShadow = state === 'transparent' ? '' : 'naviShadow'
    return (
        <div id="naviBar" className={isShadow} style={{
            width: '100%',
            height: '73px',
            position: 'fixed',
            background: handleStyle.background,
            zIndex: 3000
        }}>
            <div className="pageCenter">
                <div style={{width: '160px', height: '73px', float: 'left'}}>
                    <Link to='/'>
                        <img src={showImg} alt=""
                             style={{
                                 width: (current == 'about' ? device == 'pc' ? '106px' : '93px' : '106px'),
                                 height: (current == 'about' ? device == 'pc' ? '29px' : '25px' : '29px'),
                                 marginTop: (current == 'join' ? device == 'pc' ? '20px' : '22.5px' : '20px'),
                                 marginLeft: current == 'join' ? device == 'pc' ? '0px' : '20.5px' : device == 'pc' ? '0px' : '10px'
                             }}
                        />
                    </Link>
                </div>
                {device == 'pc' ?
                    <Menu style={handleStyle} current={current}/> :
                    <MenuForPhone style={handleStyle.color} img={style.origin.img}/>}
            </div>
        </div>
    )
}

NaviBar.propTypes = {
    device: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
    current: PropTypes.string.isRequired
}

export default NaviBar

// <li><Link to='#'>产品介绍</Link></li>
// <li><Link to='#'>栗子云平台</Link></li>
// <li><Link to='#'>合作伙伴</Link></li>
// <li><Link to='#'>关于我们</Link></li>
