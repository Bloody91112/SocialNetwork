import React from "react"
import { Field, InjectedFormProps } from "redux-form"
import { maxLengthValidatorCreator, required } from "../../utils/validators/validators"
import { CheckBox, Input } from "../common/formsControls/formsConstrols"
import classes from './Login.module.css'


type formDataType = {
    email: string
    password: string
    rememberMe: boolean
}

let maxLength30 = maxLengthValidatorCreator(30)

const LoginForm: React.FC<InjectedFormProps<formDataType, void>> = ({ handleSubmit }) => {

    return (
        <form className={classes.form} onSubmit={handleSubmit}>

            <Field
                className={classes.email}
                placeholder="Email"
                name={"email"}
                component={Input}
                validate={[required]} />

            <Field
                className={classes.password}
                placeholder="Password"
                name={"password"}
                type={"password"}
                component={Input}
                validate={[required, maxLength30]} />

            <div className={classes.bottomBlock}>

                <button className={classes.mainButton}>Login</button>

                <Field
                    className={classes.rememberMe}
                    type="checkbox"
                    name={"rememberMe"}
                    component={CheckBox} />
            </div>

        </form>
    )
}

export default LoginForm