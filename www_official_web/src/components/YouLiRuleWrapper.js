/**
 * Created by jiayi.hu on 10/13/17.
 */
import React, {Component, PropTypes} from "react";

export default class YouLiRuleWrapper extends Component {
    constructor(){
        super()
    }
    render(){
        const {textItem,index,type} = this.props
        window.debugger('props',this.props)
        return(

                <dl style={{background:'url(../images/Artboard'+parseInt(index+1)+'.png)no-repeat',height:'100%',width:'100%',backgroundSize:'cover'}}>
                    {
                        type=='youLiRule'?
                            <dt>
                                <em className="iconGround"
                                    style={{width:'108px',height:'108px',backgroundPosition:'-'+textItem.iconXPosition+'px -260px',marginTop:'180px',display:'inline-block'}}></em>
                            </dt>:
                            <dt>
                                <em style={{width:'108px',height:'108px',background:'url(../images/recruitIconStore/offer'+parseInt(index+1)+'.png)no-repeat',backgroundSize:'108px',marginTop:'180px',display:'inline-block'}}></em>
                            </dt>
                    }
                    <dt className="youLiText">{textItem.text}</dt>
                </dl>
        )
    }
}