import classes from './Dialogs.module.css'
import AuthorItem from './DialogsAuthor/DialogsAuthor';
import MessageItem from './DialogsMessage/DialogsMessage';
import { useState } from 'react';
import { reduxForm } from 'redux-form';
import ResponseItem from './DialogsResponse/DialogsResponse';
import { addMessage } from '../../redux/dialogs-reducer';
import AddMessageForm from './AddMessageForm';
import { useDispatch, useSelector } from 'react-redux';
import { getAuthors, getMessages, getResponses } from '../../redux/dialogs-selectors';
import { getTestingMode } from '../../redux/profile-selectors';




const Dialogs = () => {

    const authors = useSelector( getAuthors )
    const messages = useSelector( getMessages )
    const responses =useSelector( getResponses )
    const testingMode = useSelector( getTestingMode)

    const dispatch = useDispatch()
    let [currentId, changeId] = useState(1)

    let ChangeCurrentCompanion = (id:number) => {
        changeId(id)
    }

    let messagesElements = messages.map((message) => {
        if (currentId === message.id) {
            return <MessageItem message={message.message} key={message.id} />
        } return null
    })

    let responsesElements = responses[currentId - 1].messages.map((responseObj) => {
        return <ResponseItem response={responseObj.message} key={responseObj.id} />
    })
    
    let authorsElements = authors.map((author) =>
        <AuthorItem personalMessages={ChangeCurrentCompanion} id={author.id} name={author.name} key={author.id} avatar={author.avatar} />)

    let onFormSumbit = (FormData: { newMessageBody: string }) => {
        dispatch(addMessage(FormData.newMessageBody, currentId))
    }

    return (
        <div>
            <h1 className={classes.title}>My dialogs</h1>
            <div className={classes.dialogs}>
                <div className={classes.authors}>
                    {authorsElements}
                </div>
                <div className={testingMode? classes.AllMessagesDT + " " + classes.AllMessages: classes.AllMessages}>
                    <div className={classes.chat}>
                        <span className={classes.authorName}>{authors[currentId - 1].name}</span>
                        {messagesElements}
                        {responsesElements}
                    </div>
                    {//@ts-ignore
                    <AddMessageFormRedux onSubmit={onFormSumbit} />}
                </div>
            </div>
        </div>

    )
}



let AddMessageFormRedux = reduxForm({ form: 'dialogAddMessageForm' })(AddMessageForm)



export default Dialogs;