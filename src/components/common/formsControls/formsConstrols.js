import styles from "./formsConstrols.module.css"
import React from "react";

export const Textarea = ({input, meta, ...props}) => {
    return (
        <span className={styles.spanWrapper}>
            <textarea {...input}{...props}/>
        </span>
    )
}



export const Input = ({input, meta, ...props}) => {
    return <span className={styles.spanWrapper}>
            <input  {...input}{...props}/>
        </span>
        
    
}

export const CheckBox = ({input}) => {
    return (
        <div className={styles.CheckBox} >
            <input className={styles.squere}  type="checkBox" {...input}/> <span className={styles.rememberMe}>remember</span>
        </div>
    )
}

  
