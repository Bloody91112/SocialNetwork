import AddMessageForm from './AddMessageForm'
import classes from './Chat.module.css'
import Messages from './Messages'

const Chat: React.FC = () => {

    return <div className={classes.chat}>
        <Messages />
        <AddMessageForm />
    </div>
}

export default Chat