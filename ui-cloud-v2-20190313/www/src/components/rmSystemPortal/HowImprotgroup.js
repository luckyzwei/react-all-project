import React,{Component} from 'react';

export default class HowImprotgroup extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <div style={{height:'100%', width:'100%'}} className="improtgroup">
                <div className="improtgroup-stsps">
                    <p className='title'>导入微信群步骤</p>
                    <div className="improtgroup-box">
                        <div className="step-box">
                            <img className="img" src={process.env.PUBLIC_URL+"/images/icon/rm-step1.png"}/>
                            <div className="step">第一步：</div>
                            <div className="cont">选择一个有剩余额度的小助手，点击查看二维码并打开微信添加「小助手」为好友；</div>
                        </div>
                        <div className="next-icon icon-gi"></div>
                        <div className="step-box">
                            <img className="img" src={process.env.PUBLIC_URL+"/images/icon/rm-step2.png"}/>
                            <div className="step">第二步：</div>
                            <div className="cont">根据页面文字提示，将验证码（不包含#）私聊发给小助手，进行绑定和激活。</div>
                        </div>
                        <div className="next-icon icon-gi"></div>
                        <div className="step-box">
                            <img className="img" src={process.env.PUBLIC_URL+"/images/icon/rm-step3.png"}/>
                            <div className="step">第三步：</div>
                            <div className="cont">将小助手拉入你需要管理的群内，并在群内发送任意一条文本消息，刷新群管理列表进行查看。</div>
                        </div>
                    </div>
                    <div className="close icon-home" onClick={this.props.changeShowHow}></div>
                </div>
            </div>
        )
    }
}
