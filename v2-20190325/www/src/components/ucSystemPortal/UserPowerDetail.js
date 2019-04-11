import React, {Component} from 'react'

export default class Test extends Component {
    constructor() {
        super();
        this.state = {
            menuMsg: [],
            typeManageOpen: [],
            manageDetailOpen: [],
            typeManageChecked: [],
            manageDetailChecked: [],
            lastDetailChecked: [],
            checkedAll: false
        }
    }

    componentWillMount() {
        // console.log(12312312, this.props.menuMsg);
        let {typeManageOpen, manageDetailOpen} = this.state;
        let {menuMsg} = this.props;
        let typeManage = [];
        let allLength = 0;
        menuMsg.forEach((item, index) => {
            if (item.selected) {
                allLength++
            }
            ;
            typeManageOpen.push(true);
            item.children == null
                ? typeManage.push([])
                : typeManage.push(item.children);
        });
        typeManage.forEach((item, index) => {
            let manageManage = [];
            manageManage.push(true)
            manageDetailOpen.push(manageManage);
        })
        this.setState({
            menuMsg: menuMsg,
            checkedAll: allLength === menuMsg.length
        })
        // console.log(typeManageOpen, manageDetailOpen,)

    }

    componentDidMount() {

    }

    getTypeManage(index, e) {
        // console.log(index, e.target)
        const {typeManageOpen} = this.state;
        typeManageOpen[index] = !typeManageOpen[index];
        this.setState({
            typeManageOpen: typeManageOpen
        })
    }

    openDetail(firstIndex, lastIndex) {
        let {manageDetailOpen} = this.state;
        manageDetailOpen[firstIndex][lastIndex] = !manageDetailOpen[firstIndex][lastIndex];
        this.setState({
            manageDetailOpen: manageDetailOpen
        })
    }

    changeTypeManageCheckedAll(e) {
        e.stopPropagation();
        let {menuMsg, checkedAll} = this.state;
        // console.log(menuMsg);

        menuMsg = menuMsg.map((item, index) => {
            item.selected = !checkedAll;
            if (item.children != null) {
                item.children.map((items, indexs) => {
                    items.selected = item.selected;
                    if (items.children != null) {
                        items.children.map((itemss, indexss) => {
                            itemss.selected = item.selected
                        })
                    }
                })
            }
            return item;
        });
        // console.log(menuMsg)
        this.props.changeMenuMsg(menuMsg);
        this.setState({
            menuMsg: menuMsg,
            checkedAll: !checkedAll
        })
    }

    changeTypeManageChecked(index, e) {
        e.stopPropagation();
        let {menuMsg} = this.state;
        let a = [];
        menuMsg[index].selected = !menuMsg[index].selected;
        if (menuMsg[index].children != null) {
            menuMsg[index].children.forEach((item, i) => {
                menuMsg[index].children[i].selected = menuMsg[index].selected;
                if (menuMsg[index].children[i].children != null) {
                    menuMsg[index].children[i].children.forEach((val, j) => {
                        menuMsg[index].children[i].children[j].selected = menuMsg[index].selected
                    })
                }

            })
        }
        // console.log(menuMsg);

        menuMsg.map((item, index) => {
            a.push(item.selected);
            if (item.children != null) {
                item.children.map((items, indexs) => {
                    a.push(items.selected);
                    if (items.children != null) {
                        items.children.map((itemss, indexss) => {
                            a.push(itemss.selected);
                        })
                    }
                })
            }
        });
        // console.log(a);
        // console.log(a.indexOf(false));
        let s = true;
        if (a.indexOf(false) > -1) {
            s = false
        }
        this.props.changeMenuMsg(menuMsg)
        this.setState({
            menuMsg: menuMsg,
            checkedAll: s
        })
    }

    changeManageDetailChecked(firstIndex, lastIndex, e) {
        e.stopPropagation();
        let {menuMsg} = this.state;
        menuMsg[firstIndex].children[lastIndex].selected = !menuMsg[firstIndex].children[lastIndex].selected;
        let menuMsgSelect = false;
        menuMsg[firstIndex].children.forEach((item, index) => {
            if (menuMsg[firstIndex].children[index].selected) {
                menuMsgSelect = true
            }
        })
        if (menuMsg[firstIndex].children[lastIndex].children != null) {
            menuMsg[firstIndex].children[lastIndex].children.forEach((val, index) => {
                menuMsg[firstIndex].children[lastIndex].children[index].selected = menuMsg[firstIndex].children[lastIndex].selected
            })
        }
        menuMsgSelect ? menuMsg[firstIndex].selected = menuMsgSelect : ''
        // menuMsg[firstIndex].selected=menuMsgSelect;
        this.props.changeMenuMsg(menuMsg)
        let a = [];
        menuMsg.map((item, index) => {
            a.push(item.selected);
            if (item.children != null) {
                item.children.map((items, indexs) => {
                    a.push(items.selected);
                    if (items.children != null) {
                        items.children.map((itemss, indexss) => {
                            a.push(itemss.selected);
                        })
                    }
                })
            }
        });
        let s = true;
        if (a.indexOf(false) > -1) {
            s = false
        }
        this.setState({
            menuMsg: menuMsg,
            checkedAll: s
        })

    }

