import React, { Component } from 'react'
import './index.css'

import Tree from 'antd/lib/tree';
import Checkbox from 'antd/lib/checkbox';
import 'antd/lib/tree/style/css';
import 'antd/lib/checkbox/style/css';

const TreeNode = Tree.TreeNode;


// paramList paramName setparamsHandle  paramValue selectName
export default class TreeBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            treeData: [],
            expandedKeys: [],
            autoExpandParent: true,
            checkedKeys: [],
            selectedKeys: [],
            checkAllFlag: false
        }
        this.onExpand = this.onExpand.bind(this)
        this.onCheck = this.onCheck.bind(this)
        this.onSelect = this.onSelect.bind(this)
        this.onChange = this.onChange.bind(this)
    }
    onExpand(expandedKeys) {
        // console.log('onExpand', expandedKeys);
        // if not set autoExpandParent to false, if children expanded, parent can not collapse.
        // or, you can remove all expanded children keys.
        this.setState({
            expandedKeys,
            autoExpandParent: false,
        });
    }
    onCheck(checkedKeys,events) {
        const {flatCityList,checkAuthFunc} = this.props
        // console.log('onCheck', checkedKeys);
        let { paramList } = this.props;
        if(checkAuthFunc){
            let checkAuth = checkAuthFunc(events)
            if(checkAuth.status){
                return
            }else{
                checkedKeys= checkedKeys.concat(checkAuth.checkedKeys)
            }
        }
        this.setState({ checkedKeys }, () => {
            this.props.setparamsHandle(this.props.paramName, this.state.checkedKeys)
            if(flatCityList&&flatCityList.length>0){
                this.setState({
                    checkAllFlag: checkedKeys.length==flatCityList.length
                })
            }
        });
    }
    onSelect(selectedKeys, info) {
        console.log('onSelect', selectedKeys,info);
        this.setState({ selectedKeys });
    }
    renderTreeNodes=(data)=> {
        let {disabledKeys} = this.props
        return data.map((item) => {
            if (item.children) {
                return (
                    // <TreeNode title={item.title} key={item.key} dataRef={item} disableCheckbox={disabledKeys.includes(item.key)}>
                    <TreeNode title={item.title} key={item.key} dataRef={item} disableCheckbox={disabledKeys.includes(item.key)}>
                        {this.renderTreeNodes(item.children)}
                    </TreeNode>
                );
            }
            return <TreeNode {...item} />;
        });
    }
    onChange(e) {
        // 自定义全选事件
        // console.log(this.props.flatCityList)
        if (e.target.checked) {
            let { flatCityList } = this.props;
            let checkedKeys = [];
            for (let i = 0; i < flatCityList.length; i++) {
                checkedKeys.push(flatCityList[i].regionId);
            }
            this.onCheck(checkedKeys);
        } else {
            this.onCheck([]);
        }
    }
    componentDidMount() {
        // this.onCheck(this.props.paramValue)
    }
    componentWillReceiveProps(nextProps){
        if(this.props.paramList.length==0&&nextProps.paramList.length>0){
            this.onCheck(nextProps.paramValue)
            if(nextProps.paramValue.length==nextProps.flatCityList.length){
                this.setState({
                    checkAllFlag: true,
                    selectedKeys: nextProps.selectedKeys?nextProps.selectedKeys:[]
                })
            }else{
                this.setState({
                    selectedKeys: nextProps.selectedKeys?nextProps.selectedKeys:[]
                })
            }
        }else{
            this.setState({
                selectedKeys: nextProps.selectedKeys?nextProps.selectedKeys:[]
            })
        }
    }
    render() {
        let {checkAllFlag} = this.state
        let { selectName, paramList,checkAll,disabled,isMandatory,disabledKeys} = this.props;
        console.log(this.state.selectedKeys)
        return (
            <div className='TreeBox'>
                <div className="selectHospital">
                    <div className="left">
                        {isMandatory?<span className='redTxt'>*</span>:''}
                        {selectName}
                    </div>
                    {
                        checkAll?<div className="right">
                            <span className="allSelect">全选</span>
                            <Checkbox id='allSelcet' disabled={disabled} onChange={this.onChange} checked={checkAllFlag}></Checkbox>
                        </div>:null
                    }
                </div>
                <div className='selectHospital-content'>
                    <Tree
                        checkable
                        onExpand={this.onExpand}
                        expandedKeys={this.state.expandedKeys}
                        autoExpandParent={this.state.autoExpandParent}
                        onCheck={this.onCheck}
                        checkedKeys={this.state.checkedKeys}
                        // onSelect={this.onSelect}
                        multiple={true}
                        selectedKeys={this.state.selectedKeys}
                        disabled={disabled}
                    >
                        {this.renderTreeNodes(paramList)}
                    </Tree>
                </div>
            </div>
        )
    }
}

TreeBox.defaultProps={
    disabledKeys: []
}