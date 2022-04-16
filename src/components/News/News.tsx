import NewsBlock from "./NewsBlock"
import classes from './News.module.css'
import { useSelector } from "react-redux"
import { AppStateType } from "../../redux/redux-store"
import { newsType } from "../common/types/types"


const News = () => {

    const news = useSelector( (state:AppStateType) => state.news.newsBlocks )
    

    let newsElements = news.map(
        (newsObj: newsType) =>
            <NewsBlock id = {newsObj.id} authorAvatar={newsObj.authorAvatar} key={newsObj.id} text={newsObj.text}
                author={newsObj.author} likesCount={newsObj.likesCount} title={newsObj.title} />)
    return (
        <div className={classes.allNewsPage}>
            <h1 className={classes.pageTitle}>News</h1>
            <div className={classes.contentPart}></div>
            {newsElements}
        </div>
        )
}

export default News