import classes from './MyPosts.module.css';
import React from 'react';
import { Field, InjectedFormProps } from 'redux-form';
import { maxLengthValidatorCreator, required } from '../../../utils/validators/validators';
import { Textarea } from '../../common/formsControls/formsConstrols';
import { useSelector } from 'react-redux';
import { getTestingMode } from '../../../redux/profile-selectors';


let maxLength30 =  maxLengthValidatorCreator(30)

type formDataType = {
    postText: string
}

let AddPostForm:React.FC<InjectedFormProps<formDataType, unknown>> = ({handleSubmit}:any) => {

    const testingMode = useSelector(getTestingMode)

    return (
        <form onSubmit={handleSubmit} className={classes.newPostBlock}>
                <Field name='postText'
                 className={classes.newPost}
                 component={Textarea}
                 placeholder='What`s new?'
                 validate={[required,maxLength30]}>
                </Field>

                <button className={testingMode? classes.addPostButtonDT + " " + classes.addPostButton : classes.addPostButton}>Add post</button>
        </form>
    )
}



export default AddPostForm;