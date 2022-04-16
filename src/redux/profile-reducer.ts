import { AppStateType } from './redux-store';
import { ThunkAction } from 'redux-thunk';
import { stopSubmit } from "redux-form"
import avatar from "../assets/images/myAv.jpg"
import { profileAPI } from '../api/profileAPI';
import { profileType } from '../components/common/types/types';
import { ResultCodeEnum } from '../api/API';

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET-USER-PROFILE';
const SET_STATUS = 'SET-STATUS'
const SET_USER_PHOTO = 'SET-USER-PHOTO'

//state type
 export type postsType = {
    id: number
    message: string
    likesCount: number
    avatar: typeof avatar
}

//state

let initialState = {
    posts:
        [{ id: 1, message: 'Hi,everyone', likesCount: 12, avatar: avatar },
        { id: 2, message: 'I`m fine, doing nothing', likesCount: 11, avatar: avatar },] as Array<postsType>,
    profile: null as profileType | null,
    status: '',
}

export type initialStateType = typeof initialState

const profileReducer = (state = initialState, action: any): initialStateType => {

    switch (action.type) {
        case ADD_POST:
            return {
                ...state,
                posts: [{
                    id: state.posts.length + 1,
                    message: action.text,
                    likesCount: 0,
                    avatar: avatar
                },
                ...state.posts]
            };

        case SET_STATUS:
            return {
                ...state,
                status: action.status
            };

        case SET_USER_PROFILE:
            return {
                ...state,
                profile: action.profile
            };

        case SET_USER_PHOTO:
            return {
                ...state,
                //@ts-ignore
                profile: { ...state.profile, photos: action.photos }
            };

        default:
            return state;
    }

}

//actions types

type anctionTypes = setPhotoType | addPostType | setUserProfileType | setStatusType


type setPhotoType = {
    type: typeof SET_USER_PHOTO
    photos: object
}

type addPostType = {
    type: typeof ADD_POST
    text: string
}

type setUserProfileType = {
    type: typeof SET_USER_PROFILE
    profile: profileType
}

type setStatusType = {
    type: typeof SET_STATUS
    status: string
}

//actions

export const setPhoto = (photos: object): setPhotoType => ({ type: SET_USER_PHOTO, photos })
export const addPost = (text: string): addPostType => ({ type: ADD_POST, text })
export const setUserProfile = (profile: profileType): setUserProfileType => ({ type: SET_USER_PROFILE, profile })
export const setStatus = (status: string): setStatusType => ({ type: SET_STATUS, status })

//thunks 

type thunkActionType = ThunkAction<Promise<void> ,AppStateType, unknown,anctionTypes>

export const getUserProfile = (userId:number | null | undefined):thunkActionType => {
    return async (dispatch) => {
        let response = await profileAPI.getProfile(userId)
        dispatch(setUserProfile(response.data));
    }
}

export const saveProfile = (data: any):thunkActionType => {
    return async (dispatch, getState) => {
        let AuthUserId = getState().auth.id
        let response = await profileAPI.saveProfile(data)

        if (response.data.resultCode === 0) {
            dispatch(getUserProfile(AuthUserId));
        } else {
            //@ts-ignore
            dispatch(stopSubmit('editProfile', { _error: response.data.messages[0] }))
            return Promise.reject(response.data.messages[0]);
        }
    }
}

export const getUserStatus = (userId:any):thunkActionType  => {
    return async (dispatch) => {
        let response = await profileAPI.getStatus(userId)

        dispatch(setStatus(response));
    }
}


export const updateUserStatus = (status:string):thunkActionType => {
    return async (dispatch) => {
        let response = await profileAPI.updateStatus(status)

        if (response.data.resultCode === ResultCodeEnum.Success) {
            dispatch(setStatus(status));
        }
    }
}


export const setUserPhoto = (image: any):thunkActionType => {
    return async (dispatch) => {
        let response = await profileAPI.setPhoto(image)

        if (response.resultCode === ResultCodeEnum.Success) {
            dispatch(setPhoto(response.data.photos));
        }
    }
}





export default profileReducer;