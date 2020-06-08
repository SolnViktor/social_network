import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import sidebarReducer from "./sidebar-reducer";
import {v1} from "uuid";



export type MessagesType = {
    id: string
    messages: string
}
export type DialogsType = {
    id: string
    name: string
}
export type PostType = {
    id: string
    messages: string
    likesCount: number
}
export type FriendsType = {
    id: string
    name: string
}
export type SidebarType = {
    friends: Array<FriendsType>
}
// export type ProfilePageType = {
//     post:Array<PostType>
//     newPostText: string
//     profile: any
// }
export type MessagesPageType = {
    dialogs: Array<DialogsType>
    messages:Array<MessagesType>
    newMessageText: string
}
// export type StateType = {
//     messagesPage: MessagesPageType
//     profilePage: ProfilePageType
//     sidebar: SidebarType
// }
// export type StoreType = {
//     _state: StateType
//     _callSubscriber: CallSubscriberType
//     subscribe: (observer: () => void) => void
//     getState: () => StateType
//     dispatch: (action: any) => void
// }
// export type CallSubscriberType = (state: StateType) => void

/*let store: StoreType = {
    _state: {
        messagesPage: {
            dialogs: [
                {id: v1(), name: "Viktor"},
                {id: v1(), name: "Nikita"},
                {id: v1(), name: "Vasil"},
                {id: v1(), name: "Semen"},
                {id: v1(), name: "Timofey"},
                {id: v1(), name: "Andrew"}
            ],
            messages: [
                {id: v1(), messages: "Hi"},
                {id: v1(), messages: "How id your it-kamasutra"},
                {id: v1(), messages: "Yo"},
            ],
            newMessageText: ''
        },
        profilePage: {
            post: [
                {id: v1(), messages: "Hi", likesCount: 11},
                {id: v1(), messages: "How id your it-kamasutra", likesCount: 12},
                {id: v1(), messages: "I,m okey", likesCount: 5}
            ],
            newPostText: '',
            profile: null
        },
        sidebar: {
            friends: [
                {id: v1(), name: "Andrew"},
                {id: v1(), name: "Sasha"},
                {id: v1(), name: "Misha"}
            ]
        }

    },
    _callSubscriber() {
        console.log ( 'State was changed') },

    getState() {
        return this._state
    },
    subscribe (observer: () => void) {
        this._callSubscriber = observer;
    },

    dispatch (action) {
        this._state.profilePage = profileReducer(this._state.profilePage,  action);
        this._state.messagesPage = dialogsReducer(this._state.messagesPage, action);
        this._state.sidebar = sidebarReducer(this._state.sidebar, action);
        this._callSubscriber(this._state);
    }
}*/






// export default store;
