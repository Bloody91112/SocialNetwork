import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getTestingMode } from '../../redux/header-selectors'
import { addLike } from '../../redux/news-reducer'
import { newsType } from '../common/types/types'
import classes from './News.module.css'




    

const NewsBlock:React.FC<newsType> = ({id,title,text,author,authorAvatar,likesCount}) => {

    const testingMode = useSelector(getTestingMode)
    const dispatch = useDispatch()
    const [clicked, setCliked] = useState(false)

    let setLike = (id:number) => {
        if (!clicked){
            dispatch(addLike(id))
            setCliked(true)
        }
    }


    return (
        
        <div className={testingMode? classes.newsElementDT + " " + classes.newsElement : classes.newsElement}>
            <h1 className={classes.title}>{title}</h1>
            <div className={classes.authorBlock}>
                <img className={classes.avatar} src={authorAvatar} alt="" />
                <p className={classes.author}>{author}</p>
            </div>
            <p className={testingMode? classes.newsElementDT + " " + classes.text: classes.text}>
                {text}
            </p>

            {!testingMode && <div className={classes.likes}>
                <button onClick={() => {setLike(id)}}
                 className={clicked? classes.clickedButton : classes.likeButton}>
                    &#10084;
                    </button>
                <span className={classes.likesCount}>
                    {likesCount}
                </span>
            </div>}
            < div className={classes.likes}>
                <button onClick={() => { setLike(id) }}
                    className={classes.buttonDT}>
                    &#10084;
                </button>
                <span className={classes.buttonDT}>
                    {likesCount}
                </span>
            </div>
        </div>
    )
}

export default NewsBlock