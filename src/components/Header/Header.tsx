import { NavLink, useNavigate } from 'react-router-dom';
import classes from './Header.module.css';
import logotip from "../../assets/images/logotip.svg"
import { useDispatch, useSelector } from 'react-redux';
import { getIsAuth, getlogin, getTestingMode } from '../../redux/header-selectors';
import { logout } from '../../redux/auth-reducer';



const Header = () => {

    const isAuth = useSelector(getIsAuth)
    const login = useSelector(getlogin)
    const testingMode = useSelector(getTestingMode)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleClick = () => {
        dispatch(logout())
        navigate('login', { replace: true })
        
    }

    return (
        <header className={testingMode ? classes.headerDT + " " + classes.header : classes.header}>
            <img className={classes.logotip} src={logotip} alt="" />
            <div className={classes.loginBlock}>
                {isAuth
                    ? <div className={classes.description}>
                        <span className={classes.currentUser}>Current user:</span>
                        <div className={testingMode ? classes.headerDT + " " + classes.loginName : classes.loginName}> {login}</div>
                        <button className={testingMode ? classes.logButtonDT + " " + classes.logButton : classes.logButton}
                            onClick={() => { handleClick() }}>
                            log out
                        </button>
                    </div>
                    : <NavLink className={classes.loginRef} to={'/login'}>Login</NavLink>
                }
            </div>
        </header>
    )
}

export default Header;