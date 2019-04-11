import React, { Component, PropTypes } from 'react'
import './index.css'
import RobotList from './RobotList'
import GoupList from './GoupList'
import Overview from './Overview'

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
            groupLeaveNum: '',
            overviewData: null
        }
        this.changeView = this.changeView.bind(this)
        this.getQRCode = this.getQRCode.bind(this)
    }
    changeView(value) {
        this.setState({
            viewContoller: value
        })
    }
    setOverviewData=(overviewData)=>{
        this.setState({overviewData})
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
        const { viewContoller, code, qrCode, robotId, robotNickName, robotStatus, groupLeaveNum, h5Url ,overviewData} = this.state;
        let viewScope;
        switch (viewContoller) {
            case  'OVERVIEW':
                viewScope = <Overview changeView={this.changeView} overviewData={overviewData} setOverviewData={this.setOverviewData}/>
                break;
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
                viewScope = <Overview changeView={this.changeView} overviewData={overviewData} setOverviewData={this.setOverviewData}/>
                break;
        }
        return (
            <div className='jm-container' style={{ overflow: 'auto', background: '#F8F8F9' ,height:'calc(100% - 60px)'}}>
                {viewScope}
            </div>
        )
    }
}
