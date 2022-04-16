import { AppStateType } from "./redux-store";

export const getIsAuth = (state:AppStateType) => {
    return state.auth.isAuth
}
export const getlogin = (state:AppStateType) => {
    return state.profile.profile?.fullName
}
export const getTestingMode = (state:AppStateType) => {
    return state.app.testingMode
}