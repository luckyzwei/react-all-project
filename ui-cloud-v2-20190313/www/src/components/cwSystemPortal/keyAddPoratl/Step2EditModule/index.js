import React, {Component} from 'react'
import './index.css'
import MtPhone from "../../../mtBuildPortal/MtPhone";
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
            delparamsData, createparamsData, saveMatterContent,editId,type
        } = this.props;
        // console.log(this.props)
        return (
            <div className='Step2EditModule'>
                <div className="Step2EditModule-content">
                    <div className="Step2EditModule-content-close" onClick={editMatterModal.bind(this,-1,type)}></div>
                    <div className="MtBuildMain-content">
                        <div className="MtBuildMain-content-left">
                            <MtPhone
                                paramsValue={paramsValue}
                            />
                        </div>
                        <div className="MtBuildMain-content-right">
                            <MatterEdit
                                setparamshandler={setparamshandler}
                                paramsValue={paramsValue}
                                delparamsData={delparamsData}
                                editId={editId}
                                createparamsData={createparamsData}
                                saveMatterContent={saveMatterContent}
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
