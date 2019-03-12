/**
 * Created by wenbin on 2017/7/24.
 */
import React, {Component} from "react";
import SlidersWraper from "../components/SlidersWraper";
import InnerWraper from "../components/InnerWraper";
import $ from 'jquery'
// const textDownPhone = [
//
//     {
//         text: '',
//
//         style: {
//             width: '80%',
//             fontSize: '20px',
//             top: '30%',
//             left: '10%',
//             lineHeight: '24px',
//             fontSize: '13px',
//             left: '50%',
//             top: '50%',
//             transform: 'translate(-50%,-50%)',
//             fontFamily: 'PingFangSC-Thin'
//         }
//     },
//     {
//         text: '',
//
//         style: {
//             width: '80%',
//             fontSize: '20px',
//             top: '30%',
//             left: '10%',
//             lineHeight: '24px',
//             fontSize: '13px',
//             left: '50%',
//             top: '50%',
//             transform: 'translate(-50%,-50%)',
//             fontFamily: 'PingFangSC-Thin'
//         }
//     },
//     {
//         text: '',
//
//         style: {
//             width: '80%',
//             fontSize: '20px',
//             top: '30%',
//             left: '10%',
//             lineHeight: '24px',
//             fontSize: '13px',
//             left: '50%',
//             top: '50%',
//             transform: 'translate(-50%,-50%)',
//             fontFamily: 'PingFangSC-Thin'
//         }
//     },
// ]
//
// const textUp = [
//     {
//         text: '',
//         style: {width: 'auto', lineHeight: '55px'}
//     },
//     {
//         text: '',
//
//         style: {width: 'auto', lineHeight: '55px'}
//     },
//     // {text : '专业智能的行业知识库和销售话术提供',
//     //
//     // style : {width:'auto',lineHeight:'55px'}},
//     {
//         text: '',
//
//         style: {width: 'auto', lineHeight: '55px'}
//     },
//
// ]
const innerWraper =
    [
        <InnerWraper text='' style=''/>,
        <InnerWraper text='' style=''/>,
        <InnerWraper text='' style=''/>
    ]

export default class TeamStyle extends Component {
    constructor() {
        super();
        this.state = {
            teamBlackImg: ['./images/aboutImg/black/1.png', './images/aboutImg/black/2.png', './images/aboutImg/black/3.png', './images/aboutImg/black/4.png', './images/aboutImg/black/5.png', './images/aboutImg/black/6.png', './images/aboutImg/black/7.png', './images/aboutImg/black/8.png', './images/aboutImg/black/9.png', './images/aboutImg/black/10.png', './images/aboutImg/black/11.png', './images/aboutImg/black/12.png', './images/aboutImg/black/13.png', './images/aboutImg/black/14.png', './images/aboutImg/black/15.png', './images/aboutImg/black/16.png', './images/aboutImg/black/17.png', './images/aboutImg/black/18.png', './images/aboutImg/black/19.png', './images/aboutImg/black/20.png', './images/aboutImg/black/21.png', './images/aboutImg/black/22.png', './images/aboutImg/black/23.png', './images/aboutImg/black/24.png', './images/aboutImg/black/25.png', './images/aboutImg/black/26.png', './images/aboutImg/black/27.png', './images/aboutImg/black/28.png', './images/aboutImg/black/29.png', './images/aboutImg/black/30.png', './images/aboutImg/black/31.png', './images/aboutImg/black/32.png', './images/aboutImg/black/33.png', './images/aboutImg/black/34.png', './images/aboutImg/black/35.png', './images/aboutImg/black/36.png'],
            teamColorImg: ['./images/aboutImg/color/1.png', './images/aboutImg/color/2.png', './images/aboutImg/color/3.png', './images/aboutImg/color/4.png', './images/aboutImg/color/5.png', './images/aboutImg/color/6.png', './images/aboutImg/color/7.png', './images/aboutImg/color/8.png', './images/aboutImg/color/9.png', './images/aboutImg/color/10.png', './images/aboutImg/color/11.png', './images/aboutImg/color/12.png', './images/aboutImg/color/13.png', './images/aboutImg/color/14.png', './images/aboutImg/color/15.png', './images/aboutImg/color/16.png', './images/aboutImg/color/17.png', './images/aboutImg/color/18.png', './images/aboutImg/color/19.png', './images/aboutImg/color/20.png', './images/aboutImg/color/21.png', './images/aboutImg/color/22.png', './images/aboutImg/color/23.png', './images/aboutImg/color/24.png', './images/aboutImg/color/25.png', './images/aboutImg/color/26.png', './images/aboutImg/color/27.png', './images/aboutImg/color/28.png', './images/aboutImg/color/29.png', './images/aboutImg/color/30.png', './images/aboutImg/color/31.png', './images/aboutImg/color/32.png', './images/aboutImg/color/33.png', './images/aboutImg/color/34.png', './images/aboutImg/color/35.png', './images/aboutImg/color/36.png'],
            loadedItems: []
        }

    }

    hoverImg(e) {
        let index = parseInt(e.target.getAttribute('data-index'));
        e.target.src = this.state.teamColorImg[index]
    }

