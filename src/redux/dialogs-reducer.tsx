import {DialogsType, MessagesType} from "./store";
import {v1} from "uuid";

const ADD_MESSAGE: string = 'ADD-MESSAGE';


export type ActionTypeDialogs = {
    type: string
    message: string
    newDialogMessage: string
}
export type MessagesPageType = {
    dialogs: Array<DialogsType>
    messages:Array<MessagesType>
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
    ]
}

function dialogsReducer(state: MessagesPageType = initialState, action: ActionTypeDialogs) {

    switch (action.type) {
        case ADD_MESSAGE:
            return {
                ...state,
                newMessageText: '',
                messages: [...state.messages, {id: v1(), messages: action.newDialogMessage}]
            }
        default:
            return state;
    }
}

interface AddMessageActionCreatorType {
    type: typeof ADD_MESSAGE
    newDialogMessage: string
}


export type MessageActionCreatorType = AddMessageActionCreatorType

export function addMessageActionCreator(newDialogMessage: string): MessageActionCreatorType {
    return {type: ADD_MESSAGE, newDialogMessage}
}



export default dialogsReducer;