import React,{Component} from 'react'
import promiseXHR from '../../../../funStore/ServerFun'
import {tongji} from '../../../../funStore/tongji'
import AuthProvider from '../../../../funStore/AuthProvider'
import {API_PATH} from '../../../../constants/OriginName'
import './index.css'
import {CategoryLevel1} from './CategoryLevel'
import AddCategory from './AddCategory'
import { activate } from 'video-react/lib/actions/player';

export default class Category extends Component {
    constructor(props){
        super(props)
        this.state = {
            addFlag: false,
            editFlag: false,
            editLevel: 1
        }
    }
    componentDidMount(){
        this.props.initCategory()
    }
    // initCategory=()=>{
    //     const url = `${API_PATH}/articlemgmt/authsec/class`
    //     AuthProvider.getAccessToken().then((resolve,reject)=>{
    //         return promiseXHR(url,{type:'Bearer',value:resolve},null,'GET')
    //     }).then(res => {
    //         const resData = JSON.parse(res)
    //         if(resData.resultCode=='100'){
    //             resData.resultContent.length>0&&this.props.getListByItem({
    //                 type:1,
    //                 selectId: resData.resultContent[0].id,
    //                 parentId: null,
    //                 grandparentId: null
    //             },true)
    //             resData.resultContent&&this.props.setCategoryList(resData.resultContent)
    //         }
    //     })
    // }
    showHandle = (type,level,item,parentId) =>{
        // 打开弹窗
        // 目录是新增还是编辑 'ADD' 'EDIT'
        // 操作的几级目录
        // 操作数据相关 某级目录数据 父级id
        tongji(`lzc_NeiRongKu_${type}Fenlei`)
        this.setState({
            addFlag: true,
            editFlag: type,
            editLevel: level,
            editData: {
                item,parentId
            }
        })
    }
    hideHandle = ()=>{
        // 关闭弹窗
        this.setState({
            addFlag: false
        })
    }
    changeAll (flag) {
        this.setState({allSelect: flag})
        if(!flag) {
            return
        }
        this.props.getListByItem('','',0)
    }
    changeNotype () {
        this.setState({allSelect: false})
        this.props.getListByItem('','',1)
    }
    render(){
        const {addFlag,editFlag,editLevel,editData} = this.state
        let {getListByItem,selectCategory,data,setCategoryList,categoryList,allSelect,noSelect} = this.props
        // console.log(data)
        return (
            <div className="cw-header">
                <div className='title'>内容目录</div>
                <p className={allSelect ? 'all active' : 'all'  } onClick={() => this.changeAll(true)}>全部 ({categoryList.length>0?categoryList[categoryList.length - 1].allCount:0})</p>
                <div className="cw-categoryBox">
                    {/* <div className="header">
                        <span>知识库 ({data&&data.length>0?data[0].allCount:0})</span>
                    </div> */}
                    <div className="categoryList">
                        <div className="ul-level1">
                            {
                                data&&data.length>0&&data.map(v=>{
                                return v.noTypeCount == 0&&v.type==0?
                                    null
                                :
                                <CategoryLevel1 
                                    key={v.id} 
                                    dataLevel1={v}
                                    showModalHandle={this.showHandle}
                                    selectCategory={selectCategory}
                                    getListByItem={getListByItem}
                                    changeAll={this.changeAll}
                                    />
                                })
                            }
                            {/* {
                                data&&data.length>0&&data[0].noTypeCount > 0 ?
                                <div className={noSelect ? 'li-level1 unclassified active' : "li-level1 unclassified"} onClick={() => this.changeNotype()}>未分类 ({data[0].noTypeCount})</div>
                                :''
                            } */}
                            <div className="add-level1" onClick={()=>{this.showHandle('ADD',1,null,null)}}>+添加目录</div>
                        </div> 
                    </div>
                    {
                        addFlag?<AddCategory 
                                    hideHandle={this.hideHandle}
                                    editFlag={editFlag}
                                    editLevel={editLevel}
                                    item={editData.item?editData.item:{className:''}}
                                    parentId={editData.parentId}
                                    setCategoryList={setCategoryList}
                                    data={data}
                                />:''
                    }
                </div>
            </div>
        )
    }
}