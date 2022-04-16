import classes from './Dialogs.module.css'
import { Field } from 'redux-form';
import { Textarea } from '../common/formsControls/formsConstrols';
import { maxLengthValidatorCreator, required } from '../../utils/validators/validators';




let maxLength200 = maxLengthValidatorCreator(200)




let AddMessageForm = ({handleSubmit}:any) => {
    return (
        <form onSubmit={handleSubmit} className={classes.newMessage}>
            <Field
                className={classes.form}
                name='newMessageBody'
                placeholder='Enter your message'
                component={Textarea}
                validate={[required, maxLength200]}>
            </Field>
            <button className={classes.addMessageButton}>Add message</button>
        </form>
    )
}



export default AddMessageForm;