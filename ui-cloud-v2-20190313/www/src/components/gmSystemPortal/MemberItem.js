import React from 'react'
import classNames from 'classnames'
const MemberItem = ({type,member,selectEvent}) => {
    // console.log(member)
    const selectedClass = classNames({
        'unselected': true,
        'icon-gi':true,
        'selected': true,
    })
    const unselectedClass = classNames({
        'icon-gi':true,
        'unselected':true,
    })

    return (
        <li>
            <div className='member'>
                    <div className={member.altSelected === false ? unselectedClass : selectedClass}
                    id = {member.id}
                    onMouseUp={(e) => {
                    selectEvent(e.target.id,member.altSelected)
                    }}></div>
                    <span>{type=='ALT' ? '@'+member.nickName : member.nickName}</span>
            </div>
        </li>
    )
}
export default MemberItem
