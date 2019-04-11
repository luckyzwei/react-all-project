import React, { Component, PropTypes } from 'react'
import GtSeacrhBox from '../GtSeacrhBox'
import {GtCard, GtCardFast} from '../GtCard'
import './index.css'
import PageRule from '../../shareComponent/PageRule'
import AuthProvider from '../../../funStore/AuthProvider';
import promiseXHR from '../../../funStore/ServerFun';
import {API_PATH} from "../../../constants/OriginName";
import ButtonBox from '../../shareComponent/ButtonBox'
import LoadingSVG from '../../shareComponent/LoadingAnimationS'

export default class GtMainScope extends Component {
    constructor(props) {
        super(props)
        this.state = {
            groupTemplate: [],
            pageInfo: {
                currentPage: 0,
                pageSize: 20,
                totalRecords: 0
            },
            searchParams: {},
            showQRcode: false,
            QRcode: '',
            qrName:'入群页面二维码'
        }
    }
    componentDidMount() {
        this.getTemplate()
    }

    getTemplate = (page) => {
        let {pageInfo, searchParams} = this.state
        page&&(pageInfo = page)
        let url = `${API_PATH}/groupadmin-api/authsec/group/join/templates?_currentPage=${pageInfo.currentPage}&_pageSize=${pageInfo.pageSize}`
        AuthProvider.getAccessToken()
        .then((resolve,reject)=>{
            return promiseXHR(url, {type:'Bearer',value:resolve}, searchParams, 'post')
        }).then(res => {
            const resData = JSON.parse(res)
            if (resData.resultCode == 100) {
                this.setState({groupTemplate: resData.resultContent,pageInfo:resData.pageInfo})
            }
        })
    }

    showQRcode = (id,name) => {
        this.setState({showQRcode: true})
        let url = `${API_PATH}/groupadmin-api/authsec/group/join/template/${id}/qrcode`
        AuthProvider.getAccessToken()
        .then((resolve,reject)=>{
            return promiseXHR(url, {type:'Bearer',value:resolve}, null, 'get')
        }).then(res => {
            const resData = JSON.parse(res)
            this.setState({QRcode: resData.resultContent,qrName:name})
        })
    }

    closeQRcode = () => {
        this.setState({showQRcode: false,QRcode: ''})
    }

    downQRcode = () => {
        let {QRcode,qrName} = this.state
        if(QRcode){
            let a = document.createElement('a')
            a.href = QRcode+'?d'
            a.download = qrName+'.jpeg'
            a.click()
        }
    }

    handleSearchParams = (name, value) => {
        let {searchParams} =this.state
        searchParams[name] = value
        this.setState({searchParams})
    }
    render() {
        let {pageInfo, groupTemplate, showQRcode, QRcode, searchParams} = this.state
        let {actions} = this.props
        return (
            <div className='gt-container'>
                <div className="gt-container-scroll">
                    <GtSeacrhBox
                        getTemplate={this.getTemplate}
                        handleSearchParams={this.handleSearchParams}
                    />
                    <div className="gt-list-container">
                        {
                            groupTemplate.length > 0 && groupTemplate.map(v => {
                                return v.type==4?<GtCardFast
                                    data = {v}
                                    showQRcode = {this.showQRcode}
                                    actions = {actions}
                                />
                                :
                                <GtCard
                                    data = {v}
                                    showQRcode = {this.showQRcode}
                                    actions = {actions}
                                />
                            })
                        }
                    </div>
                    <div className="gt-container-footer">
                        <PageRule 
                            pageInfo={pageInfo}
                            searchParams={searchParams}
                            handlersearchData={(page) => this.getTemplate(page)}
                        />
                    </div>
                </div>
                {
                    showQRcode ?
                    <div className="qrcodeModal">
                        <div className="modal-box">
                            <div className="close-btn" onClick={this.closeQRcode}></div>
                            <div className="qrcode-title">二维码</div>
                            {
                                QRcode ?
                                <div className="qrcode" style={{background: 'url('+QRcode+') 0 0/150px no-repeat'}}></div>
                                :
                                <LoadingSVG/>
                            }
                            <ButtonBox
                                btnTxt={'下载二维码'}
                                btnStyle={{margin: '0 auto'}}
                                btnFunc={this.downQRcode}
                            />
                        </div>
                    </div>
                    :''
                }
            </div>
        )
    }
}
