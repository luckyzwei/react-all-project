import React, {Component, PropTypes} from "react";
import MainMemberWrapper from "../components/MainMemberWrapper";
import YouLiRuleWrapper from '../components/YouLiRuleWrapper'
import { hashHistory } from 'react-router'
import { Link } from 'react-router-dom'
import $ from "jquery";

export const FlipWraper = ({actions, withButton, type,item}) => {

    const leftFlip = () => {
        actions.leftFlip()
    }
    const rightFlip = () => {
        actions.rightFlip()
    }
    const scrollFlip = () => {
        $(document.body).animate({scrollTop: document.documentElement.clientHeight}, 'slow')
        $(document.documentElement).animate({scrollTop: document.documentElement.clientHeight}, 'slow')
    }
    window.debugger('item',item,0)
    const button = withButton ? item===0?<div style={{
        position: 'absolute', left: '15.5%', top: '60%',
        width: '124px', height: '42px',
        zIndex: 3,
        color: 'white',
        textAlign: 'center',
        lineHeight: '42px',
        fontSize: '20px',
        borderRadius: '4px',
        backgroundImage: 'linear-gradient(-269deg, #EB3349 0%, #F45C43 68%)',
        cursor: 'pointer'
    }}
    ><Link to='/youli' style = {{textDecoration : 'none',color : 'white'}} >了解详情</Link></div>:<div style={{
        position: 'absolute', left: '15.5%', top: '60%',
        width: '120px', height: '38px',
        zIndex: 3,
        color: 'white',
        textAlign: 'center',
        lineHeight: '38px',
        fontSize: '20px',
        border: 'solid 2px #FFFFFF',
        borderRadius: '4px',
        cursor: 'pointer'
    }}
        onClick={scrollFlip}
    >了解详情</div> :null

    return (
        <nav style={{position: 'absolute', width: '100%', height: '100%', zIndex: type == 'MainMember' ? -5 : 2}}>
            <ul style={{listStyle: 'none', margin: '0', position: 'absolute', width: '100%', height: '100%'}}>
                <li style={{position: 'absolute', width: '20%', height: '100%', left: 0, top: 0}}>
                    <button className="flipButton" style={{left: '10%', top: '50%'}} onClick={leftFlip}>
                        <span className="arrow-icon-left"></span>
                    </button>
                </li>
                <li style={{position: 'absolute', width: '20%', height: '100%', right: 0, top: 0}}>
                    <button className="flipButton" style={{right: '10%', top: '50%'}} onClick={rightFlip}>
                        <span className="arrow-icon-right"></span>
                    </button>
                </li>
            </ul>
            {button}
        </nav>
    )
}
export class FlipWraperForMobile extends Component {

    constructor(props) {
        super(props)
    }

    state = {
        startPagex: 0,
        startPageY: 0
    }

    touchMove(e) {
        let distance = e.changedTouches[0].pageX - this.state.startPagex
        let distanceY = e.changedTouches[0].pageY - this.state.startPageY
        if (distance < 0) {
            if (distance < -20) {
                this.props.actions.rightFlip()
            }
        } else {
            if (distance > 20) {
                this.props.actions.leftFlip()
            }
        }
    }

    touchStart(e) {
        this.setState({
            startPagex: e.changedTouches[0].pageX,
            startPageY: e.changedTouches[0].pageY
        })
    }

    render() {
        return (
            <nav style={{position: 'absolute', width: '100%', height: '100%', zIndex: 2}}
                 onTouchMove={this.touchMove.bind(this)} onTouchStart={this.touchStart.bind(this)}>
            </nav>
        )
    }
}


const LineBar = ({chose,device}) => {
    return (
        <div style={{
            postion: 'relative',
            zIndex: 1,
            height: '2px',
            width: '100%',
            background: 'rgba(128,128,128,0.2)',
            marginTop: '10px'
        }}>
            <span style={{
                display: 'block',
                postion: 'absolute',
                zIndex: 1001,
                left: 0,
                top: 0,
                width: device=='phone'?'30px':'50px',
                height: '100%',
                background: '#2D9EFA',
                opacity: chose ? 1 : 0
            }}></span>
            <span></span>
        </div>
    )
}

