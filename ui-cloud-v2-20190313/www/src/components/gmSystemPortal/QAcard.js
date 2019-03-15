import React,{Component} from 'react'
import $ from 'jquery'

class QAcard extends Component{
    constructor (props) {
        super(props)
        this.state = {
            isExpand: false,
            maskShow: false
        }
        this.expandClickHandle = this.expandClickHandle.bind(this)
        this.quickAnswer = this.quickAnswer.bind(this)
        this.maskClickHandle = this.maskClickHandle.bind(this)
        this.closeClickHandle = this.closeClickHandle.bind(this)
        this.sendClickHandle = this.sendClickHandle.bind(this)
    }
    expandClickHandle () {
        this.setState({
            isExpand: !this.state.isExpand
        })
    }
    sliceStringHandle (str,length) {
        return str.length<length?str:str.slice(0,length)+'...';
    }
    quickAnswer(e,answer){
        if(e.target.className != "expandBtn"){
            $('#msg_context').html(answer)
        }
    }
    maskClickHandle () {
        this.setState({
            maskShow: true
        })
    }
    closeClickHandle () {
        this.setState({
            maskShow: false
        })
    }
    sendClickHandle () {
        this.setState({
            maskShow: false
        })
    }
    render () {
        let {isExpand,maskShow} = this.state;
        let {item,showImgModal} = this.props;
        const minHeight = '40px'
        return (
            <div className='QAcardBox'>
                <div className={isExpand?'questionBox':'questionBox unExpand'}>
                    <span>Q: </span>
                    <span>{item.problem}</span>
                </div>
                <div style={{height:isExpand?'auto':minHeight,overflow:'hidden',marginTop:'4px'}}>
                    <div className='answerBox ' onDoubleClick={(e) => {this.quickAnswer(e,item.answer)}} style={{height:isExpand?'auto':'40px',minHeight:'40px'}}>
                        <span className="libLabel">自有知识库</span>
                        <span>A: </span>
                        <span title="双击答案复制到发送框">{isExpand?item.answer:this.sliceStringHandle(item.answer,20)}</span>
                    </div> 
                    {
                        isExpand&&item.knowledgeBasePicture.map(v => {
                            return (<img src={v.image} onClick={()=>{showImgModal(v.image)}}/>)
                        })
                    }
                </div>
                <div className={isExpand?'icon-gi expandBtn expanded':'icon-gi expandBtn'} onClick={this.expandClickHandle}></div>
            </div>
        )
    }
}

export default QAcard
