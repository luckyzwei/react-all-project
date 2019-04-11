import React,{Component} from 'react'

class KWcard extends Component {
    constructor (props) {
        super(props)
        this.state = {
            isExpand: false,
            maskShow : false
        }
        this.expandClickHandle = this.expandClickHandle.bind(this)
        this.maskClickHandle = this.maskClickHandle.bind(this)
        this.closeClickHandle = this.closeClickHandle.bind(this)
        this.sendClickHandle = this.sendClickHandle.bind(this)
    }
    expandClickHandle () {
        this.setState({
            isExpand: !this.state.isExpand
        })
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
    sliceStringHandle (str) {
        return str.length<14?str:str.slice(0,14)+'...';
    }
    render () {
        let {isExpand,maskShow} = this.state;
        let {title,text} = this.props;
        let status = isExpand?'收缩':'展开';
        title = isExpand?title:this.sliceStringHandle(title);
        text = isExpand?text:this.sliceStringHandle(text);
        return (
            <div className='KWcardBox'>
                <div className='cardImgBox' style={{background:'red'}} onClick={this.maskClickHandle}>
                    <img src='' alt=''/>
                </div>
                <div className='cardTextBox'>
                    <div className='cardTitle'>{title}</div>
                    <div className='cardText'>{text}</div>
                    <div className='expandBtn' onClick={this.expandClickHandle}>{status}</div>
                </div>
                <div className={maskShow?'card-mask':'card-mask card-mask-hide'}>
                    <div className='card-imgBox'>
                        <img className='card-img' src='' alt='知识卡片图片'/>
                    </div>
                    <div className='closeBtn' onClick={this.closeClickHandle}>X</div>
                    <div className='sendBtn' onClick={this.sendClickHandle}>发送到当前群</div>
                </div>
            </div>
        )
    }
}

export default KWcard