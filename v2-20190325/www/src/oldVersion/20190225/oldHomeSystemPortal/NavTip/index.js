import React,{Component} from 'react'
import './index.css'
const stepArr = ['bluebar-step1','bluebar-step2','bluebar-step3']
export default class Index extends Component{
    constructor(props) {
        super(props)
        this.state = {
            current: 0
        }
    }

    checkHandle=(index,value)=>{
        this.setState({
            current: index
        })
        this.props.changeNav && this.props.changeNav(value)
    }
    render(){
        const {current} =this.state
        const {navList} =this.props
        return(
            <div className='home-navList'>
                {
                    navList.map((v,i)=>{
                        return <span key={i} className={i == current ? 'active' : ''} onClick={() => { this.checkHandle(i,v.value)}}>{v.name}</span>
                    })
                }
                <em className={`bluebar ${stepArr[current]}`}></em>
            </div>
        )
    }

}