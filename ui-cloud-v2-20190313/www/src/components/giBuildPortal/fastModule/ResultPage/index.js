import React,{Component} from 'react'
import ButtonBox from '../../../shareComponent/ButtonBox'

export default class ResultPage extends Component {
    constructor(props){
        super(props)
        this.state={
            url:props.qrUrl,
            time:5
        }
    }
    componentDidMount(){
        this.countDown()
    }
    componentWillUnmount(){
        clearTimeout(this.timer)
    }
    countDown =() => {
        let time=this.state.time
        if(time>0){
            this.timer = setTimeout(()=>{
                this.setState({
                    time: --time
                },this.countDown)
            }, 1000)
        }else{
            this.props.actions.goTo('/v2/GIScope')
        }
    }
    render(){
        const {time} = this.state
        return (
            // <div className='SaveFail'>
            //     <div className="SaveFail-content" style={{width:'400px'}}>
            //         <div className="accurate-success">
            //             <span className="accurate-icon"></span>
            //             开始建群
            //         </div>
            //         {/* <div className="accurate-qr">
            //             <div className="qr-img">
            //                 <img src={url} alt=""/>
            //             </div>
            //             <div className="qr-footer">请<span className="qr-download" onClick={this.downloadHandle}>下载入群二维码</span>，<br/>建群成功后发给入群用户扫描</div>
            //         </div> */}
            //         <p style={{fontSize: '16px',marginBottom: '3em'}}>请收到建群成功系统通知后<br/>前往「群管理」—「建群记录」下载入群二维码</p>
            //         <div className="SaveFail-content-btnbox">
            //             <ButtonBox
            //                 btnTxt={'立即前往'}
            //                 isCancel={false}
            //                 btnStyle={{margin: 0}}
            //                 btnFunc={()=>{this.props.actions.goTo('/v2/GIScope')}}
            //             />
            //         </div>
            //     </div>
            // </div>
            <div className='SaveSuccess'>
                <div className="SaveSuccess-content">
                    <div className="accurate-success">正在建群中…</div>
                    <img src={process.env.PUBLIC_URL+'/images/icon/build-success.png'} alt='' className="SaveSuccess-content-img" />
                    <div className="SaveSuccess-content-txt">
                        <span className="SaveSuccess-content-txt-blue">{time}s</span>
                        后自动回到托管群页面
                    </div>
                    <ButtonBox
                        btnTxt={'立即前往'}
                        isCancel={false}
                        btnStyle={{margin: '30px auto'}}
                        btnFunc={()=>{this.props.actions.goTo('/v2/GIScope')}}
                    />
                </div>
            </div>
        )
    }
}