import React,{Component} from 'react'
import HandleInnerBox from './HandleInnerBox'
import {tongji} from '../../funStore/tongji'

const navLists = [{
    menuTitle: '群用户'
}, {
    menuTitle: '内容库'
}, {
    menuTitle: '群投放'
}]

const MenuList = ({menuTitle, id, currentId}) => {
    return (
        <div className ={id === currentId?'menuTitle menuTitle-active':'menuTitle '}>{menuTitle}</div>
    )
}
const IconList = ({id,currentId}) => {
    return (
        <div className={id === currentId?'green gm-rightIcon':'animation gm-rightIcon'}>
            <div className={id === currentId?'menuIcon icon-gm ':'unactiveMenu menuIcon menuIcons icon-gm'}></div>
        </div>
    )
}

class HandleInner extends Component {
    constructor(props){
        super(props)
        this.state={
            currentId: -1,
            isExpand: true,
            taskTip:"所有群投放"
        }
        this.clickHandle = this.clickHandle.bind(this)
    }
    changeTaskTip(){
        this.setState({
            taskTip:"搜索结果"
        })
    }
    clickHandle(id){
        const tjArr = ['Lzc_QunXiaoXi_QunYongHu','Lzc_QunXiaoXi_NeiRongKu','Lzc_QunXiaoXi_QunTouFang']
        tongji(tjArr[id])
        this.setState({ 
            currentId: id,
            isExpand: false
        })
    }
    expandClickHandle = () =>{
        this.setState({ 
            currentId: -1,
            isExpand: true
        })
    }
    render () {
        let {currentId,isExpand,taskTip} = this.state;
        const {memberList,groupId,actions,tagEdit,searchKey,selectRoom,setIdForLabel,microTaskList,cwList,keyForMember,changeKeyForMember,hotTip,hotTipIcon,changeHotTip,groupList,userInfo,removeTagBox,selectRoomType,socket} = this.props
        return (
            <div className={isExpand?'handleInner handleInner-expand':'handleInner'}>
                <div className='naviHandle'>
                    {!isExpand?<div className="closeBtn icon-set" onClick={this.expandClickHandle}></div>:''}
                    <div className ="navWrapper">
                        {navLists.map((navList,id)=>
                            <div className ="menuWrapper" key = {'menuWrapper'+id} id={'menuWrapper'+id} onClick={()=>{this.clickHandle(id)}}>
                                {/* <div className="icon-text bottom">{navList.menuTitle}</div> */}
                                <IconList id={id} currentId={currentId}/>
                                <MenuList menuTitle={navList.menuTitle} id={id} currentId={currentId}/>
                            </div>
                        )}
                    </div>
                </div> 
                <HandleInnerBox currentId={currentId}
                memberList = {memberList}
                groupId = {groupId}
                actions = {actions}
                tagEdit = {tagEdit}
                searchKey = {searchKey}
                selectRoomType={selectRoomType}
                selectRoom = {selectRoom}
                setIdForLabel = {setIdForLabel}
                microTaskList = {microTaskList}
                cwList = {cwList}
                keyForMember = {keyForMember}
                changeKeyForMember = {changeKeyForMember}
                hotTip={hotTip}
                changeHotTip={changeHotTip}
                hotTipIcon={hotTipIcon}
                taskTip={taskTip}
                changeTaskTip={this.changeTaskTip.bind(this)}
                groupList={groupList}
                userInfo={userInfo}
                removeTagBox={removeTagBox}
                socket={socket}
                />
            </div>
        )
    }
}

export default HandleInner
