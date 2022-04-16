import { Field, Form, Formik } from 'formik';
import { filterType } from '../../redux/users-reducer';
import classes from './Users.module.css'


const usersSearchFormValidate = (values: any) => {
    const errors:any = {};
    return errors;
}

type propsType = {
    onFilterChanged: (filter: filterType) => void
}


const UsersSearchForm: React.FC<propsType> = ({onFilterChanged}) => {

    const submit = (values: filterType, { setSubmitting }: any) => {
        onFilterChanged(values)
        setSubmitting(false)
    }

    return (
        
            <Formik
                initialValues={{ term:'' ,friend: null }}
                validate={usersSearchFormValidate}
                onSubmit={submit}
            >
                {({ isSubmitting }) => (
                    <Form className={classes.form}>
                    <div className={classes.search}>
                        <Field placeholder="Enter user name" className={classes.input} name='term' type="text"></Field>
                        <Field className={classes.select} name="friend" as="select">
                            <option className={classes.option} value="null" >All</option>
                            <option className={classes.option} value="false">Unfollowed</option>
                            <option className={classes.option} value="true">Followed</option>
                        </Field>
                    </div>
                        <button className={classes.inputButton} type="submit" disabled={isSubmitting}>
                            Find
                        </button>
                    </Form>
                )}
            </Formik>
        
    )
}


export default UsersSearchForm