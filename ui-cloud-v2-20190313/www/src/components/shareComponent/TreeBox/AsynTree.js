import React, { Component } from 'react'
import Tree from 'antd/lib/tree'
import 'antd/lib/tree/style/css'
import './index.css'

const TreeNode = Tree.TreeNode;

export default class AsynTree extends Component {
  state = {
    // treeData: [
    //   { title: 'Expand to load', key: '0' },
    //   { title: 'Tree Node', key: '2', isLeaf: true },
    // ],
    checkedKeys:[]
  }

//   onLoadData = (treeNode) => {
//     return new Promise((resolve) => {
//       if (treeNode.props.children) {
//         resolve();
//         return;
//       }
//       setTimeout(() => {
//         treeNode.props.dataRef.children = [
//           { title: 'Child Node', key: `${treeNode.props.eventKey}-0` },
//           { title: 'Child Node', key: `${treeNode.props.eventKey}-1` },
//         ];
//         this.setState({
//           treeData: [...this.state.treeData],
//         });
//         resolve();
//       }, 1000);
//     });
//   }
  componentWillReceiveProps(nextProps){
    if(this.props.treeData.length==0&&nextProps.treeData.length>0){
        this.onCheck(nextProps.paramValue)
    }
  }

  onCheck=(checkedKeys) =>{
    // console.log('onCheck', checkedKeys)
    this.setState({checkedKeys})
    this.props.setparamsHandle&&this.props.setparamsHandle(checkedKeys)

  }

  renderTreeNodes = (data) => {
    return data.map((item) => {
      if (item.children) {
        return (
          <TreeNode title={item.title} key={item.key} dataRef={item}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode {...item} dataRef={item} />;
    });
  }

  render() {
    const {selectName,treeData,onLoadData,checkable,isMandatory,disabled} = this.props
    return (
        <div className='TreeBox'>
            <div className="selectHospital">
                <div className="left">
                  {isMandatory?<span className='redTxt'>*</span>:''}
                  {selectName}</div>
            </div>
            <div className='selectHospital-content'>
                <Tree 
                  loadData={onLoadData} 
                  checkable={checkable} 
                  onCheck={this.onCheck} 
                  checkedKeys={this.state.checkedKeys}
                  disabled={disabled}
                >
                    {this.renderTreeNodes(treeData)}
                </Tree>
            </div>
        </div>
    )
  }
}