import classes from './Dialogs.module.css'
import { Field } from 'redux-form';
import { Textarea } from '../common/formsControls/formsConstrols';
import { maxLengthValidatorCreator, required } from '../../utils/validators/validators';
import { useSelector } from 'react-redux';
import { getTestingMode } from '../../redux/header-selectors';




let maxLength200 = maxLengthValidatorCreator(200)




let AddMessageForm = ({handleSubmit}:any) => {
    const testingMode = useSelector(getTestingMode)
    return (
        <form onSubmit={handleSubmit} className={classes.newMessage}>
            <Field
                className={classes.form}
                name='newMessageBody'
                placeholder='Enter your message'
                component={Textarea}
                validate={[required, maxLength200]}>
            </Field>
            <button className={testingMode? classes.buttonDT + " " + classes.addMessageButton : classes.addMessageButton}>
                Add message
            </button>
        </form>
    )
}



export default AddMessageForm;