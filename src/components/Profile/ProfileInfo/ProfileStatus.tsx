import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserStatus } from '../../../redux/profile-reducer';
import { getStatus, getTestingMode } from '../../../redux/profile-selectors';
import classes from './ProfileStatus.module.css';


type propsType = {
    isOwner: boolean
    
}


const ProfileStatus: React.FC<propsType> = ({isOwner}) => {

    const testingMode = useSelector(getTestingMode)
    const status = useSelector(getStatus)

    const dispatch = useDispatch()

    let [editMode, setEditMode] = useState<boolean>(false)
    let [newStatus, setNewStatus] = useState<string>(status)

    
    

    useEffect( () => {
        setNewStatus(status)
    }, [status])

    const activateEditMode = () => {
        if (isOwner) setEditMode(true)
    }

    const deactivateEditMode = () => {
        setEditMode(false)
        dispatch(updateUserStatus(newStatus))
    }

    const onStatusChange = (event: { currentTarget: { value: string }; }) => {
       setNewStatus(event.currentTarget.value)
    }

    return <div className={classes.statusBlock}>
        
        <div className={testingMode? classes.commonStatusDT + " " + classes.commonStatus: classes.commonStatus}>Status</div>
        {!editMode &&
            <span className={testingMode? classes.statusDT + " " + classes.status:classes.status} onClick={activateEditMode}>
                {status || 'no status'}
            </span>
        }
        {editMode &&
            <div>
                <input className={classes.input}
                    spellCheck="false"
                    onChange={onStatusChange}
                    onBlur={deactivateEditMode}
                    autoFocus={true}
                    value={newStatus}
                />
            </div>}

    </div>

}

export default ProfileStatus