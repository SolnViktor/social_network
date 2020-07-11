import {v1} from "uuid";
import {profileAPI} from "../api/api";
import {stopSubmit} from "redux-form";
import {PhotosType, ProfileType} from '../types/types';

const ADD_POST = 'ADD-POST';
const ADD_LIKE = 'ADD-LIKE';
const DECREASE_LIKE = 'DECREASE-LIKE';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const IS_FETCHING = 'IS_FETCHING';
const SET_STATUS = 'SET_STATUS';
const DELETE_POST = 'DELETE_POST';
const SET_PHOTOS = 'profile-reducer/SET_PHOTOS'



export type ActionTypeProfile = {
    type: string
    text: string
    id: string
    profile: ProfileType
    progress: boolean
    status: string
    newPost: string
    photos: PhotosType
}
type InitialStateType = typeof initialState
type PostType = {id: string, messages: string, likesCount: number}
let initialState = {
    post: [
        {id: v1(), messages: "Hi", likesCount: 11},
        {id: v1(), messages: "How are you?", likesCount: 12},
        {id: v1(), messages: "I,m okey", likesCount: 5}
    ] as Array<PostType>,
    profile: null as null | ProfileType,
    isFetching: true as boolean,
    status: '' as string,
}


function profileReducer(state = initialState, action: ActionTypeProfile):InitialStateType {

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
        case DELETE_POST: {
            return {
                ...state,
                post: state.post.filter((p: any) => p.id !== action.id)
            }
        }
        case SET_PHOTOS: {
            return {
                ...state,
                profile: {...state.profile, photos: action.photos} as ProfileType
            }
        }
        default:
            return state;
    }
}

type AddPostActionCreatorType = {type: typeof ADD_POST, newPost: string}
export const addPostActionCreator = (newPost: string):AddPostActionCreatorType => ({type: ADD_POST, newPost})
type AddLikeActionCreatorType = {type: typeof ADD_LIKE, id: string}
export const addLikeActionCreator = (id: string):AddLikeActionCreatorType => ({type: ADD_LIKE, id})
type DecreaseLikeActionCreatorType = {type: typeof DECREASE_LIKE, id: string}
export const decreaseLikeActionCreator = (id: string):DecreaseLikeActionCreatorType => ({type: DECREASE_LIKE, id})
type SetUserProfileType = {type: typeof SET_USER_PROFILE, profile: ProfileType}
export const setUserProfile = (profile: ProfileType):SetUserProfileType => ({type: SET_USER_PROFILE, profile})
type UserIsFetchingType = {type: typeof IS_FETCHING, progress: boolean}
export const userIsFetching = (progress: boolean):UserIsFetchingType => ({type: IS_FETCHING, progress})
type SetStatusType = {type: typeof SET_STATUS, status: string}
export const setStatus = (status: string):SetStatusType => ({type: SET_STATUS, status})
type DeletePostType = {type: typeof DELETE_POST, id: number}
export const deletePost = (id: number):DeletePostType => ({type: DELETE_POST, id})
type SetPhotosSuccessfullType = {type: typeof SET_PHOTOS, photos:PhotosType}
export const setPhotosSuccessfull = (photos: PhotosType):SetPhotosSuccessfullType => ({type: SET_PHOTOS, photos})


export const getStatus = (userId: number) => async (dispatch: any) => {
    let response = await profileAPI.getStatus(userId);
    dispatch(setStatus(response));
}
export const updateStatus = (status: string) => async (dispatch: any) => {
    try {
        let response = await profileAPI.updateStatus(status);
        if (response.data.resultCode === 0) {
            dispatch(setStatus(status));
        }
    } catch (error) {

    }
}

export const getUser = (userId: number) => async (dispatch: any) => {
    dispatch(userIsFetching(true));
    let response = await profileAPI.getUserProfileFromId(userId);
    dispatch(userIsFetching(false));
    dispatch(setUserProfile(response));
}

export const loadPhoto = (photo: any) => async (dispatch: any) => {
    let response = await profileAPI.loadPhoto(photo);
    if (response.data.resultCode === 0) {
        dispatch(setPhotosSuccessfull(response.data.data.photos));
    }
}
export const saveProfile = (formData: ProfileType) => async (dispatch: any, getState: any) => {
    const userId = getState().auth.id;
    const response = await profileAPI.updateProfile(formData);
    if (response.data.resultCode === 0) {
        dispatch(getUser(userId));
    } else {
        let message = response.data.messages.length > 0 ? response.data.messages[0] : "Some error"
        dispatch(stopSubmit('edit-profile', {_error: message}))
        return Promise.reject(message);
    }
}


export default profileReducer;




















