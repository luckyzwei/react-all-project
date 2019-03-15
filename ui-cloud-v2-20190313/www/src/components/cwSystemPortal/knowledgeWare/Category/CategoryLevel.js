
import React,{Component} from 'react'
import {textCountIndex} from '../../../../funStore/CommonFun'
const textMap = {
    1: '添加二级目录',
    2: '添加三级目录'
}

class CategoryItem extends Component {
    constructor(props){
        super(props)
        this.state = {
            showFlag: false
        }
    }
    
    componentDidMount () {
        window.addEventListener('click',this.hideHandle)
    }
    componentWillUnmount () {
        window.removeEventListener('click',this.hideHandle)
    }

    showHandle=()=>{
        this.setState({
            showFlag: true
        })
    }

    hideHandle=(e)=>{
        if(e.target.id!=this.props.item.id){
            this.setState({
                showFlag: false
            })
        }
    }
    clickHandle = (id,name) => {
        // 查询对应目录的知识库内容
        let all = name == '未分类' ? 1 : null
        const {parentId,grandparentId,type,currentId} = this.props
        this.props.getListByItem({
            currentId,
            type,
            selectId: id,
            parentId: parentId,
            grandparentId: grandparentId
        },'post',all)
    }

    addHandle = () => {
        const {type,item,showModalHandle} = this.props
        showModalHandle('ADD',type+1,null,item.id)
    }
    editHandle = () => {
        const {type,item,showModalHandle,parentId} = this.props
        showModalHandle('EDIT',type,item,parentId)
    }
    render(){
        const {showFlag} = this.state
        const {parentId,grandparentId,type,item,currentId,getListByItem,showModalHandle} = this.props
        // console.log(item)
        return (
            <div className={currentId==item.id?"categoryItem active":"categoryItem"}>
                {/* <span className='circle' style={{display:type==1?'block':'none'}}></span> */}
                <span className='text' onClick={()=>{this.clickHandle(item.id,item.className)}}>{item.className} ({item.firstCount})</span>     
                {
                    item.className !== '未分类' ? 
                    <span id={item.id} className='icon-edit' 
                        tabIndex='1'
                        onClick={this.showHandle}
                        style={showFlag?{visibility: 'visible'}:{}}
                    >
                        <div className="more" style={{display:showFlag?'block':'none'}}>
                            {/* {type!=3?<div onClick={this.addHandle}>{textMap[type]}</div>:''} */}
                            <div onClick={this.editHandle}>修改名称</div>
                        </div>
                    </span>
                    :''
                }
            </div>
        )
    }
}

export class CategoryLevel2 extends Component {
    constructor(props){
        super(props)
        this.state = {}
    }
    render(){
        const {dataLevel2,showModalHandle,parentId,selectCategory,getListByItem} = this.props
        const data3 = dataLevel2.thirdClass
        return (
            <div className="li-level2">
                <CategoryItem 
                    item={dataLevel2} 
                    showModalHandle={showModalHandle}
                    type={2} 
                    parentId={parentId} 
                    grandparentId={null}
                    currentId={selectCategory} 
                    getListByItem={getListByItem}
                    />
        
                <div className="ul-level3">
                    {
                        data3&&data3.length>0&&data3.map(v=><div className="li-level3" key={v.id}>
                            <CategoryItem 
                                item={v} 
                                showModalHandle={showModalHandle}
                                type={3} 
                                parentId={dataLevel2.id}
                                grandparentId={parentId} 
                                currentId={selectCategory} 
                                getListByItem={getListByItem}
                            />
                        </div>)
                    }
                </div>
            </div>
        )
    }
}

export class CategoryLevel1 extends Component {
    constructor(props){
        super(props)
        this.state = {}
    }
    render(){
        const {dataLevel1,selectCategory,getListByItem,showModalHandle} = this.props
        const data2 = dataLevel1.thirdClass
        return (
            <div className="li-level1">
                <CategoryItem 
                    item={dataLevel1}
                    type={1} 
                    parentId={null} 
                    grandparentId={null}
                    showModalHandle={showModalHandle}
                    currentId={selectCategory} 
                    getListByItem={getListByItem}
                />
                {/* <div className="ul-level2">
                    {
                        data2&&data2.length>0&&data2.map(v=><CategoryLevel2 
                                key={v.id} 
                                dataLevel2={v} 
                                parentId={dataLevel1.id} 
                                showModalHandle={showModalHandle}
                                selectCategory={selectCategory} 
                                getListByItem={getListByItem}/>)
                    }
                </div>  */}
            </div>
        )
    }
}