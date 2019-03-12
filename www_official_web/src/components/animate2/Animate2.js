import React,{Component} from 'react'
import './index.css'
import LazyLoad from 'react-lazyload';

export default class Animate2 extends Component {
    render(){
        return (
            <div id="imageBox2">
                <LazyLoad><img src="./images/main/mobile/ring_1.png" alt="" className="ring1" /></LazyLoad>
                <LazyLoad><img src="./images/main/mobile/ring_2.png" alt="" className="ring2" /></LazyLoad>
                <LazyLoad><img src="./images/main/mobile/ring_3.png" alt="" className="ring3" /></LazyLoad>
                <LazyLoad><img src="./images/main/mobile/ip6.png" alt="" className="ip6" /></LazyLoad>
                <LazyLoad><img src="./images/main/mobile/know.png" alt="" className="know" /></LazyLoad>
                <LazyLoad><img src="./images/main/mobile/more.png" alt="" className="more" /></LazyLoad>
                <LazyLoad><img src="./images/main/mobile/newbang.png" alt="" className="newbang" /></LazyLoad>
                <LazyLoad><img src="./images/main/mobile/panda.png" alt="" className="panda" /></LazyLoad>
                <LazyLoad><img src="./images/main/mobile/tuling.png" alt="" className="tuling" /></LazyLoad>
                <LazyLoad><img src="./images/main/mobile/qq.png" alt="" className="qq" /></LazyLoad>
                <div className="imgSlider">
                    <div className="inner">
                        <LazyLoad><img src="./images/main/mobile/text.png" alt="" className="text" /></LazyLoad>
                        <LazyLoad><img src="./images/main/mobile/link.png" alt="" className="link" /></LazyLoad>
                        <LazyLoad><img src="./images/main/mobile/video.png" alt="" className="video"/></LazyLoad>
                        <LazyLoad><img src="./images/main/mobile/miniprogram.png" alt="" className="miniprogram" /></LazyLoad>
                        <LazyLoad><img src="./images/main/mobile/text.png" alt="" className="text" /></LazyLoad>
                    </div>
                </div>
            </div>
        )
    }
}