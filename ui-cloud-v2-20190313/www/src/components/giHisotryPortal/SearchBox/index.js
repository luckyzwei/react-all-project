import React,{Component} from 'react'
import './index.css'
import SelectBox from '../../shareComponent/SelectBox'
import RangePicker from '../../shareComponent/RangePicker'


export default class SearchBox extends Component {
    setDateParams = (dateString) => {
        this.props.setSearchParams('time',dateString)
    }
    render(){
        const {searchHandle,setSearchParams} = this.props
        return (
            <div className="searchBox">
                <div className="row1">
                    <SelectBox
                        selectLabel={"建群类型："}
                        placeholder={"请选择"}
                        width={200}
                        selectOption={['精准入群','快速入群']}
                        // selectOption={['新增托管','取消托管','手动建群','精准入群','快速入群','批量建群']}
                        paramName={'type'}
                        paramaValue={[4,5]}
                        // paramaValue={[1,2,3,4,5,6]}
                        setparamsHandle={setSearchParams}
                    />
                </div>
                <div className="row2">
                    <div className="label">建群时间：</div>
                    <RangePicker 
                        setDateParams={this.setDateParams}
                    />
                 </div>
                <div className="searchBtn" onClick={searchHandle}>搜索</div>
                {/* <div className="backGI" onClick={() => this.props.actions.goTo('/v2/GIScope')}>返回</div>                 */}
            </div>
        )
    }
}