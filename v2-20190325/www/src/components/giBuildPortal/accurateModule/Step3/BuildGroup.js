import React,{Component} from 'react'
import './index.css'
import AddGroupModal from './AddGroupModal'
import RulePreviewModal from './RulePreviewModal'
import ModalBox from '../../../shareComponent/ModalBox'

class IptBox extends Component {
    constructor(props){
        super(props)
        this.state = {
            defaultValue: props.defaultValue
        }
    }
    componentDidMount() {
        this._input&&this._input.focus();
    }
    render(){
        const {defaultValue} = this.state
        const {confirmHandle} = this.props
        return (
            <input 
                type="text" 
                ref={c => (this._input = c)} 
                className='groupInput' 
                placeholder='请输入群名称' 
                defaultValue={defaultValue} 
                onKeyUp = {
                    (e) => {
                        e.stopPropagation();
                        e.keyCode == 13 && confirmHandle(e.target.value)
                    }
                }
                onBlur = {
                    (e) => {
                        e.stopPropagation();
                        confirmHandle(e.target.value)
                    }
                }
                onClick={(e)=>{e.stopPropagation()}}
                />
        )
    }
}

// status 
// 1 新建 可编可删可预览
// 2 已绑规则 不可编，不可删
// 3 为绑规则 不可编，不可删

class GroupItem extends Component {
    constructor(props){
        super(props)
        this.state = {
            preview_flag: false
        }
    }
    editGroupClick = () =>{
        const {editGroupClick,index} = this.props
        editGroupClick(index)
    }
    editGroupConfirm =(groupName)=>{
        const {editGroupConfirm,index} = this.props
        editGroupConfirm(groupName,index)
    }
    deleteConfirm = () => {
        const {index,deleteGroupConfirm} =this.props
        deleteGroupConfirm(index)
    }
    showPreviewHandle = () =>{
        this.setState({
            preview_flag: true
        })
    }
    closePreviewHandle = () =>{
        this.setState({
            preview_flag: false
        })
    }
    render(){
        const {preview_flag} = this.state
        const {group,editGroupConfirm,editGroupClick,index,delete_flag,deleteClick,deleteCancel,selectGroupRuleData,filterTxt,modalStyle} = this.props
        return (
            <div className={`groupItem ${group.selected?'active':''} ${group.errorFlag?'error':''}`} onClick={selectGroupRuleData} style={{display:group.groupName.includes(filterTxt)?'flex':'none'}}>
                {
                    group.editFlag
                    ?<IptBox defaultValue={group.groupName} confirmHandle={this.editGroupConfirm}/>
                    :<span className="groupName">
                        <span dangerouslySetInnerHTML={{__html:group.groupName}}></span>
                        {
                            group.groupRule.status===1
                                ?<span className='flag'>已绑规则</span>
                                :''
                        }
                        
                    </span>
                }
                <span className={`operate ${group.selected?'active':''}`} onClick={(e)=>{e.stopPropagation()}}>
                    {
                        !group.groupRule.id
                        ? <span className="operate-icon edit" onClick={this.editGroupClick}>
                            <span className="iconText">编辑</span>
                        </span>
                        :''
                    }
                    {
                        !group.groupRule.id
                        ?<span className="operate-icon delete" onClick={(e)=>{deleteClick(index,e)}}>
                            <span className="iconText">删除</span>
                        </span>
                        :''
                    }
                    <span className="operate-icon viewRule" onClick={this.showPreviewHandle}>
                        <span className="iconText">预览规则</span>
                    </span>
                    <ModalBox
                        modalStatus={delete_flag==index}
                        modalTxt={'确定要删除这个群吗？'}
                        confirmTxt={'删除'}
                        modalStyle={modalStyle}
                        closeModalFunc={deleteCancel}
                        confirmFunc={this.deleteConfirm}
                        isDelete={true}
                    />
                </span>
                {
                    preview_flag&&<RulePreviewModal groupRuleData={group} closeHandle={this.closePreviewHandle}/>
                }
            </div>
        )
    }
}

