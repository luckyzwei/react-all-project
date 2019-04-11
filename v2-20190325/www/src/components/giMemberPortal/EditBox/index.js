import React,{Component} from 'react'
import './index.css'
import { getMemberMessage, putMemberMessage } from '../../../funStore/FetchApi';
import Tag from 'antd/lib/tag'
import Input from 'antd/lib/input'
import Tooltip from 'antd/lib/tooltip'
import Icon from 'antd/lib/icon'
import 'antd/lib/tag/style/css'
import 'antd/lib/input/style/css'
import 'antd/lib/tooltip/style/css'
import 'antd/lib/icon/style/css'

// const mocaMemberData = {"resultCode":"100","detailDescription":"success","resultContent":{"labels":null,"imMemPrivilegeResp":{"memId":"f5933f54-f3bb-4be3-a5e1-e13c2a067537","groupId":"46608fd3-93cb-4ba9-83cd-895a28f07af4","mapId":"1144fe67-7290-4f55-8d1a-9ffeac7af488","nickName":"叶振华","remarkName":null,"sourceType":2,"addMemberPrivilege":0,"dropMemberPrivilege":0,"phone":null,"createDate":"2018-12-05T21:10:29","updateDate":null,"isBlackList":0,"status":null,"iconPath":"http://wx.qlogo.cn/mmhead/ver_1/qD3Cr9BibuNP3wDX5ECufygYvfZWrYRIEQsPDLib2h77ibBjP5GadQia8amnMN8C9LevyTiaf4SKdkv35jcyK5HSHgw/132","level":0}}}

export default class EditBox extends Component {
    constructor(props) {
        super(props)
        this.state = {
            personEdit: false,
            inputNum: 0,
            tags: [],
            tagArr: [],
            inputVisible: false,
            inputValue: '',
            memberMessage: '',//成员信息
            personEditContent: false
        };
        this.remarkName = this.remarkName.bind(this);
        this.editPerson = this.editPerson.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.showInput = this.showInput.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleInputConfirm = this.handleInputConfirm.bind(this);
        this.saveInputRef = this.saveInputRef.bind(this);
        this.confirmEdit = this.confirmEdit.bind(this)
    }
    componentDidMount(){
        this.editPerson()
    }

    remarkName(e) {
        let { memberMessage } = this.state
        memberMessage.remarkName = e.target.value
        this.setState({
            inputNum: e.target.value.length,
            memberMessage
        })
    }
    editPerson(e) {
        const {groupId,memberId} = this.props
        let params = {
            groupId: groupId,
            memberId: memberId
        };
        getMemberMessage(params).then(res => {
            res = JSON.parse(res);
            // res = mocaMemberData
            if (res.resultCode === '100') {
                this.setState({
                    memberMessage: res.resultContent.imMemPrivilegeResp,
                    tags: res.resultContent.labels || [],
                    tagArr: res.resultContent.labels || [],
                    personEditContent: true,
                    inputNum: res.resultContent.imMemPrivilegeResp.remarkName?res.resultContent.imMemPrivilegeResp.remarkName.length:0
                })
            }
        }).catch(req => {
            console.log(req)
        })
    }
    handleClose = (removedTag) => {
        let tags = this.state.tags;
        let tagArr = this.state.tagArr;
        tags = tags.filter(tag => tag !== removedTag)
        let as = tagArr.find(tag => tag === removedTag);
        if (as.id) {
            let a = tagArr.find(tag => tag === removedTag);
            a.flag = 0;
        } else {
            tagArr = tagArr.filter(tag => tag !== removedTag)
        }
        this.setState({ tags, tagArr });
    }
    showInput = () => {
        this.setState({ inputVisible: true }, () => this.input.focus());
    }
    handleInputChange = (e) => {
        this.setState({ inputValue: e.target.value });
    }
    handleInputConfirm = () => {
        let state = this.state;
        let inputValue = state.inputValue;
        let tags = state.tags;
        let tagArr = state.tagArr;
        if (inputValue && tags.indexOf(inputValue) === -1) {
            let se = {
                name: inputValue,
                flag: 1
            }
            tags = [...tags, se];
            tagArr = [...tagArr, se]
        }
        this.setState({
            tags,
            tagArr,
            inputVisible: false,
            inputValue: '',
        });
    }
    saveInputRef = input => this.input = input

    confirmEdit(e) {
        const{memberMessage} = this.state
        const {groupId,memberId} = this.props
        let params = {
            groupId: groupId,
            memberId: memberId,
            query: {
                labels: this.state.tagArr,
                remarkName: this.state.memberMessage.remarkName
            }
        }
        this.setState({personEditContent: false})
        putMemberMessage(params).then(res => {
            res = JSON.parse(res);
            if (res.resultCode === '100') {
                this.props.refreshFunc&&this.props.refreshFunc();
                this.props.cancelEdit&&this.props.cancelEdit()
            } else {
                // console.log(res.detailDescription)
            }
        }).catch(req => {
            console.log(req)
        })
    }

    render(){
        let { personEdit, inputNum, tags, inputVisible, inputValue, memberMessage, personEditContent } = this.state
        const {cancelEdit} = this.props
        return (
            <div className="personEditBox">
                <div className="personEditContent">
                    <div className='personEditContentTitle'>编辑信息</div>
                    <div className='personEditContentBox'>
                        <img className='img' src={memberMessage.iconPath} />
                        <span className='name'>{memberMessage.nickName}</span>
                        <aside className='inputBox'>
                            <span className='inputBoxTitle'>备注名：</span>
                            <section className='inputMain'>
                                <input maxLength='16' className='inputMainIpt' placeholder="请输入"
                                    onChange={this.remarkName} value={memberMessage.remarkName||''} />
                                <span className='inputMainIptNum'>{inputNum}/16</span>
                            </section>
                        </aside>
                        <aside className='tagBox'>
                            <span className='tagBoxTitle'>标签：</span>
                            <section className='tagBoxMain'>
                                {
                                    tags.map((tag, index) => {
                                        const isLongTag = tag.length > 20;
                                        const tagElem = (
                                            <Tag key={tag.id} closable
                                                color="green"
                                                afterClose={() => this.handleClose(tag)}>
                                                {isLongTag ? `${tag.slice(0, 20)}...` : tag.name}
                                            </Tag>
                                        );
                                        return isLongTag ?
                                            <Tooltip title={tag.name} key={index}>{tagElem}</Tooltip> : tagElem;
                                    })}
                                {inputVisible && (
                                    <Input
                                        ref={this.saveInputRef}
                                        type="text"
                                        size="small"
                                        style={{ width: 78 }}
                                        value={inputValue}
                                        onChange={this.handleInputChange}
                                        onBlur={this.handleInputConfirm}
                                        onPressEnter={this.handleInputConfirm}
                                    />
                                )}
                                {!inputVisible && (
                                    <Tag
                                        onClick={this.showInput}
                                        style={{ background: '#f8f8f8', borderColor: '#f8f8f8', marginBottom: "0" }}
                                    >
                                        <Icon type="plus" /> 添加标签
                                </Tag>
                                )}
                            </section>
                        </aside>
                        <div className='personEditContentBoxFooter'>
                            <div className='cancel btn' onClick={cancelEdit}>取消</div>
                            <div className='confirm btn' onClick={this.confirmEdit}>确认</div>
                        </div>
                    </div>
                    <div className="refreshBox" style={{display:personEditContent?'none':'block'}}>
                        <img className='refreshBox-img' src={`${process.env.PUBLIC_URL}/images/icon/loading.svg`} alt=""/>
                    </div>
                </div>
            </div>
        )
    }
}