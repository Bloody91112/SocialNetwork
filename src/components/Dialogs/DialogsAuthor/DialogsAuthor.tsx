import { NavLink } from 'react-router-dom';
import classes from './DialogsAuthors.module.css'
import React from "react";
import { useSelector } from 'react-redux';
import { getTestingMode } from '../../../redux/profile-selectors';


type propsType = {
    avatar: string
    personalMessages: (id:number) => void
    id: number
    name: string
}

const AuthorItem: React.FC<propsType> = ({avatar,personalMessages,id,name}) => {

    let testingMode = useSelector(getTestingMode)

    return (
        <div className={ testingMode? classes.author + " " + classes.authorDT : classes.author }>
            <div className={classes.avatar}>
                <img src={avatar} alt="" />
            </div>
            <NavLink
                onClick={()=>{personalMessages(id)}}
                className={navData => 
                    navData.isActive ? 
                     classes.active + " " + (testingMode && classes.authorNameDT)
                     : classes.authorName + " " + (testingMode && classes.authorNameDT)}
                to={"/dialogs/" + id}>
                {name}
            </NavLink>
        </div>
    )
}


export default AuthorItem;