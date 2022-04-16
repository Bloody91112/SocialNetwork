
import classes from './Settings.module.css';

type propsType = {
    testingMode: boolean
    activateTestingMode:() => void
    deactivateTestingMode:() => void
}


const Settings:React.FC<propsType> = ({testingMode,activateTestingMode,deactivateTestingMode}) => {

    let handleClick = (event:any) => {
        if(event.target.checked){
            activateTestingMode()
        } else {
            deactivateTestingMode()
        }
    }



    return (
        <div className={classes.settingsPage}>
            <h1 className={classes.title}>
                Settings {testingMode && <span className={classes.testingMode}>Dark theme activated</span>}
            </h1>
            
            <div className={testingMode? classes.settingsBlock + ' ' + classes.darkThemesettingsBlock : classes.settingsBlock}>
                <div className={testingMode? classes.setLine + ' ' + classes.darkThemesetLine : classes.setLine}>
                    <div className={testingMode? classes.setName + ' ' + classes.darkThemesetName : classes.setName}>Activate dark theme(beta)</div>
                    {testingMode
                        ? <input onChange={(event) => { handleClick(event) }} checked className={classes.checkbox} type="checkbox" />
                        : <input onChange={(event) => { handleClick(event) }} className={classes.checkbox} type="checkbox" />
                    }
                </div>
            </div>
        </div>
        
    )
}

export default Settings