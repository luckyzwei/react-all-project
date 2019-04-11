import React, { Component } from 'react'
import ButtonBox from '../../shareComponent/ButtonBox'
import './index.css'

export default class HomeModal extends Component {
    constructor(props){
        super(props)
        this.state={
            modalShow: true
        }
    }

componentDidMount(){
}
componentWillUnmount() {
}
closeModal = () => {
    this.setState({modalShow: false})
}

render() {
    return (
        <div className="home-modal">
        {this.state.modalShow?
            <div className="home-modal-box">
                <div className="home-modal-box-img"></div>
                <p>恭喜！截止今日，群里的发言人数超过50人啦！</p>
                <p>社群运营初见成效，想不想知道大家都在聊什么呢？</p>
                <ButtonBox
                    btnTxt={'算了，不'}
                    btnStyle={{}}
                    isCancel={true}
                    btnFunc={this.closeModal}
                />
                <ButtonBox
                    btnTxt={'去看看'}
                    btnStyle={{}}
                    btnFunc={this.closeModal}
                />
                <div className="home-modal-box-icon"></div>
            </div>
            :''}
      </div>
    )
  }
}
