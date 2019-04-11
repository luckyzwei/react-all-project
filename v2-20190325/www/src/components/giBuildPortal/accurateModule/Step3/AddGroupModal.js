import React,{Component} from 'react'
import ButtonBox from '../../../shareComponent/ButtonBox'

export default class AddGroupModal extends Component {
    addMoreGroupConfirm = () =>{
        const value = this.refs.groups.value
        const {addMoreGroupConfirm} = this.props
        addMoreGroupConfirm(value)
    }
    render(){
        const {addMoreGroupClick} = this.props
        return (
            <div className="modalWrapper">
                <div className="modalBox addBox">
                    <div className="titleBox">
                        <span>新增多群</span>
                        <span style={{color: '#B5BDC6',fontSize:'14px'}}>*每排默认一个群名称</span>
                    </div>
                    <textarea ref='groups' className='groupInput' autoFocus={true} placeholder='编辑或粘贴你的名称吧'></textarea>
                    <div className="buttonBox">
                        <ButtonBox
                            btnTxt={"取消"}
                            isCancel={true}
                            btnFunc={addMoreGroupClick}
                        />
                        <ButtonBox 
                            btnTxt={'确定'}
                            isCancel={false}
                            btnFunc={this.addMoreGroupConfirm}
                        />
                    </div>
                    <div className="closeBtn" onClick={addMoreGroupClick}></div>
                </div>
            </div>
        )
    }
}