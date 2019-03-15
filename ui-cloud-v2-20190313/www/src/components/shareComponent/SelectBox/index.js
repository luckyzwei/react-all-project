import React, {Component} from 'react'
import './index.css'

class SelectBox extends Component {
    constructor() {
        super();
        this.state = {
            showOption: false,
            currentId: -1,
            selectTitle: "请选择",
            ifSelect: false
        }
    }

    showMoreOption() {
        if (!this.props.disable) {
            this.setState({
                showOption: !this.state.showOption
            })
        }
    }

    selectedOption(index, sentList, name, value) {
        this.setState({
            currentId: index,
            selectTitle: sentList,
            showOption: !this.state.showOption,
            ifSelect: true
        })
        if (this.props.changeClear) {
            this.props.changeClear()
        }
        if (this.props.setparamsHandle) {
            this.props.setparamsHandle(name, value)
        }
        if (this.props.setMoreSelectParama) {
            this.props.setMoreSelectParama(index, sentList, name, value)
        }
    }

    hideOption() {
        this.setState({
            showOption: false
        })
    }

    componentWillMount() {
        if (this.props.placeholder) {
            this.setState({
                selectTitle: this.props.placeholder
            })
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.clear) {
            this.setState({
                currentId: -1,
                selectTitle: this.props.placeholder ? this.props.placeholder : "请选择",
                ifSelect: false
            })
        }
    }

    render() {
        let {showOption, currentId, selectTitle, ifSelect} = this.state
        let {selectLabel, selectOption, paramName, paramDefault, paramaValue, width, all, verify, disable, iptColor, disableBackground, widths} = this.props
        const widthStyle = width != undefined ? {width: width} : {}
        const id = this.props.id == undefined || this.props.id == '' ? '' : this.props.id;
        const _currentId = paramDefault != undefined && currentId == -1 ? paramDefault.id : currentId
        return (
            <div className='selectWrappers' onBlur={this.hideOption.bind(this)} tabIndex={1}>
                {selectLabel ? <div className="selectLabel" style={widths}>{selectLabel}</div> : ''}
                <div className="selectBoxs" style={widthStyle}>
                    <div className="selectOption" id={id} onClick={this.showMoreOption.bind(this)}
                         style={Object.assign({}, {border: verify ? '1px solid red' : showOption ? "1px solid #58a7f8" : iptColor ? iptColor : "1px solid transparent"}, widthStyle, {backgroundColor: disableBackground ? disableBackground : ''})}>
                        <em className={!ifSelect && paramDefault == undefined ? "unselectedTip" : "selectTip"}>
                            {!ifSelect && paramDefault != undefined ? paramDefault.name : selectTitle}
                        </em>
                        <span className={showOption ? "selectArrow selIcon" : "selIcon"}/>
                    </div>
                    <div className="optionUl" style={Object.assign({}, {
                        display: showOption ? "block" : "none",
                        transition: 'all .4s'
                    }, widthStyle)}>
                        <ul>
                            <li style={{display: all ? 'block' : 'none'}}
                                className={_currentId == null ? "selected" : ""}
                                onClick={this.selectedOption.bind(this, null, '全部', paramName, null)}>全部
                            </li>
                            {selectOption.map((data, index) => {
                                return <li
                                    key={index}
                                    className={_currentId == index ? "selected" : ""}
                                    onClick={this.selectedOption.bind(this, index, data, paramName, paramaValue[index])}
                                > {data} </li>
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

export default SelectBox