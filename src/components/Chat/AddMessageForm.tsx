
import { useEffect, useState } from 'react'
import classes from './Chat.module.css'



const AddMessageForm : React.FC<{ws:WebSocket|null}> = ({ws}) => {

    const [message, setMessage] = useState('');
    const [readyStatus, setReadyStatus] = useState('pending');
    

    useEffect( () => {
        ws?.addEventListener('open', () => {
            setReadyStatus('ready')
        })
    }, [ws] )

    

    const sendMessage = () => {
        if (!message){
            return
        }
        ws?.send(message)
        setMessage('')
    }

    return <form className={classes.addMessageForm}>
        <textarea className={classes.messageInput} onChange={(e) => { setMessage(e.currentTarget.value) }} value={message}></textarea>
        <button className={classes.button}
            onClick={sendMessage}
            disabled={ws === null || readyStatus !== 'ready'}>
            Send
        </button>
    </form>
}

export default AddMessageForm