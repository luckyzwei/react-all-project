import React,{Component} from 'react'
import './index.css'

export default class TipBubble extends Component {
    render(){
        const {tipData,styles} = this.props
        // console.log(tipData)
        return (
                <div className={tipData.type=='left'?'public-tipBubble':'public-tipBubble right'} style={styles}>
                    <h4>{tipData.title}</h4>
                    <p>{tipData.content}</p>
                </div>
        )
    }
}