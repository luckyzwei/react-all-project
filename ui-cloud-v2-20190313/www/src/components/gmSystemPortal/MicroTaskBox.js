import React, { Component } from 'react'
import ImgModal from './ImgModal'
import $ from 'jquery'

const getTime = (time) => {
  const result = new Date(time)
  let year = result.getFullYear().toString()
  let month = (result.getMonth()+1).toString()
  let day = result.getDate().toString()
  let hours = (result.getHours()).toString()
  let minutes = result.getMinutes().toString()
  let seconds = result.getSeconds().toString()
  month = month.length == 1 ? '0'+month : month
  day = day.length == 1 ? '0'+day : day
  hours = hours.length == 1 ? '0'+hours : hours
  minutes = minutes.length == 1 ? '0'+minutes : minutes
  seconds = seconds.length == 1 ? '0'+seconds : seconds
  return year+'/'+month+'/'+day+' '+hours+':'+minutes
}


const cDataParse = (str) => {
    if(str.includes('CDATA')){
      return str.substr(9,str.length-12)
    }else {
      return str
    }
  }

const MicroTaskText = ({item}) => {
    return (
        <div className="innerBox textBox">
            <p>{item.content}</p>
        </div>
    )
}

const MicroTaskInner = ({articleMore,innerSrc,articleTitle}) =>{
    if(articleMore!=null){
        articleMore = articleMore.length<30 ?articleMore:articleMore.slice(0,30)+'...';
    }
    if(articleTitle!=null){
        articleTitle = articleTitle.length<30 ?articleTitle:articleTitle.slice(0,30)+'...';
    }
    innerSrc = innerSrc==null||innerSrc==''?process.env.PUBLIC_URL+"/images/icon/liziLogo.png":innerSrc
    return(
    <div className="innerBox linkBox">
        <p className="title">{articleTitle}</p>
        <div className="nextBox" >
            <div className="article">
                {articleMore}
            </div>
            <div className="innerPic"><img src={innerSrc} alt="article" className="innerImg" /></div>
        </div>
    </div>
    )
}


const MicroProgram = ({data}) =>{
    let XML = data.files.find(v => v.fileType=='text').fileContent
    let weappiconurl = $(XML).find('weappiconurl')
    let titleLogo = weappiconurl.length>0?weappiconurl.html().split('[')[2].slice(0,-5):process.env.PUBLIC_URL+'/images/icon/wxapp_logo.png'
    let sourcedisplayname = $(XML).find('sourcedisplayname')
    let titleName = sourcedisplayname.length>0?sourcedisplayname.text():'小程序'
    titleName = titleName.length<30 ?titleName:titleName.slice(0,30)+'...'; 
    let xmlContent = $(XML).find('title')
    let content = cDataParse(xmlContent.length>0?xmlContent.eq(0).text():'')
    let programImg = data.files.find(v => v.fileType=='image')?data.files.find(v => v.fileType=='image').filePath:process.env.PUBLIC_URL+'/images/icon/wxapp_img.png'

    return (
        <div className="innerBox wxappBox">
            <p className="title">
                <img src={titleLogo} alt=""/>
                <span>{titleName}</span>
            </p>
            <div className="content">{content}</div>
            <div className="nextBox" >
                <div className="programImg" style={{backgroundImage:'url('+programImg+')'}}></div>
            </div>
            <div className="programLogo">
                <div className="img icon-gm"></div>小程序
            </div>
        </div>
    )
}



const MicroTaskImg = ({data,modalShow,modalSrc,closeModal,yleidModal})=>{
    return (
        <div className="innerBox imgBox">
            {
                data.files.map((v,i) => {
                    return (
                        <div key={i} style={{backgroundImage:`url(${v.filePath})`}} alt="article" className="innerPic" onClick = {(e) => {
                            yleidModal(v.filePath)
                        }}>
                        </div>
                    )
                })
            }
            {
                modalShow ? <ImgModal src = {modalSrc}  closeClickHandle = {closeModal} /> : ''
            }
        </div>
    )
}

