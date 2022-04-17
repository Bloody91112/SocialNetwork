
import { useState } from 'react'
import classes from './Chat.module.css'
import { ws } from './ChatPage'



const AddMessageForm: React.FC = () => {

    const [message, setMessage] = useState('');

    const sendMessage = () => {
        if (!message){
            return
        }
        ws.send(message)
        setMessage('')
    }

    return <form className={classes.addMessageForm}>
        <textarea className={classes.messageInput} onChange={(e)=>{setMessage(e.currentTarget.value)}} value={message}></textarea>
        <button className={classes.button} onClick={sendMessage}>Send</button>
    </form>
}

export default AddMessageForm