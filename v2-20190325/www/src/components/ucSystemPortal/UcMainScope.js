import React, { Component } from 'react'
import UserManage from './UserManage'
import UserPower from './UserPower'




export default class UcMainScope extends Component {
    constructor(props) {
        super(props)
        this.state = {
            viewShow: '',
            detailMsg: '',
        }
        this.changeViewShow = this.changeViewShow.bind(this)
    }
    componentWillMount() {

    }
    componentDidMount() {
    }
    changeViewShow(value, show) {
        this.setState({
            detailMsg: value,
            viewShow: show,
        })
    }
    render() {
        const { actions, userInfo } = this.props;
        const { viewShow, detailMsg } = this.state;
        let viewScope;
        switch (viewShow) {
            case 'MANAGE':
                viewScope = <UserManage changeViewShow={this.changeViewShow} />;
                break;
            case 'POWER':
                viewScope = <UserPower detailMsg={detailMsg} changeViewShow={this.changeViewShow} />;
                break;
            default:
                viewScope = <UserManage changeViewShow={this.changeViewShow} />;
        }
        return (
            <div className='jm-container' style={{ overflow: 'auto', background: '#F0F1F3', padding: "24px" }}>
                {viewScope}
            </div>
        )
    }
}
