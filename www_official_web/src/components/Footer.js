import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router-dom'
import {basePath} from '../constants/DataModel'
class Footer extends Component {
    render () {
        return (
                <div className="footer">
                    <div className="wrapper pageCenter clearfix">
                        <div className="leftBox">
                            <dl>
                                <dt>产品</dt>
                                <dd><Link to = '/lizicloud' style = {{textDecoration:'none'}}>栗子云</Link></dd>
                                <dd><Link to = '/youli' style = {{textDecoration:'none'}}>内容分发</Link></dd>
                            </dl>
                            <dl>
                                <dt>关于景栗</dt>
                                <dd><Link to = '/about' style = {{textDecoration:'none'}}>关于我们</Link></dd>
                                <dd><Link to = '/contact' style = {{textDecoration:'none'}}>联系我们</Link></dd>
                            </dl>
                            <dl>
                                <dt>加入我们</dt>
                                <dd><Link to = '/about#joinus' style = {{textDecoration:'none'}}>加入 Gemii</Link></dd>
                            </dl>
                        </div>
                        <div className="rightBox">
                            <div className="language">
                                <span className="zh current">简体中文 </span>
                                <span>|</span>
                                <span className="en"> English</span>
                            </div>
                            <div>
                              <div style = {{width:'auto',float:'none'}}>
                                  <a href = 'http://www.miitbeian.gov.cn'
                                    style = {{textDecoration:'none',color:'#FFFFFF'}}
                                    >
                                  沪 ICP 备 16026551 号-2</a>
                              </div>
                            </div>
                        </div>
                    </div>
                    <p className="copyright">Copyright &copy;gemii 上海景栗信息科技有限公司</p>
                </div>
        )
    }
}

export default Footer
