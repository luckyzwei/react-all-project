/**
 * 创建时间:2018-08-24 09:52:34
 * 作者：sufei  Xerath
 * 版本号：1.0
 **/
import React, { Component } from 'react'
import './index.css'

export default class AidBox extends Component {
    constructor() {
        super();
        this.state = {}
    }
    componentDidMount() { }
    componentWillUnmount() { }
    render() {
        let { } = this.state;
        let { AidHas } = this.props;
        return (
            <div className='AidBox'>
                {
                    (AidHas && AidHas.service) ?
                        <div className='service AidBoxItem'>
                            <span className="AidBoxItemImg"></span>
                            <span className="AidBoxItemTxt">客服助手</span>
                        </div>
                        :
                        ""
                }
                {
                    (AidHas && AidHas.holding) ?
                        <div className='holding AidBoxItem'>
                            <span className="AidBoxItemImg"></span>
                            <span className="AidBoxItemTxt">投放助手</span>
                        </div>
                        :
                        ""
                }
                {
                    (AidHas && AidHas.putting) ?
                        <div className='putting AidBoxItem'>
                            <span className="AidBoxItemImg"></span>
                            <span className="AidBoxItemTxt">邀请助手</span>
                        </div>
                        :
                        ""
                }
            </div>
        )
    }
}
