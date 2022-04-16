import { useSelector } from "react-redux"
import { AppStateType } from "../../redux/redux-store"
import classes from "./Footer.module.css"


const Footer = () => {
    const testingMode = useSelector( (state:AppStateType) => state.app.testingMode )
    return <footer className={testingMode? classes.footerDT + " " + classes.footer : classes.footer}>
        Maded by me, 2022
    </footer>
}

export default Footer