import { AppStateType } from './redux-store';

export const getProfile = (state: AppStateType) => {
    return state.profile.profile
}
export const getStatus = (state: AppStateType) => {
    return state.profile.status
}
export const getAuthUserId = (state: AppStateType) => {
    return state.auth.id
}
export const getIsAuth = (state: AppStateType) => {
    return state.auth.isAuth
}
export const getTestingMode = (state:AppStateType) => {
    return state.app.testingMode
}