import classes from './Post.module.css';
import React from "react";

type propsType = {
    avatar: string
    message: string
    likesCount: number
}


const Post:React.FC<propsType> = ({avatar,message,likesCount}) => {
    return (
        <div className={classes.item}>
            <div className={classes.avatar}><img src={avatar} alt="" /></div>
            <div className={classes.postInfo}>
                <div className={classes.message}>{message}</div>
                <div className={classes.likes}>{likesCount} &#9829; </div>
            </div>
        </div>
    )
}

export default Post;