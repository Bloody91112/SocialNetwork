import classes from './DialogsMessage.module.css'
import React from "react";
import { useSelector } from 'react-redux';
import { getTestingMode } from '../../../redux/profile-selectors';

type propsType = {
    message: string
}

const MessageItem: React.FC<propsType> = ({message}) => {

    const testingMode = useSelector(getTestingMode)

    return(
        <div className={classes.messageBlock}>
            <div className={testingMode? classes.messageDT + " " + classes.message: classes.message}>
                {message}
            </div>
        </div> 
    )
}

export default MessageItem;