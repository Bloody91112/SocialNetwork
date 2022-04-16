const ADD_MESSAGE = 'ADD-MESSAGE';


//state types
export type responsesType = {
    companionId: number
    messages: Array<messageType>
}
//                  ^^^
//                  ||| 
type messageType = {
    id: null | number,
    message: null | string
}


export type messagesType = {
    id: number
    message: string
}

export type authorsType = {
    id: number,
    name: string,
    avatar: string
}

//state
let initialState = {

    responses: [
        { companionId: 1, messages: [{id:1, message: 'busy' }] },
        { companionId: 2, messages: [] },
        { companionId: 3, messages: [] },
        { companionId: 4, messages: [] },
        { companionId: 5, messages: [] },
        { companionId: 6, messages: [] },
    ] as Array<responsesType> ,

    messages: [
        { id: 1, message: "Hi" },
        { id: 2, message: "How are you" },
        { id: 3, message: "Bye" },
        { id: 4, message: "Yo" },
        { id: 5, message: "Yoo" },
        { id: 6, message: "Yooo" },
    ] as Array<messagesType> ,
    
    authors: [
        { id: 1, name: 'Steve', avatar: "https://shapka-youtube.ru/wp-content/uploads/2021/02/avatarka-dlya-skaypa-dlya-parney.jpg" },
        { id: 2, name: 'John', avatar: "https://shapka-youtube.ru/wp-content/uploads/2021/02/avatarka-dlya-skaypa-dlya-parney.jpg" },
        { id: 3, name: 'Anna', avatar: "https://shapka-youtube.ru/wp-content/uploads/2021/02/avatarka-dlya-skaypa-dlya-parney.jpg" },
        { id: 4, name: 'Vincent', avatar: "https://shapka-youtube.ru/wp-content/uploads/2021/02/avatarka-dlya-skaypa-dlya-parney.jpg" },
        { id: 5, name: 'Alex', avatar: "https://shapka-youtube.ru/wp-content/uploads/2021/02/avatarka-dlya-skaypa-dlya-parney.jpg" },
        { id: 6, name: 'Marria', avatar: "https://shapka-youtube.ru/wp-content/uploads/2021/02/avatarka-dlya-skaypa-dlya-parney.jpg" },
    ] as Array<authorsType>,
}


export type initialStateType = typeof initialState


//reducer
const dialogsReducer = (state = initialState, action:actionsType):initialStateType => {
    switch (action.type) {
        case ADD_MESSAGE:
            return {
                ...state,
                responses: [...state.responses].map((respObj => {
                    if (action.companionId === respObj.companionId) {
                        return {
                            ...respObj, messages: [...respObj.messages,
                            { id: respObj.messages.length + 1, message: action.text }
                            ]
                        }
                    } else return { ...respObj }
                }))

            }

        default:
            return state;
    }
}



// actions types

type addMessageType = {
    type: typeof ADD_MESSAGE,
    text: string
    companionId: number
}

type actionsType = addMessageType


//actions
export const addMessage = (text: string, companionId: number): addMessageType =>
    ({ type: ADD_MESSAGE, text, companionId })

export default dialogsReducer;