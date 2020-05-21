import {MessagesPageType} from "./store";
import {v1} from "uuid";

const ADD_MESSAGE: string = 'ADD-MESSAGE';
const UPDATE_NEW_MESSAGE: string = 'UPDATE-NEW-MESSAGE';

export type actionTypeDialogs = {
    type: string
    message: string
}

let initialState = {
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
        {id: v1(), messages: "How about play footble tomorrow?"},
        {id: v1(), messages: "Ye, go"},
    ],
    newMessageText: ''
}

function dialogsReducer(state: MessagesPageType = initialState, action: actionTypeDialogs) {

    switch (action.type) {
        case UPDATE_NEW_MESSAGE:
            return {
                ...state,
                newMessageText: action.message
            };
        case ADD_MESSAGE:
            let text = state.newMessageText
            return {
                ...state,
                newMessageText: '',
                messages: [...state.messages, {id: v1(), messages: text}]
            }
        default:
            return state;
    }
}

interface AddMessageActionCreatorType {
    type: typeof ADD_MESSAGE
}

interface UpdateNewMessageActionCreatorType {
    type: typeof UPDATE_NEW_MESSAGE
    message: string
}

export type MessageActionCreatorType = AddMessageActionCreatorType | UpdateNewMessageActionCreatorType

export function addMessageActionCreator(): MessageActionCreatorType {
    return {type: ADD_MESSAGE}
}

export function updateNewMessageActionCreator(newMessage: string): MessageActionCreatorType {
    return {
        type: UPDATE_NEW_MESSAGE,
        message: newMessage,
    }
}

export default dialogsReducer;