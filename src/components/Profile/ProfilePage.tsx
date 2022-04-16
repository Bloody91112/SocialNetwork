import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMatch, useNavigate } from "react-router-dom";
import { compose } from "redux";
import { withRouter } from "../../hoc/withRouter";
import { getUserProfile, getUserStatus, } from "../../redux/profile-reducer";
import { getAuthUserId, getIsAuth, getProfile } from "../../redux/profile-selectors";
import Preloader from "../common/preloader/Preloader";
import ProfileData from "./ProfileInfo/ProfileData";
import ProfileDataForm from "./ProfileInfo/ProfileDataForm";





const ProfileContainer = () => {
    
    let match = useMatch('/profile/:userId')

    const isAuth = useSelector(getIsAuth)
    const dispatch = useDispatch()
    const authUserId = useSelector(getAuthUserId)

    let navigate = useNavigate();
    let userId: any;
    if (match) {
        userId = match.params.userId;
    } else {
        userId = authUserId ? authUserId : undefined
    }


    let [editMode, changeEditMode] = useState(false);



    useEffect(() => {
        if (userId === undefined) {
            navigate('login', { replace: true })
        }
        dispatch(getUserProfile(userId))
        dispatch(getUserStatus(userId))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId])

    const isOwner = !!(isAuth && userId === 22921)
    const profile = useSelector(getProfile)

    if (!profile) {
        return <Preloader />
    }
    return (
        <div>
            {editMode ?
                <ProfileDataForm deactivateEditMode={() => { changeEditMode(false) }} />
                : <ProfileData isOwner={isOwner} activateEditMode={() => { changeEditMode(true) }} />
            }
        </div>
    )
}


export default compose<any>(
    withRouter
)(ProfileContainer)