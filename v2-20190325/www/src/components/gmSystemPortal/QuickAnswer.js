import React,{Component} from 'react'
import $ from 'jquery'
import promiseXHR from '../../funStore/ServerFun'
import AuthProvider from '../../funStore/AuthProvider'
import {API_PATH} from '../../constants/OriginName'

class AnswerBox extends Component {
    constructor(props){
        super(props)
        this.state = {
            initHeight: '17'
        }
        this.mouseEnterHandle = this.mouseEnterHandle.bind(this)
        this.mouseLeaveHandle = this.mouseLeaveHandle.bind(this)
        this.quickAnswer = this.quickAnswer.bind(this)
    }
    componentDidMount(){
        this.setState({
            initHeight: this.refs.answer.offsetHeight
        })
        this.refs.answer.style.height = '17px'
        this.refs.answer.className = 'answer noWrap'
    }
    mouseEnterHandle(){
        this.refs.answer.style.height = this.state.initHeight + 'px'
        this.refs.answer.className = 'answer'
        this.refs.answer.style.color = '#58A7F8'
    }
    mouseLeaveHandle(){
        this.refs.answer.style.height = '17px'
        this.refs.answer.style.color = '#383E46'
        setTimeout(() => {
            this.refs.answer.className = 'answer noWrap'
        }, 100)
    }
    quickAnswer(e){
        $('#msg_context').html(this.props.content)
    }
    render () {
        const {initHeight} = this.state
        // console.log(initHeight)
        return (
            <div className="answerBox" onMouseEnter={this.mouseEnterHandle} onMouseLeave={this.mouseLeaveHandle}>
                <div className="answer" ref="answer" onClick={this.quickAnswer}>
                    'A: '{this.props.content.length<90?this.props.content:this.props.content.slice(0,90)+'...'}
                </div>
                {/* <div className="improper icon-background">
                    <div>
                        <span>此条回复不合适</span>
                    </div>
                </div> */}
            </div>  
        )
    }
}

class OldAnswerBox extends Component {
    constructor(props){
        super(props)
        this.state = {
            initHeight: '17'
        }
        this.mouseEnterHandle = this.mouseEnterHandle.bind(this)
        this.mouseLeaveHandle = this.mouseLeaveHandle.bind(this)
        this.quickAnswer = this.quickAnswer.bind(this)
    }
    componentDidMount(){
        this.setState({
            initHeight: this.refs.answer.offsetHeight
        })
        this.refs.answer.style.height = '17px'
        this.refs.answer.className = 'answer noWrap'
    }
    mouseEnterHandle(){
        this.refs.answer.style.height = this.state.initHeight + 'px'
        this.refs.answer.className = 'answer'
        this.refs.answer.style.color = '#58A7F8'
    }
    mouseLeaveHandle(){
        this.refs.answer.style.height = '17px'
        this.refs.answer.style.color = '#383E46'
        setTimeout(() => {
            this.refs.answer.className = 'answer noWrap'
        }, 100)
    }
    quickAnswer(e){
        $('#msg_context').html(this.props.content)
    }
    render () {
        const {initHeight} = this.state
        return (
            <div className="answerBox" onMouseEnter={this.mouseEnterHandle} onMouseLeave={this.mouseLeaveHandle}>
                <div className="answer" ref="answer" onClick={this.quickAnswer}>
                    {'A: '+this.props.content.length<90?this.props.content:this.props.content.slice(0,90)+'...'}
                </div>
                {/* <div className="improper icon-background" onClick={this.clickHandle}>
                    <div>
                        <span>此条回复不合适</span>
                    </div>
                </div> */}
            </div>  
        )
    }
}

export default class QuickAnswer extends Component {
    render (){
        const {answerType,answerCss,answerList,groupList,questionTxt} = this.props
        let flag = 0
        return (
            <div className='quickAnswer' style={answerType=='UP'?{
                    left: answerCss.x,
                    top: answerCss.y
                }:{
                    left: answerCss.x,
                    bottom: answerCss.y
                }}>
                <div className="inner">
                    <p>快速回复</p>
                    <div className="content">
                        { 
                            answerList.slice(0,3).map((item,index) => {
                                if(flag<3){
                                    if(item.origin_type==1){
                                        return (<div className="qaBox" key={index}>
                                            <div className="question">
                                                {'Q: '+item.problem}
                                            </div>
                                                {
                                                    item.answer.map((answer,index) => {
                                                        if(flag<3){
                                                        flag++
                                                        return <OldAnswerBox key={index} questionTxt={questionTxt} question={item.question} content={answer.content} type={answer.type} libName={answer.source} groupList={groupList}/>
                                                        }
                                                    })
                                                }
                                        </div>)
                                    }else{
                                        flag++
                                        return(
                                            <div className="qaBox" key={index}>
                                                <div className="question">
                                                    {'Q: '+item.problem}
                                                </div>
                                                    <AnswerBox key={index} questionTxt={questionTxt} question={item.problem} content={item.answer} type={item.type} libName={item.source} groupList={groupList}/>
                                            </div>
                                        )
                                    }
                                }
                            })
                        }
                    </div>
                    <div className="moreBtn" onClick={()=>{$('#menuWrapper1').trigger('click')}}>
                        搜索更多
                    </div>
                </div>
            </div>
        )
    }
}