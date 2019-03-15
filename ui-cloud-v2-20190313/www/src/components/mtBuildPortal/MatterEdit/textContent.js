import React, { Component, PropTypes } from 'react'
import { push, replace } from 'react-router-redux'
import FaceForQQ from './FaceForQQ'
import { QQFACE_TEXT } from '../../../constants/MapData'
import * as wd from '../../../funStore/funForComponent/watchData'
import $ from 'jquery'
const dataTransform = (data) => {
    var _reg = new RegExp('\\[(.+?)\\]', "g")
    var matchArray = data.match(_reg)//筛选qqemojj表情
    var str = data
    str = str.replace(/\n\n\n/gi, '')
    str = str.replace(/\n/gi, '<br>')
    str = str.replace(/↵/g, "<br>")//过滤换行标签
    str = str.replace(/_web/g, '')//过滤换行标签
    if (matchArray != null) {
        var index
        for (let i = 0; i < matchArray.length; i++) {
            if (QQFACE_TEXT.qqEmoji_array.indexOf(matchArray[i]) == -1 && QQFACE_TEXT.qqEmoji_array_chinese.indexOf(matchArray[i]) != -1) {
                index = (QQFACE_TEXT.qqEmoji_array_chinese.indexOf(matchArray[i]));
            } else if (QQFACE_TEXT.qqEmoji_array_chinese.indexOf(matchArray[i]) == -1 && QQFACE_TEXT.qqEmoji_array.indexOf(matchArray[i]) != -1) {
                index = (QQFACE_TEXT.qqEmoji_array.indexOf(matchArray[i]));
            }
            if (index == undefined) {
                str = str.replace(matchArray[i], '&nbsp;' + matchArray[i] + '&nbsp;');
            } else {
                str = str.replace(matchArray[i], '<img class="qqemoji  qqemoji' + index + '" name="' + index + '" src="'+process.env.PUBLIC_URL+'/images/icon/spacer.png" />');
            }
        }

    }

    return str

}
function cursorMoveEnd(obj) {
    obj.focus();
    let len = obj.innerHTML.length;
    if (document.selection) {
        var sel = document.selection.createRange();
        sel.moveStart('character', len);
        sel.collapse();
        sel.select();
    }
    else {                                                 /* IE11 特殊处理 */
        var sel = window.getSelection();
        var range = document.createRange();
        range.selectNodeContents(obj);
        range.collapse(false);
        sel.removeAllRanges();
        sel.addRange(range);
    }
}

function getCursortPosition(obj) {
    var cursorIndex = 0;
    if (document.selection) {
        // IE Support
        obj.focus();
        var range = document.selection.createRange();
        range.moveStart('character', -obj.value.length);
        cursorIndex = range.text.length;
    } else if (obj.selectionStart || obj.selectionStart == 0) {
        // another support
        cursorIndex = obj.selectionStart;
    }
    return cursorIndex;
}

export default class TextContent extends Component {
    constructor(props) {
        super(props)
        this.complieCount = this.complieCount.bind(this)
    }
    state = {
        point: null,
        showContent: false,
        count: '0/300',
    }

    getContent() {

        let a1 = $("#activeContent").html()
        if(a1){
            a1 = a1.replace(/<br>/g, "\r")
        }
        $("#pre-container").html(a1)
        $("#pre-container img").each(function (i) {
            $("#pre-container img").eq(i).html($("#pre-container img").eq(i).attr("text"));
        })
        $("#pre-container").find('style').remove();
        // $("#activeContent").find("p").children().remove();
        var td = $("#pre-container").find('td')
        td.replaceWith('<div>' + td.html() + '</div>')
        $("#pre-container").find('table').replaceWith(td);
        let value = $("#pre-container").text().replace(/\n\n\n\n\n\n\n\n/gi, '').replace(/\n\n\n\n\n\n\n/gi, '');//对word导致多格做处理
        value = value.replace(/\n\n\n /gi, '')
        value = value.replace(/_web/g, '')
        $("#pre-container").text(value)
        return value
    }

    clearPoint() {
        this.setState({
            point: null,
            enter: false,
            clickState: false
        })
    }

    complieCount(textContent) {
        var number = wd.textCountRange(textContent, 300)
        this.setState({
            showContent: textContent.length > 0 ? true : false,
            count: `${number.count}/${number.max}`
        })
    }

