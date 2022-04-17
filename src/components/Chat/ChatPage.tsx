
import Chat from "./Chat"
import classes from './Chat.module.css'


export type ChatMessageType = {
    message: string
    photo: string
    userId: number
    userName: string
}

const ChatPage: React.FC = () => {
   

    return <div className={classes.chatPage}>
        <h1 className={classes.title}>Chat</h1>
        <div className={classes.chatBlock}>
            <Chat />
        </div>

    </div>
}

export default ChatPage