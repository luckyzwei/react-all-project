import React,{Component} from 'react'
import EditFast from './EditFast'
import EditAccurate from './EditAccurate'

export default class EditTempalte extends Component {
    constructor(props){
        super(props)
        this.state = {
            templateData:props.selectTemplateData
        }
    }
    render(){
        const {templateData} = this.state
        const {selectType} = this.props
        // console.log(templateData)
        return (
            templateData.type==4
            ?<EditFast templateData={templateData} selectType={selectType}/>
            :<EditAccurate templateData={templateData} selectType={selectType}/>
        )
    }
}