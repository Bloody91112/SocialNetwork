import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { getTestingMode } from '../../redux/header-selectors'
import classes from './Chat.module.css'
import { ChatMessageType } from './ChatPage'



const Messages: React.FC<{ws:WebSocket|null}> = ({ws}) => {

    const [messages, setMessages] = useState<ChatMessageType[]>([])

    useEffect( () => {
        ws?.addEventListener('message', (e) => {
            let newMessages = JSON.parse(e.data)
            setMessages((prevMessage)=> [...prevMessage, ...newMessages])
        })
    },[ws])

    return <div className={classes.messages}> 
        {messages.map((m: any, index) => <Message key={index} message={m}/> )}
    </div>
}



const Message: React.FC <{message: ChatMessageType}> = ({message}) => {
    
    const testingMode = useSelector(getTestingMode)

    return <div>
        
        <div className={classes.message}>
            <div className={testingMode?
                 classes.userTD 
                : classes.user}>       
                <img className={classes.messageAvatar} src={message.photo} alt="" />
                <NavLink className={testingMode ?
                    classes.userNameTD
                    : classes.userName}
                    to={`/profile/${message.userId}`}>
                    {message.userName}
                </NavLink>
            </div>
            <div className={testingMode ?
                classes.messageTextTD
                : classes.messageText}>
                {message.message}
            </div>
        </div>
    </div>

}


export default Messages