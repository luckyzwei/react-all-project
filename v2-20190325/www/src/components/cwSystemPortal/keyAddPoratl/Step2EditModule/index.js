/**
 * 创建时间:2018-10-08 10:40:42
 * 作者：sufei  Xerath
 * 邮箱：fei.su@gemii.cc
 * 版本号：1.0
 * @版权所有
 **/
import React, {Component} from 'react'
import './index.css'
// import MtPhone from "../../../mtBuildPortal/MtPhone";
import MatterEdit from "../../../mtBuildPortal/MatterEdit";

export default class Step2EditModule extends Component {
    constructor() {
        super();
        this.state = {}
    }

    componentDidMount() {
    }

    render() {
        let {} = this.state;
        let {
            editMatterModal, paramsValue, setparamshandler,
            delparamsData, createparamsData, saveMatterContent,editId,type,
            setparam,checkDate} = this.props;
        // console.log(this.props)
        return (
            <div className='Step2EditModule'>
                <div className="Step2EditModule-content">
                    <div className="Step2EditModule-content-close" onClick={editMatterModal.bind(this,-1,type)}></div>
                    <div className="MtBuildMain-big-content">
                        {/* <div className="MtBuildMain-content-left">
                            <MtPhone
                                paramsValue={paramsValue}
                            />
                        </div>
                        <div className="MtBuildMain-content-right"> */}
                            <MatterEdit
                                setparam={setparam}
                                checkDate={checkDate}
                                setparamshandler={setparamshandler}
                                paramsValue={paramsValue}
                                delparamsData={delparamsData}
                                editId={editId}
                                createparamsData={createparamsData}
                                saveMatterContent={saveMatterContent}
                            />
                        {/* </div> */}
                    </div>
                </div>
            </div>
        )
    }
}
