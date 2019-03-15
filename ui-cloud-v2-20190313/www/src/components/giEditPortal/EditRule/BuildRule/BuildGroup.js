import React,{Component} from 'react'
import RulePreviewModal from './RulePreviewModal'

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
        const {group,selectGroupRuleData,filterTxt} = this.props
        return (
            <div className={`groupItem ${group.selected?'active':''} ${group.errorFlag?'error':''}`} onClick={selectGroupRuleData} style={{display:group.groupName.includes(filterTxt)?'flex':'none'}}>
                <span className="groupName">
                    <span dangerouslySetInnerHTML={{__html:group.groupName}}></span>
                    {
                        group.groupRule.status===0
                        ?<span className='flag'>未绑定规则</span>
                        :group.groupRule.status===1
                            ?<span className='flag'>已绑规则</span>
                            :''
                    }
                </span>
                <span className={`operate ${group.selected?'active':''}`} onClick={(e)=>{e.stopPropagation()}}>
                    <span className="operate-icon viewRule" onClick={this.showPreviewHandle}>
                        <span className="iconText">预览规则</span>
                    </span>
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
            filterTxt:''
        }
    }
    searchHandle=(e)=>{
        this.setState({
            filterTxt: e.target.value.trim()
        })
    }
    render(){
        const {filterTxt} = this.state
        const {ruleData,selectGroupRuleData} = this.props
        return (
            <div className="leftContent">
                <div className="contentTitle">群列表</div>
                <div className="addGroupBox">
                    <div className="searchBox">
                        <input type="text" className="searchInput" placeholder='输入群名称搜索' style={{width:'100%'}} value={filterTxt} onChange={this.searchHandle}/>
                    </div>
                    <div className="groupList">                         
                            {
                                ruleData.map((v,i) => {
                                    return (
                                        <GroupItem 
                                            key={i} 
                                            index={i}
                                            group={v} 
                                            selectGroupRuleData={()=>{selectGroupRuleData(i)}}
                                            filterTxt={filterTxt}
                                        />
                                    )
                                })
                            }
                    </div>
                </div>
            </div>
        )
    }
}