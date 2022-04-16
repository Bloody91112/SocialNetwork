import { AppStateType } from './redux-store';

export const getMessages = (state:AppStateType) => {
    return state.dialogs.messages
}
export const getAuthors = (state:AppStateType) => {
    return state.dialogs.authors
}
export const getResponses = (state:AppStateType) => {
    return state.dialogs.responses
}
