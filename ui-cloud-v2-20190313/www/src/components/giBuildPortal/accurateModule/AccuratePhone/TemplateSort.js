import React,{Component} from 'react'
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import update from 'react-addons-update';
import TemplateItem from './TemplateItem';
import {TextInput,SelectInput,PhoneInput} from './unit'

const component = (item,clickHandle,selectItem) => {
    if(item.code=='PHONE'){
        // 手机号码展示
        return <PhoneInput item={item} clickHandle={clickHandle} checkStatus={selectItem.code==item.code}/>
    }else{
        switch (item.type) {
            case 0: //文本输入框
                return <TextInput item={item} clickHandle={clickHandle} checkStatus={selectItem.code==item.code}/>
            case 1: //下拉框
                return <SelectInput item={item} clickHandle={clickHandle} checkStatus={selectItem.code==item.code}/>
            case 2: //日期,下拉框形式
                return <SelectInput item={item} clickHandle={clickHandle} checkStatus={selectItem.code==item.code}/>
            default:
                return <SelectInput item={item} clickHandle={clickHandle} checkStatus={selectItem.code==item.code}/>
        }
    }
  }

class TemplateSort extends Component {
    constructor(props){
        super(props)
        this.state = {
            sortItems: props.templateItems.filter(v => v.code !='DESCRIPTION'&&v.code !='H5_FORM_TITLE'&&v.code !='SUBMIT'&&v.code != 'TERMS')
        }
    }
    componentWillReceiveProps(nextProps){
        //过滤出需要排序元素
        let sortItems = nextProps.templateItems.filter(v => v.code !='DESCRIPTION'&&v.code !='H5_FORM_TITLE'&&v.code !='SUBMIT'&&v.code != 'TERMS')
        // if(this.state.sortItems.length!=sortItems.length||this.props.templateId!=nextProps.templateId){
          this.setState({sortItems})
        // }
      }
    moveCard=(dragIndex, hoverIndex) => {
        const {templateItems} = this.props
        const { sortItems } = this.state;
        const dragCard = sortItems[dragIndex];
        const sortCard = update(this.state, {
            sortItems: {
                $splice: [
                [dragIndex, 1],
                [hoverIndex, 0, dragCard],
                ],
            }
        })
        this.setState(sortCard)
        let restItems = templateItems.filter(v => (v.code == 'DESCRIPTION'||v.code == 'H5_FORM_TITLE'||v.code == 'SUBMIT'||v.code == 'TERMS'))
        this.props.sortItemHandle(sortCard.sortItems.concat(restItems))
    }
    render(){
        const {sortItems} = this.state
        const {templateItems,clickHandle,selectItem} = this.props
        return (
            <div className='contentHeader' ref='movebox'>
                {
                    sortItems.map((item, i) => (
                            <TemplateItem
                                key={item.templateItemId}
                                id={item.templateItemId}
                                index = {i}
                                sortItem = {item}
                                component={component(item,clickHandle,selectItem)}
                                moveCard={this.moveCard}
                            />
                    ))
                }
            </div>
        )
    }
}

export default DragDropContext(HTML5Backend)(TemplateSort)