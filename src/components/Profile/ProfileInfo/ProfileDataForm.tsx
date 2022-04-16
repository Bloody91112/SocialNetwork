import { Field } from 'redux-form';
import { reduxForm } from 'redux-form';
import { Input, Textarea } from '../../common/formsControls/formsConstrols';
import Contact from './Contact';
import classes from './ProfileDataForm.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { getProfile, getTestingMode } from '../../../redux/profile-selectors';
import { saveProfile, setUserPhoto } from '../../../redux/profile-reducer';


type propsType = {
    deactivateEditMode: (boolean: boolean) => void
}

type fieldsPropsType = {
    handleSubmit: any
}


const ProfileDataForm: React.FC<propsType> = ({ deactivateEditMode }) => {

    const dispatch = useDispatch()
    
    let onSubmit = (formData: any) => {
        //@ts-ignore
        dispatch(saveProfile(formData)).then(() => {
            deactivateEditMode(false)
        })}
        
    return (
        <div className={classes.editProfileBlock}>
            <h1>Edit profile mode</h1>
            <ReduxProfileDataForm onSubmit={onSubmit} />
        </div>
    )
}


const ProfileDataFields: React.FC<fieldsPropsType> = ({ handleSubmit }) => {

    const profile:any = useSelector(getProfile)
    const testingMode = useSelector(getTestingMode)
    const dispatch = useDispatch()

    const onPhotoAdded = (e: any) => {
        if (e.target.files.length) {
            dispatch(setUserPhoto(e.target.files[0]))
        }
    }

    return <form onSubmit={handleSubmit}>
        
            <div className={testingMode? classes.formFieldDT + " " + classes.formField :classes.formField}>
                <b>Change Avatar</b>
                <input className={classes.loadFileButton} type={'file'} onChange={onPhotoAdded} />
          
                <b>Full name :</b>
                <Field name='fullName'
                    component={Input}
                    validate={[]}
                    placeholder="Full name">
                </Field>
            

                <div className={testingMode? classes.formFieldDT + " " + classes.formField :classes.formField}>
                <b>Looking for a job :</b>
                <Field name='lookingForAJob'
                    component='input'
                    type="checkbox"
                    validate={[]}
                    placeholder="Looking for a job">
                </Field>
            </div>
            <div className={testingMode? classes.formFieldDT + " " + classes.formField :classes.formField}>
                <b>Professional skills :</b>
                <Field name='lookingForAJobDescription'
                    component={Textarea}
                    validate={[]}
                    placeholder="Professional skills">
                </Field>
            </div>
            <div className={testingMode? classes.formFieldDT + " " + classes.formField :classes.formField}>
                <b>About me :</b>
                <Field name='aboutMe'
                    component={Textarea}
                    validate={[]}
                    placeholder="About me">
                </Field>
            </div>
            <div className={testingMode? classes.formFieldDT + " " + classes.formField :classes.formField}>
                {Object.keys(profile.contacts).map((key) => {
                    return <Contact
                         key={key}
                        contactTitle={key}
                        contactValue={
                            <Field name={`contacts.${key}`}
                                component={Input}
                                placeholder={`your ${key} page URL`}></Field>
                        } />
                })}
                <button className={testingMode? classes.saveButtonDT + " " + classes.saveButton :classes.saveButton}>Save</button>
            </div>
        </div>
    </form>
}


let ReduxProfileDataForm = reduxForm<any>({ form: "editProfile" })(ProfileDataFields)

export default ProfileDataForm