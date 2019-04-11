/**
 * 创建时间:2018-10-08 10:30:58
 * 作者：sufei  Xerath
 * 邮箱：fei.su@gemii.cc
 * 版本号：1.0
 * @版权所有
 **/
import React, {Component} from 'react'
import './index.css'

import KeyMainList from './KeyMainList'
import KeyDetailList from './KeyDetailList'
import KeyAdd from '../keyAddPoratl'
import {tongji} from '../../../funStore/tongji'


const components = (view, viewId, changeView, actions) => {
    switch (view) {
        case 'KEYADD':
            return <KeyAdd viewId={viewId} changeView={changeView} actions={actions}
                        />
        case 'KEYDETAILLIST':
            return <KeyDetailList viewId={viewId} changeView={changeView}/>
        case 'KEYMAINLIST':
        default:
            return <KeyMainList changeView={changeView} actions={actions}/>
    }
}

export default class keyListPortal extends Component {
    constructor() {
        super();
        this.state = {
            viewModule: 'KEYMAINLIST',
            viewId: null,//触发id，
        }
        this.changeView = this.changeView.bind(this)
    }

    componentDidMount() {
        // this.props.actions.goTo('/v2/CWScope?type=keyword')
    }

    //切换页面
    changeView(viewModule, viewId) {
        switch (viewModule) {
            case 'KEYADD':
                tongji('Lzc_GuanJianCi_XinZeng')
                break;
            case 'KEYDETAILLIST':
                tongji('Lzc_GuanJianCi_XiangQing')
                break;
        }
        this.setState({viewModule, viewId})
    }

    render() {
        let {viewModule, viewId} = this.state;
        let {actions} = this.props;
        return (

            <div className='keyListPortal-main'>
                {
                    components(viewModule, viewId, this.changeView, actions)
                }
            </div>
        )
    }
}