    changeLastDetailChecked(firstIndex, midIndex, lastIndex) {
        let {menuMsg} = this.state;
        // console.log(firstIndex,midIndex,lastIndex);
        menuMsg[firstIndex].children[midIndex].children[lastIndex].selected = !menuMsg[firstIndex].children[midIndex].children[lastIndex].selected;
        let midSelect = false;
        menuMsg[firstIndex].children[midIndex].children.forEach((item, index) => {
            item.selected ? midSelect = true : ''
        });
        midSelect ? menuMsg[firstIndex].children[midIndex].selected = midSelect : ''
        // menuMsg[firstIndex].children[midIndex].selected=midSelect;
        let firstSelect = false;
        menuMsg[firstIndex].children.forEach((item, index) => {
            item.selected ? firstSelect = true : ''
        })
        firstSelect ? menuMsg[firstIndex].selected = firstSelect : ''
        // menuMsg[firstIndex].selected=firstSelect;
        this.props.changeMenuMsg(menuMsg)
        let a = [];
        menuMsg.map((item, index) => {
            a.push(item.selected);
            if (item.children != null) {
                item.children.map((items, indexs) => {
                    a.push(items.selected);
                    if (items.children != null) {
                        items.children.map((itemss, indexss) => {
                            a.push(itemss.selected);
                        })
                    }
                })
            }
        });
        let s = true;
        if (a.indexOf(false) > -1) {
            s = false
        }
        this.setState({
            menuMsg: menuMsg,
            checkedAll: s
        })
    }

    render() {
        const {menuMsg, typeManageOpen, manageDetailOpen, checkedAll} = this.state
        return (
            <div className='set-power-main'>
                <div className='set-power-header'>
                    <div className='set-power-header-left'>
                        <span>*</span>
                        选择模块
                    </div>
                    <div className='set-power-header-right'>
                        全选
                        <span onClick={this.changeTypeManageCheckedAll.bind(this)}
                              className={checkedAll ? 'icon-gi checked' : 'icon-gi'}></span>
                    </div>
                </div>
                <ul>
                    {menuMsg.map((item, index) => {
                        return (
                            <li key={index}>
                            <span onClick={this.getTypeManage.bind(this, index)}>
                                {
                                    item.children == null ?
                                        <i>
                                        </i>
                                        : <i
                                            className={typeManageOpen[index]
                                                ? 'icon-set open'
                                                : 'icon-set close'
                                            }
                                        >
                                        </i>
                                }

                                {item.name}
                                <em
                                    className={item.selected
                                        ? "icon-gi checked"
                                        : 'icon-gi'
                                    }
                                    onClick={this.changeTypeManageChecked.bind(this, index)}
                                ></em>
                            </span>
                                {item.children != null ?
                                    <ul
                                        className="set-power-detail"
                                        style={{display: typeManageOpen[index] ? '' : 'none'}}
                                    >
                                        {item.children.map((val, i) => {
                                            return (
                                                <li
                                                    key={i}
                                                    style={{position: 'relative'}}
                                                >
                                                <span onClick={this.openDetail.bind(this, index, i)}>
                                                    {val.children == null ?
                                                        <i></i> :
                                                        <i
                                                            className={manageDetailOpen[index][i]
                                                                ? 'icon-set open'
                                                                : 'icon-set close'
                                                            }
                                                        >
                                                        </i>
                                                    }

                                                    {val.name}
                                                    <em

                                                        className={val.selected
                                                            ? "icon-gi checked"
                                                            : 'icon-gi'
                                                        }
                                                        onClick={this.changeManageDetailChecked.bind(this, index, i)}
                                                    >
                                                </em>
                                                </span>
                                                    <ul
                                                        className="lastDetail"
                                                        style={{display: manageDetailOpen[index][i] ? '' : 'none'}}>
                                                        {val.children == null ? '' :
                                                            val.children.map((v, j) => {
                                                                return (
                                                                    <li key={j} style={{position: 'relative'}}>
                                                                        {v.name}
                                                                        <em
                                                                            className={v.selected
                                                                                ? "icon-set checked"
                                                                                : 'icon-set'
                                                                            }
                                                                            onClick={this.changeLastDetailChecked.bind(this, index, i, j)}
                                                                        >
                                                                        </em>
                                                                    </li>
                                                                )

                                                            })}
                                                    </ul>
                                                </li>
                                            )
                                        })}
                                    </ul>
                                    : ''
                                }

                            </li>
                        )
                    })}
                </ul>
            </div>
        )
    }
}