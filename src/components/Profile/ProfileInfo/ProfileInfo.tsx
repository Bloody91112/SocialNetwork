import Preloader from '../../common/preloader/Preloader';
import React, { useState } from 'react';
import ProfileDataForm from './ProfileDataForm';
import ProfileData from './ProfileData';
import { useSelector } from 'react-redux';
import { getProfile } from '../../../redux/profile-selectors';


type propsType = {
    isOwner: boolean
}

const ProfileInfo: React.FC<propsType> = ({ isOwner }) => {
    let [editMode, changeEditMode] = useState(false);
    const profile = useSelector( getProfile )

    if (!profile) {
        return <Preloader />
    }
    return (
        <div>
            {editMode ? <ProfileDataForm deactivateEditMode={() => { changeEditMode(false) }} />
                : <ProfileData isOwner={isOwner} activateEditMode={() => { changeEditMode(true) }} />
            }
        </div>
    )
}



export default ProfileInfo;