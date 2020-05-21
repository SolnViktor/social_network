import {ProfilePageType} from "./store";
import {v1} from "uuid"

const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST = 'UPDATE-NEW-POST';
const ADD_LIKE = 'ADD-LIKE'
const DECREASE_LIKE = 'DECREASE-LIKE'

export type actionTypeProfile = {
    type: string
    text: string
    id: string
}

let initialState = {
    post: [
        {id: v1(), messages: "Hi", likesCount: 11},
        {id: v1(), messages: "How are you?", likesCount: 12},
        {id: v1(), messages: "I,m okey", likesCount: 5}
    ],
    newPostText: ''
}

function profileReducer(state: ProfilePageType = initialState, action: actionTypeProfile) {

    switch (action.type) {
        case ADD_POST:
            if (state.newPostText.trim() === '') {
                alert('String is empty, try again');
            } else {
                return {
                    ...state,
                    post: [...state.post, {id: v1(), messages: state.newPostText, likesCount: 0}],
                    newPostText: ''
                }
            }
        case UPDATE_NEW_POST:
            return {
                ...state,
                newPostText: action.text,
            }
        case ADD_LIKE: {
            let stateCopy = {
                ...state,
                post: [...state.post]
            }
            let addLikeCount: any = stateCopy.post.find(p => p.id === action.id);
            addLikeCount.likesCount++;
            return stateCopy;
        }

        case DECREASE_LIKE: {
            let stateCopy = {
                ...state,
                post: [...state.post]
            }
            let decreaseLikeCount: any = stateCopy.post.find(p => p.id === action.id);
            decreaseLikeCount.likesCount--;
            return stateCopy;
        }
        default:
            return state;
    }
}


export function addPostActionCreator() {
    return {type: ADD_POST}
}

export function updateNewPostActionCreator(newText: string) {
    return {
        type: UPDATE_NEW_POST,
        text: newText,
    }
}

export function addLikeActionCreator(id: string) {
    return {
        type: ADD_LIKE,
        id: id,
    }
}

export function decreaseLikeActionCreator(id: string) {
    return {
        type: DECREASE_LIKE,
        id: id
    }
}

export default profileReducer;