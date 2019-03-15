import React, { Component } from 'react'
import ButtonBox from '../ButtonBox'
import './index.css'

export default class GuideBox extends Component {
    constructor() {
        super();
        this.state={
            guideShow: true
        }
    }
    componentDidMount () {
        var img = new Image()
        img.src = this.props.loadImg
    }
    render() {
        const {guideShow} = this.state
        const { title, content, btnTxt, btnFunc, btnTxt2, btnFunc2, bigBg } = this.props
        return (
            <div className={guideShow?'guideModel':''} style={{background: `url(${bigBg}) 0 0/cover no-repeat`}}>
            {guideShow?
                <div className="guideBox">
                    <p className="title">{title}</p>
                    <p className="content">{content}</p>
                    <div className="btnBox">
                        <ButtonBox btnFunc={btnFunc} styleName={"gray"} btnTxt={btnTxt}/>
                    {
                        btnTxt2?
                        <ButtonBox btnFunc={btnFunc2} styleName={"line"} btnTxt={btnTxt2}/>:''
                    }
                    </div>
                    
                </div>
            :''}
            </div>
        )
    }
}