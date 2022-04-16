import { AppStateType } from './redux-store';
import { AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";
import { setAuthUser } from "./auth-reducer"

const INITIALIZED_SUCCESS = 'SET-INITIALIZED';
const ACTIVATE_TESTING_MODE = 'ACTIVATE-TESTING-MODE'
const DEACTIVATE_TESTING_MODE = 'DEACTIVATE-TESTING-MODE'

//state
let initialState = {
    initialized: false,
    testingMode: false
}

export type initialStateType = typeof initialState


//reducer
const appReducer = (state = initialState, action: AnyAction): initialStateType => {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true
            }

        case ACTIVATE_TESTING_MODE:
            return {
                ...state,
                testingMode: true
            }
        case DEACTIVATE_TESTING_MODE:
            return {
                ...state,
                testingMode: false
            }


        default:
            return state;
    }

}


//actions types
type anctionTypes = initializedSuccessType | activateTestingModeType | deactivateTestingModeType

type initializedSuccessType = {
    type: typeof INITIALIZED_SUCCESS //SET-INITIALIZED
}
type activateTestingModeType = {
    type: typeof ACTIVATE_TESTING_MODE
}
type deactivateTestingModeType = {
    type: typeof DEACTIVATE_TESTING_MODE
}

//actions
export const initializedSuccess = (): initializedSuccessType => ({ type: INITIALIZED_SUCCESS })
export const activateTestingMode = (): activateTestingModeType => ({ type: ACTIVATE_TESTING_MODE })
export const deactivateTestingMode = (): deactivateTestingModeType => ({ type: DEACTIVATE_TESTING_MODE })

// thunks

export const initializeApp = (): ThunkAction<Promise<void>, AppStateType, unknown, anctionTypes> => {
    return async (dispatch) => {
        await dispatch(setAuthUser());
        dispatch(initializedSuccess());
    }
}




export default appReducer;