    leaveImg(e) {
        let index = parseInt(e.target.getAttribute('data-index'));
        e.target.src = this.state.teamBlackImg[index]
    }

    componentDidMount() {
        const {screenWidth} = this.props
        if (screenWidth <= 750) {
            const teamBlackImg = this.state.teamBlackImg
            var teamPhoto1 = document.getElementsByClassName('teamPhoto1')[0];
            var teamPhoto2 = document.getElementsByClassName('teamPhoto2')[0];
            var teamPhoto3 = document.getElementsByClassName('teamPhoto3')[0];
            window.debugger(teamPhoto1)
            for (let i = 0; i < teamBlackImg.length; i++) {
                var img = document.createElement("img");
                img.src = teamBlackImg[i];
                if (i < 12) {
                    teamPhoto1.appendChild(img);
                } else if (i < 24) {
                    teamPhoto2.appendChild(img);
                } else {
                    teamPhoto3.appendChild(img);
                }
            }
            // var oImg = document.createElement("img");
            // oImg.src = teamBlackImg[1];
            // teamPhoto3.appendChild(oImg);
            // teamPhoto2.find('img')
            // window.debugger('width',$(teamPhoto1).find('img').offsetWidth)
            let phone = document.getElementsByClassName('team-style-phone')[0]
            phone.style.height = screenWidth/3*4*.99 + 'px';
            // phone.getElementsByTagName('ul')[0].style.margin = '-50px'
        }
    }

    imgOnLoad(item) {
        window.debugger(item)
        this.setState(({loadedItems}) => {
            window.debugger('loadedItems.length', loadedItems.length)
            return {loadedItems: loadedItems.concat(item)}
        })
    }

    render() {
        const {teamColorImg, loadedItems} = this.state
        const {screenWidth} = this.props
        const wraperList = ['teamPhoto1', 'teamPhoto2', 'teamPhoto3'];
        const device = 'phone'
        window.debugger(teamColorImg.length, loadedItems, teamColorImg.length)
        return (
            <div>
                {
                    screenWidth > 750 ?
                        <ul>
                            {
                                teamColorImg.length > loadedItems.length ? null :
                                    this.state.teamBlackImg.map((val, i)=> {
                                        return (
                                            <li key={i}><img
                                                style={{cursor: 'pointer'}}
                                                src={val}
                                                data-index={i}
                                                onMouseEnter={this.hoverImg.bind(this)}
                                                onMouseLeave={this.leaveImg.bind(this)}
                                            /></li>
                                        )
                                    })
                            }
                            {
                                teamColorImg.map((val, i)=> {
                                    return (
                                        <li style={{display: 'none'}}>
                                            <img src={val}
                                                 onLoad={this.imgOnLoad.bind(this, val)}
                                                 key={i}
                                            />
                                        </li>
                                    )
                                })
                            }
                        </ul> :
                        <div className="team-style-phone">
                            <SlidersWraper
                                screenWidth={screenWidth}
                                type="textImg"
                                wraperList={wraperList}
                                innerWraper={innerWraper}
                                withButton={false}
                                typeStyle='circle'
                                style='grey'
                                sliderNum={3}
                            />
                        </div>
                }
                {/*<ul style={{display: screenWidth > 750 ? 'block' : 'none'}}>*/}
                    {/*{*/}
                        {/*teamColorImg.length > loadedItems.length ? null :*/}
                            {/*this.state.teamBlackImg.map((val, i)=> {*/}
                                {/*return (*/}
                                    {/*<li key={i}><img*/}
                                        {/*style={{cursor: 'pointer'}}*/}
                                        {/*src={val}*/}
                                        {/*data-index={i}*/}
                                        {/*onMouseEnter={this.hoverImg.bind(this)}*/}
                                        {/*onMouseLeave={this.leaveImg.bind(this)}*/}
                                    {/*/></li>*/}
                                {/*)*/}
                            {/*})*/}
                    {/*}*/}
                    {/*{*/}
                        {/*teamColorImg.map((val, i)=> {*/}
                            {/*return (*/}
                                {/*<li style={{display: 'none'}}>*/}
                                    {/*<img src={val}*/}
                                         {/*onLoad={this.imgOnLoad.bind(this, val)}*/}
                                         {/*key={i}*/}
                                    {/*/>*/}
                                {/*</li>*/}
                            {/*)*/}
                        {/*})*/}
                    {/*}*/}
                {/*</ul>*/}
                {/*<div className="team-style-phone"*/}
                     {/*style={{display: screenWidth > 750 ? 'none' : 'block'}}>*/}
                    {/*<SlidersWraper*/}
                        {/*screenWidth={screenWidth}*/}
                        {/*type="textImg"*/}
                        {/*wraperList={wraperList}*/}
                        {/*innerWraper={innerWraper(device, textUp, textDownPhone)}*/}
                        {/*withButton={false}*/}
                        {/*typeStyle='circle'*/}
                        {/*style='grey'*/}
                    {/*/>*/}
                {/*</div>*/}
            </div>
        )
    }
}