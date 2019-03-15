import React,{Component} from 'react'
import './index.css'
import MatterGroup from "../../../mtBuildPortal/MatterGroup";

export default class Step3 extends Component {
    constructor() {
        super();
        this.state = {
            repeatGroupId:[]
        }
        this.saveGroupId = this.saveGroupId.bind(this);
        this.confirmPutTask= this.confirmPutTask.bind(this);
     }
    saveGroupId(){

    }
    confirmPutTask(){

    }
     componentDidMount(){}
     componentWillUnmount(){}
     render(){
          let {repeatGroupId} = this.state;
          let {changeStep,confirmData,viewId} = this.props;
          return(
              <div className='Step3'>
                  {/* <div className="Step3-title">
                      第三步：选择生效目标群
                  </div> */}
                  <div className="stepTitle">
                    <span className='done'>1.新增关键词</span>
                    <span className='done' style={{margin:'0 12px'}}>></span>
                    <span className='done'>2.编辑自动回复素材</span>
                    <span className='done' style={{margin:'0 12px'}}>></span>
                    <span className='done'>3.选择生效目标群</span>
                </div>
                  <div className="MtBuildMain-content">
                      <MatterGroup
                          setparamshandler={this.setparamshandler}
                          changeStep={changeStep}
                          viewId={viewId}
                          groupIdArray={confirmData.groupItems || []}
                          confirmPutTask={this.confirmPutTask}
                          updateGroupId={this.props.updateGroupId}
                          saveGroupId={this.props.saveGroupId}
                          repeatGroupId={repeatGroupId}
                      />
                  </div>
              </div>
              )
     }
}
