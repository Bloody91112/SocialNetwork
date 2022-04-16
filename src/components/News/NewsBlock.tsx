import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addLike } from '../../redux/news-reducer'
import { newsType } from '../common/types/types'
import classes from './News.module.css'




    

const NewsBlock:React.FC<newsType> = ({id,title,text,author,authorAvatar,likesCount}) => {

    
    const dispatch = useDispatch()
    const [clicked, setCliked] = useState(false)

    let setLike = (id:number) => {
        if (!clicked){
            dispatch(addLike(id))
            setCliked(true)
        }
    }


    return (
        
        <div className={classes.newsElement}>
            <h1 className={classes.title}>{title}</h1>
            <div className={classes.authorBlock}>
                <img className={classes.avatar} src={authorAvatar} alt="" />
                <p className={classes.author}>{author}</p>
            </div>
            <p className={classes.text}>{text}</p>
            <div className={classes.likes}>

                <button onClick={() => {setLike(id)}} className={clicked? classes.clickedButton : classes.likeButton}>&#10084;</button>
                <span className={classes.likesCount}>{likesCount}</span>
            </div>
        </div>
    )
}

export default NewsBlock