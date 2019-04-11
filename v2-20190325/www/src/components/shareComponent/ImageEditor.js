import React,{Component} from 'react'
import AvatarEditor from 'react-avatar-editor'

export default class ImageEditor extends Component {
    constructor(props) {
        super(props)
        this.imgChangeHandle = this.imgChangeHandle.bind(this)
        this.setEditorRef = this.setEditorRef.bind(this)
        this.saveImgHandle = this.saveImgHandle.bind(this)
        this.scaleHandle = this.scaleHandle.bind(this)
        this.smallHandle = this.smallHandle.bind(this)
        this.bigHandle = this.bigHandle.bind(this)
        this.state={
            scale: 1
        }
    }
    saveImgHandle(){
        if (this.editor) {
            // This returns a HTMLCanvasElement, it can be made into a data URL or a blob,
            // drawn on another canvas, or added to the DOM.
            // console.log(typeof (this.editor.getImage()));
            
            const canvas = this.editor.getImage().toDataURL("image/png")

            // If you want the image resized to the canvas size (also a HTMLCanvasElement)
            const canvasScaled = this.editor.getImageScaledToCanvas().toDataURL("image/png")
            this.props.getImage(canvasScaled)
        }
    }

    setEditorRef(editor){
        this.editor = editor
    }

    scaleHandle(e){
        e.stopPropagation()
        e.preventDefault()
		this.setState({
			scale: parseFloat(e.target.value/10).toFixed(1)
        })
        this.saveImgHandle()
    }
    
    smallHandle(e){
        e.stopPropagation()
        e.preventDefault()
        if(this.state.scale>0){
            this.setState({
                scale: (this.state.scale*10-1)/10
            })
            this.saveImgHandle()
        }
    }

    bigHandle(e){
        e.stopPropagation()
        e.preventDefault()
        if(this.state.scale<2){
            this.setState({
                scale: (this.state.scale*10+1)/10
            })
            this.saveImgHandle()
        }
    }

    imgChangeHandle(){
        this.setState({
			scale: 1
        })
        this.saveImgHandle()
    }

    render () {
        const {scale} = this.state
        const {url,width,height,borderRadius} = this.props
        return (
            <div className="imgEditBox unselect">
                <div className="range">
                    <div className="smaller icon-set" onClick={this.smallHandle}></div>
                    <div className="rangeBar">
                        <div className="circle" style={{left:70*scale/2+'px'}}></div>
                    </div>
                    <input type="range" value={scale*10} min='0' max='20' step='1' onChange={this.scaleHandle}/>
                    <div className="bigger icon-set" onClick={this.bigHandle}></div>
                </div>
                <AvatarEditor
                    ref={this.setEditorRef}
                    crossOrigin={'anonymous'}
                    image={url}
                    width={120}
                    height={120}
                    borderRadius={60}
                    scale={scale}
                    onPositionChange={this.saveImgHandle}
                    onLoadSuccess={this.imgChangeHandle}
                />
            </div>
        )
    }
}