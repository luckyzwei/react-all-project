import React, {Component} from 'react'
const imgLoad = (canvas,imgUrls,animateFunc) => {
    let imgNum = imgUrls.length;
    let loadNum = 0;
    let imgs = [];
    imgUrls.forEach((url)=>{
        let img = new Image();
        img.src=url;
        imgs.push(img);
        img.onload = () => {
            loadNum++;
            if(loadNum==imgNum){
                animateFunc(canvas,imgs)
            }
        }
    });
}
class CartoonWrapper extends Component{
    constructor(props){
        super(props)
    }
    componentDidMount () {
        imgLoad(this.refs.myCanvas,this.props.imgUrls,this.props.animation);
    }
    render () {
        return (
            <div className="cartoonWrapper">
                <div className="canvasBox" style={this.props.canvasBoxStyle}>
                    <canvas ref="myCanvas" width="500" height="310" style = {{width:'380px'}} ></canvas>
                </div>
                <div className="textBox">
                    <h3>{this.props.title}</h3>
                    <pre>{this.props.text}</pre>
                </div>
            </div>
        )
    }
}

export default CartoonWrapper
