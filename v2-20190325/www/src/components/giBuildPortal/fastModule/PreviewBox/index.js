import React,{Component} from 'react'
import './index.css'

export default class PreviewBox extends Component {
    constructor(props){
        super(props)
        this.state = {
            page: '1'
        }
    }
    shouldComponentUpdate(nextProps,nextState){
        if(this.props.pageNo!=nextProps.pageNo){
            return false
        }else{
            return true
        }
    }
    goPrev=()=>{
        if(this.state.page!=1){
            this.setState({
                page: 1
            })
        }
    }
    goNext=()=>{
        if(this.state.page!=2){
            this.setState({
                page: 2
            })
        }
    }
    render(){
        const {page} = this.state
        const {templateItems,params,groupParams} = this.props
        const titleItem = templateItems.find(v => v.code=='H5_PAGE_TITLE')
        const descriptionItem = templateItems.find(v => v.code=="H5_GROUP_DESCRIBE")
        const titleCss = titleItem?eval('('+titleItem.css+')'):{}
        const descriptionCss = descriptionItem?eval('('+descriptionItem.css+')'):{}
        return (
            <div className="previewBox">
                <div className="title">{page==1?'页面一：未满100人':'页面二：超过100人'}</div>
                <div className="preview">
                    <div className={page==2?"arrowLeft active":"arrowLeft"} onClick={this.goPrev}></div>
                    <div className="phone">
                        <div className="innerPhone">
                            <div className="innerBox" style={{left:page=='1'?'0':'-100%'}}>
                                <div className="page" style={{background: `url(${params.backgroundPicUrl}) no-repeat center/cover`}}>
                                    <div className="pageTitle" style={titleCss}>{titleItem?titleItem.label:'页面标题'}</div>
                                    <div className="intro" style={descriptionCss}>
                                        <h6>{descriptionItem&&descriptionItem.label?'群介绍':''}</h6>
                                        <p>{descriptionItem?descriptionItem.label:''}</p>
                                    </div>
                                    <div className="codeBox">
                                        <div className="name">
                                            <img src={process.env.PUBLIC_URL+"/images/icon/logo1.png"} alt=""/>{groupParams.groupName?groupParams.groupName:'群名称'}
                                        </div>
                                        <img src={process.env.PUBLIC_URL+"/images/icon/qrcode.png"} alt="" className="code" style={{width:'121px',height:'121px'}}/>
                                        <div className="info">该二维码7天内(11月28日前)有效<br/>失败请刷新</div>
                                        <div className="refresh">刷新二维码</div>
                                    </div>
                                </div>
                                <div className="page" style={{background: `url(${params.backgroundPicUrl}) no-repeat center/cover`}}>
                                    <div className="pageTitle" style={titleCss}>{titleItem?titleItem.label:'页面标题'}</div>
                                    <div className="intro" style={descriptionCss}>
                                        <h6>群介绍</h6>
                                        <p>{descriptionItem?descriptionItem.label:'群公告'}</p>
                                    </div>
                                    <div className="codeBox">
                                        <img src={process.env.PUBLIC_URL+"/images/icon/qrcode.png"} alt="" className="code" style={{width:'128px',height:'128px'}}/>
                                        <div className="number">#345345</div>
                                        <div className="info">请扫描上方二维码添加好友<br/>发送验证码后获得群邀请</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={page==1?"arrowRight active":"arrowRight"} onClick={this.goNext}></div>
                </div>
            </div>
        )
    }
}