class MicroTaskBox extends Component{
    constructor(props){
        super(props)
        this.state = {
            height: 0,
            isExtend:false,
            changeHeight:0,
            modalSrc : '',
            modalShow : false,
            carouselArrow:false
        }
    }
    componentDidMount () {
        this.setState({
            isExtend: this.props.id === this.props.currentId
        })
        let height = this.refs.wrapBox.offsetHeight
        this.setChangeHeight(0,height)
    }
    componentDidUpdate(prevProps,prevStates){
        if(this.props.task.id!=prevProps.task.id){
            let height = this.refs.wrapBox.offsetHeight
            this.setChangeHeight(0,height)
        }
    }
    clickHandle () {
        if(this.refs.slideBox.offsetHeight == 0 ){
            this.setState({
                isExtend: true
            })
        }else{
            this.setState({
                isExtend: false
            })
        }
        this.props.extendClickHandle();
    }
    // 点击预览图片
    yleidModal(src){
        this.setState({
            modalShow : true,
            modalSrc : src
        })
    }
    closeModal(){
    this.setState({
        modalShow : false,
    })
    }
    // 轮播按钮
    carousel() {
        this.setState({
            carouselArrow: !this.state.carouselArrow
        })
    }
    setChangeHeight (changeHeight,height) {
        this.setState({
            height: height-changeHeight+'px',
            changeHeight: changeHeight
        })
    }
    render () {
        let statusBox;
        let {isExtend,height,modalSrc,modalShow,carouselArrow} = this.state
        let{id,currentId,task} = this.props
        let isCurrent = id === currentId
        let artTitle = this.props.task.title
        if(artTitle!=null){//标题
            artTitle = artTitle.length <20 ? artTitle:artTitle.slice(0,20)+'...'
        }
        let time = this.props.task.sendingTime
        let status = this.props.task.status
        if(status == 6){
            statusBox = <div className='pushNo'>{'未发送'}</div>
        }else if(status == 1){
            statusBox = <div className='pushed pushNo'>{'发送中'}</div>
        }else if(status == 2){
            statusBox = <div className='pushed pushNo'>{'已发送'}</div>
        }else if(status == 4||status == 5){
            statusBox = <div className='pushFail'>{'发送失败'}</div>
        }
        return (
            <div className="pushArticle clearfix">
                <div className="pushBox" onClick={this.clickHandle.bind(this)}>
                    <div className="pushTime">{time!=null?getTime(time).slice(0,11):'-- : --'}</div>
                    <div className="pushTime">{time!=null?getTime(time).slice(-5):''}</div>
                    {statusBox}
                    <div className={isCurrent&&isExtend?'arrowBtn':'arrowBtn upArrow'}></div>
                </div>
                <div className="pushTitle">{artTitle}</div>
                <div ref='slideBox' className='slideBox' style={{height:isCurrent&&isExtend?height:'0'}}>
                    <div ref='wrapBox' className="wrapBox">
                    {
                        task.items.map(item => {
                            return item.type==0
                                ?<MicroTaskText item={item} key={item.id}/>
                                :item.type==1||item.type==4
                                    ?<MicroTaskInner
                                        key={item.id}
                                        articleMore={item.content}
                                        articleTitle={item.title}
                                        innerSrc={item.files.find(file => file.fileType=='image').filePath}
                                        />
                                    :item.type==3
                                        ?<MicroTaskImg
                                            key={item.id}
                                            data = {item}
                                            modalShow={modalShow}
                                            modalSrc={modalSrc}
                                            yleidModal={this.yleidModal.bind(this)}
                                            closeModal={this.closeModal.bind(this)}
                                        />
                                        :<MicroProgram
                                            key={item.id}
                                            data = {item}
                                        />
                        })
                    }
                    </div>
                </div>
            </div>
        )
    }
}

export default MicroTaskBox