export default class BuildGroup extends Component {
    constructor(props){
        super(props)
        this.state = {
            addFlag: false,
            addMoreFlag: false,
            delete_flag: -1,//第N项删除标志位
            filterTxt: '',
            modalStyle: {}
        }
    }
    componentDidMount() {
        this._input&&this._input.focus();
    }
    // 新增群操作
    addGroupClick = ()=>{
        let {ruleData,updateRuleData} = this.props
        ruleData = ruleData.map(v => ({
            ...v,
            editFlag: 0
        }))
        this.setState({
            addFlag:true 
        })
        updateRuleData(ruleData)
    }
    addGroupConfirm = (groupName) => {
        let {ruleData,ruleTemp,updateRuleData} = this.props
        // console.log(ruleTemp)
        let newGroup = JSON.parse(ruleTemp)
        newGroup.groupName = groupName.trim().slice(0,15)
        newGroup.groupRule.name = groupName.trim().slice(0,15)
        if(ruleData.length==0){
            newGroup.selected=1
        }
        if(newGroup.groupName!==''){
            ruleData.unshift(newGroup)
            updateRuleData(ruleData)
        }
        this.setState({
            addFlag:false 
        })
    }

    // 编辑群操作
    editGroupClick = (index) => {
        let {ruleData,updateRuleData} = this.props
        ruleData = ruleData.map((v,i)=>({
            ...v,
            editFlag: i==index?1:0
        }))
        this.setState({
            addFlag: false
        })
        updateRuleData(ruleData)
    }
    editGroupConfirm = (groupName,i) => {
        let {ruleData,updateRuleData} = this.props
        ruleData[i].editFlag = false
        let newValue = groupName.trim().slice(0,15)
        if (newValue!=='') {
            ruleData[i].groupName = newValue
            ruleData[i].groupRule.name = newValue
            updateRuleData(ruleData)
        }else{
            this.deleteClick()
        }
    }

    // 删除群操作
    deleteClick = (index,e) =>{
        let modalStyle = {}
        modalStyle.left = e.clientX+'px'
        modalStyle.top = e.clientY+'px'
        this.setState({
            modalStyle,
            delete_flag: index 
        })
    }
    deleteCancel =()=>{
        this.setState({
            delete_flag: -1 
        })
    }
    deleteGroupConfirm =(i) => {
        let {ruleData,updateRuleData} = this.props
        ruleData.splice(i,1)
        this.deleteCancel()
        updateRuleData(ruleData)
    }

    // 新增多个群
    addMoreGroupClick = ()=>{
        this.setState({
            addMoreFlag: !this.state.addMoreFlag
        })  
    }
    addMoreGroupConfirm = (groups) =>{
        groups = groups.split(/\n/)
        // console.log(groups)
        let {ruleData,ruleTemp,updateRuleData} = this.props
        groups.forEach(v => {
            let newGroup = JSON.parse(ruleTemp)
            newGroup.groupName = v.trim().slice(0,15)
            newGroup.groupRule.name = v.trim().slice(0,15)
            if(newGroup.groupName!==''){
                ruleData.unshift(newGroup)
            }
        })
        updateRuleData(ruleData)
        this.setState({
            addMoreFlag: false
        }) 
    }
    searchHandle=(e)=>{
        this.setState({
            filterTxt: e.target.value.trim()
        })
    }
    render(){
        const {addFlag,delete_flag,addMoreFlag,filterTxt,modalStyle} = this.state
        const {ruleData,selectGroupRuleData} = this.props
        return (
            <div className="leftContent">
                <div className="contentTitle">群列表</div>
                <div className="addGroupBox">
                    <div className="searchBox">
                        <input type="text" className="searchInput" placeholder='输入群名称搜索' value={filterTxt} onChange={this.searchHandle}/>
                        <span className="addBtn" onClick={this.addMoreGroupClick}>新建多个群</span>
                    </div>
                    <div className="groupList">
                            {
                                addFlag
                                ?<div className="addGroup"><IptBox defaultValue={''} confirmHandle={this.addGroupConfirm}/></div>
                                :<div className="addGroup" onClick={this.addGroupClick}><span>+ 新建微信群</span></div>
                            }                            
                            {
                                ruleData.map((v,i) => {
                                    return (
                                        <GroupItem 
                                            key={i} 
                                            index={i}
                                            group={v} 
                                            modalStyle={modalStyle}
                                            editGroupClick={this.editGroupClick}
                                            editGroupConfirm={this.editGroupConfirm}
                                            deleteGroupConfirm={this.deleteGroupConfirm}
                                            delete_flag={delete_flag}
                                            deleteClick={this.deleteClick}
                                            deleteCancel={this.deleteCancel}
                                            selectGroupRuleData={()=>{selectGroupRuleData(i)}}
                                            filterTxt={filterTxt}
                                        />
                                    )
                                })
                            }
                    </div>
                </div>
                {
                    addMoreFlag
                    ?<AddGroupModal addMoreGroupClick={this.addMoreGroupClick} addMoreGroupConfirm={this.addMoreGroupConfirm}/>
                    :''
                }
            </div>
        )
    }
}