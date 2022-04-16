import classes from './Post.module.css';
import React from "react";
import { useSelector } from 'react-redux';
import { getTestingMode } from '../../../../redux/profile-selectors';

type propsType = {
    avatar: string
    message: string
    likesCount: number
}


const Post:React.FC<propsType> = ({avatar,message,likesCount}) => {

    const testingMode = useSelector(getTestingMode)

    return (
        <div className={classes.item}>
            <div className={classes.avatar}><img src={avatar} alt="" /></div>
            <div className={classes.postInfo}>
                <div className={testingMode? classes.message : ''}>{message}</div>
                <div className={testingMode? classes.postDT + " " + classes.likes : classes.likes}>{likesCount} &#9829; </div>
            </div>
        </div>
    )
}

export default Post;