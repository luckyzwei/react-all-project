import React,{Component} from 'react'
import './index.css'
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