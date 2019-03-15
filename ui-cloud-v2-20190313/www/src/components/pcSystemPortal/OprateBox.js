import React,{Component} from 'react'
import EditPhone from './EditPhone'
import EditEmail from './EditEmail'
import ResetPassword from './ResetPassword'
import UploadBox from './UploadBox'

export default class OprateBox extends Component {
	constructor(props) {
        super(props)
    }
    render(){
        const {
            popController,
            hidePopHandle,
            userInfo,
            logoPath,
            changeAvatar,
            uploadSuccess,
            uploadFail,
            phone,
            changePhone,
            email,
            backInfo,
            updateEmail,
            remarkId,
            getDescript,
            detail,
            buttonBlock,
            switchBlock
        } = this.props
        let viewScope
        switch (popController.type) {
            case 'AVATAR':
                viewScope = <UploadBox 
                                hidePopHandle={hidePopHandle} 
                                logoPath={logoPath} 
                                userInfo={userInfo} 
                                changeAvatar={changeAvatar}
                                uploadSuccess={uploadSuccess}
                                uploadFaile={uploadFail}
                            />
                break;
            case 'PHONE':
                viewScope = <EditPhone 
                                hidePopHandle={hidePopHandle} 
                                phone={phone} 
                                userInfo={userInfo} 
                                changePhone={changePhone}
                                buttonBlock={buttonBlock}
                                switchBlock={switchBlock}
                            />
                break;
            case 'EMAIL':
                viewScope = <EditEmail 
                                hidePopHandle={hidePopHandle} 
                                email={email} 
                                userInfo={userInfo} 
                                updateEmail={updateEmail}
                                buttonBlock={buttonBlock}
                                switchBlock={switchBlock}
                            />
                break;
            case 'PASSWORD':
                viewScope = <ResetPassword 
                                hidePopHandle={hidePopHandle}
                                userInfo={userInfo}
                                buttonBlock={buttonBlock}
                                switchBlock={switchBlock} 
                            />
                break;
            default:
                viewScope = null;
                break;
        }
        return (
            <div className='pc-oprateWrapper' style={{display: popController.show?'block':'none'}}>
                {viewScope}
            </div>
        )
    }
}