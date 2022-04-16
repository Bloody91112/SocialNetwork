import { useSelector } from 'react-redux';
import { getTestingMode } from '../../../redux/header-selectors';
import classes from './Contact.module.css';


type propsType = {
    contactTitle: any
    contactValue: any
}

const Contact: React.FC<propsType> = ({ contactTitle, contactValue }) => {
    
    const testingMode = useSelector(getTestingMode)

    return <div className={classes.contact}>
        <div className={testingMode ? classes.contactDT + " " + classes.contactTitle : classes.contactTitle}>
            {contactTitle}:
        </div>
        <div className={testingMode ? classes.contactDT + " " + classes.contactValue : classes.contactValue}>
            {contactValue || '-'}
        </div>
    </div>
}

export default Contact