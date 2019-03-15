import React,{Component} from 'react'
import './index.css'

export default class SearchInput extends Component {
    constructor(props){
        super(props)
        this.state = {
            value: '',
            searchText:'',
            paramValue:'',
            focusFlag: false
        }
    }
    componentDidMount(){
        const {paramDefault} = this.props
        this.setState({
            value: paramDefault.key,
            paramValue: paramDefault.value
        })
    }
    shouldComponentUpdate(nextProps,nextState){
        if(this.props.dataList.length==0&&nextProps.dataList.length>0){
            this.setState({
                value: nextProps.paramDefault.key,
                paramValue: nextProps.paramDefault.value
            })
        }
        return true
    }
    focusHandle = () => {
        this.setState({
            focusFlag: true
        }, () => {
            this._input.focus();//this._input 方法
        })
    }
    blurHandle=()=>{
        this.setState({
            focusFlag: false,
            searchText:''
        })
    }
    inputHandle = (e)=>{
        this.setState({
            searchText: e.target.value
        })
    }
    selectHandle = (v)=>{
        this.setState({
            value: v.key,
            paramValue: v.value
        })
        this.props.selectHandle(v)
    }
    iconClick = (e) => {
        e.stopPropagation()
        const {focusFlag} = this.state
        const deleteFlag = this.props.deleteFlag
        if(deleteFlag&&focusFlag){
            this.setState({
                value: '',
                paramValue: ''
            })
            this.props.selectHandle({
                key:'',
                value:''
            })
        }
    }
    render(){
        const {value,searchText,focusFlag,paramValue} = this.state
        const {dataList,label,inputStyle,deleteFlag} = this.props
        return (
            <div className="SearchInput">
                <div className="SearchInput-label">{label}</div>
                <div className="SearchInput-input" onClick={this.focusHandle} style={inputStyle}>
                    <div className="SearchInput-placeholder" 
                        style={{
                            display: !focusFlag&&value===''||value===''&&searchText===''?'block':'none'
                        }}
                    >请选择</div>
                    <div className = "SearchInput-value"
                        style={{
                            display: !focusFlag && value !== '' || focusFlag && searchText === '' ? 'block' : 'none',
                            color: focusFlag && searchText === ''?'#B5BDC6':'#344658'
                        }}
                    > 
                        {value}
                    </div>
                    <div className="SearchInput-input-area" style={{display:focusFlag?'block':'none'}}>
                        {/* c 表示input标签 将c赋值给this._input */}
                        <input ref={(c) => this._input = c} type="text" autoComplete="off" value={searchText} onBlur={this.blurHandle} onChange={this.inputHandle}/>
                    </div>
                    <em className={`SearchInput-icon ${focusFlag?deleteFlag&&value!=''?'SearchInput-icon-delete':'SearchInput-icon-select':''}`} onMouseDown={this.iconClick}></em>
                    <div className="SearchInput-options"
                        style={{display:focusFlag?'block':'none'}}
                    >
                        {
                            dataList.filter(v => v.key.includes(searchText)).slice(0,100).map(v => {
                                return (
                                    <div key={v.value} className={v.value==paramValue?"SearchInput-option SearchInput-option-select":"SearchInput-option"}
                                        onMouseDown={()=>{this.selectHandle(v)}}
                                    >
                                        {v.key}
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }
}

SearchInput.defaultProps = {
    dataList: [],
    label: "选择入群页：",
    paramDefault: {
        key: '',
        value: ''
    }
}