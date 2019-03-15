/**
 * 创建时间:2018-08-23 15:22:55
 * 作者：sufei  Xerath
 * 版本号：1.0
 **/
import React, {Component} from 'react'
import './index.css'

export default class AidCard extends Component {
    constructor() {
        super();
        this.state = {
            config: {
                service: {
                    name: "客服助手",
                    description: "客服助手是您在群内发送/回复用户消息时使用的微信助手，所有您在消息框内输入的消息都会通过他发送在群内。"
                },
                holding: {
                    name: '拉人助手',
                    description: '拉人助手是通过精准入群功能时，向用户发送入群邀请的微信助手。'
                },
                putting: {
                    name: '投放助手',
                    description: '投放助手是您在群内投放任务时使用的微信助手，所有您设置的投放内容都会通过他发送在群内。'
                },
                others: {
                    name: '敬请期待',
                    description: '敬请期待...'
                }
            }
        };
        this.changeStatus = this.changeStatus.bind(this);
    }
    changeStatus(){
        let {AidName, AidStatus} = this.props;
        let params = {
            name:AidName,
            status:!AidStatus
        };
        this.props.AidFunc(params);
    };
    render() {
        let {AidClass, AidStatus} = this.props;
        let {config} = this.state;
        return (
            <div className={AidStatus?'AidCard selectTrue':'AidCard selectFalse'} onClick={this.changeStatus}>
                <div className={AidStatus ? "AidCardSelect selectTrue" : "AidCardSelect selectFalse"}>

                </div>
                <div className={
                    AidStatus ?
                        `AidCardLogo ${AidClass === "service" ?
                            'service' :
                            (AidClass === "holding" ?
                                'holding' :
                                (AidClass === "putting" ?
                                    'putting' : 'others'))} selectTrue`
                        :
                        `AidCardLogo ${AidClass === "service" ?
                            'service' :
                            (AidClass === "holding" ?
                                'holding' :
                                (AidClass === "putting" ?
                                    'putting' : 'others'))} selectFalse`
                }
                >

                </div>
                <div className='AidCardClass'>
                    {AidClass === "service" ?
                        config.service.name :
                        (AidClass === "holding" ?
                            config.holding.name :
                            (AidClass === "putting" ?
                                    config.putting.name :
                                    config.others.name
                            ))}
                </div>
                <div className='AidCardDescription'>
                    {AidClass === "service" ?
                        config.service.description :
                        (AidClass === "holding" ?
                            config.holding.description :
                            (AidClass === "putting" ?
                                    config.putting.description :
                                    config.others.description
                            ))}
                </div>
            </div>
        )
    }
}
