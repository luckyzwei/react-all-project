import React, { Component, PropTypes } from 'react'
import { push, replace } from 'react-router-redux'
import promiseXHR from '../../funStore/ServerFun'
import AuthProvider from '../../funStore/AuthProvider'
import { API_PATH } from '../../constants/OriginName'
import RobotList from './RobotList'
import GoupList from './GoupList'



export default class RmMainScope extends Component {
    constructor(props) {
        super(props)
        this.state = {
            viewContoller: '',
            code: '',
            qrCode: '',
            robotId: '',
            robotNickName: '',
            robotStatus: '',
            groupLeaveNum: ''
        }
        this.changeView = this.changeView.bind(this)
        this.getQRCode = this.getQRCode.bind(this)
    }
    componentWillMount() {

    }
    componentDidMount() {
    }
    changeView(value) {
        this.setState({
            viewContoller: value
        })
    }
    getQRCode(code, qrCode, robotId, robotNickName, robotStatus, groupLeaveNum, h5Url) {
        this.setState({
            code: code,
            qrCode: qrCode,
            robotId: robotId,
            robotNickName: robotNickName,
            robotStatus: robotStatus,
            groupLeaveNum: groupLeaveNum,
            h5Url: h5Url
        })
    }
    render() {
        const { actions, userInfo } = this.props;
        const { selectData, viewContoller, code, qrCode, robotId, robotNickName, robotStatus, groupLeaveNum, h5Url } = this.state;
        let viewScope;
        switch (viewContoller) {
            case 'ROBOTLIST':
                viewScope = <RobotList changeView={this.changeView} getQRCode={this.getQRCode} />
                break;
            case 'GROUPLIST':
                viewScope = <GoupList
                    changeView={this.changeView}
                    code={code}
                    qrCode={qrCode}
                    robotId={robotId}
                    robotNickName={robotNickName}
                    robotStatus={robotStatus}
                    groupLeaveNum={groupLeaveNum}
                    h5Url={h5Url}
                />
                break;
            default:
                viewScope = <RobotList changeView={this.changeView} getQRCode={this.getQRCode} />
                break;
        }
        return (
            <div className='jm-container' style={{ overflow: 'auto', background: '#F8F8F9' ,height:'calc(100% - 60px)'}}>
                {viewScope}
            </div>
        )
    }
}
