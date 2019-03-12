import React, {Component} from 'react'

class Item extends Component{
    constructor (props) {
        super(props)
    }
    render () {
        let {position,itemStyle,imgSrc,imgBoxStyle,title,text} = this.props.data
        return (
            <div className={position} style={itemStyle}>
                <div className="imgBox">
                    <img src={imgSrc} alt="" style={imgBoxStyle}/>
                </div>
                <div className="textBox">
                    <h3>{title}</h3>
                    <pre>{text}</pre>
                </div>
            </div>
        )
    }
}

export default Item