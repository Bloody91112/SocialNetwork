import bill from '../assets/images/bill.jpg'
import me from '../assets/images/myAv.jpg'

const LIKE = 'LIKE'



//state
let initialState = {
    newsBlocks: [
        {
            id: 3, title: "Very grateful",
            text: "Wow, the site is awesome, thanks,i`m buying it",
            author: 'Bill Gates', authorAvatar: bill,  likesCount: 12786
        } ,
        {
            id: 2, title: "Bugs are fixed",
            text: "we just fixed all the bugs, cheers",
            author: 'admin',authorAvatar: me, likesCount: 24389
        },
        {
            id: 1, title: "bugs",
            text: "We are aware of the bugs, we will fix it soon, sorry",
            author: 'admin',authorAvatar: me, likesCount: 54343
        },
    ]
}

export type initialStateType = typeof initialState


//reducer
const newsReducer = (state = initialState, action: actionsTypes): initialStateType => {
   switch (action.type) {
       case LIKE:
           return {
               ...state,
               newsBlocks: [...state.newsBlocks].map( newsObj => {
                   if (action.newsId === newsObj.id){
                       return {
                           ...newsObj, likesCount: newsObj.likesCount + 1 
                       } 
                   }
                   else return {...newsObj}
               })
           }
           
   
       default:
           return state
   }
}


type addLikeType = {
    type: typeof LIKE
    newsId: number
}


type actionsTypes = addLikeType

export const addLike = (newsId:number): addLikeType => ({type: LIKE, newsId} )


export default newsReducer;