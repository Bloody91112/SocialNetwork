import classes from './DialogsMessage.module.css'
import React from "react";

type propsType = {
    message: string
}

const MessageItem: React.FC<propsType> = ({message}) => {
    return(
        <div className={classes.messageBlock}>
            <div className={classes.message}>{message}</div>
        </div> 
    )
}

export default MessageItem;