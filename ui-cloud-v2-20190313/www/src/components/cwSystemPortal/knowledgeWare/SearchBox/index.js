import React,{Component} from 'react'
import SelectBox from '../../../shareComponent/SelectBox'
import './index.css'
// import BatchModal from '../BatchModal'
// import ButtonBox from '../../../shareComponent/ButtonBox'
// import {GUIDE_TEXT} from '../../../../constants/ConstantData'
export default class SearchBox extends Component {
    constructor(props){
        super(props)
        // this.state = {
        //     batchFlag: false
        // }
    }
    // showBatchModal = () => {
    //     this.setState({
    //         batchFlag: !this.state.batchFlag
    //     })
    // }
    render(){
        // const {batchFlag} = this.state
        const {setparamsHandle,searchParams,searchList} = this.props
        return (
            <div className="cw-searchBox">
                <div className="searchInput">
                    <SelectBox 
                        selectOption={['全部','问题','答案']}
                        paramName={'type'}
                        paramaValue={[0,1,2]}
                        setparamsHandle={setparamsHandle}
                        width='94px'
                        paramDefault={{
                            name:'全部',
                            id:0
                        }}
                    />
                    <input className="textInput" type="text" placeholder="搜索你想看的内容" value={searchParams.content} onChange={(e)=>{setparamsHandle('content',e.target.value)}}/>
                </div>
                {/* <div className="searchLabel">
                    <div className="label">标签：</div>
                    <input className="labelInput" type="text" placeholder="请输入" value={searchParams.labelName} onChange={(e)=>{setparamsHandle('labelName',e.target.value)}}/>
                </div> */}
                <div className="searchBtn" onClick={searchList}>搜索</div>
                {/* <ButtonBox btnTxt={'返回'} btnStyle={{float: 'right',marginLeft: '25px',marginRight:'0'}} isCancel={true}
                           btnFunc={() => {this.props.changeView(null)}}/> */}
                {/* <ButtonBox btnTxt={'批量导入'} btnStyle={{float: 'right',marginLeft: '21px'}} isCancel={false}
                           btnFunc={this.showBatchModal}/> */}
                {/* <div className='guideButton'>
                    <ButtonBox btnTxt={'新增内容'} isCancel={false}
                           btnStyle={{position:'relative',zIndex:'2'}}
                           btnFunc={()=>{showEditModal(null)}}/>
                    {guideFlag?<div className="wave-square"></div>:''}
                    {guideFlag?<TipBubble tipData ={GUIDE_TEXT.CW_BUILD} styles={{left:'-200px',top:'56px'}}/>:''}
                </div> */}
                {/* {batchFlag?<BatchModal onCancel={this.showBatchModal}/>:''} */}
            </div>
        )
    }
}