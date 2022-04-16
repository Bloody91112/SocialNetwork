import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import dialogsReducer from "./dialogs-reducer";
import profileReducer from "./profile-reducer";
import usersReducer from "./users-reducer";
import authReducer from "./auth-reducer";
import thunkMiddleware from 'redux-thunk';
import { reducer as formReducer } from 'redux-form'
import appReducer from "./app-reducer";
import newsReducer from "./news-reducer";


let rootReducer = combineReducers({
  profile: profileReducer,
  dialogs: dialogsReducer,
  users: usersReducer,
  auth: authReducer,
  app: appReducer,
  form: formReducer,
  news: newsReducer
});


type rootReducerType = typeof rootReducer
export type AppStateType = ReturnType<rootReducerType>



// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(
  applyMiddleware(thunkMiddleware)
));

export default store;