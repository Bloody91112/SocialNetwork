/* eslint-disable jsx-a11y/alt-text */
import dialogsReducer from "./dialogs-reducer";
import navbarReducer from "./navbar-reducer";
import profileReducer from "./profile-reducer";


let store = {
    _state: {
        profile: {
            posts: [
                
                { id: "1", message: 'Hi, how are you?', likesCount: "12", avatar: <img src="https://shapka-youtube.ru/wp-content/uploads/2021/02/avatarka-dlya-skaypa-dlya-parney.jpg"></img> },
                { id: "2", message: 'It`s my first post', likesCount: "11", avatar: <img src="https://shapka-youtube.ru/wp-content/uploads/2021/02/avatarka-dlya-skaypa-dlya-parney.jpg"></img> },
            ],
            newPostText: '',
        },
        dialogs: {
            messages: [
                { id: "1", message: "Hi", },
                { id: "2", message: "How are you" },
                { id: "3", message: "Bye" },
                { id: "4", message: "Yo" },
                { id: "5", message: "Yoo" },
                { id: "6", message: "Yooo" },
            ],

            newMessageText: '',

            authors: [
                { id: "1", name: 'Name 1', avatar: <img src="https://shapka-youtube.ru/wp-content/uploads/2021/02/avatarka-dlya-skaypa-dlya-parney.jpg"></img> },
                { id: "2", name: 'Name 2', avatar: <img src="https://shapka-youtube.ru/wp-content/uploads/2021/02/avatarka-dlya-skaypa-dlya-parney.jpg"></img> },
                { id: "3", name: 'Name 3', avatar: <img src="https://shapka-youtube.ru/wp-content/uploads/2021/02/avatarka-dlya-skaypa-dlya-parney.jpg"></img> },
                { id: "4", name: 'Name 4', avatar: <img src="https://shapka-youtube.ru/wp-content/uploads/2021/02/avatarka-dlya-skaypa-dlya-parney.jpg"></img> },
                { id: "5", name: 'Name 5', avatar: <img src="https://shapka-youtube.ru/wp-content/uploads/2021/02/avatarka-dlya-skaypa-dlya-parney.jpg"></img> },
                { id: "6", name: 'Name 6', avatar: <img src="https://shapka-youtube.ru/wp-content/uploads/2021/02/avatarka-dlya-skaypa-dlya-parney.jpg"></img> },
            ],

        },
        navbar: {
            friends: [
                { id: '1', name: 'Anyone1', avatar: <img src="https://shapka-youtube.ru/wp-content/uploads/2021/02/avatarka-dlya-skaypa-dlya-parney.jpg"></img> },
                { id: '2', name: 'Anyone2', avatar: <img src="https://shapka-youtube.ru/wp-content/uploads/2021/02/avatarka-dlya-skaypa-dlya-parney.jpg"></img> },
                
                { id: '3', name: 'Anyone3', avatar: <img src="https://shapka-youtube.ru/wp-content/uploads/2021/02/avatarka-dlya-skaypa-dlya-parney.jpg"></img> },
            ]
        }
    },
    _callSubscriber() {
        console.log("State changed")
    },

    getState() {
        return this._state;
    },
    subscribe(observer) {
        this._callSubscriber = observer;
    },

    dispatch(action) {
        this._state.profile = profileReducer(this._state.profile, action);
        this._state.dialogs = dialogsReducer(this._state.dialogs, action);
        this._state.navbar = navbarReducer(this._state.navbar, action);
        this._callSubscriber(this._state);
    }
}


export default store;