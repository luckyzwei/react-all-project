
import React, {Component} from 'react'
import './index.css'

function paramsIndexS(str) {
    switch (str) {
        case "0":
        case 0:
            return "一"
            break;
        case "1":
        case 1:
            return "二"
            break;
        case "2":
        case 2:
            return "三"
            break;

    }
}

export default class MatterCard extends Component {
    constructor() {
        super();
        this.state = {}
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    render() {
        let {} = this.state;
        let {editMatterModal, deleteMatterModal, paramsIndex,title} = this.props;
        return (
            <div className='MatterCard'>
                <div className="MatterCard-header" onClick={editMatterModal.bind(this, paramsIndex)}>
                    <div className="MatterCard-header-icon"></div>
                    <div className="MatterCard-header-text">{title}</div>
                </div>
                <div className="MatterCard-footer">
                    <div className="MatterCard-footer-btn delete" onClick={(e)=>{deleteMatterModal(paramsIndex, e)}}>
                        <span className="MatterCard-footer-btn-icon delete"></span>
                        删除
                    </div>
                    <div className="MatterCard-footer-btn-line"></div>
                    <div className="MatterCard-footer-btn" onClick={editMatterModal.bind(this, paramsIndex)}>
                        <span className="MatterCard-footer-btn-icon edit"></span>
                        编辑
                    </div>
                </div>
            </div>
        )
    }
}
