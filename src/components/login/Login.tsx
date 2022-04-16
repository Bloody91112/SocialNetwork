import { useDispatch, useSelector } from "react-redux"
import { Navigate } from "react-router-dom"
import { reduxForm } from "redux-form"
import { login } from "../../redux/auth-reducer"
import { AppStateType } from "../../redux/redux-store"
import classes from './Login.module.css'
import LoginForm from "./LoginForm"


type formDataType = {
    email: string
    password: string
    rememberMe: boolean
}

const Login = () => {
    const dispatch = useDispatch() 
    const isAuth = useSelector( (state:AppStateType) => state.auth.isAuth )

    const onSubmitFunc = (formData: formDataType) => {
        dispatch(login(formData.email, formData.password, formData.rememberMe))
    }

    if (isAuth) return <Navigate to='/profile' />
    return (
        <div className={classes.mainBlock}>
            <h1 className={classes.loginTitle}>
                Login to access the social network :)
            </h1>
            <LoginReduxForm onSubmit={onSubmitFunc} />
        </div>
    )
}

const LoginReduxForm = reduxForm<formDataType, void>({ form: 'login' })(LoginForm)

export default Login