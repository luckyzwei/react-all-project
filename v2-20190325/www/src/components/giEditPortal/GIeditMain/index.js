import React,{Component} from 'react'
import './index.css'
import EditPage from '../EditPage'
import EditRule from '../EditRule'

let component = (type,templateId,actions,changeWhen) => {
    switch (type) {
        case 'page':
            return  <EditPage changeWhen={changeWhen} templateId={templateId} actions={actions}/>;
        case 'rule':
            return  <EditRule changeWhen={changeWhen} templateId={templateId} actions={actions}/>;
    }
}

export default class GIeditMain extends Component {
    render(){
        const {actions,match,changeWhen} = this.props
        const {taskId,type} = match.params
        return (
            <div className="gi-edit">
                {component(type,taskId,actions,changeWhen)}
            </div>
        )
    }
}