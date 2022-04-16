import { useSelector } from 'react-redux'
import { getTestingMode } from '../../../redux/header-selectors'
import classes from './DialogsResponse.module.css'

type propsType = {
    response: string | null
}

const ResponseItem: React.FC<propsType> = ({ response }) => {

    const testingMode = useSelector(getTestingMode)


    return <div className={classes.responseBlock}>
        <span className={classes.me}>Me</span>
        <div className={testingMode? classes.responseDT + " " + classes.response: classes.response}>
            {response}
            </div>
    </div>
}


export default ResponseItem