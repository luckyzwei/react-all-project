import React, { Component } from 'react'
import './index.css'
import AuthProvider from '../../../funStore/AuthProvider'
import promiseXHR from '../../../funStore/ServerFun'
export default class SearchFuzzy extends Component {
    constructor(props) {
        super(props)
        this.state = {
            keyDownIndex: -1,
            name: '',
            selectCompany: false,
            allCompanyName: [],
            closeStatus: false
        };
        this.keyDownEvent = this.keyDownEvent.bind(this)
        this.blurEvent = this.blurEvent.bind(this)
    }
    timer = ''

    componentDidMount() {
        document.getElementById('selectAuto').addEventListener('keydown', this.keyDownEvent);
        window.addEventListener('click', this.blurEvent)
    }

    componentWillUnmount() {
        document.getElementById('selectAuto').removeEventListener('keydown', this.keyDownEvent);
        window.removeEventListener('click', this.blurEvent)
    }

    handleSearch(e) {
        let valueName = e.target.value;
        var regEx = new RegExp(valueName, "g")
        let { url, paramasValue, data, method, keyName, paramName } = this.props.option;
        if (valueName != '') {
            this.setState({ closeStatus: true })
        } else {
            this.setState({ closeStatus: false })
        }
        if (method && method.toLocaleLowerCase() == 'post' && data) {
            paramName ? data[paramName] = valueName : data[keyName] = valueName
        } else {
            url = url + valueName
        }
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
            AuthProvider.getAccessToken()
            .then((resolve, reject) => {
                return promiseXHR(url, { type: 'Bearer', value: resolve }, data ? data : null, method ? method : 'GET')
            })
            .then((res) => {
                const data = JSON.parse(res)
                this.setState({
                    allCompanyName: data.resultContent ? data.resultContent.map(item => {
                        return {
                            ...item,
                            showName: item[keyName].replace(regEx, `<span>${valueName}</span>`)
                        }
                    }) : [],
                    selectCompany: true,
                })
            })
        }, 500)
        this.props.handleAutoComParamas(valueName, null, paramasValue, 'SEARCH')
        this.setState({
            keyDownIndex: -1
        })
    }
    handleOnSelect(name, id) {
        const { uploadId, paramasValue } = this.props.option
        if (uploadId) {
            this.props.handleAutoComParamas(name, id, paramasValue, 'CLICK')
        } else {
            this.props.handleAutoComParamas(name, null, paramasValue, 'CLICK')
        }
    }


    keyDownEvent(e) {
        let { allCompanyName, keyDownIndex, name } = this.state;
        const { keyName, uploadId, paramasValue } = this.props.option;
        if (e.keyCode == 40) {////光标键"↓"
            if (keyDownIndex >= allCompanyName.length - 1) {
                keyDownIndex = 0;
            } else {
                keyDownIndex++;
            }
            this.setState({ keyDownIndex })
            name = allCompanyName[keyDownIndex][keyName] != null ? allCompanyName[keyDownIndex][keyName] : '';
            if (uploadId) {
                this.props.handleAutoComParamas(name, allCompanyName[keyDownIndex].id, paramasValue)
            } else {
                this.props.handleAutoComParamas(name, null, paramasValue)
            }
        } else if (e.keyCode == 38) {
            if (keyDownIndex <= 0) {
                keyDownIndex = allCompanyName.length - 1;
            } else {
                keyDownIndex--
            }
            name = allCompanyName[keyDownIndex][keyName] != null ? allCompanyName[keyDownIndex][keyName] : '';
            this.setState({
                keyDownIndex: keyDownIndex,
            })
            if (uploadId) {
                this.props.handleAutoComParamas(name, allCompanyName[keyDownIndex].id, paramasValue)
            } else {
                this.props.handleAutoComParamas(name, null, paramasValue)
            }
        } else if (e.keyCode == 13) {
            this.blurEvent()
            this.props.getDataReport()
        }
    }

    blurEvent() {
        this.setState({
            selectCompany: false
        })
    }

    // handleInput=(e)=>{
    //     // 当输入时，清空参数
    //     e.stopPropagation()
    //     this.props.handleAutoComParamas('', null, this.props.option.paramasValue, 'CLICK')
    // }

    clearInputVal = () => {
        this.props.handleAutoComParamas('', null, this.props.option.paramasValue, 'CLICK')
        this.setState({ closeStatus: false })
    }
    render() {
        const { keyName, keyId, placeholder, style, defaultValue, label, keyShow, labelStyle, disabledStyle } = this.props.option
        const { allCompanyName, keyDownIndex, selectCompany, closeStatus } = this.state
        return (
            <div className='searchFuzzy-wraper' id='selectAuto'>
                <div className="selectLabel" style={labelStyle}>{label}</div>
                <div className='selectAutoComplete' >
                    <input type="text" value={defaultValue} disabled={this.props.isDisabled?true:false} placeholder={this.props.isDisabled?'':placeholder} style={this.props.isDisabled?disabledStyle:style}
                        onChange={(e) => this.handleSearch(e)}/>
                    {closeStatus ? <span className='closeIcon' onClick={this.clearInputVal} /> : null}
                    {
                        selectCompany && allCompanyName.length > 0 ?
                            <div className='autoCompleteList'>
                                <ul>
                                    {
                                        allCompanyName.map((item, index) => {
                                            return <li key={index} className={keyDownIndex == index ? 'hoverli' : ''} onClick={this.handleOnSelect.bind(this, item[keyName], item[keyId])} dangerouslySetInnerHTML={{ __html: item[keyShow] }}></li>
                                        })
                                    }
                                </ul>
                            </div> : null
                    }
                </div>
            </div>

        )
    }
}