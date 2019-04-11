import React,{Component} from 'react'
import {LoadCartoonWhite} from './LoadCartoon'

export default class VideoMsgBox extends Component {
    constructor(props){
        super(props)
        this.state = {
            maxNum: 5,
            loadingShow: true,
            imgShow: false,
            alertShow: false
        }
        this.reLoadHandle = this.reLoadHandle.bind(this)
        this.loadResource = this.loadResource.bind(this)
    }
    loadErrorHandle (e,src) {
        let {maxNum} = this.state
        let imgObj = this.refs.imgObj
        if(maxNum > 0){
            this.setState({
                maxNum: --maxNum
            })
            setTimeout(function(){
                imgObj.src=src;
            },1000);
        }else{
            imgObj.style.height ='70px';
            imgObj.src=process.env.PUBLIC_URL+'/images/icon/imgFail.png'
            this.setState({
                loadingShow: false,
                imgShow: true,
                alertShow: true
            })
        }
    }
    reLoadHandle (src) {
        this.setState({
            maxNum: 2,
            loadingShow: true,
            imgShow: false,
            alertShow: false
        })
        this.refs.imgObj.src=src
    }
    loadSuccessHandle (e) {
        if(e.target.src.substr(-11,11)=='imgFail.png'){
            this.setState({
                loadingShow: false,
                imgShow: true,
                alertShow: true
            })
        }else {
            this.refs.imgObj.style.maxHeight ='126px';
            // this.refs.imgObj.style.maxWidth ='126px';
            this.setState({
                loadingShow: false,
                imgShow: true,
                alertShow: false
            })
        }
    }


    loadResource(){
      const {src } = this.props
      let videoDom = document.createElement('video');
      videoDom.src = src
      videoDom.load()
      // videoDom.addEventListener('canplaythrough',()=>{
        this.setState({
          loadingShow: false,
          imgShow: true,
          alertShow: false
        })
      //   console.// console.log(videoDom.width)
      //   console.// console.log(videoDom.height)
      // })
    }

    componentDidMount(){
      this.loadResource()
    }


    render () {
        let  {loadingShow,imgShow,alertShow} = this.state
        const {src,img } = this.props
        return (<div className='imgMsgBox'>
                    <div className="loadingBox" style={{display:loadingShow?'block':'none'}}>
                        <LoadCartoonWhite />
                    </div>
                    <div className = 'fakeView'
                    onClick = {(e) => {this.props.action(src)}}
                    style={{display:imgShow?'inline-block':'none'}}
                    >
                        <img className = 'fakeViewimg' src={img} alt=""/>
                        <div className = 'fakeViewbutt icon-gm'></div>
                    </div>
                    <div className='alertBox' onClick={()=>{this.reLoadHandle(this.props.src)}} style={{display:alertShow?'block':'none'}}></div>
                </div>)
    }
}
