import { NavLink } from 'react-router-dom';
import classes from './DialogsAuthors.module.css'
import React from "react";


type propsType = {
    avatar: string
    personalMessages: (id:number) => void
    id: number
    name: string
}

const AuthorItem: React.FC<propsType> = ({avatar,personalMessages,id,name}) => {

    return (
        <div className={classes.author}>
            <div className={classes.avatar}>
                <img src={avatar} alt="" />
            </div>
            <NavLink
                onClick={()=>{personalMessages(id)}}
                className={navData => navData.isActive ? classes.active : classes.authorName}
                to={"/dialogs/" + id}>
                {name}
            </NavLink>
        </div>
    )
}


export default AuthorItem;