import React,{Component} from 'react'

export default class Error503 extends Component {
    render(){
        return (
            <div className="errorWrapper">
                <div className="leftImg">
                    <img src={`${process.env.PUBLIC_URL}/images/icon/503.png`} alt=""/>
                </div>
                <div className="rightText">
                    <h6>系统维护</h6>
                    <p>程序员小哥哥正在努力开发中，敬请期待～</p>
                </div>
            </div>
        )
    }
}