import classes from './DialogsResponse.module.css'

type propsType = {
    response: string | null
}

const ResponseItem: React.FC<propsType> = ({ response }) => {
    return <div className={classes.responseBlock}>
        <span className={classes.me}>Me</span>
        <div className={classes.response}>{response}</div>
    </div>
}


export default ResponseItem