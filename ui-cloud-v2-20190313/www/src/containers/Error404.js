import React,{Component} from 'react'

export default class Error404 extends Component {
    render(){
        return (
            <div className="errorWrapper">
                <div className="leftImg">
                    <img src={`${process.env.PUBLIC_URL}/images/icon/404.png`} alt=""/>
                </div>
                <div className="rightText">
                    <h6>页面错误啦</h6>
                    <p>可能是网络原因哦，请检查你的网络设置～</p>
                </div>
            </div>
        )
    }
}