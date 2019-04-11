/**
 * 创建时间:2018-09-12 10:35:28
 * 作者：sufei  Xerath
 * 邮箱：fei.su@gemii.cc
 * 版本号：1.0
 * @版权所有
 **/
import React, {Component} from 'react'
import './index.css'
import Checkbox from 'antd/lib/checkbox'
import 'antd/lib/checkbox/style/css'


const Tags = ({contentValue, selectAlone, paramsname}) => {
    return (
        <div className="MtGSModule-content-tag">
            {
                contentValue.map((item, index) => {
                    return (
                        <span
                            key={index}
                            onClick={() => {
                                if (!item.select) {
                                    selectAlone(paramsname + 'tag', item.id)
                                }
                            }}
                            className={item.select ? "MtGSModule-content-tag-item active" : 'MtGSModule-content-tag-item'}
                        >
                            {item.name}
                        </span>
                    )
                })
            }
        </div>
    )

}
const Group = ({contentValue, selectAlone, paramsname}) => {
    return (
        <div className="MtGSModule-content-group">
            {
                contentValue.map((item, index) => {
                    return (
                        <div
                            key={index}
                            onClick={() => {
                                selectAlone(paramsname, item.id)
                            }}
                            className={item.repeatId ? 'MtGSModule-content-group-item repeatId' : 'MtGSModule-content-group-item'}
                        >
                            <div className="item-box">
                                <div className='item-box-left'>
                                    <img className="group-icon"
                                         src={item.iconPath}
                                         alt=""/>
                                    <span className="group-name">{item.name}</span>
                                </div>
                                <div className={item.select ?'item-box-right active':'item-box-right normal'}></div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}


export default class MtGSModule extends Component {
    constructor() {
        super();
        this.state = {
            contentValue: [],
            checkedAllStatus: false
        };
        this.selectAll = this.selectAll.bind(this);
        this.selectAlone = this.selectAlone.bind(this);
    }

    selectAll(e) {
        let {contentValue, checkedAllStatus} = this.state;
        let {paramsname, searchStyle} = this.props;
        let set = [];
        checkedAllStatus = e.target.checked;
        if (searchStyle == 0 && !checkedAllStatus) {
            checkedAllStatus = true;
        }
        for (let i = 0; i < contentValue.length; i++) {
            contentValue[i].select = checkedAllStatus;
            if (contentValue[i].select) {
                set.push(contentValue[i]);
            }
        }
        paramsname = searchStyle == 0 ? paramsname + 'tag' : paramsname;
        this.props.setparamshandle(paramsname, set);
        this.setState({
            contentValue,
            checkedAllStatus
        })
    } //全选、与取消全选
    selectAlone(paramsname, e) {
        let set = [];
        let {contentValue, checkedAllStatus} = this.state;
        for (let i = 0; i < contentValue.length; i++) {
            if (contentValue[i].id == e) {
                if (contentValue[i].select) {
                    contentValue[i].select = false;
                } else {
                    contentValue[i].select = true;
                }
            }
            if (contentValue[i].select) {
                set.push(contentValue[i]);
            }
        }
        if (set.length == contentValue.length) {
            checkedAllStatus = true;
        } else {
            checkedAllStatus = false;
        }
        this.props.setparamshandle(paramsname, set);
        this.setState({
            contentValue, checkedAllStatus
        });


    }

    componentDidMount() {
        if (this.props.contentValue) {
            this.setState({
                contentValue: this.props.contentValue
            })
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.contentValue != nextProps.contentValue && nextProps.contentValue) {
            this.setState({
                contentValue: nextProps.contentValue,
                checkedAllStatus: false
            })
        }
    }

    componentWillUnmount() {
    }

    render() {
        let {contentValue, checkedAllStatus} = this.state;

        let {placeholder, value, setparamshandle, paramsname, searchStyle} = this.props;
        return (
            <div className='MtGSModule'>
                <div className="MtGSModule-header">
                    <input className="input"
                           type="text"
                           value={value}
                           placeholder={placeholder}
                           onChange={(e) => {
                               setparamshandle(paramsname + 'ipt', e.target.value)
                           }}/>
                    <Checkbox checked={checkedAllStatus} onChange={this.selectAll}>全选</Checkbox>
                </div>
                <div className="MtGSModule-content">
                    {
                        searchStyle == 0
                            ?
                            <Tags
                                contentValue={contentValue}
                                paramsname={paramsname}
                                selectAlone={this.selectAlone}
                            />
                            :
                            <Group
                                contentValue={contentValue}
                                paramsname={paramsname}
                                selectAlone={this.selectAlone}
                            />
                    }
                </div>
            </div>
        )
    }
}