const CircleBar = ({chose, style}) => {
    return (
        (style == 'blue'||style=='red') ?
            <div style={{
                postion: 'relative',
                zIndex: 1,
                height: '6px',
                width: '6px',
                borderRadius: '50%',
                background: 'rgba(128,128,128,0.2)',
                margin: '10px auto'
            }}>
                <span style={{
                    display: 'block',
                    postion: 'absolute',
                    zIndex: 1001,
                    left: 0,
                    top: 0,
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: style=='blue'?'#C0E2FE':'#F45C43',
                    opacity: chose ? 1 : 0
                }}></span>
                <span></span>
            </div> :
            <div style={{
                postion: 'relative',
                zIndex: 1,
                height: '6px',
                width: '6px',
                borderRadius: '50%',
                border: 'solid 1px white',
                margin: '10px auto'
            }}>
                <span style={{
                    display: 'block',
                    postion: 'absolute',
                    zIndex: 1001,
                    left: 0,
                    top: 0,
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: 'white',
                    opacity: chose ? 1 : 0
                }}></span>
                <span></span>
            </div>
    )
}
const FlipDots = ({targetIndex,device, item, type, style, sliderNum}) => {
    window.debugger(sliderNum,device,type,style)
    let arr = []
    for (let i = 0; i < sliderNum; i++) {
        arr[i] = false
    }
    arr[item] = true
    window.debugger('arr',arr)
    return (
        <div style={{
            position: 'absolute',
            width: '60%',
            bottom: '11px',
            left: '20%',
            lineHeight: 1,
            textAlign: 'center',
            zIndex: 10
        }}>
            <ul style={{display: 'inline-block', listStyle: 'none', margin: '0', padding: 0}}>
                {type == 'circle' ? arr.map((dot, i) =>
                    <li style={{
                        position: 'relative',
                        margin: '0 5px',
                        width: '20px',
                        height: '22px',
                        float: 'left',
                        padding: 0,
                        cursor: 'pointer'
                    }} onClick={ () => targetIndex(i)}>
                        <CircleBar chose={dot} style={style}/>
                    </li>
                ) :
                    arr.map((dot, i) =>
                        <li style={{
                            position: 'relative',
                            margin: '0 5px',
                            width: device=='phone'?'30px':'50px',
                            height: '22px',
                            float: 'left',
                            padding: 0,
                            cursor: 'pointer'
                        }} onClick={ () => targetIndex(i)}>
                            <LineBar chose={dot}
                                     device={device}/>
                        </li>
                    )
                }
            </ul>
        </div>
    )
}

