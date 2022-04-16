import { AnyAction, Dispatch } from 'redux';
import { stopSubmit } from "redux-form";
import { ThunkAction } from 'redux-thunk';
import { ResultCodeEnum } from "../api/API";
import { headerAPI } from '../api/headerAPI';
import { loginAPI } from '../api/loginAPI';
import { AppStateType } from './redux-store';

const SET_USER_DATA = 'auth/SET-USER-DATA';


//state
let initialState = {
    id: null as null | number,
    email: null as null | string,
    login: null as null | string,
    isAuth: false as boolean,
}

export type initialStateType = typeof initialState

//reducer
const authReducer = (state = initialState, action: AnyAction): initialStateType => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.data
            }

        default:
            return state;
    }
}


//actions types
type setAuthUserDataType = {
    type: typeof SET_USER_DATA
    data: {
        id: number | null
        email: string | null
        login: string | null
        isAuth: boolean | null
    }
}

type actionsType = setAuthUserDataType

//actions

export const setAuthUserData =
    (id: number | null, email: string | null, login: string | null, isAuth: boolean): setAuthUserDataType =>
        ({ type: SET_USER_DATA, data: { id, email, login, isAuth } })




//thunks

export const setAuthUser = () => async (dispatch:Dispatch) => {
    let response = await headerAPI.getAuthUserData()
    if (response.resultCode === ResultCodeEnum.Success) {
        let { id, login, email } = response.data
        dispatch(setAuthUserData(id, email, login, true));
    }
}

export const login = (email: string, password: string, rememberMe: boolean):ThunkAction<Promise<void>, AppStateType, unknown,actionsType> =>
        async (dispatch) => {
            let response = await loginAPI.loginUser(email, password, rememberMe)
            let message = response.messages.length > 0 ? response.messages[0] : 'Some error';
            if (response.resultCode === ResultCodeEnum.Success) {
                dispatch(setAuthUser())
            } else {
                //@ts-ignore
                dispatch(stopSubmit('login', { _error: message }))
            }
        }


export const logout = ():ThunkAction<Promise<void>, AppStateType, unknown,actionsType>  => {
    return async (dispatch) => {
        let response = await loginAPI.logoutUser()
        if (response.data.resultCode === 0) {
            dispatch(setAuthUserData(null, null, null, false));
        }
    }
}


export default authReducer;