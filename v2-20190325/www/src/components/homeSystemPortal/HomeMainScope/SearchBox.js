import React,{Component} from 'react'
import './index.css'
import DateRange from '../../shareComponent/RangePicker'
import SearchInput from '../../shareComponent/SearchInput'
import promiseXHR from "../../../funStore/ServerFun";
import AuthProvider from "../../../funStore/AuthProvider";
import { API_PATH } from "../../../constants/OriginName";

export default class SearchBox extends Component {
    constructor(props){
        super(props)
        this.state = {
            groupList: []
        }
    }
    componentDidMount(){
        this.getGroupsData()
    }
    getGroupsData = () =>{
        let url = `${API_PATH}/groupadmin-api/authsec/groupadmin/tenant/groups?_page=0`
        let params = {
            "bizType": 11,
            "city": null,
            "content": "",
            "contentType": 1,
            "innerId": null,
            "labels": [],
            "matchStatus": null,
            "monitorId": null,
            "name": null,
            "province": null,
            "tenantId": null
        }
        AuthProvider.getAccessToken().then(resolve => {
            return promiseXHR(url, { type: 'Bearer', value: resolve }, params, 'post')
        }).then(response => {
            let result = JSON.parse(response);
            if (result.resultCode === '100') {
                this.setState({
                    groupList:result.resultContent.map(v => ({
                        key: v.name,
                        value: v.id
                    }))
                })            
            }
        })
    }
    render(){
        const {groupList} = this.state
        const {selectDate,selectGroup,searchHandle} = this.props
        return (
            <React.Fragment>
                <div className="h-row-left">
                    <DateRange 
                        disabledDate={(current)=>{return  current > new Date(new Date().getTime()- 1 * 24 * 60 * 60 * 1000) }}
                        setDateParams={selectDate}
                    />
                    <SearchInput 
                        dataList={groupList}
                        label={""}
                        placeholder={'选择群'}
                        selectHandle={selectGroup}
                        allFlag={{
                            key: '所有群',
                            value: null
                        }}
                        deleteFlag={true}
                        inputStyle={{
                            width: '300px'
                        }}
                    />
                    <div className="searchBtn" onClick={searchHandle}>
                        <div className="icon-search"></div>
                    </div>
                </div>
                <div className='downloadBtn' onClick={this.props.showExportAsExcel}>
                    <span className='download-icon' />
                    下载数据
                </div>
            </React.Fragment>
        )
    }
}