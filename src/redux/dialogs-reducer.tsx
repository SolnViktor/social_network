import {v1} from "uuid";

const ADD_MESSAGE: string = 'ADD-MESSAGE';


export type ActionTypeDialogs = {
    type: string
    message: string
    newDialogMessage: string
}

type InitialStateType = typeof initialState
type DialogsType = {id:string, name: string}
type MessagesType = {id: string, messages: string}
let initialState = {
    dialogs: [
        {id: v1(), name: "Viktor"},
        {id: v1(), name: "Nikita"},
        {id: v1(), name: "Vasil"},
        {id: v1(), name: "Semen"},
        {id: v1(), name: "Timofey"},
        {id: v1(), name: "Andrew"}
    ] as Array<DialogsType>,
    messages: [
        {id: v1(), messages: "Hi"},
        {id: v1(), messages: "How about play footble tomorrow?"},
        {id: v1(), messages: "Ye, go"},
    ] as Array<MessagesType>
}

function dialogsReducer(state = initialState, action: ActionTypeDialogs):InitialStateType  {

    switch (action.type) {
        case ADD_MESSAGE:
            return {
                ...state,
                messages: [...state.messages, {id: v1(), messages: action.newDialogMessage}],
            }
        default:
            return state;
    }
}

type AddMessageActionCreatorType = {type: typeof ADD_MESSAGE, newDialogMessage: string}
export function addMessageActionCreator(newDialogMessage: string): AddMessageActionCreatorType {
    return {type: ADD_MESSAGE, newDialogMessage}
}



export default dialogsReducer;