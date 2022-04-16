import { ResultCodeEnum } from './../api/API';
import { AppStateType } from './redux-store';
import { ThunkAction } from 'redux-thunk';
import { updateObjectInArray } from "../utils/validators/objects-helpers";
import { userType } from "../components/common/types/types";
import { Dispatch } from "redux";
import { usersAPI } from "../api/userAPI";


const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET-USERS';
const SET_CURRENT_PAGE = 'SET-CURRENT-PAGE';
const SET_TOTAL_USERS_COUNT = 'SET-TOTAL-USERS-COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE-IS-FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE-IS-FOLLOWING-PROGRESS';
const SET_FILTER = 'SET-FILTER'


let initialState = {
    users: [] as Array<userType>,
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [] as Array<number>,// array of users id
    filter: { 
        term: "",
        friend: null as null | boolean
     }
}

export type initialStateType = typeof initialState

export type filterType = typeof initialState.filter

const usersReducer = (state = initialState, action: actionsType): initialStateType => {
    switch (action.type) {
        case FOLLOW:

            return {
                ...state,
                users: updateObjectInArray(state.users,
                    action.userId, 'id', { followed: true })
            }

        case UNFOLLOW:

            return {
                ...state,
                users: updateObjectInArray(state.users,
                    action.userId, 'id', { followed: false })
            }


        case SET_USERS:

            return { ...state, users: [...action.users] };

        case SET_CURRENT_PAGE:

            return { ...state, currentPage: action.currentPage };

        case SET_TOTAL_USERS_COUNT:

            return { ...state, totalUsersCount: action.totalCount }

        case TOGGLE_IS_FETCHING:

            return { ...state, isFetching: action.isFetching }

        case SET_FILTER:

            return { ...state, filter: action.payload }

        case TOGGLE_IS_FOLLOWING_PROGRESS:

            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId)
            }

        default:
            return state;
    }

}

//actions types

export type actionsType = followSuccessType
    | unfollowSuccessType
    | setUsersType
    | setCurrentPageType
    | setTotalUsersCountType
    | toggleIsFetchingType
    | toggleFollowInProgressType
    | setFilterType

type followSuccessType = {
    type: typeof FOLLOW
    userId: number
}

type unfollowSuccessType = {
    type: typeof UNFOLLOW
    userId: number
}

type setUsersType = {
    type: typeof SET_USERS
    users: Array<userType>
}

type setCurrentPageType = {
    type: typeof SET_CURRENT_PAGE
    currentPage: number
}

type setTotalUsersCountType = {
    type: typeof SET_TOTAL_USERS_COUNT
    totalCount: number
}

type toggleIsFetchingType = {
    type: typeof TOGGLE_IS_FETCHING
    isFetching: boolean
}

type toggleFollowInProgressType = {
    type: typeof TOGGLE_IS_FOLLOWING_PROGRESS
    isFetching: boolean
    userId: number
}

type setFilterType = {
    type: typeof SET_FILTER
    payload: {
         term: string
         friend: null | boolean
         }
}


//actions

export const followSuccess = (userId: number): followSuccessType =>
    ({ type: FOLLOW, userId })

export const unfollowSuccess = (userId: number): unfollowSuccessType =>
    ({ type: UNFOLLOW, userId })

export const setUsers = (users: Array<userType>): setUsersType =>
    ({ type: SET_USERS, users })

export const setCurrentPage = (currentPage: number): setCurrentPageType =>
    ({ type: SET_CURRENT_PAGE, currentPage })

export const setTotalUsersCount = (totalCount: number): setTotalUsersCountType =>
    ({ type: SET_TOTAL_USERS_COUNT, totalCount })

export const toggleIsFetching = (isFetching: boolean): toggleIsFetchingType =>
    ({ type: TOGGLE_IS_FETCHING, isFetching })

export const toggleFollowInProgress = (isFetching: boolean, userId: number): toggleFollowInProgressType =>
    ({ type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userId })

export const setFilter = (filter:filterType): setFilterType =>
    ({ type: SET_FILTER, payload: filter })

//thunks
type thunkActionType = ThunkAction<Promise<void>, AppStateType, unknown, actionsType>


export const requestUsers = (currentPage: number, pageSize: number, filter: filterType): thunkActionType => {
    return async (dispatch) => {
        dispatch(toggleIsFetching(true))
        dispatch(setCurrentPage(currentPage))
        dispatch(setFilter(filter))

        let response = await usersAPI.getUsers(currentPage, pageSize, filter.term, filter.friend)
        dispatch(toggleIsFetching(false));
        dispatch(setUsers(response.items));
        dispatch(setTotalUsersCount(response.totalCount));
    }
}


export const follow = (userId: number): thunkActionType => {
    return async (dispatch) => {
        await _followUnfollowFlow(usersAPI.followUser.bind(usersAPI), followSuccess, dispatch, userId)
    }
}



export const unfollow = (userId: number): thunkActionType => {
    return async (dispatch) => {
        await _followUnfollowFlow(usersAPI.unfollowUser.bind(usersAPI), unfollowSuccess, dispatch, userId)
    }
}

const _followUnfollowFlow =
    async (apiMethod: any, actionCreator: (userId: number) => followSuccessType | unfollowSuccessType, dispatch: Dispatch, userId: number) => {
        dispatch(toggleFollowInProgress(true, userId));
        let response = await apiMethod(userId)
        if (response.resultCode === ResultCodeEnum.Success) {
            dispatch(actionCreator(userId))
        }
        dispatch(toggleFollowInProgress(false, userId))
    }

export default usersReducer;