    componentDidMount() {
        const self = this;
        window.addEventListener('deletetext',function (data) {
            // console.log(data);
            let datas = data.vals
            // console.log(datas);
            if (datas != '' && datas != null) {
                $('#activeContent').html(dataTransform(datas))
                $('#activeContent').find('img').each(function (i) {
                    const text = QQFACE_TEXT.qqEmoji_array[parseInt($(this).attr('name'))]
                    $(this).attr('text', text)
                })
                //解析记数
                var textContent = self.getContent()
                self.complieCount(textContent)
            }else{
                $('#activeContent').html('')
                self.setState({
                    count:'0/300',
                })
            }
        })
        const data = this.props.content

        if (data != '' && data != null) {
            $('#activeContent').html(dataTransform(data))
            $('#activeContent').find('img').each(function (i) {
                const text = QQFACE_TEXT.qqEmoji_array[parseInt($(this).attr('name'))]
                $(this).attr('text', text)
            })
            //解析记数
            var textContent = self.getContent()
            self.complieCount(textContent)
        }

        $('#activeContent').click(function (e) {
            var obj = document.getElementById('activeContent');
            var newNode = document.createElement("p");
            self.setState({
                point: window.getSelection().getRangeAt(0),
                clickState: true
            })
            window.getSelection().getRangeAt(0)

        })


        $('#activeContent').on('keyup', function (e) {
            $("#activeContent img").removeAttr("style")
            $("#activeContent style").remove()

            var temporary = $('#activeContent pre').html()
            $('#activeContent pre').remove()
            $('#activeContent').html(temporary)

            //解析记数
            var textContent = self.getContent()
            self.complieCount(textContent)
            self.props.onChange(textContent)
        })
        $('#activeContent').focus().on('keydown', function (e) {
            var obj = document.getElementById('activeContent');
            $('.mt-faceBox').css({ marginTop: "-50px", opacity: 0 }, 300);
            setTimeout(function () {
                $('.mt-faceBox').hide()
            }, 280)
            self.setState({
                point: window.getSelection().getRangeAt(0)
            })
            if (e.keyCode == 13) {
                e.preventDefault()
                if (obj.childNodes[obj.childNodes.length - 1].nodeValue == null) {
                    if (self.state.point != null) {
                        var br = document.createElement("br");
                        self.state.point.insertNode(br)
                    } else {
                        $("#activeContent").append('<br>');
                    }
                } else {
                    if (self.state.point != null) {
                        $("#activeContent").focus()
                        var br = document.createElement("br");
                        self.state.point.insertNode(br)
                        if (!self.state.enter) {
                            var br2 = document.createElement("br");
                            self.state.point.insertNode(br2)
                            self.setState({
                                enter: true
                            })
                        }

                    } else {
                        $("#activeContent").append('<br><br>');
                    }
                }
                var scrollTop = $("#activeContent")[0].scrollHeight;
                $("#activeContent").scrollTop(scrollTop);
                cursorMoveEnd(obj)
            } else if (e.keyCode == 37 || e.keyCode == 39 || e.keyCode == 38 || e.keyCode == 40) {
                self.setState({
                    point: window.getSelection().getRangeAt(0),
                    enter: true
                })
                window.getSelection().getRangeAt(0);
            } else {
                self.setState({
                    point: window.getSelection().getRangeAt(0),
                    enter: false,
                    clickState: false
                })
                window.getSelection().getRangeAt(0);
            }
        })
    }
    componentWillUnmount(){
        window.removeEventListener('deletetext',function (s) {
            $('#activeContent').html('')
        })
    }
    // componentWillReceiveProps(nextProps){
    //     let self = this;
    //     if(this.props.content != nextProps.content){
    //         const data = nextProps.content
    //         // console.log(data,"看看数据")
    //         if (data != '' && data != null) {
    //             $('#activeContent').html(dataTransform(data))
    //             $('#activeContent').find('img').each(function (i) {
    //                 const text = QQFACE_TEXT.qqEmoji_array[parseInt($(this).attr('name'))]
    //                 $(this).attr('text', text)
    //             })
    //             //解析记数
    //             var textContent = self.getContent()
    //             self.complieCount(textContent)
    //         }
    //     }
    // }
    render() {
        const { content, judge } = this.props
        const { point, showContent, count } = this.state
        const isError = judge && (content == '' || content == null)
        return (
            <div className='mt-activeContent' >
                <pre id='pre-container' style={{ display: 'none' }}
                    contentEditable={true}
                >
                </pre>
                <div style={isError ?
                    { borderBottom: '1px solid #F75A5A' } :
                    {}}>
                    <pre contentEditable={true} placeholder="请从这里输入文字" id='activeContent' className={!showContent ? 'noWords' : ''}
                    >
                    </pre>
                    <div className="qqfaceBox" style={{ display: showContent ? 'flex' : 'none', width: '261px', height: '26px', position: 'absolute', zIndex: '4', right: '0', bottom: '-27px' }}>
                        <FaceForQQ point={point}
                            fatherState={this.state}
                            clickEvent={
                                () => {
                                    var textContent = this.getContent()
                                    this.complieCount(textContent)
                                    this.props.onChange(textContent)
                                }
                            }
                            clearPoint={this.clearPoint.bind(this)} />
                        <div style={{ width: '50px' }}>{count}</div>

                    </div>
                </div>
            </div>
        )
    }
}
