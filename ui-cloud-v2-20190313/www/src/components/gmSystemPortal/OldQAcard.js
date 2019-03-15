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
            $('#msg_context').html(answer.content)
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
        let {question,answers} = this.props;
        const minHeight = this.props.answers[0].type == 'text'?'40px':'110px'
        return (
            <div className='QAcardBox'>
                <div className={isExpand?'questionBox':'questionBox unExpand'}>
                    <span>Q: </span>
                    <span>{question}</span>
                </div>
                <div style={{height:isExpand?'auto':minHeight,overflow:'hidden'}}>
                    {
                        answers.map(answer => {
                            if (answer.type == 'text') {
                                // let answerCont = ''
                                // answer.content.map(v => answerCont = answerCont+v.content+'</br>')
                                let answerContent = isExpand?answer.content:this.sliceStringHandle(answer.content,20);
                                return (
                                    <div className='answerBox' onDoubleClick={(e) => {this.quickAnswer(e,answer)}} style={{minHeight:isExpand?'0px':'40px'}}>
                                        <span className="libLabel">{answer.source}</span>
                                        <span>A: </span>
                                        <span title="双击答案复制到发送框">{answerContent}</span>
                                    </div>
                                )
                            }else{
                                {/* 知识卡 */}
                            }
                        })
                    }
                    {/* 
                    let text = '1、轻度拉肚子：每天大便5—6次，甚至多至10余次，大便呈蛋花样或水样，黄或黄绿色，有白色小块，可有低热，溢奶的情况，精神饮食尚好或略减，体重不增或略降，无脱水。 2、中度拉肚子：每天大便10次，稀水便、气味酸且臭，可能中度发烧。 3、重度拉肚子：每天大便10次以上，水样便，黄色，呕吐，发热，尿少，食欲差，体重下降，迅速出现脱水和酸中毒，低钾、钙、镁血症等。 4、部分宝宝可出现明显脱水、酸中毒、电解质紊乱，如低钾或低镁等'
                    text = isExpand?text:this.sliceStringHandle(text,50);
                    <div className='kwCardBox'>
                        <div className='cardImgBox' onClick={this.maskClickHandle}>
                            <div className="libLabel">栗子妈妈知识库</div>
                            <img src='https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1506073529271&di=47ad50d707bb11b831cf2cd52513596c&imgtype=0&src=http%3A%2F%2Fd.hiphotos.baidu.com%2Fzhidao%2Fpic%2Fitem%2F71cf3bc79f3df8dc9a65cb8acb11728b47102854.jpg' alt=''/>
                        </div>
                        <div className='cardText' style={{height:isExpand?'auto':'114px'}} onDoubleClick={(e) => {this.quickAnswer(e,text)}}>{text}</div>
                        <div className={maskShow?'card-mask':'card-mask card-mask-hide'}>
                            <div className='card-imgBox'>
                                <img className='card-img' src='' alt='知识卡片图片'/>
                            </div>
                            <div className='closeBtn' onClick={this.closeClickHandle}>X</div>
                            <div className='sendBtn' onClick={this.sendClickHandle}>发送到当前群</div>
                        </div>
                    </div> */}
                </div>
                <div className={isExpand?'icon-gi expandBtn expanded':'icon-gi expandBtn'} onClick={this.expandClickHandle}></div>
            </div>
        )
    }
}

export default QAcard
