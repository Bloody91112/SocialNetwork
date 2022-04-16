import ProfileStatus from "./ProfileStatus"
import classes from './ProfileData.module.css';
import Contact from "./Contact";
import cat from '../../../assets/images/cat.jpg'
import { useState } from "react";
import { useSelector } from "react-redux";
import { getIsAuth, getProfile, getTestingMode } from "../../../redux/profile-selectors";
import MyPosts from "../MyPosts/MyPosts";


type propsType = {
    isOwner: boolean
    activateEditMode: () => void
}


const ProfileData:React.FC<propsType> = ({isOwner,activateEditMode}) => {


    const profile:any = useSelector(getProfile)
    const testingMode = useSelector(getTestingMode)
    const isAuth = useSelector(getIsAuth)

    let [contacts, changeContacts] = useState(false)

    const handleClick = () => {
        if (contacts === true){
            changeContacts(false)
        } else {
            changeContacts(true)
        }
        
    }
    return (
        <div className={classes.fullPage}>
            {isOwner && <h1 className={classes.title}>My page</h1>}
            {isOwner &&
                <button className={testingMode? classes.editProfileButtonDT + " " + classes.editProfileButton : classes.editProfileButton}
                    onClick={activateEditMode}>
                    Edit pofile
                </button>}
            <div className={classes.description}>
                <div className={classes.leftPartContainer}>
                    <div className={classes.avatarBlock}>
                        <img className={classes.avatar} src={profile.photos.large || cat} alt='' />
                    </div>
                    
                    <ProfileStatus isOwner={isOwner} />
                </div>
                <div className={testingMode? classes.rightPartContainerDT + " " + classes.rightPartContainer : classes.rightPartContainer}>
                    <div className={classes.prop}>
                        <div className={testingMode? classes.propTitleDT + " " + classes.propTitle : classes.propTitle}>
                            Nickname
                        </div>
                        <div className={testingMode? classes.propDescriptionDT + " " + classes.propDescription : classes.propDescription}>
                            {profile.fullName}
                            </div>  
                    </div>

                    <div className={classes.prop}>
                    <div className={testingMode? classes.propTitleDT + " " + classes.propTitle : classes.propTitle}>
                            Looking for a job
                            </div>  
                        <div className={testingMode? classes.propDescriptionDT + " " + classes.propDescription : classes.propDescription}>
                            {profile.lookingForAJob ? 'yes' : 'no'}
                            </div>
                    </div>

                    {profile.lookingForAJob &&
                        <div className={classes.prop}>
                        <div className={testingMode? classes.propTitleDT + " " + classes.propTitle : classes.propTitle}>
                                My professional skills
                                </div>
                                <div className={testingMode? classes.propDescriptionDT + " " + classes.propDescription : classes.propDescription}>
                                {profile.lookingForAJobDescription}
                                </div> 
                        </div>}

                    <div className={classes.prop}>
                    <div className={testingMode? classes.propTitleDT + " " + classes.propTitle : classes.propTitle}>
                            About me
                            </div>  
                            <div className={testingMode? classes.propDescriptionDT + " " + classes.propDescription : classes.propDescription}>
                            {profile.aboutMe || 'nothing'}
                            </div>
                    </div>

                    <div className={classes.prop}>
                    <div className={testingMode? classes.propTitleDT + " " + classes.propTitle : classes.propTitle}>
                            Contacts
                        </div>
                        
                        <button
                            className={testingMode? classes.editProfileButtonDT + " " + classes.editProfileButton : classes.editProfileButton}
                            onClick={handleClick}> Show contacts
                        </button>
                        {contacts && Object.keys(profile.contacts).map((key) => {
                            return <Contact
                                key={key}
                                contactTitle={key}
                                //@ts-ignore
                                contactValue={profile.contacts[key]} />
                        })}
                    </div>
                </div>
            </div>
            {isOwner ?
                <MyPosts/> :
                isAuth ?
                    <div className={classes.UsersPosts}>
                        <div className={classes.userName}>{profile.fullName}</div>
                        hasn't written any posts yet
                    </div> :
                    <div className={classes.UsersPosts}>
                        <div className={classes.userName}>{profile.fullName}</div>
                        Login to read posts
                    </div>
            }
        </div>

    )
}


export default ProfileData