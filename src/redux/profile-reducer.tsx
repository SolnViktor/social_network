import {PostType} from "./store";
import {v1} from "uuid";
import {profileAPI} from "../api/api";

const ADD_POST = 'ADD-POST';
const ADD_LIKE = 'ADD-LIKE';
const DECREASE_LIKE = 'DECREASE-LIKE';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const IS_FETCHING = 'IS_FETCHING';
const SET_STATUS = 'SET_STATUS';

export type actionTypeProfile = {
    type: string
    text: string
    id: string
    profile: any
    progress: boolean
    status: string
    newPost: string
}

let initialState = {
    post: [
        {id: v1(), messages: "Hi", likesCount: 11},
        {id: v1(), messages: "How are you?", likesCount: 12},
        {id: v1(), messages: "I,m okey", likesCount: 5}
    ],
    profile: null,
    isFetching: true,
    status: ''
}
export type ProfilePageType = {
    post: Array<PostType>
    profile: any
    isFetching: boolean
    status: string
}

function profileReducer(state: ProfilePageType = initialState, action: actionTypeProfile) {

    switch (action.type) {
        case ADD_POST:
                return {
                    ...state,
                    post: [...state.post, {id: v1(), messages: action.newPost, likesCount: 0}],
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
        case SET_USER_PROFILE: {
            return {...state, profile: action.profile}
        }
        case IS_FETCHING : {
            return {...state, isFetching: action.progress}
        }
        case SET_STATUS: {
            return {...state, status: action.status}
        }
        default:
            return state;
    }
}


export const addPostActionCreator = (newPost: string) => ({type: ADD_POST, newPost})
export const addLikeActionCreator = (id: string) => ({type: ADD_LIKE, id})
export const decreaseLikeActionCreator = (id: string) => ({type: DECREASE_LIKE, id})
export const setUserProfile = (profile: any) => ({type: SET_USER_PROFILE, profile})
export const userIsFetching = (progress: boolean) => ({type: IS_FETCHING, progress})
export const setStatus = (status: any) => ({type: SET_STATUS, status})

export const getStatus = (userId: any) => (dispatch:any) => {
    profileAPI.getStatus(userId).then (data => {
        dispatch(setStatus(data));
    })
}
export const updateStatus = (status: any) => (dispatch:any) => {
    profileAPI.updateStatus(status).then (response => {
        if(response.data.resultCode === 0){
        dispatch(setStatus(status));
        }
    })
}

export const getUser = (userId: any) => (dispatch: any) => {
    dispatch(userIsFetching(true))
    profileAPI.getUserProfileFromId(userId).then(data => {
        dispatch(userIsFetching(false))
        dispatch(setUserProfile(data))
    })
}


export default profileReducer;




