export const SlidersOuter = (props) => {
    const sliderMap = props.list
    const sliderNum = props.sliderNum
    const stopSlider = () => {
        props.actions.stopSlider()
    }
    const goSlider = () => {
        props.actions.goSlider()
    }
    const distance = {
        header: props.param.distance.header,
        inner: props.param.distance.inner,
        index: props.param.distance.index,
        volicity: props.param.distance.volicity,
        direction: props.param.distance.direction
    }
    let transition = []
    window.debugger(distance.direction, props, distance.index, sliderNum, distance.index % sliderNum)
    // let array = [1,2,3,1,2,3]
    // window.debugger(array.find())
    for (let i = 0; i < sliderNum + 1; i++) {
        if (i == 0) {
            const item = distance.direction == 'left' ? 'all .7s ease-in-out' :
                         distance.index % sliderNum == 0 ? 'all .7s ease-in-out' : 'all 0s ease-in-out '
            transition.push(item)
        } else if (i == sliderNum - 1) {
            const item = distance.direction == 'left' ? 'all 0s ease-in-out' :
                         distance.index % sliderNum == 0 ? 'all 0s ease-in-out ' + '.7s' : 'all .7s ease-in-out '
            transition.push(item)
        } else {
            const item = distance.direction == 'left' ? 'all 0s ease-in-out' :
                distance.index % sliderNum == 0 ? 'all 0s ease-in-out' : 'all .7s ease-in-out '
            transition.push(item)
        }
    }
    // const transition = distance.direction=='left'?[
    //   'all .7s ease-in-out ',
    //   'all 0s ease-in-out ',
    //   'all 0s ease-in-out ',
    // ]:[
    //   'all .7s ease-in-out ',
    //   distance.index%sliderNum==0?'all 0s ease-in-out':'all .7s ease-in-out ',
    //   distance.index%sliderNum==0? 'all 0s ease-in-out '+'.7s' : 'all .7s ease-in-out ',
    // ]
    const type = props.type
    const innerWraper = props.innerWraper
    const innerMainMember = (device, type, textMainMember)=> {
        switch (type){
            case 'MainMember':
                return textMainMember.map((item, i)=>(
                    <MainMemberWrapper textItem={item}
                                       actions={{stopSlider, goSlider}}
                    />
                ))
                break
            case 'youLiRule':
            case 'recruitOffer':
                return textMainMember.map((item,i)=>(
                    <YouLiRuleWrapper textItem={item}
                                      index={i}
                                      type={type}/>
                ))
                break
            default:break
        }
    }
    window.debugger(innerMainMember(innerWraper.device,type,innerWraper.textMainMember))
    window.debugger('sliderMap',sliderMap)
    window.debugger('innerWraper',innerWraper)
    window.debugger('type',type)
    const viewScope = (type)=>{
        switch (type){
            case 'cartoon':
                return sliderMap.map((item, i) =>
                    <div style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        left: '0',
                        top: '0',
                        overflowY: 'hidden',
                        willChange: 'transform',
                        transform: 'translate3d(' + distance.inner[i] + 'px,0,0)',
                        transition: transition[i]
                    }}>
                        {innerWraper[i]}
                    </div>
                )
            break
            case 'MainMember':
            case 'youLiRule':
            case 'recruitOffer':
                return sliderMap.map((item, i) =>
                    <div style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        left: '0',
                        top: '0',
                        overflowY: 'hidden',
                        willChange: 'transform',
                        transform: 'translate3d(' + distance.inner[i] + 'px,0,0)',
                        transition: transition[i]
                    }}>
                        {innerMainMember(innerWraper.device, type, innerWraper.textMainMember)[i]}
                    </div>
                )
            break
            default:
                return sliderMap.map((item, i) =>
                    <div className={item} style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        left: '0',
                        top: '0',
                        overflowY: 'hidden',
                        willChange: 'transform',
                        transform: 'translate3d(' + distance.inner[i] + 'px,0,0)',
                        transition: transition[i]
                    }}
                    >
                        <div style={{
                            position: 'absolute',
                            left: '0',
                            top: '0',
                            width: '100%',
                            height: '100%',
                            background: 'rgba(0,0,0,.15)'
                        }}></div>
                        <div
                            className={ (distance.index + 1) % sliderNum == ((i + 1) == sliderNum ? 0 : (i + 1)) ? 'animated fadeInUp' : 'animated'}
                            style={{width: '100%', height: '100%', position: 'absolute'}}>
                            {innerWraper[i]}
                        </div>
                    </div>
                )
        }
    }
    return (
        <div style={{
            position: 'absolute',
            verticalAlign: 'baseline',
            width: '100%',
            height: '100%',
            left: '0',
            top: '0',
            transform: 'translate3d(' + distance.header + 'px,0,0)',
            transition: 'all ' + distance.volicity + ' ease-in-out '
        }}>
            {
                viewScope(type)
            }
        </div>
    )
}


export default class SlidersWraper extends Component {
    constructor(props) {
        super(props)
    }

    state = {
        time: new Date(),
        index: 0,
        continuous: true, //是否循环滚动
        autoSlide: true,
        volicity: '.7s',
        direction: ''
    }

    componentDidMount() {
        const self = this
        this.timer = setInterval(function () {
            self.setState({
                ...self.state,
                time: new Date(),
                index: self.state.index + 1,
                volicity: '.7s',
                direction: 'right'
            })
        }, 4000)
    }

    componentWillUnmount() {
        clearTimeout(this.timer)
    }

    leftFlip() {
        if ((new Date() - this.state.time) > 400) {
            const v = (new Date() - this.state.time) > 700 ? '.7s' : (new Date() - this.state.time) > 500 ? '.5s' : '.3s'
            window.debugger(new Date() - this.state.time);
            this.setState({
                ...this.state,
                time: new Date(),
                index: this.state.index - 1,
                volicity: v,
                direction: 'left'
            })

            // window.debugger('left'+(this.state.index-1))
        }
    }

