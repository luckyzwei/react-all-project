import React, {Component} from 'react'
import './index.css'
import Input from '../../shareComponent/Input'
import SelectBox from '../../shareComponent/SelectBox'

let statusList={
    0:'未激活',
    1:'正常',
    2:'停用'
}
export default class TmEditTitle extends Component {
    constructor() {
        super();
        this.state={
            searchParameters:{

            }
        }
    }

   render(){
       let {echoItem,selectDataEdit,handleEditechoIitem,setMoreSelectParama,echoId,showResetpsw} =this.props
       selectDataEdit[0].paramDefault = echoItem.roleItems!=undefined&&echoItem.roleItems.length!=0?echoItem.roleItems[0]:undefined
       selectDataEdit[1].paramDefault = echoItem.status!=undefined&&echoItem.status!=''?{id:echoItem.status,name:statusList[echoItem.status]}:undefined
       return(
           <div className='editInfoBox'>
               <div className="editInfo-item">
                   <Input
                       disabled={echoId!=null?true:false}
                       label={"用户名："}
                       value={echoItem.loginName}
                       placeholder={'请输入群用户名称'}
                       paramsname={'loginName'}
                       styles={{ width: "222px" }}
                       iptChangeParams={handleEditechoIitem}
                   />
                   <Input
                       label={"邮箱："}
                       value={echoItem.email}
                       placeholder={'请输入邮箱'}
                       paramsname={'email'}
                       styles={{ width: "222px" }}
                       iptChangeParams={handleEditechoIitem}
                   />
                   {
                       echoId==null
                           ? <Input
                               label={"密码："}
                               value={echoItem.password}
                               placeholder={'请输入密码'}
                               paramsname={'password'}
                               styles={{ width: "222px" }}
                               iptChangeParams={handleEditechoIitem}
                           />
                           :  <div className="public-input">
                               <div className="label">密码：</div>
                               <button className='resetBtn' onClick={showResetpsw}>
                                   重置密码
                               </button>
                           </div>
                   }


               </div>
               <div className="editInfo-item">
                   <Input
                       label={"手机号："}
                       value={echoItem.phone}
                       placeholder={'请输入手机号码'}
                       paramsname={'phone'}
                       styles={{ width: "222px" }}
                       iptChangeParams={handleEditechoIitem}
                   />
                   {
                       selectDataEdit.map((item, i) => (
                           <SelectBox key={i}
                                      selectLabel={item.selectLabel}
                                      selectOption={item.selectOption}
                                      paramName={item.paramaName}
                                      paramaValue={item.paramaValue}
                                      paramDefault={item.paramDefault}
                                      setMoreSelectParama={setMoreSelectParama}
                           />
                       ))
                   }

                </div>

           </div>
       )
   }
}
