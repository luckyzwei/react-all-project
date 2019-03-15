import React, { Component, PropTypes } from 'react'
import { Player } from 'video-react';
import 'video-react/dist/video-react.css';
export default class MovieView extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {

    }
    render() {
        const { poster, src, closeClickHandle } = this.props
        return (
            <div className='preWrapper' onClick={(e)=>{closeClickHandle();e.stopPropagation();return false}}>
                <div className="pre-filed-viewBox"
                    style={{ height: '292px' }}
                    onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        e.cancelBubble = true
                    }}>
                    <Player
                        width={'100%'}
                        height={'100%'}
                        fluid={false}
                        autoPlay={true}
                        poster={poster}
                    >
                        <source src={src} />
                    </Player>
                </div>
            </div>
        )
    }
}
