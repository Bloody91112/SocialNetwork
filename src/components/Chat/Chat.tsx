import { useEffect, useState } from 'react'
import AddMessageForm from './AddMessageForm'
import classes from './Chat.module.css'
import Messages from './Messages'

const Chat: React.FC = () => {

    let [ws,setWS] =useState<WebSocket|null>(null)

    useEffect(() => {
        (function createChanel() {
            setWS(new WebSocket("wss://social-network.samuraijs.com/handlers/ChatHandler.ashx"))
        }())
    }, [])


    return <div className={classes.chat}>
        <Messages ws={ws} />
        <AddMessageForm ws={ws} />
    </div>
}

export default Chat