    rightFlip() {
        if ((new Date() - this.state.time) > 400) {
            const v = (new Date() - this.state.time) > 700 ? '.7s' : (new Date() - this.state.time) > 500 ? '.5s' : '.3s'
            window.debugger(new Date() - this.state.time);
            this.setState({
                ...this.state,
                time: new Date(),
                index: this.state.index + 1,
                volicity: v,
                direction: 'right'
            })
        }
        // window.debugger('right'+(this.state.index+1))
    }

    targetFlip(number) {
        if ((new Date() - this.state.time) > 400) {
            const orinIndex = this.state.index > this.state.sliderNum ? Math.abs((this.state.index) % this.state.sliderNum) : this.state.index
            const v = (new Date() - this.state.time) > 700 ? '.7s' : (new Date() - this.state.time) > 500 ? '.5s' : '.3s'
            let targetIndex = number - orinIndex
            if (targetIndex == 2) {
                targetIndex = -1
            }
            if (targetIndex == -2) {
                targetIndex = 1
            }
            this.setState({
                ...this.state,
                time: new Date(),
                index: this.state.index + targetIndex,
                volicity: v,
                direction: targetIndex > 0 ? 'right' : 'left'
            })
        }
    }

    stopSlider() {
        window.debugger('stop')
        clearTimeout(this.timer)
    }

    goSlider() {
        window.debugger('go')
        const self = this
        this.timer = setInterval(function () {
            self.setState({
                ...self.state,
                time: new Date(),
                index: self.state.index + 1,
                volicity: '.7s',
                direction: 'right'
            })
        }, 4000)
    }

    render() {
        const {index} = this.state
        const {sliderNum,type,typeStyle,style,wraperList,innerWraper,withButton,trueSliderNum,screenWidth} = this.props
        window.debugger('sliderNum',this.props)
        const device = screenWidth>750?'pc':'phone'
        const distance = this.props.screenWidth //移动距离
        const j = Math.floor((index + 1) / sliderNum)
        const rate = Math.floor(index / sliderNum)
        const o = -distance * index
        // const p = distance * 3 * j
        // const q = distance + rate * 3 * distance
        // const r = 2 * distance + rate * 3 * distance
        let inner = []
        for (let i = 0; i < sliderNum; i++) {
            if (i == 0) {
                inner.push(distance * sliderNum * j)
            } else {
                inner.push(i * distance + rate * sliderNum * distance)
            }
        }
        window.debugger(index, j, inner)
        const data = {
            header: o,
            inner: inner,
            index: this.state.index,
            volicity: this.state.volicity,
            direction: this.state.direction
        }
        const FlipWrape = document.documentElement.clientWidth <= 750 ?
            <FlipWraperForMobile actions={{rightFlip: this.rightFlip.bind(this), leftFlip: this.leftFlip.bind(this)}}
            />
            :
            <FlipWraper actions={{rightFlip: this.rightFlip.bind(this), leftFlip: this.leftFlip.bind(this),}}
                        withButton={withButton}
                        type={type}
                        item={type=='MainMember'?Math.abs((index) % (sliderNum-2)):Math.abs((index) % sliderNum)}
            />

        return (
            <div style={{position: 'absolute', width: '100%', height: '100%', overflow: 'hidden'}}>
                {FlipWrape}
                <SlidersOuter type={type} list={wraperList} param={{distance: data}}
                              innerWraper={innerWraper} sliderNum={sliderNum}
                              actions={{stopSlider: this.stopSlider.bind(this), goSlider: this.goSlider.bind(this)}}
                />
                <FlipDots targetIndex={this.targetFlip.bind(this)}
                          device={device}
                          type={typeStyle}
                          style={style}
                          item={type=='MainMember'?trueSliderNum?Math.abs((index) % (sliderNum-2)):Math.abs((index) % sliderNum):Math.abs((index) % sliderNum)}
                          sliderNum={type=='MainMember'?trueSliderNum?sliderNum-2:sliderNum:sliderNum}/>
            </div>
        )
    }
}
