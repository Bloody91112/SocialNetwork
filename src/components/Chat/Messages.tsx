import { useEffect, useRef, useState } from 'react'
import classes from './Chat.module.css'
import { ChatMessageType, ws } from './ChatPage'

const Messages: React.FC = () => {
    const [messages, setMessages] = useState<ChatMessageType[]>([])

    let count = useRef(0)

    useEffect( () => {
        ws.addEventListener('message', (e) => {
            let newMessages = JSON.parse(e.data)
            // eslint-disable-next-line react-hooks/exhaustive-deps
            count.current += 1
            if ( count.current %2 === 0) return  
            setMessages((prevMessage)=> [...prevMessage, ...newMessages])
        })
    },[])

    return <div className={classes.messages}> 
        {messages.map((m: any, index) => <Message key={index} message={m}/> )}
    </div>
}



const Message: React.FC <{message: ChatMessageType}> = ({message}) => {
    
    return <div>
        
        <div className={classes.message}>
            <div className={classes.user}>
                <img className={classes.messageAvatar} src={message.photo} alt="" />
                <b className={classes.userName} >{message.userName}</b>
            </div>
            <div className={classes.messageText}>{message.message}</div>
        </div>
    </div>

}


export default Messages