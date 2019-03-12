import React,{Component} from 'react'

const textWraperStyle = {
    fontFamily: 'PingFangSC-Light',
    fontSize: '50px',
    color: '#FFFFFF',
    letterSpacing: 0,
    lineHeight: '40px',
    position: 'absolute',
    top: '41.8%',
    left: '15.5%'
}

const btnWraperStyle = {
    height:'44px',
    width:'140px',
    border:'2px solid #FFFFFF',
    borderRadius:'4px',
    fontFamily: 'PingFangSC-Regular',
    fontSize: '20px',
    color: '#FFFFFF',
    letterSpacing: 0,
    textAlign: 'center',
    lineHeight: '44px',
    position: 'absolute',
    top:'59.1%',
    left:'17.5%',
    zIndex:5000
}
const TextWraper = ({text,style}) => {
    return (
        <div style={Object.assign({},textWraperStyle,style)} >
            {text}
        </div>
    )
}

 class BtnWraper extends Component{
     clickHandle () {

     }
     render () {
        return (
            <div style={btnWraperStyle} onClick={this.clickHandle.bind(this)}>
                <a style={{display:'block',width:'100%',height:'100%'}}>了解详情</a>
            </div>
        )
     }
 }


class InnerWraper extends Component{
    constructor(props){
        super(props)
    }
    render () {
       return (
        <div style={{height:'100%',position:'relative'}}>
            <TextWraper text={this.props.text} style={this.props.style} />
        </div>
       )
    }
}

export default InnerWraper
